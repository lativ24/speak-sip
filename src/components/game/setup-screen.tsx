import Image from "next/image";
import { ArrowLeft, Check, Crown, Globe, MessageCircleMore, Plus, ShieldCheck, Timer, Trash2, UserRound, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageMode, MatchLength } from "@/types/game";

interface SetupScreenProps {
  onBack: () => void;
  language: LanguageMode;
  setLanguage: (language: LanguageMode) => void;
  rounds: MatchLength;
  setRounds: (rounds: MatchLength) => void;
  players: string[];
  updatePlayer: (index: number, name: string) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  startMatch: () => void;
  error?: string;
}

const roundOptions: {
  value: MatchLength;
  label: string;
  subtitle: string;
  icon: typeof Zap;
  accent: string;
  badge: string;
  selectedTone: string;
}[] = [
  {
    value: 6,
    label: "Quick Match",
    subtitle: "6 rounds",
    icon: Zap,
    accent: "text-[#1d9bf0]",
    badge: "Fast & fun!",
    selectedTone: "bg-[linear-gradient(180deg,#ffe66d_0%,#ffc928_100%)]",
  },
  {
    value: 12,
    label: "Standard Game",
    subtitle: "12 rounds",
    icon: Crown,
    accent: "text-[#d9a400]",
    badge: "Best balance!",
    selectedTone: "bg-[linear-gradient(180deg,#ffe66d_0%,#ffc928_100%)]",
  },
  {
    value: 20,
    label: "Party Mode",
    subtitle: "20 rounds",
    icon: Globe,
    accent: "text-[#7c3aed]",
    badge: "All night long!",
    selectedTone: "bg-[linear-gradient(180deg,#ffe66d_0%,#ffc928_100%)]",
  },
];

export function SetupScreen({
  onBack,
  language,
  setLanguage,
  rounds,
  setRounds,
  players,
  updatePlayer,
  addPlayer,
  removePlayer,
  startMatch,
  error,
}: SetupScreenProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#1c3bb4_0%,#16276b_100%)] px-5 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[4px_4px_0_#101828] hover:bg-[linear-gradient(180deg,#2448d6_0%,#1a317f_100%)]"
        >
          <ArrowLeft className="h-4 w-4 text-[#ffde59]" />
          Back
        </Button>
        <div className="flex items-center gap-2 text-white">
          <Zap className="h-5 w-5 fill-[#ffde59] text-[#ffde59] drop-shadow-[2px_2px_0_#101828]" />
          <span className="text-[1rem] font-heading uppercase tracking-[0.02em] text-white [text-shadow:3px_3px_0_#101828] sm:text-[1.6rem]">
            Match Setup
          </span>
        </div>
      </div>

      <div className="space-y-1 text-center">
        <h2 className="font-heading text-[2rem] uppercase leading-[0.92] text-white [text-shadow:4px_4px_0_#101828] sm:text-[2.8rem] lg:text-[3.7rem]">
          <span className="text-white">Set Up</span>{" "}
          <span className="text-[#ffcf2f]">Your Match</span>
        </h2>
        <p className="mx-auto max-w-3xl text-sm font-black text-white [text-shadow:2px_2px_0_#101828] sm:text-base">
          Build your squad. Choose your mode. Let the good times and roasts roll.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.72fr_1.1fr_0.98fr] xl:items-start">
        <aside className="rounded-[2rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#2d4dfb_0%,#3d0ea8_55%,#112561_100%)] p-3 shadow-[8px_8px_0_#101828]">
          <div className="rounded-[1.5rem] border-[3px] border-slate-900 bg-[radial-gradient(circle_at_top,#6f41ff_0%,#2f1b8c_55%,#141f6c_100%)] p-3">
            <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#8258ff_0%,#6231d8_100%)] px-5 py-2 text-lg font-black uppercase text-white shadow-[4px_4px_0_#101828]">
              Sippy AKA Your Host
            </div>
            <div className="relative overflow-hidden rounded-[1.4rem] border-[3px] border-slate-900 bg-[radial-gradient(circle_at_top,#6e3cff_0%,#35179c_48%,#191d71_100%)] px-2 pb-3 pt-2 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)]">
              <div className="absolute inset-x-5 top-5 h-28 rounded-full bg-[#ffde59]/30 blur-2xl" />
              <Image
                src="/sip-host-mascotgg.png"
                alt="Sip Host mascot"
                width={560}
                height={560}
                className="relative z-10 mx-auto h-auto w-full max-w-[310px] drop-shadow-[0_10px_0_#101828]"
              />
            </div>

            <div className="mt-4 rounded-[1.4rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#102872_0%,#081545_100%)] p-4 text-white shadow-[5px_5px_0_#101828]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.8rem] font-black uppercase tracking-[0.16em] text-[#ffde59]">Host tip</p>
                  <p className="mt-2 text-sm font-bold leading-[1.3] text-white/90">
                    More players = more laughs.
                    <br />
                    More rounds = more glory.
                  </p>
                </div>
                <Image
                  src="/sip-host-mascotgg.png"
                  alt=""
                  width={100}
                  height={100}
                  className="h-auto w-14 rotate-[12deg] drop-shadow-[0_4px_0_#101828]"
                />
              </div>
            </div>
          </div>
        </aside>

        <div className="rounded-[1.6rem] border-[4px] border-slate-900 bg-[#fff8dc] p-3 shadow-[7px_7px_0_#101828]">
          <div className="rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#2b7fff_0%,#1748b8_100%)] px-4 py-2 text-white shadow-[4px_4px_0_#101828]">
            <div className="flex items-center gap-3">
              <MessageCircleMore className="h-5 w-5" />
              <p className="font-heading text-[1.35rem] uppercase leading-none [text-shadow:2px_2px_0_#101828]">1. Language Mode</p>
            </div>
          </div>
          <p className="px-2 pt-3 text-sm font-bold text-slate-600">Choose your language to play in.</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(["english", "spanish"] as const).map((mode) => {
              const selected = language === mode;
              const label = mode === "english" ? "EN" : "ES";
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLanguage(mode)}
                  className={`relative rounded-[1.15rem] border-[4px] p-3 text-left shadow-[4px_4px_0_#101828] transition ${
                    selected
                      ? "border-slate-900 bg-[linear-gradient(180deg,#2b7fff_0%,#1449c6_100%)] text-white"
                      : "border-slate-900 bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f4_100%)] text-slate-900 hover:bg-[#fffdfa]"
                  }`}
                  aria-pressed={selected}
                >
                  {selected && (
                    <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-slate-900 bg-black text-white shadow-[2px_2px_0_#101828]">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border-[3px] text-[1.05rem] font-heading leading-none shadow-[3px_3px_0_#101828] ${
                    selected
                      ? "border-white bg-[#fff8dc] text-slate-900"
                      : "border-slate-500 bg-white text-slate-900"
                  }`}>
                    {label}
                  </div>
                  <p className="mt-3 text-center text-[1.2rem] font-heading capitalize leading-none">{mode}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#8a2cff_0%,#6522c9_100%)] px-4 py-2 text-white shadow-[4px_4px_0_#101828]">
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5" />
              <p className="font-heading text-[1.35rem] uppercase leading-none [text-shadow:2px_2px_0_#101828]">2. Match Length</p>
            </div>
          </div>
          <p className="px-2 pt-3 text-sm font-bold text-slate-600">How many rounds of fun are you ready for?</p>

          <div className="mt-3 grid gap-3">
            {roundOptions.map((option) => {
              const Icon = option.icon;
              const selected = rounds === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRounds(option.value)}
                  className={`relative flex items-center gap-3 rounded-[1.15rem] border-[4px] px-4 py-3 text-left shadow-[4px_4px_0_#101828] transition-colors ${
                    selected
                      ? `${option.selectedTone} border-slate-900`
                      : "border-slate-900 bg-white hover:bg-[#fff3d6]"
                  }`}
                >
                  <Icon className={`h-8 w-8 shrink-0 ${option.accent} ${option.value === 6 ? "fill-current" : ""}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[1.2rem] font-heading uppercase leading-none text-slate-900">{option.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-700">{option.subtitle}</p>
                  </div>
                  <div className={`rounded-[0.8rem] border-[3px] border-slate-900 px-3 py-1.5 text-center text-[0.72rem] font-black uppercase leading-[1.05] shadow-[3px_3px_0_#101828] ${
                    option.value === 12
                      ? "bg-[linear-gradient(180deg,#8a2cff_0%,#6522c9_100%)] text-white"
                      : option.value === 6
                        ? "bg-[linear-gradient(180deg,#57c7ff_0%,#1e8fff_100%)] text-white"
                        : "bg-[linear-gradient(180deg,#9f6fff_0%,#6f3ef0_100%)] text-white"
                  }`}>
                    {option.badge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.6rem] border-[4px] border-slate-900 bg-[#fff8dc] p-3 shadow-[7px_7px_0_#101828]">
          <div className="rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#ff4d4d_0%,#da1d2d_100%)] px-4 py-2 text-white shadow-[4px_4px_0_#101828]">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              <p className="font-heading text-[1.35rem] uppercase leading-none [text-shadow:2px_2px_0_#101828]">3. Participants</p>
            </div>
          </div>
          <p className="px-2 pt-3 text-sm font-bold text-slate-600">Add players to your squad.</p>

          <div className="mt-3 max-h-[22rem] space-y-3 overflow-y-auto pr-1 sm:max-h-[24rem]">
            {players.map((player, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-700" />
                  <Input
                    value={player}
                    onChange={(event) => updatePlayer(index, event.target.value)}
                    placeholder={`Player ${index + 1}`}
                    className="h-13 rounded-[1rem] border-[4px] border-slate-900 bg-white pl-13 pr-4 text-base font-bold text-slate-900 placeholder:text-slate-500 focus-visible:border-[#1d4ed8] focus-visible:ring-[#93c5fd]"
                  />
                </div>
                {players.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removePlayer(index)}
                    className="h-13 w-13 rounded-[1rem] border-[4px] border-slate-900 bg-[#ff5757] p-0 text-white shadow-[4px_4px_0_#101828] hover:bg-[#ef4444]"
                    aria-label={`Remove player ${index + 1}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addPlayer}
            className="mt-4 h-13 w-full rounded-[1rem] border-[4px] border-dashed border-slate-900 bg-white text-base font-black uppercase tracking-[0.03em] text-slate-900 shadow-none hover:bg-[#fff3d6]"
          >
            <Plus className="h-5 w-5" />
            Add participant
          </Button>

          <div className="mt-4 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#fff6e5_0%,#fff0d3_100%)] p-3 shadow-[4px_4px_0_#101828]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] border-slate-900 bg-[#ffde59] text-[#ef4444] shadow-[3px_3px_0_#101828]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[0.9rem] font-black uppercase text-[#ef4444]">Pro Tip</p>
                  <p className="mt-1 text-xs font-bold leading-[1.25] text-slate-700">
                    3+ players makes it wilder.
                    <br />
                    No limit on the laughs!
                  </p>
                </div>
              </div>
              <div className="hidden rounded-[0.8rem] border-[3px] border-slate-900 bg-white px-3 py-2 text-center text-[0.8rem] font-black uppercase leading-[1.05] text-slate-900 shadow-[3px_3px_0_#101828] sm:block">
                The more
                <br />
                the messier!
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-3 rounded-[1rem] border-[4px] border-slate-900 bg-[#ff5757] px-4 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_#101828]">
              {error}
            </p>
          )}

          <Button
            onClick={startMatch}
            className="mt-4 h-16 w-full rounded-[1.15rem] border-[4px] border-slate-900 bg-[linear-gradient(180deg,#86eb42_0%,#59c61f_100%)] text-[1.45rem] font-heading uppercase tracking-[0.03em] text-white shadow-[5px_5px_0_#101828] hover:bg-[linear-gradient(180deg,#90f54d_0%,#63cf2b_100%)] [text-shadow:3px_3px_0_#101828]"
          >
            <Zap className="mr-2 h-6 w-6 fill-[#ffde59] text-[#ffde59]" />
            Start Match
          </Button>
        </div>
      </div>

      <div className="mx-auto flex w-fit items-center gap-3 rounded-[1rem] border-[3px] border-slate-900 bg-[linear-gradient(180deg,#291064_0%,#1b0d4f_100%)] px-4 py-2 text-white shadow-[4px_4px_0_#101828]">
        <ShieldCheck className="h-5 w-5 text-[#ff5a1f]" />
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.1em]">Clean • Friendly • Respectful</p>
          <p className="text-[0.7rem] font-bold text-white/80">We keep it fun and respectful.</p>
        </div>
      </div>
    </section>
  );
}
