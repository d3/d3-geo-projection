module.exports = function(d3) {
  // Save pre-existing global.
  var original = {};
  if ("d3" in global) original.d3 = global.d3;

  global.d3 = d3;
  require("./d3.geo.projection.js");

  // Restore pre-existing global.
  if ("d3" in original) global.d3 = original.d3; else delete global.d3;
};



