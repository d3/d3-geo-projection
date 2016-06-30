import {geoProjection} from "d3-geo";

function mtFlatPolarParabolicRaw(lambda, phi) {
  var sqrt6 = Math.sqrt(6),
      sqrt7 = Math.sqrt(7),
      theta = Math.asin(7 * Math.sin(phi) / (3 * sqrt6));
  return [
    sqrt6 * lambda * (2 * Math.cos(2 * theta / 3) - 1) / sqrt7,
    9 * Math.sin(theta / 3) / sqrt7
  ];
}

mtFlatPolarParabolicRaw.invert = function(x, y) {
  var sqrt6 = Math.sqrt(6),
      sqrt7 = Math.sqrt(7),
      theta = 3 * asin(y * sqrt7 / 9);
  return [
    x * sqrt7 / (sqrt6 * (2 * Math.cos(2 * theta / 3) - 1)),
    asin(Math.sin(theta) * 3 * sqrt6 / 7)
  ];
};

export default function() {
  return geoProjection(mtFlatPolarParabolicRaw);
}
