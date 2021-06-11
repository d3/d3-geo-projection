import {geoBaker} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoBaker(point) returns the expected values", () => {
  const baker = geoBaker().scale(150);
  assertProjectionEqual(baker, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(baker, [   0, -90], [480.000000, 583.216220]);
  assertProjectionEqual(baker, [   0,  90], [480.000000, -83.216220]);
  assertProjectionEqual(baker, [   0, -45], [480.000000, 382.206038]);
  assertProjectionEqual(baker, [   0,  45], [480.000000, 117.793961]);
  assertProjectionEqual(baker, [-180,   0], [  8.761101, 250.000000]);
  assertProjectionEqual(baker, [ 180,   0], [951.238898, 250.000000]);
  assertProjectionEqual(baker, [-179,  15], [ 11.379095, 210.273662]);
  assertProjectionEqual(baker, [   1,   1], [482.617993, 247.381873]);
  assertProjectionEqual(baker, [  45,  87], [491.265043, -68.859378]);
});
