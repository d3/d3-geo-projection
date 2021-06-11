import {geoWinkel3} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoWinkel3(point) returns the expected values", () => {
  const winkel3 = geoWinkel3().scale(150);
  assertProjectionEqual(winkel3, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(winkel3, [   0, -90], [480.000000, 485.619449]);
  assertProjectionEqual(winkel3, [   0,  90], [480.000000,  14.380550]);
  assertProjectionEqual(winkel3, [   0, -45], [480.000000, 367.809724]);
  assertProjectionEqual(winkel3, [   0,  45], [480.000000, 132.190275]);
  assertProjectionEqual(winkel3, [-180,   0], [ 94.380550, 250.000000]);
  assertProjectionEqual(winkel3, [ 180,   0], [865.619449, 250.000000]);
  assertProjectionEqual(winkel3, [-179,  15], [104.464309, 200.036192]);
  assertProjectionEqual(winkel3, [   1,   1], [482.142197, 247.381989]);
  assertProjectionEqual(winkel3, [  45,  87], [522.079049,  21.958321]);
});
