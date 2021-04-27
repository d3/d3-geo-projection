import assert from "assert";

export function assertPathEqual(actual, expected) {
  assert.strictEqual(normalizePath(actual + ""), normalizePath(expected + ""));
}

const reNumber = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g;

function normalizePath(path) {
  return path.replace(reNumber, formatNumber);
}

function formatNumber(s) {
  return Math.abs((s = +s) - Math.round(s)) < 1e-6 ? Math.round(s) : s.toFixed(6);
}

export function assertInDelta(actual, expected, delta) {
  delta = delta || 1e-6;
  assert(inDelta(actual, expected, delta),
    `${actual} should be within ${delta} of ${expected}`);
}

function inDelta(actual, expected, delta) {
  return (Array.isArray(expected) ? inDeltaArray
      : typeof expected === "object" ? inDeltaObject
      : inDeltaNumber)(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
  let n = expected.length, i = -1;
  if (actual.length !== n) return false;
  while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaObject(actual, expected, delta) {
  for (let i in expected) if (!inDelta(actual[i], expected[i], delta)) return false;
  for (let i in actual) if (!(i in expected)) return false;
  return true;
}

function inDeltaNumber(actual, expected, delta) {
  return actual >= expected - delta && actual <= expected + delta;
}


export function assertProjectionEqual(projection, location, point, delta) {
  assert(planarEqual(projection(location), point, delta || 1e-6)
      && sphericalEqual(projection.invert(point), location, delta || 1e-3), 
    `${[projection.invert(point), projection(location)]} should be projected equivalents; expected: ${[location, point]}`);
}

function planarEqual(actual, expected, delta) {
  return Array.isArray(actual)
      && actual.length === 2
      && inDelta(actual[0], expected[0], delta)
      && inDelta(actual[1], expected[1], delta);
}

function sphericalEqual(actual, expected, delta) {
  return Array.isArray(actual)
      && actual.length === 2
      && longitudeEqual(actual[0], expected[0], delta)
      && inDelta(actual[1], expected[1], delta);
}

function longitudeEqual(actual, expected, delta) {
  actual = Math.abs(actual - expected) % 360;
  return actual <= delta || actual >= 360 - delta;
}
