export default {
  input: "index",
  external: [
    "d3-array",
    "d3-geo",
    "d3-geo-polygon"
  ],
  output: {
    extend: true,
    file: "build/d3-geo-projection.js",
    format: "umd",
    globals: {
      "d3-array": "d3",
      "d3-geo": "d3",
      "d3-geo-polygon": "d3"
    },
    name: "d3"
  }
};
