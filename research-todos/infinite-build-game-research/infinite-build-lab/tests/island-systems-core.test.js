const test = require("node:test");
const assert = require("node:assert/strict");

const core = require("../island-systems-core.js");
const level = require("../island-systems-level.js");

function at(state, point) {
  state.player.x = point.x;
  state.player.z = point.z;
  return state;
}

function advanceFor(state, seconds, step = .04) {
  for (let elapsed = 0; elapsed < seconds; elapsed += step) core.advance(state, level, step);
}

test("start state uses one serializable inventory and equipment source", () => {
  const state = core.createState(level);
  assert.deepEqual(state.inventory, { wood: 0, stone: 0, resin: 0 });
  assert.deepEqual(state.equipment, { tool: null });
  assert.equal(state.campfire.built, false);
  assert.equal(state.enemy.hp, level.enemy.maxHp);
});

test("pickup transaction adds one item and cannot duplicate it", () => {
  const state = at(core.createState(level), level.pickups[0]);
  assert.equal(core.collectNearby(state, level), level.pickups[0].id);
  assert.equal(state.inventory.wood, 1);
  assert.equal(core.collectNearby(state, level), null);
  assert.equal(state.inventory.wood, 1);
});

test("axe crafting is atomic when materials are missing", () => {
  const state = at(core.createState(level), level.workshop);
  state.inventory.wood = 1;
  assert.equal(core.tryCraftAxe(state, level), false);
  assert.deepEqual(state.inventory, { wood: 1, stone: 0, resin: 0 });
  assert.equal(state.equipment.tool, null);
});

test("axe crafting consumes exact materials and equips tool", () => {
  const state = at(core.createState(level, "craft-ready"), level.workshop);
  assert.equal(core.tryCraftAxe(state, level), true);
  assert.deepEqual(state.inventory, { wood: 0, stone: 0, resin: 0 });
  assert.equal(state.crafted.stoneAxe, true);
  assert.equal(state.equipment.tool, "stoneAxe");
  assert.equal(core.tryCraftAxe(state, level), false);
});

test("unarmed attack is rejected without changing enemy health", () => {
  const state = core.createState(level);
  at(state, { x: level.enemy.x - 1, z: level.enemy.z });
  core.setPlayerFacing(state, 1, 0);
  assert.equal(core.beginPlayerAttack(state), false);
  assert.equal(state.enemy.hp, level.enemy.maxHp);
});

test("one axe swing registers at most one enemy contact", () => {
  const state = core.createState(level, "combat");
  state.enemy.x = state.player.x + 1;
  state.enemy.z = state.player.z;
  state.player.invulnerable = 10;
  assert.equal(core.beginPlayerAttack(state), true);
  advanceFor(state, .8);
  assert.equal(state.enemy.hp, level.enemy.maxHp - core.PLAYER_ATTACK.damage);
  assert.equal(state.player.action, "idle");
});

test("enemy telegraph resolves into one damage contact", () => {
  const state = core.createState(level, "combat");
  state.enemy.x = state.player.x + 1;
  state.enemy.z = state.player.z;
  state.enemy.state = "telegraph";
  state.enemy.timer = .1;
  advanceFor(state, .5);
  assert.equal(state.player.hp, 100 - core.ENEMY_ATTACK.damage);
  assert.equal(state.enemy.attackHit, true);
});

test("enemy defeat spawns exactly one resin pickup", () => {
  const state = core.createState(level, "combat");
  state.enemy.x = state.player.x + 1;
  state.enemy.z = state.player.z;
  state.player.invulnerable = 99;
  for (let swing = 0; swing < 3; swing += 1) {
    assert.equal(core.beginPlayerAttack(state), true);
    advanceFor(state, .8);
  }
  assert.equal(state.enemy.defeated, true);
  assert.equal(state.enemy.dropSpawned, true);
  assert.equal(core.availablePickups(state, level).filter((item) => item.id === level.enemy.drop.id).length, 1);
});

test("campfire build does not spend partial materials", () => {
  const state = at(core.createState(level), level.campfire);
  state.inventory.wood = 2;
  assert.equal(core.tryBuildCampfire(state, level), false);
  assert.deepEqual(state.inventory, { wood: 2, stone: 0, resin: 0 });
  assert.equal(state.campfire.built, false);
});

test("campfire build consumes materials and completes the slice", () => {
  const state = core.createState(level, "build-ready");
  assert.equal(core.tryBuildCampfire(state, level), true);
  assert.equal(state.inventory.wood, 0);
  assert.equal(state.inventory.resin, 0);
  assert.equal(state.campfire.built, true);
  assert.equal(state.status, "complete");
});

test("save and restore preserve the unified game state", () => {
  const state = core.createState(level, "build-ready");
  state.player.hp = 64;
  const restored = core.restoreState(core.serializeState(state), level);
  assert.ok(restored);
  assert.deepEqual(restored.inventory, state.inventory);
  assert.equal(restored.equipment.tool, "stoneAxe");
  assert.equal(restored.enemy.defeated, true);
  assert.equal(restored.player.hp, 64);
});

test("invalid save version and invalid pickup ids are rejected", () => {
  const state = core.createState(level);
  const wrongVersion = JSON.stringify({ ...JSON.parse(core.serializeState(state)), version: 99 });
  assert.equal(core.restoreState(wrongVersion, level), null);
  const unknownPickup = JSON.parse(core.serializeState(state));
  unknownPickup.collectedPickupIds = ["invented-item"];
  assert.equal(core.restoreState(JSON.stringify(unknownPickup), level), null);
});

test("fixtures expose deterministic review states", () => {
  assert.equal(core.createState(level, "craft-ready").inventory.stone, 1);
  assert.equal(core.createState(level, "combat").equipment.tool, "stoneAxe");
  assert.equal(core.createState(level, "build-ready").inventory.resin, 1);
  assert.equal(core.createState(level, "complete").campfire.built, true);
  assert.equal(core.createState(level, "low-health").player.hp, 22);
});

test("movement resolver keeps the player outside rock obstacles", () => {
  const obstacle = level.obstacles[0];
  const current = { x: obstacle.x - obstacle.radius - .7, z: obstacle.z };
  const desired = { x: obstacle.x, z: obstacle.z };
  assert.notDeepEqual(core.resolveMove(current, desired, level), desired);
});
