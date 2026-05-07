import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TurnPhase } from "@/types/game";

interface MicrophoneButtonProps {
  phase: TurnPhase;
  countdown: number;
  waitingCountdown: number;
  disabled: boolean;
  onClick: () => void;
}

export function MicrophoneButton({ phase, countdown, waitingCountdown, disabled, onClick }: MicrophoneButtonProps) {
  const listening = phase === "listening";
  const waiting = phase === "waiting";

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`mic-btn relative h-24 w-24 rounded-full border-[5px] border-slate-900 text-slate-900 transition-all duration-300 sm:h-28 sm:w-28 ${
          listening
            ? "scale-105 bg-[radial-gradient(circle_at_top,#ff8a7e_0%,#ff5757_38%,#d91f11_100%)] text-white"
            : waiting
              ? "bg-[radial-gradient(circle_at_top,#fff08b_0%,#ffde59_42%,#f7b500_100%)]"
              : "bg-[radial-gradient(circle_at_top,#8deaff_0%,#38bdf8_42%,#1d72d8_100%)]"
        } ${disabled ? "opacity-85" : "hover:scale-[1.06]"}`}
        aria-live="polite"
      >
        <span className="absolute inset-2 rounded-full border-[3px] border-white/35" />
        <span className="absolute left-3 top-3 h-4 w-4 rounded-full bg-white/45 blur-sm" />
        <Mic className={`relative z-10 h-8 w-8 sm:h-9 sm:w-9 ${listening ? "animate-pulse" : ""}`} />
      </Button>
    </div>
  );
}
