import assert from "assert";
import {geoArmadillo} from "../src/index.js";
import {geoPath} from "d3-geo";
import {assertProjectionEqual} from "./asserts.js";

// TODO needs D3 core support
// assert.strictEqual(armadillo([0, -90]), undefined);

it("geoArmadillo(point) returns the expected value", () => {
  const armadillo = geoArmadillo().scale(150).translate([480, 250]).center([0, 0]);
  assertProjectionEqual(armadillo, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(armadillo, [   0,  90], [480.000000,  57.743085]);
  assertProjectionEqual(armadillo, [   0, -45], [480.000000, 334.643146]);
  assertProjectionEqual(armadillo, [   0,  45], [480.000000, 135.304239]);
  assertProjectionEqual(armadillo, [-180,   0], [180.000000, 147.393957]);
  assertProjectionEqual(armadillo, [ 180,   0], [780.000000, 147.393957]);
  assertProjectionEqual(armadillo, [-179,  15], [185.122354, 111.792545]);
  assertProjectionEqual(armadillo, [   1,   1], [482.617761, 247.528295]);
  assertProjectionEqual(armadillo, [  45,  87], [540.406730,  56.511657]);
});

it("geoArmadillo.parallel(0) sphere works (#163)", () => {
  assert(geoPath(geoArmadillo().parallel(0))({type:"Sphere"}));
});
