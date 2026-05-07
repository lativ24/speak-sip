import { Difficulty } from "@/types/game";

export const successComments = [
  "Okay, that was dangerously close to native speaker energy.",
  "You survived. The accent committee approves.",
  "Clean pronunciation. No drink for you.",
  "That was smooth. Suspiciously smooth.",
];

export const failComments = [
  "Nope. That was not the word. That was a support ticket.",
  "I heard confidence, not accuracy. Drink.",
  "The microphone is asking for a second opinion.",
  "That pronunciation just broke production.",
  "Bold attempt. Wrong language. Drink.",
];

export const transcriptVariants = [
  "Close enough, but some vowels wandered off.",
  "Strong effort, clipped ending.",
  "Sharp start, chaotic middle, heroic finish.",
  "Good rhythm, shaky consonants.",
  "You said it with spirit, not precision.",
];

export const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/25 text-emerald-200 border-emerald-300/40",
  Medium: "bg-sky-500/25 text-sky-200 border-sky-300/40",
  Hard: "bg-orange-500/25 text-orange-200 border-orange-300/40",
  Boss: "bg-rose-500/25 text-rose-200 border-rose-300/40",
};
