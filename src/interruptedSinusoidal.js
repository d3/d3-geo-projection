import {sinusoidalRaw} from "./sinusoidal";
import interrupt from "./interrupt";

var lobes = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [   0,  90], [  40,   0]],
  [[  40,   0], [ 100,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-100, -90], [ -40,   0]],
  [[ -40,   0], [   0, -90], [  40,   0]],
  [[  40,   0], [ 100, -90], [ 180,   0]]
]];

export default function() {
  return interrupt(sinusoidalRaw, lobes)
      .scale(152.63)
      .rotate([-20, 0]);
}
