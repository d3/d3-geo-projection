import {geoProjectionMutator} from "d3-geo";
import {degrees, pi, radians} from "./math";

export default function(projectAt) {
  var phi0 = 0,
      phi1 = pi / 3,
      m = geoProjectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    if (!arguments.length) return [phi0 * degrees, phi1 * degrees];
    return m(phi0 = _[0] * radians, phi1 = _[1] * radians);
  };

  return p;
}
