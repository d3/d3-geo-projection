var globals = ["d3"],
    globalValues = {};

globals.forEach(function(g) {
  if (g in global) globalValues[g] = global[g];
});

global.d3 = require("d3");
require("./d3.geo.projection");
module.exports = d3.geo;

globals.forEach(function(g) {
  if (g in globalValues) global[g] = globalValues[g];
  else delete global[g];
});
