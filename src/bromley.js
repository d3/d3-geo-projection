import {geoProjection} from "d3-geo";
import {pi} from "./math";
import {mollweideBromleyRaw} from "./mollweide";

export var bromleyRaw = mollweideBromleyRaw(1, 4 / pi, pi);

export default function() {
  return geoProjection(bromleyRaw);
}
