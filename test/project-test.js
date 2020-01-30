var tape = require("tape"),
    d3 = require("../"),
    d3Geo = require("d3-geo");

require("./inDelta");

tape("project(Geometry, transform) rewinds planar polygons", function(test) {
  var projection = d3Geo.geoEquirectangular().translate([0,0]).scale(180/Math.PI);
  var poly = {
    type: "Polygon",
    coordinates: [
      [ [1,1], [1,10], [10,10], [10,1], [1,1] ],
      [ [3,3], [9,3], [9,9], [3,9], [3,3] ]
    ]
  };
  test.inDelta(d3.geoProject(poly, projection).coordinates,
    [
      [ [1,-1], [1,-10], [10,-10], [10,-1], [1,-1] ],
      [ [3,-3], [9,-3], [9,-9], [3,-9], [3,-3] ]
    ]);
  test.equal(d3.geoProject(poly, projection).type, "Polygon");

  // badly formed multipolygon
  poly = {
    type: "MultiPolygon",
    coordinates: [
      [[ [1,1], [1,10], [10,10], [10,1], [1,1] ]],
      [[ [3,3], [3,9], [9,9], [9,3], [3,3] ]]
    ]
  };
  test.inDelta(d3.geoProject(poly, projection).coordinates,
    [
      [[ [1,-1], [1,-10], [10,-10], [10,-1], [1,-1] ]],
      [[ [3,-3], [3,-9], [9,-9], [9,-3], [3,-3] ]]
    ]);
  test.equal(d3.geoProject(poly, projection).type, "MultiPolygon");
  test.end();
});


tape("project(Geometry, transform, true) rewinds spherical polygons", function(test) {
  var transformRotate = d3Geo.geoTransform({
    point: function (x, y) { this.stream.point(x + 10,y); }
  });

  var poly = {
    type: "Polygon",
    coordinates: [
      [ [1,1], [1,10], [10,10], [10,1], [1,1] ],
      [ [3,3], [9,3], [9,9], [3,9], [3,3] ]
    ]
  };
  test.inDelta(d3.geoProject(poly, transformRotate, true).coordinates,
    [
      [ [11,1], [11,10], [20,10], [20,1], [11,1] ],
      [ [13,3], [19,3], [19,9], [13,9], [13,3] ]
    ]);
  test.equal(d3.geoProject(poly, transformRotate, true).type, "Polygon");

  // the transform would fail if we didn't specify spherical=true
  test.equal(d3.geoProject(poly, transformRotate, false).type, "MultiPolygon");

  // badly formed multipolygon
  poly = {
    type: "MultiPolygon",
    coordinates: [
      [[ [1,1], [1,10], [10,10], [10,1], [1,1] ]],
      [[ [3,3], [3,9], [9,9], [9,3], [3,3] ]]
    ]
  };
  test.inDelta(d3.geoProject(poly, transformRotate, true).coordinates,
    [
      [[ [11,1], [11,10], [20,10], [20,1], [11,1] ]],
      [[ [13,3], [13,9], [19,9], [19,3], [13,3] ]]
    ]);
  test.equal(d3.geoProject(poly, transformRotate, true).type, "MultiPolygon");
  
  // the transform would fail if we didn't specify spherical=true
  test.equal(d3.geoProject(poly, transformRotate, false).type, "Polygon");

  test.end();
});
