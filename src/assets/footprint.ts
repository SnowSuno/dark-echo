import type { p5 } from "p5-svelte";
import type { Vector } from "p5";
import { v } from "~/utils/vector";

export const drawFootprint = (
  p5: p5, pos: Vector, dir: Vector, left: boolean, alpha: number = 255) => {
  p5.push();

  // p5.stroke("red");
  // p5.strokeWeight(10);
  // p5.point(pos);
  //
  // p5.stroke("blue");
  // const d = v.add(pos, v.mult(dir, 100))
  // p5.line(pos.x, pos.y, d.x, d.y);

  p5.translate(pos);
  p5.rotate(dir.heading());
  // p5.line(0, 0, 0, 50);

  p5.scale(0.3);
  p5.rotate(p5.PI / 2);
  !left && p5.scale(-1, 1);
  p5.rotate(0.08);
  p5.translate(10, -50);

  p5.fill(alpha);
  p5.noStroke();

  p5.beginShape();
  Array(2).fill(0).map(() => {
    p5.curveVertex(44.5, 35.5);
    p5.curveVertex(40, 68);
    p5.curveVertex(7, 68);
    p5.curveVertex(0, 33);
    p5.curveVertex(6, 4);
    p5.curveVertex(20, -5);
    p5.curveVertex(34, 3);
  });

  p5.endShape();

  p5.beginShape();
  p5.vertex(42.5, 98);
  p5.bezierVertex(42.5, 107.389, 34.4411, 115, 24.5, 115);
  p5.bezierVertex(10.8784, 115, 6.5, 107.389, 6.5, 98);
  p5.bezierVertex(6.5, 88.6112, 6.5, 84, 24.5, 84);
  p5.bezierVertex(42.5, 84, 42.5, 88.6112, 42.5, 98);
  p5.endShape();

  // p5.translate(v.neg(pos))

  p5.pop();
};
