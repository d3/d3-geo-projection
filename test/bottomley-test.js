var vows = require("vows"),
    assert = require("./assert"),
    load = require("./load");

var suite = vows.describe("d3.geo.bottomley");

suite.addBatch({
  "bottomley": {
    topic: load("bottomley"),
    "1/2 fraction": {
      topic: function(geo) {
        return geo.bottomley();
      },
      "projections and inverse projections": function(bottomley) {
        assert.equalInverse(bottomley, [ 0, 0 ], [ 480, 250 ] );
        assert.equalInverse(bottomley, [ 0, -90 ], [ 480, 485.619449 ] );
        assert.equalInverse(bottomley, [ 0, 89 ], [ 480, 16.998544 ] );
        assert.equalInverse(bottomley, [ 0, -45 ], [ 480, 367.809724 ] );
        assert.equalInverse(bottomley, [ 0, 45 ], [ 480, 132.190275 ] );
        assert.equalInverse(bottomley, [ -160, 0 ], [ 110.025258, 169.475727 ] );
        assert.equalInverse(bottomley, [ 150, 0 ], [ 832.2252893, 178.699955 ] );
        assert.equalInverse(bottomley,  [ -179, 15 ], [ 114.036038, 102.525733 ] );
        assert.equalInverse(bottomley,  [ 1, 1 ] , [ 482.617582, 247.378627 ] );
      }
    }
  }
});

suite.export(module);
