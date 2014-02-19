  return d3;
}

if (typeof define === "function" && define.amd) {
  define(["d3"], init);
} else {
  init(typeof module === "object" && module.exports ? module.exports = require("d3") : d3);
}

}();
