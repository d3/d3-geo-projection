export default function(o, digits) {
  if (!(0 <= (digits = +digits) && digits <= 20)) throw new Error("invalid digits");

  function quantizePoint(coordinates) {
    coordinates[0] = +coordinates[0].toFixed(digits);
    coordinates[1] = +coordinates[1].toFixed(digits);
  }

  function quantizePoints(coordinates) {
    coordinates.forEach(quantizePoint);
  }

  function quantizePolygon(coordinates) {
    coordinates.forEach(quantizePoints);
  }

  function quantizeGeometry(o) {
    if (o) switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(quantizeGeometry); break;
      case "Point": quantizePoint(o.coordinates); break;
      case "MultiPoint": case "LineString": quantizePoints(o.coordinates); break;
      case "MultiLineString": case "Polygon": quantizePolygon(o.coordinates); break;
      case "MultiPolygon": o.coordinates.forEach(quantizePolygon); break;
      default: return;
    }
  }

  function quantizeFeature(o) {
    quantizeGeometry(o.geometry);
  }

  if (o) switch (o.type) {
    case "Feature": quantizeFeature(o); break;
    case "FeatureCollection": o.features.forEach(quantizeFeature); break;
    default: quantizeGeometry(o); break;
  }

  return o;
}
