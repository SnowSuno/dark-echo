import type { Vector } from "p5";
import { Entity } from "~/entities/base";
import { v } from "~/utils/vector";

export class Wall extends Entity {
  position: Vector;
  span: Vector;

  constructor(position: Vector, span: Vector) {
    super();
    this.position = position;
    this.span = span;
  }

  collide(pos: Vector, delta: Vector) {
    // const relPos = sub(pos, this.position);


    // const yCross =
      // rel




    const divisor = this.span.cross(delta).mag();
    if (divisor === 0) return false;

    const dP = v.sub(pos, this.position);

    const t = dP.cross(delta).mag() / divisor;
    const u = dP.cross(this.span).mag() / divisor;

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
    return v(0, 0, 1)
      .cross(this.span)
      .normalize();
  }
}

