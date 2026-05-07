import { NextResponse } from "next/server";
import { Difficulty, LanguageMode, WordEntry } from "@/types/game";

const API_TIMEOUT_MS = 4500;
const PREFIXES = "abcdefghijklmnopqrstuvwxyz".split("");

const normalizeWord = (value: string) => value.replace(/[^\p{L}\p{N}\s'-]/gu, "").trim();
const isPlayableShape = (word: string) => /^[\p{L}]{3,18}$/u.test(word);

const difficultyFromLength = (text: string): Difficulty => {
  const len = text.trim().split(/\s+/).join("").length;
  if (len <= 6) return "Easy";
  if (len <= 10) return "Medium";
  if (len <= 14) return "Hard";
  return "Boss";
};

const pointsForDifficulty = (difficulty: Difficulty) => {
  if (difficulty === "Easy") return 10;
  if (difficulty === "Medium") return 18;
  if (difficulty === "Hard") return 26;
  return 34;
};

const fetchWithTimeout = async (url: string, timeoutMs: number) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

const parseFrequency = (tags: string[] | undefined) => {
  const frequencyTag = tags?.find((tag) => tag.startsWith("f:"));
  if (!frequencyTag) return 0;
  const parsed = Number(frequencyTag.replace("f:", ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const hasGoodPos = (tags: string[] | undefined) =>
  Boolean(tags?.some((tag) => tag === "n" || tag === "v" || tag === "adj" || tag === "adv"));

const fetchDictionaryWords = async (language: LanguageMode, desiredCount: number) => {
  const vocabularyParam = language === "spanish" ? "&v=es" : "";
  const prefixOrder = [...PREFIXES].sort(() => Math.random() - 0.5);
  const unique = new Map<string, number>();
  const samplePrefixes = prefixOrder.slice(0, 14);

  for (const prefix of samplePrefixes) {
    const endpoint = `https://api.datamuse.com/words?sp=${prefix}*&max=180&md=fpd${vocabularyParam}`;
    const payload = await fetchWithTimeout(endpoint, API_TIMEOUT_MS);
    if (!Array.isArray(payload)) continue;

    let acceptedFromPrefix = 0;
    for (const item of payload as Array<{ word?: string; tags?: string[] }>) {
      if (acceptedFromPrefix >= 8) break;
      const word = normalizeWord(item.word ?? "");
      if (!isPlayableShape(word)) continue;
      if (word[0] !== word[0].toLowerCase()) continue;
      if (!hasGoodPos(item.tags)) continue;

      const frequency = parseFrequency(item.tags);
      const minFrequency = language === "english" ? 2 : 0.6;
      if (frequency < minFrequency) continue;
      if (!unique.has(word)) {
        unique.set(word, frequency);
        acceptedFromPrefix += 1;
      }
    }
  }

  const ranked = [...unique.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, desiredCount * 2)
    .map(([word]) => word)
    .sort(() => Math.random() - 0.5)
    .slice(0, desiredCount);

  return ranked;
};

const toWordEntries = (language: LanguageMode, values: string[]): WordEntry[] =>
  values.map((text, index) => {
    const difficulty = difficultyFromLength(text);
    return {
      id: `${language}-dict-${index}-${text.toLowerCase()}`,
      text,
      language,
      difficulty,
      points: pointsForDifficulty(difficulty),
    };
  });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const englishTarget = Number(searchParams.get("english") ?? "40");
  const spanishTarget = Number(searchParams.get("spanish") ?? "40");
  const englishCount = Number.isFinite(englishTarget) ? Math.max(12, Math.min(90, englishTarget)) : 40;
  const spanishCount = Number.isFinite(spanishTarget) ? Math.max(12, Math.min(90, spanishTarget)) : 40;

  const [englishWords, spanishWords] = await Promise.all([
    fetchDictionaryWords("english", englishCount),
    fetchDictionaryWords("spanish", spanishCount),
  ]);

  const words = [...toWordEntries("english", englishWords), ...toWordEntries("spanish", spanishWords)];

  return NextResponse.json({
    words,
    source: {
      englishDictionaryApi: englishWords.length,
      spanishDictionaryApi: spanishWords.length,
      provider: "datamuse",
    },
  });
}
