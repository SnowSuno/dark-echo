<script lang="ts">
  import P5, { type Sketch } from "p5-svelte";
  import { createSoundState, initialState, next } from "./game";
  import type { GameState } from "./lib/functional.test";
  import { render } from "./elements/render";

  let ballSize: number = 10;
  let state: GameState;

  const sketch: Sketch = p5 => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
      // p5.noCursor();

      state = initialState(p5);

      // setInterval(() => {
      //   state = next(p5)(state);
      // }, 30);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
    };

    p5.draw = () => {
      render(p5, state);
      state = next(p5)(state);
    };

    // p5.mouseClicked = () => {
    //   state = createSoundState(p5)(state);
    // }

    p5.touchStarted = () => {
      state = createSoundState(p5)(state);
    }
  };
</script>

<P5 {sketch}/>
