import {geoCentroid as centroid, geoProjectionMutator as projectionMutator, geoRotation as rotation} from "d3-geo";
import {abs, acos, asin, atan2, cos, epsilon, floor, pi, radians, sin, sqrt} from "./math";

// Azimuthal distance.
function distance(dPhi, c1, s1, c2, s2, dLambda) {
  var cosdLambda = cos(dLambda), r;
  if (abs(dPhi) > 1 || abs(dLambda) > 1) {
    r = acos(s1 * s2 + c1 * c2 * cosdLambda);
  } else {
    var sindPhi = sin(dPhi / 2), sindLambda = sin(dLambda / 2);
    r = 2 * asin(sqrt(sindPhi * sindPhi + c1 * c2 * sindLambda * sindLambda));
  }
  return abs(r) > epsilon ? [r, atan2(c2 * sin(dLambda), c1 * s2 - s1 * c2 * cosdLambda)] : [0, 0];
}

// Angle opposite a, and contained between sides of lengths b and c.
function angle(b, c, a) {
  return acos((b * b + c * c - a * a) / (2 * b * c));
}

// Normalize longitude.
function longitude(lambda) {
  return lambda - 2 * pi * floor((lambda + pi) / (2 * pi));
}

export function chamberlinRaw(lambda0, phi0, lambda1, phi1, lambda2, phi2) {
  var points = [
    [lambda0, phi0, sin(phi0), cos(phi0)],
    [lambda1, phi1, sin(phi1), cos(phi1)],
    [lambda2, phi2, sin(phi2), cos(phi2)]
  ];

  for (var a = points[2], b, i = 0; i < 3; ++i, a = b) {
    b = points[i];
    a.v = distance(b[1] - a[1], a[3], a[2], b[3], b[2], b[0] - a[0]);
    a.point = [0, 0];
  }

  var beta0 = angle(points[0].v[0], points[2].v[0], points[1].v[0]),
      beta1 = angle(points[0].v[0], points[1].v[0], points[2].v[0]),
      beta2 = pi - beta0;

  points[2].point[1] = 0;
  points[0].point[0] = -(points[1].point[0] = points[0].v[0] / 2);

  var mean = [
    points[2].point[0] = points[0].point[0] + points[2].v[0] * cos(beta0),
    2 * (points[0].point[1] = points[1].point[1] = points[2].v[0] * sin(beta0))
  ];

  function forward(lambda, phi) {
    var sinPhi = sin(phi),
        cosPhi = cos(phi),
        v = new Array(3), i;

    // Compute distance and azimuth from control points.
    for (i = 0; i < 3; ++i) {
      var p = points[i];
      v[i] = distance(phi - p[1], p[3], p[2], cosPhi, sinPhi, lambda - p[0]);
      if (!v[i][0]) return p.point;
      v[i][1] = longitude(v[i][1] - p.v[1]);
    }

    // Arithmetic mean of interception points.
    var point = mean.slice();
    for (i = 0; i < 3; ++i) {
      var j = i == 2 ? 0 : i + 1;
      var a = angle(points[i].v[0], v[i][0], v[j][0]);
      if (v[i][1] < 0) a = -a;

      if (!i) {
        point[0] += v[i][0] * cos(a);
        point[1] -= v[i][0] * sin(a);
      } else if (i == 1) {
        a = beta1 - a;
        point[0] -= v[i][0] * cos(a);
        point[1] -= v[i][0] * sin(a);
      } else {
        a = beta2 - a;
        point[0] += v[i][0] * cos(a);
        point[1] += v[i][0] * sin(a);
      }
    }

    point[0] /= 3, point[1] /= 3;
    return point;
  }

  return forward;
}

export default function() {
  var x0, y0,
      x1, y1,
      x2, y2,
      m = projectionMutator(chamberlinRaw),
      p = m(),
      r = rotation(0, 0),
      rotate = p.rotate,
      center = p.center;

  delete p.rotate;
  delete p.center;

  p.points = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1], [x2, y2]];
    var p0 = [x0 = +_[0][0], y0 = +_[0][1]],
        p1 = [x1 = +_[1][0], y1 = +_[1][1]],
        p2 = [x2 = +_[2][0], y2 = +_[2][1]],
        c = centroid({type: "MultiPoint", coordinates: [p0, p1, p2]}),
        c0 = r.invert(center());
    rotate(r = [-c[0], -c[1]]), r = rotation(r), p0 = r(p0), p1 = r(p1), p2 = r(p2), center(r(c0));
    return m(p0[0] * radians, p0[1] * radians, p1[0] * radians, p1[1] * radians, p2[0] * radians, p2[1] * radians);
  };

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .points([[0, 22], [45, 22], [22.5, -22]])
      .center([22.5, 0])
      .scale(450)
      .clipAngle(90);
}
