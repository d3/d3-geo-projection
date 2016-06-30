import {geoProjection} from "d3-geo";

function satelliteVerticalRaw(P) {
  function forward(lambda, phi) {
    var cosPhi = Math.cos(phi),
        k = (P - 1) / (P - cosPhi * Math.cos(lambda));
    return [
      k * cosPhi * Math.sin(lambda),
      k * Math.sin(phi)
    ];
  }

  forward.invert = function(x, y) {
    var rho2 = x * x + y * y,
        rho = Math.sqrt(rho2),
        sinc = (P - Math.sqrt(1 - rho2 * (P + 1) / (P - 1))) / ((P - 1) / rho + rho / (P - 1));
    return [
      Math.atan2(x * sinc, rho * Math.sqrt(1 - sinc * sinc)),
      rho ? asin(y * sinc / rho) : 0
    ];
  };

  return forward;
}

function satellite(P, ω) {
  var vertical = satelliteVertical(P);
  if (!ω) return vertical;
  var cosω = Math.cos(ω),
      sinω = Math.sin(ω);

  function forward(lambda, phi) {
    var coordinates = vertical(lambda, phi),
        y = coordinates[1],
        A = y * sinω / (P - 1) + cosω;
    return [
      coordinates[0] * cosω / A,
      y / A
    ];
  }

  forward.invert = function(x, y) {
    var k = (P - 1) / (P - 1 - y * sinω);
    return vertical.invert(k * x, k * y * cosω);
  };

  return forward;
}

function satelliteProjection() {
  var P = 1.4,
      ω = 0,
      m = geoProjectionMutator(satellite),
      p = m(P, ω);

  // As a multiple of radius.
  p.distance = function(_) {
    if (!arguments.length) return P;
    return m(P = +_, ω);
  };

  p.tilt = function(_) {
    if (!arguments.length) return ω * 180 / pi;
    return m(P, ω = _ * pi / 180);
  };

  return p;
}

(d3.geo.satellite = satelliteProjection).raw = satellite;
