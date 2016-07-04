var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoBottomley(point) returns the expected values", function(test) {
  var bottomley = d3.geoBottomley().scale(150);
  test.projectionEqual(bottomley, [   0,   0], [480.0000000, 250.000000]);
  test.projectionEqual(bottomley, [   0, -90], [480.0000000, 485.619449]);
  test.projectionEqual(bottomley, [   0,  89], [480.0000000,  16.998544]);
  test.projectionEqual(bottomley, [   0, -45], [480.0000000, 367.809724]);
  test.projectionEqual(bottomley, [   0,  45], [480.0000000, 132.190275]);
  test.projectionEqual(bottomley, [-160,   0], [114.1433513, 162.885611]);
  test.projectionEqual(bottomley, [ 150,   0], [828.8001246, 172.813953]);
  test.projectionEqual(bottomley, [-179,  15], [121.1311782,  94.107801]);
  test.projectionEqual(bottomley, [   1,   1], [482.6175813, 247.378330]);
  test.end();
});
