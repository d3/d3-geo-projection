import projectFeature from "./feature";
import projectGeometry from "./geometry";

export default function(object, projection) {
  var stream = projection.stream;
  if (!stream) throw new Error("not yet supported");
  return (object && projectObjectType.hasOwnProperty(object.type)
      ? projectObjectType[object.type]
      : projectGeometry)(object, stream);
}

var projectObjectType = {
  Feature: projectFeature,
  FeatureCollection: function(object, stream) {
    return {
      type: "FeatureCollection",
      features: object.features.map(function(feature) {
        return projectFeature(feature, stream);
      })
    };
  }
};
