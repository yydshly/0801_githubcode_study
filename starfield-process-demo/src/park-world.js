import * as THREE from 'three';

const PARK_WEATHER_PRESETS = {
  clear: { label: '晴天', sky: 0x83aab4, fog: 0.008, rain: false },
  overcast: { label: '阴天', sky: 0x647783, fog: 0.02, rain: false },
  storm: { label: '暴雨', sky: 0x263b4a, fog: 0.035, rain: true },
  fog: { label: '雾天', sky: 0x829493, fog: 0.06, rain: false },
};

const PARK_LAYERS = [
  { id: 'all', label: '全部' },
  { id: 'architecture', label: '建筑' },
  { id: 'circulation', label: '道路' },
  { id: 'greenery', label: '绿化' },
  { id: 'operations', label: '摄像头' },
];

const PARK_WIDTH = 18;
const PARK_DEPTH = 13;

function hash(value) {
  const sine = Math.sin(value * 12.9898) * 43758.5453;
  return sine - Math.floor(sine);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createTree(x, z, scale, materials) {
  const group = new THREE.Group();
  group.position.set(x, 0.06, z);
  group.scale.setScalar(scale);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.7, 7), materials.trunk);
  trunk.position.y = 0.35;
  trunk.castShadow = true;
  const canopy = new THREE.Mesh(new THREE.IcosahedronGeometry(0.54, 1), materials.canopy);
  canopy.position.y = 0.95;
  canopy.scale.set(1, 1.12, 0.92);
  canopy.castShadow = true;
  group.add(trunk, canopy);
  return group;
}

function createBuilding(config, materials) {
  const group = new THREE.Group();
  group.position.set(config.x, 0.06, config.z);
  group.rotation.y = config.rotation ?? 0;
  group.userData = { twinObject: config.twinObject };

  const body = new THREE.Mesh(new THREE.BoxGeometry(config.width, config.height, config.depth), config.material ?? materials.building);
  body.position.y = config.height * 0.5;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(config.width * 1.04, 0.12, config.depth * 1.04), materials.roof);
  roof.position.y = config.height + 0.06;
  roof.castShadow = true;
  group.add(roof);

  const windowMaterial = config.windowMaterial ?? materials.glass;
  const rows = Math.max(2, Math.round(config.height / 0.7));
  const columns = Math.max(2, Math.round(config.width / 0.62));
  const windowGeometry = new THREE.BoxGeometry(0.28, 0.18, 0.025);
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(
        -config.width * 0.35 + column * (config.width * 0.7 / Math.max(1, columns - 1)),
        0.46 + row * 0.58,
        -config.depth * 0.505,
      );
      group.add(window);
      const sideWindow = window.clone();
      sideWindow.rotation.y = Math.PI / 2;
      sideWindow.position.set(config.width * 0.505, window.position.y, -config.depth * 0.33 + column * (config.depth * 0.66 / Math.max(1, columns - 1)));
      group.add(sideWindow);
    }
  }

  if (config.entrance) {
    const entrance = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.6, 0.035), materials.entrance);
    entrance.position.set(0, 0.3, -config.depth * 0.52);
    group.add(entrance);
  }
  return group;
}

function createParkWorld({ compact = false } = {}) {
  const root = new THREE.Group();
  root.name = 'park-site-twin-world';

  const layers = {
    base: new THREE.Group(),
    circulation: new THREE.Group(),
    architecture: new THREE.Group(),
    greenery: new THREE.Group(),
    operations: new THREE.Group(),
    weather: new THREE.Group(),
  };
  Object.values(layers).forEach((layer) => root.add(layer));

  const materials = {
    base: new THREE.MeshStandardMaterial({ color: 0x425b52, roughness: 0.98 }),
    curb: new THREE.MeshStandardMaterial({ color: 0x9b9b87, roughness: 0.9 }),
    road: new THREE.MeshStandardMaterial({ color: 0x3a4a4d, roughness: 0.86, metalness: 0.08 }),
    roadWet: new THREE.MeshStandardMaterial({ color: 0x243f4c, roughness: 0.28, metalness: 0.3 }),
    plaza: new THREE.MeshStandardMaterial({ color: 0x9a9b87, roughness: 0.8 }),
    building: new THREE.MeshStandardMaterial({ color: 0xc6c6b2, roughness: 0.82 }),
    buildingAlt: new THREE.MeshStandardMaterial({ color: 0xabb9b7, roughness: 0.78 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x4b5b5e, roughness: 0.74 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x8dc8cb, emissive: 0x255962, emissiveIntensity: 0.42, roughness: 0.24, metalness: 0.16 }),
    entrance: new THREE.MeshStandardMaterial({ color: 0xffd18a, emissive: 0x7b4b21, emissiveIntensity: 0.52, roughness: 0.32 }),
    lawn: new THREE.MeshStandardMaterial({ color: 0x587b59, roughness: 0.98 }),
    hedge: new THREE.MeshStandardMaterial({ color: 0x365c49, roughness: 0.96 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x5c4936, roughness: 1 }),
    canopy: new THREE.MeshStandardMaterial({ color: 0x5f9866, roughness: 0.94 }),
    water: new THREE.MeshStandardMaterial({ color: 0x4b9aac, roughness: 0.16, metalness: 0.18, transparent: true, opacity: 0.82 }),
    camera: new THREE.MeshStandardMaterial({ color: 0x9beee2, emissive: 0x2a8278, emissiveIntensity: 1.2, roughness: 0.24 }),
    route: new THREE.LineBasicMaterial({ color: 0x92e9dc, transparent: true, opacity: 0.7, depthWrite: false }),
    marker: new THREE.MeshStandardMaterial({ color: 0xffca7e, emissive: 0xa34f1b, emissiveIntensity: 1.32, roughness: 0.24 }),
    rain: new THREE.LineBasicMaterial({ color: 0xb8eaf2, transparent: true, opacity: 0.34, blending: THREE.AdditiveBlending, depthWrite: false }),
  };

  const site = new THREE.Mesh(new THREE.BoxGeometry(PARK_WIDTH, 0.14, PARK_DEPTH), materials.base);
  site.position.y = -0.08;
  site.receiveShadow = true;
  layers.base.add(site);

  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.06, 40), materials.plaza);
  plaza.position.set(0, 0.04, 0.1);
  plaza.receiveShadow = true;
  layers.circulation.add(plaza);

  const roadMeshes = [];
  const roadDefinitions = [
    { id: 'north-loop', title: '北侧环路', x: 0, z: -4.7, width: 17, depth: 0.85, rotation: 0 },
    { id: 'south-loop', title: '南侧环路', x: 0, z: 4.55, width: 17, depth: 0.82, rotation: 0 },
    { id: 'west-road', title: '西侧通道', x: -6.9, z: -0.05, width: 0.8, depth: 10.5, rotation: 0 },
    { id: 'east-road', title: '东侧通道', x: 6.25, z: -0.05, width: 0.78, depth: 10.5, rotation: 0 },
    { id: 'central-road', title: '中央主路', x: 0, z: 0.05, width: 0.58, depth: 9.3, rotation: 0 },
  ];
  roadDefinitions.forEach((definition) => {
    const road = new THREE.Mesh(new THREE.BoxGeometry(definition.width, 0.045, definition.depth), materials.road);
    road.position.set(definition.x, 0.035, definition.z);
    road.rotation.y = definition.rotation;
    road.receiveShadow = true;
    road.userData = {
      twinObject: {
        id: definition.id,
        kind: 'road',
        title: definition.title,
        typeLabel: '道路',
        status: '通行中',
        copy: '这条道路把园区入口、建筑和中庭连接起来，是导览与巡检路线的空间骨架。',
      },
    };
    layers.circulation.add(road);
    roadMeshes.push(road);
    const curb = new THREE.Mesh(new THREE.BoxGeometry(definition.width + 0.08, 0.055, 0.08), materials.curb);
    curb.position.set(definition.x, 0.07, definition.z - definition.depth * 0.5);
    layers.circulation.add(curb);
  });

  const crosswalk = new THREE.Group();
  for (let index = -3; index <= 3; index += 1) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 1.02), materials.curb);
    stripe.position.set(index * 0.34, 0.08, -0.38);
    crosswalk.add(stripe);
  }
  layers.circulation.add(crosswalk);

  const buildingGroup = new THREE.Group();
  const buildingDefinitions = [
    { id: 'north-tower', x: -3.85, z: -2.65, width: 2.35, depth: 1.78, height: 3.2, material: materials.buildingAlt, entrance: true, twinObject: { id: 'north-tower', kind: 'building', title: '北侧塔楼', typeLabel: '建筑', status: '办公使用', copy: '园区北侧的高层办公体块，提供远景定位和主要办公容量。' } },
    { id: 'east-office', x: 3.85, z: -2.8, width: 2.7, depth: 1.86, height: 2.48, material: materials.building, entrance: true, twinObject: { id: 'east-office', kind: 'building', title: '东侧办公楼', typeLabel: '建筑', status: '办公使用', copy: '靠近东侧通道的办公楼，可作为日常导览和巡检的重点节点。' } },
    { id: 'west-service', x: -4.1, z: 2.35, width: 2.55, depth: 1.72, height: 1.55, material: materials.building, entrance: true, twinObject: { id: 'west-service', kind: 'building', title: '西侧服务楼', typeLabel: '建筑', status: '服务设施', copy: '面向园区运营的服务设施，连接西侧道路和中庭活动区域。' } },
    { id: 'south-hall', x: 3.55, z: 2.55, width: 2.7, depth: 1.94, height: 1.78, material: materials.buildingAlt, entrance: true, twinObject: { id: 'south-hall', kind: 'building', title: '南侧活动厅', typeLabel: '建筑', status: '公共活动', copy: '承担展示、会议或公共活动的低层建筑，靠近南侧环路。' } },
    { id: 'central-hub', x: 0.05, z: 2.55, width: 2.1, depth: 1.3, height: 1.4, material: materials.building, entrance: true, twinObject: { id: 'central-hub', kind: 'building', title: '中央服务中心', typeLabel: '建筑', status: '综合服务', copy: '位于中庭附近的服务中心，是空间导览和运营信息汇聚的核心节点。' } },
  ];
  buildingDefinitions.forEach((definition) => buildingGroup.add(createBuilding(definition, materials)));
  layers.architecture.add(buildingGroup);

  const lawnGroup = new THREE.Group();
  const lawns = [
    { x: -1.9, z: -2.45, width: 1.9, depth: 2.05 },
    { x: 1.75, z: -2.35, width: 1.5, depth: 1.8 },
    { x: -1.9, z: 2.7, width: 1.6, depth: 1.35 },
    { x: 1.8, z: 2.6, width: 1.5, depth: 1.35 },
  ];
  lawns.forEach((definition) => {
    const lawn = new THREE.Mesh(new THREE.BoxGeometry(definition.width, 0.05, definition.depth), materials.lawn);
    lawn.position.set(definition.x, 0.06, definition.z);
    lawn.receiveShadow = true;
    lawnGroup.add(lawn);
  });
  const hedgePositions = [[-1.0, -3.55, 1.35, 0.32], [1.15, 3.55, 1.4, 0.3], [-5.65, 0.85, 0.3, 2.4], [5.15, 0.95, 0.3, 2.2]];
  hedgePositions.forEach(([x, z, width, depth]) => {
    const hedge = new THREE.Mesh(new THREE.BoxGeometry(width, 0.45, depth), materials.hedge);
    hedge.position.set(x, 0.28, z);
    hedge.castShadow = true;
    lawnGroup.add(hedge);
  });
  const pool = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.035, 1.1), materials.water);
  pool.position.set(0, 0.1, -2.7);
  lawnGroup.add(pool);
  const treePositions = [
    [-7.55, -3.6, 1.1], [-6.95, 3.65, 0.92], [-5.7, -1.65, 0.85], [-5.65, 1.65, 0.9],
    [-1.3, -4.0, 0.82], [1.25, -4.0, 0.92], [5.15, -3.65, 1.05], [7.2, -3.4, 0.88],
    [-7.45, 3.85, 0.92], [6.95, 3.65, 1.05], [4.9, 1.05, 0.8], [-4.9, -0.85, 0.74],
  ];
  treePositions.forEach(([x, z, scale]) => lawnGroup.add(createTree(x, z, scale, materials)));
  layers.greenery.add(lawnGroup);

  const operationsGroup = new THREE.Group();
  const cameraPositions = [
    { id: 'gate', x: -6.9, z: -4.1, label: '园区主门' },
    { id: 'courtyard', x: 0.2, z: 0.25, label: '中央中庭' },
    { id: 'east', x: 6.0, z: 3.7, label: '东侧通道' },
  ];
  const cameraMeshes = [];
  cameraPositions.forEach((position, index) => {
    const group = new THREE.Group();
    group.position.set(position.x, 0.08, position.z);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.72, 8), materials.camera);
    pole.position.y = 0.36;
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.26), materials.camera);
    housing.position.set(0, 0.72, -0.08);
    housing.rotation.x = -0.18;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.025, 7, 22), materials.marker);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.06;
    group.add(pole, housing, ring);
    group.userData = {
      ...position,
      index,
      phase: index * 0.7,
      twinObject: {
        id: `camera-${position.id}`,
        kind: 'camera',
        title: position.label,
        typeLabel: '摄像头预设',
        status: '巡检视角',
        copy: '这是一个用于园区导览和巡检演示的预设视角，不代表真实视频流。',
      },
    };
    operationsGroup.add(group);
    cameraMeshes.push(group);
  });

  const routeCurve = new THREE.CatmullRomCurve3([
    [-6.9, 0.16, -4.1], [-3.9, 0.16, -3.7], [-1.5, 0.16, -1.3], [0.2, 0.16, 0.25], [2.9, 0.16, 2.0], [6.0, 0.16, 3.7],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const route = new THREE.Line(new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(compact ? 26 : 42)), materials.route);
  operationsGroup.add(route);
  const routeMarkerGroup = new THREE.Group();
  cameraPositions.forEach((position, index) => {
    const marker = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.028, 7, 22), materials.marker);
    marker.rotation.x = -Math.PI / 2;
    marker.position.set(position.x, 0.13, position.z);
    marker.userData = { phase: index * 0.9 };
    routeMarkerGroup.add(marker);
  });
  operationsGroup.add(routeMarkerGroup);
  layers.operations.add(operationsGroup);

  const rainCount = compact ? 130 : 240;
  const rainPositions = new Float32Array(rainCount * 6);
  const rainSeeds = [];
  for (let index = 0; index < rainCount; index += 1) {
    const x = -9 + hash(index + 2.7) * 18;
    const y = 1.0 + hash(index + 8.3) * 7;
    const z = -6.3 + hash(index + 16.2) * 12.6;
    rainSeeds.push({ x, y, z, speed: 4.1 + hash(index + 22.8) * 2.8 });
    const offset = index * 6;
    rainPositions[offset] = x;
    rainPositions[offset + 1] = y;
    rainPositions[offset + 2] = z;
    rainPositions[offset + 3] = x - 0.08;
    rainPositions[offset + 4] = y - 0.42;
    rainPositions[offset + 5] = z + 0.02;
  }
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rain = new THREE.LineSegments(rainGeometry, materials.rain);
  rain.visible = false;
  layers.weather.add(rain);

  const sunLight = new THREE.DirectionalLight(0xffd4a5, 2.7);
  sunLight.position.set(-5, 9, 6);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(compact ? 1024 : 1536, compact ? 1024 : 1536);
  sunLight.shadow.camera.left = -11;
  sunLight.shadow.camera.right = 11;
  sunLight.shadow.camera.top = 10;
  sunLight.shadow.camera.bottom = -9;
  sunLight.shadow.bias = -0.0005;
  root.add(sunLight);
  const hemisphere = new THREE.HemisphereLight(0xc4dde0, 0x26372f, 1.35);
  root.add(hemisphere);

  const selectionMarker = new THREE.Group();
  selectionMarker.name = 'park-selection-marker';
  const selectionRing = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.035, 8, 28), materials.marker);
  selectionRing.rotation.x = -Math.PI / 2;
  selectionRing.position.y = 0.1;
  const selectionPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.75, 8), materials.camera);
  selectionPillar.position.y = 0.46;
  selectionMarker.add(selectionRing, selectionPillar);
  selectionMarker.visible = false;
  root.add(selectionMarker);

  const state = { mode: 'park-twin', layer: 'all', weather: 'clear', stage: 4, timeOfDay: 15.5, time: 0, stormFlash: 0, nextFlash: 4.8, selectedObject: null };
  const refs = { layers, roadMeshes, rain, rainPositions, rainSeeds, cameraMeshes, routeMarkerGroup, sunLight, hemisphere, materials, pickables: [buildingGroup, ...roadMeshes, ...cameraMeshes], selectionMarker };

  function applyLayerVisibility() {
    const thresholds = { base: 0, circulation: 1, architecture: 2, greenery: 3, operations: 3, weather: 3 };
    const contextLayers = state.layer === 'all'
      ? new Set(Object.keys(layers))
      : new Set(['base', 'circulation', state.layer, ...(state.layer === 'operations' ? ['weather'] : [])]);
    Object.entries(layers).forEach(([id, layer]) => {
      const inStage = state.stage >= thresholds[id];
      layer.visible = inStage && contextLayers.has(id);
    });
    rain.visible = state.weather === 'storm' && state.stage >= 3 && (state.layer === 'all' || state.layer === 'operations');
  }

  function applyWeather() {
    const storm = state.weather === 'storm';
    roadMeshes.forEach((road) => { road.material = storm ? materials.roadWet : materials.road; });
    applyLayerVisibility();
  }

  function setMode(mode) {
    state.mode = mode;
    state.layer = 'all';
    state.weather = 'clear';
    state.stage = 4;
    state.timeOfDay = 15.5;
    clearSelection();
    applyWeather();
    setTimeOfDay(state.timeOfDay);
    applyStage();
  }

  function setLayer(layer) {
    if (!PARK_LAYERS.some((item) => item.id === layer)) return;
    state.layer = layer;
    clearSelection();
    applyLayerVisibility();
  }

  function selectObject(object) {
    const details = object?.userData?.twinObject;
    if (!details) {
      clearSelection();
      return null;
    }
    state.selectedObject = details;
    const worldPosition = object.getWorldPosition(new THREE.Vector3());
    selectionMarker.position.set(worldPosition.x, 0.08, worldPosition.z);
    selectionMarker.scale.setScalar(details.kind === 'building' ? 1.6 : details.kind === 'road' ? 1.25 : 0.9);
    selectionMarker.visible = true;
    return details;
  }

  function clearSelection() {
    state.selectedObject = null;
    selectionMarker.visible = false;
  }

  function setWeather(weather) {
    if (!PARK_WEATHER_PRESETS[weather]) return;
    state.weather = weather;
    applyWeather();
  }

  function setStage(stage) {
    state.stage = clamp(Number(stage), 0, 4);
    applyStage();
  }

  function setTimeOfDay(timeOfDay) {
    state.timeOfDay = clamp(Number(timeOfDay), 5, 22);
    const sunAngle = ((state.timeOfDay - 6) / 16) * Math.PI;
    sunLight.position.set(Math.cos(sunAngle) * 8, Math.max(1.4, Math.sin(sunAngle) * 9), Math.sin(sunAngle) * 7);
    const night = state.timeOfDay < 7 || state.timeOfDay > 20;
    sunLight.intensity = (night ? 0.18 : 1.15 + Math.sin(sunAngle) * 1.3) * (state.weather === 'storm' ? 0.44 : 1);
    hemisphere.intensity = night ? 0.5 : 1.0;
    materials.glass.emissiveIntensity = 0.28 + (night ? 0.9 : 0.2);
    materials.entrance.emissiveIntensity = 0.34 + (night ? 0.72 : 0.2);
  }

  function applyStage() {
    applyLayerVisibility();
    applyWeather();
  }

  function update(delta) {
    state.time += delta;
    cameraMeshes.forEach((camera, index) => {
      const pulse = 1 + Math.sin(state.time * 2.1 + camera.userData.phase) * 0.09;
      camera.scale.setScalar(pulse);
    });
    routeMarkerGroup.children.forEach((marker) => {
      marker.scale.setScalar(1 + Math.sin(state.time * 2.4 + marker.userData.phase) * 0.12);
    });
    if (rain.visible) {
      const positions = rain.geometry.attributes.position.array;
      rainSeeds.forEach((seed, index) => {
        seed.y -= delta * seed.speed;
        if (seed.y < 0.28) seed.y = 7.8 + hash(index + state.time) * 1.3;
        const offset = index * 6;
        positions[offset + 1] = seed.y;
        positions[offset + 4] = seed.y - 0.42;
      });
      rain.geometry.attributes.position.needsUpdate = true;
    }
    if (state.weather === 'storm') {
      state.nextFlash -= delta;
      state.stormFlash = Math.max(0, state.stormFlash - delta * 2.5);
      if (state.nextFlash <= 0) {
        state.stormFlash = 1;
        state.nextFlash = 5.2 + hash(state.time * 1.8) * 4.5;
      }
    } else {
      state.stormFlash = 0;
    }
  }

  function getAtmosphere() {
    const weather = PARK_WEATHER_PRESETS[state.weather];
    const dayAmount = clamp(1 - Math.abs(state.timeOfDay - 13) / 8, 0, 1);
    const color = new THREE.Color(weather.sky);
    color.lerp(new THREE.Color(0x101925), 0.58 - dayAmount * 0.5);
    if (state.stormFlash > 0) color.lerp(new THREE.Color(0x9bc9d3), state.stormFlash * 0.15);
    const fog = new THREE.Color(weather.sky).lerp(new THREE.Color(0x132127), 0.46);
    return { color, fog, density: weather.fog + (1 - dayAmount) * 0.004, flash: state.stormFlash };
  }

  function getState() {
    return { ...state, weatherLabel: PARK_WEATHER_PRESETS[state.weather].label, layerLabel: PARK_LAYERS.find((item) => item.id === state.layer)?.label ?? '全部' };
  }

  applyWeather();
  setTimeOfDay(state.timeOfDay);
  applyStage();

  return { root, state, refs, setMode, setLayer, setWeather, setStage, setTimeOfDay, selectObject, clearSelection, update, getAtmosphere, getState, layers: PARK_LAYERS };
}

export { PARK_LAYERS, PARK_WEATHER_PRESETS, createParkWorld };
