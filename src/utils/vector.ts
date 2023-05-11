import { Vector } from "p5";

const mutableOperations: (string | symbol)[] = [
  "set",
  "add",
  "rem",
  "sub",
  "mult",
  "div",
  "dot",
  "cross",
  "normalize",
  "limit",
  "setMag",
  "setHeading",
  "rotate",
  "lerp",
  "reflect",
];

const freezeVectorMethods = (vector: Vector) => new Proxy(vector, {
  get: (target, prop) => {
    if (
      typeof target[prop] === "function"
      && mutableOperations.includes(prop)
    ) return function(...args) {
      return freezeVectorMethods(target.copy()[prop](...args));
    };

    return target[prop];
  },
});


export const ImmutableVector = new Proxy(Vector, {
  construct: (target, args) => Object.freeze(
    freezeVectorMethods(new target(...args)),
  ),
});

export const createImmutableVector = (x?: number, y?: number, z?: number) => {
  return new ImmutableVector(x, y, z);
}
