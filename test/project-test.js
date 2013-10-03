var vows = require("vows"),
    assert = require("./assert"),
    load = require("./load"),
    _ = require("d3");

var suite = vows.describe("d3.geo.project");

suite.addBatch({
  "project": {
    topic: load("project"),
    "equirectangular": {
      topic: function(geo) {
        var equirectangular = _.geo.equirectangular().translate([0, 0]).scale(180 / Math.PI);
        return function(object) { return geo.project(object, equirectangular); };
      },
      "inserts a closing point when projecting polygons": function(project) {
        assert.deepEqual(project({
          type: "Polygon",
          coordinates: [
            [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]
          ]
        }), {
          type: "Polygon",
          coordinates: [
            [[0, 0], [0, -1], [1, -1], [1, 0], [0, 0]]
          ]
        });
      }
    },
    "clipExtent": {
      topic: function(geo) {
        var clip = _.geo.clipExtent().extent([[240, 110], [720, 375]]);
        return function(object) { return geo.project(object, clip); };
      },
      "splits a polygon into multiple polygons and correctly assigns holes": function(project) {
        assert.deepEqual(project({
          type: "Polygon",
          coordinates: [
            [[300, 30], [660, 30], [660, 200], [570, 200], [570, 80], [390, 80], [390, 200], [300, 200], [300, 30]],
            [[330, 140], [330, 170], [360, 170], [360, 140], [330, 140]],
            [[600, 140], [600, 170], [630, 170], [630, 140], [600, 140]]
          ]
        }), {
          type: "MultiPolygon",
          coordinates: [
            [
              [[660, 110], [660, 200], [570, 200], [570, 110], [660, 110]],
              [[600, 140], [600, 170], [630, 170], [630, 140], [600, 140]]
            ],
            [
              [[390, 110], [390, 200], [300, 200], [300, 110], [390, 110]],
              [[330, 140], [330, 170], [360, 170], [360, 140], [330, 140]]
            ]
          ]
        });
      }
    }
  }
});

suite.export(module);
