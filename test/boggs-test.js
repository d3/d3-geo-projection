var tape = require("tape"),
    d3 = require("../");

require("./planarEqual");
require("./sphericalEqual");

tape("geoBoggs(point) returns the expected values", function(test) {
  var boggs = d3.geoBoggs();
  test.planarEqual(boggs([   0,   0]), [480.000000, 250.000000]);
  test.planarEqual(boggs([   0, -90]), [480.000000, 473.567218]);
  test.planarEqual(boggs([   0,  90]), [480.000000,  26.432781]);
  test.planarEqual(boggs([   0, -45]), [480.000000, 371.532657]);
  test.planarEqual(boggs([   0,  45]), [480.000000, 128.467342]);
  test.planarEqual(boggs([-180,   0]), [ 32.864228, 250.000000]);
  test.planarEqual(boggs([ 180,   0]), [927.135771, 250.000000]);
  test.planarEqual(boggs([-179,  15]), [ 47.500957, 208.708722]);
  test.planarEqual(boggs([   1,   1]), [482.483785, 247.240908]);
  test.planarEqual(boggs([  45,  87]), [488.857270,  31.512628]);
  test.end();
});

tape("geoBoggs.invert(point) returns the expected values", function(test) {
  var boggs = d3.geoBoggs();
  test.sphericalEqual(boggs.invert([480.000000, 250.000000]), [   0,   0]);
  test.sphericalEqual(boggs.invert([480.000000, 473.567218]), [   0, -90]);
  test.sphericalEqual(boggs.invert([480.000000,  26.432781]), [   0,  90]);
  test.sphericalEqual(boggs.invert([480.000000, 371.532657]), [   0, -45]);
  test.sphericalEqual(boggs.invert([480.000000, 128.467342]), [   0,  45]);
  test.sphericalEqual(boggs.invert([ 32.864228, 250.000000]), [-180,   0]);
  test.sphericalEqual(boggs.invert([927.135771, 250.000000]), [ 180,   0]);
  test.sphericalEqual(boggs.invert([ 47.500957, 208.708722]), [-179,  15]);
  test.sphericalEqual(boggs.invert([482.483785, 247.240908]), [   1,   1]);
  test.sphericalEqual(boggs.invert([488.857270,  31.512628]), [  45,  87]);
  test.end();
});
