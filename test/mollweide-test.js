import {geoMollweide} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoMollweide(point) returns the expected values", () => {
  const mollweide = geoMollweide().scale(150);
  assertProjectionEqual(mollweide, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(mollweide, [   0, -90], [480.000000, 462.132034]);
  assertProjectionEqual(mollweide, [   0,  90], [480.000000,  37.867965]);
  assertProjectionEqual(mollweide, [   0, -45], [480.000000, 375.591020]);
  assertProjectionEqual(mollweide, [   0,  45], [480.000000, 124.408979]);
  assertProjectionEqual(mollweide, [-180,   0], [ 55.735931, 250.000000]);
  assertProjectionEqual(mollweide, [ 180,   0], [904.264068, 250.000000]);
  assertProjectionEqual(mollweide, [-179,  15], [ 67.028260, 206.573390]);
  assertProjectionEqual(mollweide, [   1,   1], [482.356801, 247.092196]);
  assertProjectionEqual(mollweide, [  45,  87], [495.642877,  40.187699]);
});
