import { Entity, Player, Sound, Death, type Wall } from "~/entities";
import { constructWalls } from "~/utils/map";
import { v } from "~/utils/vector";
import type { Map } from "~/utils/map";

export class World extends Entity {
  readonly player: Player;
  readonly map: Map;

  sounds: Sound[];

  interval: NodeJS.Timer;

  private constructor(player: Player, map: Map) {
    super();
    this.player = player;
    this.map = map;

    this.sounds = [];
  }

  public static init() {
    return new World(
      new Player(),
      {
        walls: constructWalls([
          [-200, -100],
          [-200, 100],
          [500, 100],
          [900, 500],
          [900, -100],
        ]),
        deaths: [new Death(v(700, 300), 200, 200)],
      },
    );
  }

  public render() {
    this.p5.background(0);
    this.setCamera();

    this.player.render();
    this.sounds.map(sound => sound.render());

    this.map.walls.map(wall => wall.render());
  }

  public next() {
    this.sounds = this.sounds.filter(sound => !sound.willBeRemoved());
    this.player.next(this.map.walls);
    this.sounds.map(sounds => sounds.next(this.map.walls));
  }

  public debug() {
    this.player.debug();
    this.map.walls.map(wall => wall.debug());
    this.map.deaths.map(death => death.debug());
  }

  private setCamera() {
    this.p5.translate(
      v(this.p5.width / 2, this.p5.height / 2)
        .sub(this.player.position),
    );
  }
}

