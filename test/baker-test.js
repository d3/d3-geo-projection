var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoBaker(point) returns the expected values", function(test) {
  var baker = d3.geoBaker().scale(150);
  test.projectionEqual(baker, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(baker, [   0, -90], [480.000000, 583.216220]);
  test.projectionEqual(baker, [   0,  90], [480.000000, -83.216220]);
  test.projectionEqual(baker, [   0, -45], [480.000000, 382.206038]);
  test.projectionEqual(baker, [   0,  45], [480.000000, 117.793961]);
  test.projectionEqual(baker, [-180,   0], [  8.761101, 250.000000]);
  test.projectionEqual(baker, [ 180,   0], [951.238898, 250.000000]);
  test.projectionEqual(baker, [-179,  15], [ 11.379095, 210.273662]);
  test.projectionEqual(baker, [   1,   1], [482.617993, 247.381873]);
  test.projectionEqual(baker, [  45,  87], [491.265043, -68.859378]);
  test.end();
});
