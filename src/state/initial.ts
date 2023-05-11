import type { p5 } from "p5-svelte";
import type { GameState } from "./interface";

export const initialState = (p5: p5): GameState => ({
  timestamp: 0,
  player: {},
  walls: [
    {
      startPos: p5.createVector(0, p5.height / 2),
      endPos: p5.createVector(p5.width, p5.height / 2),
    },
  ],
  sounds: [],
});
