import { CheckCircle2, Flame, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EvaluationResult } from "@/types/game";

interface ResultPanelProps {
  result: EvaluationResult | null;
  onNext: () => void;
  isLastTurn: boolean;
}

export function ResultPanel({ result, onNext, isLastTurn }: ResultPanelProps) {
  if (!result) return null;

  return (
    <Card
      className={`comic-panel result-card relative overflow-hidden rounded-[1.5rem] border-[4px] ${result.success ? "border-slate-900 bg-[linear-gradient(180deg,#a5f071_0%,#7ed957_48%,#5cbf2d_100%)]" : "border-slate-900 bg-[linear-gradient(180deg,#ff8274_0%,#ff5757_42%,#dc2626_100%)]"} shadow-[6px_6px_0_#101828]`}
    >
      <div className={`absolute inset-0 ${result.success ? "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.35),transparent_45%)]" : "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.3),transparent_45%)]"}`} />
      <div className="absolute inset-0 comic-dots opacity-30" />
      <div className="absolute right-3 top-3 comic-burst border-[3px] border-slate-900 bg-[#ffde59] px-3 py-1 font-heading text-base text-slate-900 shadow-[3px_3px_0_#101828] sm:right-4 sm:top-4">
        {result.success ? "YEAH!" : "OOPS!"}
      </div>
      <CardContent className="relative space-y-3 p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center gap-2 pr-14">
          {result.success ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-300 sm:h-7 sm:w-7" />
          ) : (
            <TriangleAlert className="h-6 w-6 text-rose-300 sm:h-7 sm:w-7" />
          )}
          <h3 className={`font-heading text-2xl leading-none sm:text-3xl ${result.success ? "text-slate-900" : "text-yellow-100"} [text-shadow:3px_3px_0_#101828]`}>
            {result.success ? "YOU SURVIVED" : "DRINK"}
          </h3>
        </div>
        <p className="speech-bubble rounded-[1rem] border-[3px] border-slate-900 bg-white/92 p-3 text-sm font-bold leading-5 text-slate-900 shadow-[3px_3px_0_#101828]">{result.comment}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-[0.9rem] border-[3px] border-slate-900 bg-white/88 p-2.5 text-center shadow-[3px_3px_0_#101828]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">Accuracy</p>
            <p className="text-xl font-heading text-[#1d4ed8] sm:text-2xl">{result.accuracy}%</p>
          </div>
          <div className="rounded-[0.9rem] border-[3px] border-slate-900 bg-white/88 p-2.5 text-center shadow-[3px_3px_0_#101828]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">Points</p>
            <p className="text-xl font-heading text-[#dc2626] sm:text-2xl">+{result.awardedPoints}</p>
          </div>
          <div className="rounded-[0.9rem] border-[3px] border-slate-900 bg-white/88 p-2.5 text-center shadow-[3px_3px_0_#101828]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">Transcript</p>
            <p className="text-xs font-bold leading-5 text-slate-900">{result.transcript}</p>
          </div>
        </div>
        <Button onClick={onNext} className="h-10 w-full rounded-[0.9rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffef7f_0%,#ffde59_45%,#ffc928_100%)] text-sm font-black uppercase tracking-[0.04em] text-slate-900 shadow-[4px_4px_0_#101828] transition-transform hover:scale-[1.01] hover:bg-[linear-gradient(180deg,#fff48f_0%,#ffe56b_45%,#ffd139_100%)] sm:h-11">
          <Flame className="h-4 w-4" />
          {isLastTurn ? "View Final Ranking" : "Next Player"}
        </Button>
      </CardContent>
    </Card>
  );
}
