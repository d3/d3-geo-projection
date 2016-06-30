import {geoProjection} from "d3-geo";
import {cos} from "./math";

export function sinusoidalRaw(lambda, phi) {
  return [lambda * cos(phi), phi];
}

sinusoidalRaw.invert = function(x, y) {
  return [x / cos(y), y];
};

export default function() {
  return geoProjection(sinusoidalRaw);
}
