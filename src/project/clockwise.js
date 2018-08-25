import {geoArea} from "d3-geo";
import {abs, tau} from "../math.js";

export default function(ring) {
  if ((n = ring.length) < 4) return false;
  var i = 0,
    n,
    a0 = ring[n - 1][0],
    a1 = ring[n - 1][1],
    b0 = ring[0][0],
    b1 = ring[0][1];
  if (abs(a0 - b0) >= 180)
    return geoArea({ type: "Polygon", coordinates: [ring] }) < tau;
  var area = a1 * b0 - a0 * b1;
  while (++i < n) {
    a0 = b0;
    a1 = b1;
    b0 = ring[i][0];
    b1 = ring[i][1];
    if (abs(a0 - b0) >= 180)
      return geoArea({ type: "Polygon", coordinates: [ring] }) < tau;
    area += a1 * b0 - a0 * b1;
  }
  return area >= 0;
}
