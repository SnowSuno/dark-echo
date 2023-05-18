import type { Vector } from "p5";
import { Entity } from "~/entities/base";
import { v } from "~/utils/vector";
import { SAFETY_AREA, HITBOX_RADIUS } from "~/constants";

export interface Wall extends Entity {
  collide(pos: Vector, delta: Vector, hitbox?: number): boolean;

  reflect(vector: Vector): void;

  playerDelta(pos: Vector, delta: Vector, size: number): Vector | void;
}

export class WallSegment extends Entity implements Wall {
  private readonly origin: Vector;
  private readonly span: Vector;

  constructor(p1: Vector, p2: Vector) {
    super();
    this.origin = p1;
    this.span = v.sub(p2, p1);
  }

  public collide(pos: Vector, delta: Vector, hitbox?: number) {
    const relPos = this.relativeToOrigin(pos);

    if (hitbox) relPos.sub(this.normal
      .mult(v.dot(relPos, this.normal))
      .setMag(hitbox),
    );

    return this.collideRelative(relPos, delta);
  }

  public reflect(vector: Vector) {
    vector.reflect(this.normal);
  }

  public playerDelta(pos: Vector, delta: Vector, size: number) {
    if (!this.collide(pos, delta, size)) return;
    return this.unit.mult(this.unit.dot(delta));
  }

  protected collideRelative(relPos: Vector, delta: Vector) {
    const pSpan = v.dot(relPos, this.unit);
    if (pSpan < -SAFETY_AREA
      || pSpan > this.span.mag() + SAFETY_AREA
    ) return false;

    return (
      v.dot(relPos, this.normal)
      * v.dot(v.add(relPos, delta), this.normal)
    ) <= 0;
  }

  public playerCorrection(pos: Vector, delta: Vector): Vector | undefined {
    const relPos = this.relativeToOrigin(pos);

    const unit = this.normal
      .mult(v.dot(relPos, this.normal))
      .normalize();

    relPos.add(v
      .copy(unit)
      .mult(-HITBOX_RADIUS),
    );

    if (!this.collideRelative(relPos, delta)) return;

    return v
      .copy(unit)
      .mult(v.dot(relPos, unit));

    // return v.add(this.origin, relPos);
  }

  private relativeToOrigin(vector: Vector) {
    return v.sub(vector, this.origin);
  }

  public render() {
  }

  public debug() {
    this.p5.stroke(...this.DEBUG_COLOR);
    this.p5.strokeWeight(1);
    this.p5.line(
      this.origin.x, this.origin.y,
      this.origin.x + this.span.x, this.origin.y + this.span.y,
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

// TODO
// export class WallJoint extends Entity implements Wall {
//   private readonly origin: Vector;
//
//   constructor(p: Vector) {
//     super();
//     this.origin = p;
//   }
//
//   collide(pos: Vector, delta: Vector, hitbox?: number) {
//     return false;
//   }
//
// }
