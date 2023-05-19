import type { Vector } from "p5";

import { Entity, type Wall } from "~/entities";
import { v } from "~/utils/vector";
import { HITBOX_RADIUS } from "~/constants";
import { drawFootprint } from "~/assets/footprint";

const MOVEMENT_SPEED = 0.18;

export class Player extends Entity {
  readonly position: Vector;
  readonly size: number;
  direction: Vector;
  private readonly footsteps: Footstep[];

  constructor(position = v(0, 0), size = HITBOX_RADIUS) {
    super();
    this.position = position;
    this.size = size;
    this.direction = v(1, 0);
    this.footsteps = []
    Array(2).fill(0).map(left => this.createFootstep());
  }

  public render() {
    this.footsteps.map(footstep => footstep.render());
    // [true, false].forEach(isLeft => {
    //   drawFootprint(this.p5, this.position, this.direction, isLeft, )
    // });
  }

  public debug() {
    this.p5.noStroke();
    this.p5.fill(...this.DEBUG_COLOR);
    this.p5.circle(this.position.x, this.position.y, this.size * 2);
  }

  //  public renderHitboxPoints(walls: Wall[]) {
  //   this.p5.stroke(255, 0, 0);
  //   this.p5.strokeWeight(5);
  //   walls.map(wall => {
  //     this.p5.point(wall.playerCorrection(this.position, v()))
  //   });
  // }

  public next(walls: Wall[]) {
    if (this.p5.mouseIsPressed) {
      this.updateDirection();
      this.move(walls);

      // this.position.add(
      //   v(this.p5.mouseX, this.p5.mouseY)
      //     .sub(this.p5.width / 2, this.p5.height / 2)
      //     .normalize()
      //     .mult(0.18)
      //     .mult(this.p5.deltaTime),
      // );
    }

    this.footsteps.slice(0, -2).map(footstep => footstep.next());
  }

  private updateDirection() {
    this.direction = v(this.p5.mouseX, this.p5.mouseY)
      .sub(this.p5.width / 2, this.p5.height / 2)
      .normalize();
  }

  private move(walls: Wall[]) {
    const delta = v
      .copy(this.direction)
      .mult(MOVEMENT_SPEED * this.p5.deltaTime);

    const collisionDeltas = walls
      .map(wall => wall.playerDelta(this.position, delta, this.size))
      .filter(wall => !!wall);

    if (collisionDeltas.length > 1) return;

    const collisionDelta = collisionDeltas.at(0);

    // const correction = corrections.at(0) ?? v(0, 0);

    this.position.add(collisionDelta || delta);
    // .add(correction);

    // this.position.add(
    //   v(this.p5.mouseX, this.p5.mouseY)
    //     .sub(this.p5.width / 2, this.p5.height / 2)
    //     .normalize()
    //     .mult(0.18)
    //     .mult(this.p5.deltaTime),
    // );
  }

  public createFootstep() {
    this.footsteps.push(new Footstep(
      this.position,
      this.direction,
      !(this.footsteps.at(-1)?.left),
    ));
  }

}

class Footstep extends Entity {
  private alpha: number;
  private readonly position: Vector;
  private readonly direction: Vector;
  readonly left: boolean;

  constructor(position: Vector, direction: Vector, left: boolean) {
    super();
    this.position = v.copy(position);
    this.alpha = 255;
    this.direction = v.copy(direction);
    this.left = left;
  }

  public render() {
    // this.p5.noStroke();
    // this.p5.fill(this.alpha);
    // this.p5.circle(this.position.x, this.position.y, 20);
    drawFootprint(this.p5, this.position, this.direction, this.left, this.alpha);
  }

  public next() {
    this.alpha = Math.max(this.alpha - 0.1 * this.p5.deltaTime, 50);
  }
}
