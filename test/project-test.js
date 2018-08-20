var tape = require("tape"),
    d3 = Object.assign({}, require("d3-geo"), require("../"));

tape("project(polygon with hole) preserves the hole", function(test) {
  var poly = {
    type: "Polygon",
    coordinates: [
      [[0, 0], [0, 4], [4, 4], [4, 0], [0, 0]],
      [[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]
    ]
  };
  test.deepEqual(d3.geoProject(poly, d3.geoIdentity()), poly);
  test.end();
});

tape("project(polygon & hole on the antimeridian) preserves the polygon", function(test) {
  var poly = {
    type: "Polygon",
    coordinates: [
      [[178, 0], [-178, 2], [-178, -2], [178, 0]],
      [[179, 0], [-179, -1], [-179, 1], [179, 0]]
    ]
  };
  test.deepEqual(d3.geoProject(poly, d3.geoIdentity()), poly);
  test.end();
});

tape("project(polygon & hole at the pole) preserves the polygon", function(test) {
  var poly = {
    type: "Polygon",
    coordinates: [
      [[180, -85], [-90, -85], [0, -85], [90, -85], [180, -85]],
      [[180, -89], [90, -89], [0, -89], [-90, -89], [180, -89]]
    ]
  };
  test.deepEqual(d3.geoProject(poly, d3.geoIdentity()), poly);
  test.end();
});
