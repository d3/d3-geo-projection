var tape = require("tape"),
    d3 = require("../");

var epsilon = 1e-6;

tape("stitch(Geometry) preserves the bbox of the input geometry", function(test) {
  test.deepEqual(fix(d3.geoStitch({
    type: "Polygon",
    bbox: [-180, -90, 180, 90],
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]
    ]
  })), {
    type: "Polygon",
    bbox: [-180, -90, 180, 90],
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
  test.end();
});

tape("stitch(Feature) preserves the id, bbox and properties of the input feature", function(test) {
  test.deepEqual(fix(d3.geoStitch({
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
  })), {
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
  test.end();
});

tape("stitch(FeatureCollection) preserves bbox of the input feature collection", function(test) {
  test.deepEqual(fix(d3.geoStitch({
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
  })), {
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
  test.end();
});

tape("stitch(Polygon) applies an epsilon threshold to the poles and antimeridian", function(test) {
  test.deepEqual(fix(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180 + epsilon, -80], [-90, -80], [0, -80], [90, -80], [180 - epsilon, -80], [180 - epsilon, -90 + epsilon], [90, -90 + epsilon], [0, -90 + epsilon], [-90, -90 + epsilon], [-180 - epsilon, -90 + epsilon], [-180 - epsilon, -80]]
    ]
  })), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
  test.deepEqual(fix(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180 - epsilon, -80], [-90, -80], [0, -80], [90, -80], [180 + epsilon, -80], [180 + epsilon, -90 - epsilon], [90, -90 - epsilon], [0, -90 - epsilon], [-90, -90 - epsilon], [-180 + epsilon, -90 - epsilon], [-180 + epsilon, -80]]
    ]
  })), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
  test.end();
});

// A-----B-----C-----D-----E
// |                       |
// |                       |
// J-----I-----H-----G-----F
tape("stitch(Polygon) surrounding the South pole with a cut along the antimeridian", function(test) {
  test.deepEqual(fix(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]
    ]
  })), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
  test.end();
});

// B-----C-----D-----E-----F
// |                       |
// |                       |
// A                       G
// |                       |
// |                       |
// L-----K-----J-----I-----H
tape("stitch(Polygon) surrounding the South pole with a cut along the antimeridian", function(test) {
  test.deepEqual(fix(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180, -85], [-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -85], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -85]]
    ]
  })), {
    type: "Polygon",
    coordinates: [
      [[-180, -80], [-90, -80], [0, -80], [90, -80], [-180, -80]]
    ]
  });
  test.end();
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
tape("stitch(Polygon) with a hole across the antimeridian and cut along the antimeridian", function(test) {
  test.deepEqual(fix(d3.geoStitch({
    type: "Polygon",
    coordinates: [
      [[-180, -60], [-180, -30], [-150, 0], [-180, 30], [-180, 60], [-60, 60], [60, 60], [180, 60], [180, 30], [150, 0], [180, -30], [180, -60], [60, -60], [-60, -60], [-180, -60]]
    ]
  })), {
    type: "Polygon",
    coordinates: [
      [[-180, 60], [-60, 60], [60, 60], [-180, 60]], // North pole
      [[-180, -60], [60, -60], [-60, -60], [-180, -60]], // South pole
      [[-180, 30], [150, 0], [-180, -30], [-150, 0], [-180, 30]] // hole
    ]
  });
  test.end();
});

// https://github.com/d3/d3-geo-projection/issues/88
function fix(o) {
  if (o != null) switch (o.type) {
    case "Feature": fixFeature(o); break;
    case "FeatureCollection": o.features.forEach(fixFeature); break;
    default: fixGeometry(o); break;
  }
  return o;
}

function fixFeature(o) {
  fixGeometry(o.geometry);
}

function fixGeometry(o) {
  if (o != null) switch (o.type) {
    case "GeometryCollection": o.geometries.forEach(fixGeometry); break;
    case "Polygon": fixPolygon(o.coordinates); break;
    case "MultiPolygon": o.coordinates.forEach(fixPolygon); break;
  }
}

function fixPolygon(coordinates) {
  coordinates.forEach(fixRing);
}

function fixRing(coordinates) {
  delete coordinates.polygon;
}
