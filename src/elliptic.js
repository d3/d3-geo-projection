import {abs, atan, cos, cosh, epsilon, exp, halfPi, log, pi, pow, sign, sin, sinh, sqrt, tan, tanh} from "./math";

// Returns [sn, cn, dn](u + iv|m).
export function ellipticJi(u, v, m) {
  if (!u) {
    var b = ellipticJ(v, 1 - m);
    return [
      [0, b[0] / b[1]],
      [1 / b[1], 0],
      [b[2] / b[1], 0]
    ];
  }
  var a = ellipticJ(u, m);
  if (!v) return [[a[0], 0], [a[1], 0], [a[2], 0]];
  var b = ellipticJ(v, 1 - m),
      denominator = b[1] * b[1] + m * a[0] * a[0] * b[0] * b[0];
  return [
    [a[0] * b[2] / denominator, a[1] * a[2] * b[0] * b[1] / denominator],
    [a[1] * b[1] / denominator, -a[0] * a[2] * b[0] * b[2] / denominator],
    [a[2] * b[1] * b[2] / denominator, -m * a[0] * a[1] * b[0] / denominator]
  ];
}

// Returns [sn, cn, dn, ph](u|m).
export function ellipticJ(u, m) {
  var ai, b, phi, t, twon;
  if (m < epsilon) {
    t = sin(u);
    b = cos(u);
    ai = .25 * m * (u - t * b);
    return [
      t - ai * b,
      b + ai * t,
      1 - .5 * m * t * t,
      u - ai
    ];
  }
  if (m >= 1 - epsilon) {
    ai = .25 * (1 - m);
    b = cosh(u);
    t = tanh(u);
    phi = 1 / b;
    twon = b * sinh(u);
    return [
      t + ai * (twon - u) / (b * b),
      phi - ai * t * phi * (twon - u),
      phi + ai * t * phi * (twon + u),
      2 * atan(exp(u)) - halfPi + ai * (twon - u) / b
    ];
  }

  var a = [1, 0, 0, 0, 0, 0, 0, 0, 0],
      c = [sqrt(m), 0, 0, 0, 0, 0, 0, 0, 0],
      i = 0;
  b = sqrt(1 - m);
  twon = 1;

  while (abs(c[i] / a[i]) > epsilon && i < 8) {
    ai = a[i++];
    c[i] = .5 * (ai - b);
    a[i] = .5 * (ai + b);
    b = sqrt(ai * b);
    twon *= 2;
  }

  phi = twon * a[i] * u;
  do {
    t = c[i] * sin(b = phi) / a[i];
    phi = .5 * (asin(t) + phi);
  } while (--i);

  return [sin(phi), t = cos(phi), t / cos(phi - b), phi];
}

// Calculate F(phi+iPsi|m).
// See Abramowitz and Stegun, 17.4.11.
export function ellipticFi(phi, psi, m) {
  var r = abs(phi),
      i = abs(psi),
      sinhPsi = sinh(i);
  if (r) {
    var cscPhi = 1 / sin(r),
        cotPhi2 = 1 / (tan(r) * tan(r)),
        b = -(cotPhi2 + m * (sinhPsi * sinhPsi * cscPhi * cscPhi) - 1 + m),
        c = (m - 1) * cotPhi2,
        cotλ2 = .5 * (-b + sqrt(b * b - 4 * c));
    return [
      ellipticF(atan(1 / sqrt(cotλ2)), m) * sign(phi),
      ellipticF(atan(sqrt((cotλ2 / cotPhi2 - 1) / m)), 1 - m) * sign(psi)
    ];
  }
  return [
    0,
    ellipticF(atan(sinhPsi), 1 - m) * sign(psi)
  ];
}

// Calculate F(phi|m) where m = k² = sin²α.
// See Abramowitz and Stegun, 17.6.7.
export function ellipticF(phi, m) {
  if (!m) return phi;
  if (m === 1) return log(tan(phi / 2 + pi / 4));
  var a = 1,
      b = sqrt(1 - m),
      c = sqrt(m);
  for (var i = 0; abs(c) > epsilon; i++) {
    if (phi % pi) {
      var dPhi = atan(b * tan(phi) / a);
      if (dPhi < 0) dPhi += pi;
      phi += dPhi + ~~(phi / pi) * pi;
    } else phi += phi;
    c = (a + b) / 2;
    b = sqrt(a * b);
    c = ((a = c) - b) / 2;
  }
  return phi / (pow(2, i) * a);
}
