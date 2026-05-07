import { Sparkles, WandSparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ComicJudgeCardProps {
  compact?: boolean;
}

export function ComicJudgeCard({ compact = false }: ComicJudgeCardProps) {
  return (
    <Card className="comic-panel judge-card relative overflow-hidden border-2 border-slate-900 bg-[#38bdf8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(255,222,89,0.5),transparent_45%),radial-gradient(circle_at_90%_18%,rgba(239,68,68,0.35),transparent_40%)]" />
      <div className="absolute inset-0 comic-dots opacity-35" />
      <div className="absolute right-3 top-3 rounded-full border-2 border-slate-900 bg-[#ffde59] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-900">
        Live Host
      </div>
      <CardContent className={`relative ${compact ? "p-3" : "p-5"} space-y-3`}>
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-900 bg-[#ffde59] ring-4 ring-white/30">
            <Image src="/sip-host-mascotgg.png" alt="Sip Host mascot" width={56} height={56} className="h-full w-full object-cover" />
            <span className="absolute -right-1 -top-1 rounded-full border border-slate-900 bg-[#ff5757] p-1 text-white">
              <WandSparkles className="h-3 w-3" />
            </span>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-800">Game Host</p>
            <h3 className="font-heading text-2xl leading-none text-slate-900">Sip Host</h3>
          </div>
        </div>
        <div className="speech-bubble border-2 border-slate-900 bg-white/95 p-3 text-sm leading-5 text-slate-900">
          <Sparkles className="mr-2 inline h-4 w-4 text-[#1d4ed8]" />
          Keep it clean. Keep it sharp. If your vowels panic, your drink rises.
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-900">
          <span className="h-2 w-2 rounded-full bg-[#ff5757] animate-pulse" />
          Roast mode armed
        </div>
      </CardContent>
    </Card>
  );
}
