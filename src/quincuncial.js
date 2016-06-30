import {geoProjection} from "d3-geo";

function quincuncialProjectionRaw(projectHemisphere) {
  var dx = projectHemisphere(halfPi, 0)[0] - projectHemisphere(-halfPi, 0)[0];

  function projection() {
    var quincuncial = false,
        m = geoProjectionMutator(projectAt),
        p = m(quincuncial);

    p.quincuncial = function(_) {
      if (!arguments.length) return quincuncial;
      return m(quincuncial = !!_);
    };

    return p;
  }

  function projectAt(quincuncial) {
    var forward = quincuncial ? function(lambda, phi) {
      var t = Math.abs(lambda) < halfPi,
          p = projectHemisphere(t ? lambda : lambda > 0 ? lambda - pi : lambda + pi, phi);

      var x = (p[0] - p[1]) * Math.SQRT1_2,
          y = (p[0] + p[1]) * Math.SQRT1_2;

      if (t) return [x, y];

      var d = dx * Math.SQRT1_2,
          s = x > 0 ^ y > 0 ? -1 : 1;

      return [s * x - sign(y) * d, s * y - sign(x) * d];
    } : function(lambda, phi) {
      var s = lambda > 0 ? -0.5 :0.5,
          point = projectHemisphere(lambda + s * pi, phi);
      point[0] -= s * dx;
      return point;
    };

    if (projectHemisphere.invert) forward.invert = quincuncial ? function(x0, y0) {
      var x = (x0 + y0) * Math.SQRT1_2,
          y = (y0 - x0) * Math.SQRT1_2,
          t = Math.abs(x) <0.5 * dx && Math.abs(y) <0.5 * dx;

      if (!t) {
        var d = dx * Math.SQRT1_2,
            s = x > 0 ^ y > 0 ? -1 : 1,
            x1 = -s * (x0 + (y > 0 ? 1 : -1) * d),
            y1 = -s * (y0 + (x > 0 ? 1 : -1) * d);
        x = (-x1 - y1) * Math.SQRT1_2;
        y = (x1 - y1) * Math.SQRT1_2;
      }

      var p = projectHemisphere.invert(x, y);
      if (!t) p[0] += x > 0 ? pi : -pi;
      return p;
    } : function(x, y) {
      var s = x > 0 ? -0.5 : 0.5,
          location = projectHemisphere.invert(x + s * dx, y),
          lambda = location[0] - s * pi;
      if (lambda < -pi) lambda += 2 * pi;
      else if (lambda > pi) lambda -= 2 * pi;
      location[0] = lambda;
      return location;
    };

    return forward;
  }

  projection.raw = projectAt;

  return projection;
}
