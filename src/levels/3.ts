import { Death, Goal } from "~/entities";
import { constructWalls } from "~/utils/map";
import { v } from "~/utils/vector";
import { map } from "~/utils/map";

const level = map(() => ({
  levelName: "test",
  walls: constructWalls([
    [-200, -100],
    [-200, 100],
    [900, 100],
    [900, -100],
  ]),
  deaths: [new Goal(v(700, -100), 200, 200)],
  goal: new Goal(v(1000, -100), 200, 200),
}));

export default level;
