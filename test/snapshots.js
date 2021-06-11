import {Canvas} from "canvas";
import {readFile} from "fs/promises";
import {feature} from "topojson-client";
import {geoGraticule, geoPath} from "d3-geo";
import {
  geoAiry,
  geoAitoff,
  geoArmadillo,
  geoAugust,
  geoBaker,
  geoBerghaus,
  geoBertin1953,
  geoBoggs,
  geoBonne,
  geoBottomley,
  geoBromley,
  geoChamberlinAfrica,
  geoCollignon,
  geoCraig,
  geoCraster,
  geoCylindricalEqualArea,
  geoCylindricalStereographic,
  geoEckert1,
  geoEckert2,
  geoEckert3,
  geoEckert4,
  geoEckert5,
  geoEckert6,
  geoEisenlohr,
  geoFahey,
  geoFoucaut,
  geoFoucautSinusoidal,
  geoGilbert,
  geoGingery,
  geoGinzburg4,
  geoGinzburg5,
  geoGinzburg6,
  geoGinzburg8,
  geoGinzburg9,
  geoGringorten,
  geoGringortenQuincuncial,
  geoGuyou,
  geoHammer,
  geoHammerRetroazimuthal,
  geoHealpix,
  geoHill,
  geoHomolosine,
  geoHufnagel,
  geoHyperelliptical,
  geoInterruptedBoggs,
  geoInterruptedHomolosine,
  geoInterruptedMollweide,
  geoInterruptedMollweideHemispheres,
  geoInterruptedSinusoidal,
  geoInterruptedSinuMollweide,
  geoInterruptedQuarticAuthalic,
  geoKavrayskiy7,
  geoLagrange,
  geoLarrivee,
  geoLaskowski,
  geoLittrow,
  geoLoximuthal,
  geoMiller,
  geoModifiedStereographicAlaska,
  geoModifiedStereographicGs48,
  geoModifiedStereographicGs50,
  geoModifiedStereographicMiller,
  geoModifiedStereographicLee,
  geoMollweide,
  geoMtFlatPolarParabolic,
  geoMtFlatPolarQuartic,
  geoMtFlatPolarSinusoidal,
  geoNaturalEarth2,
  geoNellHammer,
  geoNicolosi,
  geoPatterson,
  geoPeirceQuincuncial,
  geoPolyconic,
  geoPolyhedralButterfly,
  geoPolyhedralCollignon,
  geoPolyhedralWaterman,
  geoRectangularPolyconic,
  geoRobinson,
  geoSatellite,
  geoSinuMollweide,
  geoSinusoidal,
  geoTimes,
  geoTwoPointAzimuthalUsa,
  geoTwoPointEquidistantUsa,
  geoVanDerGrinten,
  geoVanDerGrinten2,
  geoVanDerGrinten3,
  geoVanDerGrinten4,
  geoWagner,
  geoWagner4,
  geoWagner6,
  geoWagner7,
  geoWiechel,
  geoWinkel3
} from "../src/index.js";

const width = 960;
const height = 500;

async function renderWorld(projection, {extent, clip = false} = {}) {
  const graticule = geoGraticule();
  const outline = extent === undefined ? {type: "Sphere"} : graticule.extent(extent).outline();
  const world = JSON.parse(await readFile("./node_modules/world-atlas/world/50m.json"));
  const canvas = new Canvas(width, height);
  const context = canvas.getContext("2d");
  const path = geoPath(projection, context);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.save();
  if (clip) {
    context.beginPath();
    path(outline);
    context.clip();
  }
  context.beginPath();
  path(feature(world, world.objects.land));
  context.fillStyle = "#000";
  context.fill();
  context.beginPath();
  path(graticule());
  context.strokeStyle = "rgba(119,119,119,0.5)";
  context.stroke();
  context.restore();
  context.beginPath();
  path(outline);
  context.strokeStyle = "#000";
  context.stroke();
  return canvas;
}

export async function airy() {
  return renderWorld(geoAiry().precision(0.1));
}

export async function aitoff() {
  return renderWorld(geoAitoff().precision(0.1));
}

export async function armadillo() {
  return renderWorld(geoArmadillo().precision(0.1), {clip: true});
}

export async function august() {
  return renderWorld(geoAugust().precision(0.1));
}

export async function baker() {
  return renderWorld(geoBaker().precision(0.1));
}

export async function berghaus() {
  return renderWorld(geoBerghaus().precision(0.1), {clip: true});
}

export async function bertin1953() {
  return renderWorld(geoBertin1953().precision(0.1));
}

export async function boggs() {
  return renderWorld(geoBoggs().precision(0.1));
}

export async function bonne() {
  return renderWorld(geoBonne().precision(0.1));
}

export async function bottomley() {
  return renderWorld(geoBottomley().precision(0.1));
}

export async function bromley() {
  return renderWorld(geoBromley().precision(0.1));
}

export async function chamberlinAfrica() {
  return renderWorld(geoChamberlinAfrica().precision(0.1));
}

export async function collignon() {
  return renderWorld(geoCollignon().precision(0.1));
}

export async function craig() {
  return renderWorld(geoCraig().precision(0.1));
}

export async function craster() {
  return renderWorld(geoCraster().precision(0.1));
}

export async function cylindricalEqualArea() {
  return renderWorld(geoCylindricalEqualArea().precision(0.1));
}

export async function cylindricalStereographic() {
  return renderWorld(geoCylindricalStereographic().precision(0.1));
}

export async function eckert1() {
  return renderWorld(geoEckert1().precision(0.1));
}

export async function eckert2() {
  return renderWorld(geoEckert2().precision(0.1));
}

export async function eckert3() {
  return renderWorld(geoEckert3().precision(0.1));
}

export async function eckert4() {
  return renderWorld(geoEckert4().precision(0.1));
}

export async function eckert5() {
  return renderWorld(geoEckert5().precision(0.1));
}

export async function eckert6() {
  return renderWorld(geoEckert6().precision(0.1));
}

export async function eisenlohr() {
  return renderWorld(geoEisenlohr().precision(0.1));
}

export async function fahey() {
  return renderWorld(geoFahey().precision(0.1));
}

export async function foucaut() {
  return renderWorld(geoFoucaut().precision(0.1));
}

export async function foucautSinusoidal() {
  return renderWorld(geoFoucautSinusoidal().precision(0.1));
}

export async function gilbert() {
  return renderWorld(geoGilbert().precision(0.1));
}

export async function gingery() {
  return renderWorld(geoGingery().precision(0.1), {clip: true});
}

export async function ginzburg4() {
  return renderWorld(geoGinzburg4().precision(0.1));
}

export async function ginzburg5() {
  return renderWorld(geoGinzburg5().precision(0.1));
}

export async function ginzburg6() {
  return renderWorld(geoGinzburg6().precision(0.1));
}

export async function ginzburg8() {
  return renderWorld(geoGinzburg8().precision(0.1));
}

export async function ginzburg9() {
  return renderWorld(geoGinzburg9().precision(0.1));
}

export async function gringorten() {
  return renderWorld(geoGringorten().precision(0.1));
}

export async function gringortenQuincuncial() {
  return renderWorld(geoGringortenQuincuncial().precision(0.1));
}

export async function guyou() {
  return renderWorld(geoGuyou().precision(0.1));
}

export async function hammer() {
  return renderWorld(geoHammer().precision(0.1));
}

export async function hammerRetroazimuthal() {
  return renderWorld(geoHammerRetroazimuthal().precision(0.1), {clip: true});
}

export async function healpix() {
  return renderWorld(geoHealpix().precision(0.1), {clip: true});
}

export async function hill() {
  return renderWorld(geoHill().precision(0.1));
}

export async function homolosine() {
  return renderWorld(geoHomolosine().precision(0.1));
}

export async function hufnagel() {
  return renderWorld(geoHufnagel().precision(0.1));
}

export async function hyperelliptical() {
  return renderWorld(geoHyperelliptical().precision(0.1));
}

export async function interruptedBoggs() {
  return renderWorld(geoInterruptedBoggs().precision(0.1), {clip: true});
}

export async function interruptedHomolosine() {
  return renderWorld(geoInterruptedHomolosine().precision(0.1), {clip: true});
}

export async function interruptedMollweide() {
  return renderWorld(geoInterruptedMollweide().precision(0.1), {clip: true});
}

export async function interruptedMollweideHemispheres() {
  return renderWorld(geoInterruptedMollweideHemispheres().precision(0.1), {clip: true});
}

export async function interruptedSinusoidal() {
  return renderWorld(geoInterruptedSinusoidal().precision(0.1), {clip: true});
}

export async function interruptedSinuMollweide() {
  return renderWorld(geoInterruptedSinuMollweide().precision(0.1), {clip: true});
}

export async function interruptedQuarticAuthalic() {
  return renderWorld(geoInterruptedQuarticAuthalic().precision(0.1), {clip: true});
}

export async function kavrayskiy7() {
  return renderWorld(geoKavrayskiy7().precision(0.1));
}

export async function lagrange() {
  return renderWorld(geoLagrange().precision(0.1));
}

export async function larrivee() {
  return renderWorld(geoLarrivee().precision(0.1));
}

export async function laskowski() {
  return renderWorld(geoLaskowski().precision(0.1));
}

export async function littrow() {
  return renderWorld(geoLittrow().precision(0.1), {extent: [[-90, -60], [90, 60]], clip: true});
}

export async function loximuthal() {
  return renderWorld(geoLoximuthal().precision(0.1));
}

export async function miller() {
  return renderWorld(geoMiller().precision(0.1));
}

export async function modifiedStereographicAlaska() {
  return renderWorld(geoModifiedStereographicAlaska().precision(0.1));
}

export async function modifiedStereographicGs48() {
  return renderWorld(geoModifiedStereographicGs48().precision(0.1));
}

export async function modifiedStereographicGs50() {
  return renderWorld(geoModifiedStereographicGs50().precision(0.1), {extent: [[-180, 15], [-50, 75]], clip: true});
}

export async function modifiedStereographicMiller() {
  return renderWorld(geoModifiedStereographicMiller().precision(0.1), {extent: [[-40, -40], [80, 80]], clip: true});
}

export async function modifiedStereographicLee() {
  return renderWorld(geoModifiedStereographicLee().precision(0.1));
}

export async function mollweide() {
  return renderWorld(geoMollweide().precision(0.1));
}

export async function mtFlatPolarParabolic() {
  return renderWorld(geoMtFlatPolarParabolic().precision(0.1));
}

export async function mtFlatPolarQuartic() {
  return renderWorld(geoMtFlatPolarQuartic().precision(0.1));
}

export async function mtFlatPolarSinusoidal() {
  return renderWorld(geoMtFlatPolarSinusoidal().precision(0.1));
}

export async function naturalEarth2() {
  return renderWorld(geoNaturalEarth2().precision(0.1));
}

export async function nellHammer() {
  return renderWorld(geoNellHammer().precision(0.1));
}

export async function nicolosi() {
  return renderWorld(geoNicolosi().precision(0.1));
}

export async function patterson() {
  return renderWorld(geoPatterson().precision(0.1));
}

export async function peirceQuincuncial() {
  return renderWorld(geoPeirceQuincuncial().precision(0.1));
}

export async function polyconic() {
  return renderWorld(geoPolyconic().precision(0.1));
}

export async function polyhedralButterfly() {
  return renderWorld(geoPolyhedralButterfly().precision(0.1), {clip: true});
}

export async function polyhedralCollignon() {
  return renderWorld(geoPolyhedralCollignon().precision(0.1), {clip: true});
}

export async function polyhedralWaterman() {
  return renderWorld(geoPolyhedralWaterman().precision(0.1), {clip: true});
}

export async function rectangularPolyconic() {
  return renderWorld(geoRectangularPolyconic().precision(0.1));
}

export async function robinson() {
  return renderWorld(geoRobinson().precision(0.1));
}

export async function satellite() {
  return renderWorld(geoSatellite().precision(0.1));
}

export async function sinuMollweide() {
  return renderWorld(geoSinuMollweide().precision(0.1));
}

export async function sinusoidal() {
  return renderWorld(geoSinusoidal().precision(0.1));
}

export async function times() {
  return renderWorld(geoTimes().precision(0.1));
}

export async function twoPointAzimuthalUsa() {
  return renderWorld(geoTwoPointAzimuthalUsa().precision(0.1));
}

export async function twoPointEquidistantUsa() {
  return renderWorld(geoTwoPointEquidistantUsa().precision(0.1));
}

export async function vanDerGrinten() {
  return renderWorld(geoVanDerGrinten().precision(0.1));
}

export async function vanDerGrinten2() {
  return renderWorld(geoVanDerGrinten2().precision(0.1));
}

export async function vanDerGrinten3() {
  return renderWorld(geoVanDerGrinten3().precision(0.1));
}

export async function vanDerGrinten4() {
  return renderWorld(geoVanDerGrinten4().precision(0.1));
}

export async function wagner() {
  return renderWorld(geoWagner().precision(0.1));
}

export async function wagner4() {
  return renderWorld(geoWagner4().precision(0.1));
}

export async function wagner6() {
  return renderWorld(geoWagner6().precision(0.1));
}

export async function wagner7() {
  return renderWorld(geoWagner7().precision(0.1));
}

export async function wiechel() {
  return renderWorld(geoWiechel().precision(0.1));
}

export async function winkel3() {
  return renderWorld(geoWinkel3().precision(0.1));
}
