import type { Vector } from "p5";
import { v } from "~/utils/vector";
import { type Wall, Death, Entity } from "~/entities";
import type { Map } from "~/utils/map";

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
  private readonly map: Map;

  constructor(pos: Vector, angle: number, map: Map) {
    super();

    this.timestamp = 0;
    this.velocity = v(0.8).setHeading(angle);
    this.map = map;
    this.trace = [this.createPoint(pos)];
  }

  public static createWave(pos: Vector, map: Map): Sound[] {
    return [...Array(RAYS).keys()]
      .map(n => n * this.p5.TWO_PI / RAYS)
      .map(angle => new Sound(pos, angle, map));
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
        return wall.reflect(this.velocity);
      }
    }
  }

  private move() {
    this.trace = [
      ...this.trace,
      this.createPoint(v
        .copy(this.velocity)
        .mult(this.p5.deltaTime)
        .add(this.head.position),
      ),
    ].slice(-100);
  }

  private createPoint(pos: Vector) {
    return new SoundPoint(pos, this.map.deaths);
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
  readonly position: Vector;
  readonly state: State;

  constructor(position: Vector, deaths: Death[]) {
    super();
    this.position = v.copy(position);
    this.state = deaths
      .some(death => death.contains(this.position))
      ? "death"
      : "default";
  }

  public render() {
    this.p5.vertex(...v.comp(this.position));
  }

  // public getState(deaths: Death[]): State {
  //   return deaths.some(death => death.contains(this.position))
  //     ? "default"
  //     : "death";
  // }
}
