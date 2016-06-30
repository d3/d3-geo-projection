import {geoProjection} from "d3-geo";
import "parallel1";

function rectangularPolyconic(phi0) {
  var sinPhi0 = Math.sin(phi0);

  function forward(lambda, phi) {
    var A = sinPhi0 ? Math.tan(lambda * sinPhi0 / 2) / sinPhi0 : lambda / 2;
    if (!phi) return [2 * A, -phi0];
    var E = 2 * Math.atan(A * Math.sin(phi)),
        cotPhi = 1 / Math.tan(phi);
    return [
      Math.sin(E) * cotPhi,
      phi + (1 - Math.cos(E)) * cotPhi - phi0
    ];
  }

  // TODO return null for points outside outline.
  forward.invert = function(x, y) {
    if (Math.abs(y += phi0) < epsilon) return [sinPhi0 ? 2 * Math.atan(sinPhi0 * x / 2) / sinPhi0 : x, 0];
    var k = x * x + y * y,
        phi = 0,
        i = 10, delta;
    do {
      var tanPhi = Math.tan(phi),
          secPhi = 1 / Math.cos(phi),
          j = k - 2 * y * phi + phi * phi;
      phi -= delta = (tanPhi * j + 2 * (phi - y)) / (2 + j * secPhi * secPhi + 2 * (phi - y) * tanPhi);
    } while (Math.abs(delta) > epsilon && --i > 0);
    var E = x * (tanPhi = Math.tan(phi)),
        A = Math.tan(Math.abs(y) < Math.abs(phi + 1 / tanPhi) ? asin(E) *0.5 : acos(E) *0.5 + pi / 4) / Math.sin(phi);
    return [
      sinPhi0 ? 2 * Math.atan(sinPhi0 * A) / sinPhi0 : 2 * A,
      phi
    ];
  };

  return forward;
}

(d3.geo.rectangularPolyconic = function() { return parallel1Projection(rectangularPolyconic); }).raw = rectangularPolyconic;
