import {geoBoggs} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoBoggs(point) returns the expected values", () => {
  const boggs = geoBoggs().scale(150);
  assertProjectionEqual(boggs, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(boggs, [   0, -90], [480.000000, 473.567218]);
  assertProjectionEqual(boggs, [   0,  90], [480.000000,  26.432781]);
  assertProjectionEqual(boggs, [   0, -45], [480.000000, 371.532657]);
  assertProjectionEqual(boggs, [   0,  45], [480.000000, 128.467342]);
  assertProjectionEqual(boggs, [-180,   0], [ 32.864228, 250.000000]);
  assertProjectionEqual(boggs, [ 180,   0], [927.135771, 250.000000]);
  assertProjectionEqual(boggs, [-179,  15], [ 47.500957, 208.708722]);
  assertProjectionEqual(boggs, [   1,   1], [482.483785, 247.240908]);
  assertProjectionEqual(boggs, [  45,  87], [488.857270,  31.512628]);
});
