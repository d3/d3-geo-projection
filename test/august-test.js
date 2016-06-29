var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

tape("geoAugust(point) returns the expected values", function(test) {
  var august = d3.geoAugust().scale(150);
  test.inDelta(august([  0,   0]), [480.000000,  250.000000]);
  test.inDelta(august([  0, -45]), [480.000000,  378.067905]);
  test.inDelta(august([  0,  45]), [480.000000,  121.932094]);
  test.inDelta(august([  0,  90]), [480.000000, -150.000000]);
  test.inDelta(august([  0,  80]), [480.000000,  -43.976545]);
  test.inDelta(august([-90,   0]), [217.258300,  250.000000]);
  test.inDelta(august([ 90,   0]), [742.741699,  250.000000]);
  test.inDelta(august([-80,  15]), [254.414080,  199.297313]);
  test.inDelta(august([  1,   1]), [482.617927,  247.381806]);
  test.inDelta(august([ 15,  80]), [499.471722,  -45.366200]);
  test.inDelta(august([100,  50]), [732.424769,   43.602745]);
  test.end();
});

tape("geoAugust.invert(point) returns the expected values", function(test) {
  var august = d3.geoAugust().scale(150);
  test.inDelta(august.invert([480.000000,  250.000000]), [  0,   0]);
  test.inDelta(august.invert([480.000000,  378.067905]), [  0, -45]);
  test.inDelta(august.invert([480.000000,  121.932094]), [  0,  45]);
  test.inDelta(august.invert([480.000000, -150.000000]), [  0,  90]);
  test.inDelta(august.invert([480.000000,  -43.976545]), [  0,  80]);
  test.inDelta(august.invert([217.258300,  250.000000]), [-90,   0]);
  test.inDelta(august.invert([742.741699,  250.000000]), [ 90,   0]);
  test.inDelta(august.invert([254.414080,  199.297313]), [-80,  15]);
  test.inDelta(august.invert([482.617927,  247.381806]), [  1,   1]);
  test.inDelta(august.invert([499.471722,  -45.366200]), [ 15,  80]);
  test.inDelta(august.invert([732.424769,   43.602745]), [100,  50]);
  test.end();
});
