import type { Vector } from "p5";
import { Entity } from "~/entities/base";
import type { Wall } from "~/entities/wall";
import { v } from "~/utils/vector";

type Color = [number, number, number, number];

const RAYS = 20;

type State = "default" | "death";
const decay = (t: number) => 255 - 7 * Math.sqrt(t);

const colors: Record<State, (t: number) => Color> = {
  default: t => [255, 255, 255, decay(t)],
  death: t => [255, 0, 0, 2 * decay(t)],
};

export class Sound extends Entity {
  private timestamp: number;

  private trace: SoundPoint[];
  private readonly velocity: Vector;

  constructor(pos: Vector, angle: number) {
    super();

    this.timestamp = 0;
    this.velocity = v(0.8).setHeading(angle);
    this.trace = [new SoundPoint(pos)];
  }

  public static createWave(pos: Vector): Sound[] {
    return [...Array(RAYS).keys()]
      .map(n => n * this.p5.TWO_PI / RAYS)
      .map(angle => new Sound(pos, angle));
  }

  private get head() {
    return this.trace.at(-1);
  }

  public willBeRemoved() {
    return decay(this.timestamp) < 10;
  }

  public next(walls: Wall[]) {
    this.timestamp += this.p5.deltaTime;

    this.handleCollision(walls);
    this.move();
  }

  private handleCollision(walls: Wall[]) {
    const delta = v.mult(this.velocity, this.p5.deltaTime);

    for (const wall of walls) {
      if (wall.collide(this.head.position, delta)) {
        this.velocity.reflect(wall.normal);
        return;
      }
    }
  }

  private move() {
    this.trace = [
      ...this.trace,
      new SoundPoint(v
        .copy(this.velocity)
        .mult(this.p5.deltaTime)
        .add(this.head.position),
      ),
    ].slice(-100);
  }

  public render() {
    this.p5.noFill();
    this.p5.strokeWeight(5);
    this.p5.strokeCap(this.p5.SQUARE);
    this.p5.strokeJoin(this.p5.BEVEL);

    groupPaths(this.trace).forEach(points => {
      this.p5.stroke(colors[points[0].state](this.timestamp));

      this.p5.beginShape();
      points.forEach(point => point.render());
      this.p5.endShape();
    });

  }
}

const groupPaths = (points: SoundPoint[]) => points.reduce<SoundPoint[][]>(
  (acc, point) => {
    const lastGroup = acc.at(-1);
    lastGroup?.push(point);

    if (!lastGroup || lastGroup[0].state !== point.state) {
      acc.push([point]);
    }

    return acc;
  }, []);

class SoundPoint extends Entity {
  position: Vector;

  constructor(position: Vector) {
    super();
    this.position = v.copy(position);
  }

  public render() {
    this.p5.vertex(...v.comp(this.position));
  }

  public get state(): State {
    return this.position.x < 2000
      ? "default"
      : "death";
  }
}
