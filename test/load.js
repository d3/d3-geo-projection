var smash = require("smash"),
    d3 = require("d3");

module.exports = function() {
  var files = [].slice.call(arguments),
      sandbox = {d3: d3};
  files.unshift("start");
  files.push("end");

  function topic() {
    smash.load(files, "d3.geo", sandbox, this.callback);
  }

  topic.sandbox = function(_) {
    sandbox = _;
    return topic;
  };

  return topic;
};
