import {geoProjection} from "d3-geo";
import {atan, cos, radians, tan} from "./math";

function faheyRaw(lambda, phi) {
  var t = tan(phi / 2);
  return [
    lambda * faheyK * sqrt(1 - t * t),
    (1 + faheyK) * t
  ];
}

faheyRaw.invert = function(x, y) {
  var t = y / (1 + faheyK);
  return [
    x ? x / (faheyK * sqrt(1 - t * t)) : 0,
    2 * atan(t)
  ];
};

var faheyK = cos(35 * radians);

export default function() {
  return geoProjection(faheyRaw);
}
