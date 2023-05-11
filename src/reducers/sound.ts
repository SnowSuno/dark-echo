import type { Next } from "~/types/types";
import type { SoundState } from "~/state/interface";

export const nextSound: Next<SoundState> = p5 => (sound) => (
  sound.map(({
    position,
    velocity,
    intensity,
  }) => ({
    position,
    velocity,
    intensity: intensity - 1,
  }))
);
