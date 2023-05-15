import type { Vector } from "p5";
import { Entity } from "~/entities/base";

export class Wall extends Entity {
  position: Vector;
  span: Vector;

  constructor(position: Vector, span: Vector) {
    super();
    this.position = position;
    this.span = span;
  }

  collide(pos: Vector, delta: Vector) {
    const divisor = this.span.cross(delta).mag();
    if (divisor === 0) return false;

    const sub = this.p5.createVector().add(pos).sub(this.position);

    const t = sub.cross(delta).mag() / divisor;
    const u = sub.cross(this.span).mag() / divisor;

    return 0 < t && t < 1
      && 0 < u && u < 1;
  }

  render() {
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.line(
      this.position.x, this.position.y,
      this.position.x + this.span.x, this.position.y + this.span.y,
    );
  }

  get normal() {
    return this.p5.createVector(0, 0, 1).cross(this.span);
  }
}

