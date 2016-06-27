export var epsilon = 1e-6;
export var pi = Math.PI;
export var abs = Math.abs;
export var cos = Math.cos;
export var sin = Math.sin;
export var sqrt = Math.sqrt;

//     ε2 = ε * ε,
//     π = Math.PI,
//     halfπ = π / 2,
//     sqrtπ = Math.sqrt(π),
//     radians = π / 180,
//     degrees = 180 / π;

export function sinci(x) {
  return x ? x / Math.sin(x) : 1;
}

// function sgn(x) {
//   return x > 0 ? 1 : x < 0 ? -1 : 0;
// }

// function asin(x) {
//   return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
// }

export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

// function asqrt(x) {
//   return x > 0 ? Math.sqrt(x) : 0;
// }
