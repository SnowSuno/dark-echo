import type { Vector } from "p5";
import type { Sound } from "~/elements/sound";

interface EntityState {

}

interface PlayerState {

}

export interface WallState {
  position: Vector;
  direction: Vector;
}



export interface GameState {
  sounds: Sound[];
}
