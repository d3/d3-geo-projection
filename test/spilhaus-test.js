import {geoSpilhaus} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoSpilhaus(point) returns the expected values", () => {
  const spilhaus = geoSpilhaus();
  assertProjectionEqual(spilhaus, [   0,   0], [396.492410, 207.146553]);
  assertProjectionEqual(spilhaus, [   0, -45], [425.962855, 263.374869]);
  assertProjectionEqual(spilhaus, [   0,  45], [384.866946, 143.248903]);
  assertProjectionEqual(spilhaus, [   0,  85], [382.632200,  70.719198]);
  assertProjectionEqual(spilhaus, [   0, -85], [471.271585, 297.014190]);
  assertProjectionEqual(spilhaus, [-180,   0], [597.123264, 320.601770]);
  assertProjectionEqual(spilhaus, [ 180,   0], [597.123264, 320.601770]);
  assertProjectionEqual(spilhaus, [ -90,   0], [532.561044, 477.096272]);
  assertProjectionEqual(spilhaus, [  90,  30], [511.087694, 121.063312]);
  assertProjectionEqual(spilhaus, [ -80,  15], [246.407785, 174.541349]);
  assertProjectionEqual(spilhaus, [   1,   1], [397.422472, 205.417351]);
  assertProjectionEqual(spilhaus, [  15,  80], [387.671993,  80.596425]);
  assertProjectionEqual(spilhaus, [ 100,  50], [478.514603,  65.144885]);
  assertProjectionEqual(spilhaus, [-150, -60], [506.884131, 328.718336]);
});
