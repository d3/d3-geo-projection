var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoMollweide(point) returns the expected values", function(test) {
  var mollweide = d3.geoMollweide().scale(150);
  test.planarEqual(mollweide([   0,   0]), [480.000000, 250.000000]);
  test.planarEqual(mollweide([   0, -90]), [480.000000, 462.132034]);
  test.planarEqual(mollweide([   0,  90]), [480.000000,  37.867965]);
  test.planarEqual(mollweide([   0, -45]), [480.000000, 375.591020]);
  test.planarEqual(mollweide([   0,  45]), [480.000000, 124.408979]);
  test.planarEqual(mollweide([-180,   0]), [ 55.735931, 250.000000]);
  test.planarEqual(mollweide([ 180,   0]), [904.264068, 250.000000]);
  test.planarEqual(mollweide([-179,  15]), [ 67.028260, 206.573390]);
  test.planarEqual(mollweide([   1,   1]), [482.356801, 247.092196]);
  test.planarEqual(mollweide([  45,  87]), [495.642877,  40.187699]);
  test.end();
});

tape("geoMollweide.invert(point) returns the expected values", function(test) {
  var mollweide = d3.geoMollweide().scale(150);
  test.sphericalEqual(mollweide.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(mollweide.invert([480.000000, 462.132034]), [   0, -90]);
  test.sphericalEqual(mollweide.invert([480.000000,  37.867965]), [   0,  90]);
  test.sphericalEqual(mollweide.invert([480.000000, 375.591020]), [   0, -45]);
  test.sphericalEqual(mollweide.invert([480.000000, 124.408979]), [   0,  45]);
  test.sphericalEqual(mollweide.invert([ 55.735931, 250.000000]), [-180,   0]);
  test.sphericalEqual(mollweide.invert([904.264068, 250.000000]), [ 180,   0]);
  test.sphericalEqual(mollweide.invert([ 67.028260, 206.573390]), [-179,  15]);
  test.sphericalEqual(mollweide.invert([482.356801, 247.092196]), [   1,   1]);
  test.sphericalEqual(mollweide.invert([495.642877,  40.187699]), [  45,  87]);
  test.end();
});
