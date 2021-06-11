import {geoAiry} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoAiry(point) returns the expected values", () => {
  const airy = geoAiry().scale(150);
  assertProjectionEqual(airy, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(airy, [   0, -90], [480.000000, 457.944154]);
  assertProjectionEqual(airy, [ 180,  90], [480.000000,  42.055845]);
  assertProjectionEqual(airy, [   0, -45], [480.000000, 350.409232]);
  assertProjectionEqual(airy, [   0,  45], [480.000000, 149.590767]);
  assertProjectionEqual(airy, [   1,   1], [482.216112, 247.783550]);
  assertProjectionEqual(airy, [  45,  87], [487.496494,  47.708572]);
});
