import {geoProjection as projection} from "d3-geo";
import {abs, asin, cos, epsilon, halfPi, pi, sin, sqrt} from "./math.js";

var cx = 2 / sqrt(pi * (4 + pi)),
    cy = 2 * sqrt(pi / (4 + pi)),
    cp = 2 + halfPi;

// t - sin(2t) / 2 + 2 * (1 - cos(t)), with theta = pi / 2 - t; the first two
// terms as (s - sin(s)) / 2 with s = 2t, to keep the digits for small t.
function polarD(t) {
  var s = 2 * t, h = sin(t / 2), d;
  if (abs(s) < 0.25) {
    var s2 = s * s;
    d = s * s2 * (1 / 6 - s2 * (1 / 120 - s2 * (1 / 5040 - s2 * (1 / 362880
        - s2 * (1 / 39916800 - s2 / 6227020800)))));
  } else {
    d = s - sin(s);
  }
  return d / 2 + 4 * h * h;
}

export function eckert4Raw(lambda, phi) {
  if (abs(phi) > halfPi - 0.1) {
    // Close to the poles the Newton iteration below converges only linearly.
    // With theta = pi / 2 - t and chi the colatitude, solve
    // t - sin(2t) / 2 + 2 * (1 - cos(t)) = 2 * cp * sin(chi / 2)^2.
    var h = sin((halfPi - abs(phi)) / 2),
        w = 2 * cp * h * h,
        t = sqrt(w), // >= the root, as the left side is >= t^2
        j = 30, st, d, dt;
    do {
      st = sin(t);
      d = 2 * st * (1 + st);
      if (!d) break;
      t -= dt = (polarD(t) - w) / d;
    } while (abs(dt) > 1e-12 * t && --j > 0);
    // cos(theta) = sin(t), sin(theta) = cos(t)
    return [cx * lambda * (1 + sin(t)), (phi < 0 ? -cy : cy) * cos(t)];
  }
  var k = cp * sin(phi);
  phi /= 2;
  for (var i = 0, delta = Infinity; i < 10 && abs(delta) > epsilon; i++) {
    var cosPhi = cos(phi);
    phi -= delta = (phi + sin(phi) * (cosPhi + 2) - k) / (2 * cosPhi * (1 + cosPhi));
  }
  return [
    cx * lambda * (1 + cos(phi)),
    cy * sin(phi)
  ];
}

eckert4Raw.invert = function(x, y) {
  if (abs(y) > cy / 2 && abs(y) <= cy) {
    // Close to the poles: theta = pi / 2 - t, and the colatitude chi from
    // 2 * cp * sin(chi / 2)^2 = t - sin(2t) / 2 + 2 * (1 - cos(t)), instead of
    // asin() of a value close to 1
    var t = 2 * asin(sqrt((cy - abs(y)) / (2 * cy))),
        chi = 2 * asin(sqrt(polarD(t) / (2 * cp)));
    return [x / (cx * (1 + sin(t))), y < 0 ? chi - halfPi : halfPi - chi];
  }
  var A = y / cy,
      k = asin(A),
      c = cos(k);
  return [
    x / (cx * (1 + c)),
    asin((k + A * (c + 2)) / cp)
  ];
};

export default function() {
  return projection(eckert4Raw)
      .scale(180.739);
}
