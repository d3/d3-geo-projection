import {geoGnomonicRaw as gnomonicRaw, geoInterpolate as interpolate, geoProjectionMutator as projectionMutator, geoRotation as rotation} from "d3-geo";
import {asin, cos, degrees, pi, sin, radians} from "./math";

export function twoPointAzimuthalRaw(d) {
  var cosd = cos(d);

  function forward(lambda, phi) {
    var coordinates = gnomonicRaw(lambda, phi);
    coordinates[0] *= cosd;
    return coordinates;
  }

  forward.invert = function(x, y) {
    return gnomonicRaw.invert(x / cosd, y);
  };

  return forward;
}

export default function() {
  var x0, y0, x1, y1,
      m = projectionMutator(twoPointAzimuthalRaw),
      p = m(0),
      r,
      center = p.center,
      rotate = p.rotate;

  delete p.rotate;

  p.points = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    var i = interpolate([x0 = +_[0][0], y0 = +_[0][1]], [x1 = +_[1][0], y1 = +_[1][1]]),
        o = i(0.5),
        p = rotation([-o[0], -o[1]])(_[0]),
        b = i.distance / 2,
        gamma = -asin(sin(p[1] * radians) / sin(b));
    if (p[0] > 0) gamma = pi - gamma;
    rotate.call(p, [-o[0], -o[1], -gamma * degrees]);
    r = rotation([-o[0], -o[1], -gamma * degrees]);
    return m(b);
  };

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .points([[-158, 21.5], [-77, 39]]) // Honolulu, HI and Washington, DC
      .clipAngle(60)
      .scale(400);
}
