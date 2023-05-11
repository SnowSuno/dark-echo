import type { GameState } from "~/state/interface";
import type { Next } from "~/types/types";

export const next: Next<GameState> = (p5) => ({
  timestamp,
  player,
  walls,
  sounds,
}) => ({
  timestamp: timestamp + 1,
  player: player,
  walls: walls,
  sounds: sounds.map(nextSound(p5)).filter(({ volume }) => volume > 0),
});
