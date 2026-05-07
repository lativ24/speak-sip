import { Crown, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerStats } from "@/types/game";

interface LeaderboardProps {
  players: PlayerStats[];
}

export function Leaderboard({ players }: LeaderboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <Card className="border-2 border-amber-300/45 bg-slate-900/80 shadow-[0_14px_36px_rgba(251,191,36,0.14)]">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-3xl text-amber-200">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((player, index) => {
          const rank = index + 1;
          const movedUp = player.previousRank > 0 && rank < player.previousRank;
          const movedDown = player.previousRank > 0 && rank > player.previousRank;
          return (
            <div
              key={player.id}
              className={`rounded-xl border p-3 transition-all ${rank === 1 ? "border-amber-300/70 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.15)]" : "border-slate-700 bg-slate-950/55"}`}
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="flex items-center gap-2 font-semibold text-slate-100">
                  {rank === 1 && <Crown className="h-4 w-4 text-amber-300" />}
                  #{rank} {player.name}
                </p>
                <p className="text-xl font-bold text-cyan-200">{player.score}</p>
              </div>
              <p className="text-xs text-slate-300">
                W {player.successes} | L {player.fails} | Streak {player.currentStreak} (best {player.bestStreak})
              </p>
              <div className="mt-2">
                {movedUp && <TrendingUp className="h-4 w-4 text-emerald-300" />}
                {movedDown && <TrendingDown className="h-4 w-4 text-rose-300" />}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
