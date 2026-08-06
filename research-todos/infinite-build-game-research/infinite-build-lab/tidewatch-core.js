(function (root) {
  "use strict";

  const SAVE_VERSION = 1;
  const HIGH_TIDE_SECONDS = 150;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.z - b.z);
  }

  function tideLevelAt(time) {
    return clamp(time / HIGH_TIDE_SECONDS, 0, 1);
  }

  function secondsUntilHighTide(time) {
    return Math.max(0, Math.ceil(HIGH_TIDE_SECONDS - time));
  }

  function isInsideBounds(point, level, margin = 0) {
    const dx = (point.x - level.bounds.center.x) / Math.max(.01, level.bounds.radiusX - margin);
    const dz = (point.z - level.bounds.center.z) / Math.max(.01, level.bounds.radiusZ - margin);
    return dx * dx + dz * dz <= 1;
  }

  function isBlocked(point, level, radius = .38) {
    return level.obstacles.some((obstacle) => distance(point, obstacle) < radius + obstacle.radius);
  }

  function isWalkable(point, level, radius = .38) {
    return isInsideBounds(point, level, radius) && !isBlocked(point, level, radius);
  }

  function resolveMove(current, desired, level, radius = .38) {
    if (isWalkable(desired, level, radius)) return { x: desired.x, z: desired.z };
    const xOnly = { x: desired.x, z: current.z };
    if (isWalkable(xOnly, level, radius)) return xOnly;
    const zOnly = { x: current.x, z: desired.z };
    if (isWalkable(zOnly, level, radius)) return zOnly;
    return { x: current.x, z: current.z };
  }

  function isInTidalZone(point, level) {
    const zone = level.tidalZone;
    return point.x >= zone.minX && point.x <= zone.maxX && point.z >= zone.minZ && point.z <= zone.maxZ;
  }

  function isFlooded(point, level, time) {
    return tideLevelAt(time) >= .62 && isInTidalZone(point, level);
  }

  function createState(level, fixture = "start") {
    const state = {
      version: SAVE_VERSION,
      fixture,
      time: 0,
      tideRead: false,
      collectedWoodIds: [],
      resolve: 100,
      waveCooldown: 0,
      status: "playing",
      fireLit: false,
      player: { x: level.spawn.x, z: level.spawn.z },
      message: "先找到海湾边的潮尺",
    };

    if (fixture === "low-tide") {
      state.tideRead = true;
      state.time = 28;
      state.player = { x: -4.45, z: -1.25 };
      state.message = "低潮捷径已经显露";
    }
    if (fixture === "high-tide") {
      state.tideRead = true;
      state.time = 118;
      state.player = { x: -2.2, z: -2.15 };
      state.message = "潮池捷径正在被淹没";
    }
    if (fixture === "near-complete") {
      state.tideRead = true;
      state.time = 108;
      state.collectedWoodIds = level.woods.slice(0, level.fire.target).map((wood) => wood.id);
      state.player = { x: 5.6, z: 2.25 };
      state.message = "木材已齐，靠近火台点火";
    }
    if (fixture === "night-fire") {
      state.tideRead = true;
      state.time = 154;
      state.collectedWoodIds = level.woods.slice(0, level.fire.target).map((wood) => wood.id);
      state.player = { x: 5.25, z: 2.1 };
      state.status = "complete";
      state.fireLit = true;
      state.message = "远方船只回应了你的信号";
    }
    return state;
  }

  function inspectTide(state, level) {
    if (distance(state.player, level.tideMarker) > level.tideMarker.radius) return false;
    state.tideRead = true;
    state.message = `低潮捷径还能维持 ${secondsUntilHighTide(state.time)} 秒`;
    return true;
  }

  function collectNearby(state, level, radius = .72) {
    if (!state.tideRead || state.status !== "playing" || state.collectedWoodIds.length >= level.fire.target) return null;
    const wood = level.woods.find((item) => !state.collectedWoodIds.includes(item.id) && distance(state.player, item) <= radius);
    if (!wood) return null;
    state.collectedWoodIds.push(wood.id);
    state.message = state.collectedWoodIds.length >= level.fire.target ? "木材已齐，返回信号火台" : `找到漂流木 ${state.collectedWoodIds.length} / ${level.fire.target}`;
    return wood.id;
  }

  function tryLightFire(state, level) {
    if (state.status !== "playing" || distance(state.player, level.fire) > level.fire.radius) return false;
    if (state.collectedWoodIds.length < level.fire.target) {
      state.message = `还差 ${level.fire.target - state.collectedWoodIds.length} 根漂流木`;
      return false;
    }
    state.fireLit = true;
    state.status = "complete";
    state.time = Math.max(state.time, 145);
    state.message = "远方船只回应了你的信号";
    return true;
  }

  function applyWaveHit(state, level) {
    if (state.status !== "playing" || state.waveCooldown > 0 || !isFlooded(state.player, level, state.time)) return false;
    state.resolve = clamp(state.resolve - 25, 0, 100);
    if (state.collectedWoodIds.length) state.collectedWoodIds.pop();
    state.player = { x: level.checkpoint.x, z: level.checkpoint.z };
    state.waveCooldown = 2.2;
    state.message = state.resolve <= 0 ? "你被不断上涨的海水拖垮了" : "浪把你冲回岸边，并卷走一根木材";
    if (state.resolve <= 0) state.status = "failed";
    return true;
  }

  function advanceTime(state, dt) {
    if (state.status !== "playing") return state;
    state.time += Math.max(0, dt);
    state.waveCooldown = Math.max(0, state.waveCooldown - Math.max(0, dt));
    return state;
  }

  function serializeState(state) {
    return JSON.stringify({
      version: SAVE_VERSION,
      time: state.time,
      tideRead: state.tideRead,
      collectedWoodIds: [...state.collectedWoodIds],
      resolve: state.resolve,
      status: state.status,
      fireLit: state.fireLit,
      player: { x: state.player.x, z: state.player.z },
      message: state.message,
    });
  }

  function restoreState(serialized, level) {
    try {
      const value = JSON.parse(serialized);
      if (!value || value.version !== SAVE_VERSION || !Array.isArray(value.collectedWoodIds)) return null;
      const validWoodIds = new Set(level.woods.map((wood) => wood.id));
      if (value.collectedWoodIds.some((id) => !validWoodIds.has(id))) return null;
      if (!value.player || !isWalkable(value.player, level)) return null;
      return {
        ...createState(level),
        time: Math.max(0, Number(value.time) || 0),
        tideRead: Boolean(value.tideRead),
        collectedWoodIds: [...new Set(value.collectedWoodIds)],
        resolve: clamp(Number(value.resolve) || 0, 0, 100),
        status: ["playing", "complete", "failed"].includes(value.status) ? value.status : "playing",
        fireLit: Boolean(value.fireLit),
        player: { x: Number(value.player.x), z: Number(value.player.z) },
        message: typeof value.message === "string" ? value.message : "继续探索海湾",
      };
    } catch (_error) {
      return null;
    }
  }

  const api = {
    SAVE_VERSION,
    HIGH_TIDE_SECONDS,
    clamp,
    distance,
    tideLevelAt,
    secondsUntilHighTide,
    isInsideBounds,
    isBlocked,
    isWalkable,
    resolveMove,
    isInTidalZone,
    isFlooded,
    createState,
    inspectTide,
    collectNearby,
    tryLightFire,
    applyWaveHit,
    advanceTime,
    serializeState,
    restoreState,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.TidewatchCore = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
