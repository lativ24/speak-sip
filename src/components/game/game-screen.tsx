import Image from "next/image";
import { CheckCircle2, Flame, LoaderCircle, Mic, Radio, ShieldCheck, Star, Volume2 } from "lucide-react";
import { Leaderboard } from "@/components/game/leaderboard";
import { MicrophoneButton } from "@/components/game/microphone-button";
import { ResultPanel } from "@/components/game/result-panel";
import { ComicJudgeCard } from "@/components/game/comic-judge-card";
import { PlayerStats, TurnPhase, WordEntry, EvaluationResult, LanguageMode } from "@/types/game";

interface GameScreenProps {
  phase: TurnPhase;
  currentWord: WordEntry;
  round: number;
  totalRounds: number;
  playerName: string;
  language: LanguageMode;
  players: PlayerStats[];
  countdown: number;
  waitingCountdown: number;
  result: EvaluationResult | null;
  liveTranscript: string;
  isUsingMock: boolean;
  speechSupported: boolean;
  onStartListening: () => void;
  onNext: () => void;
  isLastTurn: boolean;
}

export function GameScreen({
  phase,
  currentWord,
  round,
  totalRounds,
  playerName,
  language,
  players,
  countdown,
  waitingCountdown,
  result,
  liveTranscript,
  isUsingMock,
  speechSupported,
  onStartListening,
  onNext,
  isLastTurn,
}: GameScreenProps) {
  const showBooth = phase !== "result";
  const timerValue = phase === "waiting" ? waitingCountdown : countdown;
  const timerLabel = phase === "waiting" ? "SEC" : phase === "listening" ? "LIVE" : "WAIT";
  const statusCopy =
    phase === "waiting"
      ? "Tap to speak"
      : phase === "listening"
        ? "Speak now"
        : phase === "evaluating"
          ? "Checking pronunciation"
          : "Verdict locked";
  const helperCopy =
    phase === "waiting"
      ? "Press before timer hits 0 or you sip."
      : phase === "listening"
        ? "Say the word clearly before the timer ends."
        : phase === "evaluating"
          ? "Sip Host is preparing the verdict."
          : "Turn complete.";
  const topPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="comic-panel relative overflow-hidden rounded-[1.7rem] border-[4px] border-slate-900 bg-[linear-gradient(120deg,#1246d8_0%,#182778_36%,#4c1d95_65%,#c81e1e_100%)] p-2.5 shadow-[7px_7px_0_#101828] sm:p-3">
          <div className="absolute inset-0 comic-dots opacity-20" />
          <div className="absolute inset-y-0 left-0 w-32 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent)]" />
          <div className="relative space-y-2.5">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-[0.9rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#7c3aed_0%,#5b21b6_100%)] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#101828] sm:text-sm">
                <Star className="h-3.5 w-3.5 fill-[#ffde59] text-[#ffde59]" />
                Round {round} of {totalRounds}
              </div>
              <div className="flex items-center gap-2 rounded-[0.9rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#1d72d8_0%,#1e40af_100%)] px-3 py-1.5 text-xs font-black capitalize text-white shadow-[3px_3px_0_#101828] sm:text-sm">
                <Radio className="h-3.5 w-3.5" />
                {language}
              </div>
              <div className="flex items-center gap-2 rounded-[0.9rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#22c55e_0%,#15803d_100%)] px-3 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#101828] sm:text-sm">
                <Flame className="h-3.5 w-3.5" />
                {currentWord.difficulty}
              </div>
            </div>

            <div className="rounded-[1.5rem] border-[4px] border-slate-900 bg-[#fff8eb] shadow-[4px_4px_0_#101828]">
              <div className="grid gap-3 rounded-t-[1.25rem] border-b-[4px] border-slate-900 bg-[radial-gradient(circle_at_70%_20%,rgba(255,194,87,0.28),transparent_25%),linear-gradient(180deg,#fffaf0_0%,#fff4dc_100%)] p-3 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.28em] text-slate-900">
                    <Star className="h-3.5 w-3.5 fill-[#7c3aed] text-[#7c3aed]" />
                    Current player
                  </div>
                  <h2 className="font-heading text-4xl leading-none text-[#2563eb] [text-shadow:4px_4px_0_#101828] sm:text-5xl lg:text-6xl">
                    {playerName}
                  </h2>
                  <p className="text-sm font-bold text-slate-900 sm:text-base">
                    {phase === "waiting" && "Warm up your tongue and hit the mic."}
                    {phase === "listening" && "Stay sharp. Your pronunciation is live."}
                    {phase === "evaluating" && "Hold tight. Sip Host is judging the take."}
                    {phase === "result" && "Verdict is in. Let the game keep moving."}
                  </p>
                </div>

                <div className="relative hidden min-h-[130px] overflow-hidden rounded-[1.2rem] border-[4px] border-slate-900 bg-[radial-gradient(circle_at_50%_35%,#ffd84d_0%,#ffc928_32%,transparent_33%),linear-gradient(135deg,#fff3c4_0%,#ffe496_100%)] lg:block">
                  <div className="absolute inset-0 comic-dots opacity-20" />
                  <Image
                    src="/sip-host-mascotgg.png"
                    alt="Sip Host mascot"
                    width={210}
                    height={210}
                    className="absolute bottom-0 right-2 h-[150px] w-auto object-contain drop-shadow-[0_10px_0_rgba(16,24,40,0.16)]"
                  />
                  <div className="absolute left-3 top-3 rounded-full border-[3px] border-slate-900 bg-[#ffde59] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-slate-900 shadow-[3px_3px_0_#101828]">
                    Sip Host
                  </div>
                </div>
              </div>

              <div className="p-2.5 sm:p-3">
                <div className="rounded-[1.2rem] border-[4px] border-slate-900 bg-[radial-gradient(circle_at_10%_18%,rgba(255,208,114,0.38),transparent_16%),radial-gradient(circle_at_88%_24%,rgba(255,208,114,0.28),transparent_20%),linear-gradient(180deg,#fffdfa_0%,#fff6e6_100%)] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.06)]">
                  <div className="relative -mt-4 flex justify-center">
                    <div className="rounded-[0.9rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#7c3aed_0%,#5b21b6_100%)] px-5 py-1.5 text-center font-heading text-xl italic text-white shadow-[4px_4px_0_#101828]">
                      PRONOUNCE THIS
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-2 text-center sm:px-5">
                    <p className="font-heading text-4xl leading-none text-slate-950 sm:text-5xl lg:text-6xl">
                      {currentWord.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showBooth ? (
              <div className="rounded-[1.5rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#0f234f_0%,#0b1737_100%)] p-3 shadow-[5px_5px_0_#101828]">
                <div className="grid gap-3 lg:grid-cols-[88px_100px_minmax(0,1fr)] lg:items-center">
                  <div className="flex items-center justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-slate-900 bg-[conic-gradient(#1d72d8_0deg,#38bdf8_120deg,#1d72d8_220deg,#1e293b_220deg)] shadow-[inset_0_0_0_6px_#0b1737,4px_4px_0_#101828] sm:h-22 sm:w-22">
                      <div className="flex h-[72%] w-[72%] flex-col items-center justify-center rounded-full bg-slate-50 text-slate-950">
                        <span className="text-3xl font-black leading-none">{Math.max(timerValue, 0)}</span>
                        <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-600">{timerLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <MicrophoneButton
                      phase={phase}
                      countdown={countdown}
                      waitingCountdown={waitingCountdown}
                      disabled={phase === "listening" || phase === "evaluating"}
                      onClick={onStartListening}
                    />
                  </div>

                  <div className="space-y-2 text-center lg:text-left">
                    <div className="space-y-1">
                      <p className="text-xl font-black text-white sm:text-2xl">{statusCopy}</p>
                      <p className="inline-flex rounded-full bg-[#ffde59] px-3 py-1 text-xs font-black text-slate-900 sm:text-sm">
                        {helperCopy}
                      </p>
                    </div>
                    {phase === "evaluating" && (
                      <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-slate-900 bg-white px-3 py-1 font-black text-slate-900 shadow-[3px_3px_0_#101828]">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Evaluating...
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 rounded-[1rem] border-[3px] border-slate-700 bg-[#0d1b3c] px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-3 text-slate-100">
                    <Volume2 className="h-4 w-4 text-cyan-300" />
                    <p className="min-h-5 text-xs font-medium sm:text-sm">
                      {liveTranscript || "Live transcript will appear here."}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 rounded-[1.1rem] border-[3px] border-slate-900 bg-[#fff8eb] p-2.5 shadow-[4px_4px_0_#101828] sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-[0.9rem] border-2 border-slate-200 bg-white px-2.5 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-sm font-black text-white">1</div>
                    <div>
                      <p className="text-sm font-black uppercase text-[#2563eb]">Speak</p>
                      <p className="text-[0.7rem] font-medium text-slate-700">Say the word clearly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-[0.9rem] border-2 border-slate-200 bg-white px-2.5 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7c3aed] text-sm font-black text-white">2</div>
                    <div>
                      <p className="text-sm font-black uppercase text-[#7c3aed]">Evaluate</p>
                      <p className="text-[0.7rem] font-medium text-slate-700">We&apos;ll check it</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-[0.9rem] border-2 border-slate-200 bg-white px-2.5 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-sm font-black text-white">3</div>
                    <div>
                      <p className="text-sm font-black uppercase text-[#ef4444]">Verdict</p>
                      <p className="text-[0.7rem] font-medium text-slate-700">Win or sip</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ResultPanel result={result} onNext={onNext} isLastTurn={isLastTurn} />
            )}

            <div className="hidden items-center justify-center gap-5 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#132a70_0%,#1f2f7c_100%)] px-5 py-2.5 text-xs font-black text-white shadow-[4px_4px_0_#101828] lg:flex">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" /> Clean</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-yellow-300" /> Friendly</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-pink-300" /> Respectful</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 xl:hidden">
          <Leaderboard players={players} />
          <ComicJudgeCard compact />
        </div>
      </div>

      <div className="hidden space-y-3 xl:block">
        <div className="comic-panel overflow-hidden rounded-[1.7rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#6d28d9_0%,#581c87_100%)] shadow-[7px_7px_0_#101828]">
          <div className="flex items-center justify-between border-b-[4px] border-slate-900 px-4 py-3 text-white">
            <h3 className="font-heading text-3xl leading-none [text-shadow:3px_3px_0_#101828]">LEADERBOARD</h3>
            <Flame className="h-7 w-7 text-[#ffde59]" />
          </div>
          <div className="p-3">
            <div className="space-y-2.5">
              {topPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`grid grid-cols-[32px_1fr_auto] items-center gap-2.5 rounded-[1rem] border-[3px] border-slate-900 px-3 py-2.5 shadow-[3px_3px_0_#101828] ${
                    index === 0 ? "bg-[linear-gradient(180deg,#ffd54a_0%,#fbbf24_100%)]" : "bg-[#fff8eb]"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-slate-900 text-sm font-black ${index === 0 ? "bg-[#ffde59] text-slate-900" : "bg-white text-[#7c3aed]"}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900">{player.name}</p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-600">
                      W {player.successes} | L {player.fails} | Streak {player.currentStreak}
                    </p>
                  </div>
                  <p className="text-3xl font-heading text-slate-950">{player.score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ComicJudgeCard compact />
      </div>
    </section>
  );
}
