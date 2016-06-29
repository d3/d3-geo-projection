import {geoProjection} from "d3-geo";
import {abs, asin, cos, epsilon, halfPi, pi, sin, sqrt2} from "./math";

function mollweideBromleyTheta(cp) {
  return function(theta) {
    var cpsinTheta = cp * sin(theta), i = 30, delta;
    do theta -= delta = (theta + sin(theta) - cpsinTheta) / (1 + cos(theta));
    while (abs(delta) > epsilon && --i > 0);
    return theta / 2;
  };
}

function mollweideBromley(cx, cy, cp) {
  var theta = mollweideBromleyTheta(cp);

  function forward(lambda, phi) {
    return [cx * lambda * cos(phi = theta(phi)), cy * sin(phi)];
  }

  forward.invert = function(x, y) {
    var theta = asin(y / cy);
    return [x / (cx * cos(theta)), asin((2 * theta + sin(2 * theta)) / cp)];
  };

  return forward;
}

var mollweide = mollweideBromley(sqrt2 / halfPi, sqrt2, pi);

export default function() {
  return geoProjection(mollweide).scale(165);
}
