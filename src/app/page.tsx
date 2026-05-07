"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { GameScreen } from "@/components/game/game-screen";
import { EndGameScreen } from "@/components/game/end-game-screen";
import { HowItWorksScreen } from "@/components/game/how-it-works-screen";
import { SetupScreen } from "@/components/game/setup-screen";
import { WelcomeScreen } from "@/components/game/welcome-screen";
import { evaluateMockPronunciation, evaluateTranscriptPronunciation } from "@/lib/game-utils";
import { failComments } from "@/lib/game-config";
import { EvaluationResult, GameStage, LanguageMode, MatchLength, PlayerStats, TurnPhase, WordEntry } from "@/types/game";

const createInitialPlayers = (names: string[]): PlayerStats[] =>
  names.map((name, index) => ({
    id: `${name.toLowerCase().replace(/\s+/g, "-")}-${index}`,
    name,
    score: 0,
    successes: 0,
    fails: 0,
    currentStreak: 0,
    bestStreak: 0,
    previousRank: index + 1,
  }));

const defaultPlayers = ["Player 1", "Player 2"];
type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: { 0: { transcript: string }; isFinal: boolean }[] }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const subscribeNoop = () => () => {};
const getServerSpeechSupportSnapshot = () => false;
const getClientSpeechSupportSnapshot = () =>
  typeof window !== "undefined"
  && Boolean(
    (window as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition
    || (window as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition,
  );

const pickWordFromBank = (bank: WordEntry[], language: LanguageMode, usedWordIds: Set<string>): WordEntry => {
  const byLanguage = bank.filter((word) => word.language === language);
  if (byLanguage.length === 0) {
    return {
      id: `${language}-placeholder`,
      text: language === "english" ? "loading words" : "cargando palabras",
      language,
      difficulty: "Easy",
      points: 10,
    };
  }
  const available = byLanguage.filter((word) => !usedWordIds.has(word.id));
  const source = available.length > 0 ? available : byLanguage;
  return source[Math.floor(Math.random() * source.length)];
};

const pickNextWordFromBank = (
  bank: WordEntry[],
  language: LanguageMode,
  usedWordIds: Set<string>,
  currentText: string,
): WordEntry => {
  const firstPick = pickWordFromBank(bank, language, usedWordIds);
  const byLanguage = bank.filter((word) => word.language === language);
  if (byLanguage.length <= 1) return firstPick;

  if (firstPick.text.toLowerCase() !== currentText.toLowerCase()) return firstPick;
  const alternatives = byLanguage.filter((word) => word.text.toLowerCase() !== currentText.toLowerCase());
  if (alternatives.length === 0) return firstPick;
  return alternatives[Math.floor(Math.random() * alternatives.length)];
};

export default function Home() {
  const [stage, setStage] = useState<GameStage>("welcome");
  const [language, setLanguage] = useState<LanguageMode>("english");
  const [rounds, setRounds] = useState<MatchLength>(12);
  const [playerInputs, setPlayerInputs] = useState<string[]>(defaultPlayers);
  const [setupError, setSetupError] = useState<string>("");

  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [phase, setPhase] = useState<TurnPhase>("waiting");
  const [countdown, setCountdown] = useState(3);
  const [waitingCountdown, setWaitingCountdown] = useState(7);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());
  const [dynamicWordBank, setDynamicWordBank] = useState<WordEntry[]>([]);
  const [currentWord, setCurrentWord] = useState<WordEntry>({
    id: "english-placeholder",
    text: "loading words",
    language: "english",
    difficulty: "Easy",
    points: 10,
  });
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const recognitionSafetyTimeoutRef = useRef<number | null>(null);
  const transcriptRef = useRef("");
  const finishedRecognitionRef = useRef(false);

  const totalTurns = rounds * Math.max(players.length, 1);
  const currentTurn = (currentRound - 1) * Math.max(players.length, 1) + playerIndex + 1;
  const isLastTurn = currentTurn >= totalTurns;
  const activePlayer = players[playerIndex];
  const speechSupported = useSyncExternalStore(
    subscribeNoop,
    getClientSpeechSupportSnapshot,
    getServerSpeechSupportSnapshot,
  );
  const isUsingMock = demoMode || !speechSupported;

  const rankedPlayers = useMemo(
    () =>
      [...players].sort((a, b) => b.score - a.score || b.successes - a.successes).map((player, index) => ({
        ...player,
        previousRank: index + 1,
      })),
    [players],
  );

  useEffect(() => {
    if (phase !== "listening") return;
    if (countdown <= 0) return;

    const timer = window.setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== "waiting") return;
    if (waitingCountdown <= 0) return;

    const timer = window.setTimeout(() => setWaitingCountdown((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [phase, waitingCountdown]);

  const applyEvaluation = useCallback((evaluation: EvaluationResult) => {
    setResult(evaluation);
    setPlayers((prev) =>
      prev.map((player, index) => {
        if (index !== playerIndex) return player;
        const newScore = player.score + evaluation.awardedPoints;
        const newSuccesses = evaluation.success ? player.successes + 1 : player.successes;
        const newFails = evaluation.success ? player.fails : player.fails + 1;
        const newStreak = evaluation.success ? player.currentStreak + 1 : 0;
        return {
          ...player,
          score: newScore,
          successes: newSuccesses,
          fails: newFails,
          currentStreak: newStreak,
          bestStreak: Math.max(player.bestStreak, newStreak),
        };
      }),
    );
    setPhase("result");
  }, [playerIndex]);

  const runTranscriptEvaluation = useCallback(async (transcript: string) => {
    setPhase("evaluating");
    await new Promise((resolve) => setTimeout(resolve, 800));
    const evaluation = transcript
      ? evaluateTranscriptPronunciation(currentWord, transcript)
      : await evaluateMockPronunciation(currentWord);
    applyEvaluation(evaluation);
  }, [applyEvaluation, currentWord]);

  const clearRecognitionSafetyTimeout = useCallback(() => {
    if (recognitionSafetyTimeoutRef.current !== null) {
      window.clearTimeout(recognitionSafetyTimeoutRef.current);
      recognitionSafetyTimeoutRef.current = null;
    }
  }, []);

  const finalizeRecognition = useCallback(() => {
    if (finishedRecognitionRef.current) return;
    finishedRecognitionRef.current = true;
    clearRecognitionSafetyTimeout();
    try {
      recognitionRef.current?.stop();
    } catch {
      // Some browsers throw if stop() is called after end; ignore safely.
    }
    void runTranscriptEvaluation(transcriptRef.current);
  }, [clearRecognitionSafetyTimeout, runTranscriptEvaluation]);

  useEffect(() => {
    if (phase !== "listening" || countdown > 0 || isUsingMock) return;
    finalizeRecognition();
  }, [phase, countdown, isUsingMock, finalizeRecognition]);

  useEffect(() => {
    if (phase !== "listening" || countdown > 0 || !isUsingMock) return;
    const runEvaluation = async () => {
      setPhase("evaluating");
      const evaluation = await evaluateMockPronunciation(currentWord);
      applyEvaluation(evaluation);
    };

    void runEvaluation();
  }, [countdown, phase, currentWord, playerIndex, isUsingMock, applyEvaluation]);

  useEffect(() => {
    if (phase !== "waiting" || waitingCountdown > 0) return;
    const timeoutEvaluation: EvaluationResult = {
      success: false,
      accuracy: 0,
      transcript: "No attempt captured.",
      comment: `${failComments[Math.floor(Math.random() * failComments.length)]} Timeout! Mic was never pressed.`,
      awardedPoints: 0,
    };
    const timer = window.setTimeout(() => {
      applyEvaluation(timeoutEvaluation);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [phase, waitingCountdown, applyEvaluation]);

  useEffect(() => {
    return () => {
      clearRecognitionSafetyTimeout();
      recognitionRef.current?.stop();
    };
  }, [clearRecognitionSafetyTimeout]);

  const startMatch = () => {
    const cleanedPlayers = playerInputs.map((name) => name.trim()).filter(Boolean);
    if (cleanedPlayers.length < 2) {
      setSetupError("At least 2 players are required.");
      return;
    }
    setSetupError("");
    const initialized = createInitialPlayers(cleanedPlayers);
    const beginMatch = (bank: WordEntry[]) => {
      const firstWord = pickWordFromBank(bank, language, new Set());
      setDynamicWordBank(bank);
      setPlayers(initialized);
      setCurrentRound(1);
      setPlayerIndex(0);
      setUsedWordIds(new Set([firstWord.id]));
      setCurrentWord(firstWord);
      setResult(null);
      setPhase("waiting");
      setWaitingCountdown(7);
      setStage("playing");
    };

    void (async () => {
      try {
        const response = await fetch("/api/word-bank?english=55&spanish=55");
        const payload = (await response.json()) as { words?: WordEntry[] };
        if (Array.isArray(payload.words) && payload.words.length > 0) {
          beginMatch(payload.words);
          return;
        }
      } catch {
        // handled below
      }
      setSetupError("Could not load word bank API right now. Try again in a few seconds.");
    })();
  };

  const startListening = () => {
    if (phase !== "waiting") return;
    setResult(null);
    setLiveTranscript("");
    transcriptRef.current = "";
    finishedRecognitionRef.current = false;
    setCountdown(isUsingMock ? 3 : 5);
    setPhase("listening");
    setWaitingCountdown(0);

    if (isUsingMock) return;

    const SpeechRecognitionCtor = (
      window as { SpeechRecognition?: new () => BrowserSpeechRecognition; webkitSpeechRecognition?: new () => BrowserSpeechRecognition }
    ).SpeechRecognition
      || (
        window as { SpeechRecognition?: new () => BrowserSpeechRecognition; webkitSpeechRecognition?: new () => BrowserSpeechRecognition }
      ).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setDemoMode(true);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = language === "english" ? "en-US" : "es-ES";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spoken = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();
      transcriptRef.current = spoken;
      setLiveTranscript(spoken);
    };

    recognition.onerror = () => {
      finalizeRecognition();
    };

    recognition.onend = () => {
      finalizeRecognition();
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      clearRecognitionSafetyTimeout();
      recognitionSafetyTimeoutRef.current = window.setTimeout(() => {
        finalizeRecognition();
      }, 7500);
    } catch {
      setDemoMode(true);
    }
  };

  const moveToNextTurn = () => {
    clearRecognitionSafetyTimeout();
    recognitionRef.current?.stop();
    if (isLastTurn) {
      setStage("ended");
      return;
    }

    const nextPlayerIndex = (playerIndex + 1) % players.length;
    const nextRound = nextPlayerIndex === 0 ? currentRound + 1 : currentRound;
    const nextWord = pickNextWordFromBank(dynamicWordBank, language, usedWordIds, currentWord.text);
    setUsedWordIds((prev) => new Set(prev).add(nextWord.id));
    setPlayerIndex(nextPlayerIndex);
    setCurrentRound(nextRound);
    setCurrentWord(nextWord);
    setPhase("waiting");
    setResult(null);
    setLiveTranscript("");
    setCountdown(3);
    setWaitingCountdown(7);
  };

  const playAgain = () => {
    const names = players.map((player) => player.name);
    const initialized = createInitialPlayers(names);
    const firstWord = pickWordFromBank(dynamicWordBank, language, new Set());
    setPlayers(initialized);
    setCurrentRound(1);
    setPlayerIndex(0);
    setCurrentWord(firstWord);
    setUsedWordIds(new Set([firstWord.id]));
    setPhase("waiting");
    setResult(null);
    setLiveTranscript("");
    setCountdown(3);
    setWaitingCountdown(7);
    setStage("playing");
  };

  const newMatch = () => {
    setStage("setup");
    setPlayers([]);
    setPlayerInputs(defaultPlayers);
    setResult(null);
    setLiveTranscript("");
    setSetupError("");
  };

  const updatePlayer = (index: number, value: string) => {
    setPlayerInputs((prev) => prev.map((name, i) => (i === index ? value : name)));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0f39]  text-slate-900">
      <div
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/comic-bg-main.png')" }}
      />
      <div className="pointer-events-none fixed inset-0 " />
      <div className="relative mx-auto w-full space-y-8">
        {stage === "welcome" && <WelcomeScreen onStart={() => setStage("setup")} onHowItWorks={() => setStage("manual")} />}

        {stage === "manual" && <HowItWorksScreen onBack={() => setStage("welcome")} onStart={() => setStage("setup")} />}

        {stage === "setup" && (
          <SetupScreen
            onBack={() => setStage("welcome")}
            language={language}
            setLanguage={setLanguage}
            rounds={rounds}
            setRounds={setRounds}
            players={playerInputs}
            updatePlayer={updatePlayer}
            addPlayer={() => setPlayerInputs((prev) => [...prev, `Player ${prev.length + 1}`])}
            removePlayer={(index) => setPlayerInputs((prev) => prev.filter((_, i) => i !== index))}
            startMatch={startMatch}
            error={setupError}
          />
        )}

        {stage === "playing" && activePlayer && (
          <GameScreen
            phase={phase}
            currentWord={currentWord}
            round={currentRound}
            totalRounds={rounds}
            playerName={activePlayer.name}
            language={language}
            players={rankedPlayers}
            countdown={countdown}
            waitingCountdown={waitingCountdown}
            result={result}
            liveTranscript={liveTranscript}
            isUsingMock={isUsingMock}
            speechSupported={speechSupported}
            onStartListening={startListening}
            onNext={moveToNextTurn}
            isLastTurn={isLastTurn}
          />
        )}

        {stage === "ended" && <EndGameScreen players={rankedPlayers} onPlayAgain={playAgain} onNewMatch={newMatch} />}
      </div>
    </main>
  );
}
