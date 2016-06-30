import {geoProjection} from "d3-geo";
import "mollweide";
import "sinusoidal";
import "sinu-mollweide";

function homolosine(lambda, phi) {
  return Math.abs(phi) > sinuMollweidePhi
      ? (lambda = mollweide(lambda, phi), lambda[1] -= phi > 0 ? sinuMollweideY : -sinuMollweideY, lambda)
      : sinusoidal(lambda, phi);
}

homolosineRaw.invert = function(x, y) {
  return Math.abs(y) > sinuMollweidePhi
      ? mollweide.invert(x, y + (y > 0 ? sinuMollweideY : -sinuMollweideY))
      : sinusoidal.invert(x, y);
};

export default function() {
  return geoProjection(homolosineRaw);
}
