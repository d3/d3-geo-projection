import {round, sqrt, sqrt1_2, sqrt2} from "./math.js";

// The conformal map of a hemisphere onto a square, shared by the Guyou, Peirce quincuncial and
// Adams projections. See Snyder & Voxland, An Album of Map Projections (1989), eqs. 225–239,
// and https://observablehq.com/@toja/guyou-peirce-adams-spilhaus for the derivations.

// K = F(π/2|½), the complete elliptic integral of the first kind. The square is |x|, |y| <= K.
var K = 1.8540746773013719;

// Returns [x, y] for a point of the hemisphere given as cos a, cos b and cos c: a and b are its
// distances to two points on the rim, 90° apart, and c is its distance to the centre.
// Snyder: sin²m = 1 + cos a cos b − sin a sin b, sin²n = 1 − cos a cos b − sin a sin b,
// x = F(m|½), y = F(n|½); rearranged to avoid cancellation, which needs cos c.
export function conformalSquare(cosa, cosb, cosc) {
  var p = cosa * cosb,
      cos2c = cosc * cosc,
      q = sqrt((cosb * cosb + cos2c) * (cosa * cosa + cos2c)), // sin a sin b
      sum = cosa + cosb,
      diff = cosb - cosa,
      cos2m, // q − p
      cos2n; // q + p

  // One of q − p and q + p is a difference; get it from (q − p)(q + p) = cos²c.
  if (p >= 0) {
    cos2n = q + p;
    cos2m = cos2n > 0 ? cos2c / cos2n : 0;
  } else {
    cos2m = q - p;
    cos2n = cos2c / cos2m;
  }

  var x = ellipticF05(sum * sum / (1 + p + q), cos2m),
      y = ellipticF05(diff * diff / (1 - p + q), cos2n);

  return [sum < 0 ? -x : x, diff < 0 ? -y : y];
}

// Calculate F(φ|½) for 0 <= φ <= π/2 from sin²φ and cos²φ, as a lemniscate arc sine:
// F = √2 arcsl(x) with x² = sin²φ / (1 + cos²φ), or F = K − √2 arcsl(cos φ) above F = K/2,
// where arcsl(x) = x Σ aₙ x⁴ⁿ and aₙ = C(2n, n) / (4ⁿ (4n + 1)).
function ellipticF05(sin2phi, cos2phi) {
  var complement = sin2phi > 2 - sqrt2,
      x2 = complement ? cos2phi : sin2phi / (1 + cos2phi),
      t = x2 * x2,
      series = 1 + t * (1 / 10 + t * (1 / 24 + t * (5 / 208 + t * (35 / 2176 + t * (3 / 256
             + t * (231 / 25600 + t * (429 / 59392 + t * (195 / 32768 + t * (12155 / 2424832
             + t * (46189 / 10747904 + t * (29393 / 7864320 + t * (96577 / 29360128
             + t * (1300075 / 444596224 + t * (87975 / 33554432 + t * (9694845 / 4093640704
             + t * (60108039 / 27917287424 + t * (8455095 / 4294967296
             + t * (2268783825 / 1254130450432)))))))))))))))))),
      f = sqrt(2 * x2) * series;

  return complement ? K - f : f;
}

// Gauss's power series for the lemniscate sine, sl(z) = M(z) / N(z): the coefficients of
// M(z) / z and N(z) in z⁴, his integers over (4k + 1)! and (4k)!. 24! and larger are rounded.
var M = [
  1,
  -2 / 120,
  -36 / 362880,
  552 / 6227020800,
  5136 / 355687428096000,
  5146848 / 5.109094217170944e19,
  90684864 / 1.5511210043330986e25,
  -49785176448 / 8.841761993739702e30
];

var N = [
  1,
  2 / 24,
  -4 / 40320,
  408 / 479001600,
  13584 / 20922789888000,
  -838368 / 2.43290200817664e18,
  85887936 / 6.204484017332394e23,
  10498336128 / 3.0488834461171387e29
];

// Returns [cos a, cos b, cos c] for a point [x, y]. After Adams (1929), the stereographic
// coordinate (cos b − i cos a) / (1 + cos c) is sl(z) with z = (1 − i)(x + iy) / (2√2).
// Outside the square the map continues by reflection in its sides, where cos c changes sign.
export function conformalSquareInverse(x, y) {
  var i = 0, j = 0;
  if (x > K || x < -K) {
    i = round(x / (2 * K)), x -= 2 * K * i;
    if (i & 1) x = -x;
  }
  if (y > K || y < -K) {
    j = round(y / (2 * K)), y -= 2 * K * j;
    if (j & 1) y = -y;
  }

  var zr = (x + y) * sqrt1_2 / 2,
      zi = (y - x) * sqrt1_2 / 2,
      z2r = zr * zr - zi * zi,
      z2i = 2 * zr * zi,
      wr = z2r * z2r - z2i * z2i, // w = z⁴
      wi = 2 * z2r * z2i,
      mr = M[7], mi = 0,
      nr = N[7], ni = 0,
      t;

  // M(z) / z and N(z) by Horner's scheme, then M = z (M / z).
  for (var k = 6; k >= 0; --k) {
    t = mr * wr - mi * wi + M[k], mi = mr * wi + mi * wr, mr = t;
    t = nr * wr - ni * wi + N[k], ni = nr * wi + ni * wr, nr = t;
  }
  t = zr * mr - zi * mi, mi = zr * mi + zi * mr, mr = t;

  // sl = M / N, from the stereographic coordinate back to the sphere.
  var m2 = mr * mr + mi * mi,
      n2 = nr * nr + ni * ni,
      s = 2 / (n2 + m2),
      cosc = (n2 - m2) / (n2 + m2);

  return [s * (mr * ni - mi * nr), s * (mr * nr + mi * ni), (i + j) & 1 ? -cosc : cosc];
}
