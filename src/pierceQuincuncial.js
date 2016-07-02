import {geoProjection as projection} from "d3-geo";
import {guyouRaw} from "./guyou";
import quincuncialRaw from "./quincuncial";

export default function() {
  return projection(quincuncialRaw(guyouRaw))
      .scale(111.5)
      .rotate([-90, -90, 45])
      .clipAngle(180 - 1e-3);
}
