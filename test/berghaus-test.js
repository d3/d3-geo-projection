var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoBerghaus(point) returns the expected values", function(test) {
  var berghaus = d3.geoBerghaus().scale(150).translate([480, 250]).center([0, 0]);
  test.projectionEqual(berghaus, [  0,   0], [480.000000, 250.000000]);
  test.projectionEqual(berghaus, [  0, -45], [480.000000, 367.809724]);
  test.projectionEqual(berghaus, [  0,  45], [480.000000, 132.190275]);
  test.projectionEqual(berghaus, [-90,   0], [244.380550, 250.000000]);
  test.projectionEqual(berghaus, [ 90,   0], [715.619449, 250.000000]);
  test.projectionEqual(berghaus, [-80,  15], [277.038148, 194.777583]);
  test.projectionEqual(berghaus, [  1,   1], [482.617728, 247.381873]);
  test.projectionEqual(berghaus, [ 15,  45], [510.778518, 131.080938]);
  test.projectionEqual(berghaus, [120,  30], [750.967904, 114.867516]);
  test.projectionEqual(berghaus, [110,  10], [759.454234, 183.963114]);
  test.end();
});
