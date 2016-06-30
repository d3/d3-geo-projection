import {geoProjection} from "d3-geo";

function nellHammerRaw(lambda, phi) {
  return [
    lambda * (1 + Math.cos(phi)) / 2,
    2 * (phi - Math.tan(phi / 2))
  ];
}

nellHammerRaw.invert = function(x, y) {
  var p = y / 2;
  for (var i = 0, delta = Infinity; i < 10 && Math.abs(delta) > epsilon; i++) {
    var c = Math.cos(y / 2);
    y -= delta = (y - Math.tan(y / 2) - p) / (1 -0.5 / (c * c));
  }
  return [
    2 * x / (1 + Math.cos(y)),
    y
  ];
};

export default function() {
  return geoProjection(nellHammerRaw);
}
