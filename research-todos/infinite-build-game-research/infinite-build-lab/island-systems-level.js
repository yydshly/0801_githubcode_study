(function (root) {
  "use strict";

  const pickups = [
    { id: "wood-shore-01", item: "wood", x: -6.15, z: -3.05, route: "shore" },
    { id: "stone-shore-01", item: "stone", x: -4.72, z: -2.72, route: "shore" },
    { id: "wood-inner-01", item: "wood", x: -2.85, z: 2.82, route: "inner" },
    { id: "wood-inner-02", item: "wood", x: .15, z: 3.72, route: "inner" },
    { id: "wood-tide-01", item: "wood", x: -.65, z: -2.18, route: "tide" },
    { id: "wood-grove-01", item: "wood", x: 3.55, z: 3.82, route: "grove" },
    { id: "stone-inner-01", item: "stone", x: -1.6, z: 1.15, route: "inner" },
    { id: "stone-grove-01", item: "stone", x: 4.85, z: 1.08, route: "grove" },
  ];

  const level = {
    id: "island-systems-cove-v1",
    planeY: 0,
    bounds: { center: { x: 0, z: 0 }, radiusX: 10.8, radiusZ: 6.8 },
    spawn: { id: "arrival-spawn", x: -7.6, z: -3.65 },
    checkpoint: { id: "arrival-checkpoint", x: -6.5, z: -2.35 },
    workshop: { id: "wreck-workbench", x: -7.1, z: -3.35, radius: 1.35 },
    tideMarker: { id: "survival-marker", x: -5.05, z: -1.45, radius: 1.05 },
    campfire: {
      id: "highland-campfire",
      x: 6.65,
      z: 2.35,
      radius: 1.45,
      cost: { wood: 2, resin: 1 },
    },
    enemy: {
      id: "tidewood-beast",
      name: "潮木兽",
      x: 3.05,
      z: 2.45,
      maxHp: 100,
      aggroRadius: 5.4,
      attackRadius: 1.35,
      drop: { id: "resin-tidewood-01", item: "resin", x: 3.05, z: 2.45 },
    },
    axeRecipe: { wood: 1, stone: 1 },
    tidalZone: { id: "tidal-shortcut", minX: -3.9, maxX: 3.4, minZ: -3.15, maxZ: -1.05 },
    obstacles: [
      { id: "rock-west", x: -7.1, z: .25, radius: 1.05 },
      { id: "rock-center", x: -.1, z: .05, radius: 1.2 },
      { id: "rock-east", x: 4.15, z: -.05, radius: 1.0 },
      { id: "campfire-collar", x: 6.65, z: 2.35, radius: .5 },
    ],
    pickups,
    woods: pickups.filter((pickup) => pickup.item === "wood"),
  };

  if (typeof module !== "undefined" && module.exports) module.exports = level;
  root.IslandSystemsLevel = level;
})(typeof globalThis !== "undefined" ? globalThis : window);
