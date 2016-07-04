var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoCraster(point) returns the expected values", function(test) {
  var craster = d3.geoCraster().scale(150);
  test.projectionEqual(craster, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(craster, [   0, -90], [480.000000, 480.248509]);
  test.projectionEqual(craster, [   0,  90], [480.000000,  19.751490]);
  test.projectionEqual(craster, [   0, -45], [480.000000, 369.185398]);
  test.projectionEqual(craster, [   0,  45], [480.000000, 130.814601]);
  test.projectionEqual(craster, [-180,   0], [ 19.502981, 250.000000]);
  test.projectionEqual(craster, [ 180,   0], [940.497018, 250.000000]);
  test.projectionEqual(craster, [-179,  15], [ 35.975533, 209.865040]);
  test.projectionEqual(craster, [   1,   1], [482.557970, 247.320952]);
  test.end();
});
