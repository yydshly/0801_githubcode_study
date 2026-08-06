(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.AdventureCombatCore = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  "use strict";

  const PLAYER_ATTACKS = Object.freeze([
    null,
    Object.freeze({ step: 1, startup: 0.11, active: 0.09, recovery: 0.19, damage: 18, range: 120, knockback: 18 }),
    Object.freeze({ step: 2, startup: 0.10, active: 0.09, recovery: 0.21, damage: 24, range: 126, knockback: 24 }),
    Object.freeze({ step: 3, startup: 0.16, active: 0.11, recovery: 0.32, damage: 58, range: 138, knockback: 38 }),
  ]);

  const ENEMY_TIMING = Object.freeze({ telegraph: 0.62, active: 0.14, recovery: 0.70, range: 72, damage: 9 });
  const PHASE_ORDER = ["startup", "active", "recovery", "done"];

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function nextComboStep(currentStep, comboRemaining) {
    return comboRemaining > 0 ? (currentStep % 3) + 1 : 1;
  }

  function startPlayerAttack(step, id) {
    const spec = PLAYER_ATTACKS[clamp(Math.round(step || 1), 1, 3)];
    return { id, step: spec.step, phase: "startup", phaseElapsed: 0, hitResolved: false, queued: false };
  }

  function phaseDuration(action) {
    if (!action || action.phase === "done") return 0;
    return PLAYER_ATTACKS[action.step][action.phase];
  }

  function advancePlayerAttack(action, dt) {
    if (!action || action.phase === "done") return { action, events: [] };
    const next = { ...action };
    const events = [];
    let remaining = Math.max(0, dt);
    while (remaining > 0 && next.phase !== "done") {
      const duration = phaseDuration(next);
      const available = Math.max(0, duration - next.phaseElapsed);
      if (remaining < available) {
        next.phaseElapsed += remaining;
        remaining = 0;
      } else {
        remaining -= available;
        const index = PHASE_ORDER.indexOf(next.phase);
        next.phase = PHASE_ORDER[index + 1];
        next.phaseElapsed = 0;
        events.push(next.phase === "done" ? "completed" : `entered-${next.phase}`);
      }
    }
    return { action: next, events };
  }

  function isPlayerHitWindow(action) {
    return Boolean(action && action.phase === "active" && !action.hitResolved);
  }

  function markPlayerHitResolved(action) {
    return action ? { ...action, hitResolved: true } : action;
  }

  function actionProgress(action) {
    if (!action || action.phase === "done") return 0;
    const duration = phaseDuration(action);
    return duration ? clamp(action.phaseElapsed / duration, 0, 1) : 0;
  }

  function createEnemyBrain(state = "chase") {
    return { state, elapsed: 0, strikeResolved: false };
  }

  function advanceEnemyBrain(brain, dt, distance) {
    const next = { ...brain, elapsed: brain.elapsed + Math.max(0, dt) };
    const events = [];
    if (next.state === "dead" || next.state === "hit") return { brain: next, events };
    if (next.state === "chase") {
      if (distance <= ENEMY_TIMING.range) {
        next.state = "telegraph"; next.elapsed = 0; next.strikeResolved = false; events.push("telegraph-started");
      }
      return { brain: next, events };
    }
    const duration = ENEMY_TIMING[next.state];
    if (next.elapsed < duration) return { brain: next, events };
    if (next.state === "telegraph") {
      next.state = "active"; next.elapsed = 0; events.push("enemy-active");
    } else if (next.state === "active") {
      next.state = "recovery"; next.elapsed = 0; events.push("enemy-recovery");
    } else if (next.state === "recovery") {
      next.state = "chase"; next.elapsed = 0; next.strikeResolved = false; events.push("enemy-ready");
    }
    return { brain: next, events };
  }

  return {
    PLAYER_ATTACKS,
    ENEMY_TIMING,
    clamp,
    nextComboStep,
    startPlayerAttack,
    phaseDuration,
    advancePlayerAttack,
    isPlayerHitWindow,
    markPlayerHitResolved,
    actionProgress,
    createEnemyBrain,
    advanceEnemyBrain,
  };
});
