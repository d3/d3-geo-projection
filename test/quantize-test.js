import assert from "assert";
import {geoQuantize} from "../src/index.js";

it("quantize(Point) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "Point",
    coordinates: [0.1000001, 0.1000001]
  }, 2), {
    type: "Point",
    coordinates: [0.1, 0.1]
  });
});

it("quantize(MultiPoint) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "MultiPoint",
    coordinates: [[0.1000001, 0.1000001]]
  }, 2), {
    type: "MultiPoint",
    coordinates: [[0.1, 0.1]]
  });
});

it("quantize(LineString) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "LineString",
    coordinates: [[0.1000001, 0.1000001], [0.2000001, 0.2000001]]
  }, 2), {
    type: "LineString",
    coordinates: [[0.1, 0.1], [0.2, 0.2]]
  });
});

it("quantize(LineString) does not repeat coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "LineString",
    coordinates: [[0, 0], [0.3, 0.3], [1, 1]]
  }, 0), {
    type: "LineString",
    coordinates: [[0, 0], [1, 1]]
  });
});

it("quantize() does not return an invalid LineString", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "LineString",
    coordinates: [[0, 0], [0.3, 0.3]]
  }, 0), {
    type: "LineString",
    coordinates: [[0, 0], [0, 0]]
  });
});

it("quantize(MultiLineString) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "MultiLineString",
    coordinates: [[[0.1000001, 0.1000001], [0.2000001, 0.2000001]]]
  }, 2), {
    type: "MultiLineString",
    coordinates: [[[0.1, 0.1], [0.2, 0.2]]]
  });
});

it("quantize(Polygon) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "Polygon",
    coordinates: [[[0.1000001, 0.1000001], [0.2000001, 0.1000001], [0.1000001, 0.2000001], [0.1000001, 0.1000001]]]
  }, 2), {
    type: "Polygon",
    coordinates: [[[0.1, 0.1], [0.2, 0.1], [0.1, 0.2], [0.1, 0.1]]]
  });
});

it("quantize(MultiPolygon) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
    type: "MultiPolygon",
    coordinates: [[[[0.1000001, 0.1000001], [0.2000001, 0.1000001], [0.1000001, 0.2000001], [0.1000001, 0.1000001]]]]
  }, 2), {
    type: "MultiPolygon",
    coordinates: [[[[0.1, 0.1], [0.2, 0.1], [0.1, 0.2], [0.1, 0.1]]]]
  });
});

it("quantize(Feature) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
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
});

it("quantize(FeatureCollection) quantizes coordinates", () => {
  assert.deepStrictEqual(geoQuantize({
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
});
