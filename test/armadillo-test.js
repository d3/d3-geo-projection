var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

// TODO needs D3 core support
// test.equal(armadillo([0, -90]), undefined);

tape("geoArmadillo(point) returns the expected value", function(test) {
  var armadillo = d3.geoArmadillo().scale(150).translate([480, 250]).center([0, 0]);
  test.projectionEqual(armadillo, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(armadillo, [   0,  90], [480.000000,  57.743085]);
  test.projectionEqual(armadillo, [   0, -45], [480.000000, 334.643146]);
  test.projectionEqual(armadillo, [   0,  45], [480.000000, 135.304239]);
  test.projectionEqual(armadillo, [-180,   0], [180.000000, 147.393957]);
  test.projectionEqual(armadillo, [ 180,   0], [780.000000, 147.393957]);
  test.projectionEqual(armadillo, [-179,  15], [185.122354, 111.792545]);
  test.projectionEqual(armadillo, [   1,   1], [482.617761, 247.528295]);
  test.projectionEqual(armadillo, [  45,  87], [540.406730,  56.511657]);
  test.end();
});
