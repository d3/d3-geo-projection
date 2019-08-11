import {geoProjection as projection} from "d3-geo";
import {hammerRaw} from "./hammer.js";
import {cos, pi, sin} from "./math.js";

// Bertin 1953 as a modified Briesemeister
// https://bl.ocks.org/Fil/5b9ee9636dfb6ffa53443c9006beb642
export function bertin1953Raw() {
  var hammer = hammerRaw(1.68, 2),
      fu = 1.4, k = 12;

  return function(lambda, phi) {

    if (lambda + phi < -fu) {
      var u = (lambda - phi + 1.6) * (lambda + phi + fu) / 8;
      lambda += u;
      phi -= 0.8 * u * sin(phi + pi / 2);
    }

    var r = hammer(lambda, phi);

    var d = (1 - cos(lambda * phi)) / k;

    if (r[1] < 0) {
      r[0] *= 1 + d;
    }
    if (r[1] > 0) {
      r[1] *= 1 + d / 1.5 * r[0] * r[0];
    }

    return r;
  };
}

export default function() {
  var p = projection(bertin1953Raw());

  p.rotate([-16.5, -42]);
  delete p.rotate;

  return p
    .scale(176.57)
    .center([7.93, 0.09]);
}
