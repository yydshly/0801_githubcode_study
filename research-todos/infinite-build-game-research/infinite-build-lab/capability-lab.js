const visualAssetFallback = new URLSearchParams(window.location.search).get('visuals') === 'off';
document.documentElement.dataset.visualAssets = visualAssetFallback ? 'fallback' : 'enhanced';
if (visualAssetFallback) {
  const portrait = document.querySelector('.character-silhouette img');
  portrait?.removeAttribute('src');
  if (portrait) portrait.hidden = true;
}

const caseData = {
  adventure: {
    number: '01', kicker: '01 · 2D ACTION FEEDBACK', title: '动作是否真的产生反馈？', route: 'CUSTOM CANVAS 2D', accent: '#f1cb69',
    name: 'Phantasy Codex Adventure', url: 'https://phantasy-codex-adventure.openai.chatgpt.site/',
    summary: '动作图集、三阶段攻击时序、敌人预警、命中反馈和 DOM HUD 共同形成可读的战斗闭环。',
    facts: [['运行世界', 'Canvas 2D + 确定性战斗状态机'], ['视觉实验', '原创森林 + 16帧角色/敌人图集 + 程序化VFX'], ['反馈系统', '前摇、命中窗口、后摇、预警、停顿、击退与声音'], ['界面分工', 'Canvas画世界，DOM解释状态和控制']],
    verified: '伤害只在命中窗口结算一次；移动、敌人预警、受击、击退、生命、连击、声音和HUD保持同步。',
    boundary: '本轮图集足以验证动作时序与反馈链，但不是骨骼动画系统，也没有复杂寻路、技能树或商业级音频资产。',
    transfer: '海岛人物的采集、受伤、使用工具和危险反应必须建立同样清晰的动作反馈链。',
  },
  online: {
    number: '02', kicker: '02 · PERSISTENT PROGRESSION', title: '物品变化能否可靠地留下？', route: 'STATE + DOM UI', accent: '#79d9e5',
    name: 'Phantasy Codex Online', url: 'https://phantasy-codex-online.openai.chatgpt.site/',
    summary: '在复用世界与人物视觉资产的基础上，用状态模型和界面建立角色成长。',
    facts: [['运行世界', '原创世界背景 + DOM装备工作台'], ['视觉实验', '角色立绘、装备槽、物品符号与世界同源'], ['核心系统', '背包、装备、拆解、属性与本地保存'], ['复用方式', '同一世界媒体跨战斗与成长界面复用']],
    verified: '角色身份、物品选择、装备、拆解、属性重算和本地恢复在同一视觉系统中保持一致。',
    boundary: '物品符号仍是程序化图标；本地状态不能证明多人在线、服务器权威或长期经济平衡。',
    transfer: '海岛资源、工具耐久和营地库存需要先拥有不丢物品、可恢复的状态基础。',
  },
  backroom: {
    number: '03', kicker: '03 · FIRST-PERSON ATMOSPHERE', title: '简单空间如何获得压迫感？', route: 'THREE.JS + GLB/LOD', accent: '#d96653',
    name: 'Backroom Center: Corrupted', url: 'https://backroom-center-corrupted.openai.chatgpt.site/',
    summary: '真实3D资产、第一人称镜头、灯光、雾、后处理和声音共同塑造空间情绪。',
    facts: [['运行世界', 'Three.js + 第一人称控制'], ['资产证据', '47类模型 × LOD0/LOD1，共94个GLB'], ['渲染能力', 'Shader、EffectComposer、InstancedMesh'], ['氛围能力', '指针锁定、闪烁光源、雾与程序化声音']],
    verified: '第一人称移动、模块化拱架、实例化机柜与信号灯，以及结构/氛围双模式共同改变空间感受。',
    boundary: '程序化走廊已提升到可读微场景，但仍没有复现原作94个GLB的独立造型、纹理与LOD质量。',
    transfer: '这是海岛3D空间最重要的参考：地貌与植被资产、LOD、雾、天气和光照必须作为同一管线。',
  },
  minitown: {
    number: '04', kicker: '04 · WORLD STATE SIMULATION', title: '数值是否真的改变了世界？', route: 'THREE.JS + INSTANCING', accent: '#9bc86f',
    name: 'MiniTown', url: 'https://minitown-cozy-sim.openai.chatgpt.site/',
    summary: '等距相机、实例化物件、网格建造和昼夜让模拟状态直接出现在世界中。',
    facts: [['运行世界', 'Three.js等距场景'], ['场景生成', '程序化几何 + InstancedMesh'], ['核心系统', '网格选择、建筑状态、人口与昼夜'], ['产品分工', 'WebGL展示世界，DOM管理工具与数据']],
    verified: '海岸、水面、道路、植被与装饰建立初始世界；点击建造会改变屋顶、窗灯、建筑与人口，时间继续驱动整体光照。',
    boundary: '建筑仍由程序化模块组成；不包含居民寻路、岗位匹配、复杂经济或大地图流式加载。',
    transfer: '营地升级不能只增加数值；住所、火光、储物和活动痕迹必须在岛上留下可见历史。',
  },
};

let activeCase = 'adventure';
const caseButtons = [...document.querySelectorAll('[data-case]')];
const demoPanels = [...document.querySelectorAll('[data-demo-panel]')];

function fillFacts(facts) {
  const root = document.querySelector('#evidence-facts');
  root.replaceChildren(...facts.map(([term, description]) => {
    const row = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = term;
    dd.textContent = description;
    row.append(dt, dd);
    return row;
  }));
}

function selectCase(key, shouldFocus = false) {
  const data = caseData[key];
  if (!data) return;
  activeCase = key;
  document.documentElement.style.setProperty('--accent', data.accent);
  caseButtons.forEach((button) => {
    const selected = button.dataset.case === key;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  demoPanels.forEach((panel) => {
    const selected = panel.dataset.demoPanel === key;
    panel.hidden = !selected;
    panel.classList.toggle('is-active', selected);
  });
  document.querySelector('#stage-kicker').textContent = data.kicker;
  document.querySelector('#stage-title').textContent = data.title;
  document.querySelector('#evidence-number').textContent = data.number;
  document.querySelector('#evidence-route').textContent = data.route;
  document.querySelector('#evidence-title').textContent = data.name;
  document.querySelector('#evidence-summary').textContent = data.summary;
  document.querySelector('#evidence-link').href = data.url;
  document.querySelector('#verified-copy').textContent = data.verified;
  document.querySelector('#boundary-copy').textContent = data.boundary;
  document.querySelector('#transfer-copy').textContent = data.transfer;
  fillFacts(data.facts);
  window.dispatchEvent(new CustomEvent('capabilitylab:casechange', { detail: { key } }));
  if (shouldFocus) document.querySelector('.demo-stage').focus?.({ preventScroll: true });
}

caseButtons.forEach((button) => button.addEventListener('click', () => selectCase(button.dataset.case)));
fillFacts(caseData.adventure.facts);

// Adventure: a deterministic, staged Canvas 2D combat slice.
const adventureCanvas = document.querySelector('#adventure-canvas');
const advCtx = adventureCanvas.getContext('2d');
advCtx.imageSmoothingEnabled = false;
const combatCore = window.AdventureCombatCore;
const advReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(window.location.search).get('motion') === 'reduce';
function loadVisualAsset(src) {
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  return image;
}
const visualAssets = {
  forest: loadVisualAsset(visualAssetFallback ? 'about:blank' : 'assets/visual-production/coastal-rune-forest-v1.png'),
  hero: loadVisualAsset(visualAssetFallback ? 'about:blank' : 'assets/visual-production/castaway-guardian-v1.png'),
  enemy: loadVisualAsset(visualAssetFallback ? 'about:blank' : 'assets/visual-production/tidewood-sentinel-v1.png'),
  heroAtlas: loadVisualAsset(visualAssetFallback ? 'about:blank' : 'assets/visual-production/castaway-guardian-atlas-v1.png'),
  enemyAtlas: loadVisualAsset(visualAssetFallback ? 'about:blank' : 'assets/visual-production/tidewood-sentinel-atlas-v1.png'),
};
const advKeys = new Set();
const advState = {
  hero: { x: 310, y: 330, hp: 100, facing: 1, action: null, hitTimer: 0 },
  enemy: { x: 650, y: 322, hp: 100, alive: true, facing: -1, brain: combatCore.createEnemyBrain(), hitTimer: 0 },
  combo: 0, comboTimer: 0, attackStep: 0, actionId: 0, bufferedAttack: 0,
  flash: 0, damageFlash: 0, shake: 0, hitStop: 0, particles: [], slashes: [],
  visualMode: visualAssetFallback ? 'baseline' : 'enhanced',
  message: '靠近敌人，观察预警，再用三段攻击击退它。',
};

const advAudio = {
  context: null,
  muted: false,
  voices: new Set(),
  unlock() {
    if (this.muted) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!this.context) this.context = new AudioContextClass();
    if (this.context.state === 'suspended') this.context.resume().catch(() => {});
  },
  cue(name) {
    if (this.muted) return;
    this.unlock();
    if (!this.context || this.voices.size >= 8) return;
    const presets = {
      swing: [180, 90, .08, 'sawtooth', .035], hit: [110, 48, .09, 'square', .055],
      heavy: [92, 34, .14, 'sawtooth', .075], miss: [320, 220, .06, 'triangle', .022],
      warning: [240, 420, .18, 'sine', .035], hurt: [78, 52, .18, 'square', .055],
      defeat: [160, 42, .32, 'triangle', .055], reset: [220, 330, .12, 'sine', .025],
    };
    const preset = presets[name]; if (!preset) return;
    const [from, to, duration, type, volume] = preset;
    const osc = this.context.createOscillator(); const gain = this.context.createGain();
    const now = this.context.currentTime;
    osc.type = type; osc.frequency.setValueAtTime(from, now); osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + duration);
    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(volume, now + .008); gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    osc.connect(gain).connect(this.context.destination); this.voices.add(osc); osc.start(now); osc.stop(now + duration + .02);
    osc.addEventListener('ended', () => { this.voices.delete(osc); osc.disconnect(); gain.disconnect(); }, { once: true });
  },
};

function resetAdventure() {
  Object.assign(advState.hero, { x: 310, y: 330, hp: 100, facing: 1, action: null, hitTimer: 0 });
  Object.assign(advState.enemy, { x: 650, y: 322, hp: 100, alive: true, facing: -1, brain: combatCore.createEnemyBrain(), hitTimer: 0 });
  Object.assign(advState, { combo: 0, comboTimer: 0, attackStep: 0, actionId: 0, bufferedAttack: 0, flash: 0, damageFlash: 0, shake: 0, hitStop: 0, particles: [], slashes: [], message: '靠近敌人，观察预警，再用三段攻击击退它。' });
  advAudio.cue('reset');
  syncAdventureUI();
}

const playerPhaseNames = { idle: '待机', move: '移动', startup: '前摇', active: '命中窗口', recovery: '后摇', hit: '受击', dead: '失去行动' };
const enemyStateNames = { chase: '观察 / 追击', telegraph: '攻击预警', active: '攻击窗口', recovery: '攻击恢复', hit: '受击', dead: '已击败' };
function getPlayerPhase() {
  if (advState.hero.hp <= 0) return 'dead';
  if (advState.hero.hitTimer > 0) return 'hit';
  if (advState.hero.action) return advState.hero.action.phase;
  return [...advKeys].some((key) => ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyW','KeyA','KeyS','KeyD'].includes(key)) ? 'move' : 'idle';
}

function syncAdventureUI() {
  document.querySelector('#adv-hp').textContent = `${Math.round(advState.hero.hp)} / 100`;
  document.querySelector('#adv-combo').textContent = String(advState.combo);
  document.querySelector('#adv-enemy-hp').textContent = advState.enemy.alive ? `${Math.max(0, Math.round(advState.enemy.hp))}%` : 'DEFEATED';
  document.querySelector('#adv-feedback').textContent = advState.message;
  const playerPhase = getPlayerPhase();
  document.querySelector('#adv-phase').textContent = `PLAYER · ${playerPhaseNames[playerPhase] || playerPhase}`;
  document.querySelector('#adv-enemy-state').textContent = `ENEMY · ${enemyStateNames[advState.enemy.brain.state] || advState.enemy.brain.state}`;
  const progress = advState.hero.action ? combatCore.actionProgress(advState.hero.action) : 0;
  document.querySelector('#adv-phase-meter').style.transform = `scaleX(${progress})`;
  document.querySelector('#adv-audio').textContent = advAudio.muted ? '声音：关' : '声音：开';
  document.querySelector('#adv-audio').setAttribute('aria-pressed', String(advAudio.muted));
  document.querySelector('#adv-visual-mode').textContent = advState.visualMode === 'enhanced' ? '查看机制基线' : '恢复增强视觉';
  document.querySelector('.pixel-shell').dataset.combatState = playerPhase;
  document.documentElement.dataset.adventurePlayerPhase = playerPhase;
  document.documentElement.dataset.adventureEnemyState = advState.enemy.brain.state;
  document.documentElement.dataset.adventureHeroHp = String(Math.round(advState.hero.hp));
  document.documentElement.dataset.adventureEnemyHp = String(Math.round(advState.enemy.hp));
  document.documentElement.dataset.adventureVisualMode = advState.visualMode;
  document.documentElement.dataset.adventureMotion = advReducedMotion ? 'reduced' : 'full';
  document.documentElement.dataset.adventureShake = String(Math.round(advState.shake));
}

function attackAdventure() {
  if (activeCase !== 'adventure' || advState.hero.hp <= 0) return;
  advAudio.unlock();
  if (advState.hero.action) {
    advState.bufferedAttack = Math.min(2, advState.bufferedAttack + 1);
    advState.message = `已缓存 ${advState.bufferedAttack} 段攻击，将在当前动作结束后衔接。`; syncAdventureUI();
    return;
  }
  advState.attackStep = combatCore.nextComboStep(advState.attackStep, advState.comboTimer);
  advState.actionId += 1;
  advState.hero.action = combatCore.startPlayerAttack(advState.attackStep, advState.actionId);
  advState.hero.facing = advState.enemy.x >= advState.hero.x ? 1 : -1;
  advState.message = `第 ${advState.attackStep} 段前摇：现在还没有伤害。`;
  advAudio.cue('swing');
  syncAdventureUI();
}

function spawnAdventureBurst(x, y, count, color, force = 1) {
  const reducedCount = advReducedMotion ? Math.min(4, count) : count;
  for (let i = 0; i < reducedCount && advState.particles.length < 48; i += 1) {
    advState.particles.push({ x, y, vx: (Math.random() - .5) * 150 * force, vy: (-.35 - Math.random() * .7) * 115 * force, life: .28 + Math.random() * .26, maxLife: .54, color, size: 3 + Math.random() * 5 });
  }
}

function resolvePlayerHit() {
  const action = advState.hero.action; if (!combatCore.isPlayerHitWindow(action)) return;
  const spec = combatCore.PLAYER_ATTACKS[action.step];
  const distance = Math.hypot(advState.enemy.x - advState.hero.x, advState.enemy.y - advState.hero.y);
  advState.hero.action = combatCore.markPlayerHitResolved(action);
  advState.slashes.push({ x: advState.hero.x, y: advState.hero.y - 48, facing: advState.hero.facing, step: action.step, life: .16, maxLife: .16 });
  advState.slashes = advState.slashes.slice(-4);
  if (!advState.enemy.alive || distance > spec.range) {
    advState.combo = 0; advState.comboTimer = 0; advState.message = `第 ${action.step} 段落空：命中窗口已结束，但目标不在 ${spec.range} 范围内。`; advAudio.cue('miss'); syncAdventureUI(); return;
  }
  advState.enemy.hp = Math.max(0, advState.enemy.hp - spec.damage);
  advState.enemy.x = combatCore.clamp(advState.enemy.x + advState.hero.facing * spec.knockback, 70, 900);
  advState.enemy.hitTimer = action.step === 3 ? .26 : .16;
  advState.enemy.brain = { state: 'hit', elapsed: 0, strikeResolved: false };
  advState.combo += 1; advState.comboTimer = .82; advState.flash = .16; advState.hitStop = action.step === 3 ? .075 : .045;
  advState.shake = advReducedMotion ? 0 : (action.step === 3 ? 9 : 4);
  spawnAdventureBurst(advState.enemy.x, advState.enemy.y - 62, 8 + action.step * 4, action.step === 3 ? '#fff0a6' : '#7de3dc', 1 + action.step * .12);
  advState.message = action.step === 3 ? `重击命中：${spec.damage} 伤害、强击退和更长命中停顿。` : `第 ${action.step} 段命中：${spec.damage} 伤害，只结算一次。`;
  advAudio.cue(action.step === 3 ? 'heavy' : 'hit');
  if (advState.enemy.hp <= 0) {
    advState.enemy.alive = false; advState.enemy.brain = { state: 'dead', elapsed: 0, strikeResolved: true };
    advState.message = '潮木守卫倒下：预警、时序、命中和反馈形成了完整闭环。'; advAudio.cue('defeat');
  }
  syncAdventureUI();
}

function resolveEnemyStrike() {
  const brain = advState.enemy.brain;
  if (brain.state !== 'active' || brain.strikeResolved || advState.hero.hp <= 0) return;
  brain.strikeResolved = true;
  const distance = Math.hypot(advState.enemy.x - advState.hero.x, advState.enemy.y - advState.hero.y);
  if (distance > combatCore.ENEMY_TIMING.range + 18) {
    advState.message = '闪避成功：敌人的根爪落空。'; advAudio.cue('miss'); syncAdventureUI(); return;
  }
  advState.hero.hp = Math.max(0, advState.hero.hp - combatCore.ENEMY_TIMING.damage);
  advState.hero.hitTimer = .24; advState.damageFlash = .32; advState.hitStop = .05; advState.combo = 0; advState.comboTimer = 0;
  advState.hero.x = combatCore.clamp(advState.hero.x - advState.enemy.facing * 28, 55, 905);
  advState.shake = advReducedMotion ? 0 : 7; spawnAdventureBurst(advState.hero.x, advState.hero.y - 48, 10, '#e16f5a', 1);
  advState.message = advState.hero.hp > 0 ? `受击：生命 -${combatCore.ENEMY_TIMING.damage}。红色预警结束前可以拉开距离。` : '漂流者失去行动。重置战斗后再尝试阅读预警。';
  advAudio.cue('hurt'); syncAdventureUI();
}

function drawPixelCharacter(ctx, x, y, facing, enemy = false, hit = false) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  const shadowWidth = enemy ? 78 : 62;
  ctx.fillStyle = 'rgba(0,0,0,.48)'; ctx.beginPath(); ctx.ellipse(0, 26, shadowWidth / 2, 9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.scale(facing, 1);
  const asset = enemy ? visualAssets.enemy : visualAssets.hero;
  if (asset.complete && asset.naturalWidth) {
    const height = enemy ? 142 : 148;
    const width = height * (asset.naturalWidth / asset.naturalHeight);
    if (hit) ctx.filter = 'brightness(2.2) saturate(.55)';
    ctx.drawImage(asset, -width / 2, 29 - height, width, height);
    ctx.filter = 'none';
  } else {
    ctx.fillStyle = enemy ? (hit ? '#fff1c2' : '#8fc35f') : '#d9a857'; ctx.fillRect(-15, -44, 30, 27);
    ctx.fillStyle = enemy ? '#3c6f42' : '#315b70'; ctx.fillRect(-20, -17, 40, 34);
    ctx.fillStyle = enemy ? '#263e2e' : '#182b39'; ctx.fillRect(-18, 17, 14, 18); ctx.fillRect(4, 17, 14, 18);
  }
  ctx.restore();
}

function atlasFrameForHero(time) {
  if (advState.hero.hp <= 0 || advState.hero.hitTimer > 0) return [3, Math.min(3, Math.floor((.24 - advState.hero.hitTimer) * 12))];
  const action = advState.hero.action;
  if (action) {
    if (action.phase === 'startup') return [2, action.step === 3 ? 1 : 0];
    if (action.phase === 'active') return [2, 2];
    return [2, 3];
  }
  const moving = [...advKeys].some((key) => ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyW','KeyA','KeyS','KeyD'].includes(key));
  return [moving ? 1 : 0, Math.floor(time * (moving ? 7 : 3)) % 4];
}

function atlasFrameForEnemy(time) {
  const state = advState.enemy.brain.state;
  if (state === 'dead') return [3, Math.min(3, 2 + Math.floor(advState.enemy.brain.elapsed * 4))];
  if (state === 'hit') return [3, advState.enemy.hitTimer > .1 ? 0 : 1];
  if (state === 'telegraph') return [2, advState.enemy.brain.elapsed > combatCore.ENEMY_TIMING.telegraph * .5 ? 1 : 0];
  if (state === 'active') return [2, 2];
  if (state === 'recovery') return [2, 3];
  const walking = state === 'chase' && Math.abs(advState.enemy.x - advState.hero.x) > 80;
  return [walking ? 1 : 0, Math.floor(time * (walking ? 5 : 2.5)) % 4];
}

function drawAtlasCharacter(ctx, image, row, column, x, y, height, facing, naturalFacing, hit = false) {
  const sw = image.naturalWidth / 4, sh = image.naturalHeight / 4;
  const width = height * (sw / sh);
  ctx.save(); ctx.translate(Math.round(x), Math.round(y));
  ctx.fillStyle = 'rgba(0,0,0,.48)'; ctx.beginPath(); ctx.ellipse(0, 24, width * .27, 9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.scale(facing === naturalFacing ? 1 : -1, 1);
  if (hit) ctx.filter = 'brightness(2.4) saturate(.45)';
  ctx.drawImage(image, column * sw, row * sh, sw, sh, -width / 2, 30 - height, width, height);
  ctx.restore();
}

function drawCoverImage(ctx, image, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale, sourceHeight = height / scale;
  const sx = (image.naturalWidth - sourceWidth) / 2;
  const sy = Math.max(0, (image.naturalHeight - sourceHeight) * .58);
  ctx.drawImage(image, sx, sy, sourceWidth, sourceHeight, 0, 0, width, height);
}

function drawAdventure() {
  const ctx = advCtx;
  const w = adventureCanvas.width, h = adventureCanvas.height;
  const sx = advState.shake && !advReducedMotion ? (Math.random() - .5) * advState.shake : 0;
  const sy = advState.shake && !advReducedMotion ? (Math.random() - .5) * advState.shake : 0;
  ctx.save(); ctx.translate(sx, sy);
  const enhanced = advState.visualMode === 'enhanced';
  if (enhanced && visualAssets.forest.complete && visualAssets.forest.naturalWidth) {
    ctx.save(); ctx.translate((advState.hero.x - 480) * -.012, 0); drawCoverImage(ctx, visualAssets.forest, w + 16, h); ctx.restore();
  }
  else {
    ctx.fillStyle = '#263d2f'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#705947'; ctx.fillRect(0, 250, w, 126);
    ctx.fillStyle = '#182c24'; for (let i = 0; i < 10; i += 1) ctx.fillRect(i * 106 - 18, 130 + (i % 3) * 20, 56, 150);
  }
  const shade = ctx.createLinearGradient(0, 0, 0, h);
  shade.addColorStop(0, 'rgba(2,9,13,.22)'); shade.addColorStop(.54, 'rgba(3,10,12,.02)'); shade.addColorStop(1, 'rgba(2,8,8,.36)');
  ctx.fillStyle = shade; ctx.fillRect(0, 0, w, h);
  const time = performance.now() * .001;
  ctx.fillStyle = 'rgba(153,213,207,.045)';
  for (let i = 0; i < 5; i += 1) {
    const mistX = ((time * (10 + i * 2) + i * 220) % 1180) - 160;
    ctx.beginPath(); ctx.ellipse(mistX, 285 + i * 25, 170, 20, 0, 0, Math.PI * 2); ctx.fill();
  }
  for (let i = 0; i < 18; i += 1) {
    const gx = 75 + ((i * 193) % 825) + Math.sin(time * .7 + i) * 8;
    const gy = 95 + ((i * 71) % 250) + Math.cos(time * .55 + i * .8) * 6;
    const alpha = .25 + (Math.sin(time * 1.5 + i) + 1) * .22;
    ctx.fillStyle = `rgba(91,229,216,${alpha})`; ctx.fillRect(Math.round(gx), Math.round(gy), i % 3 === 0 ? 3 : 2, i % 3 === 0 ? 3 : 2);
  }
  const heroFrame = atlasFrameForHero(time);
  if (enhanced && visualAssets.heroAtlas.complete && visualAssets.heroAtlas.naturalWidth) drawAtlasCharacter(ctx, visualAssets.heroAtlas, heroFrame[0], heroFrame[1], advState.hero.x, advState.hero.y, 176, advState.hero.facing, 1, advState.hero.hitTimer > 0);
  else drawPixelCharacter(ctx, advState.hero.x, advState.hero.y, advState.hero.facing, false, advState.hero.hitTimer > 0);

  if (advState.enemy.alive && advState.enemy.brain.state === 'telegraph') {
    const p = combatCore.clamp(advState.enemy.brain.elapsed / combatCore.ENEMY_TIMING.telegraph, 0, 1);
    ctx.strokeStyle = `rgba(232,92,73,${.35 + p * .6})`; ctx.lineWidth = 4 + p * 5; ctx.beginPath(); ctx.arc(advState.enemy.x, advState.enemy.y + 16, 46 + p * 28, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(232,92,73,${.08 + p * .12})`; ctx.fill();
  }

  const enemyFrame = atlasFrameForEnemy(time);
  if (enhanced && visualAssets.enemyAtlas.complete && visualAssets.enemyAtlas.naturalWidth) drawAtlasCharacter(ctx, visualAssets.enemyAtlas, enemyFrame[0], enemyFrame[1], advState.enemy.x, advState.enemy.y, 188, advState.enemy.facing, -1, advState.flash > 0);
  else if (advState.enemy.alive || advState.enemy.brain.state === 'dead') drawPixelCharacter(ctx, advState.enemy.x, advState.enemy.y, advState.enemy.facing, true, advState.flash > 0);

  advState.slashes.forEach((slash) => {
    const alpha = slash.life / slash.maxLife; ctx.save(); ctx.globalAlpha = alpha;
    ctx.strokeStyle = slash.step === 3 ? '#fff0a6' : '#8fe1e8'; ctx.lineWidth = 6 + slash.step * 2; ctx.beginPath();
    const start = slash.facing > 0 ? -.9 : Math.PI - .9; ctx.arc(slash.x, slash.y, 64 + slash.step * 12, start, start + slash.facing * 1.8); ctx.stroke(); ctx.restore();
  });
  advState.particles.forEach((p) => { ctx.save(); ctx.globalAlpha = combatCore.clamp(p.life / p.maxLife, 0, 1); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size); ctx.restore(); });

  if (enhanced) {
    ctx.fillStyle = 'rgba(6,18,15,.82)';
    for (let i = 0; i < 11; i += 1) {
      const x = i * 100 + Math.sin(time * .35 + i) * 10; const y = h - 8 - (i % 3) * 8;
      ctx.beginPath(); ctx.ellipse(x, y, 58, 13, -.25 + (i % 2) * .5, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (advState.damageFlash > 0) {
    const grd = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, 520);
    grd.addColorStop(0, 'rgba(120,16,10,0)'); grd.addColorStop(1, `rgba(190,35,20,${advState.damageFlash * .75})`); ctx.fillStyle = grd; ctx.fillRect(0, 0, w, h);
  }
  ctx.restore();
}

let advLast = performance.now();
function adventureLoop(now) {
  const dt = Math.min(.04, (now - advLast) / 1000); advLast = now;
  if (activeCase === 'adventure') {
    if (advState.hitStop > 0) {
      advState.hitStop = Math.max(0, advState.hitStop - dt); drawAdventure(); requestAnimationFrame(adventureLoop); return;
    }
    let mx = 0, my = 0;
    if (advKeys.has('ArrowLeft') || advKeys.has('KeyA')) mx -= 1;
    if (advKeys.has('ArrowRight') || advKeys.has('KeyD')) mx += 1;
    if (advKeys.has('ArrowUp') || advKeys.has('KeyW')) my -= 1;
    if (advKeys.has('ArrowDown') || advKeys.has('KeyS')) my += 1;
    const len = Math.hypot(mx, my) || 1; const actionSpeed = advState.hero.action ? .38 : 1;
    if (advState.hero.hp > 0 && advState.hero.hitTimer <= 0) {
      advState.hero.x = combatCore.clamp(advState.hero.x + mx / len * 175 * dt * actionSpeed, 55, 905);
      advState.hero.y = combatCore.clamp(advState.hero.y + my / len * 120 * dt * actionSpeed, 270, 382);
      if (mx && !advState.hero.action) advState.hero.facing = Math.sign(mx);
    }
    advState.comboTimer = Math.max(0, advState.comboTimer - dt);
    if (!advState.comboTimer && !advState.hero.action) { advState.attackStep = 0; advState.combo = 0; }
    advState.flash = Math.max(0, advState.flash - dt); advState.damageFlash = Math.max(0, advState.damageFlash - dt); advState.shake = Math.max(0, advState.shake - 35 * dt);
    advState.hero.hitTimer = Math.max(0, advState.hero.hitTimer - dt);
    advState.particles.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 180 * dt; p.life -= dt; });
    advState.particles = advState.particles.filter((p) => p.life > 0);
    advState.slashes.forEach((slash) => { slash.life -= dt; }); advState.slashes = advState.slashes.filter((slash) => slash.life > 0);

    if (advState.hero.action) {
      const advanced = combatCore.advancePlayerAttack(advState.hero.action, dt); advState.hero.action = advanced.action;
      if (advanced.events.includes('entered-active')) resolvePlayerHit();
      if (advanced.events.includes('completed')) {
        advState.hero.action = null;
        if (advState.bufferedAttack > 0 && advState.comboTimer > 0) { advState.bufferedAttack -= 1; attackAdventure(); }
      }
    }

    if (advState.enemy.alive) {
      const distance = Math.hypot(advState.hero.x - advState.enemy.x, advState.hero.y - advState.enemy.y);
      advState.enemy.facing = advState.hero.x < advState.enemy.x ? -1 : 1;
      if (advState.enemy.brain.state === 'hit') {
        advState.enemy.hitTimer = Math.max(0, advState.enemy.hitTimer - dt);
        if (!advState.enemy.hitTimer) advState.enemy.brain = combatCore.createEnemyBrain('chase');
      } else {
        const advancedEnemy = combatCore.advanceEnemyBrain(advState.enemy.brain, dt, distance); advState.enemy.brain = advancedEnemy.brain;
        if (advState.enemy.brain.state === 'chase' && distance > 78 && distance < 360) advState.enemy.x += Math.sign(advState.hero.x - advState.enemy.x) * 34 * dt;
        if (advancedEnemy.events.includes('telegraph-started')) { advState.message = '红色圆环正在收紧：这是敌人的攻击预警。'; advAudio.cue('warning'); syncAdventureUI(); }
        resolveEnemyStrike();
      }
    } else {
      advState.enemy.brain.elapsed += dt;
    }
    syncAdventureUI();
    drawAdventure();
  }
  requestAnimationFrame(adventureLoop);
}
requestAnimationFrame(adventureLoop);

function setAdvKey(code, pressed) { if (pressed) advKeys.add(code); else advKeys.delete(code); }
function nudgeAdventure(code) {
  const step = 12;
  if (code === 'ArrowLeft') { advState.hero.x -= step; advState.hero.facing = -1; }
  if (code === 'ArrowRight') { advState.hero.x += step; advState.hero.facing = 1; }
  if (code === 'ArrowUp') advState.hero.y -= step;
  if (code === 'ArrowDown') advState.hero.y += step;
  advState.hero.x = combatCore.clamp(advState.hero.x, 55, 905);
  advState.hero.y = combatCore.clamp(advState.hero.y, 270, 382);
}

function setAdventureFixture(name) {
  resetAdventure();
  if (name === 'contact') {
    advState.hero.x = 525; advState.enemy.x = 642; advState.message = '验证场景：目标已进入第一段攻击范围。';
  } else if (name === 'telegraph') {
    advState.hero.x = 575; advState.enemy.x = 640; advState.enemy.brain = combatCore.createEnemyBrain('chase'); advState.message = '验证场景：敌人即将进入预警。';
  } else if (name === 'miss') {
    advState.hero.x = 260; advState.enemy.x = 700; advState.message = '验证场景：目标位于攻击范围外。';
  }
  syncAdventureUI(); return JSON.parse(JSON.stringify(advState));
}
document.querySelectorAll('[data-adv-key]').forEach((button) => {
  button.addEventListener('pointerdown', (event) => { button.setPointerCapture?.(event.pointerId); nudgeAdventure(button.dataset.advKey); setAdvKey(button.dataset.advKey, true); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => button.addEventListener(name, () => setAdvKey(button.dataset.advKey, false)));
});
document.querySelector('#adv-attack').addEventListener('click', attackAdventure);
document.querySelector('#adv-reset').addEventListener('click', resetAdventure);
document.querySelector('#adv-audio').addEventListener('click', () => { advAudio.muted = !advAudio.muted; if (!advAudio.muted) { advAudio.unlock(); advAudio.cue('reset'); } syncAdventureUI(); });
document.querySelector('#adv-visual-mode').addEventListener('click', () => { advState.visualMode = advState.visualMode === 'enhanced' ? 'baseline' : 'enhanced'; advState.message = advState.visualMode === 'enhanced' ? '增强视觉：动作图集、分层氛围与完整反馈已开启。' : '机制基线：保留静态角色身份和战斗规则，关闭动作图集、场景媒体与分层表现。'; syncAdventureUI(); });

window.addEventListener('keydown', (event) => {
  if (activeCase !== 'adventure') return;
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyW','KeyA','KeyS','KeyD','Space'].includes(event.code)) event.preventDefault();
  if (event.code === 'Space' && !event.repeat) attackAdventure(); else setAdvKey(event.code, true);
});
window.addEventListener('keyup', (event) => setAdvKey(event.code, false));
window.addEventListener('blur', () => advKeys.clear());
syncAdventureUI();

// Online: an explicit, persistent item-state proof.
const INVENTORY_KEY = 'research08:capability-lab:inventory-v1';
const initialItems = [
  { id: 'knife', name: '石制小刀', kind: '工具', slot: 'tool', gather: 2, guard: 0, value: 2, color: '#9db3ae', copy: '简单但可靠的切割工具，提高基础采集效率。' },
  { id: 'axe', name: '漂流斧', kind: '工具', slot: 'tool', gather: 5, guard: 1, value: 4, color: '#d7a765', copy: '更高的木材采集效率，同时提供少量防护。' },
  { id: 'coat', name: '防雨外套', kind: '服装', slot: 'body', gather: 0, guard: 5, value: 5, color: '#4d8390', copy: '湿冷环境中的基础保护，主要提高耐久。' },
  { id: 'rope', name: '结实绳索', kind: '材料', slot: null, gather: 1, guard: 1, value: 3, color: '#b89d6d', copy: '营地制作材料，暂时不能直接装备。' },
  { id: 'shell', name: '海螺碎片', kind: '材料', slot: null, gather: 0, guard: 0, value: 2, color: '#d58fa7', copy: '可拆解为材料，用于验证不可装备物品的分支。' },
  { id: 'torch', name: '防风火把', kind: '工具', slot: 'tool', gather: 3, guard: 2, value: 4, color: '#e68345', copy: '兼顾探索和夜间安全的工具。' },
];
let inventoryState = { items: initialItems.map((item) => ({ ...item })), equipped: { tool: null, body: null }, essence: 0, selected: 'knife' };

function restoreInventory() {
  try {
    const raw = localStorage.getItem(INVENTORY_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.items) || !parsed.equipped) return;
    inventoryState = parsed;
  } catch { /* preserve clean initial state */ }
}
function saveInventory() {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventoryState));
  const badge = document.querySelector('#save-indicator');
  badge.textContent = '已保存'; window.setTimeout(() => { badge.textContent = '本地保存开启'; }, 700);
}
function selectedItem() { return inventoryState.items.find((item) => item.id === inventoryState.selected) || inventoryState.items[0] || null; }
function renderInventory() {
  const grid = document.querySelector('#inventory-grid');
  grid.replaceChildren(...inventoryState.items.map((item) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'inventory-item'; button.role = 'option';
    button.dataset.itemId = item.id; button.setAttribute('aria-selected', String(item.id === inventoryState.selected));
    if (Object.values(inventoryState.equipped).includes(item.id)) button.classList.add('is-equipped');
    button.style.setProperty('--item-color', item.color); button.innerHTML = `<i data-icon="${item.id}" aria-hidden="true"></i><strong>${item.name}</strong>`;
    button.addEventListener('click', () => { inventoryState.selected = item.id; renderInventory(); });
    return button;
  }));
  const item = selectedItem();
  const hasItem = Boolean(item);
  document.querySelector('#item-kind').textContent = item?.kind?.toUpperCase() || 'EMPTY';
  document.querySelector('#item-name').textContent = item?.name || '背包已清空';
  document.querySelector('#item-copy').textContent = item?.copy || '重置实验可以恢复初始物品。';
  document.querySelector('#item-gather').textContent = item ? `+${item.gather}` : '+0';
  document.querySelector('#item-guard').textContent = item ? `+${item.guard}` : '+0';
  document.querySelector('#equip-item').disabled = !hasItem || !item.slot;
  document.querySelector('#salvage-item').disabled = !hasItem;
  const tool = inventoryState.items.find((entry) => entry.id === inventoryState.equipped.tool);
  const body = inventoryState.items.find((entry) => entry.id === inventoryState.equipped.body);
  document.querySelector('#slot-tool').textContent = tool?.name || '空';
  document.querySelector('#slot-body').textContent = body?.name || '旧衬衫';
  document.querySelector('#stat-gather').textContent = String(10 + (tool?.gather || 0) + (body?.gather || 0));
  document.querySelector('#stat-guard').textContent = String(8 + (tool?.guard || 0) + (body?.guard || 0));
  document.querySelector('#stat-essence').textContent = String(inventoryState.essence);
}
restoreInventory(); renderInventory();
document.querySelector('#equip-item').addEventListener('click', () => {
  const item = selectedItem(); if (!item?.slot) return;
  inventoryState.equipped[item.slot] = item.id; saveInventory(); renderInventory();
  document.querySelector('#inventory-feedback').textContent = `${item.name} 已装备，角色属性重新计算并保存。`;
});
document.querySelector('#salvage-item').addEventListener('click', () => {
  const item = selectedItem(); if (!item) return;
  Object.keys(inventoryState.equipped).forEach((slot) => { if (inventoryState.equipped[slot] === item.id) inventoryState.equipped[slot] = null; });
  inventoryState.essence += item.value; inventoryState.items = inventoryState.items.filter((entry) => entry.id !== item.id);
  inventoryState.selected = inventoryState.items[0]?.id || null; saveInventory(); renderInventory();
  document.querySelector('#inventory-feedback').textContent = `${item.name} 已拆解为 ${item.value} 份材料，装备引用同步清除。`;
});
document.querySelector('#reset-inventory').addEventListener('click', () => {
  localStorage.removeItem(INVENTORY_KEY);
  inventoryState = { items: initialItems.map((item) => ({ ...item })), equipped: { tool: null, body: null }, essence: 0, selected: 'knife' };
  renderInventory(); document.querySelector('#inventory-feedback').textContent = '本地状态已清除，实验恢复初始状态。';
});

window.__CAPABILITY_LAB__ = {
  get activeCase() { return activeCase; }, selectCase, resetAdventure, setAdventureFixture,
  getAdventureState: () => JSON.parse(JSON.stringify(advState)),
  getInventoryState: () => JSON.parse(JSON.stringify(inventoryState)),
};
const requestedCombatFixture = new URLSearchParams(window.location.search).get('combat');
if (['contact', 'telegraph', 'miss'].includes(requestedCombatFixture)) setAdventureFixture(requestedCombatFixture);
document.documentElement.dataset.labState = 'ready';
window.setTimeout(() => {
  if (document.documentElement.dataset.threeStatus === 'booting') {
    document.documentElement.dataset.threeStatus = 'failed';
    document.querySelector('#backroom-feedback').textContent = 'Three.js增强层未能启动，文字证据仍然可用。';
    document.querySelector('#town-feedback').textContent = 'Three.js增强层未能启动，建造说明仍然可用。';
  }
}, 5000);
