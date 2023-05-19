import { v } from "~/utils/vector";

import { WallSegment, type Wall, Death } from "~/entities";

type Coordinate = [number, number];

export interface Map {
  walls: Wall[];
  deaths: Death[];
}

export const constructWalls = (coords: Coordinate[]): Wall[] => coords
  .map(c => v(...c))
  .map((p, i, points) =>
    new WallSegment(points.at(i - 1), p),
  );
