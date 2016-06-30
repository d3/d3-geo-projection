import {geoProjection} from "d3-geo";
import "parallel1";

function loximuthal(phi0) {
  var cosPhi0 = Math.cos(phi0),
      tanPhi0 = Math.tan(pi / 4 + phi0 / 2);

  function forward(lambda, phi) {
    var y = phi - phi0,
        x = Math.abs(y) < epsilon ? lambda * cosPhi0
        : Math.abs(x = pi / 4 + phi / 2) < epsilon || Math.abs(Math.abs(x) - halfPi) < epsilon
        ? 0 : lambda * y / Math.log(Math.tan(x) / tanPhi0);
    return [x, y];
  }

  forward.invert = function(x, y) {
    var lambda,
        phi = y + phi0;
    return [
      Math.abs(y) < epsilon ? x / cosPhi0
        : (Math.abs(lambda = pi / 4 + phi / 2) < epsilon || Math.abs(Math.abs(lambda) - halfPi) < epsilon) ? 0
        : x * Math.log(Math.tan(lambda) / tanPhi0) / y,
      phi
    ];
  };

  return forward;
}

(d3.geo.loximuthal = function() { return parallel1Projection(loximuthal).parallel(40); }).raw = loximuthal;
