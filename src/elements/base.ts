import type { p5 } from "p5-svelte";

export class Entity {
  protected static p5: p5;

  constructor() {
    if (!Entity.p5) throw new Error("p5 not injected");
  }

  get p5() {
    return Entity.p5;
  }

  render() {
  };

  next() {
  }

  static injectP5(p5: p5) {
    Entity.p5 = p5;
  }

}
