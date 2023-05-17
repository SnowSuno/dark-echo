import { v } from "~/utils/vector";

import { Wall } from "~/entities";

type Coordinate = [number, number];

export const constructMap = (coords: Coordinate[]) => coords
  .map(c => v(...c))
  .map((p, i, points) =>
    new Wall(points.at(i - 1), p),
  );
