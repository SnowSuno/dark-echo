import { Vector } from "p5";

const init = (x?: number, y?: number, z?: number) => new Vector(x, y, z);

export const v = Object.assign(init, {
  copy: (v1: Vector) => init().add(v1),
  add: (v1: Vector, v2: Vector) => init().add(v1).add(v2),
  sub: (v1: Vector, v2: Vector) => init().add(v1).sub(v2),
  dot: (v1: Vector, v2: Vector) => init().add(v1).dot(v2),
  mult: (v1: Vector, n: number) => init().add(v1).mult(n),
  comp: (v1: Vector) => [v1.x, v1.y, v1.z] as const,
});

