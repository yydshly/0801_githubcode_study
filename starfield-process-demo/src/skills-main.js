import './skills-styles.css';
import { SKILL_CATEGORIES, THREEJS_SKILLS, SKILL_RECIPES, SCENE_DEMOS, skillById, categoryById } from './skills-catalog.js';

const requestedSkill = new URLSearchParams(window.location.search).get('skill');

const state = {
  category: 'all',
  query: '',
  selectedSkill: skillById[requestedSkill] ? requestedSkill : THREEJS_SKILLS[0].id,
  selectedRecipe: SKILL_RECIPES[0].id,
  demoFilter: 'all',
};

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="skills-shell">
    <header class="skills-topbar">
      <a class="skills-brand" href="./skills.html" aria-label="Three.js Skill 能力地图首页">
        <span class="brand-index">24</span>
        <span><strong>THREE.JS EXPERT SKILLS</strong><small>AGENT GRAPHICS CAPABILITY MAP</small></span>
      </a>
      <nav class="skills-nav" aria-label="页面导航">
        <a href="./project.html">研究总览</a>
        <a href="./skill-lab.html">Skill 控制实验</a>
        <a href="./index.html">效果实验室</a>
        <a href="./applications.html">应用展厅</a>
        <a href="https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills" target="_blank" rel="noreferrer">原仓库 ↗</a>
      </nav>
    </header>

    <main>
      <section class="skills-hero" aria-labelledby="skills-title">
        <div class="hero-copy-block">
          <p class="mono-label">CORE CONCLUSION / 核心理解</p>
          <h1 id="skills-title">24 个 Skill，指导大模型生成高级 Three.js 代码</h1>
          <p class="hero-summary">它们不是浏览器运行库，也不是 24 个一键场景。每个 Skill 都把一个图形领域拆成触发条件、实现顺序、关键机制、失败边界、调试视图和验收标准；其中部分还附带可迁移代码与资产。</p>
        </div>
        <div class="hero-metrics" aria-label="仓库能力统计">
          <div><strong>24</strong><span>EXPERT SKILLS</span><small>全部已逐份读取</small></div>
          <div><strong>05</strong><span>USE STAGES</span><small>从规划到验收</small></div>
          <div><strong>14</strong><span>WITH EXAMPLES</span><small>带可运行案例</small></div>
          <div><strong>31</strong><span>EXAMPLE SETS</span><small>图形实现目录</small></div>
        </div>
        <div class="responsibility-chain" aria-label="大模型、Skill、代码与 Three.js 的关系">
          <div><span>01</span><strong>你的目标</strong><small>海洋 / 暴雨 / 行星</small></div><b>→</b>
          <div><span>02</span><strong>大模型</strong><small>理解并编写方案</small></div><b>→</b>
          <div><span>03</span><strong>Skill</strong><small>提供专业方法与约束</small></div><b>→</b>
          <div><span>04</span><strong>生成代码</strong><small>JavaScript / GLSL / TSL</small></div><b>→</b>
          <div><span>05</span><strong>Three.js + GPU</strong><small>浏览器实时画面</small></div>
        </div>
      </section>

      <section class="skills-lab" aria-labelledby="catalog-title">
        <div class="section-heading">
          <div><p class="mono-label">CAPABILITY CATALOG / 01</p><h2 id="catalog-title">五类能力，24 个专家系统</h2></div>
          <p>先按阶段定位，再选择一个 Skill 查看它如何改变代码生成结果。</p>
        </div>

        <div class="catalog-toolbar">
          <label class="skill-search"><span>SEARCH</span><input id="skill-search" type="search" placeholder="搜索海洋、雨雪、材质、相机…" autocomplete="off" /></label>
          <div id="category-tabs" class="category-tabs" role="tablist" aria-label="Skill 分类"></div>
        </div>

        <div class="catalog-layout">
          <div class="catalog-column">
            <div class="catalog-status"><span id="result-count">24 / 24 SKILLS</span><strong id="category-summary">全部专家能力</strong></div>
            <div id="skill-grid" class="skill-grid"></div>
            <div id="empty-state" class="empty-state" hidden><strong>没有匹配的 Skill</strong><span>尝试搜索“water”“camera”“材质”或切换回全部。</span></div>
          </div>
          <aside id="skill-detail" class="skill-detail" aria-live="polite"></aside>
        </div>
      </section>

      <section class="recipe-lab" aria-labelledby="recipe-title">
        <div class="section-heading">
          <div><p class="mono-label">COMPOSITION RECIPES / 02</p><h2 id="recipe-title">Skill 如何关联并生成效果</h2></div>
          <p>选择产品目标，观察从任务拆解到最终验证的有序调用链。</p>
        </div>
        <div id="recipe-tabs" class="recipe-tabs" role="tablist" aria-label="场景配方"></div>
        <div class="recipe-output">
          <div class="recipe-intro"><span>SELECTED OUTCOME</span><h3 id="recipe-name"></h3><p id="recipe-outcome"></p></div>
          <ol id="recipe-flow" class="recipe-flow"></ol>
        </div>
      </section>

      <section class="scene-demo-map" aria-labelledby="demo-map-title">
        <div class="section-heading">
          <div><p class="mono-label">LIVE SCENE EVIDENCE / 03</p><h2 id="demo-map-title">还有哪些场景？分别涉及哪些 Skill</h2></div>
          <p>这里不只列名字，还区分直接实现、机制组合和产品原型，说明 Skill 真正负责的部分与产品代码负责的部分。</p>
        </div>
        <div class="demo-truth-legend" aria-label="场景真实性等级">
          <div><span>LEVEL A</span><strong>直接实现</strong><p>直接导入本地 Skill 示例，或采用上游随附核心实现。</p></div>
          <div><span>LEVEL B</span><strong>机制组合</strong><p>由产品代码实现，但明确采用一个或多个 Skill 的技术方法。</p></div>
          <div><span>LEVEL C</span><strong>产品原型</strong><p>Skill 提供图形能力；任务、数据和业务逻辑由产品层负责。</p></div>
        </div>
        <div id="demo-filters" class="demo-filters" role="tablist" aria-label="场景演示分类"></div>
        <div class="demo-count"><span id="demo-count">12 / 12 SCENES</span><strong>点击 Skill 名称可回到上方查看完整能力</strong></div>
        <div id="demo-grid" class="demo-grid"></div>
      </section>

      <section class="activation-guide" aria-labelledby="activation-title">
        <div class="section-heading">
          <div><p class="mono-label">REAL USAGE / 04</p><h2 id="activation-title">怎样才算真正使用了 Skill</h2></div>
          <p>克隆仓库只是拿到文件；被 Agent 发现、明确调用并按验收门槛交付，才算完整使用。</p>
        </div>
        <div class="activation-steps">
          <article><span>STEP 01</span><h3>安装或注册</h3><p>把 Skill 放进 Codex 可发现的技能目录，而不只是放在普通源码子目录。</p></article>
          <article><span>STEP 02</span><h3>明确调用</h3><p>在任务里指定 <code>$threejs-spectral-ocean</code>，或让 Router 选择最小组合。</p></article>
          <article><span>STEP 03</span><h3>按 Skill 生成</h3><p>大模型读取实现顺序、控制参数和失败条件，再编写 Three.js / Shader 代码。</p></article>
          <article><span>STEP 04</span><h3>验证机制</h3><p>保留确定性种子、无后期基线、调试通道、质量档和 GPU 证据。</p></article>
        </div>
        <div class="prompt-example"><span>EXAMPLE PROMPT</span><code>使用 $threejs-spectral-ocean 构建有确定性种子、风向控制、白浪诊断和中低高质量档的海洋；最后使用 $threejs-visual-validation 验收。</code></div>
        <a class="skill-lab-entry" href="./skill-lab.html"><span>LIVE EXPERIMENT / 下一步</span><strong>真实调用一个本地 Skill，逐层观察它怎样控制画面</strong><b>进入程序化行星控制实验 →</b></a>
      </section>
    </main>

    <footer class="skills-footer"><span>SOURCE / scottstts · Threejs-Awesome-Graphics-Agent-Skills</span><span>24 SKILLS READ · DATA-DRIVEN GUIDE</span></footer>
  </div>
`;

const categoryTabs = document.querySelector('#category-tabs');
const skillGrid = document.querySelector('#skill-grid');
const detail = document.querySelector('#skill-detail');
const search = document.querySelector('#skill-search');
const emptyState = document.querySelector('#empty-state');
const resultCount = document.querySelector('#result-count');
const categorySummary = document.querySelector('#category-summary');
const recipeTabs = document.querySelector('#recipe-tabs');
const demoFilters = document.querySelector('#demo-filters');
const demoGrid = document.querySelector('#demo-grid');

function categoryLabel(categoryId) {
  return categoryById[categoryId]?.label ?? '全部';
}

function syncSkillUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set('skill', state.selectedSkill);
  window.history.replaceState({}, '', url);
}

function renderCategoryTabs() {
  const tabs = [{ id: 'all', number: '00', label: '全部', summary: '全部专家能力' }, ...SKILL_CATEGORIES];
  categoryTabs.innerHTML = tabs.map((category) => {
    const count = category.id === 'all' ? THREEJS_SKILLS.length : THREEJS_SKILLS.filter((skill) => skill.category === category.id).length;
    const active = state.category === category.id;
    return `<button role="tab" data-category="${category.id}" aria-selected="${active}" class="${active ? 'is-active' : ''}"><span>${category.number}</span><strong>${category.label}</strong><small>${String(count).padStart(2, '0')}</small></button>`;
  }).join('');
}

function filteredSkills() {
  const query = state.query.trim().toLowerCase();
  return THREEJS_SKILLS.filter((skill) => {
    const categoryMatch = state.category === 'all' || skill.category === state.category;
    const text = [skill.id, skill.short, skill.title, skill.summary, skill.when, ...skill.inputs, ...skill.outputs, ...skill.examples].join(' ').toLowerCase();
    return categoryMatch && (!query || text.includes(query));
  });
}

function renderGrid() {
  const skills = filteredSkills();
  if (!skills.some((skill) => skill.id === state.selectedSkill) && skills.length) state.selectedSkill = skills[0].id;
  skillGrid.innerHTML = skills.map((skill) => {
    const active = skill.id === state.selectedSkill;
    return `<button class="skill-card ${active ? 'is-active' : ''}" data-skill="${skill.id}" aria-pressed="${active}">
      <span class="card-index">${String(THREEJS_SKILLS.indexOf(skill) + 1).padStart(2, '0')}</span>
      <span class="card-role">${skill.role} · ${categoryLabel(skill.category)}</span>
      <strong>${skill.title}</strong>
      <code>${skill.id}</code>
      <p>${skill.summary}</p>
      <span class="card-meta">${skill.examples.length ? `${skill.examples.length} 个示例` : '规范型 Skill'}<b>查看能力 →</b></span>
    </button>`;
  }).join('');
  emptyState.hidden = skills.length > 0;
  resultCount.textContent = `${String(skills.length).padStart(2, '0')} / 24 SKILLS`;
  categorySummary.textContent = state.category === 'all' ? (state.query ? `搜索：${state.query}` : '全部专家能力') : categoryById[state.category].summary;
  renderDetail();
}

function pills(items) {
  return items.map((item) => `<span>${item}</span>`).join('');
}

function renderDetail() {
  const skill = skillById[state.selectedSkill];
  if (!skill) {
    detail.innerHTML = '<div class="detail-empty">选择一个 Skill 查看完整能力。</div>';
    return;
  }
  const index = THREEJS_SKILLS.indexOf(skill) + 1;
  detail.innerHTML = `
    <div class="detail-head"><span>SKILL ${String(index).padStart(2, '0')} / 24</span><b>${categoryLabel(skill.category)} · ${skill.role}</b></div>
    <h3>${skill.title}</h3><code class="detail-id">$${skill.id}</code>
    <p class="detail-summary">${skill.summary}</p>
    <div class="detail-section"><span>WHEN TO USE / 什么时候用</span><p>${skill.when}</p></div>
    <div class="io-grid"><div><span>INPUT / 输入</span>${pills(skill.inputs)}</div><div><span>OUTPUT / 生成</span>${pills(skill.outputs)}</div></div>
    <div class="detail-section"><span>NON-NEGOTIABLE / 关键约束</span><ul>${skill.rules.map((rule) => `<li>${rule}</li>`).join('')}</ul></div>
    <div class="detail-section"><span>EXAMPLES / 原仓库示例</span>${skill.examples.length ? `<div class="example-list">${pills(skill.examples)}</div>` : '<p class="muted-note">这个 Skill 以规范与参考实现为主，没有独立示例目录。</p>'}</div>
    <div class="detail-section"><span>RELATED / 常见组合</span><div class="related-list">${skill.related.map((id) => `<button data-related="${id}">$${skillById[id].short}</button>`).join('')}</div></div>
    <a class="source-link" href="https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/skills/${skill.id}" target="_blank" rel="noreferrer">查看原始 SKILL.md ↗</a>
  `;
}

function renderRecipes() {
  recipeTabs.innerHTML = SKILL_RECIPES.map((recipe, index) => `<button role="tab" data-recipe="${recipe.id}" aria-selected="${recipe.id === state.selectedRecipe}" class="${recipe.id === state.selectedRecipe ? 'is-active' : ''}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${recipe.label}</strong></button>`).join('');
  const recipe = SKILL_RECIPES.find((item) => item.id === state.selectedRecipe);
  document.querySelector('#recipe-name').textContent = recipe.label;
  document.querySelector('#recipe-outcome').textContent = recipe.outcome;
  document.querySelector('#recipe-flow').innerHTML = recipe.skills.map((id, index) => {
    const skill = skillById[id];
    const contribution = index === 0 ? '拆解目标与选择最小能力集' : index === recipe.skills.length - 1 ? '固定输入并完成机制验收' : skill.summary;
    return `<li><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${skill.title}</strong><code>$${skill.id}</code><p>${contribution}</p></div></li>`;
  }).join('');
}

const demoGroups = [
  { id: 'all', label: '全部场景', note: '全部真实性等级' },
  { id: 'direct', label: '直接实现', note: '直接复用 Skill / 上游核心' },
  { id: 'composed', label: '机制组合', note: '按 Skill 方法编写' },
  { id: 'product', label: '产品原型', note: '图形能力进入产品' },
];

function renderSceneDemos() {
  demoFilters.innerHTML = demoGroups.map((group, index) => {
    const count = group.id === 'all' ? SCENE_DEMOS.length : SCENE_DEMOS.filter((demo) => demo.group === group.id).length;
    const active = state.demoFilter === group.id;
    return `<button role="tab" data-demo-filter="${group.id}" aria-selected="${active}" class="${active ? 'is-active' : ''}"><span>${String(index).padStart(2, '0')}</span><strong>${group.label}</strong><small>${count}</small></button>`;
  }).join('');

  const demos = state.demoFilter === 'all' ? SCENE_DEMOS : SCENE_DEMOS.filter((demo) => demo.group === state.demoFilter);
  document.querySelector('#demo-count').textContent = `${String(demos.length).padStart(2, '0')} / ${SCENE_DEMOS.length} SCENES`;
  demoGrid.innerHTML = demos.map((demo) => `
    <article class="demo-card demo-${demo.group}">
      <div class="demo-card-head"><span>${demo.number}</span><b>${demo.status}</b></div>
      <h3>${demo.title}</h3>
      <p class="demo-summary">${demo.summary}</p>
      <div class="demo-truth"><span>真实代码关系</span><p>${demo.truth}</p></div>
      <div class="demo-skills"><span>涉及的 Skill 与职责</span><ul>${demo.skills.map((item) => {
        const skill = skillById[item.id];
        return `<li><button type="button" data-demo-skill="${item.id}">$${skill.short}</button><div><strong>${item.relation}</strong><p>${item.role}</p></div></li>`;
      }).join('')}</ul></div>
      <div class="demo-boundary"><span>不属于 Skill 的部分</span><p>${demo.boundary}</p></div>
      <a class="demo-launch" href="${demo.href}"><span>打开实时场景</span><b>LIVE DEMO →</b></a>
    </article>
  `).join('');
}

function updateCatalog() {
  renderCategoryTabs();
  renderGrid();
}

categoryTabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  updateCatalog();
});

search.addEventListener('input', () => {
  state.query = search.value;
  renderGrid();
});

skillGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-skill]');
  if (!button) return;
  state.selectedSkill = button.dataset.skill;
  syncSkillUrl();
  renderGrid();
  if (window.matchMedia('(max-width: 760px)').matches) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

detail.addEventListener('click', (event) => {
  const button = event.target.closest('[data-related]');
  if (!button) return;
  state.selectedSkill = button.dataset.related;
  syncSkillUrl();
  state.category = 'all';
  state.query = '';
  search.value = '';
  updateCatalog();
});

recipeTabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-recipe]');
  if (!button) return;
  state.selectedRecipe = button.dataset.recipe;
  renderRecipes();
});

demoFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-demo-filter]');
  if (!button) return;
  state.demoFilter = button.dataset.demoFilter;
  renderSceneDemos();
});

demoGrid.addEventListener('click', (event) => {
  const skillButton = event.target.closest('[data-demo-skill]');
  if (!skillButton) return;
  state.selectedSkill = skillButton.dataset.demoSkill;
  syncSkillUrl();
  state.category = 'all';
  state.query = '';
  search.value = '';
  updateCatalog();
  document.querySelector('#catalog-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

updateCatalog();
renderRecipes();
renderSceneDemos();
