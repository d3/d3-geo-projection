var tape = require("tape"),
    d3 = require("../");

require("./sphericalEqual");

tape("geoBaker(point) returns the expected values", function(test) {
  var baker = d3.geoBaker().scale(150);
  test.sphericalEqual(baker([   0,   0]), [480.000000, 250.000000]);
  test.sphericalEqual(baker([   0, -90]), [480.000000, 583.216220]);
  test.sphericalEqual(baker([   0,  90]), [480.000000, -83.216220]);
  test.sphericalEqual(baker([   0, -45]), [480.000000, 382.206038]);
  test.sphericalEqual(baker([   0,  45]), [480.000000, 117.793961]);
  test.sphericalEqual(baker([-180,   0]), [  8.761101, 250.000000]);
  test.sphericalEqual(baker([ 180,   0]), [951.238898, 250.000000]);
  test.sphericalEqual(baker([-179,  15]), [ 11.379095, 210.273662]);
  test.sphericalEqual(baker([   1,   1]), [482.617993, 247.381873]);
  test.sphericalEqual(baker([  45,  87]), [491.265043, -68.859378]);
  test.end();
});

tape("geoBaker.invert(point) returns the expected values", function(test) {
  var baker = d3.geoBaker().scale(150);
  test.sphericalEqual(baker.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(baker.invert([480.000000, 583.216220]), [   0, -90]);
  test.sphericalEqual(baker.invert([480.000000, -83.216220]), [   0,  90]);
  test.sphericalEqual(baker.invert([480.000000, 382.206038]), [   0, -45]);
  test.sphericalEqual(baker.invert([480.000000, 117.793961]), [   0,  45]);
  test.sphericalEqual(baker.invert([  8.761101, 250.000000]), [-180,   0]);
  test.sphericalEqual(baker.invert([951.238898, 250.000000]), [ 180,   0]);
  test.sphericalEqual(baker.invert([ 11.379095, 210.273662]), [-179,  15]);
  test.sphericalEqual(baker.invert([482.617993, 247.381873]), [   1,   1]);
  test.sphericalEqual(baker.invert([491.265043, -68.859378]), [  45,  87], 1e-5);
  test.end();
});
