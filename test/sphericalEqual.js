var tape = require("tape");

tape.Test.prototype.sphericalEqual = function(actual, expected, delta) {
  delta = delta || 1e-6;
  this._assert(sphericalEqual(actual, expected, delta), {
    message: "should be equal degrees [longitude, latitude] within ±" + delta,
    operator: "sphericalEqual",
    actual: actual,
    expected: expected
  });
};

function sphericalEqual(actual, expected, delta) {
  return Array.isArray(actual)
      && actual.length === 2
      && longitudeEqual(actual[0], expected[0], delta)
      && latitudeEqual(actual[1], expected[1], delta);
}

function longitudeEqual(actual, expected, delta) {
  actual = Math.abs(actual - expected) % 360;
  return actual <= delta || actual >= 360 - delta;
}

function latitudeEqual(actual, expected, delta) {
  return Math.abs(actual - expected) <= delta;
}
