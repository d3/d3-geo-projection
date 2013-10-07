import "projection";

function mollweideBromleyθ(Cp) {
  return function(θ) {
    var Cpsinθ = Cp * Math.sin(θ),
        i = 30, δ;
    do θ -= δ = (θ + Math.sin(θ) - Cpsinθ) / (1 + Math.cos(θ));
    while (Math.abs(δ) > ε && --i > 0);
    return θ / 2;
  };
}

function mollweideBromley(Cx, Cy, Cp) {
  var θgen = mollweideBromleyθ(Cp);

  function forward(λ, φ) {
    var θ = θgen(φ);
    return [
      Cx * λ * Math.cos(θ),
      Cy * Math.sin(θ)
    ];
  }
  
  forward.tangentSpace = function(λ,φ) {
    var θ = θgen(φ);
    var dθdφ = Cp * Math.cos(φ) / (2*(1+Math.cos(2*θ)));
    return [
      [
        Cx * λ * Math.cos(θ),
        Cy * Math.sin(θ)
      ],
      [
        [Cx * Math.cos(θ), 0],
        [-Cx * λ * Math.sin(θ) * dθdφ, 0.25 * Cy * Cp * Math.cos(φ) / Math.cos(θ)] // Since dθdφ gets tends to infinity towards the poles we need to do something special for dydφ.
      ]
    ];
  };

  forward.invert = function(x, y) {
    var θ = asin(y / Cy);
    return [
      x / (Cx * Math.cos(θ)),
      asin((2 * θ + Math.sin(2 * θ)) / Cp)
    ];
  };

  return forward;
}

var mollweideθ = mollweideBromleyθ(π),
    mollweide = mollweideBromley(2 * Math.SQRT2 / π, Math.SQRT2, π);

(d3.geo.mollweide = function() { return projection(mollweide); }).raw = mollweide;
