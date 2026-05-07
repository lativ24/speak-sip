import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { difficultyStyles } from "@/lib/game-config";
import { LanguageMode, TurnPhase, WordEntry } from "@/types/game";

interface RoundCardProps {
  roundLabel: string;
  playerName: string;
  language: LanguageMode;
  word: WordEntry;
  phase: TurnPhase;
}

export function RoundCard({ roundLabel, playerName, language, word, phase }: RoundCardProps) {
  return (
    <Card className="comic-panel relative overflow-hidden rounded-[1.7rem] border-[4px] border-slate-900 bg-[#fff8dc] shadow-[7px_7px_0_#101828]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.18)_0%,rgba(168,85,247,0.22)_48%,rgba(239,68,68,0.18)_100%)]" />
      <div className="absolute inset-0 comic-dots opacity-15" />
      <div className="absolute right-3 top-3 comic-burst border-[3px] border-slate-900 bg-[#ffde59] px-3 py-1.5 font-heading text-base text-slate-900 shadow-[3px_3px_0_#101828] sm:right-4 sm:top-4">
        LIVE
      </div>
      <CardContent className="relative space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2.5 pr-16 sm:pr-20">
          <Badge className="border-[3px] border-slate-900 bg-[#a855f7] px-3 py-0.5 text-xs text-white shadow-[3px_3px_0_#101828]">{roundLabel}</Badge>
          <Badge variant="outline" className="border-[3px] border-slate-900 bg-[#38bdf8] px-3 py-0.5 text-xs text-slate-900 capitalize shadow-[3px_3px_0_#101828]">
            {language}
          </Badge>
          <Badge variant="outline" className={`border-[3px] px-3 py-0.5 text-xs shadow-[3px_3px_0_#101828] ${difficultyStyles[word.difficulty]}`}>
            {word.difficulty}
          </Badge>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_200px] lg:items-end">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-slate-700">Current player</p>
            <h2 className="mt-1.5 font-heading text-3xl leading-none text-[#1d4ed8] [text-shadow:3px_3px_0_#1018281a] sm:text-4xl lg:text-5xl">{playerName}</h2>
          </div>
          <div className="rounded-[1.1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#102872_0%,#1d4ed8_100%)] px-3 py-2.5 text-white shadow-[3px_3px_0_#101828]">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#ffde59]">Host cue</p>
            <p className="mt-1.5 text-xs font-black uppercase leading-[1.2] sm:text-sm">
              {phase === "waiting" && "Mic is hot. Hit it fast."}
              {phase === "listening" && "Say it loud and clear."}
              {phase === "evaluating" && "Judging the delivery."}
              {phase === "result" && "Verdict locked in."}
            </p>
          </div>
        </div>
        <div className="rounded-[1.4rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#ff6d5b_0%,#ef4444_45%,#c91f14_100%)] p-4 text-center shadow-[inset_0_0_24px_rgba(0,0,0,0.22),5px_5px_0_#101828]">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-yellow-100">Pronounce this</p>
          <p className="mt-2 font-heading text-3xl leading-tight text-white [text-shadow:3px_3px_0_#101828] sm:text-4xl lg:text-[2.6rem]">{word.text}</p>
        </div>
        <p className="rounded-[1rem] border-[3px] border-slate-900 bg-white/75 px-3.5 py-2.5 text-sm font-bold leading-5 text-slate-700 shadow-[3px_3px_0_#101828]">
          {phase === "waiting" && "Warm up your tongue and hit the mic."}
          {phase === "listening" && "Listening to your pronunciation now..."}
          {phase === "evaluating" && "Sip Host is judging your attempt."}
          {phase === "result" && "Result locked. Move to next player."}
        </p>
      </CardContent>
    </Card>
  );
}
