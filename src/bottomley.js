import "projection";

function bottomleyRaw(ψ) {
  function forward(λ, φ) {
    var ρ = halfπ - φ,
        η = ρ ? λ * Math.sin(ψ) * Math.sin(ρ) / ρ : ρ;
    return [
      ρ * Math.sin(η) / Math.sin(ψ),
      halfπ - ρ * Math.cos(η)
    ];
  }

  forward.invert = function(x, y) {
    var x1 = x * Math.sin(ψ),
      y1 = halfπ - y;
    var ρ = Math.sqrt( x1 * x1 + y1 * y1 ),
      η = Math.atan( x1 / y1 );

    return [
      (ρ ? ρ / Math.sin(ρ) : 1) * η / Math.sin(ψ),
      halfπ - ρ
    ];
  };

  return forward;
}

(d3.geo.bottomley = function() {
  var ψ = π/6,
    mutate = d3.geo.projectionMutator(bottomleyRaw),
    projection = mutate(ψ);

  projection.variant = function(_) {
    if (!arguments.length) return ψ;
    return mutate(ψ = _);
  };

  return projection;
}).raw = bottomleyRaw;
