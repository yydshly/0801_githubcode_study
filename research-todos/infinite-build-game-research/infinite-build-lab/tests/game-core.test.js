"use strict";

const assert = require("node:assert/strict");
require("../game-core.js");

const { clamp, circlesTouch, deposit, applyMistHit } = globalThis.GameCore;

assert.equal(clamp(120, 0, 100), 100);
assert.equal(clamp(-4, 0, 100), 0);
assert.equal(circlesTouch({ x: 0, y: 0, radius: 5 }, { x: 8, y: 0, radius: 4 }), true);
assert.deepEqual(deposit(3, 1, 2), { carried: 2, beaconCharge: 2, deposited: 1 });
assert.deepEqual(deposit(1, 2, 2), { carried: 1, beaconCharge: 2, deposited: 0 });
assert.deepEqual(applyMistHit(100, 2), { stability: 90, carried: 1 });
assert.deepEqual(applyMistHit(10, 0), { stability: 0, carried: 0 });

console.log("game-core: 7 checks passed");
