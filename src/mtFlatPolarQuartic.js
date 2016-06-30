import {geoProjection} from "d3-geo";

function mtFlatPolarQuarticRaw(lambda, phi) {
  var k = (1 + Math.SQRT1_2) * Math.sin(phi),
      theta = phi;
  for (var i = 0, delta; i < 25; i++) {
    theta -= delta = (Math.sin(theta / 2) + Math.sin(theta) - k) / (.5 * Math.cos(theta / 2) + Math.cos(theta));
    if (Math.abs(delta) < epsilon) break;
  }
  return [
    lambda * (1 + 2 * Math.cos(theta) / Math.cos(theta / 2)) / (3 * Math.SQRT2),
    2 * Math.sqrt(3) * Math.sin(theta / 2) / Math.sqrt(2 + Math.SQRT2)
  ];
}

mtFlatPolarQuarticRaw.invert = function(x, y) {
  var sinTheta_2 = y * Math.sqrt(2 + Math.SQRT2) / (2 * Math.sqrt(3)),
      theta = 2 * asin(sinTheta_2);
  return [
    3 * Math.SQRT2 * x / (1 + 2 * Math.cos(theta) / Math.cos(theta / 2)),
    asin((sinTheta_2 + Math.sin(theta)) / (1 + Math.SQRT1_2))
  ];
};

export default function() {
  return geoProjection(mtFlatPolarQuarticRaw);
}
