import {acos, asin, atan2, cos, sin, sqrt} from "./math";

// TODO Export from d3-geo?

export function azimuthalEquidistant(x, y) {
  var cx = cos(x),
      cy = cos(y),
      cxcy = cx * cy,
      k = (cxcy = acos(cxcy)) && cxcy / sin(cxcy);
  return [
    k * cy * sin(x),
    k * sin(y)
  ];
}

export function azimuthalEquidistantInvert(x, y) {
  var c = sqrt(x * x + y * y),
      sc = sin(c),
      cc = cos(c);
  return [
    atan2(x * sc, c * cc),
    asin(c && y * sc / c)
  ];
}
