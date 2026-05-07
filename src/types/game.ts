export type LanguageMode = "english" | "spanish";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Boss";
export type MatchLength = 6 | 12 | 20;
export type GameStage = "welcome" | "manual" | "setup" | "playing" | "ended";
export type TurnPhase = "waiting" | "listening" | "evaluating" | "result";

export interface WordEntry {
  id: string;
  text: string;
  language: LanguageMode;
  difficulty: Difficulty;
  points: number;
}

export interface PlayerStats {
  id: string;
  name: string;
  score: number;
  successes: number;
  fails: number;
  currentStreak: number;
  bestStreak: number;
  previousRank: number;
}

export interface GameConfig {
  language: LanguageMode;
  totalRounds: MatchLength;
  players: string[];
}

export interface EvaluationResult {
  success: boolean;
  accuracy: number;
  transcript: string;
  comment: string;
  awardedPoints: number;
}
