import {abs, asin, atan, cos, cosh, epsilon, exp, halfPi, log, pi, sign, sin, sinh, sqrt, tan, tanh} from "./math.js";

// Returns [sn, cn, dn](u + iv|m).
export function ellipticJi(u, v, m) {
  var a, b, c;
  if (!u) {
    b = ellipticJ(v, 1 - m);
    return [
      [0, b[0] / b[1]],
      [1 / b[1], 0],
      [b[2] / b[1], 0]
    ];
  }
  a = ellipticJ(u, m);
  if (!v) return [[a[0], 0], [a[1], 0], [a[2], 0]];
  b = ellipticJ(v, 1 - m);
  c = b[1] * b[1] + m * a[0] * a[0] * b[0] * b[0];
  return [
    [a[0] * b[2] / c, a[1] * a[2] * b[0] * b[1] / c],
    [a[1] * b[1] / c, -a[0] * a[2] * b[0] * b[2] / c],
    [a[2] * b[1] * b[2] / c, -m * a[0] * a[1] * b[0] / c]
  ];
}

// Returns [sn, cn, dn, ph](u|m).
export function ellipticJ(u, m) {
  var ai, b, phi, t, twon;
  if (m < epsilon) {
    t = sin(u);
    b = cos(u);
    ai = m * (u - t * b) / 4;
    return [
      t - ai * b,
      b + ai * t,
      1 - m * t * t / 2,
      u - ai
    ];
  }
  if (m >= 1 - epsilon) {
    ai = (1 - m) / 4;
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
    c[i] = (ai - b) / 2;
    a[i] = (ai + b) / 2;
    b = sqrt(ai * b);
    twon *= 2;
  }

  phi = twon * a[i] * u;
  do {
    t = c[i] * sin(b = phi) / a[i];
    phi = (asin(t) + phi) / 2;
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
        cotLambda2 = (-b + sqrt(b * b - 4 * c)) / 2;
    return [
      ellipticF(atan(1 / sqrt(cotLambda2)), m) * sign(phi),
      ellipticF(atan(sqrt((cotLambda2 / cotPhi2 - 1) / m)), 1 - m) * sign(psi)
    ];
  }
  return [
    0,
    ellipticF(atan(sinhPsi), 1 - m) * sign(psi)
  ];
}

/*
 * Computes the elliptic integral of the first kind.
 * Algorithm from Bulirsch(1965), the implementation follows Snyder(1989), p. 239.
 * https://observablehq.com/d/9c104687d45ef00e
 */
export function ellipticF(phi, m) {
  var C1 = 10e-4,
      C2 = 10e-10;
  
  var sp = sin(phi),
      k = sqrt(1 - m),
      h = sp * sp;

  // "incomplete" elliptic integral
  if (k < epsilon) return log((1 + sp) / (1 - sp)) / 2;
  var g, n, p, r, y;
  m = 1, n = 0, g = m, p = m * k, m += k;
  y = sqrt((1 - h) / h);
  if (abs(y -= p / y) <= 0) y = C2 * sqrt(p);
  while (abs(g - k) > C1 * g) {
    k = 2 * sqrt(p), n += n;
    if (y < 0) n += 1;
    p = m * k, g = m, m += k;
    if (abs(y -= p / y) <= 0) y = C2 * sqrt(p);
  }
  if (y < 0) n += 1;
  r = (atan(m / y) + pi * n) / m;
  return sign(sp) * r;
}
