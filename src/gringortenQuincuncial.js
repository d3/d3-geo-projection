import {geoProjection as projection} from "d3-geo";
import {gringortenRaw} from "./gringorten";
import quincuncialRaw from "./quincuncial";

export default function() {
  return projection(quincuncialRaw(gringortenRaw))
      .scale(170)
      .rotate([65, -90])
      .clipAngle(180 - 1e-3);
}
