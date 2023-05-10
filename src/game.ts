import type { p5 } from "p5-svelte";
// import { Vector } from "p5";
import { Vector } from "p5";
import type { GameState, SoundState } from "./lib/functional.test";

const createSoundVector = (p5: p5) => (angle: number) => ({
  velocity: p5.createVector(10, 0).setHeading(angle + 1),
  trace: [p5.createVector(p5.mouseX, p5.mouseY)],
  volume: 255,
});

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

const RAYS = 20;
export const createSoundState: Next<GameState> = p5 => ({
  sounds,
  ...other
}) => ({
  ...other,
  sounds: [
    ...sounds,
    ...[...Array(RAYS).keys()].map(n => n * p5.TWO_PI / RAYS)
      .map(createSoundVector(p5)),
  ],
});

type Next<T> = (p5: p5) => (state: T) => T;
export const next: Next<GameState> = p5 => ({
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

const nextSound: Next<SoundState> = (p5: p5) => ({
  velocity,
  trace,
  volume,
}) => {
  const position = trace.at(0);
  if (position.x < 0 || position.x > p5.width) {
    velocity.x = -velocity.x;
  }
  if (position.y < 0 || position.y > p5.height) {
    velocity.y = -velocity.y;
  }

  const nextPos = p5.createVector()
    .add(velocity)
    .mult(60 / p5.getTargetFrameRate())
    .add(position);

  return {
    velocity: velocity,
    trace: [nextPos, ...trace].slice(0, 100),
    volume: volume - 2,
  };
};
