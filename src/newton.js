import {abs, epsilon} from "./math";

// Newton-Raphson
// Solve f(x) = 0, start from x = 0
export function solve(f, y, start, steps) {
  y = y || 0;
  steps = steps || 100;
  var x = start || 0, delta, f0, f1;
  do {
    f0 = f(x);
    f1 = f(x + epsilon);
    if (f0 === f1) f1 = f0 + epsilon;
    x -= delta = (-1 * epsilon * (f0 - y)) / (f0 - f1);
  } while (steps-- > 0 && abs(delta) > epsilon);

  return steps < 0 ? NaN : x;
}
