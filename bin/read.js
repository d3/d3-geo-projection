var fs = require("fs"),
    readline = require("readline");

module.exports = function(options, callback) {
  var index = -1,
      input = options.in === "-" ? process.stdin : fs.createReadStream(options.in);

  function readObject() {
    return new Promise(function(resolve, reject) {
      var data = [];
      input
          .on("data", function(d) { data.push(d); })
          .on("end", function() { resolve(JSON.parse(Buffer.concat(data))); })
          .on("error", reject);
    });
  }

  function readNewlineDelimitedObjects() {
    return new Promise(function(resolve, reject) {
      var queue = Promise.resolve();
      readline.createInterface({
        input: input,
        output: null
      }).on("line", function(line) {
        queue = queue.then(function() { return callbackObject(JSON.parse(line)); });
      }).on("close", function() {
        queue.then(function() { resolve(); }, reject);
      }).on("error", reject);
    });
  }

  function callbackObject(object) {
    return callback(object, ++index);
  }

  return options.newlineDelimited
      ? readNewlineDelimitedObjects()
      : readObject().then(callbackObject);
};
