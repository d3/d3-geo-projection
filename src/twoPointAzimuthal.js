import {geoProjection} from "d3-geo";
import "two-point-equidistant";

function twoPointAzimuthal(d) {
  var cosd = Math.cos(d);

  function forward(lambda, phi) {
    var coordinates = d3.geo.gnomonic.raw(lambda, phi);
    coordinates[0] *= cosd;
    return coordinates;
  }

  forward.invert = function(x, y) {
    return d3.geo.gnomonic.raw.invert(x / cosd, y);
  };

  return forward;
}

function twoPointAzimuthalProjection() {
  var points = [[0, 0], [0, 0]],
      m = geoProjectionMutator(twoPointAzimuthal),
      p = m(0),
      rotate = p.rotate;

  delete p.rotate;

  p.points = function(_) {
    if (!arguments.length) return points;
    points = _;

    var interpolate = d3.geo.interpolate(_[0], _[1]),
        origin = interpolate(0.5),
        p = d3.geo.rotation([-origin[0], -origin[1]])(_[0]),
        b = interpolate.distance * 0.5,
        γ = -asin(Math.sin(p[1] * radians) / Math.sin(b));
    if (p[0] > 0) γ = pi - γ;

    rotate.call(p, [-origin[0], -origin[1], -γ * degrees]);

    return m(b);
  };

  return p;
}

(d3.geo.twoPointAzimuthal = twoPointAzimuthalProjection).raw = twoPointAzimuthal;
