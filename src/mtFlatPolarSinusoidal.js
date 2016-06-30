import {geoProjection} from "d3-geo";

function mtFlatPolarSinusoidalRaw(lambda, phi) {
  var A = Math.sqrt(6 / (4 + pi)),
      k = (1 + pi / 4) * Math.sin(phi),
      theta = phi / 2;
  for (var i = 0, delta; i < 25; i++) {
    theta -= delta = (theta / 2 + Math.sin(theta) - k) / (.5 + Math.cos(theta));
    if (Math.abs(delta) < epsilon) break;
  }
  return [
    A * (.5 + Math.cos(theta)) * lambda / 1.5,
    A * theta
  ];
}

mtFlatPolarSinusoidalRaw.invert = function(x, y) {
  var A = Math.sqrt(6 / (4 + pi)),
      theta = y / A;
  if (Math.abs(Math.abs(theta) - halfPi) < epsilon) theta = theta < 0 ? -halfPi : halfPi;
  return [
    1.5 * x / (A * (.5 + Math.cos(theta))),
    asin((theta / 2 + Math.sin(theta)) / (1 + pi / 4))
  ];
};

export default function() {
  return geoProjection(mtFlatPolarSinusoidalRaw);
}
