import type { Vector } from "p5";

import { Entity, Wall } from "~/entities";
import { v } from "~/utils/vector";
import { HITBOX_SIZE } from "~/constants";

const MOVEMENT_SPEED = 0.18;

export class Player extends Entity {
  readonly position: Vector;
  direction: Vector;
  private readonly footsteps: Footstep[];

  constructor(position = v(0, 0)) {
    super();
    this.position = position;
    this.direction = v(1, 0);
    this.footsteps = [];
  }

  public render() {
    this.footsteps.map(footstep => footstep.render());
  }

  public debug() {
    this.p5.noStroke();
    this.p5.fill(...this.DEBUG_COLOR);
    this.p5.circle(this.position.x, this.position.y, HITBOX_SIZE);
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

    this.footsteps.map(footstep => footstep.next());
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

    const corrections = walls
      .map(wall => wall.playerCorrection(this.position, delta))
      .filter(correction => !!correction);

    if (corrections.length > 1) return;

    if (corrections.length > 0) console.log("wall meet");

    const correction = corrections.at(0) ?? v(0, 0);

    this.position
      .add(delta)
      .add(correction);

    // this.position.add(
    //   v(this.p5.mouseX, this.p5.mouseY)
    //     .sub(this.p5.width / 2, this.p5.height / 2)
    //     .normalize()
    //     .mult(0.18)
    //     .mult(this.p5.deltaTime),
    // );
  }

  public createFootstep() {
    this.footsteps.push(new Footstep(this.position));
  }

}

class Footstep extends Entity {
  private alpha: number;
  private readonly position: Vector;
  private readonly direction: Vector;
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
