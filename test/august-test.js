var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoAugust(point) returns the expected values", function(test) {
  var august = d3.geoAugust().scale(150);
  test.projectionEqual(august, [  0,   0], [480.000000,  250.000000]);
  test.projectionEqual(august, [  0, -45], [480.000000,  378.067905]);
  test.projectionEqual(august, [  0,  45], [480.000000,  121.932094]);
  test.projectionEqual(august, [  0,  90], [480.000000, -150.000000]);
  test.projectionEqual(august, [  0,  80], [480.000000,  -43.976545]);
  test.projectionEqual(august, [-90,   0], [217.258300,  250.000000]);
  test.projectionEqual(august, [ 90,   0], [742.741699,  250.000000]);
  test.projectionEqual(august, [-80,  15], [254.414080,  199.297313]);
  test.projectionEqual(august, [  1,   1], [482.617927,  247.381806]);
  test.projectionEqual(august, [ 15,  80], [499.471722,  -45.366200]);
  test.projectionEqual(august, [100,  50], [732.424769,   43.602745]);
  test.end();
});
