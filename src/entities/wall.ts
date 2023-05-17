import type { Vector } from "p5";
import { Entity } from "~/entities/base";
import { v } from "~/utils/vector";

const SAFETY_AREA = 5;

export class Wall extends Entity {
  position: Vector;
  span: Vector;

  constructor(p1: Vector, p2: Vector) {
    super();
    this.position = p1;
    this.span = v.sub(p2, p1);
  }

  collide(pos: Vector, delta: Vector) {
    const P = v.sub(pos, this.position);

    const pSpan = v.dot(P, this.unit);
    if (pSpan < -SAFETY_AREA
      || pSpan > this.span.mag() + SAFETY_AREA
    ) return false;

    return (
      v.dot(P, this.normal)
      * v.dot(v.add(P, delta), this.normal)
    ) <= 0;

    // const divisor = this.span.cross(delta).mag();
    // if (divisor === 0) return false;
    //
    // const dP = v.sub(pos, this.position);
    //
    // const t = dP.cross(delta).mag() / divisor;
    // const u = dP.cross(this.span).mag() / divisor;
    //
    // return 0 < t && t < 1
    //   && 0 < u && u < 1;
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

  get unit() {
    return v
      .copy(this.span)
      .normalize();
  }
}

