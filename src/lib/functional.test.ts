import type p5 from "p5";

interface EntityState {

}

interface PlayerState {

}

interface WallState {
  startPos: p5.Vector;
  endPos: p5.Vector;
}

export interface SoundState {
  velocity: p5.Vector;
  trace: p5.Vector[];
  volume: number;
}

export interface GameState {
  timestamp: number;
  player: PlayerState;
  walls: WallState[];
  sounds: SoundState[];
}
