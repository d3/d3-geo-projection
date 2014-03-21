function europeAtlantic() {
  var europeAtlantic, europe, europePoint, atlantic, atlanticPoint, point, pointStream;
  europeAtlantic = {};
  europe = d3.geo.equirectangular()
    .center([3.5, 54]);
  atlantic = d3.geo.equirectangular()
    .center([-45, 74]);
  pointStream = function(x, y) {
    point = [x, y];
  };

  europeAtlantic.stream = function(stream) {
    var europeStream = europe.stream(stream), atlanticStream = atlantic.stream(stream);
    return {
      point: function(x, y) {
        europeStream.point(x, y);
        atlanticStream.point(x, y);
      },
      sphere: function() {
        europeStream.sphere();
        atlanticStream.sphere();
      },
      lineStart: function() {
        europeStream.lineStart();
        atlanticStream.lineStart();
      },
      lineEnd: function() {
        europeStream.lineEnd();
        atlanticStream.lineEnd();
      },
      polygonStart: function() {
        europeStream.polygonStart();
        atlanticStream.polygonStart();
      },
      polygonEnd: function() {
        europeStream.polygonEnd();
        atlanticStream.polygonEnd();
      }
    };
  };

  europeAtlantic.scale = function(_) {
    if (!arguments.length) return europe.scale();
    europe.scale(_);
    atlantic.scale(_ * 0.45);
    return europeAtlantic.translate(europe.translate());
  };

  europeAtlantic.translate = function(_) {
    var k, x, y;
    if (!arguments.length) return europe.translate();

    k = europe.scale();
    x = +_[0];
    y = +_[1];
    europePoint = europe
      .translate(_)
      .clipExtent([
        [x - 0.29 * k, y - 0.334 * k],
        [x + 0.675 * k, y + 0.334 * k]
      ])
      .stream(pointStream).point;
    atlanticPoint = atlantic
      .translate([x - 0.45 * k, y - 0.25 * k])
      .clipExtent([[x - 0.67 * k, 0], [x - 0.17 * k, y - 0.134 * k]])
      .stream(pointStream).point;
    return europeAtlantic;
  };

  return europeAtlantic.scale(700);
}

d3.geo.europeAtlantic = europeAtlantic;
