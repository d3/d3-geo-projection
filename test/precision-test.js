import assert from "assert";
import {geoAitoffRaw, geoEckert4Raw, geoMollweideRaw, geoVanDerGrintenRaw, geoWinkel3Raw} from "../src/index.js";

// Raw projections (unit sphere, radians) close to the poles and the origin,
// where some formulas lost digits or did not converge. Expected values are
// from a 50-digit computation on the same double inputs. The inverse is
// checked as an angular distance, and its tolerance is at least 1e-12 rad
// (6 micrometres on the Earth), more where moving the input by 1 ulp moves
// the exact inverse by about as much (close to the poles of eckert4).
const cases = [
  // mollweide: near the poles the Newton iteration stopped early; the inverse used asin() near 1
  [geoMollweideRaw, -3.12413936106985, -1.5707961522619713, -0.000092776391755730198, -1.4142135616037717, -3.1241392851043444, -1.570796152261965, 3.5e-13],
  // mollweide: near the poles the Newton iteration stopped early; the inverse used asin() near 1
  [geoMollweideRaw, 1.7453292519943295, 1.5706217938696971, 0.0051830330009742215, 1.4142058691353313, 1.7453292519840476, 1.5706217938696956, 1.0e-13],
  // eckert4: near the poles the Newton iteration stopped early; the inverse used asin() near 1
  [geoEckert4Raw, -2.6179938779914944, 1.5707945814656445, -1.1054196014084596, 1.3265004281733952, -2.6179938780283305, 1.5707945814761748, 2.1e-10],
  // eckert4: near the poles the Newton iteration stopped early; the inverse used asin() near 1
  [geoEckert4Raw, 1.0471975511965979, -1.5707788735023767, 0.44217712103068809, -1.3265004278162904, 1.0471975511959307, -1.5707788735018999, 2.1e-11],
  // vanDerGrinten: close to the origin the formulas lost the digits; within 1e-6 of the equator or the central meridian y or the longitude was 0
  [geoVanDerGrintenRaw, 0.000000017453292519943295, 0.000000017453292519943295, 0.000000017453292519943294, 0.000000017453292519943295, 0.000000017453292519943295, 0.000000017453292519943294, 1.0e-13],
  // vanDerGrinten: close to the origin the formulas lost the digits; within 1e-6 of the equator or the central meridian y or the longitude was 0
  [geoVanDerGrintenRaw, 0.17453292519943295, 0.000000000052359877559829887, 0.17453292519943295, 0.000000000052359877559832581, 0.17453292519943295, 0.000000000052359877559829889, 1.0e-13],
  // vanDerGrinten: close to the origin the formulas lost the digits; within 1e-6 of the equator or the central meridian y or the longitude was 0
  [geoVanDerGrintenRaw, 0.00000000017453292519943295, 0.0087266462599716477, 0.00000000017453157847398032, 0.0087267135962442792, 0.00000000017453292519943295, 0.008726646259971647, 1.0e-13],
  // vanDerGrinten: close to the origin the formulas lost the digits; within 1e-6 of the equator or the central meridian y or the longitude was 0
  [geoVanDerGrintenRaw, -0.0000052359877559829886, 0.00000099483767363676799, -0.0000052359877559824635, 0.00000099483767363686775, -0.0000052359877559829885, 0.00000099483767363676796, 1.0e-13],
  // winkel3: close to the origin the inverse lost half the digits (1 - D * D, acos(D))
  [geoWinkel3Raw, 0.000000017453292519943295, 0.0000000069813170079773182, 0.000000014282201815527202, 0.0000000069813170079773182, 0.000000017453292519943295, 0.0000000069813170079773181, 1.0e-13],
  // aitoff: the Newton inverse did not converge close to the outline and the poles
  [geoAitoffRaw, 3.1232552154532316, 1.1542953259956774, 1.2679265060368415, 1.4331267916473949, 3.1232552154532313, 1.1542953259956774, 1.0e-13],
  // aitoff: the Newton inverse did not converge close to the outline and the poles
  [geoAitoffRaw, -2.8058900282090216, 1.5534150695075768, -0.053735415932165313, 1.5676624602814558, -2.8058900282090119, 1.5534150695075768, 1.0e-13]
];

const names = [
  [geoAitoffRaw, "geoAitoffRaw"],
  [geoEckert4Raw, "geoEckert4Raw"],
  [geoMollweideRaw, "geoMollweideRaw"],
  [geoVanDerGrintenRaw, "geoVanDerGrintenRaw"],
  [geoWinkel3Raw, "geoWinkel3Raw"]
];

function distance(l1, p1, l2, p2) {
  const a = Math.sin((p2 - p1) / 2), b = Math.sin((l2 - l1) / 2);
  return 2 * Math.asin(Math.sqrt(a * a + Math.cos(p1) * Math.cos(p2) * b * b));
}

for (const [raw, lambda, phi, x, y, lambdaInv, phiInv, tolerance] of cases) {
  const name = names.find(([r]) => r === raw)[1];
  it(`${name}(${lambda}, ${phi}) is within 1e-13 of the exact value`, () => {
    const [px, py] = raw(lambda, phi);
    assert(Math.hypot(px - x, py - y) < 1e-13, `${[px, py]} should be ${[x, y]}`);
  });
  if (lambdaInv !== null) {
    it(`${name}.invert(${x}, ${y}) is within ${Math.max(tolerance, 1e-12)} rad of the exact value`, () => {
      const [l, p] = raw.invert(x, y);
      assert(distance(l, p, lambdaInv, phiInv) < Math.max(tolerance, 1e-12), `${[l, p]} should be ${[lambdaInv, phiInv]}`);
    });
  }
}
