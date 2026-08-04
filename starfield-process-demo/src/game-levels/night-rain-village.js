export const NIGHT_RAIN_LEVEL = {
  id: 'night-rain-village-01',
  planeY: 0,
  bounds: { minX: -8.35, maxX: 8.35, minZ: -5.55, maxZ: 5.35 },
  spawn: { id: 'village-shelter', x: -7.15, z: 3.65, role: 'recovery' },
  movement: { speed: 2.7, hazardMultiplier: 0.54 },
  navigation: {
    route: [
      [-7.15, 3.65],
      [-5.1, 2.8],
      [-3.55, 1.92],
      [-1.15, -0.42],
      [1.35, -0.32],
      [3.95, 0.62],
      [1.8, 1.38],
      [-1.2, 1.2],
      [-4.6, 2.75],
      [-7.15, 3.65],
    ],
  },
  colliders: [
    { id: 'house-center', x: 0.2, z: 1.15, width: 1.72, depth: 1.42 },
    { id: 'house-north', x: -1.95, z: 2.15, width: 1.48, depth: 1.18 },
    { id: 'house-east', x: 1.95, z: 1.85, width: 1.42, depth: 1.18 },
    { id: 'house-far-east', x: 5.5, z: 2.4, width: 1.62, depth: 1.28 },
  ],
  objectives: [
    { id: 'gate-drain', x: -5.1, z: 2.8, title: '检查村口排水口', copy: '确认排水沟没有被树枝和泥沙完全堵住。', zone: '村口排水口' },
    { id: 'field-pump', x: -1.15, z: -0.42, title: '重启农田泵站', copy: '穿过浅积水区域，恢复农田低洼处的排水泵。', zone: '河谷泵站' },
    { id: 'east-road', x: 3.95, z: 0.62, title: '标记东侧受阻道路', copy: '记录东侧道路积水位置，为救援车辆保留绕行路线。', zone: '东侧道路' },
  ],
  pickups: [
    { id: 'emergency-map', x: -3.55, z: 1.92, title: '应急路线图', effect: 'map', zone: '村中路口' },
    { id: 'spare-battery', x: 1.35, z: -0.32, title: '备用电池', effect: 'battery', zone: '农田工具箱' },
  ],
  hazards: [
    { id: 'ravine-water', x: -1.05, z: -0.2, radius: 1.05, riskPerSecond: 17, title: '河谷浅积水' },
    { id: 'east-road-water', x: 3.0, z: 0.82, width: 1.9, depth: 1.15, riskPerSecond: 20, title: '东侧道路积水' },
  ],
  recovery: { id: 'village-shelter', x: -7.15, z: 3.65, radius: 0.9, recoveryPerSecond: 24, title: '村口安全点' },
  exit: { id: 'rescue-beacon', x: -6.82, z: 3.35, radius: 0.88, title: '村口救援灯标' },
  lightInventory: [
    { emitterId: 'player-lamp', lightId: 'player-flashlight', type: 'spot', range: 6.5, enabledState: 'game-active', fallback: 'emissive player marker' },
    { emitterId: 'gate-drain', lightId: 'objective-gate-drain', type: 'point', range: 2.6, enabledState: 'objective-visible', fallback: 'emissive objective beacon' },
    { emitterId: 'field-pump', lightId: 'objective-field-pump', type: 'point', range: 2.6, enabledState: 'objective-visible', fallback: 'emissive objective beacon' },
    { emitterId: 'east-road', lightId: 'objective-east-road', type: 'point', range: 2.6, enabledState: 'objective-visible', fallback: 'emissive objective beacon' },
    { emitterId: 'rescue-beacon', lightId: 'rescue-beacon-light', type: 'point', range: 4.8, enabledState: 'game-active', fallback: 'emissive rescue beacon' },
  ],
};

function insideBounds(point, bounds) {
  return point.x >= bounds.minX && point.x <= bounds.maxX && point.z >= bounds.minZ && point.z <= bounds.maxZ;
}

function insideCollider(point, collider, padding = 0.06) {
  return Math.abs(point.x - collider.x) < collider.width / 2 + padding
    && Math.abs(point.z - collider.z) < collider.depth / 2 + padding;
}

export function validateNightRainLevel(level = NIGHT_RAIN_LEVEL) {
  const errors = [];
  const ids = new Set();
  const addId = (id, type) => {
    if (!id) errors.push(`${type} 缺少稳定 ID`);
    else if (ids.has(id) && id !== level.recovery.id) errors.push(`重复 ID: ${id}`);
    else ids.add(id);
  };

  if (level.planeY !== 0) errors.push('游戏平面必须保持在 Y=0');
  addId(level.id, '关卡');
  addId(level.spawn.id, '出生点');
  level.colliders.forEach((item) => addId(item.id, '碰撞体'));
  level.objectives.forEach((item) => addId(item.id, '任务点'));
  level.pickups.forEach((item) => addId(item.id, '物资'));
  level.hazards.forEach((item) => addId(item.id, '危险区'));
  addId(level.exit.id, '出口');

  const anchors = [level.spawn, ...level.objectives, ...level.pickups, ...level.hazards, level.recovery, level.exit];
  anchors.forEach((point) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) errors.push(`锚点坐标无效: ${point.id}`);
    else if (!insideBounds(point, level.bounds)) errors.push(`锚点超出边界: ${point.id}`);
  });
  level.navigation.route.forEach(([x, z], index) => {
    if (!insideBounds({ x, z }, level.bounds)) errors.push(`路线节点超出边界: route-${index}`);
  });
  [...level.objectives, ...level.pickups, level.spawn, level.exit].forEach((point) => {
    if (level.colliders.some((collider) => insideCollider(point, collider))) errors.push(`交互锚点落在碰撞体内: ${point.id}`);
  });

  const emitterIds = new Set(['player-lamp', ...level.objectives.map((item) => item.id), level.exit.id]);
  level.lightInventory.forEach((entry) => {
    if (!emitterIds.has(entry.emitterId)) errors.push(`灯光缺少可见发光体: ${entry.lightId}`);
  });

  return { valid: errors.length === 0, errors };
}
