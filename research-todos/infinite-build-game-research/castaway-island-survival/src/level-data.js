import * as THREE from 'three';

export const LEVEL = {
  id: 'south-bay-v1',
  name: '无名岛 · 南部海湾',
  playerSpawn: new THREE.Vector3(0, 0.18, 43),
  camp: new THREE.Vector3(0, 0.18, 41),
  fire: new THREE.Vector3(2.7, 0.18, 39.8),
  shelter: new THREE.Vector3(-3.2, 0.18, 39.2),
  freshwater: new THREE.Vector3(-24, 0.18, -24),
  lagoon: new THREE.Vector3(28, 0.18, 8),
  fishing: new THREE.Vector3(32, 0.18, 16),
  fallenTree: new THREE.Vector3(-7, 0.18, 18),
  forestPass: new THREE.Vector3(4, 0.18, 1),
  lookout: new THREE.Vector3(8, 0.18, -24),
  signal: new THREE.Vector3(8, 0.5, -88),
  islandRadii: { x: 76, z: 58 },
  zones: [
    { id: 'south-shore', name: '南湾漂流岸', center: [0, 38], radius: 25 },
    { id: 'lagoon', name: '东侧浅潟湖', center: [28, 8], radius: 20 },
    { id: 'freshwater', name: '淡水溪谷', center: [-24, -24], radius: 19 },
    { id: 'basalt-cape', name: '西侧玄武岩岬', center: [-49, -4], radius: 18 },
    { id: 'palm-belt', name: '棕榈林带', center: [3, 1], radius: 39 },
    { id: 'forest-pass', name: '岛心湿润林道', center: [3, 2], radius: 18 },
    { id: 'lookout', name: '北侧山脊观察缘', center: [8, -24], radius: 13 },
  ],
};

export const RESOURCE_SPAWNS = [
  { id: 'driftwood-01', type: 'wood', label: '干燥漂流木', position: [-17, 0.2, 34], rotation: 0.5 },
  { id: 'driftwood-02', type: 'wood', label: '海水冲来的木料', position: [18, 0.2, 31], rotation: -0.9 },
  { id: 'driftwood-03', type: 'wood', label: '倒伏棕榈木', position: [34, 0.2, 17], rotation: 1.2 },
  { id: 'driftwood-04', type: 'wood', label: '晒干的短木', position: [-31, 0.2, 22], rotation: -0.35 },
  { id: 'driftwood-05', type: 'wood', label: '破损船桨木', position: [6, 0.2, 28], rotation: 0.72 },
  { id: 'stone-01', type: 'stone', label: '坚硬石块', position: [-35, 0.2, 9], rotation: 0.1 },
  { id: 'stone-02', type: 'stone', label: '锋利石片', position: [-42, 0.2, -4], rotation: 1.1 },
  { id: 'stone-03', type: 'stone', label: '玄武岩碎块', position: [20, 0.2, 20], rotation: -0.65 },
];

export const OBJECTIVES = [
  {
    title: '寻找可以饮用的淡水',
    detail: '观察地势，沿棕榈林边缘寻找从高处流下的溪流。',
    target: LEVEL.freshwater,
    action: '检查水源',
  },
  {
    title: '收集 4 份木料与 2 块石头',
    detail: '潮线有干木，溪谷与岩岬有锋利石片。它们会成为第一件工具和避雨棚。',
    target: null,
    action: '拾取',
  },
  {
    title: '制作并装备一把石斧',
    detail: '打开背包，把 1 份木料和 2 块石头组合成石斧。制作失败不会损失材料。',
    target: null,
    action: '打开制作',
  },
  {
    title: '返回南湾搭建避雨棚',
    detail: '石斧让你能处理木料。营地需要 3 份木料，棚屋也会保护旁边的火源。',
    target: LEVEL.camp,
    action: '搭建棚屋',
  },
  {
    title: '进入棚下躲过热带阵雨',
    detail: '雨水会持续增加湿度。回到棚下，等待身体变干并确认营火受到保护。',
    target: LEVEL.shelter,
    action: '避雨',
  },
  {
    title: '前往东侧潟湖捕鱼',
    detail: '观察浅水中的鱼群，在礁湖岸边使用简易手线等待咬钩。',
    target: LEVEL.fishing,
    action: '手线捕鱼',
  },
  {
    title: '把鱼带回营火烤熟',
    detail: '生鱼并不安全。返回被棚屋保护的营火，准备第一顿可靠食物。',
    target: LEVEL.camp,
    action: '烤鱼',
  },
  {
    title: '第一日生存完成',
    detail: '淡水、工具、棚屋、火源与食物形成了第一条完整生存链。岛屿开始成为可以理解的家园。',
    target: null,
    action: '',
  },
  {
    title: '收集一份木料，为营火准备过夜燃料',
    detail: '日落后气温会下降。沿南湾潮线寻找尚未使用的干燥漂流木。',
    target: null,
    action: '拾取燃料',
  },
  {
    title: '返回营地给营火添柴',
    detail: '营火不再是永久光源。把木料加入火堆，确保棚屋周围在夜里保持温暖。',
    target: LEVEL.camp,
    action: '补充燃料',
  },
  {
    title: '进入棚屋休息到黎明',
    detail: '火源已经稳定。走进棚屋休息，让体力、湿度和时间进入第二日清晨。',
    target: LEVEL.shelter,
    action: '睡到黎明',
  },
  {
    title: '第二日清晨',
    detail: '营地、工具和食物已经保存。吃过早餐后，沿岛心林道确认这座岛到底有多大。',
    target: null,
    action: '',
  },
  {
    title: '吃掉昨夜留下的烤鱼',
    detail: '探索岛心需要体力。打开背包食用烤鱼；食物只有确认食用后才会从背包扣除。',
    target: null,
    action: '食用烤鱼',
  },
  {
    title: '出发前补满淡水',
    detail: '北侧林道远离营地。先到溪谷补水，并确认这条溪流仍然可靠。',
    target: LEVEL.freshwater,
    action: '补充淡水',
  },
  {
    title: '用石斧清理倒木',
    detail: '昨夜的海风放倒了棕榈，封住唯一清晰的林间通道。石斧现在第一次成为探索工具。',
    target: LEVEL.fallenTree,
    action: '劈开倒木',
  },
  {
    title: '穿过湿润林道',
    detail: '跟随裸露土径和密林边缘向北，经过蕨类、集水洼地与玄武岩碎块。',
    target: LEVEL.forestPass,
    action: '辨认路线',
  },
  {
    title: '抵达岛心观察缘',
    detail: '这里仍是平坦安全的可行走面，但周围山脊与岩壁提供了能看见远海的地理窗口。',
    target: LEVEL.lookout,
    action: '走到观察缘',
  },
  {
    title: '观察海鸟与远海',
    detail: '海鸟突然集中飞向北侧海面。停下来辨认风向、浪线和地平线上的异常。',
    target: LEVEL.lookout,
    action: '观察远海',
  },
  {
    title: '风暴逼近，返回南湾营地',
    detail: '北侧远海出现持续烟柱，而更近的积雨云正压向岛屿。先把发现安全带回营地。',
    target: LEVEL.camp,
    action: '返回营地',
  },
  {
    title: '第二日侦察完成',
    detail: '你已经打通岛心路线、找到观察点，并确认远海存在不自然的烟柱。下一步将围绕风暴准备与信号调查展开。',
    target: null,
    action: '',
  },
];

export function isNavigable(position) {
  const nx = position.x / LEVEL.islandRadii.x;
  const nz = position.z / LEVEL.islandRadii.z;
  return nx * nx + nz * nz <= 0.94;
}

export function getZone(position) {
  let best = LEVEL.zones[LEVEL.zones.length - 1];
  let bestScore = Infinity;
  for (const zone of LEVEL.zones) {
    const dx = position.x - zone.center[0];
    const dz = position.z - zone.center[1];
    const normalized = Math.hypot(dx, dz) / zone.radius;
    if (normalized < bestScore) {
      best = zone;
      bestScore = normalized;
    }
  }
  return best;
}
