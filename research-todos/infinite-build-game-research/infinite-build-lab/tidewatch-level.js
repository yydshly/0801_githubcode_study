(function (root) {
  "use strict";

  const level = {
    id: "tidewatch-cove-v1",
    planeY: 0,
    bounds: { center: { x: 0, z: 0 }, radiusX: 10.8, radiusZ: 6.8 },
    spawn: { id: "arrival-spawn", x: -7.6, z: -3.65 },
    checkpoint: { id: "arrival-checkpoint", x: -6.5, z: -2.35 },
    tideMarker: { id: "tide-marker", x: -5.05, z: -1.45, radius: 1.05 },
    fire: { id: "signal-fire", x: 6.65, z: 2.35, radius: 1.25, target: 4 },
    tidalZone: { id: "tidal-shortcut", minX: -3.9, maxX: 3.4, minZ: -3.15, maxZ: -1.05 },
    obstacles: [
      { id: "rock-west", x: -7.1, z: 0.25, radius: 1.05 },
      { id: "rock-center", x: -0.1, z: 0.05, radius: 1.2 },
      { id: "rock-east", x: 4.15, z: -0.05, radius: 1.0 },
      { id: "fire-collar", x: 6.65, z: 2.35, radius: 0.52 },
    ],
    woods: [
      { id: "wood-risk-01", route: "risk", x: -2.85, z: -2.35 },
      { id: "wood-risk-02", route: "risk", x: 0.35, z: -2.05 },
      { id: "wood-risk-03", route: "risk", x: 2.75, z: -2.3 },
      { id: "wood-safe-01", route: "safe", x: -3.6, z: 2.05 },
      { id: "wood-safe-02", route: "safe", x: -0.95, z: 3.85 },
      { id: "wood-safe-03", route: "safe", x: 2.15, z: 3.45 },
      { id: "wood-safe-04", route: "safe", x: 4.85, z: 1.55 },
    ],
  };

  if (typeof module !== "undefined" && module.exports) module.exports = level;
  root.TidewatchLevel = level;
})(typeof globalThis !== "undefined" ? globalThis : window);
