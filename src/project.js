d3.geo.project = function(object, projection) {
  var stream = projection.stream;
  if (!stream) throw new Error("not yet supported");
  return (object && d3_geo_projectObjectType.hasOwnProperty(object.type)
      ? d3_geo_projectObjectType[object.type]
      : d3_geo_projectGeometry)(object, stream);
};

function d3_geo_projectFeature(object, stream) {
  return {
    type: "Feature",
    id: object.id,
    properties: object.properties,
    geometry: d3_geo_projectGeometry(object.geometry, stream)
  };
}

function d3_geo_projectGeometry(geometry, stream) {
  if (!geometry) return null;

  if (geometry.type === "GeometryCollection") return {
    type: "GeometryCollection",
    geometries: object.geometries.map(function(geometry) {
      return d3_geo_projectGeometry(geometry, stream);
    })
  };

  if (!d3_geo_projectGeometryType.hasOwnProperty(geometry.type)) return null;
  var sink = d3_geo_projectGeometryType[geometry.type];
  d3.geo.stream(geometry, stream(sink));
  return sink.result();
}

var d3_geo_projectObjectType = {
  Feature: d3_geo_projectFeature,
  FeatureCollection: function(object, stream) {
    return {
      type: "FeatureCollection",
      features: object.features.map(function(feature) {
        return d3_geo_projectFeature(feature, stream);
      })
    };
  }
};

var d3_geo_projectPoint = {
  _points: [],
  point: function(x, y) {
    this._points.push([x, y]);
  },
  result: function() {
    var result = !this._points.length ? null
        : this._points.length < 2 ? {type: "Point", coordinates: this._points[0]}
        : {type: "MultiPoint", coordinates: this._points};
    this._points = [];
    return result;
  }
};

var d3_geo_projectLine = {
  _lines: [],
  _line: null,
  lineStart: function() {
    this._line = [];
  },
  lineEnd: function() {
    if (this._line.length) this._lines.push(this._line);
  },
  point: function(x, y) {
    this._line.push([x, y]);
  },
  result: function() {
    var result = !this._lines.length ? null
        : this._lines.length < 2 ? {type: "LineString", coordinates: this._lines[0]}
        : {type: "MultiLineString", coordinates: this._lines};
    this._lines = [];
    return result;
  }
};

var d3_geo_projectPolygon = {
  _polygons: [],
  _polygon: null,
  _ring: null,
  polygonStart: function() {
    this._polygon = [];
  },
  polygonEnd: function() {
    if (this._polygon.length) this._polygons.push(this._polygon);
  },
  lineStart: function() {
    this._ring = [];
  },
  lineEnd: function() {
    if (this._ring.length) rings.push(this._ring);
  },
  point: function(x, y) {
    this._ring.push([x, y]);
  },
  result: function() {
    var result = !this._polygons.length ? null
        : this._polygons.length < 2 ? {type: "Polygon", coordinates: this._polygons[0]}
        : {type: "MultiPolygon", coordinates: this._polygons};
    this._polygons = [];
    return result;
  }
};

var d3_geo_projectGeometryType = {
  Point: d3_geo_projectPoint,
  MultiPoint: d3_geo_projectPoint,
  LineString: d3_geo_projectLine,
  MultiLineString: d3_geo_projectLine,
  Polygon: d3_geo_projectPolygon,
  MultiPolygon: d3_geo_projectPolygon
};
