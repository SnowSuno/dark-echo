import type { GameState } from "./interface";
import { vector } from "~/utils/vector";

export const initialState = (): GameState => ({
  timestamp: 0,
  player: {},
  walls: [
    {
      position: vector(0, 100),
      direction: vector(100, 0),
    },
  ],
  sounds: [],
});
