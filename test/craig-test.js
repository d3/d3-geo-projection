import {geoCraig} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoCraig(point) returns the expected values", () => {
  const craig = geoCraig().scale(150);
  assertProjectionEqual(craig, [   0,   0], [480.0000000,  250.000000]);
  assertProjectionEqual(craig, [   0, -90], [480.0000000,  400.000000]);
  assertProjectionEqual(craig, [   0,  90], [480.0000000,  100.000000]);
  assertProjectionEqual(craig, [   0, -45], [480.0000000,  356.066017]);
  assertProjectionEqual(craig, [   0,  45], [480.0000000,  143.933982]);
  assertProjectionEqual(craig, [-180,   0], [  8.7611010,  250.000000]);
  assertProjectionEqual(craig, [ 180,   0], [951.2388980,  250.000000]);
  assertProjectionEqual(craig, [-179,  15], [ 11.3790958, 7198.585721]);
  assertProjectionEqual(craig, [   1,   1], [482.6179930,  247.382404]);
});

it("craig.parallel(parallel) sets the standard parallel", () => {
  const craig = geoCraig().scale(150).parallel(30);
  assertProjectionEqual(craig, [   0,   0], [480.000000, 250.000000]);
  assertProjectionEqual(craig, [   0, -30], [480.000000, 313.397459]);
  assertProjectionEqual(craig, [   0,  30], [480.000000, 163.397459]);
  assertProjectionEqual(craig, [   0, -45], [480.000000, 330.700720]);
  assertProjectionEqual(craig, [   0,  45], [480.000000, 118.568686]);
  assertProjectionEqual(craig, [   1,   1], [482.617993, 247.373611]);
});
