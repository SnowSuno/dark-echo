import type { Vector } from "p5";
import { Entity } from "~/elements/base";

type Color = [number, number, number, number];

const RAYS = 20;

type State = "default" | "death";
const decay = (t: number) => 255 - 7 * Math.sqrt(t);

const colors: Record<State, (t: number) => Color> = {
  default: t => [255, 255, 255, decay(t)],
  death: t => [255, 0, 0, 2 * decay(t)],
};

export class Sound extends Entity {
  timestamp: number;
  velocity: Vector;
  trace: SoundPoint[];

  constructor(pos: Vector, angle: number) {
    super();

    this.timestamp = 0;
    this.velocity = this.p5.createVector(0.8).setHeading(angle);
    this.trace = [new SoundPoint(pos)];
  }

  static createWave(pos: Vector): Sound[] {
    return [...Array(RAYS).keys()]
      .map(n => n * this.p5.TWO_PI / RAYS)
      .map(angle => new Sound(pos, angle));
  }

  get head() {
    return this.trace.at(-1);
  }

  next() {
    this.timestamp += this.p5.deltaTime;

    this.move();
  }

  move() {
    this.trace = [
      ...this.trace,
      new SoundPoint(
        this.p5.createVector()
          .add(this.velocity)
          .mult(this.p5.deltaTime)
          .add(this.head.position),
      ),
    ].slice(-100);
  }

  render() {
    this.p5.noFill();
    this.p5.strokeWeight(5);
    this.p5.strokeCap(this.p5.SQUARE);

    groupPaths(this.trace).forEach(points => {
      this.p5.stroke(colors[points[0].state](this.timestamp));

      this.p5.beginShape();
      points.forEach(point => point.renderVertex());
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
    this.position = position;
  }

  renderVertex() {
    this.p5.vertex(this.position.x, this.position.y);
  }

  get state(): State {
    return this.position.x > this.p5.width / 2
      ? "default"
      : "death";
  }
}
