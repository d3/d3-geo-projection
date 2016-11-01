import {geoProjection as projection} from "d3-geo";
import {gringortenRaw} from "../gringorten";
import quincuncialRaw from "./index";

export default function() {
  return projection(quincuncialRaw(gringortenRaw))
      .scale(176.423)
      .rotate([-90, -90, 45])
      .clipAngle(180 - 1e-3);
}
