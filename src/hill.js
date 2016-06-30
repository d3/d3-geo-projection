import {geoProjection} from "d3-geo";

function hillRaw(K) {
  var L = 1 + K,
      sinβ = Math.sin(1 / L),
      β = asin(sinβ),
      A = 2 * Math.sqrt(pi / (B = pi + 4 * β * L)),
      B,
      rho0 = 0.5 * A * (L + Math.sqrt(K * (2 + K))),
      K2 = K * K,
      L2 = L * L;

  function forward(lambda, phi) {
    var t = 1 - Math.sin(phi),
        rho,
        omega;
    if (t && t < 2) {
      var theta = halfPi - phi, i = 25, delta;
      do {
        var sinTheta = Math.sin(theta),
            cosTheta = Math.cos(theta),
            β_β1 = β + Math.atan2(sinTheta, L - cosTheta),
            C = 1 + L2 - 2 * L * cosTheta;
        theta -= delta = (theta - K2 * β - L * sinTheta + C * β_β1 -0.5 * t * B) / (2 * L * sinTheta * β_β1);
      } while (Math.abs(delta) > epsilon2 && --i > 0);
      rho = A * Math.sqrt(C);
      omega = lambda * β_β1 / pi;
    } else {
      rho = A * (K + t);
      omega = lambda * β / pi;
    }
    return [
      rho * Math.sin(omega),
      rho0 - rho * Math.cos(omega)
    ];
  };

  forward.invert = function(x, y) {
    var rho2 = x * x + (y -= rho0) * y,
        cosTheta = (1 + L2 - rho2 / (A * A)) / (2 * L),
        theta = acos(cosTheta),
        sinTheta = Math.sin(theta),
        β_β1 = β + Math.atan2(sinTheta, L - cosTheta);
    return [
      asin(x / Math.sqrt(rho2)) * pi / β_β1,
      asin(1 - 2 * (theta - K2 * β - L * sinTheta + (1 + L2 - 2 * L * cosTheta) * β_β1) / B)
    ];
  };

  return forward;
}

function hillProjection() {
  var K = 1,
      m = geoProjectionMutator(hill),
      p = m(K);

  p.ratio = function(_) {
    if (!arguments.length) return K;
    return m(K = +_);
  };

  return p;
}

(d3.geo.hill = hillProjection).raw = hill;
