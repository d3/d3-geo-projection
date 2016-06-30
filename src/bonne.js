import parallel1Projection from "./parallel1";
import {atan2, cos, sin, sqrt, tan} from "./math";
import {sinusoidalRaw} from "./sinusoidal";

export function bonneRaw(phi0) {
  if (!phi0) return sinusoidalRaw;
  var cotPhi0 = 1 / tan(phi0);

  function forward(lambda, phi) {
    var rho = cotPhi0 + phi0 - phi,
        e = rho ? lambda * cos(phi) / rho : rho;
    return [rho * sin(e), cotPhi0 - rho * cos(e)];
  }

  forward.invert = function(x, y) {
    var rho = sqrt(x * x + (y = cotPhi0 - y) * y),
        phi = cotPhi0 + phi0 - rho;
    return [rho / cos(phi) * atan2(x, y), phi];
  };

  return forward;
}

export default function() {
  return parallel1Projection(bonneRaw)
      .scale(120)
      .translate([450, 305])
      .parallel(45);
}
