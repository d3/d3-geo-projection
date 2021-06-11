import assert from "assert";
import {geoAitoff} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoAitoff(point) returns the expected values", () => {
  const aitoff = geoAitoff().scale(150);
  assertProjectionEqual(aitoff, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(aitoff, [   0, -90], [480.000000, 485.619449]);
  assertProjectionEqual(aitoff, [   0,  90], [480.000000,  14.380550]);
  assertProjectionEqual(aitoff, [   0, -45], [480.000000, 367.809724]);
  assertProjectionEqual(aitoff, [   0,  45], [480.000000, 132.190275]);
  assertProjectionEqual(aitoff, [-180,   0], [  8.761101, 250.000000]);
  assertProjectionEqual(aitoff, [ 180,   0], [951.238898, 250.000000]);
  assertProjectionEqual(aitoff, [-179,  15], [ 27.261952, 189.342293]);
  assertProjectionEqual(aitoff, [   1,   1], [482.617728, 247.381972]);
  assertProjectionEqual(aitoff, [  45,  87], [489.158099, 21.6821110]);
});

it("geoAitoff.invert(point) returns undefined for points outside the target region", () => {
  const aitoff = geoAitoff().scale(150);
  assert.strictEqual(aitoff.invert([0, 0]), undefined);
});
