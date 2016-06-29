var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

tape("geoMollweide(point) returns the expected values", function(test) {
  var mollweide = d3.geoMollweide().scale(150);
  test.inDelta(mollweide([   0,   0]), [480.000000, 250.000000]);
  test.inDelta(mollweide([   0, -90]), [480.000000, 462.132034]);
  test.inDelta(mollweide([   0,  90]), [480.000000,  37.867965]);
  test.inDelta(mollweide([   0, -45]), [480.000000, 375.591020]);
  test.inDelta(mollweide([   0,  45]), [480.000000, 124.408979]);
  test.inDelta(mollweide([-180,   0]), [ 55.735931, 250.000000]);
  test.inDelta(mollweide([ 180,   0]), [904.264068, 250.000000]);
  test.inDelta(mollweide([-179,  15]), [ 67.028260, 206.573390]);
  test.inDelta(mollweide([   1,   1]), [482.356801, 247.092196]);
  test.inDelta(mollweide([  45,  87]), [495.642877,  40.187699]);
  test.end();
});

tape("geoMollweide.invert(point) returns the expected values", function(test) {
  var mollweide = d3.geoMollweide().scale(150);
  test.inDelta(mollweide.invert([480.000000, 250.000000]), [   0,   0]);
  test.inDelta(mollweide.invert([480.000000, 462.132034]), [   0, -90], 1e-4);
  test.inDelta(mollweide.invert([480.000000,  37.867965]), [   0,  90]);
  test.inDelta(mollweide.invert([480.000000, 375.591020]), [   0, -45]);
  test.inDelta(mollweide.invert([480.000000, 124.408979]), [   0,  45]);
  test.inDelta(mollweide.invert([ 55.735931, 250.000000]), [ 180,   0]); // TODO -180°?
  test.inDelta(mollweide.invert([904.264068, 250.000000]), [ 180,   0]);
  test.inDelta(mollweide.invert([ 67.028260, 206.573390]), [-179,  15]);
  test.inDelta(mollweide.invert([482.356801, 247.092196]), [   1,   1]);
  test.inDelta(mollweide.invert([495.642877,  40.187699]), [  45,  87], 1e-5);
  test.end();
});
