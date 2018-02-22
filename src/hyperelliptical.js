import {geoProjectionMutator as projectionMutator} from "d3-geo";
import {abs, asin, pow, sign, sin} from "./math";
import {integrate} from "./integrate";

export function hyperellipticalRaw(alpha, k, affine) {

  function elliptic (f) {
    return alpha + (1 - alpha) * pow(1 - pow(f, k), 1 / k);
  }

  function z(f) {
    return integrate(elliptic, 0, f, 1e-4);
  }

  var gamma = z(1),
      n = 1000,
      m = (1 + 1e-8) / gamma,
      approx = [];
  for (var i = 0; i <= n; i++)
      approx.push(z(i / n) * m);

  function Y(sinphi) {
    var r = 0;
    for (r = 0; r < n; r++) if (approx[r] > sinphi) break;
    if (r === 0 || approx[r] === approx[r - 1]) return r / n;
    return (r + (sinphi - approx[r]) / (approx[r] - approx[r - 1])) / n;
  }

  var forward = function(lambda, phi) {
    var y = Y(abs(sin(phi))),
        x = elliptic(y) * lambda;
    y /= affine;
    return [ affine * x, (phi >= 0) ? y : -y ];
  };

  forward.invert = function(x, y) {
    var phi;
    y *= affine;
    if (abs(y) < 1) phi = sign(y) * asin(z(abs(y)) / gamma);
    return [ x / elliptic(abs(y)) / affine, phi ];
  };
    
  return forward;
}

export default function() {
  var alpha = 0,
      k = 2.5,
      affine = 0.8679, // gamma = 1.183136, affine = sqrt(2 * gamma / pi)
      m = projectionMutator(hyperellipticalRaw),
      p = m(alpha, k, affine);

  p.alpha = function(_) {
    return arguments.length ? m(alpha = +_, k, affine) : alpha;
  };

  p.k = function(_) {
    return arguments.length ? m(alpha, k = +_, affine) : k;
  };

  p.affine = function(_) {
    return arguments.length ? m(alpha, k, affine = +_) : affine;
  };

  return p
      .scale(175.861);
}
