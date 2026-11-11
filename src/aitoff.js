import {geoProjection as projection} from "d3-geo";
import {acos, atan2, cos, epsilon, pi, sin, sinci, sqrt} from "./math.js";

export function aitoffRaw(x, y) {
  var cosy = cos(y), sincia = sinci(acos(cosy * cos(x /= 2)));
  return [2 * cosy * sin(x) * sincia, sin(y) * sincia];
}

// Abort if [x, y] is not within an ellipse centered at [0, 0] with
// semi-major axis pi and semi-minor axis pi/2.
aitoffRaw.invert = function(x, y) {
  if (x * x + 4 * y * y > pi * pi + epsilon) return;
  // Closed form: with alpha = hypot(x / 2, y) the angular distance from the
  // origin, cos(phi) * cos(lambda / 2) = cos(alpha), and
  // [cos(phi) * sin(lambda / 2), sin(phi)] = [x / 2, y] * sin(alpha) / alpha.
  // (The Newton iteration used before did not converge close to the outline.)
  var x2 = x / 2,
      alpha = sqrt(x2 * x2 + y * y);
  if (alpha > pi) alpha = pi;
  var k = alpha ? sin(alpha) / alpha : 1,
      c = cos(alpha),
      e = x2 * k;
  return [2 * atan2(e, c), atan2(y * k, sqrt(e * e + c * c))];
};

export default function() {
  return projection(aitoffRaw)
      .scale(152.63);
}
