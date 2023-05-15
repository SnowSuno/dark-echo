import type { Sketch } from "p5-svelte";
import { createSoundState, initialState, next } from "~/game.old";
import { render } from "~/elements/render";
import type { GameState } from "~/state/interface";
import { Entity } from "~/elements/base";
import { Sound } from "~/elements/sound";
import { vector } from "~/utils/vector";

let state: GameState;

const sounds: Sound[] = [];

export const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    Entity.injectP5(p5);

    // sounds.push(new Sound(vector(p5.width / 2, p5.height / 2), 0, {
    //   intensity: 255,
    //   color: [255, 255, 255]
    // }));

    // state = initialState(p5);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  p5.draw = () => {
    p5.background(0);
    sounds.map(sound => sound.render());
    sounds.map(sound => sound.next());

    // render(p5, state);
    // state = next(p5)(state);
  };

  p5.touchStarted = () => {
    sounds.push(
      ...Sound.createWave(p5.createVector(p5.mouseX, p5.mouseY), p5),
    );
    // state = createSoundState(p5)(state);
  };
};
