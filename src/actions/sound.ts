import type { p5 } from "p5-svelte";

import type { GameState, SoundState } from "~/state/interface";
import type { Next } from "~/types/types";

const createSound = (p5: p5) => (angle: number): SoundState => ({
  trace: [
    {
      position: p5.createVector(10, 0).setHeading(angle + 1),
      origin: p5.createVector(p5.mouseX, p5.mouseY),
      intensity: {
        start: 255,
        end: 255,
      },
    },
  ],
  volume: 255,
});

const RAYS = 20;
export const createSoundState: Next<GameState> = p5 => ({
  sounds,
  ...other
}) => ({
  ...other,
  sounds: [
    ...sounds,
    ...[...Array(RAYS).keys()].map(n => n * p5.TWO_PI / RAYS)
      .map(createSound(p5)),
  ],
});
