export var epsilon = 1e-6;
export var pi = Math.PI;
export var halfPi = pi / 2;
export var degrees = 180 / pi;
export var radians = pi / 180;
export var abs = Math.abs;
export var atan2 = Math.atan2;
export var cos = Math.cos;
export var log = Math.log;
export var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
export var sin = Math.sin;
export var tan = Math.tan;

export function sinci(x) {
  return x ? x / Math.sin(x) : 1;
}

export function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

export function sqrt(x) {
  return x > 0 ? Math.sqrt(x) : 0;
}
