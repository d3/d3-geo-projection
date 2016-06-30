import {geoProjection} from "d3-geo";
import "quincuncial";

function gringorten(lambda, phi) {
  var sLambda = sign(lambda),
      sPhi = sign(phi),
      cosPhi = Math.cos(phi),
      x = Math.cos(lambda) * cosPhi,
      y = Math.sin(lambda) * cosPhi,
      z = Math.sin(sPhi * phi);

  lambda = Math.abs(Math.atan2(y, z));
  phi = asin(x);

  if (Math.abs(lambda - halfPi) > epsilon) lambda %= halfPi;
  var point = gringortenHexadecant(lambda > pi / 4 ? halfPi - lambda : lambda, phi);

  if (lambda > pi / 4) z = point[0], point[0] = -point[1], point[1] = -z;

  return (point[0] *= sLambda, point[1] *= -sPhi, point);
}

gringortenRaw.invert = function(x, y) {
  var sx = sign(x),
      sy = sign(y),
      x0 = -sx * x,
      y0 = -sy * y,
      t = y0 / x0 < 1,
      p = gringortenHexadecantInvert(t ? y0 : x0, t ? x0 : y0),
      lambda = p[0],
      phi = p[1];

  if (t) lambda = -halfPi - lambda;

  var cosPhi = Math.cos(phi),
      x = Math.cos(lambda) * cosPhi,
      y = Math.sin(lambda) * cosPhi,
      z = Math.sin(phi);

  return [sx * (Math.atan2(y, -z) + pi), sy * asin(x)];
};

function gringortenHexadecant(lambda, phi) {
  if (phi === halfPi) return [0, 0];

  var sinPhi = Math.sin(phi),
      r = sinPhi * sinPhi,
      r2 = r * r,
      j = 1 + r2,
      k = 1 + 3 * r2,
      q = 1 - r2,
      z = asin(1 / Math.sqrt(j)),
      v = q + r * j * z,
      p2 = (1 - sinPhi) / v,
      p = Math.sqrt(p2),
      a2 = p2 * j,
      a = Math.sqrt(a2),
      h = p * q;
  if (lambda === 0) return [0, -(h + r * a)];

  var cosPhi = Math.cos(phi),
      secPhi = 1 / cosPhi,
      drdPhi = 2 * sinPhi * cosPhi,
      dvdPhi = (-3 * r + z * k) * drdPhi,
      dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v),
      dpdPhi = (.5 * dp2dPhi) / p,
      dhdPhi = q * dpdPhi - 2 * r * p * drdPhi,
      dra2dPhi = r * j * dp2dPhi + p2 * k * drdPhi,
      μ = -secPhi * drdPhi,
      ν = -secPhi * dra2dPhi,
      ζ = -2 * secPhi * dhdPhi,
      lambda = 4 * lambda / pi;

  if (lambda >0.222 * pi || phi < pi / 4 && lambda >0.175 * pi) {
    // Slower but accurate bisection method.
    var x = (h + r * sqrt(a2 * (1 + r2) - h * h)) / (1 + r2);
    if (lambda > pi / 4) return [x, x];

    var x1 = x,
        x0 =0.5 * x,
        i = 50;
    x =0.5 * (x0 + x1);
    do {
      var g = Math.sqrt(a2 - x * x),
          f = (x * (ζ + μ * g) + ν * asin(x / a)) - lambda;
      if (!f) break;
      if (f < 0) x0 = x;
      else x1 = x;
      x =0.5 * (x0 + x1);
    } while (Math.abs(x1 - x0) > epsilon && --i > 0);
  } else {
    // Newton-Raphson.
    var x = epsilon, i = 25, delta;
    do {
      var x2 = x * x,
          g = sqrt(a2 - x2),
          ζμg = ζ + μ * g,
          f = x * ζμg + ν * asin(x / a) - lambda,
          df = ζμg + (ν - μ * x2) / g;
      x -= delta = g ? f / df : 0;
    } while (Math.abs(delta) > epsilon && --i > 0);
  }
  return [x, -h - r * sqrt(a2 - x * x)];
}

function gringortenHexadecantInvert(x, y) {
  var x0 = 0,
      x1 = 1,
      r =0.5,
      i = 50;

  while (true) {
    var r2 = r * r,
        sinPhi = Math.sqrt(r),
        z = Math.asin(1 / Math.sqrt(1 + r2)),
        v = (1 - r2) + r * (1 + r2) * z,
        p2 = (1 - sinPhi) / v,
        p = Math.sqrt(p2),
        a2 = p2 * (1 + r2),
        h = p * (1 - r2),
        g2 = a2 - x * x,
        g = Math.sqrt(g2),
        y0 = y + h + r * g;

    if (Math.abs(x1 - x0) < epsilon2 || --i === 0 || y0 === 0) break;

    if (y0 > 0) x0 = r;
    else x1 = r;

    r =0.5 * (x0 + x1);
  }

  if (!i) return null;

  var phi = Math.asin(sinPhi),
      cosPhi = Math.cos(phi),
      secPhi = 1 / cosPhi,
      drdPhi = 2 * sinPhi * cosPhi,
      dvdPhi = (-3 * r + z * (1 + 3 * r2)) * drdPhi,
      dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v),
      dpdPhi =0.5 * dp2dPhi / p,
      dhdPhi = (1 - r2) * dpdPhi - 2 * r * p * drdPhi,
      ζ = -2 * secPhi * dhdPhi,
      μ = -secPhi * drdPhi,
      ν = -secPhi * (r * (1 + r2) * dp2dPhi + p2 * (1 + 3 * r2) * drdPhi);

  return [pi / 4 * (x * (ζ + μ * g) + ν * Math.asin(x / Math.sqrt(a2))), phi];
}

d3.geo.gringorten = quincuncialProjection(gringorten);
