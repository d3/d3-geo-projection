import {geoAugust} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoAugust(point) returns the expected values", () => {
  const august = geoAugust().scale(150);
  assertProjectionEqual(august, [  0,   0], [480.000000,  250.000000]);
  assertProjectionEqual(august, [  0, -45], [480.000000,  378.067905]);
  assertProjectionEqual(august, [  0,  45], [480.000000,  121.932094]);
  assertProjectionEqual(august, [  0,  90], [480.000000, -150.000000]);
  assertProjectionEqual(august, [  0,  80], [480.000000,  -43.976545]);
  assertProjectionEqual(august, [-90,   0], [217.258300,  250.000000]);
  assertProjectionEqual(august, [ 90,   0], [742.741699,  250.000000]);
  assertProjectionEqual(august, [-80,  15], [254.414080,  199.297313]);
  assertProjectionEqual(august, [  1,   1], [482.617927,  247.381806]);
  assertProjectionEqual(august, [ 15,  80], [499.471722,  -45.366200]);
  assertProjectionEqual(august, [100,  50], [732.424769,   43.602745]);
});
