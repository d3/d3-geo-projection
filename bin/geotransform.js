var fs = require("fs"),
    readline = require("readline"),
    commander = require("commander");

module.exports = function(transform) {
  var input = commander.in === "-" ? process.stdin : fs.createReadStream(commander.in),
      output = commander.out === "-" ? process.stdout : fs.createWriteStream(commander.out);

  output.on("error", function(error) {
    if (error.code === "EPIPE" || error.errno === "EPIPE") {
      process.exit(0);
    }
  });

  if (commander.newlineDelimited) readWriteNewlineDelimitedObjects().then(end);
  else readObject().then(writeObject).then(end);

  function readObject() {
    return new Promise(function(resolve, reject) {
      var data = [];
      input
          .on("data", function(d) { data.push(d); })
          .on("end", function() { resolve(JSON.parse(Buffer.concat(data))); })
          .on("error", reject);
    });
  }

  function readWriteNewlineDelimitedObjects() {
    return new Promise(function(resolve, reject) {
      var write = Promise.resolve();
      readline.createInterface({
        input: input,
        output: null
      }).on("line", function(line) {
        write = write.then(function() { return writeObject(JSON.parse(line)); });
      }).on("close", function() {
        write.then(resolve, reject);
      }).on("error", reject);
    });
  }

  function writeObject(object) {
    return new Promise(function(resolve, reject) {
      output.write(JSON.stringify(transform(object)) + "\n", function(error) {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  function end() {
    if (output !== process.stdout) {
      output.end();
    }
  }
};
