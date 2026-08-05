import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LEVEL, OBJECTIVES, getZone, isNavigable } from './level-data.js';
import { createWorld } from './world.js';
import { ITEM_DEFINITIONS, createInventory } from './items.js';
import { createAudioController } from './audio.js';
import { clearGame, loadGame, saveGame } from './save.js';
import './styles.css';

const isMobile = matchMedia('(max-width: 760px), (pointer: coarse)').matches;
const fixtureName = new URLSearchParams(location.search).get('fixture');
const isFixture = Boolean(fixtureName);
const RUNTIME_ASSETS = `${import.meta.env.BASE_URL}assets/runtime`;
const canvas = document.querySelector('#game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.15 : 1.55));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xa5c8c7, 0.0062);
const camera = new THREE.PerspectiveCamera(52, 1, 0.12, 700);
camera.position.set(0, 7, 54);

const hemi = new THREE.HemisphereLight(0xcde8f0, 0x33422d, 1.65);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffdfb0, 3.1);
sun.position.set(-52, 76, 40);
sun.castShadow = true;
sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
sun.shadow.camera.left = -85;
sun.shadow.camera.right = 85;
sun.shadow.camera.top = 85;
sun.shadow.camera.bottom = -85;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 210;
sun.shadow.bias = -0.0002;
scene.add(sun);

const loadingBar = document.querySelector('#loading-bar');
const loadingText = document.querySelector('#loading-text');
const startButton = document.querySelector('#start-button');
const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (_url, loaded, total) => {
  const percent = total ? Math.round((loaded / total) * 100) : 0;
  loadingBar.style.width = `${percent}%`;
  loadingText.textContent = `正在整理岛屿生态与人物动画 · ${percent}%`;
};

function setStatus(message) {
  loadingText.textContent = message;
}

async function loadCharacter() {
  const loader = new GLTFLoader(loadingManager);
  const [characterGltf, generalAnimations, movementAnimations] = await Promise.all([
    loader.loadAsync(`${RUNTIME_ASSETS}/character/Castaway_Ranger.glb`),
    loader.loadAsync(`${RUNTIME_ASSETS}/character/KayKit_General.glb`),
    loader.loadAsync(`${RUNTIME_ASSETS}/character/KayKit_Movement.glb`),
  ]);
  const model = characterGltf.scene;
  model.name = 'Castaway rigged survivor with complete ranger outfit';
  model.position.copy(LEVEL.playerSpawn);
  model.rotation.y = Math.PI;
  model.scale.setScalar(0.82);
  model.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.frustumCulled = false;
      if (node.material) {
        node.material.roughness = Math.max(node.material.roughness ?? 0.68, 0.5);
      }
    }
  });
  scene.add(model);

  const mixer = new THREE.AnimationMixer(model);
  const clips = new Map(
    [...generalAnimations.animations, ...movementAnimations.animations].map((clip) => [clip.name, clip]),
  );
  const actions = new Map();
  let currentAction = null;

  function play(name, fade = 0.22) {
    if (currentAction?.getClip().name === name) return;
    const clip = clips.get(name);
    if (!clip) return;
    let action = actions.get(name);
    if (!action) {
      action = mixer.clipAction(clip, model);
      actions.set(name, action);
    }
    action.reset().fadeIn(fade).play();
    if (currentAction) currentAction.fadeOut(fade);
    currentAction = action;
  }

  play('Idle_A', 0);
  return { model, mixer, play, clips };
}

let world;
let character;
let running = false;
let elapsed = 0;
let objectiveIndex = 0;
const inventory = createInventory();
const audio = createAudioController();
let water = 46;
let energy = 71;
let wetness = 8;
let fullness = 62;
let fireFuel = 0;
let phase = 'day1';
let day = 1;
let currentInteractable = null;
let weatherManual = false;
let fireFx = null;
let shelterBuilt = false;
let shelteredTime = 0;
let fishingInProgress = false;
let restoredCheckpoint = null;
let fallenTreeCleared = false;
let signalRevealed = false;
let stormTime = 0;

const input = { up: false, down: false, left: false, right: false, run: false };
const joystick = new THREE.Vector2();
const moveDirection = new THREE.Vector3();
const nextPosition = new THREE.Vector3();
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const cameraTarget = new THREE.Vector3();
const desiredCamera = new THREE.Vector3();
let cameraYaw = 0;
let cameraPitch = 0.48;
let cameraDistance = isMobile ? 10.5 : 9;
let cameraPointer = null;
let lastPointerX = 0;
let lastPointerY = 0;

function showToast(title, detail, cueName = null) {
  const toast = document.querySelector('#toast');
  toast.querySelector('strong').textContent = title;
  toast.querySelector('span').textContent = detail;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
  if (cueName) audio.cue(cueName);
}

function updateSoundButton() {
  const button = document.querySelector('#sound-toggle');
  const muted = audio.isMuted();
  button.textContent = muted ? '声音：关' : '声音：开';
  button.setAttribute('aria-pressed', String(!muted));
}

function snapshotGame() {
  return {
    objectiveIndex,
    inventory: inventory.serialize(),
    water,
    energy,
    wetness,
    fullness,
    fireFuel,
    shelterBuilt,
    fallenTreeCleared,
    signalRevealed,
    stormTime,
    phase,
    day,
    position: character ? character.model.position.toArray() : LEVEL.playerSpawn.toArray(),
  };
}

function commitSave() {
  if (isFixture || !character || !world) return false;
  const saved = saveGame(localStorage, snapshotGame());
  if (saved) {
    const status = document.querySelector('#save-status');
    if (status) status.textContent = day === 2 ? '第二日清晨 · 已保存' : phase === 'night1' ? '第一夜 · 已保存' : '第一日营地 · 已保存';
  }
  return saved;
}

function renderInventory() {
  const grid = document.querySelector('#inventory-grid');
  const stacks = inventory.serialize().stacks;
  const entries = Object.entries(stacks).filter(([, quantity]) => quantity > 0);
  grid.innerHTML = entries.length
    ? entries.map(([itemId, quantity]) => {
      const item = ITEM_DEFINITIONS[itemId];
      return `<article class="inventory-slot" title="${item.description}"><span class="item-symbol">${item.symbol}</span><strong>${item.name}</strong><small>数量 ${quantity}${inventory.equipped.tool === itemId ? ' · 已装备' : ''}</small></article>`;
    }).join('')
    : '<div class="inventory-empty">背包还是空的，先观察潮线与岩岬。</div>';
  const total = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  document.querySelector('#inventory-total').textContent = total;
  document.querySelector('#wood-count').textContent = inventory.count('wood');
  document.querySelector('#stone-count').textContent = inventory.count('stone');
  document.querySelector('#tool-name').textContent = inventory.equipped.tool ? ITEM_DEFINITIONS[inventory.equipped.tool].name : '无';
  const craftButton = document.querySelector('#craft-axe-button');
  const ownsAxe = inventory.count('stone_axe') > 0;
  craftButton.disabled = ownsAxe || !inventory.canCraft('stone_axe');
  craftButton.textContent = ownsAxe ? '已装备' : '制作并装备';
  document.querySelector('#craft-status').textContent = ownsAxe
    ? '石斧已装备。现在可以回到海滩处理木料、搭建棚屋。'
    : inventory.canCraft('stone_axe') ? '材料齐全。制作会一次性扣除 1 木料与 2 石块。' : '需要 1 木料与 2 石块；材料不足不会发生扣除。';
  const eatButton = document.querySelector('#eat-fish-button');
  const canEatBreakfast = objectiveIndex === 12 && inventory.count('cooked_fish') > 0;
  eatButton.disabled = !canEatBreakfast;
  eatButton.textContent = inventory.count('cooked_fish') > 0 ? (objectiveIndex === 12 ? '食用' : '暂不需要') : '没有食物';
}

function setInventoryOpen(open) {
  const drawer = document.querySelector('#inventory-drawer');
  drawer.classList.toggle('is-open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  document.querySelector('#inventory-button').setAttribute('aria-expanded', String(open));
  if (open) {
    renderInventory();
    document.querySelector('#close-inventory').focus();
  } else {
    document.querySelector('#inventory-button').focus({ preventScroll: true });
  }
}

function setObjective(index) {
  objectiveIndex = Math.min(index, OBJECTIVES.length - 1);
  const objective = OBJECTIVES[objectiveIndex];
  document.querySelector('#objective-step').textContent = objectiveIndex < 7
    ? `第一日 · ${objectiveIndex + 1}/7`
    : objectiveIndex === 7 ? '第一日 · 完成'
      : objectiveIndex < 11 ? `第一夜 · ${objectiveIndex - 7}/3`
        : objectiveIndex === 11 ? '第二日 · 清晨'
          : objectiveIndex < 19 ? `第二日 · ${objectiveIndex - 11}/7` : '第二日 · 侦察完成';
  document.querySelector('#objective-title').textContent = objective.title;
  document.querySelector('#objective-detail').textContent = objective.detail;
  const progress = {
    1: `${inventory.count('wood')} / 4 木料　${inventory.count('stone')} / 2 石块`,
    2: '按 I 或点击“背包与制作”',
    3: `${inventory.count('wood')} / 3 木料　石斧 ${inventory.equipped.tool === 'stone_axe' ? '✓' : '—'}`,
    4: `湿度 ${Math.round(wetness)}%　棚下 ${Math.min(3, Math.floor(shelteredTime))} / 3 秒`,
    5: fishingInProgress ? '鱼线已经放入浅水…' : '前往浅水边缘寻找鱼群',
    6: `新鲜礁鱼 ${inventory.count('raw_fish')} / 1`,
    7: '淡水 ✓　工具 ✓　棚屋 ✓　食物 ✓',
    8: `${inventory.count('wood')} / 1 过夜木料`,
    9: `木料 ${inventory.count('wood')} / 1　燃料 ${Math.round(fireFuel)}%`,
    10: `营火燃料 ${Math.round(fireFuel)}%　棚屋 ✓`,
    11: '营地 ✓　石斧 ✓　存档 ✓',
    12: `烤鱼 ${inventory.count('cooked_fish')} / 1　饱食 ${Math.round(fullness)}%`,
    13: `水分 ${Math.round(water)}%　目标 100%`,
    14: `石斧 ${inventory.equipped.tool === 'stone_axe' ? '✓' : '—'}　倒木 ${fallenTreeCleared ? '已清理' : '阻路'}`,
    15: '沿裸露土径向北 · 寻找折木路标',
    16: '观察缘距离正在缩短 · 留意山脊缺口',
    17: signalRevealed ? '远海烟柱 ✓　风向异常 ✓' : '海鸟北飞 · 面向远海观察',
    18: stormTime > 0 ? `风暴前沿约 ${Math.ceil(stormTime)} 秒抵达　返回营地` : '风暴前沿已经抵达　立即返回营地',
    19: '林道 ✓　观察缘 ✓　远海信号 ✓　安全返营 ✓',
  };
  document.querySelector('#objective-progress').textContent = progress[objectiveIndex] ?? '';
  document.querySelector('#night-button').hidden = objectiveIndex !== 7;
  document.querySelector('#day-two-button').hidden = objectiveIndex !== 11;
}

function createFireEffect() {
  const group = new THREE.Group();
  const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xff9b3d, transparent: true, opacity: 0.88, depthWrite: false });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.36, 1.25, 7), flameMaterial);
  flame.position.y = 0.72;
  group.add(flame);
  const light = new THREE.PointLight(0xff8c3a, 3.5, 18, 2);
  light.position.y = 1.2;
  light.castShadow = !isMobile;
  group.add(light);
  group.position.copy(LEVEL.fire);
  scene.add(group);
  return { group, flame, light };
}

function ensureCampVisuals() {
  if (!shelterBuilt) return;
  world.showShelter();
  if (!fireFx) fireFx = createFireEffect();
  if (inventory.equipped.tool === 'stone_axe') world.equipAxe(character.model);
}

function startNight() {
  if (objectiveIndex !== 7) return;
  phase = 'night1';
  day = 1;
  fireFuel = Math.max(fireFuel, 34);
  weatherManual = true;
  world.setWeather('clear');
  world.setNight('night');
  setObjective(8);
  showToast('第一夜正在降临', '海风变冷，远处只剩星光。先为营火找到一份真正的过夜燃料。', 'complete');
  commitSave();
}

function finishDawn() {
  phase = 'day2';
  day = 2;
  energy = 100;
  water = Math.min(water, 68);
  wetness = 0;
  fullness = 54;
  fireFuel = Math.max(fireFuel, 76);
  world.setNight('day');
  character.model.position.copy(LEVEL.shelter);
  setObjective(11);
  commitSave();
}

function startDayTwo() {
  if (objectiveIndex !== 11) return;
  setObjective(12);
  showToast('第二日侦察开始', '先吃掉昨夜留下的烤鱼，再补满淡水。岛心路线比海岸更消耗体力。', 'complete');
  setInventoryOpen(true);
  commitSave();
}

function sleepUntilDawn() {
  if (objectiveIndex !== 10) return;
  const transition = document.querySelector('#sleep-transition');
  audio.cue('sleep');
  running = false;
  transition.classList.add('is-active');
  transition.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    finishDawn();
    setTimeout(() => {
      transition.classList.remove('is-active');
      transition.setAttribute('aria-hidden', 'true');
      running = true;
      lastFrameTime = performance.now();
      showToast('第二日清晨', '体力已经恢复，营地和背包完成本地保存。你可以从这里继续探索。', 'dawn');
    }, 900);
  }, 950);
}

function applyCheckpoint(save) {
  if (!save || !inventory.restore(save.inventory)) return false;
  restoredCheckpoint = save;
  objectiveIndex = save.objectiveIndex;
  water = save.water;
  energy = save.energy;
  wetness = save.wetness;
  fullness = save.fullness;
  fireFuel = save.fireFuel;
  shelterBuilt = save.shelterBuilt;
  phase = save.phase;
  day = save.day;
  fallenTreeCleared = save.fallenTreeCleared;
  signalRevealed = save.signalRevealed;
  stormTime = save.stormTime;
  character.model.position.fromArray(save.position);

  const wood = world.interactables.filter((item) => item.userData.kind === 'wood');
  const stone = world.interactables.filter((item) => item.userData.kind === 'stone');
  if (objectiveIndex >= 2) {
    wood.slice(0, 4).forEach((item) => { item.visible = false; });
    stone.slice(0, 2).forEach((item) => { item.visible = false; });
  }
  if (objectiveIndex >= 9) wood.forEach((item) => { item.visible = false; });
  ensureCampVisuals();
  if (fallenTreeCleared && !world.fallenTreeCleared) world.clearFallenTree();
  if (signalRevealed) world.revealSignal();
  if (signalRevealed && objectiveIndex >= 18) {
    weatherManual = true;
    world.setWeather('storm');
  }
  world.setNight(phase === 'night1' ? 'night' : 'day');
  setObjective(objectiveIndex);
  renderInventory();
  const status = document.querySelector('#save-status');
  if (status) status.textContent = day === 2 ? '第二日清晨 · 已恢复' : phase === 'night1' ? '第一夜 · 已恢复' : '第一日营地 · 已恢复';
  return true;
}

function relevantInteractable(object) {
  const kind = object.userData.kind;
  if (kind === 'freshwater') return objectiveIndex === 0 || objectiveIndex === 13;
  if (kind === 'wood' || kind === 'stone') return (objectiveIndex === 1 || (objectiveIndex === 8 && kind === 'wood')) && object.visible;
  if (kind === 'camp') return objectiveIndex === 3 || objectiveIndex === 6 || objectiveIndex === 9 || objectiveIndex === 18;
  if (kind === 'fishing') return objectiveIndex === 5 && !fishingInProgress;
  if (kind === 'shelter') return objectiveIndex === 10;
  if (kind === 'fallen-tree') return objectiveIndex === 14 && !fallenTreeCleared;
  if (kind === 'forest-pass') return objectiveIndex === 15;
  if (kind === 'lookout') return objectiveIndex === 16 || objectiveIndex === 17;
  return false;
}

function findInteraction() {
  if (!world || !character) return null;
  let nearest = null;
  let nearestDistance = Infinity;
  for (const object of world.interactables) {
    if (!relevantInteractable(object)) continue;
    const distance = object.position.distanceTo(character.model.position);
    if (distance < (object.userData.radius ?? 2.8) && distance < nearestDistance) {
      nearest = object;
      nearestDistance = distance;
    }
  }
  return nearest;
}

function interact() {
  if (!running || !currentInteractable) return;
  const object = currentInteractable;
  const kind = object.userData.kind;
  if (kind === 'freshwater' && objectiveIndex === 0) {
    water = 100;
    setObjective(1);
    showToast('确认：这是可饮用的淡水', '溪流来自岛内较高的集水区。你补满水分，也记住了可靠水源。', 'pickup');
  } else if (kind === 'freshwater' && objectiveIndex === 13) {
    water = 100;
    setObjective(14);
    showToast('远行用水已经补满', '溪谷仍然稳定。回到营地北侧，用石斧处理昨夜倒下的棕榈。', 'pickup');
    commitSave();
  } else if ((kind === 'wood' || kind === 'stone') && objectiveIndex === 1) {
    object.visible = false;
    inventory.add(kind, 1);
    renderInventory();
    const ready = inventory.count('wood') >= 4 && inventory.count('stone') >= 2;
    setObjective(ready ? 2 : 1);
    showToast(kind === 'wood' ? '木料已收入背包' : '石块已收入背包', ready ? '工具材料已经齐全。打开背包制作第一把石斧。' : '继续观察潮线和岩岬，凑齐 4 份木料与 2 块石头。', 'pickup');
  } else if (kind === 'camp' && objectiveIndex === 3) {
    if (inventory.equipped.tool !== 'stone_axe' || inventory.count('wood') < 3) {
      showToast('还不能搭建棚屋', '需要装备石斧，并保留 3 份木料。');
      return;
    }
    inventory.remove('wood', 3);
    shelterBuilt = true;
    fireFuel = 64;
    wetness = 42;
    world.showShelter();
    fireFx = createFireEffect();
    weatherManual = true;
    world.setWeather('rain');
    renderInventory();
    setObjective(4);
    showToast('避雨棚搭建完成', '热带阵雨正在逼近。留在棚下，观察湿度下降与营火受到保护。', 'build');
  } else if (kind === 'fishing' && objectiveIndex === 5) {
    fishingInProgress = true;
    character.play('Interact');
    world.triggerFishingRipple(elapsed);
    setObjective(5);
    showToast('简易手线已经放入潟湖', '浅水鱼群正在靠近。保持安静，等待鱼线绷紧。');
    setTimeout(() => {
      fishingInProgress = false;
      inventory.add('raw_fish', 1);
      renderInventory();
      setObjective(6);
      showToast('捕获一条新鲜礁鱼', '这还不是安全食物。把它带回被棚屋保护的营火。', 'fish');
    }, 1450);
  } else if (kind === 'camp' && objectiveIndex === 6) {
    if (!inventory.remove('raw_fish', 1)) return;
    inventory.add('cooked_fish', 1);
    energy = Math.min(100, energy + 22);
    renderInventory();
    setObjective(7);
    showToast('第一日生存完成', '淡水、工具、棚屋、火源和食物终于连成系统。你不再只是等待获救。', 'complete');
    commitSave();
  } else if (kind === 'wood' && objectiveIndex === 8) {
    object.visible = false;
    inventory.add('wood', 1);
    renderInventory();
    setObjective(9);
    showToast('找到一份过夜木料', '把它带回营火。夜里的火需要真实燃料才能继续燃烧。', 'pickup');
    commitSave();
  } else if (kind === 'camp' && objectiveIndex === 9) {
    if (!inventory.remove('wood', 1)) return;
    fireFuel = 100;
    renderInventory();
    setObjective(10);
    showToast('营火已经补足燃料', '火光变亮，棚屋周围重新温暖。现在可以在棚下休息。', 'fuel');
    commitSave();
  } else if (kind === 'shelter' && objectiveIndex === 10) {
    sleepUntilDawn();
  } else if (kind === 'fallen-tree' && objectiveIndex === 14) {
    if (inventory.equipped.tool !== 'stone_axe') {
      showToast('倒木太粗，无法徒手移动', '需要装备石斧才能把树干劈开并拖离通道。');
      return;
    }
    fallenTreeCleared = true;
    world.clearFallenTree();
    character.play('Interact');
    setObjective(15);
    showToast('倒木已经移出林道', '原本封闭的土径露了出来。折断的枝叶都朝向北侧，那里承受了更强的夜风。', 'build');
    commitSave();
  } else if (kind === 'forest-pass' && objectiveIndex === 15) {
    setObjective(16);
    showToast('确认：这是通向岛心的湿润林道', '蕨类和集水洼地说明这里比南湾更湿。继续沿玄武岩边缘向北。', 'pickup');
  } else if (kind === 'lookout' && objectiveIndex === 16) {
    cameraYaw = 0;
    cameraPitch = 0.34;
    cameraDistance = isMobile ? 12 : 11;
    setObjective(17);
    showToast('抵达岛心观察缘', '脚下仍是平坦安全的地面。前方山脊缺口打开了北侧海面，再观察一次远海。');
  } else if (kind === 'lookout' && objectiveIndex === 17) {
    signalRevealed = true;
    stormTime = 150;
    world.revealSignal();
    weatherManual = true;
    world.setWeather('storm');
    setObjective(18);
    showToast('远海出现持续烟柱', '它不像云，也没有随风消散。更近的积雨云已经压向岛屿，先返回南湾营地。', 'complete');
    commitSave();
  } else if (kind === 'camp' && objectiveIndex === 18) {
    setObjective(19);
    showToast('第二日侦察完成', '你安全带回了林道、观察缘与远海信号的位置。营地将成为下一轮风暴准备的起点。', 'complete');
    commitSave();
  }
}

function updateInteractionPrompt() {
  currentInteractable = findInteraction();
  const prompt = document.querySelector('#interaction-prompt');
  if (!currentInteractable) {
    prompt.classList.remove('is-visible');
    return;
  }
  const kind = currentInteractable.userData.kind;
  const action = kind === 'freshwater' ? (objectiveIndex === 13 ? '补满远行用水' : '检查并饮用')
    : kind === 'fishing' ? '放下简易手线'
      : kind === 'shelter' ? '在棚屋休息到黎明'
        : kind === 'fallen-tree' ? '用石斧劈开倒木'
          : kind === 'forest-pass' ? '辨认湿润林道'
            : kind === 'lookout' ? (objectiveIndex === 16 ? '走到观察缘' : '观察海鸟与远海')
              : kind === 'camp' ? (objectiveIndex === 3 ? '搭建避雨棚' : objectiveIndex === 6 ? '在营火上烤鱼' : objectiveIndex === 9 ? '给营火补充燃料' : '回到营地避开风暴') : '拾取';
  prompt.querySelector('strong').textContent = action;
  prompt.querySelector('span').textContent = currentInteractable.userData.label;
  prompt.classList.add('is-visible');
}

function updatePlayer(delta) {
  const controlsPaused = document.querySelector('#inventory-drawer').classList.contains('is-open') || document.querySelector('#field-notes').classList.contains('is-open') || document.querySelector('#reset-dialog').classList.contains('is-open');
  const x = controlsPaused ? 0 : (input.right ? 1 : 0) - (input.left ? 1 : 0) + joystick.x;
  const y = controlsPaused ? 0 : (input.up ? 1 : 0) - (input.down ? 1 : 0) - joystick.y;
  const length = Math.hypot(x, y);
  const moving = length > 0.08;
  const sprinting = moving && input.run && energy > 4;

  if (moving) {
    forward.set(-Math.sin(cameraYaw), 0, -Math.cos(cameraYaw));
    right.set(Math.cos(cameraYaw), 0, -Math.sin(cameraYaw));
    moveDirection.copy(forward).multiplyScalar(y).addScaledVector(right, x).normalize();
    const speed = sprinting ? 6.2 : 3.55;
    nextPosition.copy(character.model.position).addScaledVector(moveDirection, speed * delta);
    nextPosition.y = LEVEL.playerSpawn.y;
    const blockedByTree = phase === 'day2' && !fallenTreeCleared && nextPosition.distanceTo(LEVEL.fallenTree) < 2.7;
    if (isNavigable(nextPosition) && !blockedByTree) character.model.position.copy(nextPosition);
    const desiredRotation = Math.atan2(moveDirection.x, moveDirection.z);
    let difference = desiredRotation - character.model.rotation.y;
    difference = Math.atan2(Math.sin(difference), Math.cos(difference));
    character.model.rotation.y += difference * Math.min(1, delta * 12);
    energy = Math.max(0, energy - delta * (sprinting ? 1.5 : 0.12));
    character.play(sprinting ? 'Running_A' : 'Walking_A');
  } else {
    energy = Math.min(100, energy + delta * 0.75);
    character.play('Idle_A');
  }
  water = Math.max(0, water - delta * 0.018);
  if (phase === 'day2' && objectiveIndex >= 12) fullness = Math.max(0, fullness - delta * 0.009);
}

function updateCamera(delta) {
  const focus = character.model.position;
  cameraTarget.set(focus.x, focus.y + 1.25, focus.z);
  const horizontal = Math.cos(cameraPitch) * cameraDistance;
  desiredCamera.set(
    focus.x + Math.sin(cameraYaw) * horizontal,
    focus.y + 1.5 + Math.sin(cameraPitch) * cameraDistance,
    focus.z + Math.cos(cameraYaw) * horizontal,
  );
  camera.position.lerp(desiredCamera, 1 - Math.exp(-delta * 8));
  const currentLook = camera.userData.lookTarget ?? cameraTarget.clone();
  currentLook.lerp(cameraTarget, 1 - Math.exp(-delta * 10));
  camera.userData.lookTarget = currentLook;
  camera.lookAt(currentLook);
}

function objectiveTarget() {
  if (objectiveIndex === 0) return LEVEL.freshwater;
  if (objectiveIndex === 3 || objectiveIndex === 6 || objectiveIndex === 9) return LEVEL.camp;
  if (objectiveIndex === 4 || objectiveIndex === 10) return LEVEL.shelter;
  if (objectiveIndex === 5) return LEVEL.fishing;
  if (objectiveIndex === 13) return LEVEL.freshwater;
  if (objectiveIndex === 14) return LEVEL.fallenTree;
  if (objectiveIndex === 15) return LEVEL.forestPass;
  if (objectiveIndex === 16 || objectiveIndex === 17) return LEVEL.lookout;
  if (objectiveIndex === 18) return LEVEL.camp;
  if (objectiveIndex === 1 || objectiveIndex === 8) {
    let best = null;
    let bestDistance = Infinity;
    for (const object of world.interactables) {
      const kind = object.userData.kind;
      const stillNeeded = objectiveIndex === 8
        ? kind === 'wood' && inventory.count('wood') < 1
        : (kind === 'wood' && inventory.count('wood') < 4) || (kind === 'stone' && inventory.count('stone') < 2);
      if (!stillNeeded || !object.visible) continue;
      const distance = object.position.distanceTo(character.model.position);
      if (distance < bestDistance) { best = object.position; bestDistance = distance; }
    }
    return best;
  }
  return null;
}

function updateHud() {
  const position = character.model.position;
  const zone = getZone(position);
  document.querySelector('#zone-name').textContent = zone.name;
  document.querySelector('#weather-name').textContent = world.weather;
  document.querySelector('#water-value').textContent = Math.round(water);
  document.querySelector('#energy-value').textContent = Math.round(energy);
  document.querySelector('#wetness-value').textContent = Math.round(wetness);
  document.querySelector('#fuel-value').textContent = Math.round(fireFuel);
  document.querySelector('#fullness-value').textContent = Math.round(fullness);
  document.querySelector('#water-fill').style.width = `${water}%`;
  document.querySelector('#energy-fill').style.width = `${energy}%`;
  document.querySelector('#wetness-fill').style.width = `${wetness}%`;
  document.querySelector('#fuel-fill').style.width = `${fireFuel}%`;
  document.querySelector('#fullness-fill').style.width = `${fullness}%`;

  const baseMinutes = phase === 'night1' ? 20 * 60 + 12 : phase === 'day2' ? 5 * 60 + 42 : 16 * 60 + 35;
  const minutes = baseMinutes + Math.floor(elapsed / 2.8);
  const hour = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  document.querySelector('#day-time').textContent = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  document.querySelector('#day-label').textContent = day === 2 ? '第二日' : phase === 'night1' ? '第一夜' : '第一日';

  const playerMarker = document.querySelector('#map-player');
  playerMarker.style.left = `${50 + (position.x / 76) * 43}%`;
  playerMarker.style.top = `${50 + (position.z / 58) * 43}%`;
  const target = objectiveTarget();
  const targetMarker = document.querySelector('#map-target');
  if (target) {
    targetMarker.hidden = false;
    targetMarker.style.left = `${50 + (target.x / 76) * 43}%`;
    targetMarker.style.top = `${50 + (target.z / 58) * 43}%`;
    document.querySelector('#objective-distance').textContent = `${Math.round(position.distanceTo(target))} m`;
    world.objectiveBeacon.visible = position.distanceTo(target) > 5;
    world.objectiveBeacon.position.set(target.x, 1.7, target.z);
  } else {
    targetMarker.hidden = true;
    document.querySelector('#objective-distance').textContent = '';
    world.objectiveBeacon.visible = false;
  }
  if ([1, 4, 5, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18].includes(objectiveIndex)) setObjective(objectiveIndex);
}

function updateWeather(delta) {
  if (!weatherManual) {
    const cycle = elapsed % 110;
    world.setWeather(cycle > 52 && cycle < 82 ? 'rain' : 'clear');
  }
  const mix = world.weatherMix;
  const nightMix = world.nightMix;
  sun.intensity = THREE.MathUtils.lerp(THREE.MathUtils.lerp(3.1, 1.15, mix), 0.12, nightMix);
  hemi.intensity = THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.65, 0.82, mix), 0.26, nightMix);
  renderer.toneMappingExposure = THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.05, 0.83, mix), 0.64, nightMix);
  const dayFog = new THREE.Color(0xa5c8c7).lerp(new THREE.Color(0x74868a), mix);
  scene.fog.color.copy(dayFog).lerp(new THREE.Color(0x122635), nightMix);
  scene.fog.density = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.0062, 0.0094, mix), 0.008, nightMix);
  const inShelter = shelterBuilt && character.model.position.distanceTo(LEVEL.shelter) < 6.2;
  if (mix > 0.18) {
    wetness = THREE.MathUtils.clamp(wetness + delta * (inShelter ? -9 : 7.5) * mix, 0, 100);
  } else {
    wetness = Math.max(0, wetness - delta * 1.25);
  }
  if (objectiveIndex === 18 && signalRevealed) stormTime = Math.max(0, stormTime - delta);
  if (objectiveIndex === 4) {
    shelteredTime = inShelter ? shelteredTime + delta : Math.max(0, shelteredTime - delta * 0.6);
    if (shelteredTime >= 3) {
      world.setWeather('clear');
      setObjective(5);
      showToast('棚屋通过了第一场阵雨', '湿度正在下降，营火仍然稳定。东侧潟湖的鱼群在雨后重新靠近浅水。');
    }
  }
  if (fireFx) {
    if (phase === 'night1') fireFuel = Math.max(0, fireFuel - delta * 0.18);
    const fuelStrength = phase === 'night1' ? THREE.MathUtils.lerp(0.25, 1, fireFuel / 100) : 1;
    const protectedStrength = (shelterBuilt ? 1 : 1 - mix * 0.76) * fuelStrength;
    fireFx.flame.scale.y = (0.82 + Math.sin(elapsed * 11) * 0.16) * protectedStrength;
    fireFx.flame.rotation.y += delta * 2.8;
    fireFx.light.intensity = (3.2 + Math.sin(elapsed * 14) * 0.55) * protectedStrength;
    fireFx.light.distance = THREE.MathUtils.lerp(9, 20, fuelStrength);
  }
  audio.update({ rain: mix, fire: fireFx ? fireFuel / 100 : 0, night: nightMix });
}

let lastFrameTime = performance.now();
function frame(now = performance.now()) {
  requestAnimationFrame(frame);
  const delta = Math.min(Math.max((now - lastFrameTime) / 1000, 0), 0.05);
  lastFrameTime = now;
  if (running && character && world) {
    elapsed += delta;
    updatePlayer(delta);
    updateCamera(delta);
    world.update(elapsed, delta, character.model.position);
    updateWeather(delta);
    updateInteractionPrompt();
    updateHud();
  }
  if (character) character.mixer.update(delta);
  renderer.render(scene, camera);
}

function resize() {
  const width = innerWidth;
  const height = innerHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

const keyMap = {
  KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down',
  KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right',
  ShiftLeft: 'run', ShiftRight: 'run',
};
addEventListener('keydown', (event) => {
  const resetDialogOpen = document.querySelector('#reset-dialog').classList.contains('is-open');
  if (resetDialogOpen && event.key === 'Tab') {
    const cancel = document.querySelector('#cancel-reset');
    const confirm = document.querySelector('#confirm-reset');
    if (event.shiftKey && document.activeElement === cancel) { confirm.focus(); event.preventDefault(); }
    else if (!event.shiftKey && document.activeElement === confirm) { cancel.focus(); event.preventDefault(); }
  }
  if (keyMap[event.code]) { input[keyMap[event.code]] = true; event.preventDefault(); }
  if (event.code === 'KeyE' && !document.querySelector('#inventory-drawer').classList.contains('is-open')) interact();
  if (event.code === 'KeyI') {
    const open = !document.querySelector('#inventory-drawer').classList.contains('is-open');
    setInventoryOpen(open);
    event.preventDefault();
  }
  if (event.code === 'Escape') {
    setInventoryOpen(false);
    document.querySelector('#field-notes').classList.remove('is-open');
    document.querySelector('#field-notes').setAttribute('aria-hidden', 'true');
    closeResetDialog();
  }
});
addEventListener('keyup', (event) => {
  if (keyMap[event.code]) { input[keyMap[event.code]] = false; event.preventDefault(); }
});

canvas.addEventListener('pointerdown', (event) => {
  if (!running || cameraPointer !== null) return;
  cameraPointer = event.pointerId;
  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', (event) => {
  if (event.pointerId !== cameraPointer) return;
  const dx = event.clientX - lastPointerX;
  const dy = event.clientY - lastPointerY;
  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
  cameraYaw -= dx * 0.0052;
  cameraPitch = THREE.MathUtils.clamp(cameraPitch + dy * 0.0035, 0.2, 0.88);
});
function releaseCamera(event) {
  if (event.pointerId === cameraPointer) cameraPointer = null;
}
canvas.addEventListener('pointerup', releaseCamera);
canvas.addEventListener('pointercancel', releaseCamera);
canvas.addEventListener('wheel', (event) => {
  cameraDistance = THREE.MathUtils.clamp(cameraDistance + event.deltaY * 0.008, 6.5, 15);
  event.preventDefault();
}, { passive: false });
canvas.addEventListener('contextmenu', (event) => event.preventDefault());

const joystickBase = document.querySelector('#joystick');
const joystickKnob = document.querySelector('#joystick-knob');
let joystickPointer = null;
function updateJoystick(event) {
  const rect = joystickBase.getBoundingClientRect();
  let dx = event.clientX - (rect.left + rect.width / 2);
  let dy = event.clientY - (rect.top + rect.height / 2);
  const max = rect.width * 0.34;
  const distance = Math.hypot(dx, dy);
  if (distance > max) { dx = (dx / distance) * max; dy = (dy / distance) * max; }
  joystick.set(dx / max, dy / max);
  joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
}
joystickBase.addEventListener('pointerdown', (event) => {
  joystickPointer = event.pointerId;
  joystickBase.setPointerCapture(event.pointerId);
  updateJoystick(event);
  event.stopPropagation();
});
joystickBase.addEventListener('pointermove', (event) => {
  if (event.pointerId === joystickPointer) updateJoystick(event);
});
function resetJoystick(event) {
  if (event.pointerId !== joystickPointer) return;
  joystickPointer = null;
  joystick.set(0, 0);
  joystickKnob.style.transform = 'translate(0, 0)';
}
joystickBase.addEventListener('pointerup', resetJoystick);
joystickBase.addEventListener('pointercancel', resetJoystick);

const runButton = document.querySelector('#run-button');
runButton.addEventListener('pointerdown', (event) => { input.run = true; event.stopPropagation(); });
runButton.addEventListener('pointerup', () => { input.run = false; });
runButton.addEventListener('pointercancel', () => { input.run = false; });
document.querySelector('#action-button').addEventListener('click', interact);
document.querySelector('#sound-toggle').addEventListener('click', async () => {
  await audio.toggle();
  updateSoundButton();
  showToast(audio.isMuted() ? '环境声音已关闭' : '环境声音已开启', '任务、燃料、湿度和字幕仍会完整表达重要状态。');
});
document.querySelector('#night-button').addEventListener('click', startNight);
document.querySelector('#day-two-button').addEventListener('click', startDayTwo);
document.querySelector('#inventory-button').addEventListener('click', () => setInventoryOpen(!document.querySelector('#inventory-drawer').classList.contains('is-open')));
document.querySelector('#close-inventory').addEventListener('click', () => setInventoryOpen(false));
document.querySelector('#craft-axe-button').addEventListener('click', () => {
  if (inventory.craft('stone_axe')) {
    world.equipAxe(character.model);
    renderInventory();
    if (objectiveIndex === 2) setObjective(3);
    showToast('石斧制作并装备完成', '石刃、木柄和绑扎形成了第一件工具。回到南湾，把剩余木料搭成棚屋。', 'craft');
    setInventoryOpen(false);
  } else {
    renderInventory();
    showToast('材料不足，制作没有发生', '背包保持原样。需要 1 份木料和 2 块石头。');
  }
});
document.querySelector('#eat-fish-button').addEventListener('click', () => {
  if (objectiveIndex !== 12 || !inventory.consume('cooked_fish', 1)) {
    renderInventory();
    showToast('没有食用任何东西', '只有背包中存在烤熟的鱼，并且第二日早餐任务正在进行时才会扣除食物。');
    return;
  }
  fullness = 100;
  energy = Math.min(100, energy + 8);
  renderInventory();
  setObjective(13);
  showToast('早餐已经吃完', '饱食恢复到 100%。食物已从背包扣除，下一步去溪谷补满远行用水。', 'pickup');
  setInventoryOpen(false);
  commitSave();
});

document.querySelector('#weather-toggle').addEventListener('click', () => {
  weatherManual = true;
  const rain = world.weather !== '热带阵雨';
  world.setWeather(rain ? 'rain' : 'clear');
  document.querySelector('#weather-toggle').textContent = rain ? '切换晴天' : '观察阵雨';
});
document.querySelector('#help-button').addEventListener('click', () => {
  document.querySelector('#field-notes').classList.add('is-open');
  document.querySelector('#field-notes').setAttribute('aria-hidden', 'false');
  document.querySelector('#close-notes').focus();
});
document.querySelector('#close-notes').addEventListener('click', () => {
  document.querySelector('#field-notes').classList.remove('is-open');
  document.querySelector('#field-notes').setAttribute('aria-hidden', 'true');
  document.querySelector('#help-button').focus();
});

function openResetDialog() {
  const dialog = document.querySelector('#reset-dialog');
  dialog.classList.add('is-open');
  dialog.setAttribute('aria-hidden', 'false');
  setTimeout(() => document.querySelector('#cancel-reset').focus(), 80);
}

function closeResetDialog() {
  const dialog = document.querySelector('#reset-dialog');
  if (!dialog.classList.contains('is-open')) return;
  dialog.classList.remove('is-open');
  dialog.setAttribute('aria-hidden', 'true');
  document.querySelector('#reset-game-button').focus({ preventScroll: true });
}

document.querySelector('#reset-game-button').addEventListener('click', openResetDialog);
document.querySelector('#cancel-reset').addEventListener('click', closeResetDialog);
document.querySelector('#confirm-reset').addEventListener('click', () => {
  clearGame(localStorage);
  location.href = `${location.pathname}?fresh=1`;
});

startButton.addEventListener('click', () => {
  audio.unlock().then(updateSoundButton).catch(() => updateSoundButton());
  document.querySelector('#start-screen').classList.add('is-hidden');
  document.querySelector('#start-screen').setAttribute('aria-hidden', 'true');
  document.querySelector('#hud').classList.add('is-active');
  running = true;
  lastFrameTime = performance.now();
  showToast(restoredCheckpoint ? (day === 2 ? '第二日清晨 · 已恢复' : phase === 'night1' ? '第一夜 · 已恢复' : '第一日营地 · 已恢复') : '南部海湾 · 第一天', restoredCheckpoint ? '人物、背包、棚屋、营火和章节进度已经从本地检查点恢复。' : '先解决淡水。地势、植被和鸟类活动都会提供线索。');
});

async function boot() {
  try {
    if (new URLSearchParams(location.search).get('fixture') === 'webgl-error') throw new Error('Deterministic capability fallback');
    setStatus('正在建立南部海湾地理…');
    [world, character] = await Promise.all([
      createWorld(scene, loadingManager, isMobile),
      loadCharacter(),
    ]);
    setObjective(0);
    renderInventory();
    updateSoundButton();
    if (!isFixture && new URLSearchParams(location.search).get('fresh') !== '1') {
      const saved = loadGame(localStorage);
      if (saved && applyCheckpoint(saved)) {
        restoredCheckpoint = saved;
        const note = document.querySelector('#save-note');
        note.hidden = false;
        note.textContent = saved.day === 2 ? '发现第二日清晨检查点，可继续探索。' : saved.phase === 'night1' ? '发现第一夜检查点，可继续守火。' : '发现第一日营地检查点。';
        document.querySelector('#save-status').textContent = saved.day === 2 ? '第二日清晨 · 可恢复' : saved.phase === 'night1' ? '第一夜 · 可恢复' : '第一日营地 · 可恢复';
      }
    }
    camera.position.set(55, 17, 82);
    camera.userData.lookTarget = new THREE.Vector3(0, 1, 0);
    camera.lookAt(camera.userData.lookTarget);
    loadingBar.style.width = '100%';
    loadingText.textContent = '南部海湾已就绪 · 第二日侦察 / 岛心林道 / 远海信号 / 本地检查点';
    startButton.disabled = false;
    startButton.textContent = restoredCheckpoint ? (day === 2 ? '继续第二日' : phase === 'night1' ? '继续第一夜' : '继续营地') : '踏上南湾';
    if (import.meta.env.DEV) {
      const testHarness = {
        state: () => ({
          objectiveIndex,
          inventory: inventory.serialize(),
          water: Math.round(water),
          wetness: Math.round(wetness),
          fullness: Math.round(fullness),
          fireFuel: Math.round(fireFuel),
          phase,
          day,
          shelterBuilt,
          fallenTreeCleared,
          signalRevealed,
          stormTime: Math.round(stormTime),
          campfireVisible: world.campfire.visible,
          weather: world.weather,
          audioUnlocked: audio.isUnlocked(),
          audioMuted: audio.isMuted(),
        }),
        start: () => startButton.click(),
        completeFreshwater: () => {
          character.model.position.copy(LEVEL.freshwater);
          currentInteractable = findInteraction();
          interact();
        },
        collectRequiredResources: () => {
          for (const object of world.interactables.filter((item) => ['wood', 'stone'].includes(item.userData.kind) && item.visible)) {
            if (itemLimitReached(object.userData.kind)) continue;
            character.model.position.copy(object.position);
            currentInteractable = findInteraction();
            interact();
          }
        },
        craftAxe: () => {
          if (inventory.craft('stone_axe')) world.equipAxe(character.model);
          renderInventory();
          setObjective(3);
        },
        buildShelter: () => {
          character.model.position.copy(LEVEL.camp);
          currentInteractable = findInteraction();
          interact();
        },
        proveShelter: () => {
          character.model.position.copy(LEVEL.shelter);
          shelteredTime = 3;
          wetness = 18;
          world.setWeather('clear');
          setObjective(5);
        },
        beginFishing: () => {
          character.model.position.copy(LEVEL.fishing);
          currentInteractable = findInteraction();
          interact();
        },
        catchFish: () => {
          if (!inventory.count('raw_fish')) inventory.add('raw_fish', 1);
          renderInventory();
          setObjective(6);
        },
        cookFish: () => {
          character.model.position.copy(LEVEL.camp);
          currentInteractable = findInteraction();
          interact();
        },
        completeDayOne: () => {
          testHarness.completeFreshwater();
          testHarness.collectRequiredResources();
          testHarness.craftAxe();
          testHarness.buildShelter();
          testHarness.proveShelter();
          testHarness.catchFish();
          testHarness.cookFish();
        },
        enterNight: () => startNight(),
        collectNightWood: () => {
          const object = world.interactables.find((item) => item.userData.kind === 'wood' && item.visible);
          if (!object) return;
          character.model.position.copy(object.position);
          currentInteractable = findInteraction();
          interact();
        },
        fuelFire: () => {
          character.model.position.copy(LEVEL.camp);
          currentInteractable = findInteraction();
          interact();
        },
        reachDawn: () => {
          character.model.position.copy(LEVEL.shelter);
          finishDawn();
        },
        startDayTwo: () => startDayTwo(),
        eatBreakfast: () => document.querySelector('#eat-fish-button').click(),
        refillDayTwo: () => {
          character.model.position.copy(LEVEL.freshwater);
          currentInteractable = findInteraction();
          interact();
        },
        clearFallenTree: () => {
          character.model.position.copy(LEVEL.fallenTree).add(new THREE.Vector3(0, 0, 3.2));
          currentInteractable = findInteraction();
          interact();
        },
        crossForestPass: () => {
          character.model.position.copy(LEVEL.forestPass);
          currentInteractable = findInteraction();
          interact();
        },
        reachLookout: () => {
          character.model.position.copy(LEVEL.lookout);
          currentInteractable = findInteraction();
          interact();
        },
        surveySignal: () => {
          character.model.position.copy(LEVEL.lookout);
          currentInteractable = findInteraction();
          interact();
        },
        returnToCamp: () => {
          character.model.position.copy(LEVEL.camp);
          currentInteractable = findInteraction();
          interact();
        },
        completeToDawn: () => {
          testHarness.completeDayOne();
          testHarness.enterNight();
          testHarness.collectNightWood();
          testHarness.fuelFire();
          testHarness.reachDawn();
        },
        completeDayTwoPrep: () => {
          testHarness.completeToDawn();
          testHarness.startDayTwo();
          testHarness.eatBreakfast();
          testHarness.refillDayTwo();
        },
        completeToSignal: () => {
          testHarness.completeDayTwoPrep();
          testHarness.clearFallenTree();
          testHarness.crossForestPass();
          testHarness.reachLookout();
          testHarness.surveySignal();
        },
      };
      window.__CASTAWAY_TEST__ = testHarness;
      const fixture = new URLSearchParams(location.search).get('fixture');
      function itemLimitReached(kind) {
        return kind === 'wood' ? inventory.count('wood') >= 4 : inventory.count('stone') >= 2;
      }
      if (fixture === 'inventory') {
        testHarness.start();
        testHarness.completeFreshwater();
        testHarness.collectRequiredResources();
        setInventoryOpen(true);
      }
      if (fixture === 'rain-shelter') {
        testHarness.start();
        testHarness.completeFreshwater();
        testHarness.collectRequiredResources();
        testHarness.craftAxe();
        testHarness.buildShelter();
        character.model.position.copy(LEVEL.shelter);
      }
      if (fixture === 'lagoon-fishing') {
        testHarness.start();
        testHarness.completeFreshwater();
        testHarness.collectRequiredResources();
        testHarness.craftAxe();
        testHarness.buildShelter();
        testHarness.proveShelter();
        testHarness.beginFishing();
      }
      if (fixture === 'first-version-complete' || fixture === 'complete-day-one') {
        testHarness.start();
        testHarness.completeDayOne();
      }
      if (fixture === 'nightfall') {
        testHarness.start();
        testHarness.completeDayOne();
        testHarness.enterNight();
        character.model.position.copy(LEVEL.camp);
      }
      if (fixture === 'night-fire') {
        testHarness.start();
        testHarness.completeDayOne();
        testHarness.enterNight();
        testHarness.collectNightWood();
        testHarness.fuelFire();
      }
      if (fixture === 'dawn-day-two') {
        testHarness.start();
        testHarness.completeToDawn();
      }
      if (fixture === 'day-two-breakfast') {
        testHarness.start();
        testHarness.completeToDawn();
        testHarness.startDayTwo();
      }
      if (fixture === 'forest-gate') {
        testHarness.start();
        testHarness.completeDayTwoPrep();
        character.model.position.copy(LEVEL.fallenTree).add(new THREE.Vector3(0, 0, 4));
      }
      if (fixture === 'highland-signal') {
        testHarness.start();
        testHarness.completeToSignal();
        character.model.position.copy(LEVEL.lookout);
      }
      if (fixture === 'storm-return') {
        testHarness.start();
        testHarness.completeToSignal();
        character.model.position.copy(LEVEL.camp).add(new THREE.Vector3(0, 0, -5));
      }
      if (fixture === 'day-two-complete') {
        testHarness.start();
        testHarness.completeToSignal();
        testHarness.returnToCamp();
      }
      if (fixture === 'save-resume') {
        applyCheckpoint({
          version: 3, objectiveIndex: 18, day: 2, phase: 'day2', shelterBuilt: true, fireFuel: 78,
          water: 82, energy: 91, wetness: 14, fullness: 86, fallenTreeCleared: true, signalRevealed: true, stormTime: 118, position: LEVEL.lookout.toArray(),
          inventory: { version: 1, stacks: { stone_axe: 1, cooked_fish: 1 }, equipped: { tool: 'stone_axe' } },
        });
        testHarness.start();
      }
    }
  } catch (error) {
    console.error(error);
    loadingText.textContent = '世界加载失败。请通过本项目的 Vite 开发地址打开，而不是直接打开文件。';
    document.querySelector('#loading-error').hidden = false;
  }
}

frame();
boot();
