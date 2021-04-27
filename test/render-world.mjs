#!/usr/bin/env node

import {readFileSync} from "fs";
import * as topojson from "topojson-client";
import {Canvas} from "canvas";
import * as d3 from "d3-geo";
import * as d3_geo_projection from "../src/index.js";

const width = 960,
    height = 500,
    projectionName = process.argv[2],
    projectionSymbol = "geo" + projectionName[0].toUpperCase() + projectionName.slice(1);

if (!/^[a-z0-9]+$/i.test(projectionName)) throw new Error;

const canvas = new Canvas(width, height),
    context = canvas.getContext("2d");

const world = JSON.parse(readFileSync("node_modules/world-atlas/world/50m.json"));
let graticule = d3.geoGraticule();
let outline = {type: "Sphere"};

const projection = (projectionSymbol == 'geoAngleorient30')
  ? d3.geoEquirectangular().clipAngle(90).angle(-30).precision(0.1).fitExtent([[0,0],[width,height]], {type:"Sphere"})
  : d3_geo_projection[projectionSymbol]().precision(0.1);

const path = d3.geoPath()
    .projection(projection)
    .context(context);

switch (projectionName) {
  case "littrow": outline = graticule.extent([[-90, -60], [90, 60]]).outline(); break;
  case "modifiedStereographicGs50": outline = graticule.extent([[-180, 15], [-50, 75]]).outline(); break;
  case "modifiedStereographicMiller": outline = graticule.extent([[-40, -40], [80, 80]]).outline(); break;
}

context.fillStyle = "#fff";
context.fillRect(0, 0, width, height);
context.save();

switch (projectionName) {
  case "armadillo":
  case "berghaus":
  case "gingery":
  case "hammerRetroazimuthal":
  case "healpix":
  case "interruptedBoggs":
  case "interruptedHomolosine":
  case "interruptedSinusoidal":
  case "interruptedSinuMollweide":
  case "interruptedMollweide":
  case "interruptedMollweideHemispheres":
  case "interruptedQuarticAuthalic":
  case "littrow":
  case "modifiedStereographicGs50":
  case "modifiedStereographicMiller":
  case "polyhedralButterfly":
  case "polyhedralWaterman":
  case "polyhedralCollignon": {
    context.beginPath();
    path(outline);
    context.clip();
    break;
  }
}

context.beginPath();
path(topojson.feature(world, world.objects.land));
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

canvas.pngStream().pipe(process.stdout);
