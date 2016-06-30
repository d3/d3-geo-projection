var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoAiry(point) returns the expected values", function(test) {
  var airy = d3.geoAiry().scale(150);
  test.projectionEqual(airy, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(airy, [   0, -90], [480.000000, 457.944154]);
  test.projectionEqual(airy, [ 180,  90], [480.000000,  42.055845]);
  test.projectionEqual(airy, [   0, -45], [480.000000, 350.409232]);
  test.projectionEqual(airy, [   0,  45], [480.000000, 149.590767]);
  test.projectionEqual(airy, [   1,   1], [482.216112, 247.783550]);
  test.projectionEqual(airy, [  45,  87], [487.496494,  47.708572]);
  test.end();
});
