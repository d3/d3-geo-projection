var fs = require("fs");

function handleEpipe(error) {
  if (error.code === "EPIPE" || error.errno === "EPIPE") {
    process.exit(0);
  }
}

module.exports = function(options) {
  var output = (options.out === "-" ? process.stdout : fs.createWriteStream(options.out)).on("error", handleEpipe),
      queue = Promise.resolve();
  return {
    write: function(data) {
      return queue = queue.then(function() {
        return new Promise(function(resolve, reject) {
          output.write(data, function(error) {
            if (error) reject(error);
            else resolve();
          });
        });
      });
    },
    end: function() {
      if (output === process.stdout) return queue;
      return queue = queue.then(function() {
        return new Promise(function(resolve, reject) {
          output.end(function(error) {
            if (error) reject(error);
            else resolve();
          });
        });
      });
    }
  };
};
