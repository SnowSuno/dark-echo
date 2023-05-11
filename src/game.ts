import type { Sketch } from "p5-svelte";
import { createSoundState, initialState, next } from "~/game.old";
import { render } from "~/elements/render";
import type { GameState } from "~/state/interface";

let state: GameState;

export const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    state = initialState(p5);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  p5.draw = () => {
    render(p5, state);
    state = next(p5)(state);
  };

  p5.touchStarted = () => {
    state = createSoundState(p5)(state);
  };
};
