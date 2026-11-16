import {geoProjection as projection} from "d3-geo";
import {conformalSquare, conformalSquareInverse} from "./conformalSquare.js";
import {atan, atan2, cos, sin, sqrt, sqrt1_2, tan} from "./math.js";

// Adams's projection of the world in a square I; see Snyder & Voxland, eqs. 237–239.
// The sphere is first mapped to a hemisphere by halving the angles: sin φ′ = tan(φ/2) and λ/2.
export function adams1Raw(lambda, phi) {
  var v = tan(phi / 2), // sin φ′
      cosPhi1 = sqrt(1 - v * v),
      u = cosPhi1 * sin(lambda / 2);
  return conformalSquare((u - v) * sqrt1_2, (u + v) * sqrt1_2, cosPhi1 * cos(lambda / 2));
}

adams1Raw.invert = function(x, y) {
  var p = conformalSquareInverse(x, y), // [cos a, cos b, cos c]
      u = (p[0] + p[1]) * sqrt1_2,
      v = (p[1] - p[0]) * sqrt1_2;
  return [2 * atan2(u, p[2]), 2 * atan(v)];
};

export default function() {
  return projection(adams1Raw)
      .scale(134.5685);
}
