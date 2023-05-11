import type p5 from "p5";

interface EntityState {

}

interface PlayerState {

}

interface WallState {
  startPos: p5.Vector;
  endPos: p5.Vector;
}

export interface SoundVertex {
  position: p5.Vector;
  velocity: p5.Vector;
  intensity: number;
}

export type SoundState = SoundVertex[];

export interface GameState {
  timestamp: number;
  player: PlayerState;
  walls: WallState[];
  sounds: SoundState[];
}
