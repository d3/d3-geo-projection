import {geoProjection} from "d3-geo";

function millerRaw(lambda, phi) {
  return [
    lambda,
    1.25 * Math.log(Math.tan(pi / 4 +0.4 * phi))
  ];
}

millerRaw.invert = function(x, y) {
  return [
    x,
    2.5 * Math.atan(Math.exp(0.8 * y)) -0.625 * pi
  ];
};

export default function() {
  return geoProjection(millerRaw);
}
