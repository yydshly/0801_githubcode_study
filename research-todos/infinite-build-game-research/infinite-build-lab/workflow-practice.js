const caseStudies = {
  adventure: {
    type: '3D ACTION ADVENTURE',
    title: 'Phantasy Codex Adventure',
    summary: '最接近“先做核心操作，再通过长期目标持续打磨”的完整证明：移动、攻击、闪避、职业和多个区域都围绕直接游玩展开。',
    gameUrl: 'https://phantasy-codex-adventure.openai.chatgpt-team.site',
    conceptImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/adventure-concept.png',
    builtImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/adventure-implemented.png',
    conceptAlt: 'Phantasy Codex Adventure 生成概念画面',
    builtAlt: 'Phantasy Codex Adventure 实际构建画面',
    values: ['第一版如何只证明战斗、镜头与HUD', '长期检查点如何扩展区域而不丢失操作核心'],
    strengths: ['真实可玩性最直接', '核心循环、压力和反馈容易观察'],
    limits: ['风格化资产降低了人物和环境生产成本', '不能据此推断写实开放世界能力'],
    transfer: ['先把移动、镜头和一次资源风险做成完整回路', '用概念/实机对照约束视觉漂移'],
  },
  online: {
    type: 'CHARACTER PROGRESSION · LOOT',
    title: 'Phantasy Codex Online',
    summary: '证明同一视觉家族可以发展出更重的角色成长系统：职业、背包、装备、分解、排行榜和本地保存让长期积累成为主要回报。',
    gameUrl: 'https://phantasy-codex-online.openai.chatgpt-team.site',
    conceptImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/online-concept.png',
    builtImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/online-implemented.jpg',
    conceptAlt: 'Phantasy Codex Online 背包与分解概念画面',
    builtAlt: 'Phantasy Codex Online 实际背包界面',
    values: ['观察一个独立检查点如何落地背包与分解', '分析系统深度如何通过版本和本地保存积累'],
    strengths: ['物品关系和成长反馈清楚', '适合验证状态、交换和不丢物品等规则'],
    limits: ['大部分深度由界面而非世界行为承载', '联网感与本地角色状态需要被明确区分'],
    transfer: ['资源、工具和营地以后也需要可靠状态模型', '先证明获得—使用—回报，再增加物品目录'],
  },
  backroom: {
    type: 'ATMOSPHERIC FIRST-PERSON HORROR',
    title: 'Backroom Center: Corrupted',
    summary: '证明精确的试玩反馈可以推动中期视觉修正：从当前运行画面生成明确的氛围目标，再用灯光、录像感和交互节奏接近它。',
    gameUrl: 'https://backroom-center-corrupted.openai.chatgpt-team.site',
    conceptImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/backroom-concept.png',
    builtImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/backroom-implemented.jpg',
    conceptAlt: 'Backroom Center Corrupted 中期氛围目标',
    builtAlt: 'Backroom Center Corrupted 后续本地实机画面',
    values: ['研究“移动太空、氛围不对”如何变成一个视觉检查点', '观察后处理、声音和光照如何放大简单资产'],
    strengths: ['情绪目标明确且容易前后对比', '有限空间也能形成强烈体验'],
    limits: ['氛围处理可能掩盖几何与内容量不足', '没有证明复杂生态或长时间玩法'],
    transfer: ['荒岛的孤独感也应先用一个时段和一个空间验证', '把天气、声音和光照作为同一反馈检查点'],
  },
  minitown: {
    type: 'ISOMETRIC COZY SIMULATION',
    title: 'MiniTown',
    summary: '证明概念状态能够先定义成长回报：从空地、第一街区到温暖夜景，建造、道路、居民和昼夜系统都服务于“看见小镇活起来”。',
    gameUrl: 'https://minitown-cozy-sim.openai.chatgpt-team.site',
    conceptImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/minitown-concept.png',
    builtImage: 'https://the-infinite-build.openai.chatgpt.site/comparisons/minitown-implemented.jpg',
    conceptAlt: 'MiniTown 成熟夜间小镇概念画面',
    builtAlt: 'MiniTown 最终夜间实机画面',
    values: ['研究三个发展状态如何先于模拟系统确定', '观察昼夜和居民活动如何把数据变成可见回报'],
    strengths: ['成长状态一眼可辨', '建造工具、人口和时间反馈组成完整闭环'],
    limits: ['居民行为与经济关系仍然简化', '小地图成功不能直接外推到大型模拟'],
    transfer: ['先让营地从无到有形成可见历史', '生存数值必须在世界画面中产生变化'],
  },
};

const practiceStages = {
  concept: {
    label: 'STAGE 01 · CONCEPTS FIRST',
    title: '先确定三个可实现的游戏状态',
    status: '真实状态：候选概念 V1 已验证并放行 Stage 02',
    human: '玩家幻想、核心动作、海岛氛围、参考方向，以及明确不接受写实宣传图冒充可玩画面。',
    codex: '提出受控玩法系统，并生成起点、第一次满足和发展状态三张保持同一镜头的概念画面。',
    output: '候选概念 V1 已落地：到达、理解、回报保持同一海湾和镜头；“读懂潮线”表达仍需人工判断。',
    proof: '人确认镜头、比例、画风和三个状态；在确认前不得开始游戏编码。',
    note: 'V1 已执行。可复制提示词继续生成变体，但在人工批准前不进入游戏编码。',
    reflection: '概念图是否真的像可玩的浏览器画面？如果把图交给另一名开发者，他能否判断镜头、比例、交互对象和完成状态？',
    prompt: `我想用 The Infinite Build 的流程和你练习制作一个小型浏览器游戏。

游戏想法：玩家被困在一个风格化的小海湾，需要在夜色与涨潮前收集漂流木、修复并点亮信号火。
玩家幻想：从慌乱的漂流者变成能够读懂潮线并完成第一次自救的人。
核心动作：观察路线、移动、收集、选择是否冒险、交付资源并点火。
氛围：孤独但不绝望，低多边形海岸，冷蓝海水与暖橙火光形成对比。
目标：浏览器，桌面键鼠与触摸均可操作。
避免：写实宣传图、巨大岛屿、复杂生态、背包系统、科技树和无法由简单资产实现的画面。

先不要写游戏代码。请生成三个保持相同第三人称俯视镜头、比例、画风和HUD语言的可玩画面概念：
1. 刚抵达海湾、信号火熄灭；
2. 找到第一批漂流木、开始理解潮线；
3. 夜晚点亮信号火、远处船只作出回应。

同时说明最小玩法系统、需要的简单资产、浏览器实现边界和你主动舍弃的内容。展示后停止，等待我选择方向。`,
  },
  slice: {
    label: 'STAGE 02 · FIRST PLAYABLE SLICE',
    title: '只构建能够证明承诺的5–10分钟',
    status: '真实状态：可玩切片 0.1 已实现并完成规则与浏览器验证，等待玩家反馈',
    human: '从三个概念中确认一个统一方向，并明确哪些视觉差异可以接受、哪些不能改变。',
    codex: '实现镜头、移动、观察潮线、收集、一次风险选择、涨潮压力和点火回报；运行并真实试玩。',
    output: '实时 3D 海湾、移动碰撞、潮尺交互、双路线、漂流木、涨潮浪击、信号火、存档与固定检查状态。',
    proof: '玩家可以从开始到点火完成一次闭环；概念中的镜头、路线、冷暖关系和HUD仍然可辨。',
    note: '切片 0.1 已实现；完成一次真实试玩后再进入第三阶段。',
    reflection: '哪些内容是为了证明核心体验，哪些只是看起来像“完整游戏”？如果删除一个系统，核心承诺是否仍成立？',
    prompt: `使用已经批准的《潮汐守望》概念方向和系统提案，构建首个5–10分钟可玩切片。

只证明：镜头、移动、观察潮线、收集漂流木、一次路线风险、涨潮压力、交付资源和点亮信号火的回报。
保持已批准的画风、比例、冷暖光关系和HUD语言。不要增加背包、科技树、动物、完整天气、多区域或长期生存数值。

建立必要的版本、路线图、变更记录、调试入口和测试。运行、实际试玩并展示真实构建。完成首个闭环后停止，等待我根据试玩感受反馈。`,
  },
  feedback: {
    label: 'STAGE 03 · PLAY AND REACT',
    title: '把一次真实感受变成单一检查点',
    status: '真实状态：依赖首版试玩，反馈待填写',
    human: '先完成真实试玩，用感受描述最大偏差，例如“潮水没有压迫感”，而不是直接列十项功能。',
    codex: '先复现当前版本，从反馈中判断一个影响最大的原因，只完成一个有验收条件的修改。',
    output: '一个聚焦检查点、修改前后证据、回归测试以及更新后的版本与日志。',
    proof: '同一路径、同一输入、同一观察角度能够说明修改确实改善了反馈问题。',
    note: '把方括号替换成真实试玩感受；没有试玩就不执行。',
    reflection: 'Codex修复的是感受背后的原因，还是机械地照抄了用户提出的功能？它是否保护了原本已经正确的部分？',
    prompt: `先运行并完整试玩当前《潮汐守望》切片，再进行任何修改。

我的真实试玩反馈：[在这里写一个最明显的感受，例如“涨潮只是在变颜色，没有迫使我改变路线，所以没有压力”]

请对照最初游戏承诺和批准概念，找出造成这项感受的单一最大原因。把它定义为一个有边界、有验收条件的检查点，只完成这一项改进。

用相同路径和输入记录修改前后证据，检查键鼠与触摸、重置流程和相邻功能没有回归。更新版本、路线图和日志后停止。`,
  },
  goal: {
    label: 'STAGE 04 · STANDING GOAL',
    title: '把一次成功切片变成持续职责',
    status: '真实状态：依赖方向稳定与一次反馈检查点',
    human: '确认游戏承诺、审美边界、不可跨越项，以及哪些外部变化必须停下来询问。',
    codex: '读取仓库与历史、试玩最新版本、提出长期目标；此后每轮选择一个最高价值弱点并验证发布。',
    output: '活动长期目标、检查点循环、版本规则、路线图、变更记录和停止条件。',
    proof: '至少连续完成两个不同检查点，第二个能从第一版的真实结果继续，而不是重新设计游戏。',
    note: '长期目标不是“自动加功能”，而是持续选择并验证最高价值问题。',
    reflection: '第二轮是否真正继承了第一轮的结论？路线图和日志能否让另一个人解释为什么做这一步？',
    prompt: `检查《潮汐守望》当前仓库、版本历史、路线图、变更记录和已批准概念，并完整试玩最新构建。

先用中文总结玩家承诺、最强部分、最弱部分和技术风险，再为这个游戏提出一个长期 Codex 目标。目标必须保存既有镜头、画风、操作和范围边界；每轮先试玩，只选择一个玩家可见的最高价值弱点，完成、验证、记录、版本化、部署以后再继续。

未经询问不得改变核心游戏承诺、进入写实资产生产、增加付费服务或秘密、扩大到大型岛屿和生态系统，也不得执行无法验证的发布。先展示目标草案和仍需我判断的产品选择，等待批准后再创建目标。`,
  },
  companion: {
    label: 'STAGE 05 · COMPANION AND STREAM',
    title: '让每个已发布检查点对人可读',
    status: '真实状态：依赖至少一个已发布检查点',
    human: '阅读面向玩家的变化说明，调整后续想法顺序，并只在核心承诺或边界变化时介入。',
    codex: '维护PLAY、NOW、NEXT、LOG与版本证据；每次发布后更新伴随页并从最新检查点继续。',
    output: '可玩的最新版本、当前改进、接下来三项、人类可读日志和发布证明。',
    proof: '伴随页链接到真实最新版；日志能说明改了什么、试玩学到什么、下一步为什么值得做。',
    note: '伴随页不是宣传站，而是长期目标对外可见的记忆。',
    reflection: '离开代码和聊天记录，仅看伴随页，是否还能理解游戏现在处于什么状态、为什么继续做下一步？',
    prompt: `为《潮汐守望》建立并持续维护一个项目伴随页面。

页面必须包含：
1. PLAY：立即进入最新已验证版本；
2. NOW：当前正在解决的玩家可见问题及选择原因；
3. NEXT：人和Codex共同整理的后续三个想法，按顺序排列；
4. LOG：每个已发布检查点的人类可读说明，包括改了什么、试玩学到什么、下一步是什么；
5. PROOF：版本号、真实试玩验证和线上部署状态。

从仓库、版本历史、路线图和日志自动生成所需数据。每次游戏检查点发布后同步更新并验证伴随页，不要求我手工维护文件。`,
  },
};

const caseTabs = [...document.querySelectorAll('[data-case]')];
const stageTabs = [...document.querySelectorAll('[data-stage]')];
const casePanel = document.querySelector('#case-panel');
const stagePanel = document.querySelector('#stage-panel');

function replaceList(selector, values) {
  const list = document.querySelector(selector);
  list.replaceChildren(...values.map((value) => {
    const item = document.createElement('li');
    item.textContent = value;
    return item;
  }));
}

function selectCase(key, focusPanel = false) {
  const item = caseStudies[key];
  if (!item) return;
  caseTabs.forEach((tab) => {
    const active = tab.dataset.case === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  const activeTab = caseTabs.find((tab) => tab.dataset.case === key);
  casePanel.setAttribute('aria-labelledby', activeTab.id);
  document.querySelector('#case-type').textContent = item.type;
  document.querySelector('#case-title').textContent = item.title;
  document.querySelector('#case-summary').textContent = item.summary;
  document.querySelector('#case-game-link').href = item.gameUrl;
  const conceptImage = document.querySelector('#case-concept-image');
  conceptImage.src = item.conceptImage;
  conceptImage.alt = item.conceptAlt;
  const builtImage = document.querySelector('#case-built-image');
  builtImage.src = item.builtImage;
  builtImage.alt = item.builtAlt;
  replaceList('#case-values', item.values);
  replaceList('#case-strengths', item.strengths);
  replaceList('#case-limits', item.limits);
  replaceList('#case-transfer', item.transfer);
  if (focusPanel) casePanel.focus({ preventScroll: true });
}

function selectStage(key, focusPanel = false) {
  const item = practiceStages[key];
  if (!item) return;
  stageTabs.forEach((tab) => {
    const active = tab.dataset.stage === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  const activeTab = stageTabs.find((tab) => tab.dataset.stage === key);
  stagePanel.setAttribute('aria-labelledby', activeTab.id);
  document.querySelector('#stage-label').textContent = item.label;
  document.querySelector('#stage-title').textContent = item.title;
  document.querySelector('#stage-real-status').textContent = item.status;
  document.querySelector('#stage-human').textContent = item.human;
  document.querySelector('#stage-codex').textContent = item.codex;
  document.querySelector('#stage-output').textContent = item.output;
  document.querySelector('#stage-proof').textContent = item.proof;
  document.querySelector('#prompt-note').textContent = item.note;
  document.querySelector('#stage-prompt code').textContent = item.prompt;
  document.querySelector('#stage-reflection').textContent = item.reflection;
  document.querySelector('#copy-status').textContent = '';
  if (focusPanel) stagePanel.focus({ preventScroll: true });
}

function bindTabs(tabs, select, dataKey) {
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset[dataKey]));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let targetIndex = index;
      if (event.key === 'Home') targetIndex = 0;
      else if (event.key === 'End') targetIndex = tabs.length - 1;
      else if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      else targetIndex = (index - 1 + tabs.length) % tabs.length;
      tabs[targetIndex].focus();
      select(tabs[targetIndex].dataset[dataKey]);
    });
  });
}

bindTabs(caseTabs, selectCase, 'case');
bindTabs(stageTabs, selectStage, 'stage');

async function copyCurrentPrompt() {
  const prompt = document.querySelector('#stage-prompt code').textContent;
  const status = document.querySelector('#copy-status');
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(prompt);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      if (!copied) throw new Error('copy command was rejected');
    }
    status.textContent = '已复制当前阶段提示词。';
  } catch {
    status.textContent = '自动复制失败，请直接选择下方提示词文本复制。';
  }
}

document.querySelector('#copy-prompt').addEventListener('click', copyCurrentPrompt);
