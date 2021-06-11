import {geoCraster} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoCraster(point) returns the expected values", () => {
  const craster = geoCraster().scale(150);
  assertProjectionEqual(craster, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(craster, [   0, -90], [480.000000, 480.248509]);
  assertProjectionEqual(craster, [   0,  90], [480.000000,  19.751490]);
  assertProjectionEqual(craster, [   0, -45], [480.000000, 369.185398]);
  assertProjectionEqual(craster, [   0,  45], [480.000000, 130.814601]);
  assertProjectionEqual(craster, [-180,   0], [ 19.502981, 250.000000]);
  assertProjectionEqual(craster, [ 180,   0], [940.497018, 250.000000]);
  assertProjectionEqual(craster, [-179,  15], [ 35.975533, 209.865040]);
  assertProjectionEqual(craster, [   1,   1], [482.557970, 247.320952]);
});
