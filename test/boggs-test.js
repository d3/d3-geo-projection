var tape = require("tape"),
    d3 = require("../");

require("./projectionEqual");

tape("geoBoggs(point) returns the expected values", function(test) {
  var boggs = d3.geoBoggs().scale(150);
  test.projectionEqual(boggs, [   0,   0], [480.000000, 250.000000]);
  test.projectionEqual(boggs, [   0, -90], [480.000000, 473.567218]);
  test.projectionEqual(boggs, [   0,  90], [480.000000,  26.432781]);
  test.projectionEqual(boggs, [   0, -45], [480.000000, 371.532657]);
  test.projectionEqual(boggs, [   0,  45], [480.000000, 128.467342]);
  test.projectionEqual(boggs, [-180,   0], [ 32.864228, 250.000000]);
  test.projectionEqual(boggs, [ 180,   0], [927.135771, 250.000000]);
  test.projectionEqual(boggs, [-179,  15], [ 47.500957, 208.708722]);
  test.projectionEqual(boggs, [   1,   1], [482.483785, 247.240908]);
  test.projectionEqual(boggs, [  45,  87], [488.857270,  31.512628]);
  test.end();
});
