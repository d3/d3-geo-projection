var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoAitoff(point) returns the expected values", function(test) {
  var aitoff = d3.geoAitoff().scale(150);
  test.projectionEqual(aitoff, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(aitoff, [   0, -90], [480.000000, 485.619449]);
  test.projectionEqual(aitoff, [   0,  90], [480.000000,  14.380550]);
  test.projectionEqual(aitoff, [   0, -45], [480.000000, 367.809724]);
  test.projectionEqual(aitoff, [   0,  45], [480.000000, 132.190275]);
  test.projectionEqual(aitoff, [-180,   0], [  8.761101, 250.000000]);
  test.projectionEqual(aitoff, [ 180,   0], [951.238898, 250.000000]);
  test.projectionEqual(aitoff, [-179,  15], [ 27.261952, 189.342293]);
  test.projectionEqual(aitoff, [   1,   1], [482.617728, 247.381972]);
  test.projectionEqual(aitoff, [  45,  87], [489.158099, 21.6821110]);
  test.end();
});

tape("geoAitoff.invert(point) returns undefined for points outside the target region", function(test) {
  var aitoff = d3.geoAitoff().scale(150);
  test.equal(aitoff.invert([0, 0]), undefined);
  test.end();
});
