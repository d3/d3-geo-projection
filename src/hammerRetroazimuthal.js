import {geoProjection} from "d3-geo";

function hammerRetroazimuthalRaw(phi0) {
  var sinPhi0 = Math.sin(phi0),
      cosPhi0 = Math.cos(phi0),
      rotate = hammerRetroazimuthalRotation(phi0);
  rotate.invert = hammerRetroazimuthalRotation(-phi0);

  function forward(lambda, phi) {
    var p = rotate(lambda, phi);
    lambda = p[0], phi = p[1];
    var sinPhi = Math.sin(phi),
        cosPhi = Math.cos(phi),
        cosLambda = Math.cos(lambda),
        z = acos(sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosLambda),
        sinz = Math.sin(z),
        K = Math.abs(sinz) > epsilon ? z / sinz : 1;
    return [
      K * cosPhi0 * Math.sin(lambda),
      (Math.abs(lambda) > halfPi ? K : -K) // rotate for back hemisphere
        * (sinPhi0 * cosPhi - cosPhi0 * sinPhi * cosLambda)
    ];
  }

  forward.invert = function(x, y) {
    var rho = Math.sqrt(x * x + y * y),
        sinz = -Math.sin(rho),
        cosz = Math.cos(rho),
        a = rho * cosz,
        b = -y * sinz,
        c = rho * sinPhi0,
        d = sqrt(a * a + b * b - c * c),
        phi = Math.atan2(a * c + b * d, b * c - a * d),
        lambda = (rho > halfPi ? -1 : 1) * Math.atan2(x * sinz, rho * Math.cos(phi) * cosz + y * Math.sin(phi) * sinz);
    return rotate.invert(lambda, phi);
  };

  return forward;
}

// Latitudinal rotation by phi0.
// Temporary hack until D3 supports arbitrary small-circle clipping origins.
function hammerRetroazimuthalRotation(phi0) {
  var sinPhi0 = Math.sin(phi0),
      cosPhi0 = Math.cos(phi0);

  return function(lambda, phi) {
    var cosPhi = Math.cos(phi),
        x = Math.cos(lambda) * cosPhi,
        y = Math.sin(lambda) * cosPhi,
        z = Math.sin(phi);
    return [
      Math.atan2(y, x * cosPhi0 - z * sinPhi0),
      asin(z * cosPhi0 + x * sinPhi0)
    ];
  };
}

function hammerRetroazimuthalProjection() {
  var phi0 = 0,
      m = geoProjectionMutator(hammerRetroazimuthal),
      p = m(phi0),
      rotate_ = p.rotate,
      stream_ = p.stream,
      circle = d3.geo.circle();

  p.parallel = function(_) {
    if (!arguments.length) return phi0 / pi * 180;
    var r = p.rotate();
    return m(phi0 = _ * pi / 180).rotate(r);
  };

  // Temporary hack; see hammerRetroazimuthalRotation.
  p.rotate = function(_) {
    if (!arguments.length) return (_ = rotate_.call(p), _[1] += phi0 / pi * 180, _);
    rotate_.call(p, [_[0], _[1] - phi0 / pi * 180]);
    circle.origin([-_[0], -_[1]]);
    return p;
  };

  p.stream = function(stream) {
    stream = stream_(stream);
    stream.sphere = function() {
      stream.polygonStart();
      var epsilon = 1e-2,
          ring = circle.angle(90 - epsilon)().coordinates[0],
          n = ring.length - 1,
          i = -1,
          p;
      stream.lineStart();
      while (++i < n) stream.point((p = ring[i])[0], p[1]);
      stream.lineEnd();
      ring = circle.angle(90 + epsilon)().coordinates[0];
      n = ring.length - 1;
      stream.lineStart();
      while (--i >= 0) stream.point((p = ring[i])[0], p[1]);
      stream.lineEnd();
      stream.polygonEnd();
    };
    return stream;
  };

  return p;
}

(d3.geo.hammerRetroazimuthal = hammerRetroazimuthalProjection).raw = hammerRetroazimuthal;
