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

export const ImmutableVector = new Proxy(Vector, {
  construct: (target, args) => Object.seal(
    new Proxy(new target(...args), {
      get: (target, prop) => {
        if (mutableOperations.includes(prop)) {
          console.log(prop)
        }

        // console.log("target", target);
        // console.log("prop", prop);
        // console.log("receiver", receiver);
        // console.log(typeof target[prop]);
        return target.copy()[prop];
      },
    }),
  ),
});

const vector = new Vector(0, 0, 0);

