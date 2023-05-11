import type { p5 } from "p5-svelte";
import type { Vector } from "p5";
import type { GameState, SoundState } from "../state/interface";

export const render = (p5: p5, state: GameState) => {
  p5.background(0);
  p5.noStroke();
  // p5.fill(255);
  // p5.circle(p5.mouseX, p5.mouseY, ballSize);
  // state.walls.forEach((wall) => {
  //   p5.line(wall.startPos.x, wall.startPos.y, wall.endPos.x, wall.endPos.y);
  // });

  // await Promise.all(state.sounds.map(renderSound(p5)));
  state.sounds.forEach(renderSound(p5));

  // p5.noStroke();
  // p5.fill(255, 0, 0);
  // p5.blendMode(p5.DARKEST);
  // p5.rect(0, 0, 200, p5.height);
};

const renderSound = (p5: p5) => ({ velocity, trace, volume }: SoundState) => {
  // trace.forEach((pos, index) => {
  //   p5.noStroke();
  //   p5.fill(255, 255, 255, volume * (1 - index / 500));
  //   p5.circle(pos.x, pos.y, 6);
  // });
  p5.strokeWeight(4);
  p5.strokeCap(p5.SQUARE);

  p5.stroke(255, 255, 255, volume);
  p5.beginShape();
  p5.noFill();
  trace.map((pos, index) => {
    p5.stroke(
      // ...color(pos, p5.width / 2),
      // index > 30 ? 255 : 0,
      255,
      255,
      255,
      volume * (1 - index / 100),
    );
    p5.vertex(pos.x, pos.y);
  });
  p5.endShape();
  // trace.reduce<[Vector, number]>(([prev, index], curr) => {
  //   p5.line(prev.x, prev.y, curr.x, curr.y);
  //   return [curr, index + 1];
  // }, [trace.at(0), 0]);
};

const color = (pos: Vector, w): [number, number, number] => pos.x > w
  ? [255, 255, 255]
  : [0, 0, 255];
