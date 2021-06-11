import {geoBottomley} from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("geoBottomley(point) returns the expected values", () => {
  const bottomley = geoBottomley().scale(150);
  assertProjectionEqual(bottomley, [   0,   0], [480.0000000, 250.000000]);
  assertProjectionEqual(bottomley, [   0, -90], [480.0000000, 485.619449]);
  assertProjectionEqual(bottomley, [   0,  89], [480.0000000,  16.998544]);
  assertProjectionEqual(bottomley, [   0, -45], [480.0000000, 367.809724]);
  assertProjectionEqual(bottomley, [   0,  45], [480.0000000, 132.190275]);
  assertProjectionEqual(bottomley, [-160,   0], [114.1433513, 162.885611]);
  assertProjectionEqual(bottomley, [ 150,   0], [828.8001246, 172.813953]);
  assertProjectionEqual(bottomley, [-179,  15], [121.1311782,  94.107801]);
  assertProjectionEqual(bottomley, [   1,   1], [482.6175813, 247.378330]);
});
