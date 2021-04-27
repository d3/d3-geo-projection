#!/usr/bin/env node

const width = 960 - 1,
    height = 500 - 1,
    projectionName = process.argv[2],
    projectionSymbol = "geo" + projectionName[0].toUpperCase() + projectionName.slice(1);

if (!/^[a-z0-9]+$/i.test(projectionName)) throw new Error;

import * as topojson from "topojson-client";
import * as d3 from "d3-geo";
import * as d3_geo_projection from "../src/index.js";
import * as d3_format from "d3-format";

var formatNumber = d3_format.format(".6");

var projection = d3_geo_projection[projectionSymbol]()
    .precision(0.01)
    .scale(1)
    .translate([0, 0])
    .center([0, 0]);

if (projection.rotate) projection.rotate([0, 0]);

var land = {type: "Sphere"};

switch (projectionName) {
  case "conicConformal":
  case "stereographic": {
    projection.clipAngle(90);
    break;
  }
}

var path = d3.geoPath()
    .projection(projection);

var bounds = path.bounds(land),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    cx = (bounds[1][0] + bounds[0][0]) / 2,
    cy = (bounds[1][1] + bounds[0][1]) / 2,
    scale = Math.min(width / dx, height / dy);

console.log(`d3.${projectionSymbol}()
    .scale(${formatNumber(scale)})
    .center([${(projection.invert ? projection.angle(0).invert([cx, cy]) : [0, 0]).map(formatNumber).join(", ")}]);
`);
