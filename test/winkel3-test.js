var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoWinkel3(point) returns the expected values", function(test) {
  var winkel3 = d3.geoWinkel3().scale(150);
  test.projectionEqual(winkel3, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(winkel3, [   0, -90], [480.000000, 485.619449]);
  test.projectionEqual(winkel3, [   0,  90], [480.000000,  14.380550]);
  test.projectionEqual(winkel3, [   0, -45], [480.000000, 367.809724]);
  test.projectionEqual(winkel3, [   0,  45], [480.000000, 132.190275]);
  test.projectionEqual(winkel3, [-180,   0], [ 94.380550, 250.000000]);
  test.projectionEqual(winkel3, [ 180,   0], [865.619449, 250.000000]);
  test.projectionEqual(winkel3, [-179,  15], [104.464309, 200.036192]);
  test.projectionEqual(winkel3, [   1,   1], [482.142197, 247.381989]);
  test.projectionEqual(winkel3, [  45,  87], [522.079049,  21.958321]);
  test.end();
});
