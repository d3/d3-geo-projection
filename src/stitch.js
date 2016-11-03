var epsilon = 1e-4,
    epsilonInverse = 1e4,
    x0 = -180, x0e = x0 + epsilon,
    x1 = 180, x1e = x1 - epsilon,
    y0 = -90, y0e = y0 + epsilon,
    y1 = 90, y1e = y1 - epsilon;

function quantize(x) {
  return Math.floor(x * epsilonInverse) / epsilonInverse;
}

function normalizePoint(y) {
  return y === y0 || y === y1
      ? [0, y] // pole
      : [x0, quantize(y)]; // antimeridian
}

function clampPoint(p) {
  if (p[0] <= x0e) p[0] = x0;
  else if (p[0] >= x1e) p[0] = x1;
  if (p[1] <= y0e) p[1] = y0;
  else if (p[1] >= y1e) p[1] = y1;
}

function clampPoints(points) {
  points.forEach(clampPoint);
}

// For each ring, detect where it crosses the antimeridian or pole.
function extractFragments(polygon, fragments) {
  for (var j = 0, m = polygon.length; j < m; ++j) {
    var ring = polygon[j];
    ring.polygon = polygon;

    // By default, assume that this ring doesn’t need any stitching.
    fragments.push(ring);

    for (var i = 0, n = ring.length; i < n; ++i) {
      var point = ring[i],
          x = point[0],
          y = point[1];

      // If this is an antimeridian or polar point…
      if (x <= x0e || x >= x1e || y <= y0e || y >= y1e) {
        clampPoint(point);

        // Advance through any antimeridian or polar points…
        for (var k = i + 1; k < n; ++k) {
          var pointk = ring[k],
              xk = pointk[0],
              yk = pointk[1];
          if (xk > x0e && xk < x1e && yk > y0e && yk < y1e) break;
        }

        // If this was just a single antimeridian or polar point,
        // we don’t need to cut this ring into a fragment;
        // we can just leave it as-is.
        if (k === i + 1) continue;

        // Otherwise, if this is not the first point in the ring,
        // cut the current fragment so that it ends at the current point.
        // The current point is also normalized for later joining.
        if (i) {
          var fragmentBefore = ring.slice(0, i + 1);
          fragmentBefore.polygon = polygon;
          fragmentBefore[fragmentBefore.length - 1] = normalizePoint(y);
          fragments[fragments.length - 1] = fragmentBefore;
        }

        // If the ring started with an antimeridian fragment,
        // we can ignore that fragment entirely.
        else fragments.pop();

        // If the remainder of the ring is an antimeridian fragment,
        // move on to the next ring.
        if (k >= n) break;

        // Otherwise, add the remaining ring fragment and continue.
        fragments.push(ring = ring.slice(k - 1));
        ring[0] = normalizePoint(ring[0][1]);
        ring.polygon = polygon;
        i = -1;
        n = ring.length;
      }
    }
  }
  polygon.length = 0;
}

// Now stitch the fragments back together into rings.
// TODO remove empty polygons.
function stitchFragments(fragments) {
  var i, n = fragments.length;

  // To connect the fragments start-to-end, create a simple index by end.
  var fragmentByStart = {},
      fragmentByEnd = {},
      fragment,
      start,
      startFragment,
      end,
      endFragment;

  // For each fragment…
  for (i = 0; i < n; ++i) {
    fragment = fragments[i];
    start = fragment[0];
    end = fragment[fragment.length - 1];

    // If this fragment is closed, add it as a standalone ring.
    if (start[0] === end[0] && start[1] === end[1]) {
      fragment.polygon.push(fragment);
      fragments[i] = null;
      continue;
    }

    fragment.index = i;
    fragmentByStart[start] = fragmentByEnd[end] = fragment;
  }

  // For each open fragment…
  for (i = 0; i < n; ++i) {
    fragment = fragments[i];
    if (fragment) {
      start = fragment[0];
      end = fragment[fragment.length - 1];
      startFragment = fragmentByEnd[start];
      endFragment = fragmentByStart[end];

      delete fragmentByStart[start];
      delete fragmentByEnd[end];

      // If this fragment is closed, add it as a standalone ring.
      if (start[0] === end[0] && start[1] === end[1]) {
        fragment.polygon.push(fragment);
        continue;
      }

      if (startFragment) {
        delete fragmentByEnd[start];
        delete fragmentByStart[startFragment[0]];
        startFragment.pop(); // drop the shared coordinate
        fragments[startFragment.index] = null;
        fragment = startFragment.concat(fragment);
        fragment.polygon = startFragment.polygon;

        if (startFragment === endFragment) {
          // Connect both ends to this single fragment to create a ring.
          fragment.polygon.push(fragment);
        } else {
          fragment.index = n++;
          fragments.push(fragmentByStart[fragment[0]] = fragmentByEnd[fragment[fragment.length - 1]] = fragment);
        }
      } else if (endFragment) {
        delete fragmentByStart[end];
        delete fragmentByEnd[endFragment[endFragment.length - 1]];
        fragment.pop(); // drop the shared coordinate
        fragment = fragment.concat(endFragment);
        fragment.polygon = endFragment.polygon;
        fragment.index = n++;
        fragments[endFragment.index] = null;
        fragments.push(fragmentByStart[fragment[0]] = fragmentByEnd[fragment[fragment.length - 1]] = fragment);
      } else {
        fragment.push(fragment[0]); // close ring
        fragment.polygon.push(fragment);
      }
    }
  }
}

function stitchFeature(o) {
  stitchGeometry(o.geometry);
}

function stitchGeometry(o) {
  if (!o) return;
  var fragments, i, n;

  switch (o.type) {
    case "GeometryCollection": {
      o.geometries.forEach(stitchGeometry);
      return;
    }
    case "Point": {
      clampPoint(o.coordinates);
      break;
    }
    case "MultiPoint":
    case "LineString": {
      clampPoints(o.coordinates);
      break;
    }
    case "MultiLineString": {
      o.coordinates.forEach(clampPoints);
      break;
    }
    case "Polygon": {
      extractFragments(o.coordinates, fragments = []);
      break;
    }
    case "MultiPolygon": {
      fragments = [], i = -1, n = o.coordinates.length;
      while (++i < n) extractFragments(o.coordinates[i], fragments);
      break;
    }
    default: return;
  }

  stitchFragments(fragments);
}

export default function(o) {
  if (o) switch (o.type) {
    case "Feature": stitchFeature(o); break;
    case "FeatureCollection": o.features.forEach(stitchFeature); break;
    default: stitchGeometry(o); break;
  }
  return o;
}
