import {geoAdams2} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoAdams2(point) returns the expected values", () => {
  const adams2 = geoAdams2();
  assertProjectionEqual(adams2, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(adams2, [   0, -45], [480.000000, 291.276665]);
  assertProjectionEqual(adams2, [   0,  45], [480.000000, 208.723335]);
  assertProjectionEqual(adams2, [   0,  85], [480.000000, 122.998278]);
  assertProjectionEqual(adams2, [   0, -85], [480.000000, 377.001722]);
  assertProjectionEqual(adams2, [-170,   0], [286.725955, 250.000000]);
  assertProjectionEqual(adams2, [ 170,   0], [673.274045, 250.000000]);
  assertProjectionEqual(adams2, [ -90,   0], [400.936652, 250.000000]);
  assertProjectionEqual(adams2, [  90,  30], [557.020731, 219.386387]);
  assertProjectionEqual(adams2, [ -80,  15], [411.007249, 235.646303]);
  assertProjectionEqual(adams2, [   1,   1], [480.830367, 249.169569]);
  assertProjectionEqual(adams2, [  15,  80], [489.185905, 145.384365]);
  assertProjectionEqual(adams2, [ 100,  50], [561.482032, 193.347248]);
  assertProjectionEqual(adams2, [-150, -60], [361.756451, 340.144156]);
});
