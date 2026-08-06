(function (root) {
  "use strict";

  const SAVE_VERSION = 2;
  const HIGH_TIDE_SECONDS = 180;
  const PLAYER_ATTACK = { startup: .16, active: .18, recovery: .34, range: 1.42, damage: 34 };
  const ENEMY_ATTACK = { telegraph: .72, active: .2, recover: 1.08, damage: 16 };

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

  function emptyInventory() {
    return { wood: 0, stone: 0, resin: 0 };
  }

  function createState(level, fixture = "start") {
    const state = {
      version: SAVE_VERSION,
      fixture,
      time: 20,
      status: "playing",
      inventory: emptyInventory(),
      equipment: { tool: null },
      crafted: { stoneAxe: false },
      collectedPickupIds: [],
      campfire: { built: false },
      player: {
        x: level.spawn.x,
        z: level.spawn.z,
        hp: 100,
        facingX: 0,
        facingZ: -1,
        action: "idle",
        actionTime: 0,
        hitRegistered: false,
        invulnerable: 0,
      },
      enemy: {
        x: level.enemy.x,
        z: level.enemy.z,
        hp: level.enemy.maxHp,
        state: "idle",
        timer: 0,
        attackHit: false,
        defeated: false,
        dropSpawned: false,
      },
      message: "先在搁浅点附近寻找木材和石块",
      eventId: 0,
    };

    if (fixture === "craft-ready") {
      state.inventory.wood = 1;
      state.inventory.stone = 1;
      state.collectedPickupIds = ["wood-shore-01", "stone-shore-01"];
      state.player.x = level.workshop.x + .75;
      state.player.z = level.workshop.z + .35;
      state.message = "材料齐全，靠近残骸工作台制作石斧";
    }
    if (fixture === "combat") {
      state.crafted.stoneAxe = true;
      state.equipment.tool = "stoneAxe";
      state.player.x = level.enemy.x - 2.1;
      state.player.z = level.enemy.z + .15;
      state.player.facingX = 1;
      state.player.facingZ = 0;
      state.message = "潮木兽正在守护林地，注意红色攻击预警";
    }
    if (fixture === "build-ready") {
      state.crafted.stoneAxe = true;
      state.equipment.tool = "stoneAxe";
      state.inventory.wood = 2;
      state.inventory.resin = 1;
      state.enemy.hp = 0;
      state.enemy.state = "defeated";
      state.enemy.defeated = true;
      state.enemy.dropSpawned = true;
      state.collectedPickupIds = [level.enemy.drop.id];
      state.player.x = level.campfire.x - 1.05;
      state.player.z = level.campfire.z;
      state.message = "材料齐全，在高地营火基址完成建造";
    }
    if (fixture === "complete") {
      state.crafted.stoneAxe = true;
      state.equipment.tool = "stoneAxe";
      state.enemy.hp = 0;
      state.enemy.state = "defeated";
      state.enemy.defeated = true;
      state.enemy.dropSpawned = true;
      state.collectedPickupIds = [level.enemy.drop.id];
      state.campfire.built = true;
      state.status = "complete";
      state.time = 172;
      state.player.x = level.campfire.x - 1.1;
      state.player.z = level.campfire.z;
      state.message = "火光照亮高地，这条生存链已经闭合";
    }
    if (fixture === "low-health") {
      state.crafted.stoneAxe = true;
      state.equipment.tool = "stoneAxe";
      state.player.hp = 22;
      state.player.x = level.enemy.x - 1.7;
      state.player.z = level.enemy.z;
      state.player.facingX = 1;
      state.player.facingZ = 0;
      state.enemy.state = "telegraph";
      state.enemy.timer = ENEMY_ATTACK.telegraph * .55;
      state.message = "生命很低，离开红色危险范围或及时反击";
    }
    return state;
  }

  function bumpEvent(state, message) {
    state.eventId += 1;
    state.message = message;
  }

  function addItem(state, item, quantity = 1) {
    if (!Object.hasOwn(state.inventory, item) || quantity <= 0) return false;
    state.inventory[item] += quantity;
    return true;
  }

  function canPay(inventory, cost) {
    return Object.entries(cost).every(([item, quantity]) => (inventory[item] || 0) >= quantity);
  }

  function payCost(state, cost) {
    if (!canPay(state.inventory, cost)) return false;
    Object.entries(cost).forEach(([item, quantity]) => { state.inventory[item] -= quantity; });
    return true;
  }

  function availablePickups(state, level) {
    const pickups = [...level.pickups];
    if (state.enemy.dropSpawned) pickups.push(level.enemy.drop);
    return pickups.filter((pickup) => !state.collectedPickupIds.includes(pickup.id));
  }

  function collectNearby(state, level, radius = .8) {
    if (state.status !== "playing") return null;
    const pickup = availablePickups(state, level).find((candidate) => distance(state.player, candidate) <= radius);
    if (!pickup || !addItem(state, pickup.item, 1)) return null;
    state.collectedPickupIds.push(pickup.id);
    const names = { wood: "木材", stone: "石块", resin: "树脂" };
    bumpEvent(state, `获得${names[pickup.item]} · 当前 ${state.inventory[pickup.item]}`);
    return pickup.id;
  }

  function tryCraftAxe(state, level) {
    if (state.status !== "playing" || distance(state.player, level.workshop) > level.workshop.radius) return false;
    if (state.crafted.stoneAxe) {
      bumpEvent(state, "石斧已经装备在工具槽中");
      return false;
    }
    if (!payCost(state, level.axeRecipe)) {
      bumpEvent(state, `制作石斧需要 ${level.axeRecipe.wood} 木材 + ${level.axeRecipe.stone} 石块`);
      return false;
    }
    state.crafted.stoneAxe = true;
    state.equipment.tool = "stoneAxe";
    bumpEvent(state, "石斧制作完成并已装备；现在可以进入林地");
    return true;
  }

  function tryBuildCampfire(state, level) {
    if (state.status !== "playing" || distance(state.player, level.campfire) > level.campfire.radius) return false;
    if (state.campfire.built) return false;
    if (!payCost(state, level.campfire.cost)) {
      bumpEvent(state, `建造篝火需要 ${level.campfire.cost.wood} 木材 + ${level.campfire.cost.resin} 树脂`);
      return false;
    }
    state.campfire.built = true;
    state.status = "complete";
    state.time = Math.max(state.time, 166);
    bumpEvent(state, "篝火已经点燃；探索、装备、战斗与建造形成了完整闭环");
    return true;
  }

  function interact(state, level) {
    const picked = collectNearby(state, level);
    if (picked) return { type: "pickup", id: picked };
    if (distance(state.player, level.workshop) <= level.workshop.radius) {
      return { type: "craft", success: tryCraftAxe(state, level) };
    }
    if (distance(state.player, level.campfire) <= level.campfire.radius) {
      return { type: "build", success: tryBuildCampfire(state, level) };
    }
    bumpEvent(state, "这里没有可交互的目标");
    return { type: "none", success: false };
  }

  function setPlayerFacing(state, x, z) {
    const length = Math.hypot(x, z);
    if (length <= .001) return;
    state.player.facingX = x / length;
    state.player.facingZ = z / length;
  }

  function beginPlayerAttack(state) {
    if (state.status !== "playing" || state.player.action !== "idle") return false;
    if (state.equipment.tool !== "stoneAxe") {
      bumpEvent(state, "徒手无法伤害潮木兽；先制作并装备石斧");
      return false;
    }
    state.player.action = "startup";
    state.player.actionTime = PLAYER_ATTACK.startup;
    state.player.hitRegistered = false;
    return true;
  }

  function facingDot(player, target) {
    const dx = target.x - player.x;
    const dz = target.z - player.z;
    const length = Math.hypot(dx, dz) || 1;
    return player.facingX * dx / length + player.facingZ * dz / length;
  }

  function defeatEnemy(state, level) {
    if (state.enemy.defeated) return;
    state.enemy.hp = 0;
    state.enemy.state = "defeated";
    state.enemy.defeated = true;
    state.enemy.dropSpawned = true;
    level.enemy.drop.x = state.enemy.x;
    level.enemy.drop.z = state.enemy.z;
    bumpEvent(state, "潮木兽倒下了，林地中留下了一滴发光树脂");
  }

  function advancePlayerAttack(state, level, dt) {
    const player = state.player;
    if (player.action === "idle") return;
    player.actionTime = Math.max(0, player.actionTime - dt);
    if (player.action === "startup" && player.actionTime <= 0) {
      player.action = "active";
      player.actionTime = PLAYER_ATTACK.active;
    }
    if (player.action === "active") {
      if (!player.hitRegistered && !state.enemy.defeated && distance(player, state.enemy) <= PLAYER_ATTACK.range && facingDot(player, state.enemy) > -.05) {
        player.hitRegistered = true;
        state.enemy.hp = clamp(state.enemy.hp - PLAYER_ATTACK.damage, 0, level.enemy.maxHp);
        if (state.enemy.hp <= 0) defeatEnemy(state, level);
        else {
          state.enemy.state = "stagger";
          state.enemy.timer = .28;
          bumpEvent(state, `石斧命中潮木兽 · 剩余 ${state.enemy.hp}%`);
        }
      }
      if (player.actionTime <= 0) {
        player.action = "recovery";
        player.actionTime = PLAYER_ATTACK.recovery;
      }
    } else if (player.action === "recovery" && player.actionTime <= 0) {
      player.action = "idle";
      player.hitRegistered = false;
    }
  }

  function beginEnemyAttack(state) {
    state.enemy.state = "telegraph";
    state.enemy.timer = ENEMY_ATTACK.telegraph;
    state.enemy.attackHit = false;
  }

  function advanceEnemy(state, level, dt) {
    const enemy = state.enemy;
    if (enemy.defeated || state.status !== "playing") return;
    const gap = distance(enemy, state.player);

    if (enemy.state === "stagger") {
      enemy.timer = Math.max(0, enemy.timer - dt);
      if (enemy.timer <= 0) enemy.state = "approach";
      return;
    }

    if (enemy.state === "telegraph") {
      enemy.timer = Math.max(0, enemy.timer - dt);
      if (enemy.timer <= 0) {
        enemy.state = "active";
        enemy.timer = ENEMY_ATTACK.active;
      }
      return;
    }

    if (enemy.state === "active") {
      enemy.timer = Math.max(0, enemy.timer - dt);
      if (!enemy.attackHit && gap <= level.enemy.attackRadius && state.player.invulnerable <= 0) {
        enemy.attackHit = true;
        state.player.hp = clamp(state.player.hp - ENEMY_ATTACK.damage, 0, 100);
        state.player.invulnerable = 1.15;
        bumpEvent(state, `受到潮木兽撞击 · 生命 ${state.player.hp}%`);
        if (state.player.hp <= 0) {
          state.status = "failed";
          bumpEvent(state, "你失去了行动能力；重新规划战斗距离再试一次");
        }
      }
      if (enemy.timer <= 0) {
        enemy.state = "recover";
        enemy.timer = ENEMY_ATTACK.recover;
      }
      return;
    }

    if (enemy.state === "recover") {
      enemy.timer = Math.max(0, enemy.timer - dt);
      if (enemy.timer <= 0) enemy.state = "approach";
      return;
    }

    if (gap <= level.enemy.attackRadius) {
      beginEnemyAttack(state);
      return;
    }

    if (gap <= level.enemy.aggroRadius) {
      enemy.state = "approach";
      const dx = (state.player.x - enemy.x) / Math.max(gap, .001);
      const dz = (state.player.z - enemy.z) / Math.max(gap, .001);
      const desired = { x: enemy.x + dx * 1.05 * dt, z: enemy.z + dz * 1.05 * dt };
      const moved = resolveMove(enemy, desired, level, .48);
      enemy.x = moved.x;
      enemy.z = moved.z;
    } else {
      enemy.state = "idle";
    }
  }

  function advance(state, level, dt) {
    if (state.status !== "playing") return state;
    const safeDt = clamp(Number(dt) || 0, 0, .05);
    state.time += safeDt;
    state.player.invulnerable = Math.max(0, state.player.invulnerable - safeDt);
    advancePlayerAttack(state, level, safeDt);
    advanceEnemy(state, level, safeDt);
    return state;
  }

  function getObjective(state, level) {
    if (!state.crafted.stoneAxe) {
      if (!canPay(state.inventory, level.axeRecipe)) return { step: 0, title: "搜集制作材料", copy: "在海滩找到 1 木材和 1 石块；靠近资源按 E 拾取。" };
      return { step: 1, title: "制作并装备石斧", copy: "返回搁浅残骸旁的工作台，按 E 消耗材料制作石斧。" };
    }
    if (!state.enemy.defeated) return { step: 2, title: "进入林地，击退潮木兽", copy: "按 Space 挥动石斧；红色地面预警出现时拉开距离。" };
    if (!state.collectedPickupIds.includes(level.enemy.drop.id)) return { step: 3, title: "拾取潮木树脂", copy: "靠近敌人留下的青绿色树脂，按 E 放入背包。" };
    if (!state.campfire.built) {
      const woodNeeded = Math.max(0, level.campfire.cost.wood - state.inventory.wood);
      return woodNeeded ? { step: 3, title: "补齐营火木材", copy: `还需要 ${woodNeeded} 木材；沿岛屿内侧继续搜索。` } : { step: 4, title: "在高地建造篝火", copy: "前往东侧高地的石圈，按 E 消耗木材与树脂。" };
    }
    return { step: 4, title: "守住这束火光", copy: "统一生存链已经完成：资源、装备、战斗、掉落与建造共同改变了世界。" };
  }

  function getContextPrompt(state, level) {
    const nearby = availablePickups(state, level).find((pickup) => distance(state.player, pickup) <= 1.05);
    if (nearby) return "E · 拾取资源";
    if (distance(state.player, level.workshop) <= level.workshop.radius + .15) return state.crafted.stoneAxe ? "石斧已装备" : "E · 制作石斧";
    if (distance(state.player, level.campfire) <= level.campfire.radius + .15) return state.campfire.built ? "篝火已经点燃" : "E · 建造篝火";
    if (!state.enemy.defeated && distance(state.player, state.enemy) <= level.enemy.aggroRadius) return state.equipment.tool ? "Space · 挥动石斧" : "需要石斧";
    return "";
  }

  function serializeState(state) {
    return JSON.stringify({
      version: SAVE_VERSION,
      time: state.time,
      status: state.status,
      inventory: { ...state.inventory },
      equipment: { ...state.equipment },
      crafted: { ...state.crafted },
      collectedPickupIds: [...state.collectedPickupIds],
      campfire: { ...state.campfire },
      player: { ...state.player, action: "idle", actionTime: 0, hitRegistered: false },
      enemy: { ...state.enemy, state: state.enemy.defeated ? "defeated" : "idle", timer: 0, attackHit: false },
      message: state.message,
      eventId: state.eventId,
    });
  }

  function restoreState(serialized, level) {
    try {
      const value = JSON.parse(serialized);
      if (!value || value.version !== SAVE_VERSION) return null;
      if (!value.player || !isWalkable(value.player, level)) return null;
      if (!value.enemy || !isInsideBounds(value.enemy, level, .3)) return null;
      const validIds = new Set([...level.pickups.map((pickup) => pickup.id), level.enemy.drop.id]);
      if (!Array.isArray(value.collectedPickupIds) || value.collectedPickupIds.some((id) => !validIds.has(id))) return null;
      const inventory = emptyInventory();
      Object.keys(inventory).forEach((item) => { inventory[item] = clamp(Math.floor(Number(value.inventory?.[item]) || 0), 0, 99); });
      const state = createState(level);
      state.time = Math.max(0, Number(value.time) || 0);
      state.status = ["playing", "complete", "failed"].includes(value.status) ? value.status : "playing";
      state.inventory = inventory;
      state.equipment.tool = value.equipment?.tool === "stoneAxe" ? "stoneAxe" : null;
      state.crafted.stoneAxe = Boolean(value.crafted?.stoneAxe || state.equipment.tool);
      state.collectedPickupIds = [...new Set(value.collectedPickupIds)];
      state.campfire.built = Boolean(value.campfire?.built);
      state.player = {
        ...state.player,
        x: Number(value.player.x),
        z: Number(value.player.z),
        hp: clamp(Number(value.player.hp) || 0, 0, 100),
        facingX: Number(value.player.facingX) || 0,
        facingZ: Number(value.player.facingZ) || -1,
      };
      state.enemy = {
        ...state.enemy,
        x: Number(value.enemy.x),
        z: Number(value.enemy.z),
        hp: clamp(Number(value.enemy.hp) || 0, 0, level.enemy.maxHp),
        defeated: Boolean(value.enemy.defeated),
        dropSpawned: Boolean(value.enemy.dropSpawned),
      };
      state.enemy.state = state.enemy.defeated ? "defeated" : "idle";
      state.message = typeof value.message === "string" ? value.message : state.message;
      state.eventId = Math.max(0, Math.floor(Number(value.eventId) || 0));
      if (state.campfire.built) state.status = "complete";
      return state;
    } catch (_error) {
      return null;
    }
  }

  const api = {
    SAVE_VERSION,
    HIGH_TIDE_SECONDS,
    PLAYER_ATTACK,
    ENEMY_ATTACK,
    clamp,
    distance,
    tideLevelAt,
    secondsUntilHighTide,
    isInsideBounds,
    isBlocked,
    isWalkable,
    resolveMove,
    createState,
    canPay,
    payCost,
    availablePickups,
    collectNearby,
    tryCraftAxe,
    tryBuildCampfire,
    interact,
    setPlayerFacing,
    beginPlayerAttack,
    advance,
    getObjective,
    getContextPrompt,
    serializeState,
    restoreState,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.IslandSystemsCore = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
