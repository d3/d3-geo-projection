import {geoProjection as projection} from "d3-geo";
import {abs, asin, cos, epsilon, halfPi, pi, sin, sqrt, sqrt2} from "./math.js";

// s - sin(s), accurate also for small |s|, where the subtraction would lose most
// of the digits.
function sMinusSinS(s) {
  if (abs(s) < 0.25) {
    var s2 = s * s;
    return s * s2 * (1 / 6 - s2 * (1 / 120 - s2 * (1 / 5040 - s2 * (1 / 362880
        - s2 * (1 / 39916800 - s2 / 6227020800)))));
  }
  return s - sin(s);
}

// Close to the poles, where the Newton iteration on theta converges only
// linearly: with 2 * theta = pi - s and chi the colatitude,
// 2 * theta + sin(2 * theta) = pi * sin(phi) becomes
// s - sin(s) = 2 * pi * sin(chi / 2)^2. Returns s.
function mollweidePolarS(chi) {
  var sh = sin(chi / 2),
      w = 2 * pi * sh * sh,
      s = Math.cbrt(6 * w), // <= the root, as s - sin(s) <= s^3 / 6
      i = 20, d, ds;
  do {
    d = sin(s / 2);
    d = 2 * d * d; // 1 - cos(s)
    if (!d) break;
    s -= ds = (sMinusSinS(s) - w) / d;
  } while (abs(ds) > 1e-12 * s && --i > 0);
  return s;
}

export function mollweideBromleyTheta(cp, phi) {
  if (cp === pi && abs(phi) > halfPi - 0.5) {
    var theta = (pi - mollweidePolarS(halfPi - abs(phi))) / 2;
    return phi < 0 ? -theta : theta;
  }
  var cpsinPhi = cp * sin(phi), i = 30, delta;
  do phi -= delta = (phi + sin(phi) - cpsinPhi) / (1 + cos(phi));
  while (abs(delta) > epsilon && --i > 0);
  return phi / 2;
}

export function mollweideBromleyRaw(cx, cy, cp) {

  function forward(lambda, phi) {
    if (cp === pi && abs(phi) > halfPi - 0.5) {
      // cos(theta) = sin(s / 2) and sin(theta) = cos(s / 2), with s as in
      // mollweidePolarS
      var s = mollweidePolarS(halfPi - abs(phi));
      return [cx * lambda * sin(s / 2), (phi < 0 ? -cy : cy) * cos(s / 2)];
    }
    return [cx * lambda * cos(phi = mollweideBromleyTheta(cp, phi)), cy * sin(phi)];
  }

  forward.invert = function(x, y) {
    if (cp === pi && abs(y) > cy / 2 && abs(y) <= cy) {
      // Close to the poles: cos(s / 2) = |y| / cy, and the colatitude chi from
      // 2 * sin(chi / 2)^2 = (s - sin(s)) / pi, instead of asin() of a value
      // close to 1
      var halfS = 2 * asin(sqrt((cy - abs(y)) / (2 * cy))),
          chi = 2 * asin(sqrt(sMinusSinS(2 * halfS) / (2 * pi))),
          d = cx * sin(halfS);
      return [d ? x / d : 0, y < 0 ? chi - halfPi : halfPi - chi];
    }
    return y = asin(y / cy), [x / (cx * cos(y)), asin((2 * y + sin(2 * y)) / cp)];
  };

  return forward;
}

export var mollweideRaw = mollweideBromleyRaw(sqrt2 / halfPi, sqrt2, pi);

export default function() {
  return projection(mollweideRaw)
      .scale(169.529);
}
