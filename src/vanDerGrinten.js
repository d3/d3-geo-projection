import {geoProjection as projection} from "d3-geo";
import {abs, acos, asin, atan, cos, halfPi, pi, sign, sin, sqrt, tan} from "./math.js";

export function vanDerGrintenRaw(lambda, phi) {
  // Only exact zeros (up to underflow) take the first two shortcuts: within
  // 1e-6 of the equator or of the central meridian they were up to 1e-6 * R
  // off.
  if (abs(phi) < 1e-40) return [lambda, 0];
  var sinTheta = abs(phi / halfPi),
      theta = asin(sinTheta);
  if (abs(lambda) < 1e-40 || abs(abs(phi) - halfPi) < 1e-10) return [0, sign(phi) * pi * tan(theta / 2)];
  var cosTheta = cos(theta);
  if (abs(lambda) <= pi) {
    // The same values as below (Snyder 1987, 29-1 and 29-2), rearranged so
    // that no step subtracts two large terms: close to the origin A, G and P
    // are all large and the direct formulas lost all the digits.
    var a = abs(pi / lambda - lambda / pi) / 2,
        a2 = a * a,
        g = cosTheta * (1 + cosTheta) / (sinTheta * (1 + cosTheta - sinTheta)),
        p = g * (2 / sinTheta - 1),
        p2 = p * p,
        g2 = g * g,
        k = sqrt(a2 * (p2 - 2 * g + 1) + p2 - g2),
        xPi = g - p2 < 0
            ? (p2 - g2) / (p * k - a * (g - p2))
            : (a * (g - p2) + p * k) / (p2 + a2),
        yPi = (a2 * (2 * g - 1) + g2) / (p * (a2 + g) + a * k);
    return [sign(lambda) * pi * xPi, sign(phi) * pi * (yPi < 0 ? 0 : yPi)];
  }
  var A = abs(pi / lambda - lambda / pi) / 2,
      A2 = A * A,
      G = cosTheta / (sinTheta + cosTheta - 1),
      P = G * (2 / sinTheta - 1),
      P2 = P * P,
      P2_A2 = P2 + A2,
      G_P2 = G - P2,
      Q = A2 + G;
  return [
    sign(lambda) * pi * (A * G_P2 + sqrt(A2 * G_P2 * G_P2 - P2_A2 * (G * G - P2))) / P2_A2,
    sign(phi) * pi * (P * Q - A * sqrt((A2 + 1) * P2_A2 - Q * Q)) / P2_A2
  ];
}

vanDerGrintenRaw.invert = function(x, y) {
  // On the equator x = lambda, on the central meridian a closed form; only
  // exact zeros take these shortcuts (within 1e-6 they were up to 1e-6 * R
  // off)
  if (!y) return [x, 0];
  if (!x) return [0, halfPi * sin(2 * atan(y / pi))];
  var x2 = (x /= pi) * x,
      y2 = (y /= pi) * y,
      x2_y2 = x2 + y2,
      z = x2_y2 * x2_y2,
      c1 = -abs(y) * (1 + x2_y2),
      c2 = c1 - 2 * y2 + x2,
      c3 = -2 * c1 + 1 + 2 * y2 + z,
      d = y2 / c3 + (2 * c2 * c2 * c2 / (c3 * c3 * c3) - 9 * c1 * c2 / (c3 * c3)) / 27,
      a1 = (c1 - c2 * c2 / (3 * c3)) / c3,
      m1 = 2 * sqrt(-a1 / 3),
      theta1 = acos(3 * d / (a1 * m1)) / 3;
  // pi * (x2_y2 - 1 + sqrt(t)) / (2 * x), with t = 1 + 2 * (x2 - y2) + z; as
  // t - (1 - x2_y2)^2 = 4 * x2, it is also 2 * pi * x / (sqrt(t) + 1 - x2_y2),
  // which avoids the cancellation close to the origin
  var sqrtT = sqrt(1 + 2 * (x2 - y2) + z);
  return [
    x2_y2 < 1 ? 2 * pi * x / (sqrtT + 1 - x2_y2) : pi * (x2_y2 - 1 + sqrtT) / (2 * x),
    sign(y) * pi * (-m1 * cos(theta1 + pi / 3) - c2 / (3 * c3))
  ];
};

export default function() {
  return projection(vanDerGrintenRaw)
      .scale(79.4183);
}
