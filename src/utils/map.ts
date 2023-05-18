import { v } from "~/utils/vector";

import { WallSegment, type Wall } from "~/entities";

type Coordinate = [number, number];

export const constructMap = (coords: Coordinate[]): Wall[] => coords
  .map(c => v(...c))
  .map((p, i, points) =>
    new WallSegment(points.at(i - 1), p),
  );
