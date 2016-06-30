import {geoProjection} from "d3-geo";

// TODO clip to ellipse

function twoPointEquidistant(z0) {
  if (!z0) return d3.geo.azimuthalEquidistant.raw;
  var lambdaa = -z0 / 2,
      lambdab = -lambdaa,
      z02 = z0 * z0,
      tanLambda0 = Math.tan(lambdab),
      S = 0.5 / Math.sin(lambdab);

  function forward(lambda, phi) {
    var za = acos(Math.cos(phi) * Math.cos(lambda - lambdaa)),
        zb = acos(Math.cos(phi) * Math.cos(lambda - lambdab)),
        ys = phi < 0 ? -1 : 1;
    za *= za, zb *= zb;
    return [
      (za - zb) / (2 * z0),
      ys * sqrt(4 * z02 * zb - (z02 - za + zb) * (z02 - za + zb)) / (2 * z0)
    ];
  }

  forward.invert = function(x, y) {
    var y2 = y * y,
        cosza = Math.cos(Math.sqrt(y2 + (t = x + lambdaa) * t)),
        coszb = Math.cos(Math.sqrt(y2 + (t = x + lambdab) * t)),
        t,
        d;
    return [
      Math.atan2(d = cosza - coszb, t = (cosza + coszb) * tanLambda0),
      (y < 0 ? -1 : 1) * acos(Math.sqrt(t * t + d * d) * S)
    ];
  };

  return forward;
}

function twoPointEquidistantProjection() {
  var points = [[0, 0], [0, 0]],
      m = geoProjectionMutator(twoPointEquidistant),
      p = m(0),
      rotate = p.rotate;

  delete p.rotate;

  p.points = function(_) {
    if (!arguments.length) return points;
    points = _;

    // Compute the origin as the midpoint of the two reference points.
    // Rotate one of the reference points by the origin.
    // Apply the spherical law of sines to compute γ rotation.
    var interpolate = d3.geo.interpolate(_[0], _[1]),
        origin = interpolate(0.5),
        p = d3.geo.rotation([-origin[0], -origin[1]])(_[0]),
        b = interpolate.distance * 0.5,
        γ = -asin(Math.sin(p[1] * radians) / Math.sin(b));
    if (p[0] > 0) γ = pi - γ;

    rotate.call(p, [-origin[0], -origin[1], -γ * degrees]);

    return m(b * 2);
  };

  return p;
}

(d3.geo.twoPointEquidistant = twoPointEquidistantProjection).raw = twoPointEquidistant;
