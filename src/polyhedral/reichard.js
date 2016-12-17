import {geoCentroid as centroid, geoGnomonic as gnomonic} from "d3-geo";
import {pi, atan, sqrt1_2, degrees} from "../math";
import polyhedral from "./index";
import cube from "./cube";

var phi1 = atan(sqrt1_2);

export default function (faceProjection) {
  faceProjection = faceProjection || function (face) {
    var c = centroid({type: 'MultiPoint', coordinates: face});
    return gnomonic().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var faces = cube.map(function (face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 4, 5, 2, 0, 1].forEach(function (d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return polyhedral(faces[0], function (lambda, phi) {
    return faces[
      lambda <= -pi / 2 ? (phi >= phi1 ? 0 : (phi <= -phi1 ? 5 : 3)) :
      lambda <=       0 ? (phi >=  phi1 ? 0 : (phi <= -phi1 ? 5 : 4)) :
      lambda <=  pi / 2 ? (phi >= phi1 ? 0 : (phi <=  -phi1 ? 5 : 1)) :
                         (phi >= phi1 ? 0 : (phi <=  -phi1 ? 5 : 2))
    ];
  })
    .scale(63.4368)
    .center([0, -45])
    .rotate(-50);
}
