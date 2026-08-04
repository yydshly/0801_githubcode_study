import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createProceduralPlanetSurface } from '../.codex/skills/threejs-procedural-planets/examples/procedural-planet-surface/planet-system.js';
import './skill-lab-styles.css';

const STEPS = [
  {
    id: 'baseline',
    number: '00',
    short: '普通基线',
    title: '没有调用 Skill：只是一个材质球',
    rule: '没有地质结构、共享场或诊断要求。模型通常会先给出 SphereGeometry + MeshStandardMaterial。',
    action: '创建标准球体，给一个颜色和基础光照。',
    visible: '它确实是 3D，但表面没有可解释的大陆、气候和地形因果。',
    code: 'new THREE.Mesh(\n  new THREE.SphereGeometry(1, 96, 64),\n  new THREE.MeshStandardMaterial({ color: 0x315a6d })\n)',
    debug: null,
  },
  {
    id: 'height',
    number: '01',
    short: '宏观地形',
    title: 'Skill 规则 01：先建立宏观轮廓',
    rule: '先保存未变形球面方向，再用共享确定性场生成大陆尺度、高地和山脊；不能先涂颜色。',
    action: '把归一化 surfaceDirection 写入几何属性，并让 CPU 与 GLSL 使用同一组地形参数。',
    visible: '灰度越亮代表地形场越高。无论旋转到哪里，结构都固定在球体表面。',
    code: 'surfaceDirection = normalize(originalPosition)\nheight = 0.62 * continents\n       + 0.24 * highlands\n       + 0.34 * ridges',
    debug: 'height',
  },
  {
    id: 'continents',
    number: '02',
    short: '陆海分类',
    title: 'Skill 规则 02：大陆必须是区域场',
    rule: '大陆和海洋来自连续区域场；球面扭曲只能沿切线方向进行，并在扭曲后重新归一化。',
    action: '组合三档大陆噪声、海岸扰动、陆地遮罩与海水深度，而不是随机画色斑。',
    visible: '红色是陆地遮罩，绿色强调海岸，蓝色表示海洋深度。',
    code: 'warpTangent = warp - radial * dot(warp, radial)\nwarped = normalize(point + warpTangent * 520.0)\nlandMask = smoothstep(seaLevel, coast, continentField)',
    debug: 'continents',
  },
  {
    id: 'climate',
    number: '03',
    short: '气候因果',
    title: 'Skill 规则 03：颜色来自气候原因',
    rule: '温度由纬度和海拔决定，湿度由宽频场决定；生物群落不能只是任意颜色噪声。',
    action: '计算 humidity、temperature、slope、altitude 等共享原因，交给后续分类。',
    visible: '红通道表示湿度，绿通道表示温度；它们随纬度和地形呈现连续变化。',
    code: 'temperature = latitudeHeat\n            - terrainHeight * 0.32\nhumidity = 0.65 * broadNoise\n         + 0.35 * detailNoise',
    debug: 'climate',
  },
  {
    id: 'biomes',
    number: '04',
    short: '生物群落',
    title: 'Skill 规则 04：从共享原因分类群落',
    rule: '雪、荒漠、植被、岩石和海水必须由温度、湿度、坡度、海拔与海岸共同派生。',
    action: '由同一套场生成 biome masks，并让颜色、粗糙度和法线共享这些原因。',
    visible: '白色为雪，橙色为干旱，绿色为植被，灰色为岩石，蓝色为海洋。',
    code: 'snow = f(latitude, height, cold)\narid = f(1.0 - humidity, temperature)\nlush = f(humidity, temperature, slope)\nrock = f(slope, height)',
    debug: 'biomes',
  },
  {
    id: 'final',
    number: '05',
    short: '最终材质',
    title: 'Skill 规则 05：几何与材质共享同一因果链',
    rule: '地形、颜色、粗糙度、镜面反射和法线必须描述同一个表面，近距离细节可淡出，宏观轮廓不可消失。',
    action: '组合海陆颜色、海岸、雪线、植被、粗糙度、导数法线和方向光，输出最终材质。',
    visible: '你看到的是程序实时计算出的行星，不依赖行星贴图。拖动和缩放可验证它是完整 3D 表面。',
    code: 'baseColor = mix(ocean, ground, landMask)\nroughness = filterNormalVariance(baseRoughness)\nfinalColor = lighting(baseColor, bumpNormal, roughness)',
    debug: 'final',
  },
  {
    id: 'normals',
    number: '06',
    short: '法线验收',
    title: 'Skill 规则 06：必须暴露诊断视图',
    rule: '完成不等于“看起来不错”。必须检查无光轮廓、平面颜色、掠射光、生物群落遮罩和法线视图。',
    action: '把最终着色切换为法线编码，检查细节连续性、球面接缝和光照依据。',
    visible: 'RGB 颜色直接编码表面方向；连续变化说明法线场连贯，异常色带会暴露接缝。',
    code: 'debugColor = bumpNormalView * 0.5 + 0.5\n// 若出现突变色缝，表面法线或坐标场存在问题',
    debug: 'normals',
  },
];

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="lab-shell">
    <canvas id="planet-canvas" aria-label="可旋转缩放的程序化行星三维实验"></canvas>
    <div class="star-glow" aria-hidden="true"></div>

    <header class="lab-topbar">
      <a class="lab-brand" href="./skills.html" aria-label="返回 24 个 Skill 能力地图">
        <span class="brand-mark">24</span>
        <span><strong>SKILL CONTROL LAB</strong><small>程序化行星 · 真实调用实验</small></span>
      </a>
      <div class="install-status" aria-label="安装状态">
        <i></i><span>PROJECT LOCAL</span><strong>v0.6.0 · 24/24</strong>
      </div>
      <nav class="lab-nav" aria-label="页面导航">
        <a href="./project.html">研究总览</a>
        <a href="./skills.html">能力地图</a>
        <a href="./applications.html">应用场景</a>
      </nav>
    </header>

    <section class="prompt-card" aria-labelledby="prompt-title">
      <div class="panel-kicker"><span>01</span> INVOCATION / 调用</div>
      <h1 id="prompt-title">这次明确调用了哪个 Skill？</h1>
      <code class="skill-command">$threejs-procedural-planets</code>
      <p>“构建一个可从轨道观察的海陆行星；地形、气候、群落、材质共享原因，并暴露高度、陆海、气候、生物群落和法线诊断。”</p>
      <div class="truth-chain" aria-label="效果生成责任链">
        <span>你的目标</span><b>→</b><span>模型读 Skill</span><b>→</b><span>生成代码</span><b>→</b><span>GPU 画面</span>
      </div>
    </section>

    <aside class="process-panel" aria-labelledby="process-title">
      <div class="panel-head">
        <div><div class="panel-kicker"><span>02</span> PROCESS / 过程</div><h2 id="process-title">逐层看它怎样控制结果</h2></div>
        <button id="panel-toggle" class="panel-toggle" type="button" aria-expanded="true" aria-controls="process-content">收起</button>
      </div>
      <div id="process-content" class="process-content">
        <div id="step-list" class="step-list" role="tablist" aria-label="Skill 生成阶段"></div>
        <article class="explain-card" aria-live="polite">
          <span id="step-eyebrow">BEFORE SKILL</span>
          <h3 id="step-title"></h3>
          <dl>
            <div><dt>Skill 给模型的约束</dt><dd id="step-rule"></dd></div>
            <div><dt>模型执行的代码动作</dt><dd id="step-action"></dd></div>
            <div><dt>你正在看到什么</dt><dd id="step-visible"></dd></div>
          </dl>
          <pre><code id="step-code"></code></pre>
        </article>
        <div class="panel-actions">
          <button id="auto-play" class="primary-action" type="button">自动演示过程</button>
          <button id="toggle-rotation" type="button" aria-pressed="false">暂停自转</button>
          <button id="reset-camera" type="button">重置视角</button>
        </div>
      </div>
    </aside>

    <div class="scene-caption">
      <span id="scene-mode">NO SKILL / BASELINE</span>
      <strong id="scene-title">普通材质球</strong>
      <small>拖动旋转视角 · 滚轮缩放 · 点击右侧阶段看中间场</small>
    </div>

    <div class="runtime-note">
      <span>RUNTIME SOURCE</span>
      <strong>项目内 .codex/skills 的随附实现</strong>
      <small>本实验聚焦“程序化行星表面”；不是图片生成，也没有使用行星贴图。</small>
    </div>

    <div id="render-fallback" class="render-fallback" hidden>
      <strong>当前环境无法启动 WebGL</strong>
      <p>过程说明仍可阅读；请在支持 WebGL 的浏览器中查看实时行星。</p>
    </div>
  </div>
`;

const canvas = document.querySelector('#planet-canvas');
const stepList = document.querySelector('#step-list');
const mediaReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentStep = 0;
let autoplayTimer = null;
let rotationEnabled = !mediaReducedMotion.matches;
let renderer;
let planetSystem;
let baselinePlanet;
let controls;
let frameHandle;

stepList.innerHTML = STEPS.map((step, index) => `
  <button type="button" role="tab" data-step="${index}" aria-selected="${index === 0}" class="${index === 0 ? 'is-active' : ''}">
    <span>${step.number}</span><strong>${step.short}</strong><i></i>
  </button>
`).join('');

function applyStep(index, { stopAutoplay = true } = {}) {
  currentStep = Math.max(0, Math.min(STEPS.length - 1, index));
  const step = STEPS[currentStep];
  if (stopAutoplay) stopAutoplayLoop();

  stepList.querySelectorAll('[data-step]').forEach((button, buttonIndex) => {
    const active = buttonIndex === currentStep;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });

  document.querySelector('#step-eyebrow').textContent = currentStep === 0 ? 'BEFORE SKILL / 对照组' : `SKILL RULE ${step.number}`;
  document.querySelector('#step-title').textContent = step.title;
  document.querySelector('#step-rule').textContent = step.rule;
  document.querySelector('#step-action').textContent = step.action;
  document.querySelector('#step-visible').textContent = step.visible;
  document.querySelector('#step-code').textContent = step.code;
  document.querySelector('#scene-mode').textContent = currentStep === 0 ? 'NO SKILL / BASELINE' : `SKILL DRIVEN / ${step.debug.toUpperCase()}`;
  document.querySelector('#scene-title').textContent = step.short;

  if (renderer) renderer.toneMappingExposure = step.debug === 'height' ? 0.22 : 1.08;

  if (baselinePlanet && planetSystem) {
    baselinePlanet.visible = currentStep === 0;
    planetSystem.object.visible = currentStep !== 0;
    if (step.debug) planetSystem.setDebugMode(step.debug);
  }
}

function stopAutoplayLoop() {
  if (autoplayTimer) window.clearInterval(autoplayTimer);
  autoplayTimer = null;
  const button = document.querySelector('#auto-play');
  button.textContent = '自动演示过程';
  button.setAttribute('aria-pressed', 'false');
}

function startAutoplayLoop() {
  if (mediaReducedMotion.matches) {
    applyStep(currentStep === STEPS.length - 1 ? 0 : currentStep + 1, { stopAutoplay: false });
    return;
  }
  if (autoplayTimer) {
    stopAutoplayLoop();
    return;
  }
  document.querySelector('#auto-play').textContent = '停止自动演示';
  document.querySelector('#auto-play').setAttribute('aria-pressed', 'true');
  applyStep(0, { stopAutoplay: false });
  autoplayTimer = window.setInterval(() => {
    applyStep((currentStep + 1) % STEPS.length, { stopAutoplay: false });
  }, 3200);
}

function createStarField() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  let seed = 12731;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let index = 0; index < count; index += 1) {
    const radius = 8 + random() * 34;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.cos(phi);
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x91cde5, size: 0.025, transparent: true, opacity: 0.72, sizeAttenuation: true }));
}

function resizeRenderer() {
  if (!renderer) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
  const targetWidth = Math.floor(width * pixelRatio);
  const targetHeight = Math.floor(height * pixelRatio);
  if (renderer.getPixelRatio() !== pixelRatio) renderer.setPixelRatio(pixelRatio);
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    renderer.setSize(width, height, false);
  }
}

function initScene() {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (error) {
    document.querySelector('#render-fallback').hidden = false;
    document.body.dataset.renderState = 'fallback';
    return;
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x03070a);
  scene.fog = new THREE.FogExp2(0x03070a, 0.018);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 100);
  camera.position.set(0.18, 0.12, 3.25);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.minDistance = 1.45;
  controls.maxDistance = 5.5;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.75;

  scene.add(createStarField());
  const keyLight = new THREE.DirectionalLight(0xbdeaff, 3.1);
  keyLight.position.set(4, 1.8, 4);
  scene.add(keyLight, new THREE.HemisphereLight(0x4f8ca5, 0x05090c, 0.58));

  baselinePlanet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    new THREE.MeshStandardMaterial({ color: 0x31596a, roughness: 0.68, metalness: 0.04 }),
  );
  scene.add(baselinePlanet);

  planetSystem = createProceduralPlanetSurface({ camera });
  planetSystem.object.visible = false;
  scene.add(planetSystem.object);
  applyStep(currentStep, { stopAutoplay: false });
  document.body.dataset.sceneReady = 'true';

  let previousFrameTime = performance.now();
  const render = () => {
    resizeRenderer();
    camera.aspect = Math.max(canvas.clientWidth / Math.max(canvas.clientHeight, 1), 0.01);
    camera.updateProjectionMatrix();
    controls.update();
    const currentFrameTime = performance.now();
    const delta = Math.min((currentFrameTime - previousFrameTime) / 1000, 0.05);
    previousFrameTime = currentFrameTime;
    if (rotationEnabled) {
      if (baselinePlanet.visible) baselinePlanet.rotation.y += delta * 0.12;
      planetSystem.update({ delta });
    } else {
      planetSystem.update({ delta: 0 });
    }
    renderer.render(scene, camera);
    frameHandle = window.requestAnimationFrame(render);
  };
  render();

  document.querySelector('#reset-camera').addEventListener('click', () => {
    camera.position.set(0.18, 0.12, 3.25);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  window.addEventListener('pagehide', () => {
    window.cancelAnimationFrame(frameHandle);
    controls.dispose();
    planetSystem.dispose();
    baselinePlanet.geometry.dispose();
    baselinePlanet.material.dispose();
    renderer.dispose();
  }, { once: true });
}

stepList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-step]');
  if (button) applyStep(Number(button.dataset.step));
});

document.querySelector('#auto-play').addEventListener('click', startAutoplayLoop);
document.querySelector('#toggle-rotation').addEventListener('click', (event) => {
  rotationEnabled = !rotationEnabled;
  event.currentTarget.setAttribute('aria-pressed', String(!rotationEnabled));
  event.currentTarget.textContent = rotationEnabled ? '暂停自转' : '继续自转';
});

document.querySelector('#panel-toggle').addEventListener('click', (event) => {
  const panel = document.querySelector('.process-panel');
  const collapsed = panel.classList.toggle('is-collapsed');
  event.currentTarget.setAttribute('aria-expanded', String(!collapsed));
  event.currentTarget.textContent = collapsed ? '展开过程' : '收起';
});

mediaReducedMotion.addEventListener('change', (event) => {
  if (event.matches) {
    stopAutoplayLoop();
    rotationEnabled = false;
    document.querySelector('#toggle-rotation').textContent = '继续自转';
  }
});

applyStep(0, { stopAutoplay: false });
initScene();
