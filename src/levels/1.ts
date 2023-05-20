import { Death, Goal } from "~/entities";
import { constructWalls } from "~/utils/map";
import { v } from "~/utils/vector";
import { map } from "~/utils/map";

const level = map("Blind", 1, () => ({
  walls: constructWalls([
    // [200, 1100],
    [1200, -100],
    [900, 200],
    [600, -100],
    [-200, -100],
    [-200, 100],
    [500, 100],
    [900, 500],
    [1100, 300],
    [1600, 300],
    [1600, 100],
    [1300, 100],
    [1400, 0],
    [1400, -400],
    [1200, -400],
    [1200, -200],
    // [900, -100],
  ]),
  deaths: [new Death(v(1400, 100), 200, 200)],
  goal: new Goal(v(1200, -400), 200, 200),
}));

export default level;
