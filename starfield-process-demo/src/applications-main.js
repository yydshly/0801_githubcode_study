import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { APPLICATION_CATALOG, getApplication, isLiveApplication } from './application-catalog.js';
import { createRuralWorld, WEATHER_LABELS } from './rural-world.js';
import { createParkWorld } from './park-world.js';
import './applications-styles.css';

const compact = window.matchMedia('(max-width: 720px)').matches;
const fixtureMode = ['127.0.0.1', 'localhost'].includes(window.location.hostname) && new URLSearchParams(window.location.search).has('gameFixtures');
const requestedApplicationId = new URLSearchParams(window.location.search).get('application');
const initialApplicationId = APPLICATION_CATALOG.some((application) => application.id === requestedApplicationId) ? requestedApplicationId : 'rural-seasons';
const appRoot = document.querySelector('#app');

appRoot.innerHTML = `
  <div class="application-shell" data-mode="rural-seasons">
    <canvas id="application-canvas" tabindex="0" aria-label="可交互的乡村应用场景" aria-describedby="interaction-hint"></canvas>
    <div class="application-noise"></div>
    <div class="application-vignette"></div>

    <header class="application-topbar">
      <a class="application-brand" href="#top" aria-label="真实场景应用展厅首页">
        <span class="brand-mark"><i></i><i></i><i></i></span>
        <span><strong>REAL SCENES</strong><small>APPLICATION GALLERY / CASE 03</small></span>
      </a>
      <div class="application-top-meta">
        <span class="gallery-chip"><i></i>SPATIAL APPLICATIONS</span>
        <a class="lab-link" href="./project.html">研究总览 ↗</a>
        <a class="lab-link" href="./skills.html">24 SKILL 地图 ↗</a>
        <a class="lab-link" href="./index.html">技能原理实验室 ↗</a>
        <button id="toggle-focus" class="focus-control" aria-pressed="false"><span>FOCUS</span>聚焦 3D</button>
      </div>
    </header>

    <main id="top" class="application-stage">
      <section class="application-hero" aria-labelledby="application-title">
        <p id="app-kicker" class="eyebrow">${APPLICATION_CATALOG[0].kicker}</p>
        <h1 id="application-title">${APPLICATION_CATALOG[0].title}</h1>
        <p id="app-copy" class="hero-copy">${APPLICATION_CATALOG[0].copy}</p>
        <div id="app-route" class="hero-route" aria-label="应用场景路径"><span>LAND</span><b>→</b><span>LIFE</span><b>→</b><span>WEATHER</span><b>→</b><span>PURPOSE</span></div>
        <div class="hero-actions">
          <button id="toggle-application" class="scene-cta"><span class="scene-cta-kicker">NEXT LIVE CASE</span><strong>暴雨乡村巡检</strong><span class="scene-cta-arrow">→</span></button>
          <button id="toggle-process" class="process-cta"><span class="play-glyph">▶</span><span>自动构建场景</span></button>
        </div>
      </section>

      <aside class="application-panel" aria-live="polite">
        <div class="panel-head">
          <div><p id="app-panel-kicker" class="eyebrow">LIVE APPLICATION TRACE / 乡村四季</p><h2 id="app-value-title">${APPLICATION_CATALOG[0].valueTitle}</h2></div>
          <span id="app-status" class="ready-badge"><i></i>LIVE / 可体验</span>
        </div>
        <p id="app-value-copy" class="panel-copy">${APPLICATION_CATALOG[0].valueCopy}</p>
        <div class="panel-source-note"><span>DATA STATUS</span><strong id="app-data-status">PROCEDURAL SCENE / LIVE DEMO</strong></div>
        <div id="app-metrics" class="metric-grid"></div>
        <div class="process-block">
          <div class="process-block-head"><span>BUILD TRACE</span><strong id="app-stage-signal">05 / PLANNING COMPOSITE</strong></div>
          <div id="stage-tabs" class="stage-tabs" role="tablist" aria-label="应用构建阶段"></div>
          <div class="stage-narrative"><span id="app-stage-kicker">STAGE 05 / FINAL</span><h3 id="app-stage-title">规划合成</h3><p id="app-stage-copy">一张持续可拖动的 3D 沙盘，把景观、生产和建设关系放在同一视野里。</p><div class="stage-meaning"><span>PRODUCT MEANING</span><strong id="app-stage-meaning">农业规划 / 乡村旅游 / 建设展示</strong></div></div>
          <div class="stage-detail"><span id="app-input-label">INPUT</span><strong id="app-input">scene / camera / context</strong><span id="app-gpu-label">GPU OPERATION</span><strong id="app-gpu">spatial stage composite</strong></div>
        </div>
        <div class="panel-actions">
          <button id="toggle-pause" class="primary-control"><span class="pause-glyph">Ⅱ</span>暂停场景</button>
          <div class="camera-control-group" aria-label="镜头预设">
            <button class="camera-btn is-active" data-camera="overview">总览</button>
            <button class="camera-btn" data-camera="village" aria-pressed="false">村口</button>
            <button class="camera-btn" data-camera="fields" aria-pressed="false">农田</button>
          </div>
        </div>
        <div class="process-owner"><span>PROCESS OWNER</span><span id="app-owner">${APPLICATION_CATALOG[0].owner}</span></div>
      </aside>

      <section class="scene-controls" aria-label="场景控制">
        <div class="control-heading"><span>SCENE CONTROLS</span><strong id="app-context-label">乡村四季 · 夏季 · 晴天</strong></div>
        <div class="control-row"><span class="control-label">SEASON</span><div class="segmented-control" id="season-controls"><button data-season="spring">春</button><button data-season="summer" class="is-active">夏</button><button data-season="autumn">秋</button><button data-season="winter">冬</button></div></div>
        <div class="control-row"><span class="control-label">WEATHER</span><div class="segmented-control" id="weather-controls"><button data-weather="clear" class="is-active">晴天</button><button data-weather="overcast">阴天</button><button data-weather="storm">暴雨</button><button data-weather="fog">雾天</button><button data-weather="snow">降雪</button></div></div>
        <div class="control-row time-row"><span class="control-label">TIME</span><input id="time-control" type="range" min="5" max="22" step="0.5" value="16" aria-label="时间"><output id="time-readout">16:00 / GOLDEN HOUR</output></div>
      </section>

      <section id="game-hud" class="game-hud" hidden aria-live="polite" aria-label="夜雨乡村调查任务状态">
        <div class="game-hud-head"><div><span>NIGHT RAIN / FIELD MISSION</span><strong id="game-quest-title">检查村口排水口</strong></div><b id="game-status-badge">INVESTIGATING</b></div>
        <p id="game-message">暴雨正在加剧。先检查村口排水口。</p>
        <div class="game-risk-head"><span>STORM RISK <strong id="game-risk-value">00%</strong></span><b id="game-zone-label">村口安全点</b></div>
        <div id="game-risk-track" class="game-risk-track" role="progressbar" aria-label="暴雨风险" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="game-risk-fill"></i></div>
        <div class="game-progress"><span>调查 <strong id="game-quest-progress">00 / 03</strong></span><span>物资 <strong id="game-pickup-progress">00 / 02</strong></span></div>
        <div class="game-kit"><span id="game-map-state">ROUTE MAP / 未取得</span><span id="game-battery-state">BATTERY / 基础</span></div>
        <button id="game-reset" class="game-reset">↺ 重置调查</button>
      </section>

      <div id="game-controls" class="game-controls" hidden aria-label="乡村探索移动控件">
        <div class="game-control-label">MOVE / 方向移动</div>
        <div class="game-pad"><button class="game-pad-btn game-pad-up" data-move="up" aria-label="向上移动">↑</button><button class="game-pad-btn game-pad-left" data-move="left" aria-label="向左移动">←</button><button class="game-pad-btn game-pad-down" data-move="down" aria-label="向下移动">↓</button><button class="game-pad-btn game-pad-right" data-move="right" aria-label="向右移动">→</button></div>
        <button id="game-action" class="game-action">INTERACT <span>互动</span></button>
      </div>

      <div id="game-fixtures" class="game-fixtures" ${fixtureMode ? '' : 'hidden'} aria-label="夜雨关卡本地验收控件">
        <span>LOCAL GAME FIXTURES</span>
        <button data-game-fixture="gate">排水口</button><button data-game-fixture="map">路线图</button><button data-game-fixture="pump">泵站</button><button data-game-fixture="battery">电池</button><button data-game-fixture="road">东侧道路</button><button data-game-fixture="exit">返回灯标</button><button data-game-fixture="collision">碰撞</button><button data-game-fixture="risk">风险救援</button><button data-game-fixture="reset">重置</button>
      </div>

      <button id="park-drawer-toggle" class="park-drawer-toggle" hidden aria-expanded="true"><span>SITE TWIN</span><strong id="park-drawer-label">园区控制 · 全部 · 晴天</strong><b>展开</b></button>
      <section id="park-controls" class="park-controls" hidden aria-label="园区孪生图层与天气控制">
        <div class="park-control-mobile-head"><span>SITE TWIN CONTROLS</span><button id="park-drawer-close" aria-label="收起园区控制">收起</button></div>
        <div class="control-heading"><span>SITE TWIN CONTROLS</span><strong id="park-context-label">园区孪生 · 全部 · 晴天</strong></div>
        <div class="control-row"><span class="control-label">LAYERS</span><div class="segmented-control" id="park-layer-controls"><button data-park-layer="all" class="is-active">全部</button><button data-park-layer="architecture">建筑</button><button data-park-layer="circulation">道路</button><button data-park-layer="greenery">绿化</button><button data-park-layer="operations">摄像头</button></div></div>
        <div class="control-row"><span class="control-label">WEATHER</span><div class="segmented-control" id="park-weather-controls"><button data-park-weather="clear" class="is-active">晴天</button><button data-park-weather="overcast">阴天</button><button data-park-weather="storm">暴雨</button><button data-park-weather="fog">雾天</button></div></div>
        <div class="control-row time-row"><span class="control-label">TIME</span><input id="park-time-control" type="range" min="5" max="22" step="0.5" value="15.5" aria-label="园区时间"><output id="park-time-readout">15:30 / DAYLIGHT</output></div>
      </section>

      <aside id="park-detail-card" class="park-detail-card" hidden aria-live="polite" aria-label="园区选中对象详情">
        <div class="park-detail-head"><span>SELECTED OBJECT</span><button id="park-detail-close" aria-label="关闭对象详情">×</button></div>
        <h3 id="park-detail-title">中央服务中心</h3>
        <p id="park-detail-copy">点击建筑、道路或摄像头，查看它在园区运营中的作用。</p>
        <div class="park-detail-meta"><span id="park-detail-type">建筑</span><strong id="park-detail-status">综合服务</strong></div>
      </aside>

      <nav class="application-dock" aria-label="应用场景目录">
        <span class="dock-label">APPLICATIONS</span>
        <div id="application-list" class="application-list"></div>
      </nav>

      <div class="application-status"><span class="status-line"><i></i><span id="runtime-status">RUNTIME READY / SPATIAL STAGE</span></span><span id="interaction-hint">DRAG TO ORBIT · WHEEL TO ZOOM · 1—5 SELECT STAGE</span></div>
      <div id="runtime-error" class="runtime-error" hidden><strong>场景增强层暂不可用</strong><p>应用说明仍然可读。请检查浏览器的 WebGL 能力后重新加载。</p></div>
    </main>
  </div>
`;

const shell = document.querySelector('.application-shell');
const canvas = document.querySelector('#application-canvas');
const runtimeError = document.querySelector('#runtime-error');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(43, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(10.4, 7.6, 11.3);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = compact ? 5.4 : 5.2;
controls.maxDistance = compact ? 17 : 22;
controls.maxPolarAngle = Math.PI * 0.47;
controls.target.set(0, 0.35, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.2 : 1.6));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;

const ruralWorld = createRuralWorld({ compact });
scene.add(ruralWorld.root);
if (['127.0.0.1', 'localhost'].includes(window.location.hostname)) {
  window.__NIGHT_RAIN_GAME__ = {
    getState: ruralWorld.getGameState,
    teleport: ruralWorld.debugSetGamePlayer,
    setRisk: ruralWorld.debugSetGameRisk,
    step: ruralWorld.debugStepGame,
    interact: ruralWorld.interactGame,
    reset: ruralWorld.resetGame,
  };
}
const parkWorld = createParkWorld({ compact });
parkWorld.root.visible = false;
scene.add(parkWorld.root);
scene.background = new THREE.Color(0x54747c);
scene.fog = new THREE.FogExp2(0x54747c, 0.012);

const state = {
  applicationId: initialApplicationId,
  stage: 4,
  paused: false,
  focus: false,
  autoPlaying: false,
  autoClock: 0,
  cameraTween: null,
  parkDrawerOpen: true,
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const canvasPointer = { down: false, moved: false, x: 0, y: 0 };

const gameKeys = new Set();
const gamePadState = { up: false, down: false, left: false, right: false };
const gameCamera = {
  initialized: false,
  offset: compact ? new THREE.Vector3(3.8, 9.2, 4.6) : new THREE.Vector3(4.8, 7.8, 5.7),
  lookOffset: new THREE.Vector3(0, 0.2, 0),
};
let gameUiClock = 0;

const cameraPresets = {
  overview: { position: new THREE.Vector3(10.4, 7.6, 11.3), target: new THREE.Vector3(0, 0.35, 0) },
  village: { position: new THREE.Vector3(6.2, 3.45, 6.3), target: new THREE.Vector3(1.1, 0.65, 1.25) },
  fields: { position: new THREE.Vector3(-7.2, 4.1, 4.1), target: new THREE.Vector3(-2.6, 0.12, -1.9) },
};

const parkCameraPresets = {
  overview: { position: new THREE.Vector3(11.2, 8.4, 11.6), target: new THREE.Vector3(0, 0.55, 0) },
  village: { position: new THREE.Vector3(8.2, 4.4, 7.1), target: new THREE.Vector3(-3.7, 1.0, -2.8) },
  fields: { position: new THREE.Vector3(-7.8, 4.1, 5.4), target: new THREE.Vector3(0.1, 0.4, 0.4) },
};

function activeApplication() {
  return getApplication(state.applicationId);
}

function applicationLabel(applicationId) {
  return { 'rural-seasons': '乡村四季', 'rural-storm': '暴雨巡检', 'rural-game': '夜雨调查', 'park-twin': '园区孪生', 'camping-route': '出行预演', 'night-story': '夜村故事' }[applicationId] ?? '乡村四季';
}

function isGameMode() {
  return state.applicationId === 'rural-game';
}

function isParkMode() {
  return state.applicationId === 'park-twin';
}

function activeWorld() {
  return isParkMode() ? parkWorld : ruralWorld;
}

function nextLiveApplication() {
  const live = APPLICATION_CATALOG.filter(isLiveApplication);
  const index = live.findIndex((application) => application.id === state.applicationId);
  return live[(index + 1 + live.length) % live.length];
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function formatTime(value) {
  const hour = Math.floor(value);
  const minutes = Math.round((value - hour) * 60);
  const safeMinutes = minutes === 60 ? 0 : minutes;
  const label = value < 7 ? 'BLUE HOUR' : value < 10 ? 'MORNING' : value < 16 ? 'DAYLIGHT' : value < 19 ? 'GOLDEN HOUR' : 'NIGHT FALL';
  return `${String(hour + (minutes === 60 ? 1 : 0)).padStart(2, '0')}:${String(safeMinutes).padStart(2, '0')} / ${label}`;
}

function getGameInput() {
  const up = gameKeys.has('w') || gameKeys.has('arrowup') || gamePadState.up;
  const down = gameKeys.has('s') || gameKeys.has('arrowdown') || gamePadState.down;
  const left = gameKeys.has('a') || gameKeys.has('arrowleft') || gamePadState.left;
  const right = gameKeys.has('d') || gameKeys.has('arrowright') || gamePadState.right;
  return { x: (right ? 1 : 0) - (left ? 1 : 0), z: (down ? 1 : 0) - (up ? 1 : 0) };
}

function clearGameInput() {
  gameKeys.clear();
  Object.keys(gamePadState).forEach((key) => { gamePadState[key] = false; });
  document.querySelectorAll('[data-move]').forEach((button) => button.classList.remove('is-held'));
}

function updateGameHUD() {
  if (!isGameMode()) return;
  const game = ruralWorld.getGameState();
  const hud = document.querySelector('#game-hud');
  if (hud) {
    hud.dataset.playerX = game.player.x.toFixed(2);
    hud.dataset.playerZ = game.player.z.toFixed(2);
    hud.dataset.objectiveIndex = String(game.objectiveIndex);
    hud.dataset.finished = String(game.finished);
    hud.dataset.risk = String(game.risk);
    hud.dataset.hazard = game.hazardId ?? '';
    hud.dataset.rescues = String(game.rescues);
    hud.dataset.levelValid = String(game.levelValid);
  }
  const title = game.finished ? '夜雨调查完成' : game.currentObjective?.title ?? (game.completed ? '返回村口救援灯标' : '补齐应急物资');
  const status = game.finished ? 'FINISHED' : game.completed ? 'RETURN' : game.hazardId ? 'IN HAZARD' : 'INVESTIGATING';
  setText('#game-quest-title', title);
  setText('#game-status-badge', status);
  setText('#game-message', game.message);
  setText('#game-quest-progress', `${String(Math.min(game.objectiveIndex, game.objectiveCount)).padStart(2, '0')} / ${String(game.objectiveCount).padStart(2, '0')}`);
  setText('#game-pickup-progress', `${String(game.collected).padStart(2, '0')} / ${String(game.pickupCount).padStart(2, '0')}`);
  setText('#game-risk-value', `${String(game.risk).padStart(2, '0')}%`);
  setText('#game-zone-label', game.zoneTitle);
  setText('#game-map-state', `ROUTE MAP / ${game.hasMap ? '已取得' : '未取得'}`);
  setText('#game-battery-state', `BATTERY / ${game.hasBattery ? '增强' : '基础'}`);
  const riskTrack = document.querySelector('#game-risk-track');
  const riskFill = document.querySelector('#game-risk-fill');
  if (riskTrack) riskTrack.setAttribute('aria-valuenow', String(game.risk));
  if (riskFill) riskFill.style.width = `${game.risk}%`;
  hud?.classList.toggle('is-hazard', Boolean(game.hazardId));
  hud?.classList.toggle('is-complete', game.completed || game.finished);
  const action = document.querySelector('#game-action');
  if (action) {
    const actionReady = game.nearbyAction.kind !== 'none';
    action.classList.toggle('is-ready', actionReady);
    action.innerHTML = `${game.nearbyAction.kind === 'exit' ? 'COMPLETE' : 'INTERACT'} <span>${game.nearbyAction.label}</span>`;
    action.setAttribute('aria-label', game.nearbyAction.label);
  }
}

function renderApplicationList() {
  setHtml('#application-list', APPLICATION_CATALOG.map((application) => {
    const live = isLiveApplication(application);
    return live
      ? `<button class="application-choice${application.id === state.applicationId ? ' is-active' : ''}" data-application="${application.id}" aria-pressed="${application.id === state.applicationId}"><span>${application.number}</span><strong>${application.shortLabel}</strong><em>LIVE</em></button>`
      : `<div class="application-choice is-roadmap" aria-label="${application.shortLabel}，路线图"><span>${application.number}</span><strong>${application.shortLabel}</strong><em>ROADMAP</em></div>`;
  }).join(''));
}

function renderStageTabs(application) {
  setHtml('#stage-tabs', application.stages.map((stage, index) => `<button class="stage-tab${index === state.stage ? ' is-active' : ''}" data-stage="${index}" role="tab" aria-selected="${index === state.stage}"><span>${stage.number}</span><strong>${stage.label}</strong></button>`).join(''));
}

function updateControls() {
  if (isParkMode()) {
    const parkState = parkWorld.getState();
    document.querySelectorAll('[data-park-layer]').forEach((button) => {
      const active = button.dataset.parkLayer === parkState.layer;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-park-weather]').forEach((button) => {
      const active = button.dataset.parkWeather === parkState.weather;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#park-time-control').value = String(parkState.timeOfDay);
    setText('#park-time-readout', formatTime(parkState.timeOfDay));
    setText('#park-context-label', `园区孪生 · ${parkState.layerLabel} · ${parkState.weatherLabel}`);
    setText('#park-drawer-label', `园区控制 · ${parkState.layerLabel} · ${parkState.weatherLabel}`);
    return;
  }
  const worldState = ruralWorld.getState();
  document.querySelectorAll('[data-season]').forEach((button) => {
    const active = button.dataset.season === worldState.season;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-weather]').forEach((button) => {
    const active = button.dataset.weather === worldState.weather;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('#time-control').value = String(worldState.timeOfDay);
  setText('#time-readout', formatTime(worldState.timeOfDay));
  setText('#app-context-label', `${applicationLabel(state.applicationId)} · ${worldState.season === 'spring' ? '春季' : worldState.season === 'summer' ? '夏季' : worldState.season === 'autumn' ? '秋季' : '冬季'} · ${WEATHER_LABELS[worldState.weather]}`);
}

function setParkDetail(details) {
  const card = document.querySelector('#park-detail-card');
  if (!details) {
    card.hidden = true;
    return;
  }
  setText('#park-detail-title', details.title);
  setText('#park-detail-copy', details.copy);
  setText('#park-detail-type', details.typeLabel);
  setText('#park-detail-status', details.status);
  card.hidden = false;
}

function clearParkDetail() {
  parkWorld.clearSelection();
  setParkDetail(null);
}

function findParkSelectable(object) {
  let current = object;
  while (current && current !== parkWorld.root) {
    if (current.userData?.twinObject) return current;
    current = current.parent;
  }
  return null;
}

function selectParkObject(event) {
  if (!isParkMode() || canvasPointer.moved) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(parkWorld.refs.pickables, true).find((item) => findParkSelectable(item.object));
  const target = hit ? findParkSelectable(hit.object) : null;
  if (!target) {
    clearParkDetail();
    return;
  }
  const details = parkWorld.selectObject(target);
  if (compact) {
    state.parkDrawerOpen = false;
    updateUI();
  }
  setParkDetail(details);
}

function updateUI() {
  const application = activeApplication();
  const stage = application.stages[state.stage] ?? application.stages[application.stages.length - 1];
  shell.dataset.mode = application.id;
  setText('#app-kicker', application.kicker);
  setText('#application-title', application.title);
  setText('#app-copy', application.copy);
  setText('#app-panel-kicker', `LIVE APPLICATION TRACE / ${application.shortLabel}`);
  setText('#app-value-title', application.valueTitle);
  setText('#app-value-copy', application.valueCopy);
  setText('#app-owner', application.owner);
  setText('#app-data-status', application.id === 'park-twin' ? 'PROCEDURAL PROTOTYPE / REAL DATA NEXT' : 'PROCEDURAL SCENE / LIVE DEMO');
  setText('#app-stage-signal', `${stage.number} / ${stage.id.replace('-', ' ').toUpperCase()}`);
  setText('#app-stage-kicker', `STAGE ${stage.number} / ${stage.id.replace('-', ' ').toUpperCase()}`);
  setText('#app-stage-title', stage.title);
  setText('#app-stage-copy', stage.copy);
  setText('#app-stage-meaning', application.valueTitle);
  setText('#app-input', stage.input);
  setText('#app-gpu', stage.gpu);
  setText('#interaction-hint', application.id === 'rural-storm'
    ? 'DRAG TO ORBIT · WHEEL TO ZOOM · ROUTE INSPECTION'
    : application.id === 'rural-game'
      ? 'WASD / ARROWS MOVE · E INTERACT · R RESET · TOUCH PAD'
      : application.id === 'park-twin'
        ? 'DRAG TO ORBIT · WHEEL TO ZOOM · CAMERA ROUTES'
      : 'DRAG TO ORBIT · WHEEL TO ZOOM · 1—5 SELECT STAGE');
  setText('#app-status', 'LIVE / 可体验');
  const next = nextLiveApplication();
  setHtml('#toggle-application', `<span class="scene-cta-kicker">NEXT LIVE CASE</span><strong>${next.shortLabel}</strong><span class="scene-cta-arrow">→</span>`);
  const metrics = application.metrics.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('');
  setHtml('#app-metrics', metrics);
  renderStageTabs(application);
  renderApplicationList();
  updateControls();
  const playable = isGameMode() && state.stage >= 4;
  const sceneControls = document.querySelector('.scene-controls');
  sceneControls.hidden = isGameMode() || isParkMode();
  document.querySelector('#park-controls').hidden = !isParkMode() || (compact && !state.parkDrawerOpen);
  document.querySelector('#park-drawer-toggle').hidden = !isParkMode() || !compact || state.parkDrawerOpen;
  document.querySelector('#park-drawer-toggle').setAttribute('aria-expanded', String(state.parkDrawerOpen));
  document.querySelector('#park-detail-card').hidden = !isParkMode() || !parkWorld.getState().selectedObject;
  document.querySelector('#game-hud').hidden = !playable;
  document.querySelector('#game-controls').hidden = !playable;
  const cameraLabels = isParkMode() ? ['总览', '园区入口', '中庭'] : ['总览', '村口', '农田'];
  setText('.camera-btn[data-camera="overview"]', cameraLabels[0]);
  setText('.camera-btn[data-camera="village"]', cameraLabels[1]);
  setText('.camera-btn[data-camera="fields"]', cameraLabels[2]);
  document.querySelectorAll('[data-camera]').forEach((button) => button.setAttribute('aria-pressed', String(button.classList.contains('is-active'))));
  if (playable) updateGameHUD();
}

function setStage(stageIndex) {
  state.stage = Math.max(0, Math.min(4, Number(stageIndex)));
  if (isParkMode()) {
    parkWorld.setStage(state.stage);
    clearParkDetail();
  }
  else ruralWorld.setStage(state.stage);
  updateUI();
}

function setApplication(applicationId) {
  const application = getApplication(applicationId);
  if (!isLiveApplication(application)) return;
  state.applicationId = application.id;
  const url = new URL(window.location.href);
  url.searchParams.set('application', application.id);
  window.history.replaceState(null, '', url);
  if (isParkMode()) parkWorld.setMode(application.id);
  else ruralWorld.setMode(application.id);
  ruralWorld.root.visible = !isParkMode();
  parkWorld.root.visible = isParkMode();
  state.stage = 4;
  state.parkDrawerOpen = true;
  clearParkDetail();
  clearGameInput();
  gameCamera.initialized = false;
  controls.enabled = !isGameMode();
  setCameraPreset('overview');
  updateUI();
  setFocusMode(isGameMode());
}

function setCameraPreset(presetId) {
  const preset = (isParkMode() ? parkCameraPresets : cameraPresets)[presetId];
  if (!preset) return;
  if (isGameMode()) {
    state.cameraTween = null;
    gameCamera.initialized = false;
    return;
  }
  state.cameraTween = { fromPosition: camera.position.clone(), fromTarget: controls.target.clone(), toPosition: preset.position.clone(), toTarget: preset.target.clone(), progress: 0 };
  document.querySelectorAll('[data-camera]').forEach((button) => {
    const active = button.dataset.camera === presetId;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function updateCameraTween(delta) {
  if (!state.cameraTween) return;
  const tween = state.cameraTween;
  tween.progress = Math.min(1, tween.progress + delta * 1.8);
  const eased = tween.progress * tween.progress * (3 - 2 * tween.progress);
  camera.position.lerpVectors(tween.fromPosition, tween.toPosition, eased);
  controls.target.lerpVectors(tween.fromTarget, tween.toTarget, eased);
  if (tween.progress >= 1) state.cameraTween = null;
}

function updateGameCamera(delta) {
  if (!isGameMode()) return;
  const playerPosition = ruralWorld.refs.playerGroup.position;
  const desiredPosition = playerPosition.clone().add(gameCamera.offset);
  const desiredTarget = playerPosition.clone().add(gameCamera.lookOffset);
  if (!gameCamera.initialized) {
    camera.position.copy(desiredPosition);
    controls.target.copy(desiredTarget);
    camera.lookAt(desiredTarget);
    gameCamera.initialized = true;
    return;
  }
  const blend = 1 - Math.exp(-delta * 6);
  camera.position.lerp(desiredPosition, blend);
  controls.target.lerp(desiredTarget, blend);
  camera.lookAt(controls.target);
}

function setFocusMode(next) {
  state.focus = next;
  shell.classList.toggle('is-focus-mode', state.focus);
  const button = document.querySelector('#toggle-focus');
  button.setAttribute('aria-pressed', String(state.focus));
  if (isGameMode()) button.innerHTML = `<span>PLAY</span>${state.focus ? '退出任务' : '进入任务'}`;
  else button.innerHTML = `<span>FOCUS</span>${state.focus ? '退出聚焦' : '聚焦 3D'}`;
}

function setPaused(next) {
  state.paused = next;
  const button = document.querySelector('#toggle-pause');
  button.innerHTML = `<span class="pause-glyph">${state.paused ? '▶' : 'Ⅱ'}</span>${state.paused ? '继续场景' : '暂停场景'}`;
}

function toggleProcess() {
  state.autoPlaying = !state.autoPlaying;
  state.autoClock = 0;
  if (state.autoPlaying) setStage(0);
  const button = document.querySelector('#toggle-process');
  button.classList.toggle('is-playing', state.autoPlaying);
  button.innerHTML = `<span class="play-glyph">${state.autoPlaying ? 'Ⅱ' : '▶'}</span><span>${state.autoPlaying ? '暂停自动构建' : '自动构建场景'}</span>`;
}

function updateAuto(delta) {
  if (!state.autoPlaying || state.paused) return;
  state.autoClock += delta;
  if (state.autoClock < 2.7) return;
  state.autoClock = 0;
  if (state.stage >= 4) {
    state.autoPlaying = false;
    const button = document.querySelector('#toggle-process');
    button.classList.remove('is-playing');
    button.innerHTML = '<span class="play-glyph">▶</span><span>重新构建场景</span>';
    return;
  }
  setStage(state.stage + 1);
}

function updateAtmosphere() {
  const atmosphere = activeWorld().getAtmosphere();
  scene.background.copy(atmosphere.color);
  scene.fog.color.copy(atmosphere.fog);
  scene.fog.density = atmosphere.density;
  if (atmosphere.flash > 0) renderer.toneMappingExposure = 1.04 + atmosphere.flash * 0.45;
  else renderer.toneMappingExposure = 1.04;
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function bindEvents() {
  document.querySelector('#application-list').addEventListener('click', (event) => {
    const button = event.target.closest('[data-application]');
    if (button) setApplication(button.dataset.application);
  });
  document.querySelector('#stage-tabs').addEventListener('click', (event) => {
    const button = event.target.closest('[data-stage]');
    if (button) setStage(button.dataset.stage);
  });
  document.querySelector('#toggle-application').addEventListener('click', () => setApplication(nextLiveApplication().id));
  document.querySelector('#toggle-process').addEventListener('click', toggleProcess);
  document.querySelector('#toggle-pause').addEventListener('click', () => setPaused(!state.paused));
  document.querySelector('#toggle-focus').addEventListener('click', () => setFocusMode(!state.focus));
  document.querySelectorAll('[data-season]').forEach((button) => button.addEventListener('click', () => { ruralWorld.setSeason(button.dataset.season); updateControls(); }));
  document.querySelectorAll('[data-weather]').forEach((button) => button.addEventListener('click', () => { ruralWorld.setWeather(button.dataset.weather); updateControls(); }));
  document.querySelector('#time-control').addEventListener('input', (event) => { ruralWorld.setTimeOfDay(event.target.value); updateControls(); });
  document.querySelectorAll('[data-park-layer]').forEach((button) => button.addEventListener('click', () => { parkWorld.setLayer(button.dataset.parkLayer); updateControls(); }));
  document.querySelectorAll('[data-park-weather]').forEach((button) => button.addEventListener('click', () => { parkWorld.setWeather(button.dataset.parkWeather); updateControls(); }));
  document.querySelector('#park-time-control').addEventListener('input', (event) => { parkWorld.setTimeOfDay(event.target.value); updateControls(); });
  document.querySelector('#park-drawer-toggle').addEventListener('click', () => { state.parkDrawerOpen = true; updateUI(); });
  document.querySelector('#park-drawer-close').addEventListener('click', () => { state.parkDrawerOpen = false; updateUI(); });
  document.querySelector('#park-detail-close').addEventListener('click', clearParkDetail);
  document.querySelectorAll('[data-camera]').forEach((button) => button.addEventListener('click', () => setCameraPreset(button.dataset.camera)));
  canvas.addEventListener('pointerdown', (event) => {
    if (!isParkMode()) return;
    canvasPointer.down = true;
    canvasPointer.moved = false;
    canvasPointer.x = event.clientX;
    canvasPointer.y = event.clientY;
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!canvasPointer.down) return;
    const distance = Math.hypot(event.clientX - canvasPointer.x, event.clientY - canvasPointer.y);
    if (distance > 7) canvasPointer.moved = true;
  });
  canvas.addEventListener('pointerup', (event) => {
    if (!canvasPointer.down) return;
    selectParkObject(event);
    canvasPointer.down = false;
  });
  canvas.addEventListener('pointercancel', () => { canvasPointer.down = false; canvasPointer.moved = false; });
  canvas.addEventListener('pointerleave', () => { canvasPointer.down = false; canvasPointer.moved = false; });
  document.querySelector('#game-action').addEventListener('click', () => { ruralWorld.interactGame(); updateGameHUD(); });
  document.querySelector('#game-reset').addEventListener('click', () => { ruralWorld.resetGame(); gameCamera.initialized = false; updateGameHUD(); });
  if (fixtureMode) {
    const fixtures = {
      gate: [-5.1, 2.8], map: [-3.55, 1.92], pump: [-1.15, -0.42], battery: [1.35, -0.32], road: [3.95, 0.62], exit: [-6.82, 3.35],
    };
    document.querySelector('#game-fixtures').addEventListener('click', (event) => {
      const button = event.target.closest('[data-game-fixture]');
      if (!button) return;
      const fixture = button.dataset.gameFixture;
      if (fixture === 'reset') ruralWorld.resetGame();
      else if (fixture === 'collision') {
        ruralWorld.debugSetGamePlayer(-0.8, 1.15);
        ruralWorld.debugStepGame(1, 0, 0.2);
      }
      else if (fixture === 'risk') {
        ruralWorld.debugSetGameRisk(99);
        ruralWorld.debugSetGamePlayer(-1.05, -0.2);
      } else if (fixtures[fixture]) {
        ruralWorld.debugSetGamePlayer(...fixtures[fixture]);
        ruralWorld.interactGame();
      }
      gameCamera.initialized = false;
      updateGameHUD();
    });
  }
  document.querySelectorAll('[data-move]').forEach((button) => {
    const direction = button.dataset.move;
    const release = () => { gamePadState[direction] = false; button.classList.remove('is-held'); };
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      gamePadState[direction] = true;
      button.classList.add('is-held');
      button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
  });
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (event.key === 'Escape' && state.focus) setFocusMode(false);
    else if (event.key === 'Escape' && isParkMode() && !document.querySelector('#park-detail-card').hidden) clearParkDetail();
    if (isGameMode() && ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'].includes(key)) {
      event.preventDefault();
      gameKeys.add(key);
      return;
    }
    if (isGameMode() && (key === 'e' || key === 'enter')) {
      event.preventDefault();
      ruralWorld.interactGame();
      updateGameHUD();
      return;
    }
    if (isGameMode() && key === 'r') {
      event.preventDefault();
      ruralWorld.resetGame();
      gameCamera.initialized = false;
      updateGameHUD();
      return;
    }
    if (event.key === ' ') { event.preventDefault(); setPaused(!state.paused); }
    const stage = Number(event.key) - 1;
    if (stage >= 0 && stage < 5) setStage(stage);
  });
  window.addEventListener('keyup', (event) => { gameKeys.delete(event.key.toLowerCase()); });
  window.addEventListener('blur', clearGameInput);
}

let lastTime = performance.now();
let metricClock = 0;
function render(now) {
  const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;
  updateCameraTween(delta);
  updateAuto(delta);
  if (!state.paused) {
    if (isParkMode()) parkWorld.update(delta);
    else {
      ruralWorld.update(delta);
      if (isGameMode()) ruralWorld.updateGame(delta, getGameInput());
    }
  }
  if (isGameMode()) updateGameCamera(delta);
  else controls.update();
  updateAtmosphere();
  metricClock += delta;
  if (metricClock > 0.5) {
    metricClock = 0;
    setText('#runtime-status', `RUNTIME READY / ${Math.round(1 / delta)} FPS / ${renderer.info.render.calls} CALLS`);
  }
  if (isGameMode()) {
    gameUiClock += delta;
    if (gameUiClock > 0.12) {
      gameUiClock = 0;
      updateGameHUD();
    }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function boot() {
  try {
    bindEvents();
    ruralWorld.setTimeOfDay(16);
    setApplication(initialApplicationId);
    updateAtmosphere();
    requestAnimationFrame(render);
  } catch (error) {
    console.error(error);
    runtimeError.hidden = false;
    setText('#runtime-status', 'FALLBACK / READABLE MODE');
  }
}

boot();
