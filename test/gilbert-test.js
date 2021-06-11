import assert from "assert";
import {geoGilbert} from "../src/index.js";
import {assertInDelta, assertProjectionEqual} from "./asserts.js";

it("geoGilbert(point) returns the expected values", () => {
  const gilbert = geoGilbert().scale(150);
  assertProjectionEqual(gilbert, [   0,   0], [480.0000000, 250.000000]);
  assert("fitExtent" in gilbert);
  assertInDelta(gilbert.fitExtent([[0,0],[10,10]], {type:"Sphere"}).scale(), 5, 1e-12);
  assertInDelta(gilbert.fitSize([10,10], {type:"Sphere"}).scale(), 5, 1e-12);
  assertInDelta(gilbert.fitWidth(10, {type:"Sphere"}).scale(), 5, 1e-12);
  assertInDelta(gilbert.fitHeight(10, {type:"Sphere"}).scale(), 5, 1e-12);
});
