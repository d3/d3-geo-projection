var tape = require("tape"),
    d3 = require("../");

// A-----B-----C-----D-----E
// |                       |
// |                       |
// J-----I-----H-----G-----F
tape("stitch(object) - a polygon surrounding the South pole with a cut along the antimeridian", function(test) {
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
tape("stitch(object) - a large polygon surrounding the South pole with a cut along the antimeridian", function(test) {
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
tape("topology a large polygon with a hole across the antimeridian and cut along the antimeridian", function(test) {
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
