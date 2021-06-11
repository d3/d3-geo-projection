import * as d3 from "../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

const points = [[0, 0], [30.3, 24.1], [-10, 42], [-2, -5], [0,-55]];

for (const factory of [
  d3.geoAiry,
  d3.geoAitoff,
  d3.geoArmadillo,
  d3.geoAugust,
  d3.geoBaker,
  d3.geoBerghaus,
  d3.geoBertin1953,
  d3.geoBoggs,
  d3.geoBonne,
  d3.geoBottomley,
  d3.geoBromley,
  // d3.geoChamberlin, // factory
  d3.geoChamberlinAfrica,
  d3.geoCollignon,
  d3.geoCraig,
  d3.geoCraster,
  d3.geoCylindricalEqualArea,
  d3.geoCylindricalStereographic,
  d3.geoEckert1,
  d3.geoEckert2,
  d3.geoEckert3,
  d3.geoEckert4,
  d3.geoEckert5,
  d3.geoEckert6,
  d3.geoEisenlohr,
  d3.geoFahey,
  d3.geoFoucaut,
  d3.geoFoucautSinusoidal,
  d3.geoGilbert,
  d3.geoGingery,
  d3.geoGinzburg4,
  d3.geoGinzburg5,
  d3.geoGinzburg6,
  d3.geoGinzburg8,
  d3.geoGinzburg9,
  d3.geoGringorten,
  d3.geoGringortenQuincuncial,
  d3.geoGuyou,
  d3.geoHammer,
  d3.geoHammerRetroazimuthal,
  d3.geoHealpix,
  d3.geoHill,
  d3.geoHomolosine,
  d3.geoHufnagel,
  // d3.geoInterrupt, // factory of factory
  d3.geoInterruptedBoggs,
  d3.geoInterruptedHomolosine,
  d3.geoInterruptedMollweide,
  d3.geoInterruptedMollweideHemispheres,
  d3.geoInterruptedSinuMollweide,
  d3.geoInterruptedSinusoidal,
  d3.geoInterruptedQuarticAuthalic,
  d3.geoKavrayskiy7,
  d3.geoLagrange,
  d3.geoLarrivee,
  d3.geoLaskowski,
  d3.geoLittrow,
  d3.geoLoximuthal,
  d3.geoMiller,
  // d3.geoModifiedStereographic, // factory of factory
  // d3.geoModifiedStereographicAlaska, // see below
  // d3.geoModifiedStereographicGs48, // see below
  // d3.geoModifiedStereographicGs50, // see below
  // d3.geoModifiedStereographicMiller, // see below
  // d3.geoModifiedStereographicLee, // see below
  d3.geoMollweide,
  d3.geoMtFlatPolarParabolic,
  d3.geoMtFlatPolarQuartic,
  d3.geoMtFlatPolarSinusoidal,
  d3.geoNaturalEarth2,
  d3.geoNellHammer,
  d3.geoNicolosi,
  d3.geoPatterson,
  d3.geoPeirceQuincuncial,
  d3.geoPolyconic,
  d3.geoRectangularPolyconic,
  d3.geoRobinson,
  d3.geoSatellite,
  d3.geoSinuMollweide,
  d3.geoSinusoidal,
  d3.geoTimes,
  // d3.geoTwoPointAzimuthal,
  // d3.geoTwoPointAzimuthalUsa, // see below
  // d3.geoTwoPointEquidistant,
  d3.geoTwoPointEquidistantUsa,
  d3.geoVanDerGrinten,
  d3.geoVanDerGrinten2,
  d3.geoVanDerGrinten3,
  d3.geoVanDerGrinten4,
  d3.geoWagner,
  d3.geoWagner4,
  d3.geoWagner6,
  d3.geoWagner7,
  d3.geoWiechel,
  d3.geoWinkel3
]) {
  const name = factory.name;
  const projection = factory();
  it(`${name}(point) and ${name}.invert(point) are symmetric`, () => {
    for (const point of points) {
      assertProjectionEqual(projection, point, projection(point));
    }
  });
}

for (const {factory, points} of [
  {factory: d3.geoModifiedStereographicAlaska, points: [[-149.9025632,61.2150138]]},
  {factory: d3.geoModifiedStereographicGs48, points: [[-104.9833053, 39.7309179]]},
  {factory: d3.geoModifiedStereographicGs50, points: [[-104.9833053, 39.7309179]]},
  {factory: d3.geoModifiedStereographicMiller, points: [[0, 10]]},
  {factory: d3.geoModifiedStereographicLee, points: [[179, 10]]},
  {factory: d3.geoTwoPointAzimuthalUsa, points: [[-104.9833053, 39.7309179]]},
]) {
  const name = factory.name;
  const projection = factory();
  it(`${name}(point) and ${name}.invert(point) are symmetric`, () => {
    for (const point of points) {
      assertProjectionEqual(projection, point, projection(point));
    }
  });
}
