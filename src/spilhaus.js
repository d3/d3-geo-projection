import {geoProjection as projection} from "d3-geo";
import {adams2SquareRaw} from "./adams2.js";

// Spilhaus's world ocean map in a square: an oblique aspect of Adams's projection of the world
// in a square II. The rotation is that of PROJ's +proj=spilhaus.
export default function() {
  return projection(adams2SquareRaw)
      .rotate([-66.94970198, 49.56371678, 40.17823482])
      .scale(134.5685);
}
