import * as THREE from 'three';
import { NIGHT_RAIN_LEVEL, validateNightRainLevel } from './game-levels/night-rain-village.js';

const WORLD_WIDTH = 17;
const WORLD_DEPTH = 12.5;
const TAU = Math.PI * 2;

const GAME_LEVEL = NIGHT_RAIN_LEVEL;
const GAME_LEVEL_VALIDATION = validateNightRainLevel(GAME_LEVEL);
if (!GAME_LEVEL_VALIDATION.valid) throw new Error(`夜雨乡村关卡数据无效：${GAME_LEVEL_VALIDATION.errors.join('；')}`);

const SEASON_PALETTES = {
  spring: { ground: 0x587052, field: 0x83a85e, crop: 0x9bc66b, canopy: 0x6fa75f, blossom: 0xf0b0ae, soil: 0x765b43, wall: 0xd9c3a2, roof: 0x6c5148, road: 0x8f775c, water: 0x5d9caf },
  summer: { ground: 0x4a654b, field: 0x9a9a45, crop: 0x80b64d, canopy: 0x4e8f4a, blossom: 0xd9df9e, soil: 0x6c503b, wall: 0xd8bd97, roof: 0x654b3d, road: 0x80684d, water: 0x4b91a2 },
  autumn: { ground: 0x635a40, field: 0x9a7f42, crop: 0xb38d3d, canopy: 0xb86e38, blossom: 0xd8a06a, soil: 0x674a39, wall: 0xd2b08c, roof: 0x66453e, road: 0x7d644e, water: 0x547f89 },
  winter: { ground: 0x7d8174, field: 0x9a9a86, crop: 0x7e9d78, canopy: 0x718878, blossom: 0xe6e4d2, soil: 0x726458, wall: 0xd9d5c5, roof: 0x56606a, road: 0x8b8578, water: 0x7095a1 },
};

const WEATHER_PRESETS = {
  clear: { fog: 0.008, sky: 0x8bb5c1, rain: false, snow: false, puddles: false },
  overcast: { fog: 0.018, sky: 0x667d88, rain: false, snow: false, puddles: false },
  storm: { fog: 0.032, sky: 0x243b4a, rain: true, snow: false, puddles: true },
  fog: { fog: 0.064, sky: 0x7f9290, rain: false, snow: false, puddles: false },
  snow: { fog: 0.024, sky: 0x9baab1, rain: false, snow: true, puddles: false },
};

const WEATHER_LABELS = {
  clear: '晴天',
  overcast: '阴天',
  storm: '暴雨',
  fog: '雾天',
  snow: '降雪',
};

function hash(value) {
  const sine = Math.sin(value * 12.9898) * 43758.5453;
  return sine - Math.floor(sine);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance2d(ax, az, bx, bz) {
  return Math.hypot(ax - bx, az - bz);
}

function pointInCollider(x, z, collider, padding = 0.12) {
  return Math.abs(x - collider.x) <= collider.width * 0.5 + padding && Math.abs(z - collider.z) <= collider.depth * 0.5 + padding;
}

function terrainHeight(x, z) {
  const ridge = Math.sin(x * 0.48 + 0.6) * 0.22 + Math.cos(z * 0.62 - 0.4) * 0.18;
  const valley = Math.sin((x + z) * 0.26) * 0.11;
  const bank = Math.exp(-Math.pow((x + 4.2) * 0.33, 2)) * 0.17;
  return ridge + valley + bank - 0.18;
}

function colorize(material, hex) {
  if (material?.color) material.color.setHex(hex);
}

function createTerrainGeometry(width, depth, segments = 42) {
  const geometry = new THREE.PlaneGeometry(width, depth, segments, Math.round(segments * 0.72));
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  for (let index = 0; index < position.count; index += 1) {
    position.setY(index, terrainHeight(position.getX(index), position.getZ(index)));
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function worldPoint(x, z, y = 0.03) {
  return new THREE.Vector3(x, terrainHeight(x, z) + y, z);
}

function createTubePath(points, radius, material, tubularSegments = 42) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => worldPoint(x, z, radius * 0.45)));
  const geometry = new THREE.TubeGeometry(curve, tubularSegments, radius, 5, false);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createRibbonPath(points, width, material, segments = 48) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)));
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let index = 0; index <= segments; index += 1) {
    const progress = index / segments;
    const point = curve.getPoint(progress);
    const tangent = curve.getTangent(progress).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).multiplyScalar(width * 0.5);
    const y = terrainHeight(point.x, point.z) + 0.035;

    positions.push(point.x + side.x, y, point.z + side.z, point.x - side.x, y, point.z - side.z);
    normals.push(0, 1, 0, 0, 1, 0);
    uvs.push(0, progress * 8, 1, progress * 8);

    if (index < segments) {
      const start = index * 2;
      indices.push(start, start + 2, start + 1, start + 1, start + 2, start + 3);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
}

function createHouse(config, materials) {
  const group = new THREE.Group();
  group.position.set(config.x, terrainHeight(config.x, config.z), config.z);
  group.rotation.y = config.rotation ?? 0;
  group.scale.setScalar(config.scale ?? 1);

  const body = new THREE.Mesh(new THREE.BoxGeometry(config.width, config.height, config.depth), materials.wall);
  body.position.y = config.height * 0.5;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(config.width, config.depth) * 0.74, 0.78, 4), materials.roof);
  roof.position.y = config.height + 0.38;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  group.add(roof);

  const windowGeometry = new THREE.BoxGeometry(config.width * 0.16, config.height * 0.17, 0.028);
  const windowLeft = new THREE.Mesh(windowGeometry, materials.window);
  windowLeft.position.set(-config.width * 0.22, config.height * 0.48, -config.depth * 0.505);
  const windowRight = windowLeft.clone();
  windowRight.position.x = config.width * 0.22;
  group.add(windowLeft, windowRight);

  if (config.shed) {
    const shed = new THREE.Mesh(new THREE.BoxGeometry(config.width * 0.56, config.height * 0.48, config.depth * 0.62), materials.shed);
    shed.position.set(config.width * 0.7, config.height * 0.24, config.depth * 0.12);
    shed.castShadow = true;
    shed.receiveShadow = true;
    group.add(shed);
  }

  return group;
}

function createTree(x, z, scale, materials, blossom = false) {
  const group = new THREE.Group();
  group.position.set(x, terrainHeight(x, z), z);
  group.scale.setScalar(scale);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 0.85, 6), materials.trunk);
  trunk.position.y = 0.42;
  trunk.castShadow = true;
  const canopy = new THREE.Mesh(new THREE.IcosahedronGeometry(0.56, 1), blossom ? materials.blossom : materials.canopy);
  canopy.position.y = 1.05;
  canopy.scale.set(1, 1.1, 0.9);
  canopy.castShadow = true;
  group.add(trunk, canopy);
  return group;
}

function createRuralWorld({ compact = false } = {}) {
  const root = new THREE.Group();
  root.name = 'rural-application-world';

  const layers = {
    terrain: new THREE.Group(),
    fields: new THREE.Group(),
    settlement: new THREE.Group(),
    weather: new THREE.Group(),
    scenario: new THREE.Group(),
    special: new THREE.Group(),
    game: new THREE.Group(),
  };
  Object.values(layers).forEach((layer) => root.add(layer));

  const materials = {
    terrain: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.ground, roughness: 0.96, metalness: 0.01 }),
    snowTerrain: new THREE.MeshStandardMaterial({ color: 0xc8d6d1, roughness: 0.9, transparent: true, opacity: 0.9 }),
    field: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.field, roughness: 0.97 }),
    fieldEdge: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.soil, roughness: 1 }),
    crop: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.crop, roughness: 0.9 }),
    wall: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.wall, roughness: 0.82 }),
    roof: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.roof, roughness: 0.86 }),
    shed: new THREE.MeshStandardMaterial({ color: 0x88715a, roughness: 0.95 }),
    window: new THREE.MeshStandardMaterial({ color: 0xf6c777, emissive: 0x80541f, emissiveIntensity: 0.52, roughness: 0.3 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x5a4532, roughness: 1 }),
    canopy: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.canopy, roughness: 0.95 }),
    blossom: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.blossom, roughness: 0.9 }),
    road: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.road, roughness: 0.88, metalness: 0.04 }),
    wetRoad: new THREE.MeshStandardMaterial({ color: 0x2c5262, roughness: 0.25, metalness: 0.28, transparent: true, opacity: 0.94 }),
    gameRoad: new THREE.MeshStandardMaterial({ color: 0x334a52, roughness: 0.76, metalness: 0.08 }),
    water: new THREE.MeshStandardMaterial({ color: SEASON_PALETTES.summer.water, roughness: 0.15, metalness: 0.12, transparent: true, opacity: 0.78 }),
    puddle: new THREE.MeshStandardMaterial({ color: 0x38697b, roughness: 0.14, metalness: 0.28, transparent: true, opacity: 0.68 }),
    marker: new THREE.MeshStandardMaterial({ color: 0xffcb7b, emissive: 0xa54e20, emissiveIntensity: 1.1, roughness: 0.28 }),
    tent: new THREE.MeshStandardMaterial({ color: 0x9d6950, roughness: 0.92 }),
    canvas: new THREE.MeshStandardMaterial({ color: 0xc6ae82, roughness: 0.88 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x6f4931, roughness: 0.92 }),
    lantern: new THREE.MeshStandardMaterial({ color: 0xffd17c, emissive: 0xb35f22, emissiveIntensity: 1.4, roughness: 0.25 }),
    moon: new THREE.MeshBasicMaterial({ color: 0xdbe9e1 }),
    firefly: new THREE.PointsMaterial({ color: 0xffd87e, size: compact ? 0.075 : 0.1, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }),
    playerBody: new THREE.MeshStandardMaterial({ color: 0x8de8dd, emissive: 0x1f827b, emissiveIntensity: 0.8, roughness: 0.48 }),
    playerAccent: new THREE.MeshStandardMaterial({ color: 0xe9fff6, emissive: 0x6dc9ba, emissiveIntensity: 0.5, roughness: 0.3 }),
    gameQuest: new THREE.MeshStandardMaterial({ color: 0xffc774, emissive: 0xb3521c, emissiveIntensity: 1.3, roughness: 0.26 }),
    gameQuestDone: new THREE.MeshStandardMaterial({ color: 0x90e6aa, emissive: 0x2b8c57, emissiveIntensity: 1.1, roughness: 0.24 }),
    gamePickup: new THREE.MeshStandardMaterial({ color: 0x9dd6ff, emissive: 0x327bc4, emissiveIntensity: 1.4, roughness: 0.22 }),
    gameExit: new THREE.MeshStandardMaterial({ color: 0xd4a6ff, emissive: 0x703fb0, emissiveIntensity: 1.2, roughness: 0.24 }),
    gameHazard: new THREE.MeshStandardMaterial({ color: 0x3d7189, emissive: 0x163d55, emissiveIntensity: 0.65, roughness: 0.16, metalness: 0.25, transparent: true, opacity: 0.72, depthWrite: false }),
    gameHazardEdge: new THREE.MeshBasicMaterial({ color: 0xff8d76, transparent: true, opacity: 0.78, depthWrite: false }),
    gameSafe: new THREE.MeshBasicMaterial({ color: 0x8de8dd, transparent: true, opacity: 0.56, depthWrite: false }),
    gameCollider: new THREE.MeshBasicMaterial({ color: 0xff8d76, transparent: true, opacity: 0.16, wireframe: true, depthWrite: false }),
  };

  const terrain = new THREE.Mesh(createTerrainGeometry(WORLD_WIDTH, WORLD_DEPTH, compact ? 34 : 48), materials.terrain);
  terrain.receiveShadow = true;
  layers.terrain.add(terrain);

  const snowTerrain = new THREE.Mesh(createTerrainGeometry(WORLD_WIDTH * 0.995, WORLD_DEPTH * 0.995, compact ? 34 : 48), materials.snowTerrain);
  snowTerrain.position.y = 0.035;
  snowTerrain.visible = false;
  snowTerrain.receiveShadow = true;
  layers.terrain.add(snowTerrain);

  const fields = [];
  const cropMeshes = [];
  const fieldDefinitions = [
    { x: -4.8, z: -2.6, width: 3.25, depth: 2.2, rotation: -0.08, rows: 5, cols: 10 },
    { x: -1.65, z: -3.25, width: 2.2, depth: 1.55, rotation: 0.12, rows: 4, cols: 9 },
    { x: 3.35, z: -2.15, width: 3.9, depth: 2.45, rotation: -0.15, rows: 6, cols: 13 },
    { x: 4.7, z: 2.35, width: 2.65, depth: 1.85, rotation: 0.22, rows: 5, cols: 10 },
    { x: -3.65, z: 2.8, width: 2.55, depth: 1.7, rotation: -0.2, rows: 4, cols: 10 },
  ];
  const cropGeometry = new THREE.ConeGeometry(0.08, 0.42, 5);
  fieldDefinitions.forEach((definition, fieldIndex) => {
    const field = new THREE.Mesh(new THREE.BoxGeometry(definition.width, 0.075, definition.depth), materials.field);
    field.position.copy(worldPoint(definition.x, definition.z, 0.045));
    field.rotation.y = definition.rotation;
    field.castShadow = false;
    field.receiveShadow = true;
    layers.fields.add(field);
    fields.push(field);

    const count = definition.rows * definition.cols;
    const crops = new THREE.InstancedMesh(cropGeometry, materials.crop, count);
    crops.castShadow = true;
    const matrix = new THREE.Matrix4();
    const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, definition.rotation, 0));
    const scale = new THREE.Vector3(1, 0.78 + hash(fieldIndex + 4.3) * 0.45, 1);
    let cropIndex = 0;
    for (let row = 0; row < definition.rows; row += 1) {
      for (let column = 0; column < definition.cols; column += 1) {
        const localX = -definition.width * 0.42 + (column / Math.max(1, definition.cols - 1)) * definition.width * 0.84;
        const localZ = -definition.depth * 0.4 + (row / Math.max(1, definition.rows - 1)) * definition.depth * 0.8;
        const rotated = new THREE.Vector3(localX, 0, localZ).applyAxisAngle(new THREE.Vector3(0, 1, 0), definition.rotation);
        const x = definition.x + rotated.x;
        const z = definition.z + rotated.z;
        matrix.compose(worldPoint(x, z, 0.28), rotation, scale);
        crops.setMatrixAt(cropIndex, matrix);
        cropIndex += 1;
      }
    }
    crops.instanceMatrix.needsUpdate = true;
    layers.fields.add(crops);
    cropMeshes.push(crops);
  });

  const roadPoints = [[-8.2, 4.5], [-5.3, 2.9], [-3.1, 1.35], [-0.2, 0.95], [2.4, 1.55], [5.6, 1.15], [8.2, -0.4]];
  const branchPoints = [[-4.9, 2.7], [-5.5, 0.1], [-4.9, -2.7]];
  const road = createTubePath(roadPoints, 0.22, materials.road, compact ? 32 : 48);
  const roadBranch = createTubePath(branchPoints, 0.14, materials.road, 24);
  const gameRoad = createRibbonPath(roadPoints, 0.62, materials.gameRoad, compact ? 34 : 54);
  const gameRoadBranch = createRibbonPath(branchPoints, 0.42, materials.gameRoad, 30);
  gameRoad.visible = false;
  gameRoadBranch.visible = false;
  layers.fields.add(road, roadBranch, gameRoad, gameRoadBranch);

  const waterCurve = createTubePath([[-7.6, -4.9], [-5.8, -4.25], [-3.6, -4.55], [-1.1, -4.1], [1.6, -4.65], [4.5, -4.2], [7.8, -4.65]], 0.24, materials.water, 50);
  waterCurve.scale.y = 0.38;
  waterCurve.position.y -= 0.07;
  layers.fields.add(waterCurve);

  const houseGroup = new THREE.Group();
  const houseConfigs = [
    { x: 0.2, z: 1.15, width: 1.35, depth: 1.05, height: 0.82, rotation: -0.08, shed: true },
    { x: 1.95, z: 1.85, width: 1.05, depth: 0.86, height: 0.68, rotation: 0.18 },
    { x: 3.05, z: 3.25, width: 1.28, depth: 0.94, height: 0.74, rotation: -0.28 },
    { x: 5.5, z: 2.4, width: 1.2, depth: 0.9, height: 0.72, rotation: 0.14, shed: true },
    { x: -1.95, z: 2.15, width: 0.98, depth: 0.8, height: 0.66, rotation: -0.35 },
  ];
  houseConfigs.forEach((config) => houseGroup.add(createHouse(config, materials)));
  layers.settlement.add(houseGroup);

  const treeGroup = new THREE.Group();
  const treePositions = [
    [-7.2, 3.5, 1.18], [-6.5, 0.4, 0.9], [-7.2, -1.0, 1.05], [-4.2, 4.5, 1.12], [-2.7, 4.6, 0.85],
    [0.1, 4.8, 1.18], [1.5, 4.55, 0.94], [4.6, 4.8, 1.22], [6.65, 3.8, 1.08], [7.3, 1.8, 0.86],
    [7.2, -1.2, 1.06], [6.3, -2.8, 0.88], [-6.8, -3.4, 0.98], [-1.6, -4.0, 0.86],
  ];
  treePositions.forEach(([x, z, scale], index) => {
    const tree = createTree(x, z, scale, materials, index % 5 === 0);
    tree.name = `rural-tree-${String(index).padStart(2, '0')}`;
    treeGroup.add(tree);
  });
  layers.settlement.add(treeGroup);

  const cloudGroup = new THREE.Group();
  const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xd5e4e1, transparent: true, opacity: 0.14, depthWrite: false });
  const cloudPositions = [[-5.8, 4.4, 0.8], [-2.0, 5.1, 0.72], [2.0, 4.5, 0.92], [5.2, 5.2, 0.7], [7.2, 4.6, 0.85]];
  cloudPositions.forEach(([x, y, scale]) => {
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(1.15, 12, 8), cloudMaterial);
    cloud.position.set(x, y, -3.8 + hash(x * 4.7) * 1.4);
    cloud.scale.set(1.55 * scale, 0.34 * scale, 0.62 * scale);
    cloudGroup.add(cloud);
  });
  layers.weather.add(cloudGroup);

  const rainCount = compact ? 150 : 290;
  const rainGeometry = new THREE.BufferGeometry();
  const rainPositions = new Float32Array(rainCount * 6);
  const rainSeeds = [];
  for (let index = 0; index < rainCount; index += 1) {
    const x = -9 + hash(index + 1.2) * 18;
    const y = 1.1 + hash(index + 8.8) * 8;
    const z = -5.4 + hash(index + 19.7) * 10.8;
    rainSeeds.push({ x, y, z, speed: 4.2 + hash(index + 28.1) * 2.4, length: 0.32 + hash(index + 32.4) * 0.32 });
    const offset = index * 6;
    rainPositions[offset] = x;
    rainPositions[offset + 1] = y;
    rainPositions[offset + 2] = z;
    rainPositions[offset + 3] = x - 0.08;
    rainPositions[offset + 4] = y - 0.42;
    rainPositions[offset + 5] = z + 0.03;
  }
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMaterial = new THREE.LineBasicMaterial({ color: 0xb8e7f0, transparent: true, opacity: 0.34, blending: THREE.AdditiveBlending, depthWrite: false });
  const rain = new THREE.LineSegments(rainGeometry, rainMaterial);
  rain.visible = false;
  layers.weather.add(rain);

  const snowCount = compact ? 190 : 350;
  const snowPositions = new Float32Array(snowCount * 3);
  const snowSeeds = [];
  for (let index = 0; index < snowCount; index += 1) {
    snowPositions[index * 3] = -9 + hash(index + 51.8) * 18;
    snowPositions[index * 3 + 1] = 0.8 + hash(index + 71.1) * 8;
    snowPositions[index * 3 + 2] = -5.4 + hash(index + 92.4) * 10.8;
    snowSeeds.push({ speed: 0.35 + hash(index + 104.1) * 0.42, drift: hash(index + 115.7) * TAU });
  }
  const snowGeometry = new THREE.BufferGeometry();
  snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowMaterial = new THREE.PointsMaterial({ color: 0xf0f4ef, size: compact ? 0.065 : 0.085, transparent: true, opacity: 0.8, depthWrite: false });
  const snow = new THREE.Points(snowGeometry, snowMaterial);
  snow.visible = false;
  layers.weather.add(snow);

  const wetPuddles = new THREE.Group();
  const puddlePositions = [[-4.8, -0.1, 0.64], [-1.8, 0.2, 0.42], [2.7, 1.25, 0.52], [4.8, -0.05, 0.7], [0.6, -2.5, 0.48], [-6.0, 1.0, 0.45]];
  puddlePositions.forEach(([x, z, radius]) => {
    const puddle = new THREE.Mesh(new THREE.CircleGeometry(radius, 28), materials.puddle);
    puddle.rotation.x = -Math.PI / 2;
    puddle.position.copy(worldPoint(x, z, 0.07));
    puddle.scale.y = 0.56;
    puddle.visible = false;
    wetPuddles.add(puddle);
  });
  layers.scenario.add(wetPuddles);

  const routeMaterial = new THREE.LineBasicMaterial({ color: 0xffc774, transparent: true, opacity: 0.88, depthWrite: false });
  const routeCurve = new THREE.CatmullRomCurve3([[-6.4, 0.43, 2.95], [-4.9, 0.46, 0.5], [-2.8, 0.38, 1.35], [0.2, 0.4, 1.1], [2.3, 0.52, 1.62], [5.45, 0.48, 1.18]].map(([x, y, z]) => new THREE.Vector3(x, terrainHeight(x, z) + y, z)));
  const routeGeometry = new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(compact ? 30 : 44));
  const route = new THREE.Line(routeGeometry, routeMaterial);
  route.visible = false;
  layers.scenario.add(route);

  const markerGroup = new THREE.Group();
  const markerMeshes = [];
  const inspectionPoints = [[-4.9, 0.5], [-2.75, 1.35], [0.2, 1.1], [5.45, 1.18]];
  inspectionPoints.forEach(([x, z], index) => {
    const marker = new THREE.Group();
    marker.position.copy(worldPoint(x, z, 0.06));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.028, 7, 22), materials.marker);
    ring.rotation.x = -Math.PI / 2;
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 0.42, 8), materials.marker);
    beacon.position.y = 0.22;
    marker.add(ring, beacon);
    marker.userData.phase = index * 0.75;
    markerMeshes.push(marker);
    markerGroup.add(marker);
  });
  markerGroup.visible = false;
  layers.scenario.add(markerGroup);

  const campGroup = new THREE.Group();
  const campAnchor = worldPoint(-1.15, -0.45, 0.04);
  campGroup.position.copy(campAnchor);
  const tent = new THREE.Mesh(new THREE.ConeGeometry(0.88, 1.12, 4), materials.tent);
  tent.position.y = 0.56;
  tent.rotation.y = Math.PI / 4;
  tent.castShadow = true;
  const tentDoor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.025), materials.canvas);
  tentDoor.position.set(0, 0.25, -0.6);
  const fireRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.055, 7, 22), materials.wood);
  fireRing.rotation.x = -Math.PI / 2;
  fireRing.position.set(1.2, 0.08, 0.15);
  const logA = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.08), materials.wood);
  logA.position.set(1.2, 0.15, 0.15);
  logA.rotation.y = 0.55;
  const logB = logA.clone();
  logB.rotation.y = -0.55;
  const fireGlow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 8), materials.lantern);
  fireGlow.position.set(1.2, 0.29, 0.15);
  campGroup.add(tent, tentDoor, fireRing, logA, logB, fireGlow);
  campGroup.visible = false;
  layers.special.add(campGroup);

  const campfireLight = new THREE.PointLight(0xffa45b, 0, 4.2, 1.8);
  campfireLight.position.copy(campAnchor).add(new THREE.Vector3(1.2, 0.45, 0.15));
  campfireLight.castShadow = true;
  root.add(campfireLight);

  const makeRoute = (points, material, segments = 38) => {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => worldPoint(x, z, 0.12)));
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(segments)), material);
  };
  const campRouteMaterial = new THREE.LineBasicMaterial({ color: 0xb8d49b, transparent: true, opacity: 0.86, depthWrite: false });
  const campRoute = makeRoute([[-7.2, 3.7], [-5.1, 2.8], [-3.6, 1.55], [-1.2, -0.45]], campRouteMaterial, compact ? 24 : 38);
  campRoute.visible = false;
  layers.special.add(campRoute);

  const makeMarkerGroup = (points, material) => {
    const group = new THREE.Group();
    const meshes = [];
    points.forEach(([x, z], index) => {
      const marker = new THREE.Group();
      marker.position.copy(worldPoint(x, z, 0.06));
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.022, 7, 20), material);
      ring.rotation.x = -Math.PI / 2;
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), material);
      dot.position.y = 0.2;
      marker.add(ring, dot);
      marker.userData.phase = index * 0.85;
      group.add(marker);
      meshes.push(marker);
    });
    group.visible = false;
    return { group, meshes };
  };
  const campMarkers = makeMarkerGroup([[-5.1, 2.8], [-1.2, -0.45]], materials.lantern);
  layers.special.add(campMarkers.group);

  const sunPathGroup = new THREE.Group();
  const sunPathMaterial = new THREE.LineBasicMaterial({ color: 0xffd88d, transparent: true, opacity: 0.42, depthWrite: false });
  const sunPathPoints = [];
  for (let index = 0; index <= 28; index += 1) {
    const angle = Math.PI - (index / 28) * Math.PI;
    sunPathPoints.push(new THREE.Vector3(Math.cos(angle) * 4.3, 3.8 + Math.sin(angle) * 3.2, -3.6));
  }
  const sunPath = new THREE.Line(new THREE.BufferGeometry().setFromPoints(sunPathPoints), sunPathMaterial);
  const sunMarker = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffd37f }));
  sunPathGroup.add(sunPath, sunMarker);
  sunPathGroup.visible = false;
  layers.special.add(sunPathGroup);

  const nightGroup = new THREE.Group();
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.72, 20, 16), materials.moon);
  moon.position.set(-1.6, 6.1, -3.8);
  nightGroup.add(moon);
  const lanternGroup = new THREE.Group();
  const lanternLights = [];
  [[-4.7, 2.3], [-2.7, 1.65], [-0.3, 1.0], [1.9, 1.7], [4.1, 2.0], [5.6, 1.25]].forEach(([x, z]) => {
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), materials.lantern);
    lantern.position.copy(worldPoint(x, z, 0.9));
    lanternGroup.add(lantern);
    const light = new THREE.PointLight(0xffb767, 1.08, 2.5, 2);
    light.position.copy(lantern.position);
    lanternLights.push(light);
    nightGroup.add(light);
  });
  nightGroup.add(lanternGroup);
  const fireflyCount = compact ? 24 : 36;
  const fireflyPositions = new Float32Array(fireflyCount * 3);
  const fireflySeeds = [];
  for (let index = 0; index < fireflyCount; index += 1) {
    fireflyPositions[index * 3] = -5.8 + hash(index + 140.2) * 8.6;
    fireflyPositions[index * 3 + 1] = 0.45 + hash(index + 155.5) * 1.6;
    fireflyPositions[index * 3 + 2] = -2.4 + hash(index + 171.6) * 4.4;
    fireflySeeds.push({ phase: hash(index + 184.7) * TAU, baseY: fireflyPositions[index * 3 + 1] });
  }
  const fireflyGeometry = new THREE.BufferGeometry();
  fireflyGeometry.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));
  const fireflies = new THREE.Points(fireflyGeometry, materials.firefly);
  nightGroup.add(fireflies);
  nightGroup.visible = false;
  layers.special.add(nightGroup);

  const storyRouteMaterial = new THREE.LineBasicMaterial({ color: 0xffd08b, transparent: true, opacity: 0.66, depthWrite: false });
  const storyRoute = makeRoute([[-5.7, 3.4], [-4.2, 2.7], [-2.2, 2.05], [0.1, 1.2], [2.9, 1.75]], storyRouteMaterial, compact ? 26 : 42);
  storyRoute.visible = false;
  layers.special.add(storyRoute);
  const storyMarkers = makeMarkerGroup([[-4.2, 2.7], [0.1, 1.2], [2.9, 1.75]], materials.lantern);
  storyMarkers.group.visible = false;
  layers.special.add(storyMarkers.group);

  const gameGroup = new THREE.Group();
  gameGroup.name = 'playable-village-layer';
  const playerGroup = new THREE.Group();
  const playerShadow = new THREE.Mesh(new THREE.CircleGeometry(0.27, 18), new THREE.MeshBasicMaterial({ color: 0x07191d, transparent: true, opacity: 0.36, depthWrite: false }));
  playerShadow.rotation.x = -Math.PI / 2;
  playerShadow.position.y = 0.025;
  const playerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.34, 8), materials.playerBody);
  playerBody.position.y = 0.27;
  playerBody.castShadow = true;
  const playerHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), materials.playerAccent);
  playerHead.position.y = 0.54;
  playerHead.castShadow = true;
  const playerArrow = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 4), materials.playerAccent);
  playerArrow.rotation.x = Math.PI / 2;
  playerArrow.position.set(0, 0.36, -0.2);
  const playerLampEmitter = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), materials.playerAccent);
  playerLampEmitter.name = 'player-lamp';
  playerLampEmitter.position.set(0, 0.42, -0.18);
  const playerFlashlight = new THREE.SpotLight(0xb9efff, 1.15, 6.5, Math.PI / 6.8, 0.52, 1.2);
  playerFlashlight.name = 'player-flashlight';
  playerFlashlight.position.set(0, 0.43, -0.12);
  const playerLightTarget = new THREE.Object3D();
  playerLightTarget.position.set(0, 0.12, -2.2);
  playerGroup.add(playerShadow, playerBody, playerHead, playerArrow, playerLampEmitter, playerFlashlight, playerLightTarget);
  playerFlashlight.target = playerLightTarget;
  playerGroup.position.copy(worldPoint(GAME_LEVEL.spawn.x, GAME_LEVEL.spawn.z, 0.02));
  playerGroup.visible = false;
  gameGroup.add(playerGroup);

  const gameRouteMaterial = new THREE.LineBasicMaterial({ color: 0x8de8dd, transparent: true, opacity: 0.48, depthWrite: false });
  const gameRoute = makeRoute(GAME_LEVEL.navigation.route, gameRouteMaterial, compact ? 52 : 78);
  gameRoute.visible = false;
  gameGroup.add(gameRoute);

  const gameQuestGroup = new THREE.Group();
  const gameQuestMeshes = GAME_LEVEL.objectives.map((objective, index) => {
    const marker = new THREE.Group();
    marker.position.copy(worldPoint(objective.x, objective.z, 0.06));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.035, 7, 24), materials.gameQuest);
    ring.rotation.x = -Math.PI / 2;
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.48, 8), materials.gameQuest);
    beacon.position.y = 0.25;
    const light = new THREE.PointLight(0xffc774, 0.55, 2.6, 1.6);
    light.name = `objective-${objective.id}`;
    light.position.y = 0.42;
    marker.userData = { ...objective, index, phase: index * 0.8, light };
    marker.add(ring, beacon, light);
    gameQuestGroup.add(marker);
    return marker;
  });
  gameQuestGroup.visible = false;
  gameGroup.add(gameQuestGroup);

  const gamePickupGroup = new THREE.Group();
  const gamePickupMeshes = GAME_LEVEL.pickups.map((pickup, index) => {
    const item = new THREE.Group();
    item.position.copy(worldPoint(pickup.x, pickup.z, 0.08));
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), materials.gamePickup);
    crystal.position.y = 0.28;
    crystal.castShadow = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.018, 6, 18), materials.gamePickup);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.06;
    item.userData = { ...pickup, index, phase: index * 1.1 };
    item.add(crystal, ring);
    gamePickupGroup.add(item);
    return item;
  });
  gamePickupGroup.visible = false;
  gameGroup.add(gamePickupGroup);

  const gameExitGroup = new THREE.Group();
  gameExitGroup.position.copy(worldPoint(GAME_LEVEL.exit.x, GAME_LEVEL.exit.z, 0.06));
  const exitRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.04, 7, 26), materials.gameExit);
  exitRing.rotation.x = -Math.PI / 2;
  const exitBeacon = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.58, 8), materials.gameExit);
  exitBeacon.position.y = 0.3;
  const exitLamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), materials.gameExit);
  exitLamp.name = 'rescue-beacon';
  exitLamp.position.y = 0.65;
  const rescueBeaconLight = new THREE.PointLight(0xd4a6ff, 0.35, 4.8, 1.6);
  rescueBeaconLight.name = 'rescue-beacon-light';
  rescueBeaconLight.position.y = 0.66;
  gameExitGroup.add(exitRing, exitBeacon, exitLamp, rescueBeaconLight);
  gameExitGroup.visible = false;
  gameGroup.add(gameExitGroup);

  const gameHazardGroup = new THREE.Group();
  gameHazardGroup.name = 'night-rain-hazard-zones';
  const gameHazardMeshes = GAME_LEVEL.hazards.map((hazard, index) => {
    const marker = new THREE.Group();
    marker.position.copy(worldPoint(hazard.x, hazard.z, 0.045));
    const radiusX = hazard.radius ?? hazard.width / 2;
    const radiusZ = hazard.radius ?? hazard.depth / 2;
    const surface = new THREE.Mesh(new THREE.CircleGeometry(1, 32), materials.gameHazard);
    surface.rotation.x = -Math.PI / 2;
    surface.scale.set(radiusX, radiusZ, 1);
    const edge = new THREE.Mesh(new THREE.TorusGeometry(1, 0.025, 7, 32), materials.gameHazardEdge.clone());
    edge.rotation.x = -Math.PI / 2;
    edge.position.y = 0.025;
    edge.scale.set(radiusX, radiusZ, 1);
    marker.userData = { ...hazard, phase: index * 1.4, edge };
    marker.add(surface, edge);
    gameHazardGroup.add(marker);
    return marker;
  });
  gameHazardGroup.visible = false;
  gameGroup.add(gameHazardGroup);

  const gameRecoveryGroup = new THREE.Group();
  gameRecoveryGroup.name = 'village-shelter-recovery-zone';
  gameRecoveryGroup.position.copy(worldPoint(GAME_LEVEL.recovery.x, GAME_LEVEL.recovery.z, 0.055));
  const recoveryRing = new THREE.Mesh(new THREE.TorusGeometry(GAME_LEVEL.recovery.radius, 0.026, 7, 40), materials.gameSafe);
  recoveryRing.rotation.x = -Math.PI / 2;
  gameRecoveryGroup.add(recoveryRing);
  gameRecoveryGroup.visible = false;
  gameGroup.add(gameRecoveryGroup);

  const gameColliderGroup = new THREE.Group();
  GAME_LEVEL.colliders.forEach((collider) => {
    const visual = new THREE.Mesh(new THREE.BoxGeometry(collider.width, 0.035, collider.depth), materials.gameCollider);
    visual.position.copy(worldPoint(collider.x, collider.z, 0.075));
    gameColliderGroup.add(visual);
  });
  gameColliderGroup.visible = false;
  gameGroup.add(gameColliderGroup);
  layers.game.add(gameGroup);

  const sunLight = new THREE.DirectionalLight(0xffd6a3, 2.4);
  sunLight.position.set(-4, 8, 5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(compact ? 1024 : 1536, compact ? 1024 : 1536);
  sunLight.shadow.camera.left = -10;
  sunLight.shadow.camera.right = 10;
  sunLight.shadow.camera.top = 10;
  sunLight.shadow.camera.bottom = -10;
  sunLight.shadow.bias = -0.0005;
  root.add(sunLight);

  const hemisphere = new THREE.HemisphereLight(0xbad9dd, 0x3b2c23, 1.25);
  root.add(hemisphere);

  const moonLight = new THREE.DirectionalLight(0x9bbfd1, 0.18);
  moonLight.position.set(-4, 6, -5);
  root.add(moonLight);

  const inspectionLight = new THREE.SpotLight(0xa4e6ff, 0, 12, Math.PI / 7, 0.48, 1.3);
  inspectionLight.position.set(-2.8, 3.8, 1.1);
  inspectionLight.castShadow = true;
  root.add(inspectionLight);
  const inspectionTarget = new THREE.Object3D();
  inspectionTarget.position.set(0, 0, 1);
  root.add(inspectionTarget);
  inspectionLight.target = inspectionTarget;

  const refs = { terrain, snowTerrain, fields, cropMeshes, houseGroup, treeGroup, cloudGroup, rain, rainPositions, rainSeeds, snow, snowSeeds, wetPuddles, road, roadBranch, gameRoad, gameRoadBranch, route, routeMaterial, markerGroup, markerMeshes, campGroup, campRoute, campMarkers, campfireLight, sunPathGroup, sunMarker, nightGroup, fireflies, fireflySeeds, lanternLights, storyRoute, storyMarkers, gameGroup, playerGroup, playerLampEmitter, playerFlashlight, gameRoute, gameRouteMaterial, gameQuestGroup, gameQuestMeshes, gamePickupGroup, gamePickupMeshes, gameExitGroup, rescueBeaconLight, gameHazardGroup, gameHazardMeshes, gameRecoveryGroup, gameColliderGroup, sunLight, hemisphere, moonLight, inspectionLight, materials };
  const state = { mode: 'rural-seasons', season: 'summer', weather: 'clear', stage: 4, timeOfDay: 16, time: 0, stormFlash: 0, nextFlash: 3.8 };
  const gameState = {
    playerX: GAME_LEVEL.spawn.x,
    playerZ: GAME_LEVEL.spawn.z,
    objectiveIndex: 0,
    collected: new Set(),
    completed: false,
    finished: false,
    risk: 0,
    hazardId: null,
    zoneTitle: GAME_LEVEL.recovery.title,
    rescues: 0,
    message: '暴雨正在加剧。先检查村口排水口。',
    blocked: false,
    lastInteraction: 0,
  };

  function applySeason() {
    const palette = SEASON_PALETTES[state.season];
    colorize(materials.terrain, palette.ground);
    colorize(materials.field, palette.field);
    colorize(materials.fieldEdge, palette.soil);
    colorize(materials.crop, palette.crop);
    colorize(materials.canopy, palette.canopy);
    colorize(materials.blossom, palette.blossom);
    colorize(materials.wall, palette.wall);
    colorize(materials.roof, palette.roof);
    colorize(materials.road, palette.road);
    colorize(materials.water, palette.water);
    colorize(materials.wetRoad, palette.road);
    snowTerrain.visible = state.season === 'winter' && state.stage >= 0;
  }

  function applyWeather() {
    const preset = WEATHER_PRESETS[state.weather];
    rain.visible = preset.rain && state.stage >= 3;
    snow.visible = preset.snow && state.stage >= 3;
    wetPuddles.children.forEach((puddle) => { puddle.visible = preset.puddles && state.stage >= 4; });
    route.visible = state.mode === 'rural-storm' && state.stage >= 2;
    markerGroup.visible = state.mode === 'rural-storm' && state.stage >= 4;
    campRoute.visible = state.mode === 'camping-route' && state.stage >= 2;
    campMarkers.group.visible = state.mode === 'camping-route' && state.stage >= 4;
    storyRoute.visible = state.mode === 'night-story' && state.stage >= 2;
    storyMarkers.group.visible = state.mode === 'night-story' && state.stage >= 4;
    inspectionLight.intensity = state.mode === 'rural-storm' && state.stage >= 3 ? 2.1 : 0;
    campfireLight.intensity = state.mode === 'camping-route' && state.stage >= 2 ? 1.65 : 0;
    campGroup.visible = state.mode === 'camping-route' && state.stage >= 2;
    sunPathGroup.visible = state.mode === 'camping-route' && state.stage >= 3;
    nightGroup.visible = state.mode === 'night-story' && state.stage >= 2;
    moonLight.intensity = state.mode === 'night-story' || state.mode === 'rural-game' ? 0.32 : 0.08;
    cloudGroup.children.forEach((cloud) => { cloud.visible = state.weather !== 'clear' || state.stage >= 2; });
  }

  function applyStage() {
    layers.terrain.visible = state.stage >= 0;
    layers.fields.visible = state.stage >= 1;
    layers.settlement.visible = state.stage >= 2;
    layers.weather.visible = state.stage >= 3;
    layers.scenario.visible = state.stage >= 2;
    layers.special.visible = state.stage >= 2;
    applyWeather();
    applyGameVisibility();
  }

  function setMode(mode) {
    state.mode = mode;
    if (mode === 'rural-storm') {
      state.weather = 'storm';
      state.season = 'summer';
      state.stage = 4;
      state.timeOfDay = 16;
    } else if (mode === 'rural-game') {
      state.weather = 'storm';
      state.season = 'autumn';
      state.stage = 4;
      state.timeOfDay = 20.8;
    } else if (mode === 'camping-route') {
      state.weather = 'clear';
      state.season = 'summer';
      state.stage = 4;
      state.timeOfDay = 17.5;
    } else if (mode === 'night-story') {
      state.weather = 'fog';
      state.season = 'autumn';
      state.stage = 4;
      state.timeOfDay = 21.5;
    } else {
      state.weather = 'clear';
      state.season = 'summer';
      state.stage = 4;
      state.timeOfDay = 16;
    }
    applySeason();
    setTimeOfDay(state.timeOfDay);
    applyStage();
    if (mode === 'rural-game') resetGame();
  }

  function setSeason(season) {
    if (!SEASON_PALETTES[season]) return;
    state.season = season;
    applySeason();
  }

  function setWeather(weather) {
    if (!WEATHER_PRESETS[weather]) return;
    state.weather = weather;
    applyWeather();
  }

  function syncPlayerTransform() {
    playerGroup.position.copy(worldPoint(gameState.playerX, gameState.playerZ, 0.02));
  }

  function updateGameMarkerStyles() {
    gameQuestMeshes.forEach((marker, index) => {
      const complete = index < gameState.objectiveIndex;
      const active = index === gameState.objectiveIndex && !gameState.completed;
      const material = complete ? materials.gameQuestDone : materials.gameQuest;
      marker.children.forEach((child) => { if (child.isMesh) child.material = material; });
      marker.userData.light.color.set(complete ? 0x90e6aa : 0xffc774);
      marker.userData.light.intensity = complete ? 0.12 : active ? 0.82 : 0.24;
      marker.userData.active = active;
      marker.userData.complete = complete;
      marker.scale.setScalar(active ? 1.08 : 0.88);
    });
    gamePickupMeshes.forEach((item) => {
      item.visible = !gameState.collected.has(item.userData.id);
    });
    const exitMaterial = gameState.completed ? materials.gameQuestDone : materials.gameExit;
    gameExitGroup.children.forEach((child) => { if (child.isMesh) child.material = exitMaterial; });
    gameExitGroup.scale.setScalar(gameState.completed ? 1.12 : 0.86);
    rescueBeaconLight.color.set(gameState.completed ? 0x90e6aa : 0xd4a6ff);
    rescueBeaconLight.intensity = gameState.completed ? 1.65 : 0.34;
    const hasMap = gameState.collected.has('emergency-map');
    const hasBattery = gameState.collected.has('spare-battery');
    gameRouteMaterial.opacity = hasMap ? 0.82 : 0.28;
    playerFlashlight.intensity = hasBattery ? 2.15 : 1.05;
    playerFlashlight.distance = hasBattery ? 8.2 : 5.8;
    materials.playerAccent.emissiveIntensity = hasBattery ? 1.05 : 0.5;
  }

  function applyGameVisibility() {
    const active = state.mode === 'rural-game';
    const spawnTree = treeGroup.getObjectByName('rural-tree-00');
    if (spawnTree) spawnTree.visible = !active;
    road.visible = !active;
    roadBranch.visible = !active;
    gameRoad.visible = active && state.stage >= 1;
    gameRoadBranch.visible = active && state.stage >= 1;
    layers.game.visible = active && state.stage >= 1;
    gameRoute.visible = active && state.stage >= 1;
    gameColliderGroup.visible = active && state.stage === 2;
    gameQuestGroup.visible = active && state.stage >= 3;
    gamePickupGroup.visible = active && state.stage >= 3;
    gameExitGroup.visible = active && state.stage >= 3;
    gameHazardGroup.visible = active && state.stage >= 2;
    gameRecoveryGroup.visible = active && state.stage >= 1;
    playerGroup.visible = active && state.stage >= 4;
    updateGameMarkerStyles();
  }

  function resetGame() {
    gameState.playerX = GAME_LEVEL.spawn.x;
    gameState.playerZ = GAME_LEVEL.spawn.z;
    gameState.objectiveIndex = 0;
    gameState.collected = new Set();
    gameState.completed = false;
    gameState.finished = false;
    gameState.risk = 0;
    gameState.hazardId = null;
    gameState.zoneTitle = GAME_LEVEL.recovery.title;
    gameState.rescues = 0;
    gameState.message = '暴雨正在加剧。先检查村口排水口。';
    gameState.blocked = false;
    syncPlayerTransform();
    updateGameMarkerStyles();
    applyGameVisibility();
  }

  function canOccupy(x, z) {
    if (x < GAME_LEVEL.bounds.minX || x > GAME_LEVEL.bounds.maxX || z < GAME_LEVEL.bounds.minZ || z > GAME_LEVEL.bounds.maxZ) return false;
    return !GAME_LEVEL.colliders.some((collider) => pointInCollider(x, z, collider));
  }

  function pointInHazard(x, z, hazard) {
    if (hazard.radius) return distance2d(x, z, hazard.x, hazard.z) <= hazard.radius;
    return Math.abs(x - hazard.x) <= hazard.width / 2 && Math.abs(z - hazard.z) <= hazard.depth / 2;
  }

  function hazardAt(x, z) {
    return GAME_LEVEL.hazards.find((hazard) => pointInHazard(x, z, hazard)) ?? null;
  }

  function inRecoveryZone(x, z) {
    return distance2d(x, z, GAME_LEVEL.recovery.x, GAME_LEVEL.recovery.z) <= GAME_LEVEL.recovery.radius;
  }

  function updateCompletionState() {
    gameState.completed = gameState.objectiveIndex >= GAME_LEVEL.objectives.length
      && gameState.collected.size >= GAME_LEVEL.pickups.length;
  }

  function zoneAt(x, z) {
    const hazard = hazardAt(x, z);
    if (hazard) return hazard.title;
    if (inRecoveryZone(x, z)) return GAME_LEVEL.recovery.title;
    const objective = GAME_LEVEL.objectives.find((item) => distance2d(x, z, item.x, item.z) < 1.25);
    if (objective) return objective.zone;
    const pickup = GAME_LEVEL.pickups.find((item) => distance2d(x, z, item.x, item.z) < 1.0);
    if (pickup) return pickup.zone;
    return x > 2.1 ? '东侧村道' : x < -3.2 ? '村口主路' : '村中道路';
  }

  function getNearbyAction() {
    const currentObjective = GAME_LEVEL.objectives[gameState.objectiveIndex];
    if (currentObjective && distance2d(gameState.playerX, gameState.playerZ, currentObjective.x, currentObjective.z) < 0.78) {
      return { kind: 'objective', label: `调查 ${currentObjective.title}`, target: currentObjective.id };
    }
    const pickup = GAME_LEVEL.pickups.find((item) => !gameState.collected.has(item.id) && distance2d(gameState.playerX, gameState.playerZ, item.x, item.z) < 0.68);
    if (pickup) return { kind: 'pickup', label: `收集 ${pickup.title}`, target: pickup.id };
    if (gameState.completed && distance2d(gameState.playerX, gameState.playerZ, GAME_LEVEL.exit.x, GAME_LEVEL.exit.z) < GAME_LEVEL.exit.radius) {
      return { kind: 'exit', label: '完成调查并撤离', target: GAME_LEVEL.exit.id };
    }
    return { kind: 'none', label: '互动', target: null };
  }

  function rescuePlayerFromStorm() {
    gameState.playerX = GAME_LEVEL.spawn.x;
    gameState.playerZ = GAME_LEVEL.spawn.z;
    gameState.risk = 34;
    gameState.hazardId = null;
    gameState.zoneTitle = GAME_LEVEL.recovery.title;
    gameState.rescues += 1;
    gameState.message = '暴雨风险过高，你已返回村口安全点；调查进度已保留。';
    syncPlayerTransform();
  }

  function updateGame(delta, input = { x: 0, z: 0 }) {
    if (state.mode !== 'rural-game' || state.stage < 4 || gameState.finished) return;
    const magnitude = Math.hypot(input.x, input.z);
    gameState.blocked = false;
    if (magnitude > 0.01) {
      const directionX = input.x / magnitude;
      const directionZ = input.z / magnitude;
      const currentHazard = hazardAt(gameState.playerX, gameState.playerZ);
      const distance = GAME_LEVEL.movement.speed * (currentHazard ? GAME_LEVEL.movement.hazardMultiplier : 1) * delta;
      const nextX = gameState.playerX + directionX * distance;
      const nextZ = gameState.playerZ + directionZ * distance;
      if (canOccupy(nextX, nextZ)) {
        gameState.playerX = nextX;
        gameState.playerZ = nextZ;
        playerGroup.rotation.y = Math.atan2(directionX, directionZ);
      } else {
        gameState.blocked = true;
        gameState.message = '前方有障碍，请绕开房屋或沿路线前进。';
      }
      syncPlayerTransform();
    }

    const activeHazard = hazardAt(gameState.playerX, gameState.playerZ);
    const hasBattery = gameState.collected.has('spare-battery');
    if (activeHazard) {
      gameState.risk = Math.min(100, gameState.risk + activeHazard.riskPerSecond * (hasBattery ? 0.62 : 1) * delta);
      if (gameState.hazardId !== activeHazard.id) gameState.message = `进入危险区：${activeHazard.title}。移动速度下降，暴雨风险上升。`;
      gameState.hazardId = activeHazard.id;
    } else {
      const recovery = inRecoveryZone(gameState.playerX, gameState.playerZ);
      gameState.risk = Math.max(0, gameState.risk - (recovery ? GAME_LEVEL.recovery.recoveryPerSecond : 2.2) * delta);
      gameState.hazardId = null;
    }
    gameState.zoneTitle = zoneAt(gameState.playerX, gameState.playerZ);
    if (gameState.risk >= 100) rescuePlayerFromStorm();

    gameQuestMeshes.forEach((marker) => {
      const pulse = marker.userData.active ? 1 + Math.sin(state.time * 3.1 + marker.userData.phase) * 0.14 : 0.9;
      marker.scale.setScalar(pulse);
    });
    gamePickupMeshes.forEach((item) => {
      item.rotation.y += delta * 1.7;
      item.position.y = worldPoint(item.userData.x, item.userData.z, 0.08).y + 0.04 + Math.sin(state.time * 2.4 + item.userData.phase) * 0.05;
    });
    const exitPulse = gameState.completed ? 1 + Math.sin(state.time * 2.2) * 0.1 : 0.86;
    gameExitGroup.scale.setScalar(exitPulse);
    gameHazardMeshes.forEach((marker) => {
      const pulse = 0.88 + Math.sin(state.time * 2.5 + marker.userData.phase) * 0.12;
      marker.userData.edge.material.opacity = gameState.hazardId === marker.userData.id ? 0.98 : 0.48 + pulse * 0.18;
    });
    gameRecoveryGroup.rotation.y += delta * 0.18;
  }

  function interactGame() {
    if (state.mode !== 'rural-game' || state.stage < 4 || gameState.finished) return getGameState();
    const currentObjective = GAME_LEVEL.objectives[gameState.objectiveIndex];
    if (currentObjective && distance2d(gameState.playerX, gameState.playerZ, currentObjective.x, currentObjective.z) < 0.78) {
      gameState.objectiveIndex += 1;
      updateCompletionState();
      if (gameState.completed) {
        gameState.message = '调查与物资准备完成。沿路线返回村口绿色救援灯标。';
      } else if (gameState.objectiveIndex >= GAME_LEVEL.objectives.length) {
        const remaining = GAME_LEVEL.pickups.length - gameState.collected.size;
        gameState.message = `三项调查已完成，还需要找到 ${remaining} 件应急物资。`;
      } else {
        gameState.message = `已完成：${currentObjective.title}。继续前往下一个任务点。`;
      }
      updateGameMarkerStyles();
      return getGameState();
    }
    const nearbyPickup = GAME_LEVEL.pickups.find((pickup) => !gameState.collected.has(pickup.id) && distance2d(gameState.playerX, gameState.playerZ, pickup.x, pickup.z) < 0.68);
    if (nearbyPickup) {
      gameState.collected.add(nearbyPickup.id);
      updateCompletionState();
      if (nearbyPickup.effect === 'map') gameState.message = '已取得应急路线图：完整返程路线已经高亮。';
      else if (nearbyPickup.effect === 'battery') gameState.message = '已更换备用电池：照明增强，积水中的风险增长减缓。';
      else gameState.message = `已收集：${nearbyPickup.title}。`;
      if (gameState.completed) gameState.message += ' 现在返回村口救援灯标。';
      updateGameMarkerStyles();
      return getGameState();
    }
    if (gameState.completed && distance2d(gameState.playerX, gameState.playerZ, GAME_LEVEL.exit.x, GAME_LEVEL.exit.z) < GAME_LEVEL.exit.radius) {
      gameState.finished = true;
      gameState.message = '调查完成：路线、泵站和受阻道路已经记录，应急物资也已带回。';
      updateGameMarkerStyles();
      return getGameState();
    }
    gameState.message = gameState.completed ? '沿高亮路线返回村口绿色救援灯标。' : '靠近当前橙色调查点或蓝色应急物资后按互动。';
    return getGameState();
  }

  function debugSetGamePlayer(x, z) {
    gameState.playerX = clamp(Number(x), GAME_LEVEL.bounds.minX, GAME_LEVEL.bounds.maxX);
    gameState.playerZ = clamp(Number(z), GAME_LEVEL.bounds.minZ, GAME_LEVEL.bounds.maxZ);
    gameState.hazardId = hazardAt(gameState.playerX, gameState.playerZ)?.id ?? null;
    gameState.zoneTitle = zoneAt(gameState.playerX, gameState.playerZ);
    syncPlayerTransform();
    return getGameState();
  }

  function debugSetGameRisk(risk) {
    gameState.risk = clamp(Number(risk), 0, 100);
    return getGameState();
  }

  function debugStepGame(x, z, delta = 0.16) {
    updateGame(clamp(Number(delta), 0.016, 0.3), { x: Number(x), z: Number(z) });
    return getGameState();
  }

  function setStage(stage) {
    state.stage = clamp(Number(stage), 0, 4);
    applyStage();
  }

  function setTimeOfDay(timeOfDay) {
    state.timeOfDay = clamp(Number(timeOfDay), 5, 22);
    const sunAngle = ((state.timeOfDay - 6) / 16) * Math.PI;
    const sunPosition = new THREE.Vector3(Math.cos(sunAngle) * 7, Math.max(1.4, Math.sin(sunAngle) * 9), Math.sin(sunAngle) * 6);
    sunLight.position.copy(sunPosition);
    sunMarker.position.set(Math.cos(sunAngle) * 4.3, 3.8 + Math.max(0, Math.sin(sunAngle)) * 3.2, -3.6);
    const nightAmount = clamp(Math.abs(state.timeOfDay - 13) / 8, 0, 1);
    const isNight = state.timeOfDay < 7 || state.timeOfDay > 20;
    sunLight.intensity = (isNight ? 0.16 : 0.8 + (1 - nightAmount) * 2.2) * (state.weather === 'storm' ? 0.42 : 1);
    hemisphere.intensity = isNight ? 0.44 : 0.54 + (1 - nightAmount) * 0.74;
    const nightMission = state.mode === 'night-story' || state.mode === 'rural-game';
    moonLight.intensity = nightMission ? (isNight ? 0.58 : 0.16) : 0.08;
    materials.window.emissiveIntensity = 0.24 + nightAmount * 1.05;
    campfireLight.intensity = state.mode === 'camping-route' && state.stage >= 2 ? 1.35 + nightAmount * 0.85 : 0;
    lanternLights.forEach((light, index) => { light.intensity = state.mode === 'night-story' && isNight ? 1.02 + Math.sin(state.time * 1.6 + index) * 0.12 : 0; });
  }

  function update(delta) {
    state.time += delta;
    cropMeshes.forEach((mesh, index) => {
      mesh.rotation.z = Math.sin(state.time * 1.25 + index * 0.7) * 0.018;
    });
    cloudGroup.position.x = ((state.time * 0.08) % 2.5) - 1.25;

    if (rain.visible) {
      const positions = rain.geometry.attributes.position.array;
      rainSeeds.forEach((seed, index) => {
        seed.y -= delta * seed.speed;
        if (seed.y < 0.35) seed.y = 8.5 + hash(index + state.time) * 1.5;
        const offset = index * 6;
        positions[offset + 1] = seed.y;
        positions[offset + 4] = seed.y - seed.length;
      });
      rain.geometry.attributes.position.needsUpdate = true;
    }

    if (snow.visible) {
      const positions = snow.geometry.attributes.position.array;
      snowSeeds.forEach((seed, index) => {
        const offset = index * 3;
        positions[offset + 1] -= delta * seed.speed;
        positions[offset] += Math.sin(state.time * 0.5 + seed.drift) * delta * 0.12;
        if (positions[offset + 1] < 0.25) positions[offset + 1] = 8.2;
      });
      snow.geometry.attributes.position.needsUpdate = true;
    }

    markerMeshes.forEach((marker) => {
      const pulse = 1 + Math.sin(state.time * 2.4 + marker.userData.phase) * 0.12;
      marker.scale.setScalar(pulse);
    });
    campMarkers.meshes.forEach((marker) => {
      const pulse = 1 + Math.sin(state.time * 1.8 + marker.userData.phase) * 0.08;
      marker.scale.setScalar(pulse);
    });
    storyMarkers.meshes.forEach((marker) => {
      const pulse = 1 + Math.sin(state.time * 1.5 + marker.userData.phase) * 0.1;
      marker.scale.setScalar(pulse);
    });
    const fireflyPositions = fireflies.geometry.attributes.position.array;
    fireflySeeds.forEach((seed, index) => {
      const offset = index * 3;
      fireflyPositions[offset + 1] = seed.baseY + Math.sin(state.time * 0.8 + seed.phase) * 0.18;
      fireflyPositions[offset] += Math.cos(state.time * 0.32 + seed.phase) * delta * 0.06;
    });
    fireflies.geometry.attributes.position.needsUpdate = true;
    if (state.mode === 'camping-route') {
      campfireLight.intensity = Math.max(0, campfireLight.intensity + Math.sin(state.time * 7.1) * 0.018);
    }

    if (state.weather === 'storm') {
      state.nextFlash -= delta;
      state.stormFlash = Math.max(0, state.stormFlash - delta * 2.7);
      if (state.nextFlash <= 0) {
        state.stormFlash = 1;
        state.nextFlash = 4.8 + hash(state.time * 2.1) * 4.4;
      }
      inspectionLight.intensity = (state.mode === 'rural-storm' && state.stage >= 3 ? 1.7 : 0) + state.stormFlash * 5.5;
    } else {
      state.stormFlash = 0;
    }
  }

  function getAtmosphere() {
    const weather = WEATHER_PRESETS[state.weather];
    const dayAmount = clamp(1 - Math.abs(state.timeOfDay - 13) / 8, 0, 1);
    const baseSky = new THREE.Color(weather.sky);
    const nightSky = new THREE.Color(0x101827);
    baseSky.lerp(nightSky, 0.64 - dayAmount * 0.58);
    const nightMission = state.mode === 'night-story' || state.mode === 'rural-game';
    if (nightMission) baseSky.lerp(new THREE.Color(0x08121c), state.mode === 'rural-game' ? 0.48 : 0.62);
    if (state.stormFlash > 0) baseSky.lerp(new THREE.Color(0x8cbfcd), state.stormFlash * 0.15);
    const fogColor = nightMission ? new THREE.Color(0x10202a) : new THREE.Color(weather.sky).lerp(new THREE.Color(0x14202a), 0.48);
    const fogDensity = nightMission ? Math.max(weather.fog, state.mode === 'rural-game' ? 0.036 : 0.028) : weather.fog + (1 - dayAmount) * 0.004;
    return { color: baseSky, fog: fogColor, density: fogDensity, flash: state.stormFlash };
  }

  function getState() {
    return { ...state, weatherLabel: WEATHER_LABELS[state.weather] };
  }

  function getGameState() {
    const currentObjective = GAME_LEVEL.objectives[gameState.objectiveIndex] ?? null;
    return {
      player: { x: gameState.playerX, z: gameState.playerZ },
      objectiveIndex: gameState.objectiveIndex,
      objectiveCount: GAME_LEVEL.objectives.length,
      currentObjective: currentObjective ? { ...currentObjective } : null,
      objectives: GAME_LEVEL.objectives.map((item, index) => ({ id: item.id, title: item.title, complete: index < gameState.objectiveIndex, active: index === gameState.objectiveIndex && !gameState.completed })),
      collected: gameState.collected.size,
      collectedIds: [...gameState.collected],
      pickupCount: GAME_LEVEL.pickups.length,
      completed: gameState.completed,
      finished: gameState.finished,
      risk: Math.round(gameState.risk),
      hazardId: gameState.hazardId,
      zoneTitle: gameState.zoneTitle,
      rescues: gameState.rescues,
      hasMap: gameState.collected.has('emergency-map'),
      hasBattery: gameState.collected.has('spare-battery'),
      nearbyAction: getNearbyAction(),
      levelId: GAME_LEVEL.id,
      levelValid: GAME_LEVEL_VALIDATION.valid,
      message: gameState.message,
      blocked: gameState.blocked,
    };
  }

  applySeason();
  setTimeOfDay(state.timeOfDay);
  applyStage();

  return { root, state, refs, setMode, setSeason, setWeather, setStage, setTimeOfDay, update, updateGame, interactGame, resetGame, debugSetGamePlayer, debugSetGameRisk, debugStepGame, getAtmosphere, getState, getGameState };
}

export { SEASON_PALETTES, WEATHER_PRESETS, WEATHER_LABELS, GAME_LEVEL_VALIDATION, createRuralWorld, terrainHeight };
