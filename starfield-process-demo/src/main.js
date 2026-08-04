import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  AURORA_CURTAIN_PRESET,
  AURORA_PROBE_SIZE,
  AURORA_VOLUME_GLSL,
  createAuroraCurtains,
  QUAD_VERTEX_SHADER,
} from './upstream/procedural-vfx/aurora-curtains.js';
import { createPolarNightSky } from './upstream/procedural-vfx/polar-night-sky.js';
import { createDeepSpaceScene } from './deep-space.js';
import { createSolarSystem } from './solar-system.js';
import { createStormCity } from './storm-city.js';
import { createMarsExploration } from './mars-exploration.js';
import './styles.css';

const SOURCE_URL = 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/threejs-procedural-vfx/examples/raymarched-aurora-curtains';
const STORM_SOURCE_URL = 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/threejs-precipitation-surfaces';
const MARS_SOURCE_URL = 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/threejs-procedural-planets';

const PROCESS_STAGES = [
  {
    id: 'backdrop',
    index: 0,
    number: '01',
    label: '背景场',
    signal: '01 / BACKDROP FIELD',
    title: '先建立一片深空',
    copy: '第一步不是撒星星，而是先确定观察者面对的深空颜色和高度渐变。',
    input: '天空颜色 / 视线方向',
    gpu: 'paintBackdrop(viewDirection)',
  },
  {
    id: 'distribution',
    index: 1,
    number: '02',
    label: '星点分布',
    signal: '02 / STAR DISTRIBUTION',
    title: '把天空切成可重复的星格',
    copy: '视线方向被映射到稳定的 400 级网格，每个网格用 hash 决定是否诞生一颗星。',
    input: '方向坐标 / starDensity',
    gpu: 'cellHash → starExistence',
  },
  {
    id: 'twinkle',
    index: 2,
    number: '03',
    label: '闪烁运动',
    signal: '03 / TWINKLE MOTION',
    title: '让少数星星开始呼吸',
    copy: '不是所有星星一起闪烁，hash 只挑出少数星点，再用时间驱动它们的亮度。',
    input: '时间 / blinkRate / seed',
    gpu: 'sin(time × rate + hash)',
  },
  {
    id: 'aurora',
    index: 3,
    number: '04',
    label: '极光体积',
    signal: '04 / AURORA VOLUME',
    title: '把程序化场变成体积光',
    copy: '极光不是一条贴图，而是有限体积里的三层噪声、扭曲坐标和 75 次射线采样。',
    input: 'noise field / slab bounds',
    gpu: 'raymarch → HDR emission',
  },
  {
    id: 'final',
    index: 4,
    number: '05',
    label: '最终合成',
    signal: '05 / FINAL COMPOSITE',
    title: '最后才做曝光和抖动',
    copy: '星点、极光和背景先在 HDR 空间合成，最后才经过曝光、伽马和 dithering。',
    input: 'radiance / exposure',
    gpu: 'tone map → readable image',
  },
];

const DEEP_SPACE_STAGES = [
  {
    id: 'deep-backdrop',
    index: 0,
    number: '01',
    label: '深空底色',
    signal: '01 / DEEP SPACE FIELD',
    title: '先把视野变成深空',
    copy: '这一场景没有地平线，先用几乎全黑的蓝紫色建立一个可以向任意方向观察的空间底板。',
    input: '方向向量 / deep-space palette',
    gpu: 'paintDeepBackdrop(direction)',
  },
  {
    id: 'far-stars',
    index: 1,
    number: '02',
    label: '远星层',
    signal: '02 / FAR STAR LAYER',
    title: '先放入铺满视野的远星',
    copy: '第一层星点使用较粗的方向网格，密度稳定、分布均匀，让整个画面都拥有“身处星海”的尺度感。',
    input: '方向网格 / density / size',
    gpu: 'hash(cell) → far stars',
  },
  {
    id: 'near-stars',
    index: 2,
    number: '03',
    label: '近星闪烁',
    signal: '03 / NEAR STAR MOTION',
    title: '再叠一层会呼吸的近星',
    copy: '第二、三层星点拥有不同大小、颜色和闪烁速度；它们没有移动镜头，却制造了前后景的空间深度。',
    input: 'time / layer offset / pulse',
    gpu: 'multi-layer hash + twinkle',
  },
  {
    id: 'nebula',
    index: 3,
    number: '04',
    label: '星云带',
    signal: '04 / NEBULA BAND',
    title: '最后加一条很弱的星云带',
    copy: '用低频云噪声和带状衰减生成紫蓝色星云；它只负责提供方向感，不会盖住星点。',
    input: 'cloud noise / band falloff',
    gpu: 'fbm noise → nebula density',
  },
  {
    id: 'deep-final',
    index: 4,
    number: '05',
    label: '深空合成',
    signal: '05 / DEEP SPACE COMPOSITE',
    title: '把所有层合成成一片星海',
    copy: '星点、星云和深空底色先在线性空间合成，最后才做曝光、伽马和 dithering，得到完整的全屏太空效果。',
    input: 'radiance / exposure / grain',
    gpu: 'tone map → full-space image',
  },
];

const SOLAR_SYSTEM_STAGES = [
  {
    id: 'solar-field',
    index: 0,
    number: '01',
    label: '空间底板',
    signal: '01 / SPACE FIELD',
    title: '先把天空变成空间',
    copy: '太阳系不是贴在天空上的图层，先保留全屏星海作为深度背景，再把三维坐标系放到观察者面前。',
    input: 'deep-space backdrop / camera',
    gpu: 'background pass → 3D stage',
  },
  {
    id: 'solar-light',
    index: 1,
    number: '02',
    label: '太阳光源',
    signal: '02 / SUN LIGHT',
    title: '用太阳点亮整个系统',
    copy: '太阳既是一个发光球体，也是场景里的 PointLight；行星的明暗因此来自同一个空间光源。',
    input: 'sun mesh / point light / glow',
    gpu: 'emissive sphere + point light',
  },
  {
    id: 'solar-orbits',
    index: 2,
    number: '03',
    label: '行星轨道',
    signal: '03 / ORBITAL BODIES',
    title: '再放入可观察的行星系统',
    copy: '水星、金星、地球、火星、木星和土星都是真实的 Three.js 球体，轨道线和土星环帮助你读懂层级。',
    input: 'geometry / material / orbit radius',
    gpu: 'sphere meshes + line loops',
  },
  {
    id: 'solar-motion',
    index: 3,
    number: '04',
    label: '轨道运动',
    signal: '04 / ORBITAL MOTION',
    title: '让每颗行星按自己的速度运动',
    copy: '每个轨道有独立速度和相位，地球还拥有月球；小行星带在外侧缓慢旋转，形成系统级运动。',
    input: 'time / phase / orbit speed',
    gpu: 'pivot rotation + self rotation',
  },
  {
    id: 'solar-final',
    index: 4,
    number: '05',
    label: '太阳系合成',
    signal: '05 / SOLAR SYSTEM COMPOSITE',
    title: '从天空进入一个可探索系统',
    copy: '最终画面把程序化星空背景和真实三维物体叠在一起；你可以拖动观察，也可以滚轮拉近查看轨道层级。',
    input: 'scene / camera / lighting',
    gpu: 'render background + 3D scene',
  },
];

const STORM_CITY_STAGES = [
  {
    id: 'storm-sky',
    index: 0,
    number: '01',
    label: '暴雨天空',
    signal: '01 / STORM SKY',
    title: '先压低天空的亮度',
    copy: '暴雨城市先从一层厚重的蓝黑色天空开始，地平线保留一点冷色城市反光，让空间有方向。',
    input: 'cloud noise / horizon glow',
    gpu: 'procedural storm backdrop',
  },
  {
    id: 'storm-buildings',
    index: 1,
    number: '02',
    label: '城市体块',
    signal: '02 / CITY MASSING',
    title: '把城市变成可观察的体块',
    copy: '建筑高度、街区间距和窗格亮度由可复现的 seed 决定；它们是真实的 InstancedMesh，而不是背景贴图。',
    input: 'height seed / grid / façade',
    gpu: 'instanced boxes + emissive windows',
  },
  {
    id: 'storm-wet-surface',
    index: 2,
    number: '03',
    label: '湿地材质',
    signal: '03 / WET SURFACE',
    title: '让地面开始反射城市光',
    copy: '地面从粗糙路面变成带 clearcoat 的湿润材质，积水和细小涟漪把灯光拉到脚下。',
    input: 'roughness / clearcoat / puddle',
    gpu: 'physical wet ground + ripples',
  },
  {
    id: 'storm-rain',
    index: 3,
    number: '04',
    label: '雨滴积水',
    signal: '04 / RAIN ENVELOPE',
    title: '让天气真正穿过城市',
    copy: '雨线拥有独立速度和高度循环，水面涟漪按时间展开；城市、地面和天气共享同一场景坐标。',
    input: 'rain speed / accumulation / time',
    gpu: 'line segments + ripple field',
  },
  {
    id: 'storm-final',
    index: 4,
    number: '05',
    label: '闪电合成',
    signal: '05 / LIGHTNING COMPOSITE',
    title: '用一瞬闪电完成暴雨城市',
    copy: '闪电同时改变天空、体积感和点光源强度；最后你可以拖拽镜头，观察建筑、雨线和湿地面的空间层次。',
    input: 'flash / exposure / camera',
    gpu: 'lightning pulse + 3D scene pass',
  },
];

const MARS_EXPLORATION_STAGES = [
  {
    id: 'mars-sky',
    index: 0,
    number: '01',
    label: '尘埃天空',
    signal: '01 / DUST SKY',
    title: '先建立火星的尘埃天空',
    copy: '火星探测从暗红色地平线和稀疏星点开始；天空的尘埃带为后面的地表和大气光晕提供尺度参照。',
    input: 'dust band / horizon / stars',
    gpu: 'procedural Mars sky',
  },
  {
    id: 'mars-planet',
    index: 1,
    number: '02',
    label: '行星球体',
    signal: '02 / PLANET BODY',
    title: '把行星放进远景',
    copy: 'Mars 是真实的 SphereGeometry，受暖色方向光照亮；它先作为远景基准出现，提醒你当前正在观察一颗行星。',
    input: 'sphere radius / roughness / light',
    gpu: 'lit planet mesh',
  },
  {
    id: 'mars-terrain',
    index: 2,
    number: '03',
    label: '地表陨石坑',
    signal: '03 / CRATER TERRAIN',
    title: '再生成脚下的火星地表',
    copy: '地表网格由可复现的高度函数生成，陨石坑、岩石和起伏让它不再是一个平面橙色底板。',
    input: 'height field / crater mask / rocks',
    gpu: 'procedural terrain + normals',
  },
  {
    id: 'mars-rover',
    index: 3,
    number: '04',
    label: '探测车',
    signal: '04 / ROVER CONTACT',
    title: '让探测车和地面发生接触',
    copy: '探测车由车体、车轮、桅杆和太阳能板组成；车轮自转、尘埃漂移、车辙线共同说明它正在地表工作。',
    input: 'rover rig / wheels / dust',
    gpu: 'hierarchical meshes + motion',
  },
  {
    id: 'mars-final',
    index: 4,
    number: '05',
    label: '探测合成',
    signal: '05 / MARS EXPLORATION',
    title: '从远景进入一场火星探测',
    copy: '最终画面同时保留行星、大气光晕、陨石坑、探测车和轨道线；拖拽镜头可以检查这个探测场景的真实深度。',
    input: 'atmosphere / orbit / camera',
    gpu: 'planet + terrain + rover pass',
  },
];

const SCENE_CATALOG = {
  'polar-night': {
    id: 'polar-night',
    number: '01',
    shortLabel: '极夜极光',
    kicker: 'PROCESS CASE / PROCEDURAL VFX',
    title: '看见星空<br /><em>从零开始生成</em>',
    copy: '这个案例把“星空效果”拆成五个能被观察的过程。你可以逐步打开每一层，也可以让它自动演示完整生成路径。',
    route: ['FIELD', 'STARS', 'TWINKLE', 'AURORA', 'GRADE'],
    processOwner: 'raymarched-aurora-curtains',
    switchLabel: '切换到全星空',
    sourceUrl: SOURCE_URL,
    sceneNote: '极夜地平线 / 体积极光',
    metrics: {
      firstLabel: 'STAR GRID',
      firstValue: '400 HASH',
      secondLabel: 'AURORA RAYS',
      secondValue: '75 / 40',
    },
    stages: PROCESS_STAGES,
  },
  'deep-space': {
    id: 'deep-space',
    number: '02',
    shortLabel: '深空星海',
    kicker: 'SCENE CASE / FULL DEEP SPACE',
    title: '进入深空<br /><em>星海铺满视野</em>',
    copy: '这是一个完整的全星空太空场景：没有下半屏黑地面，只有多层星点、星云带和可观察的生成过程。',
    route: ['DARK FIELD', 'FAR STARS', 'NEAR STARS', 'NEBULA', 'GRADE'],
    processOwner: 'deep-space-starfield',
    switchLabel: '切换到太阳系',
    sourceUrl: 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/threejs-raymarched-space-effects',
    sceneNote: '全屏星海 / 多层方向网格',
    metrics: {
      firstLabel: 'STAR LAYERS',
      firstValue: '3 HASH FIELDS',
      secondLabel: 'NEBULA NOISE',
      secondValue: '4 OCTAVES',
    },
    stages: DEEP_SPACE_STAGES,
  },
  'solar-system': {
    id: 'solar-system',
    number: '03',
    shortLabel: '太阳系',
    kicker: 'SCENE CASE / ORBITAL SYSTEM',
    title: '从天空进入<br /><em>太阳系</em>',
    copy: '这是一个真实三维太阳系演示：太阳、行星、轨道线、月球和小行星带都在同一个可拖拽的空间里运行。',
    route: ['SPACE', 'SUN', 'ORBIT', 'MOTION', 'SYSTEM'],
    processOwner: 'threejs-orbital-system',
    switchLabel: '切换到暴雨城市',
    sourceUrl: 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/threejs-camera-direction',
    sceneNote: '三维行星 / 轨道运动',
    metrics: {
      firstLabel: 'BODIES',
      firstValue: '6 PLANETS + MOON',
      secondLabel: 'ORBIT MODE',
      secondValue: 'REAL 3D PIVOTS',
    },
    stages: SOLAR_SYSTEM_STAGES,
  },
  'storm-city': {
    id: 'storm-city',
    number: '04',
    shortLabel: '暴雨城市',
    kicker: 'SCENE CASE / STORM CITY',
    title: '走进暴雨<br /><em>城市开始反光</em>',
    copy: '这是一个把天气、建筑和材质放在同一空间里的暴雨城市：你可以逐层打开城市体块、湿地面、雨滴和闪电。',
    route: ['SKY', 'MASSING', 'WET', 'RAIN', 'FLASH'],
    processOwner: 'precipitation-surfaces + procedural-architecture',
    switchLabel: '切换到火星探测',
    sourceUrl: STORM_SOURCE_URL,
    sceneNote: '雨滴天气 / 湿地材质 / 建筑体块',
    metrics: {
      firstLabel: 'BUILDINGS',
      firstValue: '35 INSTANCED',
      secondLabel: 'RAIN DROPS',
      secondValue: '420 SEGMENTS',
    },
    stages: STORM_CITY_STAGES,
  },
  'mars-exploration': {
    id: 'mars-exploration',
    number: '05',
    shortLabel: '火星探测',
    kicker: 'SCENE CASE / MARS EXPLORATION',
    title: '降落火星<br /><em>开始地表探测</em>',
    copy: '这是一个从尘埃天空进入火星地表的探测场景：行星、大气、陨石坑、探测车和车辙都在同一个可观察空间里。',
    route: ['DUST', 'PLANET', 'TERRAIN', 'ROVER', 'MISSION'],
    processOwner: 'procedural-planets + atmosphere-aerial-perspective',
    switchLabel: '切回极夜极光',
    sourceUrl: MARS_SOURCE_URL,
    sceneNote: '程序化地表 / 大气光晕 / 探测车',
    metrics: {
      firstLabel: 'TERRAIN GRID',
      firstValue: '44 × 32',
      secondLabel: 'ROVER PARTS',
      secondValue: '18 MESHES',
    },
    stages: MARS_EXPLORATION_STAGES,
  },
};

const requestedSceneId = new URLSearchParams(window.location.search).get('scene');
const DEFAULT_SCENE_ID = requestedSceneId && SCENE_CATALOG[requestedSceneId] ? requestedSceneId : 'polar-night';
let activeSceneId = DEFAULT_SCENE_ID;
let focusMode = false;
const initialScene = SCENE_CATALOG[DEFAULT_SCENE_ID];

const app = document.querySelector('#app');
app.innerHTML = `
  <div class="cosmos-shell" data-scene="${initialScene.id}">
    <canvas id="star-canvas" aria-label="Interactive starfield process scene"></canvas>
    <div class="cosmos-noise"></div>
    <div class="cosmos-vignette"></div>

    <header class="cosmos-topbar">
      <a class="cosmos-brand" href="#top" aria-label="Starfield Process home">
        <span class="brand-mark"><i></i><i></i><i></i></span>
        <span><strong>GLASS WORLDS</strong><small>STARFIELD PROCESS / CASE 02</small></span>
      </a>
      <div class="top-meta">
        <span class="skill-chip"><i></i>THREEJS-PROCEDURAL-VFX</span>
        <div class="scene-switcher" role="group" aria-label="选择空间场景">
          <span>SCENE</span>
          ${Object.values(SCENE_CATALOG).map((scene) => `<button class="scene-choice${scene.id === DEFAULT_SCENE_ID ? ' is-active' : ''}" data-scene="${scene.id}" aria-pressed="${scene.id === DEFAULT_SCENE_ID}"><b>${scene.number}</b>${scene.shortLabel}</button>`).join('')}
        </div>
        <button id="toggle-focus" class="focus-control" aria-pressed="false"><span>FOCUS</span>聚焦 3D</button>
        <a class="applications-link" href="./project.html">研究总览 ↗</a>
        <a class="applications-link" href="./skills.html">24 SKILL 地图 ↗</a>
        <a class="applications-link" href="./applications.html">真实场景展厅 ↗</a>
        <a id="source-link" class="source-link" href="${initialScene.sourceUrl ?? SOURCE_URL}" target="_blank" rel="noreferrer">查看上游实现 ↗</a>
      </div>
    </header>

    <main id="top" class="cosmos-stage">
      <section class="cosmos-hero" aria-labelledby="cosmos-title">
        <p id="scene-kicker" class="eyebrow">${initialScene.kicker}</p>
        <h1 id="cosmos-title">${initialScene.title}</h1>
        <p id="hero-copy" class="hero-copy">${initialScene.copy}</p>
        <div id="hero-route" class="hero-route" aria-label="Starfield process route">
          ${initialScene.route.map((label, index) => `<span>${label}</span>${index < initialScene.route.length - 1 ? '<b>→</b>' : ''}`).join('')}
        </div>
        <button id="toggle-scene" class="scene-cta"><span class="scene-cta-kicker">SCENE 02</span><strong>${initialScene.switchLabel}</strong><span class="scene-cta-arrow">→</span></button>
        <button id="toggle-process" class="process-cta"><span class="play-glyph">▶</span><span>自动播放过程</span></button>
      </section>

      <aside class="trace-panel" aria-live="polite">
        <div class="trace-head">
          <div><p id="trace-kicker" class="eyebrow">LIVE BUILD TRACE / ${initialScene.shortLabel}</p><h2 id="stage-title">最后才做曝光和抖动</h2></div>
          <span class="ready-badge" id="ready-badge"><i></i>BOOTING</span>
        </div>
        <p id="stage-copy" class="trace-copy">第一步不是撒星星，而是先确定观察者面对的深空颜色和高度渐变。</p>

        <div class="trace-fields">
          <div><span>INPUT</span><strong id="stage-input">天空颜色 / 视线方向</strong></div>
          <div><span>GPU OPERATION</span><strong id="stage-gpu">paintBackdrop(viewDirection)</strong></div>
        </div>

        <div id="stage-tabs" class="stage-tabs" role="tablist" aria-label="Starfield process stages"></div>

        <div class="metric-grid">
          <div><span>FRAME RATE</span><strong id="metric-fps">--</strong></div>
          <div><span>DRAW CALLS</span><strong id="metric-calls">--</strong></div>
          <div><span id="metric-first-label">${initialScene.metrics.firstLabel}</span><strong id="metric-first-value">${initialScene.metrics.firstValue}</strong></div>
          <div><span id="metric-second-label">${initialScene.metrics.secondLabel}</span><strong id="metric-second-value">${initialScene.metrics.secondValue}</strong></div>
        </div>

        <div class="trace-actions">
          <button id="toggle-pause" class="primary-control"><span class="pause-glyph">Ⅱ</span>暂停过程</button>
          <div class="speed-control" role="group" aria-label="Time scale">
            <button class="speed-btn" data-speed="0.35">0.35×</button>
            <button class="speed-btn is-active" data-speed="1">1×</button>
          </div>
        </div>

        <div class="trace-source"><span>PROCESS OWNER</span><span id="process-owner">${initialScene.processOwner}</span></div>
      </aside>

      <nav class="stage-dock" aria-label="Quick process stages">
        <span class="dock-label">PROCESS STEPS</span>
        <div id="stage-dock-buttons"></div>
      </nav>

      <div class="scene-status"><span class="status-line"><i></i><strong id="stage-signal">01 / BACKDROP FIELD</strong></span><span id="interaction-hint">DRAG TO INSPECT · SPACE TO PAUSE · 1—5 SELECT STAGE</span></div>

      <section class="method-card" aria-label="How this case maps the skill">
        <span class="method-kicker">WHY THIS IS A SKILL DEMO</span>
        <strong>每个阶段都对应一段真实的 GPU 代码</strong>
        <p>天空、星点、极光和太阳系不是静态截图；它们分别由 shader、hash、raymarch 和真实三维物体逐层生成。</p>
      </section>

      <div id="runtime-error" class="runtime-error" hidden><strong>WebGL 路径没有完成初始化</strong><p>页面说明仍然可读；请在支持 WebGL2 的浏览器中重新打开本案例。</p></div>
    </main>
  </div>
`;

const canvas = document.querySelector('#star-canvas');
const runtimeError = document.querySelector('#runtime-error');
const compact = window.matchMedia('(max-width: 720px)').matches;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setClearColor(0x04070e, 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.15 : 1.5));

const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 40);
camera.position.set(0, 0, 2);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enablePan = false;
controls.enableZoom = false;
controls.minDistance = 2;
controls.maxDistance = 2;
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxPolarAngle = Math.PI * 0.8;
controls.minPolarAngle = Math.PI * 0.2;

const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const quadGeometry = new THREE.PlaneGeometry(2, 2);
const skyBackdropScene = new THREE.Scene();
const rawScene = new THREE.Scene();
const compositeScene = new THREE.Scene();
const deepSpaceBackdropScene = new THREE.Scene();
const deepSpaceRawScene = new THREE.Scene();
const deepSpaceCompositeScene = new THREE.Scene();
const solarSystem = createSolarSystem({ compact });
const stormCity = createStormCity({ compact });
const marsExploration = createMarsExploration({ compact });
const stormBackdropScene = new THREE.Scene();
const marsBackdropScene = new THREE.Scene();
const skyTarget = new THREE.WebGLRenderTarget(2, 2, {
  type: THREE.HalfFloatType,
  format: THREE.RGBAFormat,
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  colorSpace: THREE.LinearSRGBColorSpace,
  depthBuffer: false,
  stencilBuffer: false,
});

const aurora = createAuroraCurtains({
  intensity: compact ? 0.85 : 1.1,
  raySteps: compact ? 48 : AURORA_CURTAIN_PRESET.raySteps,
  probeRaySteps: compact ? 28 : AURORA_CURTAIN_PRESET.probeRaySteps,
});
const polarNight = createPolarNightSky({
  auroraUniforms: aurora.uniforms,
  auroraGlsl: AURORA_VOLUME_GLSL,
  raySteps: compact ? 48 : AURORA_CURTAIN_PRESET.raySteps,
  probeRaySteps: compact ? 28 : AURORA_CURTAIN_PRESET.probeRaySteps,
  skyTexture: skyTarget.texture,
  probeTexture: new THREE.DataTexture(new Uint8Array(AURORA_PROBE_SIZE.width * AURORA_PROBE_SIZE.height * 4), AURORA_PROBE_SIZE.width, AURORA_PROBE_SIZE.height),
});
const deepSpace = createDeepSpaceScene({
  skyTexture: skyTarget.texture,
  compact,
});
const rawMaterial = new THREE.ShaderMaterial({
  vertexShader: QUAD_VERTEX_SHADER,
  fragmentShader: `
    uniform sampler2D uSkyTex;
    void main() {
      vec3 color = texture2D(uSkyTex, gl_FragCoord.xy / vec2(textureSize(uSkyTex, 0))).rgb;
      color = pow(max(color, vec3(0.0)), vec3(0.4545));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: { uSkyTex: { value: skyTarget.texture } },
  depthTest: false,
  depthWrite: false,
});

skyBackdropScene.add(new THREE.Mesh(quadGeometry, polarNight.backdropMaterial));
rawScene.add(new THREE.Mesh(quadGeometry, rawMaterial));
compositeScene.add(new THREE.Mesh(quadGeometry, polarNight.compositeMaterial));
deepSpaceBackdropScene.add(new THREE.Mesh(quadGeometry, deepSpace.backdropMaterial));
deepSpaceRawScene.add(new THREE.Mesh(quadGeometry, deepSpace.rawMaterial));
deepSpaceCompositeScene.add(new THREE.Mesh(quadGeometry, deepSpace.compositeMaterial));
stormBackdropScene.add(new THREE.Mesh(quadGeometry, stormCity.backdropMaterial));
marsBackdropScene.add(new THREE.Mesh(quadGeometry, marsExploration.backdropMaterial));

let currentStage = initialScene.stages[4];
let elapsed = 0;
let lastFrame = performance.now();
let metricClock = 0;
let paused = false;
let timeScale = 1;
let autoPlaying = false;
let autoClock = 0;

function getActiveScene() {
  return SCENE_CATALOG[activeSceneId];
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function setHtml(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.innerHTML = value;
}

function renderStageControls() {
  const stages = getActiveScene().stages;
  setHtml('#stage-tabs', stages.map((stage) => `
    <button class="stage-tab${stage.index === currentStage.index ? ' is-active' : ''}" data-stage="${stage.id}" role="tab" aria-selected="${stage.index === currentStage.index}">
      <span>${stage.number}</span><strong>${stage.label}</strong>
    </button>
  `).join(''));
  setHtml('#stage-dock-buttons', stages.map((stage) => `<button class="dock-btn${stage.index === currentStage.index ? ' is-active' : ''}" data-dock-stage="${stage.id}"><span>${stage.number}</span>${stage.label}</button>`).join(''));
}

function updateSceneUI() {
  const scene = getActiveScene();
  document.querySelector('.cosmos-shell')?.setAttribute('data-scene', scene.id);
  const sceneIds = Object.keys(SCENE_CATALOG);
  const nextScene = SCENE_CATALOG[sceneIds[(sceneIds.indexOf(scene.id) + 1) % sceneIds.length]];
  setText('#scene-kicker', scene.kicker);
  setHtml('#cosmos-title', scene.title);
  setText('#hero-copy', scene.copy);
  setHtml('#hero-route', scene.route.map((label, index) => `<span>${label}</span>${index < scene.route.length - 1 ? '<b>→</b>' : ''}`).join(''));
  setText('#trace-kicker', `LIVE BUILD TRACE / ${scene.shortLabel}`);
  setText('#metric-first-label', scene.metrics.firstLabel);
  setText('#metric-first-value', scene.metrics.firstValue);
  setText('#metric-second-label', scene.metrics.secondLabel);
  setText('#metric-second-value', scene.metrics.secondValue);
  setText('#process-owner', scene.processOwner);
  const sourceLink = document.querySelector('#source-link');
  if (sourceLink) sourceLink.href = scene.sourceUrl ?? SOURCE_URL;
  setText('#interaction-hint', scene.id === 'solar-system'
    ? 'DRAG TO ORBIT · WHEEL TO ZOOM · 1—5 SELECT STAGE'
    : ['storm-city', 'mars-exploration'].includes(scene.id)
      ? 'DRAG TO ORBIT · WHEEL TO ZOOM · 1—5 SELECT STAGE'
    : 'DRAG TO INSPECT · SPACE TO PAUSE · 1—5 SELECT STAGE');
  const sceneButton = document.querySelector('#toggle-scene');
  sceneButton.innerHTML = `<span class="scene-cta-kicker">SCENE ${nextScene.number}</span><strong>${scene.switchLabel}</strong><span class="scene-cta-arrow">→</span>`;
  sceneButton.setAttribute('aria-label', `${scene.switchLabel}，${nextScene.shortLabel}`);
  document.querySelectorAll('.scene-choice').forEach((button) => {
    const active = button.dataset.scene === scene.id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function getNextSceneId() {
  const sceneIds = Object.keys(SCENE_CATALOG);
  return sceneIds[(sceneIds.indexOf(activeSceneId) + 1) % sceneIds.length];
}

function configureCameraForScene(sceneId) {
  if (sceneId === 'solar-system') {
    camera.position.set(7.8, 5.8, 8.4);
    controls.target.set(0, -0.08, 0);
    controls.enableZoom = true;
    controls.minDistance = 7.4;
    controls.maxDistance = 18.5;
    controls.minPolarAngle = 0.28;
    controls.maxPolarAngle = 1.44;
  } else if (sceneId === 'storm-city') {
    camera.position.set(7.5, 4.25, 8.35);
    controls.target.set(0, 0.08, 0.35);
    controls.enableZoom = true;
    controls.minDistance = 5.8;
    controls.maxDistance = 15.2;
    controls.minPolarAngle = 0.3;
    controls.maxPolarAngle = 1.42;
  } else if (sceneId === 'mars-exploration') {
    camera.position.set(6.55, 3.65, 7.75);
    controls.target.set(0.1, -0.12, 0.2);
    controls.enableZoom = true;
    controls.minDistance = 5.3;
    controls.maxDistance = 14.8;
    controls.minPolarAngle = 0.24;
    controls.maxPolarAngle = 1.46;
  } else {
    camera.position.set(0, 0, 2);
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.minDistance = 2;
    controls.maxDistance = 2;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxPolarAngle = Math.PI * 0.8;
  }
  camera.updateProjectionMatrix();
  controls.update();
}

function setReadyState(label, ready = false) {
  const badge = document.querySelector('#ready-badge');
  badge.innerHTML = `<i></i>${label}`;
  badge.classList.toggle('is-ready', ready);
}

function setStage(stageId, { fromAuto = false } = {}) {
  const stages = getActiveScene().stages;
  const next = stages.find((stage) => stage.id === stageId) ?? stages[0];
  currentStage = next;
  polarNight.uniforms.uProcessStage.value = next.index;
  deepSpace.uniforms.uSceneStage.value = activeSceneId === 'solar-system' ? 4 : next.index;
  solarSystem.setStage(activeSceneId === 'solar-system' ? next.index : 0);
  stormCity.setStage(activeSceneId === 'storm-city' ? next.index : 0);
  marsExploration.setStage(activeSceneId === 'mars-exploration' ? next.index : 0);
  document.querySelectorAll('[data-stage]').forEach((button) => {
    const active = button.dataset.stage === next.id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-dock-stage]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.dockStage === next.id);
  });
  setText('#stage-title', next.title);
  setText('#stage-copy', next.copy);
  setText('#stage-input', next.input);
  setText('#stage-gpu', next.gpu);
  setText('#stage-signal', next.signal);
  if (!fromAuto) {
    autoPlaying = false;
    updateProcessButton();
  }
}

function switchScene(sceneId) {
  if (!SCENE_CATALOG[sceneId] || sceneId === activeSceneId) return;
  activeSceneId = sceneId;
  const url = new URL(window.location.href);
  url.searchParams.set('scene', sceneId);
  window.history.replaceState(null, '', url);
  autoPlaying = false;
  autoClock = 0;
  currentStage = getActiveScene().stages[4];
  configureCameraForScene(activeSceneId);
  renderStageControls();
  updateSceneUI();
  setStage(currentStage.id, { fromAuto: true });
  updateProcessButton();
}

function updateProcessButton() {
  const button = document.querySelector('#toggle-process');
  button.classList.toggle('is-playing', autoPlaying);
  button.innerHTML = `<span class="play-glyph">${autoPlaying ? 'Ⅱ' : '▶'}</span><span>${autoPlaying ? '暂停自动过程' : '自动播放过程'}</span>`;
}

function setPaused(next) {
  paused = next;
  const button = document.querySelector('#toggle-pause');
  button.classList.toggle('is-paused', paused);
  button.innerHTML = `<span class="pause-glyph">${paused ? '▶' : 'Ⅱ'}</span>${paused ? '继续过程' : '暂停过程'}`;
}

function setFocusMode(next) {
  focusMode = next;
  const shell = document.querySelector('.cosmos-shell');
  const button = document.querySelector('#toggle-focus');
  shell.classList.toggle('is-focus-mode', focusMode);
  button.setAttribute('aria-pressed', String(focusMode));
  button.innerHTML = `<span>FOCUS</span>${focusMode ? '退出聚焦' : '聚焦 3D'}`;
}

function updateMetrics(delta) {
  metricClock += delta;
  if (metricClock < 0.25) return;
  metricClock = 0;
  setText('#metric-fps', `${Math.round(1 / Math.max(delta, 1 / 240))}`);
  setText('#metric-calls', `${renderer.info.render.calls}`);
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  const drawingBuffer = renderer.getDrawingBufferSize(new THREE.Vector2());
  skyTarget.setSize(drawingBuffer.x, drawingBuffer.y);
  aurora.setSize(drawingBuffer.x, drawingBuffer.y);
  polarNight.uniforms.iResolution.value.set(drawingBuffer.x, drawingBuffer.y);
  deepSpace.setSize(drawingBuffer.x, drawingBuffer.y);
  stormCity.setSize(drawingBuffer.x, drawingBuffer.y);
  marsExploration.setSize(drawingBuffer.x, drawingBuffer.y);
}

function updateAuto(delta) {
  if (!autoPlaying || paused) return;
  autoClock += delta * timeScale;
  if (autoClock < 3.2) return;
  autoClock = 0;
  const nextIndex = currentStage.index + 1;
  const stages = getActiveScene().stages;
  if (nextIndex >= stages.length) {
    autoPlaying = false;
    updateProcessButton();
    return;
  }
  setStage(stages[nextIndex].id, { fromAuto: true });
}

function toggleAutoProcess() {
  if (autoPlaying) {
    autoPlaying = false;
  } else {
    autoPlaying = true;
    autoClock = 0;
    setStage(getActiveScene().stages[0].id, { fromAuto: true });
  }
  updateProcessButton();
}

function bindEvents() {
  document.querySelector('#stage-tabs').addEventListener('click', (event) => {
    const button = event.target.closest('[data-stage]');
    if (button) setStage(button.dataset.stage);
  });
  document.querySelector('#stage-dock-buttons').addEventListener('click', (event) => {
    const button = event.target.closest('[data-dock-stage]');
    if (button) setStage(button.dataset.dockStage);
  });
  document.querySelectorAll('.scene-choice').forEach((button) => button.addEventListener('click', () => switchScene(button.dataset.scene)));
  document.querySelector('#toggle-scene').addEventListener('click', () => switchScene(getNextSceneId()));
  document.querySelector('#toggle-process').addEventListener('click', toggleAutoProcess);
  document.querySelector('#toggle-pause').addEventListener('click', () => setPaused(!paused));
  document.querySelector('#toggle-focus').addEventListener('click', () => setFocusMode(!focusMode));
  document.querySelectorAll('[data-speed]').forEach((button) => button.addEventListener('click', () => {
    timeScale = Number(button.dataset.speed);
    document.querySelectorAll('[data-speed]').forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
  }));
  controls.addEventListener('start', () => { autoPlaying = false; updateProcessButton(); });
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      setPaused(!paused);
    }
    const numericStage = Number(event.key) - 1;
    const stages = getActiveScene().stages;
    if (numericStage >= 0 && numericStage < stages.length) {
      setStage(stages[numericStage].id);
    }
    if (event.key.toLowerCase() === 's') {
      switchScene(getNextSceneId());
    }
    if (event.key === 'Escape' && focusMode) {
      setFocusMode(false);
    }
  });
}

function boot() {
  try {
    bindEvents();
    resize();
    configureCameraForScene(activeSceneId);
    renderStageControls();
    updateSceneUI();
    setStage(initialScene.stages[4].id, { fromAuto: true });
    setReadyState('RUNTIME READY', true);
    requestAnimationFrame(render);
  } catch (error) {
    console.error(error);
    runtimeError.hidden = false;
    setReadyState('FALLBACK');
  }
}

function render(now) {
  const delta = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;
  if (!paused) {
    elapsed += delta * timeScale;
    aurora.update(elapsed, camera);
    deepSpace.update(elapsed, camera);
    solarSystem.update(elapsed, currentStage.index);
    stormCity.update(elapsed, currentStage.index);
    marsExploration.update(elapsed, currentStage.index);
    updateAuto(delta);
  }
  controls.update();

  const isSolarSystem = activeSceneId === 'solar-system';
  const isDeepSpace = activeSceneId === 'deep-space';
  const isStormCity = activeSceneId === 'storm-city';
  const isMarsExploration = activeSceneId === 'mars-exploration';
  renderer.setRenderTarget(skyTarget);
  renderer.clear(true, false, false);
  if (isStormCity) {
    renderer.render(stormBackdropScene, quadCamera);
  } else if (isMarsExploration) {
    renderer.render(marsBackdropScene, quadCamera);
  } else {
    renderer.render(isSolarSystem || isDeepSpace ? deepSpaceBackdropScene : skyBackdropScene, quadCamera);
  }
  renderer.setRenderTarget(null);
  renderer.clear(true, true, true);
  if (isSolarSystem) {
    renderer.render(deepSpaceRawScene, quadCamera);
    if (currentStage.index >= 1) renderer.render(solarSystem.scene, camera);
  } else if (isStormCity) {
    renderer.render(rawScene, quadCamera);
    if (currentStage.index >= 1) renderer.render(stormCity.scene, camera);
  } else if (isMarsExploration) {
    renderer.render(rawScene, quadCamera);
    if (currentStage.index >= 1) renderer.render(marsExploration.scene, camera);
  } else if (currentStage.index === 4) {
    renderer.render(isDeepSpace ? deepSpaceCompositeScene : compositeScene, quadCamera);
  } else {
    renderer.render(isDeepSpace ? deepSpaceRawScene : rawScene, quadCamera);
  }
  updateMetrics(delta);
  requestAnimationFrame(render);
}

boot();
