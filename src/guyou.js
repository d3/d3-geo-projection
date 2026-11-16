import {geoProjection as projection} from "d3-geo";
import {conformalSquare, conformalSquareInverse} from "./conformalSquare.js";
import {atan2, cos, sin, sqrt, sqrt1_2, sqrt2} from "./math.js";
import squareRaw from "./square.js";

// Guyou's projection of the hemisphere |λ| <= π/2; see Snyder & Voxland, eqs. 225–226.
// The output is scaled to keep the coordinates of the previous implementation.
var scale = (2 + sqrt2) / 4;

export function guyouRaw(lambda, phi) {
  var cosPhi = cos(phi),
      u = cosPhi * sin(lambda),
      v = sin(phi),
      p = conformalSquare((u - v) * sqrt1_2, (u + v) * sqrt1_2, cosPhi * cos(lambda));
  return [p[0] * scale, p[1] * scale];
}

guyouRaw.invert = function(x, y) {
  var p = conformalSquareInverse(x / scale, y / scale), // [cos a, cos b, cos c]
      u = (p[0] + p[1]) * sqrt1_2,
      v = (p[1] - p[0]) * sqrt1_2,
      w = p[2];
  return [atan2(u, w), atan2(v, sqrt(u * u + w * w))];
};

export default function() {
  return projection(squareRaw(guyouRaw))
      .scale(151.496);
}
