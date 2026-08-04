import './project-styles.css';
import manifest from '../PROJECT_MANIFEST.json';
import { SCENE_DEMOS, SKILL_CATEGORIES, THREEJS_SKILLS } from './skills-catalog.js';

const app = document.querySelector('#app');

const categoryMap = Object.fromEntries(SKILL_CATEGORIES.map((category) => [category.id, category]));
const isLocalRuntime = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
const truthLabel = {
  direct: { index: 'A', label: '直接实现', copy: '上游或本地 Skill 代码直接进入运行路径' },
  composed: { index: 'B', label: '机制组合', copy: '我们写代码，Skill 提供实现方法与约束' },
  product: { index: 'C', label: '产品原型', copy: '图形能力进入任务、交互与业务场景' },
};

function skillGroups() {
  return SKILL_CATEGORIES.map((category) => ({
    ...category,
    skills: THREEJS_SKILLS.filter((skill) => skill.category === category.id),
  }));
}

function skillName(id) {
  return THREEJS_SKILLS.find((skill) => skill.id === id)?.short ?? id.replace('threejs-', '');
}

function renderSkillGroups() {
  return skillGroups().map((group) => `
    <article class="capability-group">
      <div class="capability-head">
        <span>${group.number}</span>
        <div><h3>${group.label}</h3><p>${group.summary}</p></div>
        <strong>${String(group.skills.length).padStart(2, '0')}</strong>
      </div>
      <div class="skill-chip-list">
        ${group.skills.map((skill) => `<a href="./skills.html?skill=${skill.id}" title="${skill.summary}"><b>$${skill.short}</b><span>${skill.title}</span></a>`).join('')}
      </div>
    </article>
  `).join('');
}

function renderDemos() {
  return SCENE_DEMOS.map((demo) => {
    const truth = truthLabel[demo.group];
    return `
      <article class="evidence-card evidence-${demo.group}">
        <div class="evidence-card-head"><span>LEVEL ${truth.index}</span><b>${truth.label}</b><strong>${demo.number}</strong></div>
        <h3>${demo.title}</h3>
        <p>${demo.summary}</p>
        <div class="evidence-truth"><span>实际关系</span><strong>${demo.truth}</strong></div>
        <div class="evidence-skills">${demo.skills.map((item) => `<span title="${item.role}">$${skillName(item.id)}</span>`).join('')}</div>
        <a href="${demo.href}">打开实时演示 <b>→</b></a>
      </article>
    `;
  }).join('');
}

function relatedProjectHref(project) {
  if (isLocalRuntime) return project.localUrl;
  return new URL(`../${project.slug}/`, window.location.href).href;
}

function renderLineage() {
  const earlyProjects = manifest.local.lineage.map((project) => `
    <article class="lineage-card lineage-${project.id}">
      <div class="lineage-meta"><span>${project.phase}</span><b>${project.status}</b></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="lineage-relation"><span>真实关系</span><strong>${project.relationship}</strong></div>
      <div class="lineage-skills">${project.skills.map((skill) => `<code>$${skill.toUpperCase()}</code>`).join('')}</div>
      <a href="${relatedProjectHref(project)}" target="_blank" rel="noreferrer">打开这个阶段 <b>↗</b></a>
    </article>
  `).join('');

  return `${earlyProjects}
    <article class="lineage-card lineage-current">
      <div class="lineage-meta"><span>03 / 完整整理</span><b>当前正式子项目</b></div>
      <h3>Three.js Skill Research Lab</h3>
      <p>把原仓库、24 个 Skill、31 个上游示例、12 个当前演示、来源边界和产品意义统一整理成可复验的研究项目。</p>
      <div class="lineage-relation"><span>真实关系</span><strong>吸收前两次实验的结论，但继续明确区分直接实现、机制组合和产品原型。</strong></div>
      <div class="lineage-skills"><code>5 CURRENT PAGES</code><code>12 CURRENT DEMOS</code><code>24 SKILLS</code></div>
      <a href="#demos">查看当前演示矩阵 <b>↓</b></a>
    </article>`;
}

app.innerHTML = `
  <div class="project-shell">
    <header class="project-topbar">
      <a class="project-brand" href="./project.html" aria-label="返回研究子项目总览">
        <span>06</span><div><strong>THREE.JS SKILL LAB</strong><small>RESEARCH SUBPROJECT</small></div>
      </a>
      <nav aria-label="子项目页面导航">
        <a href="#upstream">原仓库</a>
        <a href="#capabilities">库的能力</a>
        <a href="#journey">研究历程</a>
        <a href="#demos">演示证据</a>
        <a href="#impact">对我们的影响</a>
        <a href="./skills.html">24 Skill 地图 →</a>
      </nav>
    </header>

    <main>
      <section class="project-hero" aria-labelledby="project-title">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">FORMAL RESEARCH PROJECT / 正式研究子项目</p>
            <h1 id="project-title">Three.js Graphics<br />Agent Skills<br /><em>研究实验室</em></h1>
            <p class="hero-summary">${manifest.researchQuestion}</p>
            <div class="hero-actions">
              <a class="primary-link" href="./skills.html">查看 24 Skill 完整能力 <b>→</b></a>
              <a href="./skill-lab.html">观察 Skill 如何控制代码</a>
            </div>
          </div>
          <aside class="hero-conclusion">
            <span>CORE CONCLUSION / 核心结论</span>
            <h2>Skill 负责约束和教会模型，Three.js 负责真正把代码变成 3D。</h2>
            <p>${manifest.conclusion}</p>
            <div class="responsibility-flow" aria-label="效果生成责任链">
              <div><small>01</small><strong>用户目标</strong><span>描述产品和场景</span></div><i>→</i>
              <div><small>02</small><strong>大模型</strong><span>理解、选择、生成</span></div><i>→</i>
              <div><small>03</small><strong>Skill</strong><span>方法、代码、约束</span></div><i>→</i>
              <div><small>04</small><strong>Three.js</strong><span>场景与 GPU 渲染</span></div>
            </div>
          </aside>
        </div>
        <div class="hero-metrics" aria-label="子项目关键数据">
          <div><strong>${manifest.upstream.skillCount}</strong><span>EXPERT SKILLS</span><small>全部纳入能力地图</small></div>
          <div><strong>${manifest.upstream.exampleCount}</strong><span>UPSTREAM EXAMPLES</span><small>${manifest.upstream.skillsWithExamples} 个 Skill 带实现示例</small></div>
          <div><strong>${manifest.local.demos.total}</strong><span>LOCAL DEMOS</span><small>2 直接 / 4 组合 / 6 产品</small></div>
          <div><strong>${String(manifest.local.totalOwnedWebEntries).padStart(2, '0')}</strong><span>WEB ENTRIES</span><small>5 当前页面 + 2 早期实验</small></div>
        </div>
      </section>

      <nav class="project-index" aria-label="研究内容索引">
        <a href="#upstream"><span>01</span><strong>原始库</strong><small>来源、版本、示例、许可</small></a>
        <a href="#capabilities"><span>02</span><strong>库的能力</strong><small>5 类、24 个专家系统</small></a>
        <a href="#journey"><span>03</span><strong>研究历程</strong><small>2 个早期页面如何进入当前项目</small></a>
        <a href="#demos"><span>04</span><strong>这里的演示</strong><small>12 个当前场景及真实关系</small></a>
        <a href="#impact"><span>05</span><strong>对我们的影响</strong><small>价值、边界、采用方式</small></a>
      </nav>

      <section id="upstream" class="project-section upstream-section" aria-labelledby="upstream-title">
        <div class="section-heading">
          <div><p class="eyebrow">SOURCE EVIDENCE / 01</p><h2 id="upstream-title">原仓库到底提供了什么</h2></div>
          <p>它不是一个在业务代码里调用的 3D 运行库，而是一套面向 AI 编程 Agent 的高级图形知识、参考实现和验证规范。</p>
        </div>
        <div class="source-layout">
          <article class="source-facts">
            <div class="source-facts-head"><span>PINNED UPSTREAM</span><strong>已固定来源</strong></div>
            <dl>
              <div><dt>仓库</dt><dd>${manifest.upstream.name}</dd></div>
              <div><dt>本地镜像</dt><dd>${manifest.upstream.localMirror}</dd></div>
              <div><dt>npm 版本</dt><dd>v${manifest.upstream.packageVersion}</dd></div>
              <div><dt>固定提交</dt><dd><code>${manifest.upstream.commit.slice(0, 12)}</code></dd></div>
              <div><dt>许可表达式</dt><dd>${manifest.upstream.licenseExpression}</dd></div>
              <div><dt>项目内安装</dt><dd>${manifest.local.skillDirectory} · ${manifest.local.installedSkillCount}/24</dd></div>
            </dl>
            <div class="source-actions">
              <a href="${manifest.upstream.repository}" target="_blank" rel="noreferrer">打开 GitHub 原仓库 ↗</a>
              <a href="http://127.0.0.1:4173/" target="_blank" rel="noreferrer">打开原始示例库 ↗</a>
            </div>
          </article>
          <div class="source-explanation">
            <article><span>它包含</span><h3>专家说明 + 参考实现 + 资产 + 验收</h3><p>每个 Skill 用 <code>SKILL.md</code> 说明何时触发、实现顺序、必须保留的机制、常见失败和验收方法；部分 Skill 还附带 examples、references 与 assets。</p></article>
            <article><span>它不包含</span><h3>一键生成器、游戏引擎或业务系统</h3><p>仓库不会自己理解你的产品，也不会自动提供 GIS、任务系统、存档或真实数据。大模型仍需根据目标选择 Skill 并生成产品代码。</p></article>
            <article class="gallery-fact"><span>原始示例库</span><h3>${manifest.upstream.skillsWithExamples} 个 Skill · ${manifest.upstream.exampleCount} 组效果</h3><p>原仓库的 gallery 是开发查看器：Skill 目录拥有可复用效果实现，gallery shim 负责相机、舞台、运行时和辅助资产。README 中的图片正是这个示例库的总览。</p></article>
          </div>
        </div>
      </section>

      <section id="capabilities" class="project-section capability-section" aria-labelledby="capability-title">
        <div class="section-heading">
          <div><p class="eyebrow">CAPABILITY SYSTEM / 02</p><h2 id="capability-title">5 类能力，覆盖从规划到最终画面</h2></div>
          <p>24 个 Skill 不是 24 个孤立效果。它们形成路由、镜头运动、场景生成、环境特效和图像输出五个阶段。</p>
        </div>
        <div class="capability-groups">${renderSkillGroups()}</div>
        <a class="wide-link" href="./skills.html"><span>完整能力档案</span><strong>查看每个 Skill 的使用时机、输入、输出、关键约束、原始示例和常见组合</strong><b>进入 24 Skill 地图 →</b></a>
      </section>

      <section id="journey" class="project-section lineage-section" aria-labelledby="lineage-title">
        <div class="section-heading">
          <div><p class="eyebrow">RESEARCH LINEAGE / 03</p><h2 id="lineage-title">早期页面没有消失，它们是这次完整整理的前两步</h2></div>
          <p>我们自己制作的相关网页共有 ${manifest.local.totalOwnedWebEntries} 个：当前子项目 5 个页面，加上 Capability Lab 与 Ocean Atlas 两个早期独立页面。上游 4173 示例库另计，不混入自有页面数量。</p>
        </div>
        <div class="lineage-summary" aria-label="网页入口统计">
          <div><strong>${manifest.local.pageCount}</strong><span>当前整理页面</span><small>总览、能力、控制、效果、应用</small></div>
          <i>+</i>
          <div><strong>${manifest.local.relatedProjectCount}</strong><span>早期独立页面</span><small>能力翻译、海洋产品验证</small></div>
          <i>=</i>
          <div><strong>${manifest.local.totalOwnedWebEntries}</strong><span>自有网页入口</span><small>统一进入研究展厅发布</small></div>
        </div>
        <div class="lineage-grid">${renderLineage()}</div>
      </section>

      <section id="demos" class="project-section demo-section" aria-labelledby="demo-title">
        <div class="section-heading">
          <div><p class="eyebrow">RUNTIME EVIDENCE / 04</p><h2 id="demo-title">12 个当前演示，但证据等级不同</h2></div>
          <p>漂亮不等于来自 Skill。我们把直接代码、机制组合和产品原型分开标记，避免把大模型生成的产品代码都算成原仓库能力。</p>
        </div>
        <div class="truth-levels">
          ${Object.values(truthLabel).map((item) => `<article><span>LEVEL ${item.index}</span><strong>${item.label}</strong><p>${item.copy}</p></article>`).join('')}
        </div>
        <div class="evidence-grid">${renderDemos()}</div>
      </section>

      <section id="impact" class="project-section impact-section" aria-labelledby="impact-title">
        <div class="section-heading">
          <div><p class="eyebrow">PRODUCT IMPACT / 05</p><h2 id="impact-title">它对我们的意义：提高图形生成质量，而不是替代产品建设</h2></div>
          <p>真正价值不是多了几个漂亮 Demo，而是建立一套可复用的“模型如何生成、我们如何验收、产品如何组合”的图形工程方法。</p>
        </div>
        <div class="impact-grid">
          <article class="impact-positive"><span>它能改善</span><h3>大模型生成 3D 的专业程度</h3><ul><li>把模糊的“做漂亮”变成具体机制和参数。</li><li>减少廉价贴图、过度 Bloom、随机噪声等视觉捷径。</li><li>让海洋、云、雨雪、行星、植被、材质和后期拥有可复验的实现路径。</li><li>通过确定性输入、调试视图和质量档降低迭代成本。</li></ul></article>
          <article class="impact-boundary"><span>它不能替代</span><h3>业务、资产和生产系统</h3><ul><li>不会提供真实 GIS、BIM、天气、农业或园区运营数据。</li><li>不会自动补齐游戏碰撞、AI、任务、存档和内容生产。</li><li>不会把概念原型自动变成性能稳定、可访问、可部署的产品。</li><li>第三方来源与 GPL 资产仍需在商用前逐项审查。</li></ul></article>
          <article class="impact-method"><span>我们的采用方式</span><h3>作为项目级 Agent 能力层</h3><ol><li>先用 Router 拆解视觉目标。</li><li>只选择必要的专家 Skill。</li><li>让模型按 Skill 生成或移植代码。</li><li>在产品层接入交互、数据和业务逻辑。</li><li>用 Visual Validation 和浏览器证据验收。</li></ol></article>
        </div>
        <div class="product-directions">
          <div><span>展示型产品</span><strong>品牌空间、产品发布、互动叙事</strong><p>优先镜头、材质、VFX、Bloom、调色。</p></div>
          <div><span>空间型产品</span><strong>园区、乡村、数字沙盘、导览</strong><p>优先建筑、植被、天气、阴影、镜头。</p></div>
          <div><span>游戏型产品</span><strong>关卡、环境、战斗反馈、世界氛围</strong><p>Skill 负责画面，游戏系统由独立能力补齐。</p></div>
          <div><span>工具型产品</span><strong>3D 配置器、可视化编辑与预演</strong><p>Skill 提供渲染质量，数据模型和编辑逻辑另建。</p></div>
        </div>
      </section>

      <section class="project-section maintenance-section" aria-labelledby="maintenance-title">
        <div class="section-heading">
          <div><p class="eyebrow">PROJECT MAP / 06</p><h2 id="maintenance-title">子项目结构与研究文档</h2></div>
          <p>原仓库镜像保持只读；两个早期实验作为可独立构建的相邻项目保留；项目级 24 Skill 的唯一正式快照仍在当前子项目中。</p>
        </div>
        <div class="maintenance-layout">
          <pre aria-label="子项目目录结构"><code>0801_codex_project/
├─ threejs-awesome-graphics-agent-skills-upstream/  # 原仓库镜像
├─ threejs-awesome-graphics-agent-skills-demo/      # 06A 能力翻译实验
├─ ocean-atlas-product-demo/                        # 06B 海洋产品验证
└─ starfield-process-demo/                          # 我们的研究子项目
   ├─ .codex/skills/                                # 项目级 24 Skill
   ├─ src/                                          # Three.js 演示与说明页面
   ├─ docs/                                         # 研究证据与影响分析
   ├─ PROJECT_MANIFEST.json                         # 固定事实
   └─ scripts/audit-subproject.mjs                  # 24/31/12 审计</code></pre>
          <div class="document-list">
            <a href="./docs/01-UPSTREAM_LIBRARY.md"><span>01</span><strong>原仓库审计</strong><small>来源、结构、示例库、许可</small></a>
            <a href="./docs/02-SKILL_CAPABILITY_MAP.md"><span>02</span><strong>24 Skill 能力档案</strong><small>分类、职责与使用时机</small></a>
            <a href="./docs/03-DEMO_TRACEABILITY.md"><span>03</span><strong>演示追踪矩阵</strong><small>12 场景与 Skill 关系</small></a>
            <a href="./docs/04-PRODUCT_IMPACT.md"><span>04</span><strong>产品影响分析</strong><small>价值、边界与采用方式</small></a>
            <a href="./docs/05-MAINTENANCE.md"><span>05</span><strong>维护与复验</strong><small>安装、更新、审计与构建</small></a>
          </div>
        </div>
      </section>
    </main>

    <footer class="project-footer">
      <span>PROJECT 06 · THREE.JS GRAPHICS AGENT SKILLS</span>
      <span>UPSTREAM v${manifest.upstream.packageVersion} · ${manifest.upstream.commit.slice(0, 12)} · LOCAL 24/24</span>
    </footer>
  </div>
`;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
});

document.querySelectorAll('.skill-chip-list a').forEach((link) => {
  const id = new URL(link.href).searchParams.get('skill');
  link.href = `./skills.html?skill=${id}`;
});

document.documentElement.dataset.skillCount = String(THREEJS_SKILLS.length);
document.documentElement.dataset.demoCount = String(SCENE_DEMOS.length);
document.documentElement.dataset.categoryCount = String(Object.keys(categoryMap).length);
