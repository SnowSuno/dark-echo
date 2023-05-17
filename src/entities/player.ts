import type { Vector } from "p5";

import { Entity } from "~/entities";
import { v } from "~/utils/vector";

class Footstep extends Entity {
  private alpha: number;
  private readonly position: Vector;
  private readonly direction: number;
  private readonly left: boolean;

  constructor(position: Vector) {
    super();
    this.position = v.copy(position);
    this.alpha = 255;
  }

  public render() {
    this.p5.noStroke();
    this.p5.fill(this.alpha);
    this.p5.circle(this.position.x, this.position.y, 20);
  }

  public next() {
    this.alpha = Math.max(this.alpha - 0.1 * this.p5.deltaTime, 80);
  }
}

export class Player extends Entity {
  readonly position: Vector;
  private readonly footsteps: Footstep[];

  constructor(position = v(0, 0)) {
    super();
    this.position = position;
    this.footsteps = [];
  }

  public render() {
    // this.setCamera();

    // this.p5.fill(255);
    // this.p5.circle(this.position.x, this.position.y, 50);

    this.footsteps.map(footstep => footstep.render());
  }

  public next() {
    if (this.p5.mouseIsPressed) {
      this.position.add(
        v(this.p5.mouseX, this.p5.mouseY)
          .sub(this.p5.width / 2, this.p5.height / 2)
          .normalize()
          .mult(0.18)
          .mult(this.p5.deltaTime),
      );
    }

    this.footsteps.map(footstep => footstep.next());
  }

  public createFootstep() {
    this.footsteps.push(new Footstep(this.position));
  }

}
