var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

// TODO needs D3 core support
// test.equal(armadillo([0, -90]), undefined);

tape("geoArmadillo(point) returns the expected value", function(test) {
  var armadillo = d3.geoArmadillo().scale(150).translate([480, 250]);
  test.inDelta(armadillo([   0,   0]), [480.000000, 250.000000]);
  test.inDelta(armadillo([   0,  90]), [480.000000,  57.743085]);
  test.inDelta(armadillo([   0, -45]), [480.000000, 334.643146]);
  test.inDelta(armadillo([   0,  45]), [480.000000, 135.304239]);
  test.inDelta(armadillo([-180,   0]), [180.000000, 147.393957]);
  test.inDelta(armadillo([ 180,   0]), [780.000000, 147.393957]);
  test.inDelta(armadillo([-179,  15]), [185.122354, 111.792545]);
  test.inDelta(armadillo([   1,   1]), [482.617761, 247.528295]);
  test.inDelta(armadillo([  45,  87]), [540.406730,  56.511657]);
  test.end();
});

tape("geoArmadillo.invert(point) returns the expected value", function(test) {
  var armadillo = d3.geoArmadillo().scale(150).translate([480, 250]);
  test.inDelta(armadillo.invert([480.000000, 250.000000]), [   0,   0]);
  test.inDelta(armadillo.invert([480.000000,  57.743085]), [   0,  90]);
  test.inDelta(armadillo.invert([480.000000, 334.643146]), [   0, -45]);
  test.inDelta(armadillo.invert([480.000000, 135.304239]), [   0,  45]);
  test.inDelta(armadillo.invert([180.000000, 147.393957]), [-180,   0], 1e-4);
  test.inDelta(armadillo.invert([780.000000, 147.393957]), [ 180,   0], 1e-4);
  test.inDelta(armadillo.invert([185.122354, 111.792545]), [-179,  15], 1e-5);
  test.inDelta(armadillo.invert([482.617761, 247.528295]), [   1,   1]);
  test.inDelta(armadillo.invert([540.406730,  56.511657]), [  45,  87]);
  test.end();
});
