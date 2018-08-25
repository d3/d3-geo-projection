import {geoProjectionMutator as projectionMutator} from "d3-geo";
import {acos, asin, atan2, cos, max, min, radians, sin, sqrt, tan} from "./math";

// the actual formula that renders the projection
function wagnerFormula(cx, cy, m1, m2, n) {
  function forward(lambda, phi) {
    var s = m1 * sin(m2 * phi),
        c0 = sqrt(1 - s * s),
        c1 = sqrt(2 / (1 + c0 * cos(lambda *= n)));
    return [
      cx * c0 * c1 * sin(lambda),
      cy * s * c1
    ];
  }

  // IMPORTANT NOTE: as of yet, the invert function is untestet!
  forward.invert = function(x, y) {
    var t1 = x / cx,
        t2 = y / cy,
        p = sqrt(t1 * t1 + t2 * t2),
        c = 2 * asin(p / 2);
    return [
      n * atan2(x * tan(c), cx * p),
      p && asin(y * sin(c) / (cy * m1 * p)) / m2
    ];
  };

  return forward;
}


export function wagnerRaw(poleline, parallels, inflation, ratio) {
  // 60 is always used as reference parallel
  var phi1 = 60;
  // needed for the calculations:
  var r90  = 90 * radians,
      r180 = 180 * radians;

  // sanitizing the input values
  // poleline and parallels may approximate but never equal 0
  poleline = max(poleline, 1e-10);
  parallels = max(parallels, 1e-10);
  // poleline must be <= 90; parallels may approximate but never equal 180
  poleline = min(poleline, 90);
  parallels = min(parallels, 179.99);
  // 0 <= inflation <= 99.999
  inflation = max(inflation, 0);
  inflation = min(inflation, 99.999);
  // ratio > 0.
  // MAYBE this should be limited to _halfway_ sensible values, i.e. something that renders a map
  // which still can be recognozed as world map, e.g. 20 <= ratio <= 1000.
  ratio = max(ratio, 1e-10);

  var radpoleline  = poleline * radians,
      radparallels = parallels * radians,
      radPhi1  = phi1 * radians;

  // now actually converting values from boehm notation
  // areal inflation e.g. from 0 to 1  or  20 to 1.2:
  var vinflation = inflation/100 + 1;
  // axial ratio e.g. from 200 to 2:
  var vratio  = ratio / 100;
  // the other ones are a bit more complicated...
  var m2 = acos(vinflation * cos(radPhi1)) / radPhi1,
      m1 = sin(radpoleline) / sin(m2*r90),
      n = radparallels / r180,
      k = sqrt(vratio * sin(radpoleline / 2) / sin(radparallels / 2)),
      cx = k / sqrt(n * m1 * m2),
      cy = 1 / (k * sqrt(n * m1 * m2));

  // ready to call the acutal formula:
  return wagnerFormula(cx, cy, m1, m2, n);
}

export default function() {
  // default values generate wagner viii
  var poleline = 65,
      parallels = 60,
      inflation = 20,
      ratio = 200,
      mutate = projectionMutator(wagnerRaw),
      projection = mutate(poleline, parallels, inflation, ratio);

  projection.poleline = function(_) {
    return arguments.length ? mutate(poleline = +_, parallels, inflation, ratio) : poleline;
  };

  projection.parallels = function(_) {
    return arguments.length ? mutate(poleline, parallels = +_, inflation, ratio) : parallels;
  };
  projection.inflation = function(_) {
    return arguments.length ? mutate(poleline, parallels, inflation = +_, ratio) : inflation;
  };
  projection.ratio = function(_) {
    return arguments.length ? mutate(poleline, parallels, inflation, ratio = +_) : ratio;
  };

  return projection
      .scale(163.775);
}
