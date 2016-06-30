import {geoProjection} from "d3-geo";

function hatanoRaw(lambda, phi) {
  var c = Math.sin(phi) * (phi < 0 ? 2.43763 : 2.67595);
  for (var i = 0, delta; i < 20; i++) {
    phi -= delta = (phi + Math.sin(phi) - c) / (1 + Math.cos(phi));
    if (Math.abs(delta) < epsilon) break;
  }
  return [
   0.85 * lambda * Math.cos(phi *=0.5),
    Math.sin(phi) * (phi < 0 ? 1.93052 : 1.75859)
  ];
}

hatanoRaw.invert = function(x, y) {
  var theta = Math.abs(theta = y * (y < 0 ?0.51799515156538134803 :0.56863737426006061674)) > 1 - epsilon
      ? theta > 0 ? halfPi : -halfPi
      : asin(theta);
  return [
    1.17647058823529411764 * x / Math.cos(theta),
    Math.abs(theta = ((theta += theta) + Math.sin(theta)) * (y < 0 ?0.41023453108141924738 :0.37369906014686373063)) > 1 - epsilon
      ? theta > 0 ? halfPi : -halfPi
      : asin(theta)
  ];
};

export default function() {
  return geoProjection(hatanoRaw);
}
