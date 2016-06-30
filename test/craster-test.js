var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoCraster(point) returns the expected values", function(test) {
  var craster = d3.geoCraster();
  test.planarEqual(craster([   0,   0]), [480.000000, 250.000000]);
  test.planarEqual(craster([   0, -90]), [480.000000, 480.248509]);
  test.planarEqual(craster([   0,  90]), [480.000000,  19.751490]);
  test.planarEqual(craster([   0, -45]), [480.000000, 369.185398]);
  test.planarEqual(craster([   0,  45]), [480.000000, 130.814601]);
  test.planarEqual(craster([-180,   0]), [ 19.502981, 250.000000]);
  test.planarEqual(craster([ 180,   0]), [940.497018, 250.000000]);
  test.planarEqual(craster([-179,  15]), [ 35.975533, 209.865040]);
  test.planarEqual(craster([   1,   1]), [482.557970, 247.320952]);
  test.end();
});

tape("geoCraster.invert(point) returns the expected values", function(test) {
  var craster = d3.geoCraster();
  test.sphericalEqual(craster.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(craster.invert([480.000000, 480.248509]), [   0, -90]);
  test.sphericalEqual(craster.invert([480.000000,  19.751490]), [   0,  90]);
  test.sphericalEqual(craster.invert([480.000000, 369.185398]), [   0, -45]);
  test.sphericalEqual(craster.invert([480.000000, 130.814601]), [   0,  45]);
  test.sphericalEqual(craster.invert([ 19.502981, 250.000000]), [-180,   0]);
  test.sphericalEqual(craster.invert([940.497018, 250.000000]), [ 180,   0]);
  test.sphericalEqual(craster.invert([ 35.975533, 209.865040]), [-179,  15]);
  test.sphericalEqual(craster.invert([482.557970, 247.320952]), [   1,   1]);
  test.end();
});
