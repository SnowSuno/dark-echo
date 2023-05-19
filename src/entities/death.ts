import { Entity } from "~/entities/base";
import type { Vector } from "p5";

export class Death extends Entity {
  public readonly origin: Vector;
  public readonly width: number;
  public readonly height: number;

  constructor(origin: Vector, width: number, height: number) {
    super();
    this.origin = origin;
    this.width = width;
    this.height = height;
  }

  debug() {
    this.p5.stroke(255, 0, 0);
    this.p5.strokeWeight(1);
    this.p5.noFill();
    this.p5.rect(this.origin.x, this.origin.y, this.width, this.height);
  }

  contains(pos: Vector) {
    return (
      this.origin.x <= pos.x && pos.x <= this.origin.x + this.width &&
      this.origin.y <= pos.y && pos.y <= this.origin.y + this.height
    );
  }
}
