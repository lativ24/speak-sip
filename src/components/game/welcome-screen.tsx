import Image from "next/image";
import { ArrowRight, BookOpen, Flame, Globe, Play, ShieldCheck, Sparkles, Star, Users, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
  onHowItWorks: () => void;
}

export function WelcomeScreen({ onStart, onHowItWorks }: WelcomeScreenProps) {
  return (
    <section className="space-y-4">
      <div className="comic-panel overflow-hidden rounded-3xl border-2 border-slate-900 ">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-900 bg-[#020720] px-3 py-3 sm:px-5">
          <div className="flex items-center gap-6 sm:gap-8">
            <Image src="/speak-or-sip-logo-mainl.png" alt="Speak or Sip logo" width={180} height={64} className="h-auto w-[8rem] sm:h-12" />
            <div className="hidden items-center gap-2 md:flex">
              <Button className="h-9 border-2 border-[#101828] bg-[#ffde59] px-5 font-bold text-slate-900 shadow-[3px_3px_0_#101828] hover:bg-[#ffd429]">
                Home
              </Button>
              <button
                type="button"
                onClick={onHowItWorks}
                className="h-9 rounded-xl border border-transparent px-4 text-sm font-bold uppercase tracking-[0.06em] text-white/85 transition hover:border-white/30"
              >
                Instructions
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-white/20 bg-[#030d34] px-3 py-2 text-sm font-bold text-white">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime-400" />
              MIC: LIVE
            </div>
            <div className="rounded-xl border border-white/20 bg-[#030d34] px-3 py-2 text-sm font-bold text-white">
              Sip Host
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-3 lg:grid-cols-[0.92fr_1.16fr]">
          <div className="comic-panel px-4 text-white sm:px-6">
            <div className="mt-3 max-w-xl">
              <Image src="/speak-or-sip-logo-with-hostgg.png" alt="Speak or Sip" width={640} height={360} className="mx-auto h-auto w-full max-w-[460px] drop-shadow-[0_8px_0_#101828]" />
            </div>
            <div className="flex pr-20 flex-wrap justify-center gap-3 mt-4 md:-mt-4">
              <div className="rounded-full border-2 border-slate-900 bg-[#ffde59] px-4 py-2 text-sm font-bold text-slate-900">
                <Globe className="mr-2 inline h-4 w-4" />
                English
              </div>
              <div className="rounded-full border-2 border-slate-900 bg-white px-4 py-2 text-sm font-bold text-slate-900">
                <Globe className="mr-2 inline h-4 w-4" />
                Spanish
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                onClick={onStart}
                className="h-16 w-full rounded-[1.65rem] border-[3px] border-slate-900 bg-[radial-gradient(circle_at_top,#ff6b57_0%,#ff3b30_42%,#d91912_100%)] px-5 text-[1.05rem] font-black uppercase tracking-[0.05em] text-white shadow-[0_0_0_2px_#ffd34d_inset,5px_5px_0_#101828] hover:bg-[radial-gradient(circle_at_top,#ff7661_0%,#ff493e_42%,#df2118_100%)] sm:w-[92%]"
              >
                <span className="flex w-full items-center justify-between">
                  <span className="flex-1 text-center text-4xl leading-none sm:text-[2.5rem]">Play</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-slate-900 bg-[#fff8dc] text-[#d91912] shadow-[2px_2px_0_#101828]">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </span>
              </Button>
              <Button
                onClick={onHowItWorks}
                className="h-16 w-full rounded-[1.65rem] border-[3px] border-slate-900 bg-[radial-gradient(circle_at_top,#a855f7_0%,#7c3aed_46%,#5417b7_100%)] px-5 text-[1.05rem] font-black uppercase tracking-[0.04em] text-white shadow-[0_0_0_2px_#d9b8ff_inset,5px_5px_0_#101828] hover:bg-[radial-gradient(circle_at_top,#b56cff_0%,#8947f5_46%,#6120ca_100%)] sm:w-[92%]"
              >
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="flex-1 text-center text-[1.55rem] leading-none sm:text-[1.8rem]">Info</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-slate-900 bg-[#fff8dc] text-[#6d28d9] shadow-[2px_2px_0_#101828]">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </span>
              </Button>
            </div>

            <div className="comic-panel mt-4 rounded-2xl border-2 border-slate-900 bg-[#102872] p-3">
              <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-[#ffde59]">Choose your mode</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-[1.35rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#4aa5ff_0%,#1d4ed8_100%)] px-3 py-3 text-left text-white shadow-[3px_3px_0_#101828]">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 shrink-0 fill-[#ffde59] text-[#ffde59]" />
                    <p className="text-[1.05rem] font-black uppercase leading-none">Quick Match</p>
                  </div>
                  <p className="mt-1 pl-7 text-xs font-semibold text-white/85">Jump in • Fast rounds</p>
                </div>
                <div className="rounded-[1.35rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffd95a_0%,#f7b500_100%)] px-3 py-3 text-left text-slate-900 shadow-[3px_3px_0_#101828]">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 shrink-0 fill-transparent text-slate-900" />
                    <p className="text-[1.05rem] font-black uppercase leading-none">Standard</p>
                  </div>
                  <p className="mt-1 pl-7 text-xs font-semibold text-slate-800">Classic • Best for groups</p>
                </div>
                <div className="rounded-[1.35rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#b764ff_0%,#7c3aed_100%)] px-3 py-3 text-left text-white shadow-[3px_3px_0_#101828]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 shrink-0 text-[#ffde59]" />
                    <p className="text-[1.05rem] font-black uppercase leading-none">Party Mode</p>
                  </div>
                  <p className="mt-1 pl-7 text-xs font-semibold text-white/85">Chaos • Max laughs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="comic-panel host overflow-visible rounded-2xl border-2 border-slate-900 p-3 sm:p-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_295px] lg:items-start">
              <div className="host-stage comic-panel relative overflow-visible p-3 pb-0">
                <div className="absolute left-3 top-3 z-[99] rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#291064_0%,#1b0d4f_100%)] px-4 pb-5 pt-3 text-white shadow-[4px_4px_0_#101828]">
                  <p className="flex items-center gap-1.5 text-[0.6rem] font-black uppercase tracking-[0.08em] text-white">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff3b30] shadow-[0_0_8px_rgba(255,59,48,0.95)]" />
                    Live Host
                  </p>
                  <p className="mt-2 text-[1.7rem] font-heading leading-none tracking-[-0.03em]">Sip Host</p>
                  <span className="absolute -bottom-3.5 left-3 inline-flex h-8 items-center rounded-[0.75rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ff5f57_0%,#ff2d20_100%)] px-3 text-[0.95rem] font-black uppercase tracking-[0.04em] text-white shadow-[3px_3px_0_#101828]">
                    ON AIR
                  </span>
                </div>
                <div className="host-stage__image relative mt-[135px] min-h-[340px] sm:min-h-[410px]">
                  <Image
                    src="/sip-host-mascotgg.png"
                    alt="Sip Host mascot"
                    width={560}
                    height={560}
                    className="host-stage__mascot absolute bottom-[-14px] left-1/2 block h-auto w-[108%] max-w-none -translate-x-1/2 drop-shadow-[0_10px_0_#101828] sm:bottom-[-22px] sm:w-[112%] lg:w-[100%]"
                  />
                </div>
              </div>

              <div className="relative z-20 space-y-3 pt-2">

                <div className="grid gap-3">
                  <div className="comic-panel relative z-20 rounded-[22px] border-[3px] border-slate-900 bg-[#fff7db] p-4 shadow-[5px_5px_0_#101828]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-slate-900 bg-[#fff3d6] text-[#ff5a1f] shadow-[3px_3px_0_#101828]">
                        <Flame className="h-6 w-6 fill-current" />
                      </div>
                      <div>
                        <p className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-[#ff5a1f]">Status</p>
                        <p className="text-sm font-black uppercase tracking-[0.04em] text-slate-900">Roast mode armed</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[13px] font-black leading-[1.08] text-slate-900">
                      Expect heat.
                      <br />
                      Bring your best
                      <br />
                      pronunciation.
                    </p>
                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div className="h-4 flex-1 overflow-hidden rounded-full border-[3px] border-slate-900 bg-white shadow-[2px_2px_0_#101828]">
                        <div className="h-full w-full bg-gradient-to-r from-[#ff4d1f] via-[#ff9f1c] to-[#ffe45c]" />
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-[16px] font-black leading-none text-slate-900">100%</span>
                        <Flame className="h-8 w-8 text-[#ff5a1f] drop-shadow-[2px_2px_0_#facc15]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[20px] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ffe66d_0%,#ffbf1f_100%)] p-3 text-slate-900 shadow-[4px_4px_0_#101828]">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.14em]">Tonight</p>
                      <p className="mt-1 text-[1.35rem] font-heading leading-none">Spicy</p>
                      <p className="mt-1 text-[11px] font-bold leading-[1.1]">Fast jokes and loud reactions.</p>
                    </div>
                    <div className="rounded-[20px] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#a7f3ff_0%,#57c7ff_100%)] p-3 text-slate-900 shadow-[4px_4px_0_#101828]">
                      <div className="flex items-center justify-between">
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.14em]">Crowd</p>
                        <Sparkles className="h-4 w-4 text-[#1d4ed8]" />
                      </div>
                      <p className="mt-1 text-[1.35rem] font-heading leading-none">Hyped</p>
                      <p className="mt-1 text-[11px] font-bold leading-[1.1]">Big energy, clean chaos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="comic-panel rounded-[28px] border-2 border-slate-900 bg-[#fff8dc] px-3 py-3 shadow-[6px_6px_0_#101828] sm:px-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr_1fr] lg:items-center">
              <div className="flex items-center gap-3 px-2 lg:border-r lg:border-slate-900/15 lg:pr-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-[#6d28d9] text-white shadow-[3px_3px_0_#101828]">
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-slate-900">Voice-powered</p>
                  <p className="text-xs text-slate-700">Real-time pronunciation analysis using AI.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 lg:border-r lg:border-slate-900/15 lg:pr-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-[#facc15] text-slate-900 shadow-[3px_3px_0_#101828]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-slate-900">Built for parties</p>
                  <p className="text-xs text-slate-700">Perfect for game nights, classrooms and events.</p>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-slate-900 bg-[#9be5ff] px-4 py-3 shadow-[4px_4px_0_#101828]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-[#ffde59] text-slate-900 shadow-[3px_3px_0_#101828]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase text-slate-900">Rank. Roast. Repeat.</p>
                    <p className="text-xs text-slate-700">Climb the leaderboard and earn bragging rights.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 lg:border-r lg:border-slate-900/15 lg:pr-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-[#ef4444] text-white shadow-[3px_3px_0_#101828]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-slate-900">Clean & friendly</p>
                  <p className="text-xs text-slate-700">We keep it fun, respectful, and family-safe.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-[#7c3aed] text-white shadow-[3px_3px_0_#101828]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-slate-900">Play anywhere</p>
                  <p className="text-xs text-slate-700">One link. Any device. Endless laughs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
