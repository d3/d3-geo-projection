import {geoBounds as bounds, geoCentroid as centroid, geoGnomonic as gnomonic, geoInterpolate as interpolate, geoProjection as projection, geoTransform as transform} from "d3-geo";
import { collignonRaw } from "./collignon";
import {abs, asin, atan, atan2, cos, degrees, epsilon, max, min, pi, radians, sin, sqrt, sqrt1_2} from "./math";

// Creates a polyhedral projection.
//  * root: a spanning tree of polygon faces.  Nodes are automatically
//    augmented with a transform matrix.
//  * face: a function that returns the appropriate node for a given {lambda, phi}
//    point (radians).
//  * r: rotation angle for final polyhedron net.  Defaults to -pi / 6 (for
//    butterflies).
export default function polyhedron (root, face, r) {

  r = r == null ? -pi / 6 : r; // TODO automate

  recurse(root, {transform: [
    cos(r), sin(r), 0,
    -sin(r), cos(r), 0
  ]});

  function recurse(node, parent) {
    node.edges = faceEdges(node.face);
    if (parent) {
      // Find shared edge.
      if (parent.face) {
        var shared = node.shared = sharedEdge(node.face, parent.face),
            m = matrix(shared.map(parent.project), shared.map(node.project));
        node.transform = parent.transform ? multiply(parent.transform, m) : m;
        // Replace shared edge in parent edges array.
        var edges = parent.edges;
        for (var i = 0, n = edges.length; i < n; ++i) {
          if (pointEqual(shared[0], edges[i][1]) && pointEqual(shared[1], edges[i][0])) edges[i] = node;
          if (pointEqual(shared[0], edges[i][0]) && pointEqual(shared[1], edges[i][1])) edges[i] = node;
        }
        var edges = node.edges;
        for (var i = 0, n = edges.length; i < n; ++i) {
          if (pointEqual(shared[0], edges[i][0]) && pointEqual(shared[1], edges[i][1])) edges[i] = parent;
          if (pointEqual(shared[0], edges[i][1]) && pointEqual(shared[1], edges[i][0])) edges[i] = parent;
        }
      } else {
        node.transform = parent.transform;
      }
    }
    if (node.children) {
      node.children.forEach(function(child) {
        recurse(child, node);
      });
    }
    return node;
  }

  function forward(lambda, phi) {
    var node = face(lambda, phi),
        point = node.project([lambda * degrees, phi * degrees]),
        t;
    if (t = node.transform) {
      return [
        t[0] * point[0] + t[1] * point[1] + t[2],
        -(t[3] * point[0] + t[4] * point[1] + t[5])
      ];
    }
    point[1] = -point[1];
    return point;
  }

  // Naive inverse!  A faster solution would use bounding boxes, or even a
  // polygonal quadtree.
  if (hasInverse(root)) forward.invert = function(x, y) {
    var coordinates = faceInvert(root, [x, -y]);
    return coordinates && (coordinates[0] *= radians, coordinates[1] *= radians, coordinates);
  };

  function faceInvert(node, coordinates) {
    var invert = node.project.invert,
        t = node.transform,
        point = coordinates;
    if (t) {
      t = inverseTransform(t);
      point = [
        t[0] * point[0] + t[1] * point[1] + t[2],
        (t[3] * point[0] + t[4] * point[1] + t[5])
      ];
    }
    if (invert && node === faceDegrees(p = invert(point))) return p;
    var p,
        children = node.children;
    for (var i = 0, n = children && children.length; i < n; ++i) {
      if (p = faceInvert(children[i], coordinates)) return p;
    }
  }

  function faceDegrees(coordinates) {
    return face(coordinates[0] * radians, coordinates[1] * radians);
  }

  var proj = projection(forward),
      stream_ = proj.stream;

  proj.stream = function(stream) {
    var rotate = proj.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (proj.rotate([0, 0]), stream_(stream));
    proj.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart();
      sphereStream.lineStart();
      outline(sphereStream, root);
      sphereStream.lineEnd();
      sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return proj;
};

export function polyhedronButterfly(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = centroid({type: "MultiPoint", coordinates: face});
    return gnomonic().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var faces = polyhedronOctahedron.map(function(face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return polyhedron(faces[0], function(lambda, phi) {
    return faces[
        lambda < -pi / 2 ? phi < 0 ? 6 : 4
        : lambda < 0 ? phi < 0 ? 2 : 0
        : lambda < pi / 2 ? phi < 0 ? 3 : 1
        : phi < 0 ? 7 : 5];
  })
  .scale(101.858)
  .center([0,45]);
};



export function polyhedronCollignon(faceProjection) {

    var scalex = 2/sqrt(3),
    collignonScaled = function(a,b) {
      var p = collignonRaw(a,b);
      return [p[0] * scalex, p[1]];
    };
    collignonScaled.invert = function(x,y) {
      return collignonRaw.invert(x / scalex, y);
    }

  faceProjection = faceProjection || function(face) {
    var c = centroid({type: "MultiPoint", coordinates: face});

    return projection(collignonScaled)
      .translate([0, 0]).scale(1)
      .rotate(c[1] > 0 ? [-c[0], 0] : [180-c[0], 180]);

  };

  var faces = polyhedronOctahedron.map(function(face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 0, 0, 1, 0, 1, 4, 5 ].forEach(function(d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return polyhedron(faces[0], function(lambda, phi) {
    return faces[
        lambda < -pi / 2 ? phi < 0 ? 6 : 4
        : lambda < 0 ? phi < 0 ? 2 : 0
        : lambda < pi / 2 ? phi < 0 ? 3 : 1
        : phi < 0 ? 7 : 5];
  })
  .scale(121.906)
  .center([0, 48.5904]);
};


export function polyhedronWaterman(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = face.length === 6 ? centroid({type: "MultiPoint", coordinates: face}) : face[0];
    return gnomonic().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var octahedron = polyhedronOctahedron;

  var w5 = octahedron.map(function(face) {
    var xyz = face.map(cartesian),
        n = xyz.length,
        a = xyz[n - 1],
        b,
        hexagon = [];
    for (var i = 0; i < n; ++i) {
      b = xyz[i];
      hexagon.push(spherical([
        a[0] * 0.9486832980505138 + b[0] * 0.31622776601683794,
        a[1] * 0.9486832980505138 + b[1] * 0.31622776601683794,
        a[2] * 0.9486832980505138 + b[2] * 0.31622776601683794
      ]), spherical([
        b[0] * 0.9486832980505138 + a[0] * 0.31622776601683794,
        b[1] * 0.9486832980505138 + a[1] * 0.31622776601683794,
        b[2] * 0.9486832980505138 + a[2] * 0.31622776601683794
      ]));
      a = b;
    }
    return hexagon;
  });

  var cornerNormals = [];

  var parents = [-1, 0, 0, 1, 0, 1, 4, 5];

  w5.forEach(function(hexagon, j) {
    var face = octahedron[j],
        n = face.length,
        normals = cornerNormals[j] = [];
    for (var i = 0; i < n; ++i) {
      w5.push([
        face[i],
        hexagon[(i * 2 + 2) % (2 * n)],
        hexagon[(i * 2 + 1) % (2 * n)]
      ]);
      parents.push(j);
      normals.push(cross(
        cartesian(hexagon[(i * 2 + 2) % (2 * n)]),
        cartesian(hexagon[(i * 2 + 1) % (2 * n)])
      ));
    }
  });

  var faces = w5.map(function(face) {
    return {
      project: faceProjection(face),
      face: face
    };
  });

  parents.forEach(function(d, i) {
    var parent = faces[d];
    parent && (parent.children || (parent.children = [])).push(faces[i]);
  });

  return polyhedron(faces[0], face)
      .scale(110.625)
      .center([0,45]);

  function face(lambda, phi) {
    var cosphi = cos(phi),
        p = [cosphi * cos(lambda), cosphi * sin(lambda), sin(phi)];

    var hexagon = lambda < -pi / 2 ? phi < 0 ? 6 : 4
        : lambda < 0 ? phi < 0 ? 2 : 0
        : lambda < pi / 2 ? phi < 0 ? 3 : 1
        : phi < 0 ? 7 : 5;

    var n = cornerNormals[hexagon];

    return faces[
        dot(n[0], p) < 0 ? 8 + 3 * hexagon
      : dot(n[1], p) < 0 ? 8 + 3 * hexagon + 1
      : dot(n[2], p) < 0 ? 8 + 3 * hexagon + 2
      : hexagon];
  }
};

function outline(stream, node, parent) {
  var point,
      edges = node.edges,
      n = edges.length,
      edge,
      multiPoint = {type: "MultiPoint", coordinates: node.face},
      notPoles = node.face.filter(function(d) { return abs(d[1]) !== 90; }),
      b = bounds({type: "MultiPoint", coordinates: notPoles}),
      inside = false,
      j = -1,
      dx = b[1][0] - b[0][0];
  // TODO
  var c = dx === 180 || dx === 360
      ? [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2]
      : centroid(multiPoint);
  // First find the shared edge…
  if (parent) while (++j < n) {
    if (edges[j] === parent) break;
  }
  ++j;
  for (var i = 0; i < n; ++i) {
    edge = edges[(i + j) % n];
    if (Array.isArray(edge)) {
      if (!inside) {
        stream.point((point = interpolate(edge[0], c)(epsilon))[0], point[1]);
        inside = true;
      }
      stream.point((point = interpolate(edge[1], c)(epsilon))[0], point[1]);
    } else {
      inside = false;
      if (edge !== parent) outline(stream, edge, node);
    }
  }
}

// TODO generate on-the-fly to avoid external modification.
var octahedron = [
  [0, 90],
  [-90, 0], [0, 0], [90, 0], [180, 0],
  [0, -90]
];

export var polyhedronOctahedron = [
  [0, 2, 1],
  [0, 3, 2],
  [5, 1, 2],
  [5, 2, 3],
  [0, 1, 4],
  [0, 4, 3],
  [5, 4, 1],
  [5, 3, 4]
].map(function(face) {
  return face.map(function(i) {
    return octahedron[i];
  });
});

var phi1 = atan(sqrt1_2) * degrees;

var cube = [
  [0, phi1], [90, phi1], [180, phi1], [-90, phi1],
  [0, -phi1], [90, -phi1], [180, -phi1], [-90, -phi1]
];

export var polyhedronCube = [
  [0, 3, 2, 1], // N
  [0, 1, 5, 4],
  [1, 2, 6, 5],
  [2, 3, 7, 6],
  [3, 0, 4, 7],
  [4, 5, 6, 7] // S
].map(function(face) {
  return face.map(function(i) {
    return cube[i];
  });
});

// Finds a shared edge given two clockwise polygons.
function sharedEdge(a, b) {
  var x, y, n = a.length, found = null;
  for (var i = 0; i < n; ++i) {
    x = a[i];
    for (var j = b.length; --j >= 0;) {
      y = b[j];
      if (x[0] === y[0] && x[1] === y[1]) {
        if (found) return [found, x];
        found = x;
      }
    }
  }
}

// Note: 6-element arrays are used to denote the 3x3 affine transform matrix:
// [a, b, c,
//  d, e, f,
//  0, 0, 1] - this redundant row is left out.

// Transform matrix for [a0, a1] -> [b0, b1].
function matrix(a, b) {
  var u = subtract(a[1], a[0]),
      v = subtract(b[1], b[0]),
      phi = angle(u, v),
      s = length(u) / length(v);

  return multiply([
    1, 0, a[0][0],
    0, 1, a[0][1]
  ], multiply([
    s, 0, 0,
    0, s, 0
  ], multiply([
    cos(phi), sin(phi), 0,
    -sin(phi), cos(phi), 0
  ], [
    1, 0, -b[0][0],
    0, 1, -b[0][1]
  ])));
}

// Inverts a transform matrix.
function inverseTransform(m) {
  var k = 1 / (m[0] * m[4] - m[1] * m[3]);
  return [
    k * m[4], -k * m[1], k * (m[1] * m[5] - m[2] * m[4]),
    -k * m[3], k * m[0], k * (m[2] * m[3] - m[0] * m[5])
  ];
}

// Multiplies two 3x2 matrices.
function multiply(a, b) {
  return [
    a[0] * b[0] + a[1] * b[3],
    a[0] * b[1] + a[1] * b[4],
    a[0] * b[2] + a[1] * b[5] + a[2],
    a[3] * b[0] + a[4] * b[3],
    a[3] * b[1] + a[4] * b[4],
    a[3] * b[2] + a[4] * b[5] + a[5]
  ];
}

// Subtracts 2D vectors.
function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

// Magnitude of a 2D vector.
function length(v) {
  return sqrt(v[0] * v[0] + v[1] * v[1]);
}

// Angle between two 2D vectors.
function angle(a, b) {
  return atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
}

function dot(a, b) {
  for (var i = 0, n = a.length, s = 0; i < n; ++i) s += a[i] * b[i];
  return s;
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

// Converts 3D Cartesian to spherical coordinates (degrees).
function spherical(cartesian) {
  return [
    atan2(cartesian[1], cartesian[0]) * degrees,
    asin(max(-1, min(1, cartesian[2]))) * degrees
  ];
}

// Converts spherical coordinates (degrees) to 3D Cartesian.
function cartesian(coordinates) {
  var lambda = coordinates[0] * radians,
      phi = coordinates[1] * radians,
      cosphi = cos(phi);
  return [
    cosphi * cos(lambda),
    cosphi * sin(lambda),
    sin(phi)
  ];
}

// Tests equality of two spherical points.
function pointEqual(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

// Converts an array of n face vertices to an array of n + 1 edges.
function faceEdges(face) {
  var n = face.length,
      edges = [];
  for (var a = face[n - 1], i = 0; i < n; ++i) edges.push([a, a = face[i]]);
  return edges;
}

function hasInverse(node) {
  return node.project.invert || node.children && node.children.some(hasInverse);
}