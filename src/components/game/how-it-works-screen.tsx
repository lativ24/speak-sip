import Image from "next/image";
import { ArrowLeft, CheckCircle2, Flame, Mic, Play, ShieldCheck, Sparkles, Star, Trophy, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksScreenProps {
  onBack: () => void;
  onStart: () => void;
}

const roundSteps = [
  {
    number: "1",
    title: "Tap the mic",
    copy: "Start the turn before the countdown runs out.",
    tone: "bg-[linear-gradient(180deg,#4aa5ff_0%,#1d4ed8_100%)] text-white",
  },
  {
    number: "2",
    title: "Say it clearly",
    copy: "Pronounce the word while Sip Host listens live.",
    tone: "bg-[linear-gradient(180deg,#8a2cff_0%,#6522c9_100%)] text-white",
  },
  {
    number: "3",
    title: "Get judged",
    copy: "You get transcript, score, and an instant verdict.",
    tone: "bg-[linear-gradient(180deg,#ff6b57_0%,#d91912_100%)] text-white",
  },
  {
    number: "4",
    title: "Pass the turn",
    copy: "Next player jumps in and the chaos keeps rolling.",
    tone: "bg-[linear-gradient(180deg,#86eb42_0%,#59c61f_100%)] text-slate-900",
  },
];

const scoringRules = [
  "Accuracy drives most of your points.",
  "Harder words are worth more.",
  "Successful turns build your streak.",
  "Misses hurt, but a brave try can still earn tiny pity points.",
];

const roomTips = [
  "Keep your mouth close to the mic in noisy rooms.",
  "Pause half a second before speaking so the transcript catches the start.",
  "One person talks at a time if you want cleaner scoring.",
];

export function HowItWorksScreen({ onBack, onStart }: HowItWorksScreenProps) {
  return (
    <section className="space-y-4">
      <div className="comic-panel relative overflow-hidden rounded-[2rem] border-[4px] border-slate-900 bg-[linear-gradient(120deg,#1246d8_0%,#182778_34%,#4c1d95_64%,#c81e1e_100%)] p-3 shadow-[8px_8px_0_#101828] sm:p-4">
        <div className="absolute inset-0 comic-dots opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(250,204,21,0.16),transparent_18%),radial-gradient(circle_at_85%_75%,rgba(244,63,94,0.18),transparent_24%)]" />

        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-11 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#1c3bb4_0%,#16276b_100%)] px-5 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[4px_4px_0_#101828] hover:bg-[linear-gradient(180deg,#2448d6_0%,#1a317f_100%)]"
            >
              <ArrowLeft className="h-4 w-4 text-[#ffde59]" />
              Back
            </Button>

            <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffef7f_0%,#ffde59_45%,#ffc928_100%)] px-4 py-1.5 text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-900 shadow-[3px_3px_0_#101828]">
              <Star className="h-4 w-4 fill-current" />
              Show Briefing
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[1.7rem] border-[4px] border-slate-900 bg-[#fff8eb] shadow-[5px_5px_0_#101828]">
              <div className="grid gap-4 rounded-t-[1.45rem] border-b-[4px] border-slate-900 bg-[radial-gradient(circle_at_70%_20%,rgba(255,194,87,0.28),transparent_25%),linear-gradient(180deg,#fffaf0_0%,#fff4dc_100%)] p-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.26em] text-slate-700">
                    <Zap className="h-4 w-4 fill-[#ffde59] text-[#ffde59]" />
                    How it works
                  </div>
                  <h2 className="font-heading text-4xl leading-none text-[#2563eb] [text-shadow:4px_4px_0_#101828] sm:text-5xl lg:text-6xl">
                    Speak or Sip
                  </h2>
                  <p className="max-w-2xl text-sm font-bold leading-6 text-slate-800 sm:text-base">
                    Take turns pronouncing the word on screen. Sip Host listens, scores your attempt, and decides whether you stay safe or take the sip.
                  </p>
                </div>

                <div className="relative hidden min-h-[180px] overflow-hidden rounded-[1.4rem] border-[4px] border-slate-900 bg-[radial-gradient(circle_at_50%_35%,#ffd84d_0%,#ffc928_32%,transparent_33%),linear-gradient(135deg,#fff3c4_0%,#ffe496_100%)] lg:block">
                  <div className="absolute inset-0 comic-dots opacity-20" />
                  <Image
                    src="/sip-host-mascotgg.png"
                    alt="Sip Host mascot"
                    width={230}
                    height={230}
                    className="absolute bottom-0 right-3 h-[180px] w-auto object-contain drop-shadow-[0_10px_0_rgba(16,24,40,0.16)]"
                  />
                  <div className="absolute left-3 top-3 rounded-full border-[3px] border-slate-900 bg-[#ffde59] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-slate-900 shadow-[3px_3px_0_#101828]">
                    Sip Host
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {roundSteps.map((step) => (
                    <div
                      key={step.number}
                      className={`rounded-[1.2rem] border-[4px] border-slate-900 p-3 shadow-[4px_4px_0_#101828] ${step.tone}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-slate-900 bg-white/90 text-lg font-black text-slate-900">
                          {step.number}
                        </div>
                        {step.number === "1" && <Mic className="h-5 w-5" />}
                        {step.number === "2" && <Volume2 className="h-5 w-5" />}
                        {step.number === "3" && <Trophy className="h-5 w-5" />}
                        {step.number === "4" && <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <p className="mt-3 text-lg font-heading uppercase leading-none">{step.title}</p>
                      <p className="mt-2 text-xs font-bold leading-5 opacity-95">{step.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.7rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#6d28d9_0%,#581c87_100%)] p-4 text-white shadow-[6px_6px_0_#101828]">
                <div className="mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#ffde59]" />
                  <h3 className="font-heading text-2xl">Scoring</h3>
                </div>
                <div className="space-y-2.5">
                  {scoringRules.map((rule, index) => (
                    <div key={rule} className="rounded-[1rem] border-[3px] border-slate-900 bg-white/95 px-3 py-2.5 text-slate-900 shadow-[3px_3px_0_#101828]">
                      <p className="text-sm font-bold leading-5">
                        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-slate-900 bg-[#ffde59] text-xs font-black text-slate-900">
                          {index + 1}
                        </span>
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.7rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#fff8eb_0%,#fff1d3_100%)] p-4 shadow-[6px_6px_0_#101828]">
                <div className="mb-3 flex items-center gap-2 text-slate-900">
                  <Sparkles className="h-5 w-5 text-[#7c3aed]" />
                  <h3 className="font-heading text-2xl">Host Tips</h3>
                </div>
                <div className="space-y-2.5">
                  {roomTips.map((tip) => (
                    <div key={tip} className="rounded-[1rem] border-[3px] border-slate-900 bg-white px-3 py-2.5 shadow-[3px_3px_0_#101828]">
                      <p className="text-sm font-bold leading-5 text-slate-800">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="rounded-[1.5rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#0f234f_0%,#0b1737_100%)] p-4 text-white shadow-[5px_5px_0_#101828]">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1rem] border-[3px] border-slate-900 bg-white/95 p-3 text-slate-900 shadow-[3px_3px_0_#101828]">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#1d4ed8]">Goal</p>
                  <p className="mt-1 text-sm font-bold leading-5">Stack points, survive rounds, and own the leaderboard.</p>
                </div>
                <div className="rounded-[1rem] border-[3px] border-slate-900 bg-white/95 p-3 text-slate-900 shadow-[3px_3px_0_#101828]">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#7c3aed]">Mic Rules</p>
                  <p className="mt-1 text-sm font-bold leading-5">One speaker at a time gives the cleanest transcript and fairest score.</p>
                </div>
                <div className="rounded-[1rem] border-[3px] border-slate-900 bg-white/95 p-3 text-slate-900 shadow-[3px_3px_0_#101828]">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#ef4444]">Vibe</p>
                  <p className="mt-1 text-sm font-bold leading-5">Competitive, silly, and still clean enough for everyone in the room.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#fff8eb_0%,#fff1d3_100%)] p-4 shadow-[5px_5px_0_#101828]">
              <div className="mb-3 flex items-center gap-2 text-slate-900">
                <ShieldCheck className="h-5 w-5 text-[#ef4444]" />
                <h3 className="font-heading text-2xl">Ready?</h3>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={onStart}
                  className="h-12 w-full rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffef7f_0%,#ffde59_45%,#ffc928_100%)] text-sm font-black uppercase tracking-[0.05em] text-slate-900 shadow-[4px_4px_0_#101828] hover:bg-[linear-gradient(180deg,#fff48f_0%,#ffe56b_45%,#ffd139_100%)]"
                >
                  <Play className="h-4 w-4" />
                  Start Game Setup
                </Button>
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="h-11 w-full rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#1c3bb4_0%,#16276b_100%)] text-sm font-black uppercase tracking-[0.04em] text-white shadow-[4px_4px_0_#101828] hover:bg-[linear-gradient(180deg,#2448d6_0%,#1a317f_100%)]"
                >
                  <ArrowLeft className="h-4 w-4 text-[#ffde59]" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
