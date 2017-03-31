var tape = require("tape"),
    d3 = require("../");

var epsilon = 1e-6;

tape("quantize(Point) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "Point",
    coordinates: [0.1000001, 0.1000001]
  }, 2), {
    type: "Point",
    coordinates: [0.1, 0.1]
  });
  test.end();
});

tape("quantize(MultiPoint) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "MultiPoint",
    coordinates: [[0.1000001, 0.1000001]]
  }, 2), {
    type: "MultiPoint",
    coordinates: [[0.1, 0.1]]
  });
  test.end();
});

tape("quantize(LineString) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "LineString",
    coordinates: [[0.1000001, 0.1000001], [0.2000001, 0.2000001]]
  }, 2), {
    type: "LineString",
    coordinates: [[0.1, 0.1], [0.2, 0.2]]
  });
  test.end();
});

tape("quantize(MultiLineString) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "MultiLineString",
    coordinates: [[[0.1000001, 0.1000001], [0.2000001, 0.2000001]]]
  }, 2), {
    type: "MultiLineString",
    coordinates: [[[0.1, 0.1], [0.2, 0.2]]]
  });
  test.end();
});

tape("quantize(Polygon) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "Polygon",
    coordinates: [[[0.1000001, 0.1000001], [0.2000001, 0.1000001], [0.1000001, 0.2000001], [0.1000001, 0.1000001]]]
  }, 2), {
    type: "Polygon",
    coordinates: [[[0.1, 0.1], [0.2, 0.1], [0.1, 0.2], [0.1, 0.1]]]
  });
  test.end();
});

tape("quantize(MultiPolygon) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "MultiPolygon",
    coordinates: [[[[0.1000001, 0.1000001], [0.2000001, 0.1000001], [0.1000001, 0.2000001], [0.1000001, 0.1000001]]]]
  }, 2), {
    type: "MultiPolygon",
    coordinates: [[[[0.1, 0.1], [0.2, 0.1], [0.1, 0.2], [0.1, 0.1]]]]
  });
  test.end();
});

tape("quantize(Feature) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "Feature",
    id: "feature",
    bbox: [0.1, 0.1, 0.2, 0.2],
    properties: {foo: 42},
    geometry: {
      type: "MultiPolygon",
      coordinates: [[[[0.1000001, 0.1000001], [0.2000001, 0.1000001], [0.1000001, 0.2000001], [0.1000001, 0.1000001]]]]
    }
  }, 2), {
    type: "Feature",
    id: "feature",
    bbox: [0.1, 0.1, 0.2, 0.2],
    properties: {foo: 42},
    geometry: {
      type: "MultiPolygon",
      coordinates: [[[[0.1, 0.1], [0.2, 0.1], [0.1, 0.2], [0.1, 0.1]]]]
    }
  });
  test.end();
});

tape("quantize(FeatureCollection) quantizes coordinates", function(test) {
  test.deepEqual(d3.geoQuantize({
    type: "FeatureCollection",
    bbox: [0.1, 0.1, 0.2, 0.2],
    features: [
      {
        type: "Feature",
        id: "feature",
        bbox: [0.1, 0.1, 0.2, 0.2],
        properties: {foo: 42},
        geometry: {
          type: "MultiPolygon",
          coordinates: [[[[0.1000001, 0.1000001], [0.2000001, 0.1000001], [0.1000001, 0.2000001], [0.1000001, 0.1000001]]]]
        }
      }
    ]
  }, 2), {
    type: "FeatureCollection",
    bbox: [0.1, 0.1, 0.2, 0.2],
    features: [
      {
        type: "Feature",
        id: "feature",
        bbox: [0.1, 0.1, 0.2, 0.2],
        properties: {foo: 42},
        geometry: {
          type: "MultiPolygon",
          coordinates: [[[[0.1, 0.1], [0.2, 0.1], [0.1, 0.2], [0.1, 0.1]]]]
        }
      }
    ]
  });
  test.end();
});
