var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

tape("geoGilbert(point) returns the expected values", function(test) {
  var gilbert = d3.geoGilbert().scale(150);
  test.projectionEqual(gilbert, [   0,   0], [480.0000000, 250.000000]);
  test.assert("fitExtent" in gilbert);
  test.inDelta(gilbert.fitExtent([[0,0],[10,10]], {type:"Sphere"}).scale(), 5, 1e-12);
  test.inDelta(gilbert.fitSize([10,10], {type:"Sphere"}).scale(), 5, 1e-12);
  test.inDelta(gilbert.fitWidth(10, {type:"Sphere"}).scale(), 5, 1e-12);
  test.inDelta(gilbert.fitHeight(10, {type:"Sphere"}).scale(), 5, 1e-12);
  test.end();
});