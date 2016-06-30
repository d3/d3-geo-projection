import {geoProjection} from "d3-geo";
import {abs, pi, sqrt} from "./math";

function eckert1Raw(lambda, phi) {
  var alpha = sqrt(8 / (3 * pi));
  return [
    alpha * lambda * (1 - abs(phi) / pi),
    alpha * phi
  ];
}

eckert1Raw.invert = function(x, y) {
  var alpha = sqrt(8 / (3 * pi)),
      phi = y / alpha;
  return [
    x / (alpha * (1 - abs(phi) / pi)),
    phi
  ];
};

export default function() {
  return geoProjection(eckert1Raw);
}
