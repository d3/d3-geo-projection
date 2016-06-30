var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoBottomley(point) returns the expected values", function(test) {
  var bottomley = d3.geoBottomley();
  test.planarEqual(bottomley([   0,   0]), [480.0000000, 250.000000]);
  test.planarEqual(bottomley([   0, -90]), [480.0000000, 485.619449]);
  test.planarEqual(bottomley([   0,  89]), [480.0000000,  16.998544]);
  test.planarEqual(bottomley([   0, -45]), [480.0000000, 367.809724]);
  test.planarEqual(bottomley([   0,  45]), [480.0000000, 132.190275]);
  test.planarEqual(bottomley([-160,   0]), [114.1433513, 162.885611]);
  test.planarEqual(bottomley([ 150,   0]), [828.8001246, 172.813953]);
  test.planarEqual(bottomley([-179,  15]), [121.1311782,  94.107801]);
  test.planarEqual(bottomley([   1,   1]), [482.6175813, 247.378330]);
  test.end();
});

tape("geoBottomley.invert(point) returns the expected values", function(test) {
  var bottomley = d3.geoBottomley();
  test.sphericalEqual(bottomley.invert([480.0000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(bottomley.invert([480.0000000, 485.619449]), [   0, -90]);
  test.sphericalEqual(bottomley.invert([480.0000000,  16.998544]), [   0,  89]);
  test.sphericalEqual(bottomley.invert([480.0000000, 367.809724]), [   0, -45]);
  test.sphericalEqual(bottomley.invert([480.0000000, 132.190275]), [   0,  45]);
  test.sphericalEqual(bottomley.invert([114.1433513, 162.885611]), [-160,   0]);
  test.sphericalEqual(bottomley.invert([828.8001246, 172.813953]), [ 150,   0]);
  test.sphericalEqual(bottomley.invert([121.1311782,  94.107801]), [-179,  15]);
  test.sphericalEqual(bottomley.invert([482.6175813, 247.378330]), [   1,   1]);
  test.end();
});
