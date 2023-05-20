import { v } from "~/utils/vector";

import { WallSegment, type Wall, type Death, type Goal } from "~/entities";

type Coordinate = [number, number];

export interface Map {
  walls: Wall[];
  deaths: Death[];
  goal: Goal;
}

export const constructWalls = (coords: Coordinate[]): Wall[] => coords
  .map(c => v(...c))
  .map((p, i, points) =>
    new WallSegment(points.at(i - 1), p),
  );

export type LazyMap = () => Map;

export interface Level {
  title: string;
  number: number;
  map: LazyMap;
}

export const map = (
  title: string, number: number, map: LazyMap,
): Level => ({
  title,
  number,
  map,
});
