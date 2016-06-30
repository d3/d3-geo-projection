var tape = require("tape"),
    d3 = require("../");

require("./sphericalEqual");

tape("geoWinkel3(point) returns the expected values", function(test) {
  var winkel3 = d3.geoWinkel3();
  test.sphericalEqual(winkel3([   0,   0]), [480.000000, 250.000000]);
  test.sphericalEqual(winkel3([   0, -90]), [480.000000, 485.619449]);
  test.sphericalEqual(winkel3([   0,  90]), [480.000000,  14.380550]);
  test.sphericalEqual(winkel3([   0, -45]), [480.000000, 367.809724]);
  test.sphericalEqual(winkel3([   0,  45]), [480.000000, 132.190275]);
  test.sphericalEqual(winkel3([-180,   0]), [ 94.380550, 250.000000]);
  test.sphericalEqual(winkel3([ 180,   0]), [865.619449, 250.000000]);
  test.sphericalEqual(winkel3([-179,  15]), [104.464309, 200.036192]);
  test.sphericalEqual(winkel3([   1,   1]), [482.142197, 247.381989]);
  test.sphericalEqual(winkel3([  45,  87]), [522.079049,  21.958321]);
  test.end();
});

tape("geoWinkel3.invert(point) returns the expected values", function(test) {
  var winkel3 = d3.geoWinkel3();
  test.sphericalEqual(winkel3.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(winkel3.invert([480.000000, 485.619449]), [   0, -90]);
  test.sphericalEqual(winkel3.invert([480.000000,  14.380550]), [   0,  90]);
  test.sphericalEqual(winkel3.invert([480.000000, 367.809724]), [   0, -45]);
  test.sphericalEqual(winkel3.invert([480.000000, 132.190275]), [   0,  45]);
  test.sphericalEqual(winkel3.invert([ 94.380550, 250.000000]), [-180,   0]);
  test.sphericalEqual(winkel3.invert([865.619449, 250.000000]), [ 180,   0]);
  test.sphericalEqual(winkel3.invert([104.464309, 200.036192]), [-179,  15]);
  test.sphericalEqual(winkel3.invert([482.142197, 247.381989]), [   1,   1]);
  test.sphericalEqual(winkel3.invert([522.079049,  21.958321]), [  45,  87]);
  test.end();
});
