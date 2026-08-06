import * as THREE from "./vendor/three.module.min.js";

document.documentElement.dataset.runtimeState = "booting";

const core = window.TidewatchCore;
const level = window.TidewatchLevel;
const canvas = document.querySelector("#tidewatch-scene");
const SAVE_KEY = "research08:tidewatch:v1";
const query = new URLSearchParams(window.location.search);
const requestedFixture = query.get("fixture") || "start";
const validFixtures = new Set(["start", "low-tide", "high-tide", "near-complete", "night-fire"]);
const fixture = validFixtures.has(requestedFixture) ? requestedFixture : "start";

const ui = {
  startOverlay: document.querySelector("#start-overlay"),
  resultOverlay: document.querySelector("#result-overlay"),
  newGame: document.querySelector("#new-game-button"),
  continueGame: document.querySelector("#continue-button"),
  playAgain: document.querySelector("#play-again-button"),
  pause: document.querySelector("#pause-button"),
  restart: document.querySelector("#restart-button"),
  help: document.querySelector("#help-button"),
  helpPanel: document.querySelector("#help-panel"),
  paused: document.querySelector("#paused-label"),
  objectiveTitle: document.querySelector("#objective-title"),
  objectiveCopy: document.querySelector("#objective-copy"),
  woodCount: document.querySelector("#wood-count"),
  woodMeter: document.querySelector("#wood-meter"),
  tideTime: document.querySelector("#tide-time"),
  tideMeter: document.querySelector("#tide-meter"),
  resolveCount: document.querySelector("#resolve-count"),
  resolveMeter: document.querySelector("#resolve-meter"),
  message: document.querySelector("#world-message"),
  steps: [document.querySelector("#step-observe"), document.querySelector("#step-gather"), document.querySelector("#step-light")],
  resultKicker: document.querySelector("#result-kicker"),
  resultTitle: document.querySelector("#result-title"),
  resultCopy: document.querySelector("#result-copy"),
  resultTime: document.querySelector("#result-time"),
  resultRoute: document.querySelector("#result-route"),
  resultResolve: document.querySelector("#result-resolve"),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x6c98a6);
scene.fog = new THREE.FogExp2(0x7197a1, .018);

const camera = new THREE.PerspectiveCamera(39, window.innerWidth / window.innerHeight, .1, 120);
const cameraLook = new THREE.Vector3();
const cameraTarget = new THREE.Vector3();
const cameraOffset = new THREE.Vector3(10.5, 12.5, 14.5);

const hemi = new THREE.HemisphereLight(0xc5e6ed, 0x5a513e, 2.1);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffefcc, 2.7);
sun.position.set(-8, 18, 7);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -17;
sun.shadow.camera.right = 17;
sun.shadow.camera.top = 15;
sun.shadow.camera.bottom = -15;
scene.add(sun);

const world = new THREE.Group();
scene.add(world);

const palette = {
  sand: new THREE.MeshStandardMaterial({ color: 0xb59a66, roughness: .92, metalness: 0 }),
  wetSand: new THREE.MeshStandardMaterial({ color: 0x6d8175, roughness: .72 }),
  rock: new THREE.MeshStandardMaterial({ color: 0x364950, roughness: .95 }),
  rockLight: new THREE.MeshStandardMaterial({ color: 0x536269, roughness: .9 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x765438, roughness: .9 }),
  woodLight: new THREE.MeshStandardMaterial({ color: 0xa1774b, roughness: .86 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0x466b51, roughness: .88, side: THREE.DoubleSide }),
  cloth: new THREE.MeshStandardMaterial({ color: 0xc5b18e, roughness: .9 }),
  trousers: new THREE.MeshStandardMaterial({ color: 0x3f4b48, roughness: .95 }),
  skin: new THREE.MeshStandardMaterial({ color: 0xb98262, roughness: .82 }),
  cyan: new THREE.MeshStandardMaterial({ color: 0x6bdad8, emissive: 0x1b777b, emissiveIntensity: .85, roughness: .45 }),
  fire: new THREE.MeshStandardMaterial({ color: 0xffa447, emissive: 0xff5a19, emissiveIntensity: 3, roughness: .35 }),
};

function mesh(geometry, material, position, options = {}) {
  const value = new THREE.Mesh(geometry, material);
  value.position.set(position.x || 0, position.y || 0, position.z || 0);
  value.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
  value.scale.set(options.sx || 1, options.sy || 1, options.sz || 1);
  value.castShadow = options.cast !== false;
  value.receiveShadow = options.receive !== false;
  return value;
}

const waterUniforms = {
  uTime: { value: 0 },
  uTide: { value: 0 },
  uNight: { value: 0 },
};
const waterMaterial = new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      float wave = sin(p.x * .52 + uTime * 1.25) * .10 + cos(p.y * .42 - uTime * .92) * .08;
      p.z += wave;
      vWave = wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uNight;
    void main() {
      float bands = sin((vUv.x + vUv.y) * 90.0 + uTime * 1.4) * .5 + .5;
      vec3 dayDeep = vec3(.035, .27, .35);
      vec3 dayShallow = vec3(.09, .49, .53);
      vec3 nightDeep = vec3(.012, .055, .11);
      vec3 nightShallow = vec3(.025, .18, .25);
      vec3 deep = mix(dayDeep, nightDeep, uNight);
      vec3 shallow = mix(dayShallow, nightShallow, uNight);
      vec3 color = mix(deep, shallow, clamp(vUv.y * .58 + .2 + vWave, 0.0, 1.0));
      color += bands * .025 * (1.0 - uNight * .6);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  side: THREE.DoubleSide,
});

const ocean = mesh(new THREE.PlaneGeometry(80, 80, 80, 80), waterMaterial, { x: 0, y: -.5, z: 0 }, { rx: -Math.PI / 2, receive: true, cast: false });
world.add(ocean);

const island = mesh(new THREE.CircleGeometry(10.4, 72), palette.sand, { x: 0, y: -.03, z: 0 }, { rx: -Math.PI / 2, sz: .63, receive: true, cast: false });
world.add(island);

const wetShore = mesh(new THREE.RingGeometry(8.6, 10.22, 72), palette.wetSand, { x: 0, y: -.01, z: 0 }, { rx: -Math.PI / 2, sz: .63, receive: true, cast: false });
world.add(wetShore);

const tidalSand = mesh(new THREE.PlaneGeometry(7.3, 2.1), new THREE.MeshStandardMaterial({ color: 0x8d9b80, roughness: .72, transparent: true, opacity: .95 }), { x: -.25, y: .015, z: -2.1 }, { rx: -Math.PI / 2, cast: false });
world.add(tidalSand);
const tidalWaterMaterial = new THREE.MeshPhysicalMaterial({ color: 0x4aa2aa, transparent: true, opacity: .08, roughness: .22, metalness: 0, transmission: .2, depthWrite: false });
const tidalWater = mesh(new THREE.PlaneGeometry(7.5, 2.22), tidalWaterMaterial, { x: -.25, y: .08, z: -2.1 }, { rx: -Math.PI / 2, cast: false });
world.add(tidalWater);

const routeMarkers = [];
[-3.1, -1.2, .8, 2.65].forEach((x, index) => {
  const ring = mesh(new THREE.RingGeometry(.22, .3, 24), new THREE.MeshBasicMaterial({ color: 0x75e0df, transparent: true, opacity: 0, side: THREE.DoubleSide }), { x, y: .1, z: -2.1 + Math.sin(index) * .12 }, { rx: -Math.PI / 2, cast: false, receive: false });
  routeMarkers.push(ring);
  world.add(ring);
});

function addRock(x, z, scale, material = palette.rock) {
  const rock = mesh(new THREE.DodecahedronGeometry(.75, 0), material, { x, y: scale * .34 - .02, z }, { sx: scale, sy: scale * .68, sz: scale * .86, ry: (x + z) * .27 });
  world.add(rock);
  return rock;
}

level.obstacles.forEach((obstacle, index) => {
  if (obstacle.id === "fire-collar") return;
  addRock(obstacle.x, obstacle.z, obstacle.radius * 1.1, index % 2 ? palette.rockLight : palette.rock);
});

[
  [-8.6, 2.6, 1.4], [-6.8, 4.4, 1.8], [-4.5, 5.25, 1.55], [-1.8, 5.9, 1.75],
  [1.2, 5.75, 1.45], [4.1, 5.15, 1.75], [7.0, 4.15, 1.6], [8.8, 2.5, 1.3],
  [-9.4, -.9, .8], [9.35, -.35, .9], [-7.7, -4.15, .7], [6.9, -4.2, .75],
].forEach(([x, z, s], index) => addRock(x, z, s, index % 3 ? palette.rock : palette.rockLight));

function addPlant(x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const stem = mesh(new THREE.CylinderGeometry(.055, .09, .75, 7), palette.wood, { x: 0, y: .36, z: 0 }, { rz: .1 });
  group.add(stem);
  for (let i = 0; i < 5; i += 1) {
    const leaf = mesh(new THREE.ConeGeometry(.16, .82, 5), palette.leaf, { x: 0, y: .78, z: 0 }, { rz: Math.PI / 2, ry: i * Math.PI * 2 / 5 });
    leaf.position.x = Math.cos(i * Math.PI * 2 / 5) * .28;
    leaf.position.z = Math.sin(i * Math.PI * 2 / 5) * .28;
    group.add(leaf);
  }
  group.scale.setScalar(scale);
  world.add(group);
}

[[-7.9,1.85,.8],[-5.3,4.3,1],[-2.9,4.85,.75],[2.9,4.8,.9],[5.3,3.95,.75],[7.85,2.9,.9],[8,-1.7,.7],[-6.4,-4.35,.55]].forEach((p) => addPlant(...p));

const wreck = new THREE.Group();
wreck.position.set(-7.65, .08, -3.65);
wreck.add(mesh(new THREE.BoxGeometry(2.1, .18, .35), palette.wood, { x: 0, y: .08, z: 0 }, { ry: -.22 }));
wreck.add(mesh(new THREE.BoxGeometry(1.5, .14, .28), palette.woodLight, { x: .25, y: .13, z: .65 }, { ry: .45 }));
world.add(wreck);

const tideMarkerGroup = new THREE.Group();
tideMarkerGroup.position.set(level.tideMarker.x, 0, level.tideMarker.z);
const tidePost = mesh(new THREE.CylinderGeometry(.09, .12, 1.45, 8), palette.rockLight, { x: 0, y: .72, z: 0 });
tideMarkerGroup.add(tidePost);
for (let i = 0; i < 4; i += 1) {
  tideMarkerGroup.add(mesh(new THREE.BoxGeometry(.42, .035, .05), palette.cyan, { x: .17, y: .35 + i * .25, z: 0 }));
}
const tideHalo = mesh(new THREE.RingGeometry(.62, .72, 40), new THREE.MeshBasicMaterial({ color: 0x76e4e0, transparent: true, opacity: .7, side: THREE.DoubleSide }), { x: 0, y: .05, z: 0 }, { rx: -Math.PI / 2, cast: false, receive: false });
tideMarkerGroup.add(tideHalo);
world.add(tideMarkerGroup);

const fireGroup = new THREE.Group();
fireGroup.position.set(level.fire.x, 0, level.fire.z);
for (let i = 0; i < 12; i += 1) {
  const angle = i * Math.PI * 2 / 12;
  fireGroup.add(mesh(new THREE.DodecahedronGeometry(.22, 0), palette.rockLight, { x: Math.cos(angle) * .68, y: .17, z: Math.sin(angle) * .68 }, { sx: 1.15, sy: .72, sz: 1 }));
}
for (let i = 0; i < 3; i += 1) {
  fireGroup.add(mesh(new THREE.CylinderGeometry(.1, .12, 1.05, 7), palette.wood, { x: 0, y: .25, z: 0 }, { rz: Math.PI / 2, ry: i * Math.PI / 3 }));
}
const flames = new THREE.Group();
for (let i = 0; i < 7; i += 1) {
  const flame = mesh(new THREE.SphereGeometry(.18 + i % 2 * .06, 10, 8), palette.fire, { x: (i % 3 - 1) * .18, y: .38 + i * .12, z: ((i * 2) % 3 - 1) * .12 }, { sy: 1.7, cast: false, receive: false });
  flame.userData.phase = i * .9;
  flames.add(flame);
}
fireGroup.add(flames);
const fireLight = new THREE.PointLight(0xff8b38, 0, 9, 1.8);
fireLight.position.set(0, 1.2, 0);
fireLight.castShadow = false;
fireGroup.add(fireLight);
world.add(fireGroup);

const woodVisuals = new Map();
level.woods.forEach((wood, index) => {
  const group = new THREE.Group();
  group.position.set(wood.x, .14, wood.z);
  group.rotation.y = index * .71;
  for (let i = 0; i < 3; i += 1) {
    const log = mesh(new THREE.CylinderGeometry(.08, .1, .92, 7), i === 1 ? palette.woodLight : palette.wood, { x: (i - 1) * .13, y: .08 + i * .045, z: 0 }, { rz: Math.PI / 2, ry: .12 * i });
    group.add(log);
  }
  const glow = mesh(new THREE.RingGeometry(.38, .45, 28), new THREE.MeshBasicMaterial({ color: wood.route === "risk" ? 0x76dedc : 0xe8bd79, transparent: true, opacity: .58, side: THREE.DoubleSide }), { x: 0, y: -.08, z: 0 }, { rx: -Math.PI / 2, cast: false, receive: false });
  group.add(glow);
  woodVisuals.set(wood.id, group);
  world.add(group);
});

function createPlayer() {
  const group = new THREE.Group();
  const torso = mesh(new THREE.CapsuleGeometry(.25, .62, 4, 8), palette.cloth, { x: 0, y: 1.05, z: 0 }, { sy: 1.05 });
  const head = mesh(new THREE.SphereGeometry(.25, 16, 12), palette.skin, { x: 0, y: 1.75, z: 0 });
  const hair = mesh(new THREE.SphereGeometry(.265, 16, 8, 0, Math.PI * 2, 0, Math.PI * .58), new THREE.MeshStandardMaterial({ color: 0x2b2420, roughness: 1 }), { x: 0, y: 1.83, z: -.02 });
  const leftLeg = mesh(new THREE.CapsuleGeometry(.085, .5, 3, 7), palette.trousers, { x: -.13, y: .42, z: 0 });
  const rightLeg = leftLeg.clone(); rightLeg.position.x = .13;
  const leftArm = mesh(new THREE.CapsuleGeometry(.065, .45, 3, 7), palette.skin, { x: -.34, y: 1.12, z: 0 }, { rz: -.15 });
  const rightArm = leftArm.clone(); rightArm.position.x = .34; rightArm.rotation.z = .15;
  group.add(torso, head, hair, leftLeg, rightLeg, leftArm, rightArm);
  group.userData.parts = { leftLeg, rightLeg, leftArm, rightArm };
  return group;
}

const playerVisual = createPlayer();
world.add(playerVisual);

const birds = [];
for (let i = 0; i < 4; i += 1) {
  const bird = new THREE.Group();
  const birdMaterial = new THREE.MeshBasicMaterial({ color: 0xd8e5df, side: THREE.DoubleSide });
  bird.add(mesh(new THREE.ConeGeometry(.12, .7, 3), birdMaterial, { x: -.28, y: 0, z: 0 }, { rz: -Math.PI / 2, ry: -.3, cast: false, receive: false }));
  bird.add(mesh(new THREE.ConeGeometry(.12, .7, 3), birdMaterial, { x: .28, y: 0, z: 0 }, { rz: Math.PI / 2, ry: .3, cast: false, receive: false }));
  bird.userData.phase = i * 1.7;
  birds.push(bird);
  scene.add(bird);
}

const ship = new THREE.Group();
ship.position.set(8.2, .1, -11.5);
ship.add(mesh(new THREE.BoxGeometry(1.2, .18, .34), new THREE.MeshStandardMaterial({ color: 0x17262b, roughness: .85 }), { x: 0, y: .14, z: 0 }, { cast: false }));
ship.add(mesh(new THREE.BoxGeometry(.035, .9, .035), palette.rockLight, { x: 0, y: .62, z: 0 }, { cast: false }));
const shipLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffd38c });
const shipLight = mesh(new THREE.SphereGeometry(.12, 12, 10), shipLightMaterial, { x: 0, y: .75, z: 0 }, { cast: false, receive: false });
ship.add(shipLight);
ship.visible = false;
scene.add(ship);

let state = core.createState(level, fixture);
let running = false;
let paused = false;
let completedShown = false;
let failedShown = false;
let lastFrame = performance.now();
let saveAccumulator = 0;
let moveTarget = null;
let cameraShake = 0;
let lastMessage = "";
const keys = new Set();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const groundHit = new THREE.Vector3();
const skyDay = new THREE.Color(0x719daa);
const skyNight = new THREE.Color(0x071624);
const fogDay = new THREE.Color(0x7197a1);
const fogNight = new THREE.Color(0x081724);

function formatTime(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function getObjective() {
  if (!state.tideRead) return ["检查海湾边的潮尺", "靠近蓝色潮尺，按 E 或“行动”，先弄清海水还会给你多少时间。"];
  if (state.collectedWoodIds.length < level.fire.target) return ["选择路线，寻找漂流木", "发亮浅滩更短，但涨潮后会把你冲回岸边；内侧路线更远但始终安全。"];
  if (!state.fireLit) return ["返回高地，点亮信号火", "木材已经足够。靠近石砌火台，按 E 或“行动”完成这次自救。"];
  return ["守住这束火光", "海面已经作出回应。这个切片证明了观察、选择、行动和回报可以形成闭环。"];
}

function setMessage(message) {
  if (message === lastMessage) return;
  lastMessage = message;
  ui.message.textContent = message;
  ui.message.classList.remove("flash");
  void ui.message.offsetWidth;
  ui.message.classList.add("flash");
}

function updateHud() {
  const [title, copy] = getObjective();
  ui.objectiveTitle.textContent = title;
  ui.objectiveCopy.textContent = copy;
  ui.woodCount.textContent = `${state.collectedWoodIds.length} / ${level.fire.target}`;
  ui.woodMeter.style.width = `${Math.min(100, state.collectedWoodIds.length / level.fire.target * 100)}%`;
  ui.resolveCount.textContent = `${Math.round(state.resolve)}%`;
  ui.resolveMeter.style.width = `${state.resolve}%`;
  const tide = core.tideLevelAt(state.time);
  ui.tideTime.textContent = state.tideRead ? (tide >= 1 ? "高潮" : formatTime(core.secondsUntilHighTide(state.time))) : "未读潮";
  ui.tideMeter.style.width = `${tide * 100}%`;
  ui.steps[0].className = state.tideRead ? "done" : "active";
  ui.steps[1].className = state.tideRead ? (state.collectedWoodIds.length >= level.fire.target ? "done" : "active") : "";
  ui.steps[2].className = state.fireLit ? "done" : (state.collectedWoodIds.length >= level.fire.target ? "active" : "");
  setMessage(state.message);
}

function saveGame() {
  if (fixture !== "start" || !running) return;
  try {
    localStorage.setItem(SAVE_KEY, core.serializeState(state));
    ui.continueGame.hidden = false;
  } catch (_error) {
    // Storage may be unavailable in private contexts; the game remains fully playable.
  }
}

function getSavedState() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    return saved ? core.restoreState(saved, level) : null;
  } catch (_error) {
    return null;
  }
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (_error) { /* no-op */ }
}

function startGame(nextState, clearExisting = false) {
  if (clearExisting) clearSave();
  state = nextState;
  running = true;
  paused = false;
  completedShown = false;
  failedShown = false;
  moveTarget = null;
  ui.startOverlay.hidden = true;
  ui.resultOverlay.hidden = true;
  ui.paused.hidden = true;
  ui.pause.textContent = "暂停";
  updateHud();
  updateWorldVisuals(0);
  saveGame();
}

function restartGame() {
  startGame(core.createState(level), true);
}

function showResult(success) {
  if (fixture !== "start") return;
  ui.resultOverlay.hidden = false;
  if (success) {
    ui.resultKicker.textContent = "CHECKPOINT COMPLETE";
    ui.resultTitle.textContent = "海面回应了火光";
    ui.resultCopy.textContent = "这不是完整生存游戏，但已经形成一次可验证的体验：读懂环境、选择风险、完成行动，并让世界发生可见变化。";
  } else {
    ui.resultKicker.textContent = "CHECKPOINT FAILED";
    ui.resultTitle.textContent = "海水暂时占了上风";
    ui.resultCopy.textContent = "失败来自一条可解释的规则：高潮后的浅滩不再安全。重试时可以走更长的内侧路线。";
  }
  ui.resultTime.textContent = formatTime(state.time);
  const riskyCount = state.collectedWoodIds.filter((id) => id.includes("risk")).length;
  ui.resultRoute.textContent = riskyCount >= 2 ? "潮池捷径" : "内侧路线";
  ui.resultResolve.textContent = `${Math.round(state.resolve)}%`;
}

function performAction() {
  if (!running || paused || state.status !== "playing") return;
  if (!state.tideRead && core.inspectTide(state, level)) {
    saveGame();
    updateHud();
    return;
  }
  if (core.tryLightFire(state, level)) {
    saveGame();
    updateHud();
    return;
  }
  if (core.distance(state.player, level.tideMarker) <= level.tideMarker.radius) {
    state.message = `距离高潮还有 ${formatTime(core.secondsUntilHighTide(state.time))}`;
  } else if (core.distance(state.player, level.fire) <= level.fire.radius + .5) {
    core.tryLightFire(state, level);
  } else {
    state.message = "这里没有需要操作的东西";
  }
  updateHud();
}

function updateMovement(dt) {
  let dx = 0;
  let dz = 0;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) dx -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) dx += 1;
  if (keys.has("KeyW") || keys.has("ArrowUp")) dz -= 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) dz += 1;
  if (dx || dz) moveTarget = null;
  if (!dx && !dz && moveTarget) {
    const targetDistance = core.distance(state.player, moveTarget);
    if (targetDistance < .18) moveTarget = null;
    else {
      dx = moveTarget.x - state.player.x;
      dz = moveTarget.z - state.player.z;
    }
  }
  const length = Math.hypot(dx, dz);
  if (!length) return false;
  dx /= length;
  dz /= length;
  const sprinting = keys.has("ShiftLeft") || keys.has("ShiftRight");
  const speed = sprinting ? 4.45 : 2.85;
  const desired = { x: state.player.x + dx * speed * dt, z: state.player.z + dz * speed * dt };
  const resolved = core.resolveMove(state.player, desired, level);
  const moved = core.distance(state.player, resolved) > .0001;
  state.player = resolved;
  if (moved) playerVisual.rotation.y = Math.atan2(dx, dz);
  return moved;
}

function updateWorldVisuals(dt, moved = false) {
  const tide = core.tideLevelAt(state.time);
  const night = state.fireLit ? 1 : core.clamp((state.time - 105) / 55, 0, .82);
  waterUniforms.uTime.value += dt;
  waterUniforms.uTide.value = tide;
  waterUniforms.uNight.value = night;
  tidalWaterMaterial.opacity = .08 + tide * .72;
  tidalWater.position.y = .055 + tide * .13;
  tidalSand.material.opacity = 1 - tide * .72;
  routeMarkers.forEach((marker, index) => {
    marker.material.opacity = state.tideRead ? Math.max(.12, .72 - tide * .72) * (.82 + Math.sin(state.time * 3 + index) * .18) : 0;
  });
  tideHalo.material.opacity = state.tideRead ? .25 : .58 + Math.sin(state.time * 3) * .18;
  tideHalo.rotation.z += dt * .35;

  const sky = skyDay.clone().lerp(skyNight, night);
  const fog = fogDay.clone().lerp(fogNight, night);
  scene.background.copy(sky);
  scene.fog.color.copy(fog);
  hemi.intensity = 2.1 - night * 1.3;
  sun.intensity = 2.7 - night * 2.15;
  renderer.toneMappingExposure = 1.05 - night * .2;

  flames.visible = state.fireLit;
  fireLight.intensity = state.fireLit ? 6.5 + Math.sin(state.time * 8) * .65 : 0;
  flames.children.forEach((flame, index) => {
    const pulse = 1 + Math.sin(state.time * 8 + flame.userData.phase) * .18;
    flame.scale.set(pulse, 1 + Math.sin(state.time * 6 + index) * .25, pulse);
    flame.position.x += Math.sin(state.time * 4 + index) * dt * .035;
  });
  ship.visible = state.fireLit;
  shipLight.scale.setScalar(1 + Math.sin(state.time * 5) * .3);

  woodVisuals.forEach((visual, id) => {
    const collected = state.collectedWoodIds.includes(id);
    visual.visible = !collected;
    if (!collected) {
      visual.position.y = .14 + Math.sin(state.time * 2.3 + visual.position.x) * .025;
      visual.children[visual.children.length - 1].rotation.z += dt * .4;
    }
  });

  playerVisual.position.set(state.player.x, 0, state.player.z);
  const parts = playerVisual.userData.parts;
  const stride = moved ? Math.sin(state.time * 10) * .55 : 0;
  parts.leftLeg.rotation.x = stride;
  parts.rightLeg.rotation.x = -stride;
  parts.leftArm.rotation.x = -stride * .7;
  parts.rightArm.rotation.x = stride * .7;

  birds.forEach((bird, index) => {
    const angle = state.time * (.11 + index * .012) + bird.userData.phase;
    bird.position.set(Math.cos(angle) * (12 + index), 7 + Math.sin(angle * 2) * .5, Math.sin(angle) * (8 + index * .6));
    bird.rotation.y = -angle;
    bird.children.forEach((wing, wingIndex) => { wing.rotation.y = (wingIndex ? .3 : -.3) + Math.sin(state.time * 5 + index) * .18; });
  });
}

function updateCamera(dt) {
  cameraTarget.set(state.player.x + cameraOffset.x, cameraOffset.y, state.player.z + cameraOffset.z);
  if (cameraShake > 0) {
    cameraShake = Math.max(0, cameraShake - dt);
    cameraTarget.x += (Math.random() - .5) * cameraShake * .7;
    cameraTarget.y += (Math.random() - .5) * cameraShake * .4;
  }
  const lerp = 1 - Math.pow(.001, Math.min(dt, .05));
  camera.position.lerp(cameraTarget, lerp);
  cameraLook.set(state.player.x + .65, .35, state.player.z - .35);
  camera.lookAt(cameraLook);
}

function tick(time) {
  const dt = Math.min(.04, (time - lastFrame) / 1000 || 0);
  lastFrame = time;
  let moved = false;

  if (running && !paused && state.status === "playing") {
    core.advanceTime(state, dt);
    moved = updateMovement(dt);
    const collected = core.collectNearby(state, level);
    if (collected) saveGame();
    if (core.applyWaveHit(state, level)) {
      moveTarget = null;
      cameraShake = .75;
      saveGame();
    }
    saveAccumulator += dt;
    if (saveAccumulator >= 2) {
      saveAccumulator = 0;
      saveGame();
    }
    updateHud();
  }

  if (state.status === "complete" && !completedShown) {
    completedShown = true;
    running = fixture !== "start";
    window.setTimeout(() => showResult(true), 900);
  }
  if (state.status === "failed" && !failedShown) {
    failedShown = true;
    running = false;
    window.setTimeout(() => showResult(false), 500);
  }

  updateWorldVisuals(dt, moved);
  updateCamera(dt);
  renderer.render(scene, camera);
  canvas.dataset.drawCalls = String(renderer.info.render.calls);
  canvas.dataset.triangles = String(renderer.info.render.triangles);
  requestAnimationFrame(tick);
}

function setKey(event, down) {
  const code = event.code || event.currentTarget.dataset.key;
  if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ShiftLeft", "ShiftRight", "KeyE", "Space"].includes(code)) event.preventDefault();
  if (code === "KeyE" || code === "Space") {
    if (down && !event.repeat) performAction();
    return;
  }
  if (down) keys.add(code); else keys.delete(code);
}

function setPointerTarget(event) {
  if (!running || paused || event.target !== canvas) return;
  pointer.x = event.clientX / window.innerWidth * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  if (!raycaster.ray.intersectPlane(groundPlane, groundHit)) return;
  const target = { x: groundHit.x, z: groundHit.z };
  if (core.isWalkable(target, level)) {
    moveTarget = target;
    state.message = "沿海岸移动";
  } else {
    state.message = "那一处无法安全抵达";
  }
  updateHud();
}

window.addEventListener("keydown", (event) => setKey(event, true));
window.addEventListener("keyup", (event) => setKey(event, false));
window.addEventListener("blur", () => keys.clear());
window.addEventListener("resize", () => {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
canvas.addEventListener("pointerdown", setPointerTarget);

document.querySelectorAll("[data-key]").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    button.setPointerCapture?.(event.pointerId);
    setKey({ code: button.dataset.key, currentTarget: button, preventDefault() {}, repeat: false }, true);
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((name) => button.addEventListener(name, () => {
    setKey({ code: button.dataset.key, currentTarget: button, preventDefault() {}, repeat: false }, false);
  }));
});
document.querySelector("#action-touch").addEventListener("click", performAction);

ui.newGame.addEventListener("click", restartGame);
ui.continueGame.addEventListener("click", () => {
  const saved = getSavedState();
  startGame(saved || core.createState(level));
});
ui.playAgain.addEventListener("click", restartGame);
ui.restart.addEventListener("click", restartGame);
ui.pause.addEventListener("click", () => {
  if (!running || state.status !== "playing") return;
  paused = !paused;
  ui.paused.hidden = !paused;
  ui.pause.textContent = paused ? "继续" : "暂停";
  keys.clear();
});
ui.help.addEventListener("click", () => {
  const open = ui.help.getAttribute("aria-expanded") === "true";
  ui.help.setAttribute("aria-expanded", String(!open));
  ui.helpPanel.hidden = open;
});

const savedState = getSavedState();
ui.continueGame.hidden = !savedState;
camera.position.set(state.player.x + cameraOffset.x, cameraOffset.y, state.player.z + cameraOffset.z);
updateHud();
updateWorldVisuals(0);

if (fixture !== "start") startGame(core.createState(level, fixture));

window.__TIDEWATCH__ = {
  level,
  fixture,
  renderer,
  get state() { return state; },
  getSnapshot() {
    return {
      fixture,
      status: state.status,
      tideRead: state.tideRead,
      wood: state.collectedWoodIds.length,
      tide: core.tideLevelAt(state.time),
      resolve: state.resolve,
      player: { ...state.player },
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
    };
  },
};

document.documentElement.dataset.runtimeState = "ready";

requestAnimationFrame(tick);
