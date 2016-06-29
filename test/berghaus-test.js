var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

tape("geoBerghaus(point) returns the expected values", function(test) {
  var berghaus = d3.geoBerghaus().scale(150).translate([480, 250]);
  test.inDelta(berghaus([  0,   0]), [480.000000, 250.000000]);
  test.inDelta(berghaus([  0, -45]), [480.000000, 367.809724]);
  test.inDelta(berghaus([  0,  45]), [480.000000, 132.190275]);
  test.inDelta(berghaus([-90,   0]), [244.380550, 250.000000]);
  test.inDelta(berghaus([ 90,   0]), [715.619449, 250.000000]);
  test.inDelta(berghaus([-80,  15]), [277.038148, 194.777583]);
  test.inDelta(berghaus([  1,   1]), [482.617728, 247.381873]);
  test.inDelta(berghaus([ 15,  45]), [510.778518, 131.080938]);
  test.inDelta(berghaus([120,  30]), [750.967904, 114.867516]);
  test.inDelta(berghaus([110,  10]), [759.454234, 183.963114]);
  test.end();
});

tape("geoBerghaus.invert(point) returns the expected values", function(test) {
  var berghaus = d3.geoBerghaus().scale(150).translate([480, 250]);
  test.inDelta(berghaus.invert([480.000000, 250.000000]), [  0,   0]);
  test.inDelta(berghaus.invert([480.000000, 367.809724]), [  0, -45]);
  test.inDelta(berghaus.invert([480.000000, 132.190275]), [  0,  45]);
  test.inDelta(berghaus.invert([244.380550, 250.000000]), [-90,   0]);
  test.inDelta(berghaus.invert([715.619449, 250.000000]), [ 90,   0]);
  test.inDelta(berghaus.invert([277.038148, 194.777583]), [-80,  15]);
  test.inDelta(berghaus.invert([482.617728, 247.381873]), [  1,   1]);
  test.inDelta(berghaus.invert([510.778518, 131.080938]), [ 15,  45]);
  test.inDelta(berghaus.invert([750.967904, 114.867516]), [120,  30]);
  test.inDelta(berghaus.invert([759.454234, 183.963114]), [110,  10]);
  test.end();
});
