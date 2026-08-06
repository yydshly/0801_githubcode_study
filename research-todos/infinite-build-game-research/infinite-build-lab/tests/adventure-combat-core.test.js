const test = require("node:test");
const assert = require("node:assert/strict");
const combat = require("../adventure-combat-core.js");

test("player attack crosses startup, active, recovery and completes", () => {
  let action = combat.startPlayerAttack(1, 7);
  let result = combat.advancePlayerAttack(action, 0.11);
  action = result.action;
  assert.equal(action.phase, "active");
  assert.deepEqual(result.events, ["entered-active"]);
  result = combat.advancePlayerAttack(action, 0.09);
  action = result.action;
  assert.equal(action.phase, "recovery");
  result = combat.advancePlayerAttack(action, 0.19);
  assert.equal(result.action.phase, "done");
  assert.ok(result.events.includes("completed"));
});

test("hit window can only resolve once per action", () => {
  let action = combat.startPlayerAttack(2, 9);
  action = combat.advancePlayerAttack(action, combat.PLAYER_ATTACKS[2].startup).action;
  assert.equal(combat.isPlayerHitWindow(action), true);
  action = combat.markPlayerHitResolved(action);
  assert.equal(combat.isPlayerHitWindow(action), false);
});

test("combo step advances only while combo window remains", () => {
  assert.equal(combat.nextComboStep(1, 0.5), 2);
  assert.equal(combat.nextComboStep(3, 0.5), 1);
  assert.equal(combat.nextComboStep(2, 0), 1);
});

test("one complete three-hit combo defeats a 100 HP target", () => {
  const total = combat.PLAYER_ATTACKS.slice(1).reduce((sum, attack) => sum + attack.damage, 0);
  assert.equal(total, 100);
});

test("enemy attack always telegraphs before becoming active", () => {
  let brain = combat.createEnemyBrain();
  let result = combat.advanceEnemyBrain(brain, 0.01, 60);
  brain = result.brain;
  assert.equal(brain.state, "telegraph");
  assert.ok(result.events.includes("telegraph-started"));
  result = combat.advanceEnemyBrain(brain, combat.ENEMY_TIMING.telegraph - 0.01, 60);
  assert.equal(result.brain.state, "telegraph");
  result = combat.advanceEnemyBrain(result.brain, 0.02, 60);
  assert.equal(result.brain.state, "active");
});

test("long frames can cross more than one player phase deterministically", () => {
  const spec = combat.PLAYER_ATTACKS[3];
  const result = combat.advancePlayerAttack(combat.startPlayerAttack(3, 1), spec.startup + spec.active + spec.recovery);
  assert.equal(result.action.phase, "done");
  assert.deepEqual(result.events, ["entered-active", "entered-recovery", "completed"]);
});
