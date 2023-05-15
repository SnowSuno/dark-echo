import type { Vector } from "p5";

interface EntityState {

}

interface PlayerState {

}

export interface WallState {
  position: Vector;
  direction: Vector;
}

export interface SoundAttributes {
  intensity: number;
  color: string;
}

export interface SoundPoint {
  position: Vector;
  transition?: Partial<SoundAttributes>;
}

export interface SoundState {
  velocity: Vector;
  trace: SoundPoint[];
  attributes: SoundAttributes;
}

export interface GameState {
  timestamp: number;
  player: PlayerState;
  walls: WallState[];
  sounds: SoundState[];
}
