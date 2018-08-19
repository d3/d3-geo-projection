var tape = require("tape"),
    d3 = Object.assign({}, require("d3-geo"), require("../"));

tape("project(polygon with hole) preserves the hole", function(test) {
  test.deepEqual(d3.geoProject({
    type: "Polygon",
    coordinates: [
      [[0, 0], [0, 4], [4, 4], [4, 0], [0, 0]],
      [[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]
    ]
  }, d3.geoIdentity()), {
    type: "Polygon",
    coordinates: [
      [[0, 0], [0, 4], [4, 4], [4, 0], [0, 0]],
      [[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]
    ]
  });
  test.end();
});
