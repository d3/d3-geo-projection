import {geoProjection as projection} from "d3-geo";
import {conformalSquare, conformalSquareInverse} from "./conformalSquare.js";
import {atan, atan2, cos, sin, sqrt, sqrt1_2, tan} from "./math.js";

// Adams's projection of the world in a square II; see Snyder & Voxland, eqs. 235–237.
// The sphere is first mapped to a hemisphere by halving the angles: sin φ′ = tan(φ/2) and λ/2.
// Here the poles lie in two opposite corners of the square.
export function adams2SquareRaw(lambda, phi) {
  var v = tan(phi / 2), // sin φ′
      cosPhi1 = sqrt(1 - v * v);
  return conformalSquare(cosPhi1 * sin(lambda / 2), v, cosPhi1 * cos(lambda / 2));
}

adams2SquareRaw.invert = function(x, y) {
  var p = conformalSquareInverse(x, y); // [cos a, cos b, cos c]
  return [2 * atan2(p[0], p[2]), 2 * atan(p[1])];
};

// Turned by 45°, with the poles at the top and at the bottom.
export function adams2Raw(lambda, phi) {
  var p = adams2SquareRaw(lambda, phi);
  return [(p[0] - p[1]) * sqrt1_2, (p[0] + p[1]) * sqrt1_2];
}

adams2Raw.invert = function(x, y) {
  return adams2SquareRaw.invert((x + y) * sqrt1_2, (y - x) * sqrt1_2);
};

export default function() {
  return projection(adams2Raw)
      .scale(95.1543);
}
