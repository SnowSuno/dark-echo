import { Vector } from "p5";

const init = (x?: number, y?: number, z?: number) => new Vector(x, y, z);
const copy = (v1: Vector) => init().add(v1);
const add = (v1: Vector, v2: Vector) => init().add(v1).add(v2);
const sub = (v1: Vector, v2: Vector) => init().add(v1).sub(v2);
const dot = (v1: Vector, v2: Vector) => init().add(v1).dot(v2);
const mult = (v1: Vector, n: number) => init().add(v1).mult(n);
const proj = (v1: Vector, v2: Vector) => copy(v2).setMag(dot(v1, v2) / v2.mag());
const comp = (v1: Vector) => [v1.x, v1.y, v1.z] as const;

export const v = Object.assign(
  init,
  { copy, add, sub, dot, mult, proj, comp },
);

