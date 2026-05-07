import { failComments, successComments, transcriptVariants } from "@/lib/game-config";
import { EvaluationResult, PlayerStats, WordEntry } from "@/types/game";

const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const getLeaderboard = (players: PlayerStats[]): PlayerStats[] => {
  return [...players]
    .sort((a, b) => b.score - a.score || b.successes - a.successes || b.bestStreak - a.bestStreak)
    .map((player, index) => ({ ...player, previousRank: index + 1 }));
};

export const evaluateMockPronunciation = async (word: WordEntry): Promise<EvaluationResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1600 + Math.random() * 1200));

  const success = Math.random() > 0.42;
  const base = success ? 72 : 38;
  const variance = success ? 27 : 30;
  const accuracy = Math.min(99, Math.max(15, Math.round(base + Math.random() * variance)));
  const streakBonus = success && accuracy >= 90 ? 8 : success && accuracy >= 82 ? 4 : 0;
  const awardedPoints = success ? Math.round((word.points * accuracy) / 100) + streakBonus : accuracy > 48 ? 2 : 0;

  return {
    success,
    accuracy,
    transcript: `${word.text} - ${randomItem(transcriptVariants)}`,
    comment: success ? randomItem(successComments) : randomItem(failComments),
    awardedPoints,
  };
};

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const levenshteinDistance = (a: string, b: string) => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      const substitutionCost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + substitutionCost,
      );
    }
  }

  return matrix[b.length][a.length];
};

const transcriptAccuracy = (expected: string, heard: string) => {
  const cleanExpected = normalizeText(expected);
  const cleanHeard = normalizeText(heard);
  if (!cleanHeard) return 0;

  const editDistance = levenshteinDistance(cleanExpected, cleanHeard);
  const maxLength = Math.max(cleanExpected.length, cleanHeard.length, 1);
  const charSimilarity = Math.max(0, 1 - editDistance / maxLength);

  const expectedTokens = cleanExpected.split(" ");
  const heardTokens = cleanHeard.split(" ");
  const overlap = expectedTokens.filter((token) => heardTokens.includes(token)).length;
  const tokenSimilarity = overlap / Math.max(expectedTokens.length, 1);

  return Math.round((charSimilarity * 0.7 + tokenSimilarity * 0.3) * 100);
};

const calculateAwardedPoints = (word: WordEntry, accuracy: number, success: boolean) => {
  if (!success) return accuracy >= 52 ? 2 : 0;
  const streakBonus = accuracy >= 94 ? 10 : accuracy >= 86 ? 5 : 0;
  return Math.round((word.points * accuracy) / 100) + streakBonus;
};

export const evaluateTranscriptPronunciation = (word: WordEntry, transcript: string): EvaluationResult => {
  const accuracy = transcriptAccuracy(word.text, transcript);
  const success = accuracy >= 68;
  const awardedPoints = calculateAwardedPoints(word, accuracy, success);

  return {
    success,
    accuracy,
    transcript: transcript || randomItem(transcriptVariants),
    comment: success ? randomItem(successComments) : randomItem(failComments),
    awardedPoints,
  };
};

export const calculateAwards = (players: PlayerStats[]) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const byFails = [...players].sort((a, b) => b.fails - a.fails);
  const byComeback = [...players].sort((a, b) => b.bestStreak - a.bestStreak);
  const bySurvival = [...players].sort((a, b) => b.successes - a.successes);
  return {
    champion: sorted[0],
    bestComeback: byComeback[0],
    dangerous: byFails[0],
    luckiest: bySurvival[0],
    needsDrink: byFails[0],
  };
};
