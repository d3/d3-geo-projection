var tape = require("tape"),
    d3 = require("../");

require("./sphericalEqual");

var points = [ [[   0,   0], [480,        250]],
    [[   0, -90], [480,        485.619449]],
    [[   0,  90], [480,         14.380550]],
    [[   0, -45], [480,        367.809724]],
    [[   0,  45], [480,        132.190275]],
    [[-180,   0], [ 94.380550, 250]],
    [[ 180,   0], [865.619449, 250]],
    [[-179,  15], [104.464309, 200.036192]],
    [[   1,   1], [482.142197, 247.381989]],
    [[  45,  87], [522.079049,  21.958321]],
];

tape("winkel3(point) returns the expected values", function(test) {
  var winkel3 = d3.geoWinkel3();
  points.forEach(function(x) {
   test.sphericalEqual(winkel3(x[0]), x[1]);
  });
  test.end();
});

tape("winkel3.invert(point) returns the expected values", function(test) {
  var winkel3 = d3.geoWinkel3();
  points.forEach(function(x) {
   test.sphericalEqual(x[0], winkel3.invert(x[1]));
  });
  test.end();
});
