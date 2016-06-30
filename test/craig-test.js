var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoCraig(point) returns the expected values", function(test) {
  var craig = d3.geoCraig().scale(150);
  test.planarEqual(craig([   0,   0]), [480.0000000,  250.000000]);
  test.planarEqual(craig([   0, -90]), [480.0000000,  400.000000]);
  test.planarEqual(craig([   0,  90]), [480.0000000,  100.000000]);
  test.planarEqual(craig([   0, -45]), [480.0000000,  356.066017]);
  test.planarEqual(craig([   0,  45]), [480.0000000,  143.933982]);
  test.planarEqual(craig([-180,   0]), [  8.7611010,  250.000000]);
  test.planarEqual(craig([ 180,   0]), [951.2388980,  250.000000]);
  test.planarEqual(craig([-179,  15]), [ 11.3790958, 7198.585721]);
  test.planarEqual(craig([   1,   1]), [482.6179930,  247.382404]);
  test.end();
});

tape("geoCraig.invert(point) returns the expected values", function(test) {
  var craig = d3.geoCraig().scale(150);
  test.sphericalEqual(craig.invert([480.0000000,  250.000000]), [   0,   0]);
  test.sphericalEqual(craig.invert([480.0000000,  400.000000]), [   0, -90]);
  test.sphericalEqual(craig.invert([480.0000000,  100.000000]), [   0,  90]);
  test.sphericalEqual(craig.invert([480.0000000,  356.066017]), [   0, -45]);
  test.sphericalEqual(craig.invert([480.0000000,  143.933982]), [   0,  45]);
  test.sphericalEqual(craig.invert([  8.7611010,  250.000000]), [-180,   0]);
  test.sphericalEqual(craig.invert([951.2388980,  250.000000]), [ 180,   0]);
  test.sphericalEqual(craig.invert([ 11.3790958, 7198.585721]), [-179,  15]);
  test.sphericalEqual(craig.invert([482.6179930,  247.382404]), [   1,   1]);
  test.end();
});

tape("craig.parallel(parallel) sets the standard parallel", function(test) {
  var craig = d3.geoCraig().scale(150).parallel(30);
  test.planarEqual(craig([   0,   0]), [480.000000, 250.000000]);
  test.planarEqual(craig([   0, -30]), [480.000000, 313.397459]);
  test.planarEqual(craig([   0,  30]), [480.000000, 163.397459]);
  test.planarEqual(craig([   0, -45]), [480.000000, 330.700720]);
  test.planarEqual(craig([   0,  45]), [480.000000, 118.568686]);
  test.planarEqual(craig([   1,   1]), [482.617993, 247.373611]);
  test.sphericalEqual(craig.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(craig.invert([480.000000, 313.397459]), [   0, -30]);
  test.sphericalEqual(craig.invert([480.000000, 163.397459]), [   0,  30]);
  test.sphericalEqual(craig.invert([480.000000, 330.700720]), [   0, -45]);
  test.sphericalEqual(craig.invert([480.000000, 118.568686]), [   0,  45]);
  test.sphericalEqual(craig.invert([482.617993, 247.373611]), [   1,   1]);
  test.end();
});
