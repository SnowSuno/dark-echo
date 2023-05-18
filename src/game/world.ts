import { Entity, Player, Sound, WallSegment } from "~/entities";
import { constructMap } from "~/utils/map";
import { v } from "~/utils/vector";

export class World extends Entity {
  player: Player;
  sounds: Sound[];
  walls: WallSegment[];

  interval: NodeJS.Timer;

  private constructor(player: Player, sounds: Sound[], walls: WallSegment[]) {
    super();
    this.player = player;
    this.sounds = sounds;
    this.walls = walls;
  }

  public static init() {
    return new World(
      new Player(),
      [],
      constructMap([
        [-200, -100],
        [-200, 100],
        [500, 100],
        [900, 500],
        [900, -100],
      ]),
    );
  }

  public render() {
    this.p5.background(0);
    this.setCamera();

    this.player.render();
    this.sounds.map(sound => sound.render());

    this.walls.map(wall => wall.render());
  }

  public next() {
    this.sounds = this.sounds.filter(sound => !sound.willBeRemoved());
    this.player.next(this.walls);
    this.sounds.map(sounds => sounds.next(this.walls));
  }

  public debug() {
    this.player.debug();
    this.walls.map(wall => wall.debug());
  }

  private setCamera() {
    this.p5.translate(
      v(this.p5.width / 2, this.p5.height / 2)
        .sub(this.player.position),
    );
  }
}

