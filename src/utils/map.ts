import { v } from "~/utils/vector";

import { WallSegment, type Wall, type Death, type Goal } from "~/entities";

type Coordinate = [number, number];

export interface Map {
  levelName: string;
  walls: Wall[];
  deaths: Death[];
  goal: Goal;
}

export const constructWalls = (coords: Coordinate[]): Wall[] => coords
  .map(c => v(...c))
  .map((p, i, points) =>
    new WallSegment(points.at(i - 1), p),
  );

export type Level = () => Map;
export const map = (M: () => Map): Level => M;
