var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

tape("geoAiry(point) returns the expected values", function(test) {
  var airy = d3.geoAiry().scale(150);
  test.inDelta(airy([   0,   0]), [480.000000, 250.000000]);
  test.inDelta(airy([ 180, -90]), [480.000000, 457.944154]);
  test.inDelta(airy([ 180,  90]), [480.000000,  42.055845]);
  test.inDelta(airy([   0, -45]), [480.000000, 350.409232]);
  test.inDelta(airy([   0,  45]), [480.000000, 149.590767]);
  test.inDelta(airy([   1,   1]), [482.216112, 247.783550]);
  test.inDelta(airy([  45,  87]), [487.496494,  47.708572]);
  test.end();
});

tape("geoAiry.invert(point) returns the expected values", function(test) {
  var airy = d3.geoAiry().scale(150);
  test.inDelta(airy.invert([480.000000, 250.000000]), [   0,   0]);
  test.inDelta(airy.invert([480.000000, 457.944154]), [   0, -90]); // 180°
  test.inDelta(airy.invert([480.000000,  42.055845]), [ 180,  90]);
  test.inDelta(airy.invert([480.000000, 350.409232]), [   0, -45]);
  test.inDelta(airy.invert([480.000000, 149.590767]), [   0,  45]);
  test.inDelta(airy.invert([482.216112, 247.783550]), [   1,   1]);
  test.inDelta(airy.invert([487.496494,  47.708572]), [  45,  87], 1e-5);
  test.end();
});
