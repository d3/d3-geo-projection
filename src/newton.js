import {abs, epsilon} from "./math.js";

// Newton-Raphson
// Solve f(x) = y, start from x
export function solve(f, y, x) {
  var steps = 100, delta, f0, f1;
  x = x === undefined ? 0 : +x;
  y = +y;
  do {
    f0 = f(x);
    f1 = f(x + epsilon);
    if (f0 === f1) f1 = f0 + epsilon;
    x -= delta = (-1 * epsilon * (f0 - y)) / (f0 - f1);
  } while (steps-- > 0 && abs(delta) > epsilon);
  return steps < 0 ? NaN : x;
}
