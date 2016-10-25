import projectGeometry from "./geometry";

export default function projectFeature(object, stream) {
  return {
    type: "Feature",
    id: object.id,
    properties: object.properties,
    geometry: projectGeometry(object.geometry, stream)
  };
}
