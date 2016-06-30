import {geoProjection} from "d3-geo";

function modifiedStereographicRaw(C) {
  var m = C.length - 1;

  function forward(lambda, phi) {
    var cosPhi = Math.cos(phi),
        k = 2 / (1 + cosPhi * Math.cos(lambda)),
        zr = k * cosPhi * Math.sin(lambda),
        zi = k * Math.sin(phi),
        i = m,
        w = C[i],
        ar = w[0],
        ai = w[1],
        t;
    while (--i >= 0) {
      w = C[i];
      ar = w[0] + zr * (t = ar) - zi * ai;
      ai = w[1] + zr * ai + zi * t;
    }
    ar = zr * (t = ar) - zi * ai;
    ai = zr * ai + zi * t;
    return [ar, ai];
  }

  forward.invert = function(x, y) {
    var i = 20,
        zr = x,
        zi = y;
    do {
      var j = m,
          w = C[j],
          ar = w[0],
          ai = w[1],
          br = 0,
          bi = 0,
          t;

      while (--j >= 0) {
        w = C[j];
        br = ar + zr * (t = br) - zi * bi;
        bi = ai + zr * bi + zi * t;
        ar = w[0] + zr * (t = ar) - zi * ai;
        ai = w[1] + zr * ai + zi * t;
      }
      br = ar + zr * (t = br) - zi * bi;
      bi = ai + zr * bi + zi * t;
      ar = zr * (t = ar) - zi * ai - x;
      ai = zr * ai + zi * t - y;

      var denominator = br * br + bi * bi, deltar, deltai;
      zr -= deltar = (ar * br + ai * bi) / denominator;
      zi -= deltai = (ai * br - ar * bi) / denominator;
    } while (Math.abs(deltar) + Math.abs(deltai) > epsilon * epsilon && --i > 0);

    if (i) {
      var rho = Math.sqrt(zr * zr + zi * zi),
          c = 2 * Math.atan(rho * 0.5),
          sinc = Math.sin(c);
      return [Math.atan2(zr * sinc, rho * Math.cos(c)), rho ? asin(zi * sinc / rho) : 0];
    }
  };

  return forward;
}

var modifiedStereographicCoefficients = {
  alaska: [
    [0.9972523, 0],
    [0.0052513, -0.0041175],
    [0.0074606, 0.0048125],
    [-0.0153783, -0.1968253],
    [0.0636871, -0.1408027],
    [0.3660976, -0.2937382]
  ],
  gs48: [[.98879, 0], [0, 0], [-0.050909, 0], [0, 0], [.075528, 0]],
  gs50: [
    [0.9842990, 0],
    [0.0211642, 0.0037608],
    [-0.1036018, -0.0575102],
    [-0.0329095, -0.0320119],
    [0.0499471, 0.1223335],
    [0.0260460, 0.0899805],
    [0.0007388, -0.1435792],
    [0.0075848, -0.1334108],
    [-0.0216473, 0.0776645],
    [-0.0225161, 0.0853673]
  ],
  miller: [[.9245, 0], [0, 0], [.01943, 0]],
  lee: [[.721316, 0], [0, 0], [-0.00881625, -0.00617325]]
};

function modifiedStereographicProjection() {
  var coefficients = modifiedStereographicCoefficients.miller,
      m = geoProjectionMutator(modifiedStereographic),
      p = m(coefficients);

  p.coefficients = function(_) {
    if (!arguments.length) return coefficients;
    return m(coefficients = typeof _ === "string" ? modifiedStereographicCoefficients[_] : _);
  };

  return p;
}

(d3.geo.modifiedStereographic = modifiedStereographicProjection).raw = modifiedStereographic;
