var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

tape("geoAitoff(point) returns the expected values", function(test) {
  var aitoff = d3.geoAitoff();
  test.inDelta(aitoff([   0,   0]), [480.000000, 250.000000]);
  test.inDelta(aitoff([   0, -90]), [480.000000, 485.619449]);
  test.inDelta(aitoff([   0,  90]), [480.000000,  14.380550]);
  test.inDelta(aitoff([   0, -45]), [480.000000, 367.809724]);
  test.inDelta(aitoff([   0,  45]), [480.000000, 132.190275]);
  test.inDelta(aitoff([-180,   0]), [  8.761101, 250.000000]);
  test.inDelta(aitoff([ 180,   0]), [951.238898, 250.000000]);
  test.inDelta(aitoff([-179,  15]), [ 27.261952, 189.342293]);
  test.inDelta(aitoff([   1,   1]), [482.617728, 247.381972]);
  test.inDelta(aitoff([  45,  87]), [489.158099, 21.6821110]);
  test.end();
});

tape("geoAitoff.invert(point) returns the expected values", function(test) {
  var aitoff = d3.geoAitoff();
  test.inDelta(aitoff.invert([480.000000, 250.000000]), [   0,   0]);
  test.inDelta(aitoff.invert([480.000000, 485.619449]), [   0, -90]);
  test.inDelta(aitoff.invert([480.000000,  14.380550]), [   0,  90]);
  test.inDelta(aitoff.invert([480.000000, 367.809724]), [   0, -45]);
  test.inDelta(aitoff.invert([480.000000, 132.190275]), [   0,  45]);
  test.inDelta(aitoff.invert([  8.761101, 250.000000]), [ 180,   0]); // Perhaps should be -180°?
  test.inDelta(aitoff.invert([951.238898, 250.000000]), [ 180,   0]);
  test.inDelta(aitoff.invert([ 27.261952, 189.342293]), [-179,  15]);
  test.inDelta(aitoff.invert([482.617728, 247.381972]), [   1,   1]);
  test.inDelta(aitoff.invert([489.158099, 21.6821110]), [  45,  87], 1e-5);
  test.end();
});

tape("geoAitoff.invert(point) returns undefined for points outside the target region", function(test) {
  var aitoff = d3.geoAitoff();
  test.equal(aitoff.invert([0, 0]), undefined);
  test.end();
});
