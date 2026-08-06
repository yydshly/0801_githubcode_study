const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../tidewatch-core.js");
const level = require("../tidewatch-level.js");

test("tide is deterministic and reaches high tide", () => {
  assert.equal(core.tideLevelAt(0), 0);
  assert.equal(core.tideLevelAt(75), .5);
  assert.equal(core.tideLevelAt(150), 1);
  assert.equal(core.secondsUntilHighTide(149.2), 1);
});

test("movement resolves against the island edge and rock colliders", () => {
  const start = { x: -6, z: -2 };
  assert.deepEqual(core.resolveMove(start, { x: 40, z: 40 }, level), start);
  assert.equal(core.isWalkable({ x: level.obstacles[0].x, z: level.obstacles[0].z }, level), false);
  assert.equal(core.isWalkable(level.spawn, level), true);
});

test("player must read the tide marker before collecting", () => {
  const state = core.createState(level);
  state.player = { ...level.woods[0] };
  assert.equal(core.collectNearby(state, level), null);
  state.player = { x: level.tideMarker.x, z: level.tideMarker.z };
  assert.equal(core.inspectTide(state, level), true);
  state.player = { ...level.woods[0] };
  assert.equal(core.collectNearby(state, level), level.woods[0].id);
});

test("high tide wave returns the player and removes at most one wood", () => {
  const state = core.createState(level, "high-tide");
  state.collectedWoodIds = [level.woods[0].id, level.woods[1].id];
  assert.equal(core.applyWaveHit(state, level), true);
  assert.deepEqual(state.player, { x: level.checkpoint.x, z: level.checkpoint.z });
  assert.equal(state.collectedWoodIds.length, 1);
  assert.equal(state.resolve, 75);
  assert.equal(core.applyWaveHit(state, level), false);
});

test("signal fire only lights with the target amount", () => {
  const state = core.createState(level);
  state.player = { x: level.fire.x - .7, z: level.fire.z };
  assert.equal(core.tryLightFire(state, level), false);
  state.collectedWoodIds = level.woods.slice(0, level.fire.target).map((wood) => wood.id);
  assert.equal(core.tryLightFire(state, level), true);
  assert.equal(state.status, "complete");
  assert.equal(state.fireLit, true);
});

test("collection stops at the fire target", () => {
  const state = core.createState(level, "near-complete");
  state.player = { ...level.woods[5] };
  assert.equal(core.collectNearby(state, level), null);
  assert.equal(state.collectedWoodIds.length, level.fire.target);
});

test("save restoration rejects unknown content and restores valid progress", () => {
  const state = core.createState(level, "near-complete");
  const restored = core.restoreState(core.serializeState(state), level);
  assert.equal(restored.collectedWoodIds.length, level.fire.target);
  assert.equal(restored.tideRead, true);
  const invalid = JSON.stringify({ ...JSON.parse(core.serializeState(state)), collectedWoodIds: ["unknown"] });
  assert.equal(core.restoreState(invalid, level), null);
});

test("all authored gameplay anchors remain on one logical plane", () => {
  const anchors = [level.spawn, level.checkpoint, level.tideMarker, level.fire, ...level.woods, ...level.obstacles];
  anchors.forEach((anchor) => assert.equal(anchor.y || level.planeY, level.planeY));
});
