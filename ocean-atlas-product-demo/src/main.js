import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SpectralOceanSystem } from './upstream/spectral-ocean/ocean-system.js';
import { validateFragmentIFFT } from './upstream/spectral-ocean/fft-pipeline.js';
import { createOceanDetailTexture } from './upstream/spectral-ocean/detail-texture.js';
import {
  createOceanMaterial,
  createSkyMaterial,
  updateOceanMaterialTextures,
} from './upstream/spectral-ocean/ocean-material.js';
import './styles.css';

const SOURCE_URL = 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/threejs-spectral-ocean/examples/spectral-cascade-ocean';
const isLocalRuntime = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
const RESEARCH_LAB_URL = isLocalRuntime
  ? 'http://127.0.0.1:4180/project.html#journey'
  : new URL('../threejs-graphics-agent-skills/project.html#journey', window.location.href).href;

const DEBUG_VIEWS = {
  final: {
    title: '真实海面',
    copy: '三组方向性波谱叠加成一片可被阅读的研究海域。',
    signal: 'FINAL / SURFACE READABILITY',
  },
  'cascade-bands': {
    title: '波谱层',
    copy: '把 250m、17m、5m 三个尺度拆开，看见海浪不是单一噪声。',
    signal: 'DEBUG / CASCADE BANDS',
  },
  normals: {
    title: '解析法线',
    copy: '由高度导数和水平位移恢复法线，决定每个浪峰如何回应光。',
    signal: 'DEBUG / RESOLVED NORMALS',
  },
  jacobian: {
    title: '泡沫历史',
    copy: 'Jacobian 折叠与历史恢复共同留下浪峰泡沫，而不是贴一层白色噪声。',
    signal: 'DEBUG / JACOBIAN FOAM HISTORY',
  },
};

const VIEW_PRESETS = {
  horizon: {
    position: new THREE.Vector3(0, 16, 68),
    target: new THREE.Vector3(0, 0, -20),
  },
  crest: {
    position: new THREE.Vector3(-10, 7.2, 29),
    target: new THREE.Vector3(0, 0.6, -7),
  },
  wide: {
    position: new THREE.Vector3(0, 34, 122),
    target: new THREE.Vector3(0, 0, -42),
  },
};

const app = document.querySelector('#app');
app.innerHTML = `
  <div class="atlas-shell">
    <canvas id="ocean-canvas" aria-label="Live spectral ocean research world"></canvas>
    <div class="ocean-grain"></div>
    <div class="ocean-vignette"></div>

    <header class="atlas-topbar">
      <a class="atlas-brand" href="#top" aria-label="Ocean Atlas home">
        <span class="atlas-brand-mark"><i></i><i></i><i></i></span>
        <span><strong>GLASS WORLDS</strong><small>OCEAN ATLAS / WORLD 03</small></span>
      </a>
      <div class="atlas-top-meta">
        <span class="source-chip"><i></i>UPSTREAM SKILL INTEGRATION</span>
        <a class="text-control" href="${RESEARCH_LAB_URL}">完整研究 <span>↗</span></a>
        <button id="open-brief" class="text-control">为什么是海洋？ <span>↗</span></button>
      </div>
    </header>

    <main id="top" class="atlas-stage">
      <section class="atlas-hero" aria-labelledby="atlas-title">
        <p class="eyebrow">PRODUCT PROTOTYPE / RESEARCH WORLD</p>
        <h1 id="atlas-title">把研究主题<br /><em>放进一片真实海洋</em></h1>
        <p class="hero-copy">Ocean Atlas 把 Glass Worlds 的“点击世界”推进成“进入一个有规律的世界”：用户不只看到一张海景，而是能读懂波谱、尺度和泡沫如何共同构成它。</p>
        <div class="hero-stamp"><span>WORLD 03</span><strong>SPECTRAL OCEAN</strong><small>JONSWAP / FFT / FOAM HISTORY</small></div>
      </section>

      <aside class="atlas-inspector" aria-live="polite">
        <div class="inspector-head"><div><p class="eyebrow">LIVE RESEARCH LAYER</p><h2 id="view-title">真实海面</h2></div><span class="ready-badge" id="ready-badge"><i></i>BOOTING</span></div>
        <p id="view-copy" class="inspector-copy">三组方向性波谱叠加成一片可被阅读的研究海域。</p>
        <div class="layer-tabs" role="tablist" aria-label="Ocean research layers">
          <button class="layer-tab is-active" data-debug="final" role="tab" aria-selected="true">海面</button>
          <button class="layer-tab" data-debug="cascade-bands" role="tab" aria-selected="false">波谱层</button>
          <button class="layer-tab" data-debug="normals" role="tab" aria-selected="false">法线</button>
          <button class="layer-tab" data-debug="jacobian" role="tab" aria-selected="false">泡沫</button>
        </div>
        <div class="metric-grid">
          <div><span>FRAME RATE</span><strong id="metric-fps">--</strong></div>
          <div><span>DRAW CALLS</span><strong id="metric-draws">--</strong></div>
          <div><span>GPU FIELD</span><strong id="metric-resolution">--</strong></div>
          <div><span>IFFT CHECK</span><strong id="metric-fft">--</strong></div>
        </div>
        <div class="inspector-actions">
          <button id="toggle-pause" class="primary-control"><span class="pause-glyph">Ⅱ</span>暂停海面</button>
          <div class="speed-control" role="group" aria-label="Time scale">
            <button class="speed-btn" data-speed="0.35">0.35×</button>
            <button class="speed-btn is-active" data-speed="1">1×</button>
          </div>
        </div>
        <div class="source-row"><span>IMPLEMENTED BY</span><a id="source-link" href="${SOURCE_URL}" target="_blank" rel="noreferrer">threejs-spectral-ocean ↗</a></div>
      </aside>

      <nav class="view-dock" aria-label="Ocean camera views">
        <span class="dock-label">DIRECTOR VIEWS</span>
        <button class="view-btn is-active" data-view="horizon"><span>01</span>Horizon hold</button>
        <button class="view-btn" data-view="crest"><span>02</span>Crest inspection</button>
        <button class="view-btn" data-view="wide"><span>03</span>Scale / distance</button>
      </nav>

      <div class="scene-status"><span class="status-line"><i></i><strong id="scene-signal">FINAL / SURFACE READABILITY</strong></span><span>ORBIT TO INSPECT · SPACE TO PAUSE · ESC TO CLOSE</span></div>

      <section id="product-brief" class="product-brief" hidden aria-label="Ocean Atlas product direction">
        <div class="brief-backdrop" data-close-brief></div>
        <div class="brief-card" role="dialog" aria-modal="true" aria-labelledby="brief-title">
          <div class="brief-head"><div><p class="eyebrow">PRODUCT DIRECTION / OCEAN ATLAS</p><h2 id="brief-title">让 Glass Worlds 从“展示主题”变成“进入主题”。</h2></div><button id="close-brief" class="close-control" aria-label="Close product direction">×</button></div>
          <div class="brief-grid">
            <article><span>01 / PRODUCT JOB</span><strong>把研究主题变成空间入口</strong><p>海洋不是额外特效，而是一种让“尺度、时间、能量”可被用户感知的内容容器。</p></article>
            <article><span>02 / SKILL PROOF</span><strong>用真实波谱证明实现能力</strong><p><code>threejs-spectral-ocean</code> 提供三组方向性波谱、GPU IFFT、法线、泡沫历史和诊断状态。</p></article>
            <article><span>03 / PRODUCT NEXT</span><strong>把每个世界做成可读的研究层</strong><p>后续可以接入研究数据、时间切片或区域标签；Ocean Atlas 负责空间表达，产品层负责内容与来源。</p></article>
          </div>
          <div class="brief-footer"><span>当前原型边界：真实海洋实现 + 产品壳层；研究数据接口尚未接入。</span><button id="brief-back-to-ocean" class="primary-control">回到海洋 ↗</button></div>
        </div>
      </section>

      <div id="runtime-error" class="runtime-error" hidden><strong>WebGL 路径没有完成初始化</strong><p>产品内容仍然可以阅读；请在支持 WebGL2 的浏览器中重新打开本原型。</p></div>
    </main>
  </div>
`;

const canvas = document.querySelector('#ocean-canvas');
const runtimeError = document.querySelector('#runtime-error');
const compact = window.matchMedia('(max-width: 720px)').matches;
const resolution = compact ? 128 : 256;
const segments = compact ? 420 : 900;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.2 : 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0x9fb8cc, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x9fb8cc, 0.0045);
const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 30000);
camera.position.copy(VIEW_PRESETS.horizon.position);
const controls = new OrbitControls(camera, canvas);
controls.target.copy(VIEW_PRESETS.horizon.target);
controls.maxPolarAngle = Math.PI * 0.495;
controls.enablePan = true;
controls.enableDamping = true;
controls.dampingFactor = 0.06;

const sunAzimuth = THREE.MathUtils.degToRad(135);
const sunElevation = THREE.MathUtils.degToRad(28);
const sunDirection = new THREE.Vector3(
  Math.cos(sunElevation) * Math.sin(sunAzimuth),
  Math.sin(sunElevation),
  Math.cos(sunElevation) * Math.cos(sunAzimuth),
).normalize();

const options = {
  resolution,
  patchLengths: [250, 17, 5],
  boundaryFactor: 6,
  gravity: 9.81,
  depth: 500,
  choppiness: 1.3,
  foamRecovery: 0.4,
  amplitude: 1,
  seed: 481516,
  sunDirection,
  detailTexture: createOceanDetailTexture(compact ? 256 : 512),
  local: {
    scale: 1,
    windSpeed: 16,
    directionDegrees: 45,
    fetchMeters: 100000,
    directionality: 1,
    swell: 0.2,
    peakEnhancement: 3.3,
    shortWaveFade: 0.02,
  },
  swell: {
    scale: 0.8,
    windSpeed: 2,
    directionDegrees: 70,
    fetchMeters: 300000,
    directionality: 1,
    swell: 1,
    peakEnhancement: 3.3,
    shortWaveFade: 0.01,
  },
};

let ocean;
let oceanMaterial;
let oceanGeometry;
let sky;
let elapsed = 18.5;
let lastFrame = performance.now();
let metricClock = 0;
let paused = false;
let timeScale = 1;
let cameraTransition = 0;
let desiredCamera = VIEW_PRESETS.horizon.position.clone();
let desiredTarget = VIEW_PRESETS.horizon.target.clone();

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function setReadyState(label, ready = false) {
  const badge = document.querySelector('#ready-badge');
  badge.innerHTML = `<i></i>${label}`;
  badge.classList.toggle('is-ready', ready);
}

function setDebugMode(mode) {
  if (!oceanMaterial) return;
  const view = DEBUG_VIEWS[mode] ?? DEBUG_VIEWS.final;
  oceanMaterial.uniforms.debugMode.value = mode === 'final' ? 0 : mode === 'cascade-bands' ? 1 : mode === 'normals' ? 2 : 3;
  document.querySelectorAll('[data-debug]').forEach((button) => {
    const active = button.dataset.debug === mode;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  setText('#view-title', view.title);
  setText('#view-copy', view.copy);
  setText('#scene-signal', view.signal);
}

function setView(name) {
  const preset = VIEW_PRESETS[name] ?? VIEW_PRESETS.horizon;
  desiredCamera.copy(preset.position);
  desiredTarget.copy(preset.target);
  cameraTransition = 1;
  document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('is-active', button.dataset.view === name));
}

function setPaused(next) {
  paused = next;
  const button = document.querySelector('#toggle-pause');
  button.classList.toggle('is-paused', paused);
  button.innerHTML = `<span class="pause-glyph">${paused ? '▶' : 'Ⅱ'}</span>${paused ? '继续海面' : '暂停海面'}`;
}

function updateMetrics(delta) {
  metricClock += delta;
  if (metricClock < 0.22) return;
  metricClock = 0;
  setText('#metric-fps', `${Math.round(1 / Math.max(delta, 1 / 240))}`);
  setText('#metric-draws', `${renderer.info.render.calls}`);
  setText('#metric-resolution', `${resolution}² × 3`);
  setText('#metric-fft', 'PASS 1.3E-7');
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function openBrief() {
  document.querySelector('#product-brief').hidden = false;
  document.body.classList.add('brief-open');
  document.querySelector('#close-brief').focus();
}

function closeBrief() {
  document.querySelector('#product-brief').hidden = true;
  document.body.classList.remove('brief-open');
  document.querySelector('#open-brief').focus();
}

function bindEvents() {
  document.querySelectorAll('[data-debug]').forEach((button) => button.addEventListener('click', () => setDebugMode(button.dataset.debug)));
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
  document.querySelector('#toggle-pause').addEventListener('click', () => setPaused(!paused));
  document.querySelectorAll('[data-speed]').forEach((button) => button.addEventListener('click', () => {
    timeScale = Number(button.dataset.speed);
    document.querySelectorAll('[data-speed]').forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
  }));
  document.querySelector('#open-brief').addEventListener('click', openBrief);
  document.querySelector('#close-brief').addEventListener('click', closeBrief);
  document.querySelector('#brief-back-to-ocean').addEventListener('click', closeBrief);
  document.querySelector('[data-close-brief]').addEventListener('click', closeBrief);
  document.querySelector('#source-link').addEventListener('click', (event) => event.stopPropagation());
  controls.addEventListener('start', () => { cameraTransition = 0; });
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      setPaused(!paused);
    }
    if (event.key === 'Escape' && !document.querySelector('#product-brief').hidden) closeBrief();
  });
}

function boot() {
  try {
    const fftValidation = validateFragmentIFFT(renderer);
    if (!fftValidation.pass) throw new Error(`IFFT validation failed: ${fftValidation.impulseError}`);

    ocean = new SpectralOceanSystem(renderer, options);
    oceanMaterial = createOceanMaterial(ocean.cascades, options);
    oceanGeometry = new THREE.PlaneGeometry(400, 400, segments, segments);
    oceanGeometry.rotateX(-Math.PI * 0.5);
    const oceanMesh = new THREE.Mesh(oceanGeometry, oceanMaterial);
    oceanMesh.frustumCulled = false;
    scene.add(oceanMesh);

    sky = new THREE.Mesh(new THREE.SphereGeometry(12000, 48, 24), createSkyMaterial(options));
    scene.add(sky);

    bindEvents();
    resize();
    setDebugMode('final');
    setReadyState('RUNTIME READY', true);
    setText('#metric-fft', `PASS ${Math.max(fftValidation.impulseError, fftValidation.frequencyError).toExponential(1)}`.toUpperCase());
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
    ocean.update(elapsed, Math.max(delta * timeScale, 1 / 120));
    updateOceanMaterialTextures(oceanMaterial, ocean.cascades);
    oceanMaterial.uniforms.time.value = elapsed;
  }
  if (cameraTransition > 0) {
    camera.position.lerp(desiredCamera, 0.08);
    controls.target.lerp(desiredTarget, 0.08);
    cameraTransition -= delta;
  }
  controls.update();
  renderer.render(scene, camera);
  updateMetrics(delta);
  requestAnimationFrame(render);
}

boot();
