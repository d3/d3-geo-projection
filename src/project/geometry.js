import {geoStream} from "d3-geo";
import noop from "../noop";
import clockwise from "./clockwise";
import contains from "./contains";

export default function projectGeometry(geometry, stream) {
  if (!geometry) return null;

  if (geometry.type === "GeometryCollection") return {
    type: "GeometryCollection",
    geometries: geometry.geometries.map(function(geometry) {
      return projectGeometry(geometry, stream);
    })
  };

  if (!projectGeometryType.hasOwnProperty(geometry.type)) return null;
  var sink = projectGeometryType[geometry.type];
  geoStream(geometry, stream(sink));
  return sink.result();
}

var points = [],
    lines = [];

var projectPoint = {
  point: function(x, y) {
    points.push([x, y]);
  },
  result: function() {
    var result = !points.length ? null
        : points.length < 2 ? {type: "Point", coordinates: points[0]}
        : {type: "MultiPoint", coordinates: points};
    points = [];
    return result;
  }
};

var projectLine = {
  lineStart: noop,
  point: function(x, y) {
    points.push([x, y]);
  },
  lineEnd: function() {
    if (points.length) lines.push(points), points = [];
  },
  result: function() {
    var result = !lines.length ? null
        : lines.length < 2 ? {type: "LineString", coordinates: lines[0]}
        : {type: "MultiLineString", coordinates: lines};
    lines = [];
    return result;
  }
};

var projectPolygon = {
  polygonStart: noop,
  lineStart: noop,
  point: function(x, y) {
    points.push([x, y]);
  },
  lineEnd: function() {
    var n = points.length;
    if (n) {
      do points.push(points[0].slice()); while (++n < 4);
      lines.push(points), points = [];
    }
  },
  polygonEnd: noop,
  result: function() {
    if (!lines.length) return null;
    var polygons = [],
        holes = [];

    // https://github.com/d3/d3/issues/1558

    lines.forEach(function(ring) {
      if (clockwise(ring)) polygons.push([ring]);
      else holes.push(ring);
    });

    holes.forEach(function(hole) {
      var point = hole[0];
      polygons.some(function(polygon) {
        if (contains(polygon[0], point)) {
          polygon.push(hole);
          return true;
        }
      }) || polygons.push([hole]);
    });

    lines = [];

    return !polygons.length ? null
        : polygons.length > 1 ? {type: "MultiPolygon", coordinates: polygons}
        : {type: "Polygon", coordinates: polygons[0]};
  }
};

var projectGeometryType = {
  Point: projectPoint,
  MultiPoint: projectPoint,
  LineString: projectLine,
  MultiLineString: projectLine,
  Polygon: projectPolygon,
  MultiPolygon: projectPolygon,
  Sphere: projectPolygon
};
