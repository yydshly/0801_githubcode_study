(function (root) {
  "use strict";

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function circlesTouch(a, b) {
    return distance(a, b) <= a.radius + b.radius;
  }

  function deposit(carried, beaconCharge, beaconTarget) {
    const room = Math.max(0, beaconTarget - beaconCharge);
    const amount = Math.min(carried, room);
    return { carried: carried - amount, beaconCharge: beaconCharge + amount, deposited: amount };
  }

  function applyMistHit(stability, carried) {
    return {
      stability: clamp(stability - 10, 0, 100),
      carried: Math.max(0, carried - 1),
    };
  }

  root.GameCore = { clamp, distance, circlesTouch, deposit, applyMistHit };
})(typeof globalThis !== "undefined" ? globalThis : window);
