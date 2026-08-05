const systems = {
  geography: {
    index: 'SYSTEM 01 / WORLD FOUNDATION',
    title: '地理系统',
    summary: '高度、坡度、水流、海岸和土壤决定资源在哪里、路线如何形成，也是生态与天气落地的基础。',
    state: '高度、坡度、朝向、水深、土壤、淡水距离、风浪暴露度。',
    rule: '水从高处汇入低谷；海浪塑造岩岸与沙湾；坡度和土壤约束植物分布。',
    presentation: '山体轮廓、溪流方向、湿润植物、潮线、岩层和远处地标共同说明路线。',
    evidence: '玩家不看箭头，也能从海滩找到淡水、判断高地并解释资源为何出现在这里。',
    connections: ['气候', '生态', '资源', '探索路线'],
  },
  climate: {
    index: 'SYSTEM 02 / ENVIRONMENT DRIVER',
    title: '气候系统',
    summary: '太阳、温度、湿度、风、云、降雨和潮汐形成连续环境，而不是彼此独立的天气按钮。',
    state: '时间、太阳高度、气温、湿度、气压、风向、风速、云量、雨量、潮位。',
    rule: '气压和湿度推动云雨状态；风影响云、海浪、火焰与体感；昼夜改变温度和生物活动。',
    presentation: '天空颜色、云层速度、植被摆动、浪高、雨雾、光照、环境声和人物动作同步变化。',
    evidence: '玩家在暴雨到来前能从云、风、海浪和动物安静下来预判风险，并提前返回营地。',
    connections: ['海洋', '火堆', '体温', '动物行为'],
  },
  physics: {
    index: 'SYSTEM 03 / CONTACT & MOVEMENT',
    title: '海洋与物理系统',
    summary: '负责人物和物体如何接触世界，以及风浪、水深、坡度和材质如何改变移动与风险。',
    state: '碰撞体、地面法线、坡度、水深、浮力、流向、浪高、表面湿滑度、物体质量。',
    rule: '人物不能穿透实体；坡度限制攀登；水深切换涉水与游泳；海流推动人物和漂浮物。',
    presentation: '脚掌贴地、身体倾斜、涉水阻力、浪花接触、漂浮物轨迹、湿地脚印和碰撞反馈。',
    evidence: '玩家能预测哪里可走、哪里危险；画面中坚硬或深水区域与实际操作结果一致。',
    connections: ['地形', '天气', '人物动作', '船只'],
  },
  ecology: {
    index: 'SYSTEM 04 / LIVING WORLD',
    title: '生态系统',
    summary: '植物和动物属于具体栖息地，它们依据食物、水源、时段、天气与威胁活动，而不是随机装饰。',
    state: '栖息地、种群规模、食物、水源、活动时段、警觉度、巢穴、迁移和再生状态。',
    rule: '近处个体进行行为模拟，远处区域维持种群统计；天气和玩家行为改变出现率与路线。',
    presentation: '鱼群靠近浅礁、岸蟹沿潮线活动、海鸟暴露鱼群，足迹和叫声成为可观察线索。',
    evidence: '玩家能够解释生物为何出现在这里，并利用生物行为寻找水、食物或即将变化的天气。',
    connections: ['地理', '气候', '资源', '玩家知识'],
  },
  player: {
    index: 'SYSTEM 05 / HUMAN CONDITION',
    title: '人物生存系统',
    summary: '用少量但相互关联的状态表达身体压力，让人物表现先于进度条告诉玩家发生了什么。',
    state: '水分、饱食、体温、疲劳、湿度、伤势、负重、熟练度和已获得的环境知识。',
    rule: '奔跑和高温加速失水；潮湿与风降低体温；食物、休息、遮蔽和火源共同恢复状态。',
    presentation: '呼吸、步态、姿势、皮肤和衣物湿润、镜头稳定性、操作节奏以及必要的简洁界面。',
    evidence: '关闭大部分界面后，玩家仍能判断自己冷、累、渴或受伤，并知道可采取什么行动。',
    connections: ['天气', '工具', '营地', '失败与恢复'],
  },
  resources: {
    index: 'SYSTEM 06 / VISIBLE PROGRESSION',
    title: '资源与营地系统',
    summary: '资源来自合理环境，工具改变玩家能做的动作，营地把成长永久留在世界中。',
    state: '资源来源、数量、品质、湿度、重量、再生周期、工具耐久、建筑位置和功能状态。',
    rule: '采集会改变场景；工具开放新资源和路线；建筑必须对遮雨、储水、取暖或储存产生真实作用。',
    presentation: '树枝消失、工具出现在手中、营地逐步成形、储水量可见、湿木颜色和燃烧状态发生变化。',
    evidence: '玩家能在世界中看见自己的历史，且每个建筑和工具都解决一个此前存在的具体问题。',
    connections: ['地理分布', '人物需求', '天气压力', '长期成长'],
  },
  events: {
    index: 'SYSTEM 07 / EMERGENT STORY',
    title: '事件与叙事系统',
    summary: '故事由世界状态、地点和玩家准备共同触发，让发现与后果发生在环境中，而不依赖任务窗口讲述。',
    state: '已发现地点、天气窗口、资源压力、人物知识、营地状态、远方信号和事件冷却。',
    rule: '事件读取世界条件再发生；相同事件根据准备程度产生不同后果；重要变化会永久记录。',
    presentation: '远处烟柱、异常鸟群、搁浅漂流物、风暴痕迹、足迹和营地改变构成环境叙事。',
    evidence: '玩家能讲述“我为什么去那里、看到了什么、如何决定、世界因此怎样改变”，而非复述任务文字。',
    connections: ['探索', '天气窗口', '知识', '长期目标'],
  },
};

const tabs = [...document.querySelectorAll('[data-system]')];
const fields = {
  index: document.querySelector('#system-index'),
  title: document.querySelector('#system-title'),
  summary: document.querySelector('#system-summary'),
  state: document.querySelector('#system-state'),
  rule: document.querySelector('#system-rule'),
  presentation: document.querySelector('#system-presentation'),
  evidence: document.querySelector('#system-evidence'),
  connections: document.querySelector('#system-connections'),
};

function selectSystem(key, shouldFocusPanel = false) {
  const system = systems[key];
  if (!system) return;

  tabs.forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.system === key)));
  fields.index.textContent = system.index;
  fields.title.textContent = system.title;
  fields.summary.textContent = system.summary;
  fields.state.textContent = system.state;
  fields.rule.textContent = system.rule;
  fields.presentation.textContent = system.presentation;
  fields.evidence.textContent = system.evidence;
  fields.connections.replaceChildren(...system.connections.map((label) => {
    const item = document.createElement('b');
    item.textContent = label;
    return item;
  }));

  if (shouldFocusPanel) document.querySelector('#system-panel').focus({ preventScroll: true });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSystem(tab.dataset.system));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
    else nextIndex = (index - 1 + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    selectSystem(tabs[nextIndex].dataset.system);
  });
});

const progressBar = document.querySelector('#reading-progress-bar');
function updateReadingProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
  progressBar.style.width = `${progress * 100}%`;
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const navLinks = [...document.querySelectorAll('.section-nav a[href^="#"]')];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .1, .4] });
  trackedSections.forEach((section) => sectionObserver.observe(section));
}
