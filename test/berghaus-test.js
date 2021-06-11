import {geoBerghaus} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoBerghaus(point) returns the expected values", () => {
  const berghaus = geoBerghaus().scale(150).translate([480, 250]).center([0, 0]);
  assertProjectionEqual(berghaus, [  0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(berghaus, [  0, -45], [480.000000, 367.809724]);
  assertProjectionEqual(berghaus, [  0,  45], [480.000000, 132.190275]);
  assertProjectionEqual(berghaus, [-90,   0], [244.380550, 250.000000]);
  assertProjectionEqual(berghaus, [ 90,   0], [715.619449, 250.000000]);
  assertProjectionEqual(berghaus, [-80,  15], [277.038148, 194.777583]);
  assertProjectionEqual(berghaus, [  1,   1], [482.617728, 247.381873]);
  assertProjectionEqual(berghaus, [ 15,  45], [510.778518, 131.080938]);
  assertProjectionEqual(berghaus, [120,  30], [750.967904, 114.867516]);
  assertProjectionEqual(berghaus, [110,  10], [759.454234, 183.963114]);
});
