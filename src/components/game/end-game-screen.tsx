import { Award, Crown, Medal, RotateCcw, ShieldCheck, Sparkles, Star, Swords, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlayerStats } from "@/types/game";

interface EndGameScreenProps {
  players: PlayerStats[];
  onPlayAgain: () => void;
  onNewMatch: () => void;
}

export function EndGameScreen({ players, onPlayAgain, onNewMatch }: EndGameScreenProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score || b.successes - a.successes);
  const champion = sorted[0];
  const runnerUp = sorted[1];
  const bestComeback = [...players].sort((a, b) => b.bestStreak - a.bestStreak)[0];
  const dangerous = [...players].sort((a, b) => b.fails - a.fails)[0];
  const luckiest = [...players].sort((a, b) => b.successes - a.successes)[0];
  const mostAccurate = [...players].sort((a, b) => b.successes - a.successes || a.fails - b.fails)[0];

  const awardCards = [
    {
      label: "Best Comeback",
      value: bestComeback.name,
      icon: Medal,
      tone: "bg-cyan-400/15 text-cyan-100 border-cyan-300/35",
    },
    {
      label: "Sharpest Mouth",
      value: mostAccurate.name,
      icon: ShieldCheck,
      tone: "bg-emerald-400/15 text-emerald-100 border-emerald-300/35",
    },
    {
      label: "Most Dangerous",
      value: dangerous.name,
      icon: Swords,
      tone: "bg-rose-400/15 text-rose-100 border-rose-300/35",
    },
    {
      label: "Luckiest Survivor",
      value: luckiest.name,
      icon: Sparkles,
      tone: "bg-amber-400/15 text-amber-100 border-amber-300/35",
    },
  ];

  return (
    <section className="space-y-4">
      <div className="comic-panel relative overflow-hidden rounded-[2rem] border-[4px] border-slate-900 bg-[linear-gradient(120deg,#0f2d80_0%,#172554_28%,#312e81_56%,#7f1d1d_100%)] p-4 shadow-[8px_8px_0_#101828] sm:p-5">
        <div className="absolute inset-0 comic-dots opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_75%_25%,rgba(250,204,21,0.18),transparent_22%),radial-gradient(circle_at_85%_75%,rgba(244,63,94,0.18),transparent_28%)]" />
        <div className="relative space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffef7f_0%,#ffde59_45%,#ffc928_100%)] px-4 py-1 text-[0.7rem] font-black uppercase tracking-[0.22em] text-slate-900 shadow-[3px_3px_0_#101828]">
              <Trophy className="h-3.5 w-3.5" />
              Final Ranking
            </div>
            <h2 className="mt-3 font-heading text-4xl leading-none text-[#ffe27a] [text-shadow:4px_4px_0_#101828] sm:text-5xl lg:text-6xl">
              Pronunciation Champion
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="rounded-[1.6rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#fff9e8_0%,#fff1c9_100%)] p-4 text-slate-950 shadow-[5px_5px_0_#101828] sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.28em] text-slate-700">
                    <Crown className="h-4 w-4 text-[#7c3aed]" />
                    Champion
                  </div>
                  <p className="font-heading text-4xl leading-none text-[#2563eb] [text-shadow:3px_3px_0_#1018281f] sm:text-5xl">
                    {champion.name}
                  </p>
                  <p className="text-base font-bold text-slate-700 sm:text-lg">
                    Closed the match with {champion.score} points and {champion.successes} clean hits.
                  </p>
                </div>

                <div className="rounded-[1.2rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#7c3aed_0%,#5b21b6_100%)] px-5 py-4 text-center text-white shadow-[4px_4px_0_#101828]">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#ffde59]">Final Score</p>
                  <p className="mt-1 font-heading text-4xl leading-none">{champion.score}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/85">points</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1rem] border-[3px] border-slate-900 bg-white/90 p-3 shadow-[3px_3px_0_#101828]">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-600">Runner Up</p>
                  <p className="mt-1 text-lg font-black text-slate-950">{runnerUp?.name ?? "No rival"}</p>
                </div>
                <div className="rounded-[1rem] border-[3px] border-slate-900 bg-white/90 p-3 shadow-[3px_3px_0_#101828]">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-600">Best Streak</p>
                  <p className="mt-1 text-lg font-black text-slate-950">{champion.bestStreak}</p>
                </div>
                <div className="rounded-[1rem] border-[3px] border-slate-900 bg-white/90 p-3 shadow-[3px_3px_0_#101828]">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-600">Fails</p>
                  <p className="mt-1 text-lg font-black text-slate-950">{champion.fails}</p>
                </div>
              </div>
            </div>

            <div className="comic-panel overflow-hidden rounded-[1.6rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#6d28d9_0%,#581c87_100%)] shadow-[6px_6px_0_#101828]">
              <div className="flex items-center justify-between border-b-[4px] border-slate-900 px-4 py-3 text-white">
                <h3 className="font-heading text-3xl leading-none [text-shadow:3px_3px_0_#101828]">Scoreboard</h3>
                <Award className="h-7 w-7 text-[#ffde59]" />
              </div>
              <div className="space-y-2.5 p-3">
                {sorted.map((player, index) => (
                  <div
                    key={player.id}
                    className={`grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-[1rem] border-[3px] border-slate-900 px-3 py-2.5 shadow-[3px_3px_0_#101828] ${
                      index === 0 ? "bg-[linear-gradient(180deg,#ffd54a_0%,#fbbf24_100%)] text-slate-950" : "bg-[#fff8eb] text-slate-950"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-slate-900 text-sm font-black ${index === 0 ? "bg-[#ffef7f]" : "bg-white text-[#7c3aed]"}`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-base font-black">{player.name}</p>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-600">
                        W {player.successes} | L {player.fails} | Best streak {player.bestStreak}
                      </p>
                    </div>
                    <p className="font-heading text-3xl">{player.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="rounded-[1.6rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,rgba(15,23,42,0.88)_0%,rgba(30,41,59,0.92)_100%)] p-4 text-white shadow-[5px_5px_0_#101828]">
              <div className="mb-3 flex items-center gap-2">
                <Medal className="h-5 w-5 text-cyan-300" />
                <h3 className="font-heading text-2xl">Awards</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {awardCards.map((award) => {
                  const Icon = award.icon;
                  return (
                    <div key={award.label} className={`rounded-[1rem] border p-3 shadow-[3px_3px_0_#101828] ${award.tone}`}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.16em]">{award.label}</p>
                      </div>
                      <p className="mt-2 text-base font-bold text-white">{award.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.6rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#fff8eb_0%,#fff1d3_100%)] p-4 shadow-[5px_5px_0_#101828]">
              <div className="mb-3 flex items-center gap-2 text-slate-950">
                <Star className="h-5 w-5 text-[#7c3aed]" />
                <h3 className="font-heading text-2xl">Next Move</h3>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={onPlayAgain}
                  className="h-11 w-full rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#7cecff_0%,#38bdf8_45%,#1d72d8_100%)] text-sm font-black uppercase tracking-[0.05em] text-slate-950 shadow-[4px_4px_0_#101828] hover:bg-[linear-gradient(180deg,#92efff_0%,#4ac7ff_45%,#2a7ee0_100%)]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Play Again
                </Button>
                <Button
                  onClick={onNewMatch}
                  className="h-11 w-full rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffef7f_0%,#ffde59_45%,#ffc928_100%)] text-sm font-black uppercase tracking-[0.05em] text-slate-950 shadow-[4px_4px_0_#101828] hover:bg-[linear-gradient(180deg,#fff48f_0%,#ffe56b_45%,#ffd139_100%)]"
                >
                  New Match
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
