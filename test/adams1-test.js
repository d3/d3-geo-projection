import {geoAdams1} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoAdams1(point) returns the expected values", () => {
  const adams1 = geoAdams1();
  assertProjectionEqual(adams1, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(adams1, [   0, -45], [480.000000, 308.348211]);
  assertProjectionEqual(adams1, [   0,  45], [480.000000, 191.651789]);
  assertProjectionEqual(adams1, [   0,  90], [480.000000,   0.499955]);
  assertProjectionEqual(adams1, [   0, -90], [480.000000, 499.500045]);
  assertProjectionEqual(adams1, [-180,   0], [230.499952, 250.000000]);
  assertProjectionEqual(adams1, [ 180,   0], [729.500048, 250.000000]);
  assertProjectionEqual(adams1, [ -90,   0], [368.844013, 250.000000]);
  assertProjectionEqual(adams1, [  90,  30], [589.174996, 207.509666]);
  assertProjectionEqual(adams1, [ -80,  15], [382.624767, 230.017856]);
  assertProjectionEqual(adams1, [   1,   1], [481.174317, 248.825594]);
  assertProjectionEqual(adams1, [  15,  80], [491.905856, 104.459350]);
  assertProjectionEqual(adams1, [ 100,  50], [597.350186, 170.156498]);
  assertProjectionEqual(adams1, [-150, -60], [294.148148, 377.029710]);
});
