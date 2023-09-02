import {geoProjection as projection} from "d3-geo";
import {sqrt, sign, cos, sin, tan, atan, atan2, hypot, halfPi} from "../math.js";
  

function reval(nodes, values, weights) {
  const n = nodes.length;

  return function reval(x, y) {

    // running total for numerator & denominator
    let px = 0, py = 0, qx = 0, qy = 0;

    for (let j = 0; j < n; j += 2) {
      // q += w_j / (z - z_j)
      // p += f_j * w_j / (z - z_j)
      const xj = x - nodes[j], yj = nodes[j+1] - y,
            wxj = weights[j], wyj = weights[j+1],
            fxj = values[j], fyj = values[j+1],
            dj = 1 / (xj*xj + yj*yj),
            qxj = dj * (wxj*xj - wyj*yj),
            qyj = dj * (wxj*yj + wyj*xj);
      px += fxj * qxj - fyj * qyj;
      py += fxj * qyj + fyj * qxj;
      qx += qxj, qy += qyj;
    }

    let d = 1 / (qx * qx + qy * qy),
        fx = (px * qx + py * qy) * d,
        fy = (py * qx - px * qy) * d;

    // Edge case where x + iy is one of the nodes; directly use value
    if (fx + fy !== fx + fy) { // true if x or y is NaN
      for (let j = 0; j < n; j += 2) {
        const xj = x - nodes[j], yj = nodes[j+1] - y;
        if ((xj === 0) & (yj === 0)) {
          fx = values[j]; fy = values[j+1];
          break;
        }
      }
    }

    const z = new Float64Array(2); z[0] = fx; z[1] = fy;
    return z;
  };

}

const qmap = reval(new Float64Array([
   2.841274295607302e-01,  0.000000000000000e+00,
   9.000701021270673e-01,  4.357451218969299e-01,
   8.307448759221154e-01,  0.000000000000000e+00,
   6.627533478425493e-02,  0.000000000000000e+00,
   7.867241040676948e-01,  6.173047740613080e-01,
   2.091012105576087e-01,  2.091012105576087e-01,
   9.908979498340043e-01,  1.346152035052754e-01,
   5.831630651834322e-01,  0.000000000000000e+00,
   5.823169918190614e-01,  5.823169918190614e-01,
   4.600717751287283e-01,  4.600717751287283e-01,
   1.175386486186337e-02,  1.175386486186337e-02
]), new Float64Array([
   6.133041957206595e-01,  0.000000000000000e+00,
   0.000000000000000e+00, -2.697288123328281e-01,
   1.073938602151508e-01,  0.000000000000000e+00,
   9.014510181710358e-01,  0.000000000000000e+00,
   2.775557561562891e-17, -4.121942774638293e-01,
   6.812551737310080e-01, -2.679456941323670e-01,
   6.938893903907228e-18, -7.874961347414625e-02,
   3.022540859025502e-01,  0.000000000000000e+00,
   1.462888136479623e-01, -4.892997915007359e-01,
   3.098769525555705e-01, -4.519881371374364e-01,
   9.820692497723584e-01, -1.776999432577847e-02
]), new Float64Array([
  -1.636735245315600e-01,  0.000000000000000e+00,
   4.576711314447485e-01,  2.606917127959570e-01,
   6.218685503420178e-02, -4.555806628111250e-01,
  -1.381933609058136e-02,  4.276799650123018e-02,
  -4.937289564091346e-02,  2.051307665996611e-01,
   1.469711063375004e-02,  8.532858482953236e-02,
   3.617212217993757e-01, -3.977678831392779e-02,
  -3.557001195121915e-01, -2.900841369992467e-01,
  -1.172277719642794e-01,  1.668340930233777e-01,
  -2.096148398952382e-01,  3.730691188900302e-02,
   1.313037843108833e-02, -1.261985295194955e-02
]));

const qimap = reval(new Float64Array([
   3.812877943853064e-01, -4.273098089263941e-01,
   5.862237343389646e-01,  0.000000000000000e+00,
  -1.387778780781446e-17, -1.136995103524485e-01,
   8.606531239202513e-01, -1.296381001431562e-01,
   1.486522213141997e-01, -4.889512585491770e-01,
   0.000000000000000e+00, -4.823196777396260e-01,
   2.870951833595923e-01,  0.000000000000000e+00,
   9.988582417584706e-01,  0.000000000000000e+00
]), new Float64Array([
   4.100042032428683e-01,  4.100042032428683e-01,
   3.069627780283768e-01,  0.000000000000000e+00,
   9.811562764314339e-01,  1.932158410151805e-01,
   9.134642598181811e-02,  9.134642598181811e-02,
   5.804469590593406e-01,  5.804469590593406e-01,
   7.234467769137209e-01,  6.903801568506648e-01,
   6.003103515806268e-01,  0.000000000000000e+00,
   7.486527117271623e-04,  0.000000000000000e+00
]), new Float64Array([
  -4.890921447242968e-01,  0.000000000000000e+00,
   1.202130864468549e-01, -5.417179517038786e-01,
   7.026464276190582e-02,  9.713636303667084e-02,
  -2.352682166111389e-01,  1.787326777655438e-01,
  -2.036311348372837e-02,  3.592547702079886e-01,
   1.050424248615412e-01, -4.007475368880814e-02,
   4.463703363841267e-01,  3.820014896672286e-02,
   2.833107518816005e-03, -9.153116096530403e-02,
]));

const k = 0.7627597635018135;  // forward map derivative at the origin
const kk = 1 / k;
  
function stereo_quincuncial(x, y) {
  
  // ********** DOMAIN REDUCTION
  
  const sx = sign(x) || sign(1/x); // -0 -> -1; +0 -> +1
  const sy = sign(y) || sign(1/y);

  const r2 = x*x + y*y;
  // short circuit for points near the poles
  if (r2 > 1e8) {
    const z = new Float64Array(2);
    if (r2 === 0) {z[0] = sx; z[1] = sy}
    else {z[0] = sx - y * (k/r2); z[1] = sy - x * (k/r2)}
    return z;
  }
  if (r2 < 1e-8) {
    const z = new Float64Array(2);
    z[0] = k*x; z[1] = k*y;
    return z
  }

  x *= sx; y *= sy; // reflect into positive quadrant

  const rbig = r2 > 1;
  if (rbig) { const d = 1/r2; x *= d; y *= d; } // invert across unit circle
  const ybig = y > x;
  if (ybig) { const t = x; x = y; y = t; } // reflect across line y = x
  
  // ********** MAP FUNDAMENTAL PIE SLICE
  
  const z = qmap(x, y); // apply rational approximation
  x = z[0]; y = z[1];
  // at this point, x + iy == (1 - z)^2, where z is the
  // output in the triangle with vertices [0, 1, (1+i)/2]

  // x + iy = 1 - complex_sqrt(x + iy)
  { const r = sqrt(x*x + y*y);
    y = sqrt(0.5 * (r - x));
    x = 1 - sqrt(0.5 * (r + x));
  }
  
  y *= (y >= 0); // don’t let the projection out of bounds
  
  // ********** REFLECT ACCORDING TO EARLIER DOMAIN REDUCTIONS
  
  if (ybig) { const t = x; x = y; y = t; }
  if (rbig) { const t = x; x = 1 - y; y = 1 - t; }
  z[0] = x * sx; z[1] = y * sy; // re-use array z
  return z;
}


stereo_quincuncial.invert = function stereo_quincuncial_inverse(x, y) {

  // ********** DOMAIN REDUCTION
  
  // reduce areas outside [-1, 1] square and reflect to positive quadrant
  const xg = Math.round(0.5*x);
  const yg = Math.round(0.5*y);
  x -= 2*xg; y -= 2*yg;
  
  let sx = sign(x) || sign(1/x);
  let sy = sign(y) || sign(1/y);
  
  x *= sx; y *= sy;
  const g = 2 * ((xg + yg) & 1);
  sx *= 1 - g; sy *= 1 - g;
  
  const rbig = x + y > 1;
  if (rbig) { const t = x; x = 1 - y; y = 1 - t; } // invert across line x + y = 1

  const ybig = y > x;
  if (ybig) { let t = x; x = y; y = t; } // reflect across line y = x
  
  // short circuit for points near the poles
  let z;
  if (x + y < 1e-4) {
    x *= kk; y *= kk;
    z = new Float64Array(2);
  } else {
    
    // ********** MAP FUNDAMENTAL ISOCELES RIGHT TRIANGLE
    
    // x + iy = (1 - x - iy)^2
    { const a = 1 - x;
      x = a*a - y*y;
      y = -2*a*y;
    }
    z = qimap(x, y); // apply rational approximation
    x = z[0]; y = z[1];
  }
  
  // ********** REFLECT ACCORDING TO EARLIER DOMAIN REDUCTIONS
  
  if (ybig) { const t = x; x = y; y = t; }
  if (rbig) {
    const r = 1 / (x*x + y*y);
    if (r === Infinity) {x = y = 1;}
    x *= r; y *= r;
  }
  z[0] = x * sx; z[1] = y * sy; // re-use array z
  return z;
};
  

function quincuncial(longitude, latitude) {
  let x, y;
  
  // stereographic projection with north pole at the origin
  { const r = tan(0.5 * (halfPi - latitude));
    x = cos(longitude) * r;
    y = sin(longitude) * r;
  }

  return stereo_quincuncial(x, y)
}

quincuncial.invert = function quincuncial_inverse(x, y) {
  const z = stereo_quincuncial.invert(x, y);
  x = z[0]; y = z[1];
  
  // invert stereographic projection
  const longitude = atan2(y, x);
  const latitude = - 2 * atan(hypot(x, y)) + halfPi;

  z[0] = longitude, z[1] = latitude;
  return z;
};

export default function() {
  const p = projection(quincuncial),
    projectionStream = p.stream;

  p.stream = function(stream) {
    var rotateStream = projectionStream(stream);
    rotateStream.sphere = function() {
      var p0 = p.translate(), s = p.scale();
      stream.polygonStart();
      stream.lineStart();
      stream.point(p0[0] + s, p0[1] - s); // top-right
      stream.point(p0[0] - s, p0[1] - s); // top-left
      stream.point(p0[0] - s, p0[1] + s); // bottom-left
      stream.point(p0[0] + s, p0[1] + s); // bottom-right
      stream.lineEnd();
      stream.polygonEnd();
    };
    return rotateStream;
  };

  return p
    .rotate([25, 0, 0])
    .scale(249.5)
    .center([0, 90])
    .precision(0.05);
}
