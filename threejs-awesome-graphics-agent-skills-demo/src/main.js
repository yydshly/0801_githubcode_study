import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import './styles.css';

const isLocalRuntime = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const SKILL_LAB_URL = isLocalRuntime
  ? 'http://127.0.0.1:4180/project.html'
  : new URL('../threejs-graphics-agent-skills/project.html', window.location.href).href;

const WORLD_ASSETS = [
  { id: 'alpine', title: 'Alpine village', category: 'Spatial story', src: assetUrl('assets/worlds/alpine-village.webp'), tint: '#c5e3ff' },
  { id: 'rainy-city', title: 'Rainy city', category: 'Atmospheric UI', src: assetUrl('assets/worlds/rainy-city.webp'), tint: '#bda9ff' },
  { id: 'underwater', title: 'Underwater ruins', category: 'Optical depth', src: assetUrl('assets/worlds/underwater-ruins.webp'), tint: '#54d8dd' },
  { id: 'frontier', title: 'Physical-AI frontier', category: 'Interactive world', src: assetUrl('assets/worlds/physical-ai-frontier.webp'), tint: '#ffb86d' },
  { id: 'atelier', title: 'Virtual atelier', category: 'Product content', src: assetUrl('assets/worlds/virtual-try-on-atelier.webp'), tint: '#ff9ac8' },
];

const CAPABILITIES = [
  {
    id: 'glass',
    skill: 'threejs-procedural-materials',
    label: 'Glass + Fresnel',
    eyebrow: 'Material depth',
    title: '让球体像“世界”，而不是贴图容器',
    body: '外壳厚度、边缘高光、内部视差和局部反射共同建立材质可信度。',
    accent: '#87f5db',
    metric: 'shell / rim / parallax',
  },
  {
    id: 'camera',
    skill: 'threejs-camera-direction',
    label: 'Camera direction',
    eyebrow: 'Attention routing',
    title: '让镜头主动组织产品叙事',
    body: '把“浏览氛围”和“阅读内容”变成两个有意图的镜头状态，而不是同一套参数硬撑。',
    accent: '#a7b8ff',
    metric: 'orbit / focus / handoff',
  },
  {
    id: 'fields',
    skill: 'threejs-procedural-fields',
    label: 'Shared fields',
    eyebrow: 'Coherent motion',
    title: '让粒子、光和世界运动共享一套规律',
    body: '同一套时间场和空间场驱动星尘、光晕与球体漂移，减少互相独立的噪声层。',
    accent: '#ffc68a',
    metric: 'seed / field / mask',
  },
  {
    id: 'bloom',
    skill: 'threejs-exposure-color-grading',
    label: 'HDR image pipeline',
    eyebrow: 'Signal ownership',
    title: '让高光服务于信息，而不是把画面洗白',
    body: '曝光、色调映射、选择性 bloom 与内容模式联动，让发光边缘有层次。',
    accent: '#f5a7ff',
    metric: 'HDR / bloom / LUT',
  },
  {
    id: 'validation',
    skill: 'threejs-visual-validation',
    label: 'Visual validation',
    eyebrow: 'Evidence loop',
    title: '把“好看”变成可回放、可比较的证据',
    body: '固定视角、可重复参数、调试通道和画质档位，让视觉迭代可以被团队复用。',
    accent: '#d2ddff',
    metric: 'seed / debug / tier',
  },
];

const UPSTREAM_GALLERY_URL = isLocalRuntime
  ? 'http://127.0.0.1:4173/'
  : 'https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills';

const SKILL_GROUPS = [
  {
    id: 'route-proof',
    label: '路线与证据',
    summary: '先决定找谁，再证明结果真的成立。',
    skills: [
      { id: 'threejs-skill-router', effect: '把视觉目标拆成最小的专家组合。', visual: '知道该改镜头、材质、场还是后处理。', evidence: '当前 Lab 的路由入口' },
      { id: 'threejs-visual-validation', effect: '固定视角、seed、debug、无后处理基线和画质档位。', visual: '同一输入可以回放、比较和定位回归。', evidence: '当前 Lab 的验证流程' },
    ],
  },
  {
    id: 'camera-motion',
    label: '镜头、运动与共享场',
    summary: '控制注意力如何移动，以及运动为什么看起来有规律。',
    skills: [
      { id: 'threejs-camera-direction', effect: '追逐、侧视、轨道、指针凝视、镜头交接和浮动原点。', visual: '焦点转移有意图，而不是不停旋转。', evidence: '当前 Glass Worlds 演示' },
      { id: 'threejs-procedural-animation', effect: '分析化时间线、重力转向、弹簧跟随、旋转对齐和分帧独立响应。', visual: '动作有启动、转向、停靠和节奏。', evidence: '实现技能，无独立图库卡片' },
      { id: 'threejs-procedural-fields', effect: '共享标量/向量场、频段、域扭曲、因果 mask 和程序法线。', visual: '水、磨损、粒子和位移共享同一个原因。', evidence: '当前 Shared fields 演示' },
    ],
  },
  {
    id: 'shape-world',
    label: '形体、材质与世界生成',
    summary: '决定物体如何长出来、表面如何回应光、远近是否都站得住。',
    skills: [
      { id: 'threejs-procedural-materials', effect: 'PBR、位移、湿润度、熔岩/自发光、苔藓和 dissolve。', visual: '表面有身份，不只是颜色和透明度。', exampleId: 'threejs-procedural-materials/hybrid-soil-moss-surface', evidence: '2 个上游图库示例' },
      { id: 'threejs-parallax-occlusion-mapping', effect: '高度场光线行进、浮雕轮廓、自阴影和 relief-aware 深度。', visual: '平面纹理看起来有真正的凹凸厚度。', exampleId: 'threejs-parallax-occlusion-mapping/silhouette-relief', evidence: '1 个上游图库示例' },
      { id: 'threejs-procedural-geometry', effect: '语义网格、框架/分支环、UV 密度、材质槽和近距离几何预算。', visual: '不是 primitive 拼起来，而是可近看、可维护的形体。', exampleId: 'threejs-procedural-geometry/sculpted-gallery-frame', evidence: '4 个上游图库示例' },
      { id: 'threejs-procedural-vegetation', effect: '树、草、藤蔓、根系、叶片卡片、确定性生长和 rooted wind。', visual: '植被会生长、扎根、随风，不是贴上去的绿。', exampleId: 'threejs-procedural-vegetation/gpu-computed-grass', evidence: '4 个上游图库示例' },
      { id: 'threejs-procedural-architecture', effect: '建筑体量、立面 grammar、模块、边缘分析和材质槽编译。', visual: '可生成一组有秩序的建筑变体。', exampleId: 'threejs-procedural-architecture/procedural-financial-tower', evidence: '1 个上游图库示例' },
      { id: 'threejs-procedural-planets', effect: '球面地形、山脊、陨石坑、生物群系、海岸线和高度 LOD。', visual: '星球从轨道远景到近距离都保持可信。', exampleId: 'threejs-procedural-planets/procedural-planet-surface', evidence: '1 个上游图库示例' },
    ],
  },
  {
    id: 'environment-optics',
    label: '水、天气与大气',
    summary: '把环境做成有物理线索、会影响表面的系统。',
    skills: [
      { id: 'threejs-spectral-ocean', effect: 'FFT/频谱海浪、Gerstner 混合、泡沫、水下 Snell 窗和焦散。', visual: '海面、水下视角和浪峰由同一套波谱连接。', exampleId: 'threejs-spectral-ocean/spectral-cascade-ocean', evidence: '4 个上游图库示例' },
      { id: 'threejs-water-optics', effect: '多波位移、涟漪、焦散、折射、反射、吸收和水体体积。', visual: '水滴、池水和玻璃球里的水有方向感。', exampleId: 'threejs-water-optics/interactive-pool-volume', evidence: '2 个上游图库示例' },
      { id: 'threejs-precipitation-surfaces', effect: '雨雪、积雪、湿地面、雨滴法线、飞溅和天气 envelope。', visual: '天气会改变地面，而不是只有一层粒子。', exampleId: 'threejs-precipitation-surfaces/wet-puddle-rain', evidence: '2 个上游图库示例' },
      { id: 'threejs-atmosphere-aerial-perspective', effect: 'Rayleigh/Mie 天空、太阳/月亮、深度散射和地面到太空的过渡。', visual: '远处因为空气而褪色，空间有尺度。', exampleId: 'threejs-atmosphere-aerial-perspective/lut-aerial-perspective', evidence: '1 个上游图库示例' },
      { id: 'threejs-volumetric-clouds', effect: '天气密度、raymarch、云影、银边、历史重建和质量模式。', visual: '云是有体积、有光照、有性能档位的环境。', exampleId: 'threejs-volumetric-clouds/weather-volume-clouds', evidence: '1 个上游图库示例' },
      { id: 'threejs-temporal-surfaces', effect: '触摸历史、霜、湿窗雨滴、背景折射和模糊。', visual: '玻璃表面会记住交互，并影响后面的世界。', exampleId: 'threejs-temporal-surfaces/refractive-window-rain', evidence: '2 个上游图库示例' },
    ],
  },
  {
    id: 'effects-image',
    label: 'VFX、光照与最终图像',
    summary: '最后决定能量如何发光、遮挡如何成立、每个 pass 如何协作。',
    skills: [
      { id: 'threejs-procedural-vfx', effect: 'Aurora、火/烟、流体、SDF 碰撞、重入尾焰、火花、溶解和全息投影。', visual: '特效有有限 footprint、碰撞关系和 HDR 层级。', exampleId: 'threejs-procedural-vfx/raymarched-aurora-curtains', evidence: '4 个上游图库示例' },
      { id: 'threejs-raymarched-space-effects', effect: '黑洞、吸积盘、虫洞、曲线光线和受控数值积分。', visual: '空间扭曲不是贴一张星空图，而是视线本身被改变。', exampleId: 'threejs-raymarched-space-effects/schwarzschild-geodesic-black-hole', evidence: '2 个上游图库示例' },
      { id: 'threejs-shadow-systems', effect: '稳定级联阴影、cached clipmap、texel 稳定和更新预算。', visual: '大场景移动相机时，阴影不抖、不浪费更新。', evidence: '交叉系统，无独立图库卡片' },
      { id: 'threejs-screen-space-ambient-occlusion', effect: 'GTAO horizon sampling、弯曲法线、双边重建和时域重建。', visual: '物体接触地面，空间不会漂浮。', evidence: '交叉系统，无独立图库卡片' },
      { id: 'threejs-bloom', effect: 'HDR 提取、多尺度过滤、选择性贡献和曝光耦合。', visual: '高光只在该亮的地方亮，不把整张图洗白。', evidence: '当前 HDR pipeline 演示' },
      { id: 'threejs-exposure-color-grading', effect: '亮度计量、适应曝光、tone mapping 和 3D LUT。', visual: '画面明暗随内容变化，但信息层级不丢。', evidence: '当前 HDR pipeline 演示' },
      { id: 'threejs-image-pipeline', effect: '深度、法线、albedo、history 与 GTAO/Bloom/调色的信号所有权和顺序。', visual: '后处理互不抢数据，问题能定位到具体 pass。', evidence: '交叉系统，无独立图库卡片' },
    ],
  },
];

const renderSkillAtlas = () => {
  let sequence = 0;
  return SKILL_GROUPS.map((group) => `
    <section class="skill-group" data-skill-group="${group.id}">
      <div class="skill-group-head"><div><span class="skill-group-kicker">${group.label}</span><p>${group.summary}</p></div><b>${group.skills.length}</b></div>
      <div class="skill-list">
        ${group.skills.map((skill) => {
          sequence += 1;
          const target = skill.exampleId ? `${UPSTREAM_GALLERY_URL}?example=${encodeURIComponent(skill.exampleId)}` : UPSTREAM_GALLERY_URL;
          const evidenceLabel = skill.exampleId ? `${skill.evidence} · 查看效果 ↗` : skill.evidence;
          return `<article class="skill-row"><span class="skill-row-index">${String(sequence).padStart(2, '0')}</span><div class="skill-row-main"><code>${skill.id}</code><strong>${skill.effect}</strong><p>${skill.visual}</p></div><a class="skill-evidence ${skill.exampleId ? 'is-gallery' : 'is-method'}" href="${target}" target="_blank" rel="noreferrer">${evidenceLabel}</a></article>`;
        }).join('')}
      </div>
    </section>
  `).join('');
};

const app = document.querySelector('#app');
app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Graphics Skills Lab home">
        <span class="brand-mark"><i></i><i></i><i></i></span>
        <span>GRAPHICS SKILLS LAB</span>
      </a>
      <div class="topbar-meta">
        <button id="open-guide" class="guide-launcher" aria-label="Open learning guide">
          <span class="guide-launcher-mark">?</span>
          <span class="guide-launcher-copy"><strong>看懂这套库</strong><small>LEARN THE SYSTEM</small></span>
          <span class="guide-launcher-arrow">↗</span>
        </button>
        <a class="case-launcher" href="${SKILL_LAB_URL}" target="_blank" rel="noreferrer" aria-label="Open the complete Three.js Skill research project">
          <span class="case-launcher-mark">✦</span>
          <span><strong>星空过程</strong><small>CASE 02</small></span>
          <b>↗</b>
        </a>
        <span class="install-badge"><span class="status-dot"></span> installed locally</span>
        <span class="version-tag">v0.6.0</span>
      </div>
    </header>

    <main id="top" class="stage">
      <canvas id="scene" aria-label="Interactive Three.js graphics capability demonstration"></canvas>
      <div class="scene-vignette"></div>
      <div class="scene-grid"></div>

      <section class="intro-block">
        <p class="kicker">THREE.JS / AGENT SKILL STUDY · PRODUCT FIT PROTOTYPE</p>
        <h1><span>从“做一个漂亮的 3D 场景”</span><br /><em>到“知道该怎么做”</em></h1>
        <p class="intro-copy">这个实验室把技能包的视觉方法，翻译成我们自己的 <strong>Glass Worlds</strong> 产品语言：玻璃世界、星尘航线、内容聚焦和可验证的画面状态。</p>
      </section>

      <nav class="mode-switch" aria-label="Demo mode">
        <button class="mode-btn is-active" data-mode="capabilities">能力演示</button>
        <button class="mode-btn" data-mode="product">结合我们的产品</button>
      </nav>

      <aside class="control-rail" aria-label="Scene controls">
        <div class="control-label">LIVE CONTROLS</div>
        <button class="icon-btn" data-action="play" aria-label="Play demonstration" title="Play demonstration"><span class="play-icon"></span></button>
        <button class="icon-btn" data-action="focus" aria-label="Focus selected world" title="Focus selected world"><span class="focus-icon"></span></button>
        <button class="icon-btn" data-action="debug" aria-label="Toggle debug field" title="Toggle debug field"><span class="debug-icon"></span></button>
        <button class="icon-btn" data-action="motion" aria-label="Toggle reduced motion" title="Toggle reduced motion"><span class="motion-icon"></span></button>
      </aside>

      <section class="capability-panel" aria-live="polite">
        <div class="panel-overline"><span id="panel-mode">CAPABILITY TOUR</span><span id="panel-index">01 / 05</span></div>
        <div class="panel-rule"></div>
        <p id="panel-eyebrow" class="panel-eyebrow">Material depth</p>
        <h2 id="panel-title">让球体像“世界”，而不是贴图容器</h2>
        <p id="panel-body">外壳厚度、边缘高光、内部视差和局部反射共同建立材质可信度。</p>
        <div class="panel-metric"><span id="panel-metric">shell / rim / parallax</span><span class="metric-line"></span></div>
        <button id="panel-action" class="panel-action">这个效果怎么做？ <span>↗</span></button>
      </section>

      <div class="capability-dots" role="tablist" aria-label="Capabilities">
        ${CAPABILITIES.map((item, index) => `<button class="capability-dot ${index === 0 ? 'is-active' : ''}" data-capability="${item.id}" role="tab" aria-label="${item.label}" style="--dot-accent:${item.accent}"><span>${String(index + 1).padStart(2, '0')}</span></button>`).join('')}
      </div>

      <section class="product-map" aria-live="polite">
        <div class="product-map-header">
          <div>
            <p class="panel-overline">PRODUCT FIT / GLASS WORLDS</p>
            <h2>技能包能给我们什么？</h2>
          </div>
          <button class="close-map" aria-label="Close product fit panel">×</button>
        </div>
        <p class="product-map-lead">它不会替我们定义产品；它把现有产品的关键视觉系统，变成更清晰、更可调、更容易复用的专业实现。</p>
        <div class="map-rows">
          <div class="map-row"><span class="map-source">玻璃球 / 场景纹理</span><span class="map-arrow">→</span><span class="map-skill">procedural materials<br /><small>厚度、Fresnel、视差</small></span><span class="map-value">从“图片在球里”变成“可进入的世界”</span></div>
          <div class="map-row"><span class="map-source">星尘与球体运动</span><span class="map-arrow">→</span><span class="map-skill">camera direction<br /><small>轨迹、焦点、镜头交接</small></span><span class="map-value">氛围和内容可以有不同镜头意图</span></div>
          <div class="map-row"><span class="map-source">Atmosphere / Content</span><span class="map-arrow">→</span><span class="map-skill">image pipeline<br /><small>曝光、Bloom、色调映射</small></span><span class="map-value">高光不抢内容，内容也不牺牲氛围</span></div>
          <div class="map-row"><span class="map-source">固定验证与回放</span><span class="map-arrow">→</span><span class="map-skill">visual validation<br /><small>seed、debug、quality tier</small></span><span class="map-value">视觉迭代从主观争论变成可复现证据</span></div>
        </div>
        <div class="map-footer"><span class="signal-bars"><i></i><i></i><i></i><i></i></span> CURRENT PRODUCT SIGNAL: <strong>immersive research gallery</strong><span class="footer-spacer"></span> <button id="enter-product" class="text-button">进入产品演示 ↗</button></div>
      </section>

      <section class="product-hud" aria-live="polite">
        <div class="product-hud-top"><span class="panel-overline">GLASS WORLDS / LIVE PRODUCT FIT</span><span class="hud-count">05 worlds / 05 local scenes</span></div>
        <div class="product-title-wrap"><p class="panel-eyebrow">content-first spatial stage</p><h2><span>研究主题，装进一颗</span><br /><em>会被看见的玻璃世界</em></h2><p>点击任意世界，观察技能包如何把“浏览氛围”交接给“内容阅读”。</p></div>
        <div class="product-status"><span class="status-dot"></span><span id="product-status-text">AUTO FLIGHT / ATMOSPHERE</span></div>
        <div class="product-selected"><span class="selected-label">SELECTED WORLD</span><strong id="selected-world-title">Alpine village</strong><span id="selected-world-category">Spatial story</span><button id="enter-world" class="panel-action">Enter world <span>↗</span></button></div>
      </section>

      <div class="product-map-trigger"><button id="open-map" class="ghost-pill">这套库对产品的意义 <span>+</span></button></div>

      <footer class="footer-note"><span>SCENE SIGNAL / <strong id="scene-signal">GLASS + FRESNEL + HDR BLOOM</strong></span><span>POINTER TO LOOK · SPACE TO PLAY · D TO DEBUG</span></footer>

      <section id="guide-drawer" class="guide-drawer" hidden aria-label="Learning guide">
        <div class="guide-backdrop" data-guide-close></div>
        <div class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div class="guide-card-head">
            <div>
              <p class="guide-kicker">HOW TO READ THIS DEMO</p>
              <h2 id="guide-title">先理解系统，再看效果</h2>
            </div>
            <button id="close-guide" class="guide-close" aria-label="Close learning guide">×</button>
          </div>
          <div class="guide-tabs" role="tablist" aria-label="Learning guide sections">
            <button class="guide-tab is-active" data-guide-tab="library" role="tab" aria-selected="true"><span>01</span>库本身</button>
            <button class="guide-tab" data-guide-tab="mechanism" role="tab" aria-selected="false"><span>02</span>效果思路</button>
            <button class="guide-tab" data-guide-tab="product" role="tab" aria-selected="false"><span>03</span>对我的产品</button>
          </div>

          <article class="guide-panel is-active" data-guide-panel="library" role="tabpanel">
            <div class="guide-hero-copy">
              <p class="guide-eyebrow">THE LIBRARY ITSELF</p>
              <h3>它不是一个“效果按钮”，而是一张给 AI 的视觉技能地图。</h3>
              <p>你对 Codex 说“做一个高级海洋”时，这套库帮助 AI 判断应该调用哪一类专家方法，以及应该暴露哪些参数、debug 通道和验证证据。</p>
            </div>
            <div class="guide-stats"><span><b>24</b><small>installed skills</small></span><span><b>31</b><small>upstream examples</small></span><span><b>2</b><small>readme proofs</small></span></div>
            <div class="guide-stack">
              <div class="guide-stack-row"><span class="guide-stack-index">01</span><div><strong>路由</strong><p>把“我想要的画面”拆成相机、材质、场、VFX、后处理和验证。</p></div><code>threejs-skill-router</code></div>
              <div class="guide-stack-row"><span class="guide-stack-index">02</span><div><strong>实现</strong><p>每个技能包含具体的 Three.js 机制、参数边界和可复用示例。</p></div><code>procedural-materials</code></div>
              <div class="guide-stack-row"><span class="guide-stack-index">03</span><div><strong>验证</strong><p>固定 seed、无后处理基线、debug 视图和画质档位让“好看”可以回放。</p></div><code>visual-validation</code></div>
            </div>
            <div class="guide-callout"><span class="callout-dot"></span><strong>一句话：</strong>它让 AI 不只知道“要漂亮”，还知道“漂亮是由什么机制造成的”。</div>
            <div class="atlas-heading"><span class="guide-eyebrow">FULL SKILL ATLAS / 24</span><strong>把 24 个 skill 看成 5 类能力</strong><p>带“查看效果”的条目在上游仓库有可运行示例；“交叉系统”是贯穿多个场景的基础能力，不一定有独立图库卡片。</p></div>
            <div class="skill-atlas">${renderSkillAtlas()}</div>
            <section class="upstream-proof" aria-label="Upstream README proof">
              <div class="upstream-proof-head"><div><span class="guide-eyebrow">UPSTREAM PROOF / README</span><strong>README 里的图片，确实来自它自己的示例库</strong><p>左图是上游示例总览，右图是 Spectral Ocean 的具体效果。它们证明“有实现与示例”，但图片本身不是 npm 包运行时自动生成的。</p></div><a class="external-proof-link" href="https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills#development" target="_blank" rel="noreferrer">看原 README ↗</a></div>
              <div class="proof-grid"><figure><img src="/assets/upstream/example_gallery.jpeg" alt="Upstream example gallery contact sheet" loading="lazy" /><figcaption>Example Library · 31 个上游示例的视觉总览</figcaption></figure><figure><img src="/assets/upstream/spectral_ocean.jpeg" alt="Upstream spectral ocean example" loading="lazy" /><figcaption>Spectral Ocean · 海浪、泡沫和水下光学</figcaption></figure></div>
              <div class="gallery-proof-actions"><a class="gallery-launch" href="${UPSTREAM_GALLERY_URL}" target="_blank" rel="noreferrer"><span>LIVE</span> 打开上游 31 个可运行示例 <b>↗</b></a><small>本地上游图库：127.0.0.1:4173 · 由仓库的 dev/example-gallery 提供</small></div>
            </section>
          </article>

          <article class="guide-panel" data-guide-panel="mechanism" role="tabpanel" hidden>
            <div class="guide-hero-copy">
              <p class="guide-eyebrow">HOW THIS EFFECT WORKS</p>
              <h3>当前效果不是一个玻璃 Shader，而是 5 个互相约束的系统。</h3>
              <p>先定义视觉目标，再按目标选技能；最后才把 Bloom 放到图像管线里。这样后处理不会掩盖几何、材质或构图本身的问题。</p>
            </div>
            <div class="mechanism-flow">
              <div class="mechanism-step"><span>01</span><strong>视觉契约</strong><small>主体 · 距离 · 镜头 · motion · budget</small></div>
              <div class="mechanism-connector">→</div>
              <div class="mechanism-step"><span>02</span><strong>技能路由</strong><small>camera · materials · fields · image pipeline</small></div>
              <div class="mechanism-connector">→</div>
              <div class="mechanism-step"><span>03</span><strong>可读场景</strong><small>worlds · shell · particles · content</small></div>
              <div class="mechanism-connector">→</div>
              <div class="mechanism-step"><span>04</span><strong>验证闭环</strong><small>seed · debug · no-post · quality tier</small></div>
            </div>
            <div class="layer-breakdown">
              <div><span class="layer-swatch layer-atmosphere"></span><strong>Atmosphere</strong><small>背景场、星尘和光路</small></div>
              <div><span class="layer-swatch layer-image"></span><strong>Image world</strong><small>场景图像与球面内层</small></div>
              <div><span class="layer-swatch layer-glass"></span><strong>Glass shell</strong><small>厚度、透射、Fresnel rim</small></div>
              <div><span class="layer-swatch layer-motion"></span><strong>Direction</strong><small>指针视差与焦点节奏</small></div>
              <div><span class="layer-swatch layer-grade"></span><strong>Image pipeline</strong><small>HDR、Bloom、色调映射</small></div>
            </div>
            <div class="guide-code-line"><span>ROUTED FOR THIS SCENE</span><code>camera-direction + procedural-materials + procedural-fields + exposure-color-grading + visual-validation</code></div>
          </article>

          <article class="guide-panel" data-guide-panel="product" role="tabpanel" hidden>
            <div class="guide-hero-copy">
              <p class="guide-eyebrow">WHY IT MATTERS TO GLASS WORLDS</p>
              <h3>它的意义不是增加更多特效，而是让我们已有的产品能力变得可复用。</h3>
              <p>Glass Worlds 已经有玻璃球、场景图、粒子星场和内容模式。技能包提供的是一套更专业的共同语言：下一次优化时，知道改的是“镜头系统”还是“材质系统”，不会只说“再高级一点”。</p>
            </div>
            <div class="meaning-grid">
              <div class="meaning-row"><span>现在的产品</span><strong>玻璃球承载研究内容</strong><em>让用户发现主题</em></div>
              <div class="meaning-row"><span>技能包加成</span><strong>材质、镜头、图像管线成为模块</strong><em>让效果可以调参与复用</em></div>
              <div class="meaning-row"><span>用户体感</span><strong>从“看到一张图”到“进入一个世界”</strong><em>内容和氛围各自有清晰优先级</em></div>
              <div class="meaning-row"><span>团队收益</span><strong>视觉争论变成可回放证据</strong><em>固定视角、seed、debug、画质档位</em></div>
            </div>
            <div class="product-next-step"><span class="next-step-label">建议优先落地</span><strong>camera direction · procedural materials · image pipeline · visual validation</strong><p>海洋、云雾、行星等技能只有在具体产品故事需要时再接入，不需要一次性把 24 个技能全部做进产品。</p></div>
            <div class="guide-actions"><button id="guide-enter-product" class="guide-primary">进入产品演示 <span>↗</span></button><button id="guide-open-map" class="guide-secondary">查看详细映射 <span>+</span></button></div>
          </article>
        </div>
      </section>
    </main>
  </div>
`;

const canvas = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#070910');

const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
camera.position.set(0, 0.35, 8.2);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.68, 0.72, 0.58);
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

const timer = new THREE.Timer();
const pointer = new THREE.Vector2();
const targetPointer = new THREE.Vector2();
const textureLoader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
let activeMode = 'capabilities';
let activeCapability = 'glass';
let activeWorldIndex = 1;
let paused = false;
let reducedMotion = false;
let debugMode = false;
let focusTarget = null;
let demoTimer = 0;
let worldMeshes = [];
let activeGuide = 'library';
let guideReturnFocus = null;

const ambient = new THREE.HemisphereLight('#b7d4ff', '#160d2f', 1.4);
scene.add(ambient);
const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
keyLight.position.set(-3.5, 4.5, 6);
scene.add(keyLight);
const rimLight = new THREE.PointLight('#77f3d7', 8, 18, 2);
rimLight.position.set(3, -1, 2);
scene.add(rimLight);

const worldGroup = new THREE.Group();
scene.add(worldGroup);
const fieldGroup = new THREE.Group();
scene.add(fieldGroup);
const guideGroup = new THREE.Group();
scene.add(guideGroup);

function makeGradientTexture() {
  const c = document.createElement('canvas');
  c.width = 2;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#14193b');
  g.addColorStop(0.55, '#101424');
  g.addColorStop(1, '#06131b');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 2, 256);
  return new THREE.CanvasTexture(c);
}

const gradientTexture = makeGradientTexture();
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(40, 32, 16),
  new THREE.MeshBasicMaterial({ map: gradientTexture, side: THREE.BackSide, depthWrite: false })
);
scene.add(atmosphere);

function createStarField() {
  const count = 1450;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const random = mulberry32(1907);
  for (let i = 0; i < count; i += 1) {
    const radius = 4.5 + random() * 13;
    const theta = random() * Math.PI * 2;
    const y = (random() - 0.5) * 9;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = -1.5 - random() * 10;
    const tint = random() > 0.86 ? [0.4, 0.82, 1] : [0.66, 0.75, 0.92];
    colors.set(tint, i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: 0.028, vertexColors: true, transparent: true, opacity: 0.76, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const points = new THREE.Points(geometry, material);
  fieldGroup.add(points);
  return points;
}

const stars = createStarField();

function createArc(angle, radius, color, opacity = 0.38) {
  const points = [];
  for (let i = 0; i < 40; i += 1) {
    const t = i / 39;
    const r = radius * (0.72 + t * 0.32);
    points.push(new THREE.Vector3(Math.cos(angle + t * 0.22) * r, Math.sin(angle + t * 0.22) * r * 0.42, -0.8 - t * 1.4));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
  const line = new THREE.Line(geometry, material);
  guideGroup.add(line);
  return line;
}

const arcs = [
  createArc(-2.6, 4.1, '#5adbd0'),
  createArc(-0.55, 3.55, '#8b9bff', 0.28),
  createArc(0.65, 4.4, '#f4b2ff', 0.24),
];

function makeImageMaterial(asset, opacity = 1) {
  const texture = textureLoader.load(asset.src);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity, side: THREE.FrontSide, depthWrite: false });
}

function makeHaloTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 7, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,.4)');
  gradient.addColorStop(.2, 'rgba(255,255,255,.18)');
  gradient.addColorStop(.65, 'rgba(255,255,255,.045)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const haloTexture = makeHaloTexture();

function createWorld(asset, index, radius = 1.1) {
  const group = new THREE.Group();
  const geometry = new THREE.SphereGeometry(radius, 48, 32);
  const inner = new THREE.Mesh(geometry, makeImageMaterial(asset));
  inner.scale.set(0.995, 0.995, 0.66);
  inner.rotation.y = Math.PI * 0.48;
  group.add(inner);

  const shell = new THREE.Mesh(
    geometry,
    new THREE.MeshPhysicalMaterial({ color: asset.tint, metalness: 0.04, roughness: 0.06, transmission: 0.76, thickness: 0.26, ior: 1.46, transparent: true, opacity: 0.46, envMapIntensity: 1.15, depthWrite: false })
  );
  shell.scale.set(1.025, 1.025, 1.025);
  group.add(shell);

  const rim = new THREE.Mesh(
    geometry,
    new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(asset.tint) }, uPower: { value: 2.65 }, uOpacity: { value: 0.8 } },
      vertexShader: `varying vec3 vNormal; varying vec3 vView; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 uColor; uniform float uPower; uniform float uOpacity; varying vec3 vNormal; varying vec3 vView; void main(){ float fresnel = pow(1.0 - max(dot(vNormal,vView),0.0),uPower); gl_FragColor = vec4(uColor * (0.65 + fresnel * 1.7), fresnel * uOpacity); }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    })
  );
  rim.scale.set(1.046, 1.046, 1.046);
  group.add(rim);

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture, color: asset.tint, transparent: true, opacity: 0.34, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.set(radius * 2.75, radius * 2.75, 1);
  group.add(halo);

  group.userData = { ...asset, index, baseRadius: radius, phase: index * 1.7, lane: index % 2 === 0 ? -1 : 1 };
  worldGroup.add(group);
  return group;
}

function rebuildWorlds() {
  worldMeshes.forEach((world) => {
    world.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    worldGroup.remove(world);
  });
  worldMeshes = WORLD_ASSETS.map((asset, index) => createWorld(asset, index, index === 0 ? 1.34 : 0.86 + (index % 2) * 0.1));
  worldMeshes.forEach((world, index) => {
    const lane = [-1.5, 1.2, -0.68, 1.75, 0.15][index];
    world.position.set(lane * 1.65, (index - 2) * 0.4, -index * 0.32);
    world.rotation.set((index - 2) * 0.1, index * 0.36, 0);
  });
}

rebuildWorlds();

function createCapabilityStages() {
  const waterGeometry = new THREE.PlaneGeometry(8.6, 3.5, 80, 32);
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uAccent: { value: new THREE.Color('#65ddd5') }, uStrength: { value: 0.18 }, uDebug: { value: 0 } },
    vertexShader: `uniform float uTime; uniform float uStrength; varying vec2 vUv; varying float vWave; void main(){ vUv=uv; vec3 p=position; float wave=sin(p.x*2.8+uTime*1.4)*0.12+cos(p.x*5.4-uTime*1.2)*0.045; p.z += wave*uStrength*5.0; vWave=wave; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
    fragmentShader: `uniform vec3 uAccent; uniform float uDebug; varying vec2 vUv; varying float vWave; void main(){ float bands=0.5+0.5*sin(vUv.x*75.0+vWave*12.0); vec3 c=mix(vec3(0.02,0.11,0.18),uAccent,0.22+bands*0.22); if(uDebug>0.5)c=mix(c,vec3(1.0,0.25,0.14),smoothstep(0.45,0.8,abs(vWave)*7.0)); gl_FragColor=vec4(c,0.72); }`,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI * 0.42;
  water.position.set(0, -2.12, -1.2);
  water.visible = false;
  guideGroup.add(water);

  const fieldGeometry = new THREE.IcosahedronGeometry(2.1, 5);
  const fieldMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#c39bff') }, uDebug: { value: 0 } },
    vertexShader: `uniform float uTime; varying vec3 vNormal; varying vec3 vPos; void main(){ vNormal=normal; vPos=position; vec3 p=position+normal*sin(position.y*4.0+uTime*0.9)*0.05; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
    fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform float uDebug; varying vec3 vNormal; varying vec3 vPos; void main(){ float bands=0.5+0.5*sin(vPos.x*6.0+vPos.y*8.0+uTime); float rim=pow(1.0-abs(vNormal.z),2.0); vec3 c=uColor*(0.18+bands*0.18)+vec3(0.05,0.2,0.3)*rim; if(uDebug>0.5)c=mix(c,vec3(1.0,0.4,0.08),step(0.74,bands)); gl_FragColor=vec4(c,0.72); }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
  field.position.set(0, 0.2, -2.1);
  field.visible = false;
  guideGroup.add(field);
  return { water, field };
}

const capabilityStages = createCapabilityStages();

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function resize() {
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  composer.setSize(width, height);
}

function setPanel(capability) {
  const index = CAPABILITIES.findIndex((item) => item.id === capability);
  const item = CAPABILITIES[index];
  activeCapability = item.id;
  document.querySelectorAll('.capability-dot').forEach((dot) => dot.classList.toggle('is-active', dot.dataset.capability === capability));
  document.querySelector('#panel-index').textContent = `${String(index + 1).padStart(2, '0')} / ${String(CAPABILITIES.length).padStart(2, '0')}`;
  document.querySelector('#panel-eyebrow').textContent = item.eyebrow;
  document.querySelector('#panel-title').textContent = item.title;
  document.querySelector('#panel-body').textContent = item.body;
  document.querySelector('#panel-metric').textContent = item.metric;
  document.querySelector('#scene-signal').textContent = item.skill.replace('threejs-', '').replaceAll('-', ' ').toUpperCase();
  document.documentElement.style.setProperty('--accent', item.accent);
  capabilityStages.water.visible = capability === 'fields';
  capabilityStages.field.visible = capability === 'camera';
  fieldGroup.visible = capability !== 'validation';
  guideGroup.visible = capability !== 'glass';
  bloomPass.strength = capability === 'bloom' ? 1.08 : capability === 'validation' ? 0.42 : 0.7;
  rimLight.color.set(item.accent);
  worldMeshes.forEach((world, worldIndex) => {
    const selected = worldIndex === activeWorldIndex;
    world.scale.setScalar(selected ? 1.06 : 0.92);
    world.userData.selected = selected;
  });
}

function setMode(mode) {
  activeMode = mode;
  document.querySelectorAll('.mode-btn').forEach((button) => button.classList.toggle('is-active', button.dataset.mode === mode));
  document.body.classList.toggle('product-mode', mode === 'product');
  document.querySelector('.capability-panel').hidden = mode === 'product';
  document.querySelector('.capability-dots').hidden = mode === 'product';
  document.querySelector('.product-hud').hidden = mode !== 'product';
  document.querySelector('.product-map-trigger').hidden = mode !== 'product';
  document.querySelector('#panel-mode').textContent = mode === 'product' ? 'PRODUCT FIT' : 'CAPABILITY TOUR';
  document.querySelector('.footer-note span:last-child').textContent = mode === 'product' ? 'CLICK A WORLD · SPACE TO PLAY · D TO DEBUG' : 'POINTER TO LOOK · SPACE TO PLAY · D TO DEBUG';
  setPanel(activeCapability);
  if (mode === 'product') {
    capabilityStages.water.visible = false;
    capabilityStages.field.visible = false;
  }
}

function setGuideTab(section) {
  activeGuide = section;
  document.querySelectorAll('.guide-tab').forEach((tab) => {
    const active = tab.dataset.guideTab === section;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.guide-panel').forEach((panel) => {
    panel.hidden = panel.dataset.guidePanel !== section;
    panel.classList.toggle('is-active', panel.dataset.guidePanel === section);
  });
}

function openGuide(section = 'library') {
  const guide = document.querySelector('#guide-drawer');
  guideReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : document.querySelector('#open-guide');
  document.body.classList.remove('map-open');
  document.body.classList.add('guide-open');
  guide.hidden = false;
  setGuideTab(section);
}

function closeGuide() {
  const guide = document.querySelector('#guide-drawer');
  guide.hidden = true;
  document.body.classList.remove('guide-open');
  if (guideReturnFocus && typeof guideReturnFocus.focus === 'function') guideReturnFocus.focus();
}

function selectWorld(index) {
  activeWorldIndex = (index + WORLD_ASSETS.length) % WORLD_ASSETS.length;
  const asset = WORLD_ASSETS[activeWorldIndex];
  document.querySelector('#selected-world-title').textContent = asset.title;
  document.querySelector('#selected-world-category').textContent = asset.category;
  document.querySelector('#product-status-text').textContent = reducedMotion ? 'CONTENT / REDUCED MOTION' : `FOCUS / ${asset.id.toUpperCase()}`;
  worldMeshes.forEach((world, worldIndex) => {
    const selected = worldIndex === activeWorldIndex;
    world.userData.selected = selected;
    world.scale.setScalar(selected ? 1.12 : activeMode === 'product' ? 0.68 : 0.92);
  });
  focusTarget = worldMeshes[activeWorldIndex];
}

function toggleDebug() {
  debugMode = !debugMode;
  document.body.classList.toggle('debug-mode', debugMode);
  capabilityStages.water.material.uniforms.uDebug.value = debugMode ? 1 : 0;
  capabilityStages.field.material.uniforms.uDebug.value = debugMode ? 1 : 0;
  document.querySelector('[data-action="debug"]').classList.toggle('is-on', debugMode);
}

function playDemo() {
  paused = !paused;
  document.querySelector('[data-action="play"]').classList.toggle('is-on', !paused);
  document.querySelector('[data-action="play"]').setAttribute('aria-label', paused ? 'Resume demonstration' : 'Pause demonstration');
}

function updateWorlds(elapsed) {
  worldMeshes.forEach((world, index) => {
    const data = world.userData;
    const drift = reducedMotion ? 0.04 : 0.12;
    const targetScale = activeMode === 'product' && data.selected ? 1.12 : activeMode === 'product' ? 0.68 : index === activeWorldIndex ? 1.06 : 0.92;
    const scale = THREE.MathUtils.lerp(world.scale.x, targetScale, 0.06);
    world.scale.setScalar(scale);
    world.position.y += Math.sin(elapsed * drift + data.phase) * (reducedMotion ? 0.0006 : 0.0022);
    world.rotation.y += reducedMotion ? 0.0004 : 0.0012 + index * 0.00012;
    const pulse = activeMode === 'product' && data.selected ? 1 + Math.sin(elapsed * 2.2) * 0.015 : 1;
    world.children[2].material.uniforms.uOpacity.value = (activeMode === 'product' && data.selected ? 1.08 : 0.62) * pulse;
  });
}

function animate() {
  requestAnimationFrame(animate);
  timer.update();
  const delta = timer.getDelta();
  if (!paused) demoTimer += delta;
  const elapsed = timer.getElapsed();
  const speed = reducedMotion ? 0.18 : paused ? 0 : 0.42;
  pointer.lerp(targetPointer, reducedMotion ? 0.08 : 0.035);
  camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.68, 0.035);
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.35 + pointer.y * 0.32, 0.035);
  camera.lookAt(0, 0.05, -1.15);
  stars.rotation.y += delta * speed * 0.06;
  stars.rotation.x = Math.sin(elapsed * 0.08) * 0.025;
  arcs.forEach((arc, index) => {
    arc.rotation.z += delta * speed * (index % 2 ? -0.012 : 0.008);
    arc.material.opacity = (activeMode === 'product' ? 0.18 : 0.25) + Math.sin(elapsed * 0.5 + index) * 0.03;
  });
  capabilityStages.water.material.uniforms.uTime.value = elapsed * (reducedMotion ? 0.08 : 0.35);
  capabilityStages.field.material.uniforms.uTime.value = elapsed * (reducedMotion ? 0.1 : 0.42);
  updateWorlds(elapsed);
  if (focusTarget && activeMode === 'product' && !reducedMotion && !paused) {
    const desiredX = focusTarget.position.x * -0.06;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX + pointer.x * 0.42, 0.02);
  }
  if (!paused && activeMode === 'capabilities' && demoTimer > (reducedMotion ? 8 : 5.5)) {
    const currentIndex = CAPABILITIES.findIndex((item) => item.id === activeCapability);
    setPanel(CAPABILITIES[(currentIndex + 1) % CAPABILITIES.length].id);
    demoTimer = 0;
  }
  composer.render();
}

function bindEvents() {
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (event) => {
    targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    targetPointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { event.preventDefault(); playDemo(); }
    if (event.key.toLowerCase() === 'd') toggleDebug();
    if (event.key === 'Escape') { closeGuide(); document.body.classList.remove('map-open'); }
    if (event.key === '1') setPanel(CAPABILITIES[0].id);
    if (event.key === '2') setPanel(CAPABILITIES[1].id);
    if (event.key === '3') setPanel(CAPABILITIES[2].id);
    if (event.key === '4') setPanel(CAPABILITIES[3].id);
    if (event.key === '5') setPanel(CAPABILITIES[4].id);
  });
  document.querySelectorAll('.mode-btn').forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
  document.querySelectorAll('.capability-dot').forEach((button) => button.addEventListener('click', () => { setPanel(button.dataset.capability); demoTimer = 0; }));
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'play') playDemo();
    if (action === 'focus') { setMode('product'); selectWorld(activeWorldIndex); }
    if (action === 'debug') toggleDebug();
    if (action === 'motion') { reducedMotion = !reducedMotion; button.classList.toggle('is-on', reducedMotion); document.body.classList.toggle('reduced-motion', reducedMotion); }
  }));
  document.querySelector('#open-guide').addEventListener('click', () => openGuide('library'));
  document.querySelector('#panel-action').addEventListener('click', () => openGuide('mechanism'));
  document.querySelector('#open-map').addEventListener('click', () => openGuide('product'));
  document.querySelectorAll('.guide-tab').forEach((tab) => tab.addEventListener('click', () => setGuideTab(tab.dataset.guideTab)));
  document.querySelectorAll('[data-guide-close]').forEach((target) => target.addEventListener('click', closeGuide));
  document.querySelector('#close-guide').addEventListener('click', closeGuide);
  document.querySelector('#guide-enter-product').addEventListener('click', () => { closeGuide(); setMode('product'); });
  document.querySelector('#guide-open-map').addEventListener('click', () => { closeGuide(); setMode('product'); document.body.classList.add('map-open'); });
  document.querySelector('.close-map').addEventListener('click', () => document.body.classList.remove('map-open'));
  document.querySelector('#enter-product').addEventListener('click', () => document.body.classList.remove('map-open'));
  document.querySelector('#enter-world').addEventListener('click', () => document.querySelector('.product-selected').classList.toggle('is-entered'));
  canvas.addEventListener('pointerdown', (event) => {
    if (activeMode !== 'product') return;
    const bounds = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -(((event.clientY - bounds.top) / bounds.height) * 2 - 1));
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(worldMeshes, true);
    if (hits.length) {
      let world = hits[0].object;
      while (world && world.userData?.index === undefined && world.parent) world = world.parent;
      const index = world?.userData?.index ?? 0;
      selectWorld(index);
    }
  });
}

resize();
setMode('capabilities');
setPanel('glass');
selectWorld(activeWorldIndex);
bindEvents();
animate();
