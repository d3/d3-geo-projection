import {geoProjection} from "d3-geo";

function lagrangeRaw(n) {
  function forward(lambda, phi) {
    if (Math.abs(Math.abs(phi) - halfPi) < epsilon) return [0, phi < 0 ? -2 : 2];
    var sinPhi = Math.sin(phi),
        v = Math.pow((1 + sinPhi) / (1 - sinPhi), n / 2),
        c = 0.5 * (v + 1 / v) + Math.cos(lambda *= n);
    return [
      2 * Math.sin(lambda) / c,
      (v - 1 / v) / c
    ];
  }

  forward.invert = function(x, y) {
    var y0 = Math.abs(y);
    if (Math.abs(y0 - 2) < epsilon) return x ? null : [0, sign(y) * halfPi];
    if (y0 > 2) return null;

    x /= 2, y /= 2;
    var x2 = x * x,
        y2 = y * y,
        t = 2 * y / (1 + x2 + y2); // tanh(nPhi)
    t = Math.pow((1 + t) / (1 - t), 1 / n);
    return [
      Math.atan2(2 * x, 1 - x2 - y2) / n,
      asin((t - 1) / (t + 1))
    ];
  };

  return forward;
}

function lagrangeProjection() {
  var n = 0.5,
      m = geoProjectionMutator(lagrange),
      p = m(n);

  p.spacing = function(_) {
    if (!arguments.length) return n;
    return m(n = +_);
  };

  return p;
}

(d3.geo.lagrange = lagrangeProjection).raw = lagrange;
