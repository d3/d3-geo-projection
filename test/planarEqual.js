var tape = require("tape");

tape.Test.prototype.planarEqual = function(actual, expected, delta) {
  delta = delta || 1e-6;
  this._assert(planarEqual(actual, expected, delta), {
    message: "should be equal pixels [x, y] within ±" + delta,
    operator: "planarEqual",
    actual: actual,
    expected: expected
  });
};

function planarEqual(actual, expected, delta) {
  return Array.isArray(actual)
      && actual.length === 2
      && inDelta(actual[0], expected[0], delta)
      && inDelta(actual[1], expected[1], delta);
}

function inDelta(actual, expected, delta) {
  return Math.abs(actual - expected) <= delta;
}
