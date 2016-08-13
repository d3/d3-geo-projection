import {geoProjectionMutator as projectionMutator} from "d3-geo";
import {asin, pi, sin, sqrt, sqrtPi} from "./math";

export function collignonRaw(beta) {
  function forward (lambda, phi) {
    var alpha = sqrt(1 - sin(phi));
    return [beta * (2 / sqrtPi) * lambda * alpha, sqrtPi * (1 - alpha)];
  };
  forward.invert = function(x, y) {
    x /= beta;
    var lambda = (lambda = y / sqrtPi - 1) * lambda;
    return [lambda > 0 ? x * sqrt(pi / lambda) / 2 : 0, asin(1 - lambda)];
  };
  return forward;
}


export default function() {
  var beta = 1,
      m = projectionMutator(collignonRaw),
      p = m(beta);

  p.distort = function(_) {
    return arguments.length ? m(beta = _) : beta;
  };

  return p
      .scale(95.6464)
      .center([0, 30]);
}
