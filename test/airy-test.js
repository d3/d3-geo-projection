var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoAiry(point) returns the expected values", function(test) {
  var airy = d3.geoAiry().scale(150);
  test.planarEqual(airy([   0,   0]), [480.000000, 250.000000]);
  test.planarEqual(airy([ 180, -90]), [480.000000, 457.944154]);
  test.planarEqual(airy([ 180,  90]), [480.000000,  42.055845]);
  test.planarEqual(airy([   0, -45]), [480.000000, 350.409232]);
  test.planarEqual(airy([   0,  45]), [480.000000, 149.590767]);
  test.planarEqual(airy([   1,   1]), [482.216112, 247.783550]);
  test.planarEqual(airy([  45,  87]), [487.496494,  47.708572]);
  test.end();
});

tape("geoAiry.invert(point) returns the expected values", function(test) {
  var airy = d3.geoAiry().scale(150);
  test.sphericalEqual(airy.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(airy.invert([480.000000, 457.944154]), [   0, -90]);
  test.sphericalEqual(airy.invert([480.000000,  42.055845]), [ 180,  90]);
  test.sphericalEqual(airy.invert([480.000000, 350.409232]), [   0, -45]);
  test.sphericalEqual(airy.invert([480.000000, 149.590767]), [   0,  45]);
  test.sphericalEqual(airy.invert([482.216112, 247.783550]), [   1,   1]);
  test.sphericalEqual(airy.invert([487.496494,  47.708572]), [  45,  87]);
  test.end();
});
