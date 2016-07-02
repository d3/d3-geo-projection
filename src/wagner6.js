import {geoProjection} from "d3-geo";
import {pi, sqrt} from "./math";

export function wagner6Raw(lambda, phi) {
  return [lambda * sqrt(1 - 3 * phi * phi / (pi * pi)), phi];
}

wagner6Raw.invert = function(x, y) {
  return [x / sqrt(1 - 3 * y * y / (pi * pi)), y];
};

export default function() {
  return geoProjection(wagner6Raw);
}
