import { abs, epsilon, sign } from "./math";

// Newton-Raphson
// Solve f(x) = y, start from x = 0
export function solve(f, y = 0, x = 0, steps = 100) {
  var delta, f0, f1;
  do {
    f0 = f(x);
    f1 = f(x + epsilon);
    if (f0 === f1) f1 = f0 + epsilon;
    delta = (epsilon * (f0 - y)) / (f0 - f1);
    if (abs(delta) > 0.1) delta = 0.1 * sign(delta);
    x += delta;
  } while (steps-- > 0 && abs(delta) > epsilon);
  return steps < 0 ? NaN : x;
}
