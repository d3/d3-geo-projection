var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoAitoff(point) returns the expected values", function(test) {
  var aitoff = d3.geoAitoff();
  test.planarEqual(aitoff([   0,   0]), [480.000000, 250.000000]);
  test.planarEqual(aitoff([   0, -90]), [480.000000, 485.619449]);
  test.planarEqual(aitoff([   0,  90]), [480.000000,  14.380550]);
  test.planarEqual(aitoff([   0, -45]), [480.000000, 367.809724]);
  test.planarEqual(aitoff([   0,  45]), [480.000000, 132.190275]);
  test.planarEqual(aitoff([-180,   0]), [  8.761101, 250.000000]);
  test.planarEqual(aitoff([ 180,   0]), [951.238898, 250.000000]);
  test.planarEqual(aitoff([-179,  15]), [ 27.261952, 189.342293]);
  test.planarEqual(aitoff([   1,   1]), [482.617728, 247.381972]);
  test.planarEqual(aitoff([  45,  87]), [489.158099, 21.6821110]);
  test.end();
});

tape("geoAitoff.invert(point) returns the expected values", function(test) {
  var aitoff = d3.geoAitoff();
  test.sphericalEqual(aitoff.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(aitoff.invert([480.000000, 485.619449]), [   0, -90]);
  test.sphericalEqual(aitoff.invert([480.000000,  14.380550]), [   0,  90]);
  test.sphericalEqual(aitoff.invert([480.000000, 367.809724]), [   0, -45]);
  test.sphericalEqual(aitoff.invert([480.000000, 132.190275]), [   0,  45]);
  test.sphericalEqual(aitoff.invert([  8.761101, 250.000000]), [-180,   0]);
  test.sphericalEqual(aitoff.invert([951.238898, 250.000000]), [ 180,   0]);
  test.sphericalEqual(aitoff.invert([ 27.261952, 189.342293]), [-179,  15]);
  test.sphericalEqual(aitoff.invert([482.617728, 247.381972]), [   1,   1]);
  test.sphericalEqual(aitoff.invert([489.158099, 21.6821110]), [  45,  87]);
  test.end();
});

tape("geoAitoff.invert(point) returns undefined for points outside the target region", function(test) {
  var aitoff = d3.geoAitoff();
  test.equal(aitoff.invert([0, 0]), undefined);
  test.end();
});
