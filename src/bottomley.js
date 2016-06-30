import {geoProjection} from "d3-geo";
import {halfPi, pi, sin, cos, sqrt, atan2} from "./math";

export function bottomleyRawPsi(psi) {
  var sinpsi = sin(psi);

  function forward(lambda, phi) {
    var rho = halfPi - phi,
        eta = rho ? lambda * sinpsi * sin(rho) / rho : rho;
    return [
      rho * sin(eta) / sinpsi,
      halfPi - rho * cos(eta)
    ];
  }

  forward.invert = function(x, y) {
    var x1 = x * sinpsi,
        y1 = halfPi - y,
        rho = sqrt(x1 * x1 + y1 * y1),
        eta = atan2(x1, y1);
    return [
      (rho ? rho / sin(rho) : 1) * eta / sinpsi,
      halfPi - rho
    ];
  };

  return forward;
}

export var bottomleyRaw = bottomleyRawPsi(pi / 6);

export default function() {
  return geoProjection(bottomleyRaw).scale(150);
}
