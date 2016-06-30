var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoMollweide(point) returns the expected values", function(test) {
  var mollweide = d3.geoMollweide().scale(150);
  test.projectionEqual(mollweide, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(mollweide, [   0, -90], [480.000000, 462.132034]);
  test.projectionEqual(mollweide, [   0,  90], [480.000000,  37.867965]);
  test.projectionEqual(mollweide, [   0, -45], [480.000000, 375.591020]);
  test.projectionEqual(mollweide, [   0,  45], [480.000000, 124.408979]);
  test.projectionEqual(mollweide, [-180,   0], [ 55.735931, 250.000000]);
  test.projectionEqual(mollweide, [ 180,   0], [904.264068, 250.000000]);
  test.projectionEqual(mollweide, [-179,  15], [ 67.028260, 206.573390]);
  test.projectionEqual(mollweide, [   1,   1], [482.356801, 247.092196]);
  test.projectionEqual(mollweide, [  45,  87], [495.642877,  40.187699]);
  test.end();
});
