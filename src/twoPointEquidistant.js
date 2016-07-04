import {geoAzimuthalEquidistantRaw as azimuthalEquidistantRaw, geoInterpolate as interpolate, geoProjectionMutator as projectionMutator, geoRotation as rotation} from "d3-geo";
import {acos, asin, atan2, cos, degrees, pi, radians, sin, sqrt, tan} from "./math";

// TODO clip to ellipse
export function twoPointEquidistantRaw(z0) {
  if (!z0) return azimuthalEquidistantRaw;
  var lambdaa = -z0 / 2,
      lambdab = -lambdaa,
      z02 = z0 * z0,
      tanLambda0 = tan(lambdab),
      S = 0.5 / sin(lambdab);

  function forward(lambda, phi) {
    var za = acos(cos(phi) * cos(lambda - lambdaa)),
        zb = acos(cos(phi) * cos(lambda - lambdab)),
        ys = phi < 0 ? -1 : 1;
    za *= za, zb *= zb;
    return [
      (za - zb) / (2 * z0),
      ys * sqrt(4 * z02 * zb - (z02 - za + zb) * (z02 - za + zb)) / (2 * z0)
    ];
  }

  forward.invert = function(x, y) {
    var y2 = y * y,
        cosza = cos(sqrt(y2 + (t = x + lambdaa) * t)),
        coszb = cos(sqrt(y2 + (t = x + lambdab) * t)),
        t,
        d;
    return [
      atan2(d = cosza - coszb, t = (cosza + coszb) * tanLambda0),
      (y < 0 ? -1 : 1) * acos(sqrt(t * t + d * d) * S)
    ];
  };

  return forward;
}

export default function() {
  var x0, y0, x1, y1,
      m = projectionMutator(twoPointEquidistantRaw),
      p = m(0),
      r,
      rotate = p.rotate,
      center = p.center;

  delete p.rotate;

  // Compute the origin as the midpoint of the two reference points.
  // Rotate one of the reference points by the origin.
  // Apply the spherical law of sines to compute gamma rotation.
  p.points = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    var i = interpolate([x0 = +_[0][0], y0 = +_[0][1]], [x1 = +_[1][0], y1 = +_[1][1]]),
        o = i(0.5),
        p = rotation([-o[0], -o[1]])(_[0]),
        b = i.distance * 0.5,
        gamma = -asin(sin(p[1] * radians) / sin(b));
    if (p[0] > 0) gamma = pi - gamma;
    rotate.call(p, [-o[0], -o[1], -gamma * degrees]);
    r = rotation([-o[0], -o[1], -gamma * degrees]);
    return m(b * 2);
  };

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .points([[-158, 21.5], [-77, 39]]) // Honolulu, HI and Washington, DC
      .clipAngle(130)
      .scale(122.571)
      .center([-121.884, 37.4049]);
}
