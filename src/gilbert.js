import {geoEquirectangular} from "d3-geo";
import {atan, degrees, sin, tan} from "./math";

export default function(projection) {
  var equirectangular = geoEquirectangular().scale(degrees).translate([0, 0]); // TODO geoTransform?

  function gilbert(coordinates) {
    return projection([coordinates[0] / 2, asin(tan(coordinates[1] / 2 * radians)) * degrees]);
  }

  if (projection.invert) gilbert.invert = function(coordinates) {
    coordinates = projection.invert(coordinates);
    coordinates[0] *= 2;
    coordinates[1] = 2 * atan(sin(coordinates[1] * radians)) * degrees;
    return coordinates;
  };

  gilbert.stream = function(stream) {
    stream = projection.stream(stream);
    var s = equirectangular.stream({
      point: function(lambda, phi) { stream.point(lambda / 2, asin(tan(-phi / 2 * radians)) * degrees); },
      lineStart: function() { stream.lineStart(); },
      lineEnd: function() { stream.lineEnd(); },
      polygonStart: function() { stream.polygonStart(); },
      polygonEnd: function() { stream.polygonEnd(); }
    });
    s.sphere = function() { stream.sphere(); };
    return s;
  };

  return gilbert;
};
