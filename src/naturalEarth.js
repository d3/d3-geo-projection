import {geoProjection} from "d3-geo";

function naturalEarthRaw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (.8707 -0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (.003971 * phi2 -0.001529 * phi4))),
    phi * (1.007226 + phi2 * (.015085 + phi4 * (-0.044475 +0.028874 * phi2 -0.005916 * phi4)))
  ];
}

naturalEarthRaw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (.015085 + phi4 * (-0.044475 +0.028874 * phi2 -0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (.015085 * 3 + phi4 * (-0.044475 * 7 +0.028874 * 9 * phi2 -0.005916 * 11 * phi4)));
  } while (Math.abs(delta) > epsilon && --i > 0);
  return [
    x / (.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (.003971 -0.001529 * phi2)))),
    phi
  ];
};

export default function() {
  return geoProjection(naturalEarthRaw);
}
