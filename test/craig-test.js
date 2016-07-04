var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoCraig(point) returns the expected values", function(test) {
  var craig = d3.geoCraig().scale(150);
  test.projectionEqual(craig, [   0,   0], [480.0000000,  250.000000]);
  test.projectionEqual(craig, [   0, -90], [480.0000000,  400.000000]);
  test.projectionEqual(craig, [   0,  90], [480.0000000,  100.000000]);
  test.projectionEqual(craig, [   0, -45], [480.0000000,  356.066017]);
  test.projectionEqual(craig, [   0,  45], [480.0000000,  143.933982]);
  test.projectionEqual(craig, [-180,   0], [  8.7611010,  250.000000]);
  test.projectionEqual(craig, [ 180,   0], [951.2388980,  250.000000]);
  test.projectionEqual(craig, [-179,  15], [ 11.3790958, 7198.585721]);
  test.projectionEqual(craig, [   1,   1], [482.6179930,  247.382404]);
  test.end();
});

tape("craig.parallel(parallel) sets the standard parallel", function(test) {
  var craig = d3.geoCraig().scale(150).parallel(30);
  test.projectionEqual(craig, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(craig, [   0, -30], [480.000000, 313.397459]);
  test.projectionEqual(craig, [   0,  30], [480.000000, 163.397459]);
  test.projectionEqual(craig, [   0, -45], [480.000000, 330.700720]);
  test.projectionEqual(craig, [   0,  45], [480.000000, 118.568686]);
  test.projectionEqual(craig, [   1,   1], [482.617993, 247.373611]);
  test.end();
});
