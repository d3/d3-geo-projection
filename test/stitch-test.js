import assert from "assert";
import * as d3 from "../src/index.js";
import {readFileSync} from "fs";

const epsilon = 1e-6;

it("stitch(Geometry) preserves the bbox of the input geometry", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "Polygon",
    bbox: [-180, -90, 180, 90],
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]
    ]
  }), {
    type: "Polygon",
    bbox: [-180, -90, 180, 90],
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
});

it("stitch(Feature) preserves the id, bbox and properties of the input feature", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "Feature",
    id: "polygon",
    bbox: [-180, -90, 180, 90],
    properties: {foo: 42},
    geometry: {
      type: "Polygon",
      coordinates: [
        [[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]
      ]
    }
  }), {
    type: "Feature",
    id: "polygon",
    bbox: [-180, -90, 180, 90],
    properties: {foo: 42},
    geometry: {
      type: "Polygon",
      coordinates: [
        [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
      ]
    }
  });
});

it("stitch(FeatureCollection) preserves bbox of the input feature collection", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "FeatureCollection",
    bbox: [-180, -90, 180, 90],
    features: [
      {
        type: "Feature",
        id: "polygon",
        bbox: [-180, -90, 180, 90],
        properties: {foo: 42},
        geometry: {
          type: "Polygon",
          coordinates: [
            [[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]
          ]
        }
      }
    ]
  }), {
    type: "FeatureCollection",
    bbox: [-180, -90, 180, 90],
    features: [
      {
        type: "Feature",
        id: "polygon",
        bbox: [-180, -90, 180, 90],
        properties: {foo: 42},
        geometry: {
          type: "Polygon",
          coordinates: [
            [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
          ]
        }
      }
    ]
  });
});

it("stitch(Polygon) applies an epsilon threshold to the poles and antimeridian", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180 + epsilon, -80], [-90, -80], [0, -80], [90, -80], [180 - epsilon, -80], [180 - epsilon, -90 + epsilon], [90, -90 + epsilon], [0, -90 + epsilon], [-90, -90 + epsilon], [-180 - epsilon, -90 + epsilon], [-180 - epsilon, -80]]
    ]
  }), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
  assert.deepStrictEqual(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180 - epsilon, -80], [-90, -80], [0, -80], [90, -80], [180 + epsilon, -80], [180 + epsilon, -90 - epsilon], [90, -90 - epsilon], [0, -90 - epsilon], [-90, -90 - epsilon], [-180 + epsilon, -90 - epsilon], [-180 + epsilon, -80]]
    ]
  }), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
});

// A-----B-----C-----D-----E
// |                       |
// |                       |
// J-----I-----H-----G-----F
it("stitch(Polygon) surrounding the South pole with a cut along the antimeridian", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]
    ]
  }), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
});

// B-----C-----D-----E-----F
// |                       |
// |                       |
// A                       G
// |                       |
// |                       |
// L-----K-----J-----I-----H
it("stitch(Polygon) surrounding the South pole with a cut along the antimeridian", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180, -85], [-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -85], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -85]]
    ]
  }), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
});

// A-----B-----C-----D
// |                 |
// N                 E
//  \               /
//   M             F
//  /               \
// L                 G
// |                 |
// K-----J-----I-----H
it("stitch(Polygon) with a hole across the antimeridian and cut along the antimeridian", () => {
  assert.deepStrictEqual(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180, -60], [-180, -30], [-150, 0], [-180, 30], [-180, 60], [-60, 60], [60, 60], [180, 60], [180, 30], [150, 0], [180, -30], [180, -60], [60, -60], [-60, -60], [-180, -60]]
    ]
  }), {
    type: "Polygon",
    coordinates: [
      [[-180, 60], [-60, 60], [60, 60], [-180, 60]], // North pole
      [[-180, -60], [60, -60], [-60, -60], [-180, -60]], // South pole
      [[-180, 30], [150, 0], [-180, -30], [-150, 0], [-180, 30]] // hole
    ]
  });
});

["fiji", "antarctica", "russia"].forEach(function(name) {
  it("stitch(" + name + ")", () => {
    const unstitched = JSON.parse(readFileSync("./test/data/unstitched-" + name + ".json")),
        stitched = JSON.parse(readFileSync("./test/data/stitched-" + name + ".json")),
        original = JSON.parse(JSON.stringify(unstitched));
    assert.deepStrictEqual(d3.geoStitch(unstitched), stitched);
    assert.deepStrictEqual(unstitched, original);
});
});
