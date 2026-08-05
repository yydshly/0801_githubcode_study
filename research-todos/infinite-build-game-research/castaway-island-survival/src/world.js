import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LEVEL, RESOURCE_SPAWNS } from './level-data.js';
import { createOcean, createSky } from './ocean.js';

const ASSETS = `${import.meta.env.BASE_URL}assets/runtime`;

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function enableShadows(root) {
  root.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      if (node.material) {
        node.material.roughness = Math.max(node.material.roughness ?? 0.72, 0.55);
      }
    }
  });
  return root;
}

function createCreekMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `
      uniform float time; varying vec2 vUv;
      void main(){
        float ripple=sin(vUv.y*42.0-time*3.2+sin(vUv.x*11.0))*0.5+0.5;
        float edge=smoothstep(0.0,.24,vUv.x)*smoothstep(1.0,.76,vUv.x);
        vec3 color=mix(vec3(.08,.30,.25),vec3(.48,.82,.66),ripple*.24);
        gl_FragColor=vec4(color,edge*.86);
      }
    `,
  });
}

function createRibbon(points, widths, material) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i < points.length; i += 1) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const tangent = new THREE.Vector2(next.x - prev.x, next.z - prev.z).normalize();
    const normal = new THREE.Vector2(-tangent.y, tangent.x);
    const width = widths[i] ?? widths[widths.length - 1];
    positions.push(points[i].x + normal.x * width, points[i].y, points[i].z + normal.y * width);
    positions.push(points[i].x - normal.x * width, points[i].y, points[i].z - normal.y * width);
    uvs.push(0, i / (points.length - 1), 1, i / (points.length - 1));
    if (i < points.length - 1) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 2, a + 3, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function makeCloud(random, index) {
  const group = new THREE.Group();
  const material = new THREE.MeshLambertMaterial({ color: 0xeaf1ec, transparent: true, opacity: 0.72, depthWrite: false });
  const count = 3 + Math.floor(random() * 3);
  for (let i = 0; i < count; i += 1) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(4 + random() * 4, 10, 7), material);
    puff.scale.y = 0.45 + random() * 0.24;
    puff.position.set(i * 5 - count * 2, random() * 2, random() * 3);
    group.add(puff);
  }
  group.position.set(-150 + random() * 300, 62 + random() * 35, -120 + random() * 180);
  group.userData.speed = 0.55 + random() * 0.5;
  group.userData.phase = index * 0.8;
  return group;
}

function makeBird(index) {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: 0x24383b, side: THREE.DoubleSide });
  const wingGeometry = new THREE.BufferGeometry();
  wingGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
    0, 0, 0, -1.15, 0, 0.18, -0.12, 0, -0.18,
    0, 0, 0, 1.15, 0, 0.18, 0.12, 0, -0.18,
  ], 3));
  wingGeometry.computeVertexNormals();
  group.add(new THREE.Mesh(wingGeometry, material));
  group.userData.index = index;
  group.userData.radius = 35 + index * 7;
  group.userData.speed = 0.12 + index * 0.018;
  group.scale.setScalar(0.75 + index * 0.06);
  return group;
}

function makeCrab(position, phase) {
  const group = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 10, 7),
    new THREE.MeshStandardMaterial({ color: 0xa73f2a, roughness: 0.78 }),
  );
  shell.scale.set(1.3, 0.5, 0.9);
  shell.castShadow = true;
  group.add(shell);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x6f2c24, roughness: 0.9 });
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i += 1) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.52, 6), legMaterial);
      leg.rotation.z = Math.PI / 2 + side * 0.22;
      leg.position.set(side * (0.38 + i * 0.08), -0.05, (i - 1) * 0.22);
      group.add(leg);
    }
  }
  group.position.copy(position);
  group.userData.origin = position.clone();
  group.userData.phase = phase;
  return group;
}

function createRain(isMobile) {
  const count = isMobile ? 620 : 1200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 70;
    positions[i * 3 + 1] = Math.random() * 36;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 70;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xcde1e5, size: 0.085, transparent: true, opacity: 0, depthWrite: false });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return points;
}

function createStars(isMobile, random) {
  const count = isMobile ? 280 : 520;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(0.12 + random() * 0.88);
    const radius = 310;
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i * 3 + 1] = Math.cos(phi) * radius;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xeaf4dc, size: isMobile ? 0.72 : 0.9, transparent: true, opacity: 0, depthWrite: false });
  const stars = new THREE.Points(geometry, material);
  stars.visible = false;
  return stars;
}

function createGround(scene) {
  const sandMaterial = new THREE.MeshStandardMaterial({ color: 0xcbb783, roughness: 1, metalness: 0 });
  const sand = new THREE.Mesh(new THREE.CircleGeometry(60, 112), sandMaterial);
  sand.rotation.x = -Math.PI / 2;
  sand.scale.x = 1.3;
  sand.position.y = 0;
  sand.receiveShadow = true;
  scene.add(sand);

  const inner = new THREE.Mesh(
    new THREE.CircleGeometry(47, 96),
    new THREE.MeshStandardMaterial({ color: 0x456b42, roughness: 1 }),
  );
  inner.rotation.x = -Math.PI / 2;
  inner.scale.x = 1.22;
  inner.position.set(0, 0.055, -8);
  inner.receiveShadow = true;
  scene.add(inner);

  const wetSand = new THREE.Mesh(
    new THREE.RingGeometry(55, 60, 112),
    new THREE.MeshStandardMaterial({ color: 0x8f8b6f, roughness: 0.76, transparent: true, opacity: 0.65 }),
  );
  wetSand.rotation.x = -Math.PI / 2;
  wetSand.scale.x = 1.3;
  wetSand.position.y = 0.035;
  scene.add(wetSand);

  const lagoon = new THREE.Mesh(
    new THREE.CircleGeometry(1, 64),
    new THREE.MeshPhysicalMaterial({ color: 0x2a9793, roughness: 0.18, transmission: 0.08, transparent: true, opacity: 0.8 }),
  );
  lagoon.rotation.x = -Math.PI / 2;
  lagoon.scale.set(14, 9, 1);
  lagoon.position.set(29, 0.105, 7);
  scene.add(lagoon);

  const trailPoints = [
    new THREE.Vector3(0, 0.085, 39),
    new THREE.Vector3(-5, 0.085, 25),
    new THREE.Vector3(-12, 0.085, 10),
    new THREE.Vector3(-20, 0.085, -8),
    new THREE.Vector3(-24, 0.085, -24),
  ];
  const trail = createRibbon(trailPoints, [1.2, 1.4, 1.2, 1, 0.8], new THREE.MeshStandardMaterial({ color: 0x9f9669, roughness: 1 }));
  trail.receiveShadow = true;
  scene.add(trail);

  const forestRoutePoints = [
    new THREE.Vector3(-3, 0.09, 35),
    new THREE.Vector3(-7, 0.09, 18),
    new THREE.Vector3(4, 0.09, 1),
    new THREE.Vector3(7, 0.09, -12),
    new THREE.Vector3(8, 0.09, -24),
  ];
  const forestRoute = createRibbon(
    forestRoutePoints,
    [1.45, 1.25, 1.05, 0.92, 1.75],
    new THREE.MeshStandardMaterial({ color: 0x756f4e, roughness: 1 }),
  );
  forestRoute.receiveShadow = true;
  scene.add(forestRoute);

  const lookoutClearing = new THREE.Mesh(
    new THREE.CircleGeometry(4.5, 40),
    new THREE.MeshStandardMaterial({ color: 0x566f47, roughness: 1 }),
  );
  lookoutClearing.rotation.x = -Math.PI / 2;
  lookoutClearing.position.copy(LEVEL.lookout).setY(0.095);
  lookoutClearing.receiveShadow = true;
  scene.add(lookoutClearing);

  const creekPoints = [
    new THREE.Vector3(-24, 0.13, -27),
    new THREE.Vector3(-23, 0.13, -20),
    new THREE.Vector3(-21, 0.13, -13),
    new THREE.Vector3(-18, 0.13, -6),
    new THREE.Vector3(-16, 0.13, 2),
  ];
  const creekMaterial = createCreekMaterial();
  const creek = createRibbon(creekPoints, [0.72, 0.8, 0.95, 1.15, 1.45], creekMaterial);
  scene.add(creek);

  const spring = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 36),
    new THREE.MeshPhysicalMaterial({ color: 0x276d61, roughness: 0.2, transparent: true, opacity: 0.92 }),
  );
  spring.rotation.x = -Math.PI / 2;
  spring.position.set(-24, 0.125, -26.5);
  scene.add(spring);

  return { creekMaterial };
}

function createMountains(scene) {
  const mountainMaterial = new THREE.MeshStandardMaterial({ color: 0x4c5a49, roughness: 1, flatShading: true });
  const shadeMaterial = new THREE.MeshStandardMaterial({ color: 0x394840, roughness: 1, flatShading: true });
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x565a52, roughness: 0.94, flatShading: true });
  const ridges = [
    [-31, -48, 21, 26, mountainMaterial, 8],
    [-22, -58, 24, 35, shadeMaterial, 9],
    [34, -59, 21, 39, mountainMaterial, 10],
    [53, -46, 16, 29, shadeMaterial, 8],
    [46, -38, 15, 20, rockMaterial, 7],
    [-54, -29, 13, 17, rockMaterial, 7],
  ];
  for (const [x, z, radius, height, material, segments] of ridges) {
    const geometry = new THREE.ConeGeometry(radius, height, segments, 5);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i += 1) {
      const y = positions.getY(i);
      if (y > -height * 0.44 && y < height * 0.44) {
        const jitter = 1 + Math.sin(i * 12.9898 + x * 0.31) * 0.055;
        positions.setX(i, positions.getX(i) * jitter);
        positions.setZ(i, positions.getZ(i) * (2 - jitter));
      }
    }
    geometry.computeVertexNormals();
    const mountain = new THREE.Mesh(geometry, material);
    mountain.position.set(x, height * 0.5 - 0.2, z);
    mountain.rotation.y = (x + z) * 0.17;
    mountain.scale.z = 0.64 + (segments % 3) * 0.06;
    mountain.castShadow = true;
    mountain.receiveShadow = true;
    scene.add(mountain);

    const shoulder = new THREE.Mesh(new THREE.DodecahedronGeometry(radius * 0.34, 1), material);
    shoulder.position.set(x + radius * 0.54, radius * 0.12, z + radius * 0.09);
    shoulder.scale.set(1.18, 0.5, 0.74);
    shoulder.rotation.set(0.1, mountain.rotation.y * 0.7, -0.08);
    shoulder.castShadow = true;
    shoulder.receiveShadow = true;
    scene.add(shoulder);
  }
}

export async function createWorld(scene, loadingManager, isMobile = false) {
  const random = mulberry32(8081);
  const loader = new GLTFLoader(loadingManager);
  const ocean = createOcean(isMobile);
  const sky = createSky();
  const stars = createStars(isMobile, random);
  scene.add(ocean.mesh, sky.mesh, stars);
  const { creekMaterial } = createGround(scene);
  createMountains(scene);

  const windGroups = [];
  const interactables = [];
  const fish = [];
  const crabs = [];
  const birds = [];
  const clouds = [];
  const models = new Map();

  const modelUrls = {
    palmTall: `${ASSETS}/nature/tree_palmDetailedTall.glb`,
    palmBend: `${ASSETS}/nature/tree_palmBend.glb`,
    palmShort: `${ASSETS}/nature/tree_palmShort.glb`,
    bush: `${ASSETS}/nature/plant_bushDetailed.glb`,
    plant: `${ASSETS}/nature/plant_flatTall.glb`,
    rockA: `${ASSETS}/nature/rock_largeA.glb`,
    rockB: `${ASSETS}/nature/rock_largeB.glb`,
    rockTall: `${ASSETS}/nature/rock_tallA.glb`,
    canoe: `${ASSETS}/nature/canoe.glb`,
    wood: `${ASSETS}/survival/resource-wood.glb`,
    stone: `${ASSETS}/survival/resource-stone-large.glb`,
    campfire: `${ASSETS}/survival/campfire-pit.glb`,
    shelter: `${ASSETS}/survival/tent-canvas.glb`,
    axe: `${ASSETS}/survival/tool-axe.glb`,
    fish: `${ASSETS}/survival/fish.glb`,
    fishLarge: `${ASSETS}/survival/fish-large.glb`,
    log: `${ASSETS}/survival/tree-log.glb`,
  };

  await Promise.all(Object.entries(modelUrls).map(async ([key, url]) => {
    const gltf = await loader.loadAsync(url);
    models.set(key, enableShadows(gltf.scene));
  }));

  function addModel(key, position, scale = 1, rotation = 0, parent = scene) {
    const object = models.get(key).clone(true);
    object.position.set(position[0], position[1], position[2]);
    object.rotation.y = rotation;
    object.scale.setScalar(scale);
    parent.add(object);
    return object;
  }

  const palmPositions = [
    [-35, -4], [-29, 6], [-23, 17], [-12, 22], [11, 23], [18, 15], [41, 20], [47, 4],
    [35, -8], [24, -17], [-8, -25], [-11, -30], [-38, -18], [-47, 4], [29, 30], [-27, 31],
  ];
  palmPositions.forEach(([x, z], index) => {
    const key = index % 3 === 0 ? 'palmBend' : index % 4 === 0 ? 'palmShort' : 'palmTall';
    const scale = key === 'palmTall' ? 2.8 + random() * 0.7 : 3.1 + random() * 0.7;
    const palm = addModel(key, [x, 0.08, z], scale, random() * Math.PI * 2);
    palm.userData.windPhase = random() * Math.PI * 2;
    palm.userData.baseRotationZ = palm.rotation.z;
    windGroups.push(palm);
  });

  const routePalms = [
    [-13, 20], [-1, 16], [-6, 8], [11, 7], [-4, -3], [14, -4], [-2, -14], [17, -16], [-3, -25], [18, -28],
  ];
  routePalms.forEach(([x, z], index) => {
    const key = index % 3 === 0 ? 'palmShort' : 'palmTall';
    const palm = addModel(key, [x, 0.08, z], key === 'palmTall' ? 2.45 : 2.75, random() * Math.PI * 2);
    palm.userData.windPhase = random() * Math.PI * 2;
    palm.userData.baseRotationZ = palm.rotation.z;
    windGroups.push(palm);
  });

  for (let i = 0; i < (isMobile ? 18 : 30); i += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 17 + random() * 29;
    const x = Math.cos(angle) * radius * 1.18;
    const z = Math.sin(angle) * radius - 7;
    const key = i % 4 === 0 ? 'plant' : 'bush';
    addModel(key, [x, 0.07, z], key === 'bush' ? 2 + random() * 1.5 : 1.6 + random(), random() * Math.PI * 2);
  }

  const rockPositions = [
    [-58, 0], [-54, -8], [-48, -15], [-42, -22], [-38, -30], [49, -17], [52, -7], [48, 3],
    [-32, -25], [-18, -34], [35, -30], [19, -38],
  ];
  rockPositions.forEach(([x, z], index) => {
    addModel(index % 3 === 2 ? 'rockTall' : index % 2 ? 'rockB' : 'rockA', [x, 0.08, z], 2.2 + random() * 2.1, random() * Math.PI * 2);
  });

  const canoe = addModel('canoe', [12, 0.08, 44], 2.25, -0.3);
  canoe.rotation.z = -0.07;

  const campfire = addModel('campfire', [LEVEL.fire.x, 0.12, LEVEL.fire.z], 1.3, 0);
  campfire.visible = false;
  campfire.userData.kind = 'camp';

  const shelter = addModel('shelter', [LEVEL.shelter.x, 0.08, LEVEL.shelter.z], 6.1, Math.PI * 0.86);
  shelter.visible = false;

  const fallenTree = addModel('log', [LEVEL.fallenTree.x, 0.18, LEVEL.fallenTree.z], 3.6, Math.PI * 0.47);
  fallenTree.userData.interactable = true;
  fallenTree.userData.kind = 'fallen-tree';
  fallenTree.userData.id = 'fallen-tree-gate';
  fallenTree.userData.label = '封住林道的倒伏棕榈';
  fallenTree.userData.radius = 4.5;
  interactables.push(fallenTree);

  const routeMarkerMaterial = new THREE.MeshStandardMaterial({ color: 0xa78b58, roughness: 0.9 });
  const routeMarker = new THREE.Group();
  const markerPost = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 2.2, 7), routeMarkerMaterial);
  markerPost.position.y = 1.1;
  const markerCross = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.16, 0.12), routeMarkerMaterial);
  markerCross.position.set(0.25, 1.65, 0);
  markerCross.rotation.z = -0.16;
  routeMarker.add(markerPost, markerCross);
  routeMarker.position.copy(LEVEL.forestPass);
  routeMarker.rotation.y = -0.55;
  routeMarker.traverse((node) => { if (node.isMesh) node.castShadow = true; });
  scene.add(routeMarker);

  const cairn = new THREE.Group();
  const cairnMaterial = new THREE.MeshStandardMaterial({ color: 0x6f7168, roughness: 0.96, flatShading: true });
  [0.62, 0.46, 0.32].forEach((radius, index) => {
    const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 0), cairnMaterial);
    stone.scale.set(1.2, 0.55, 0.9);
    stone.position.y = 0.28 + index * 0.43;
    stone.rotation.y = index * 0.8;
    stone.castShadow = true;
    cairn.add(stone);
  });
  cairn.position.copy(LEVEL.lookout).add(new THREE.Vector3(2.4, 0, -1.2));
  scene.add(cairn);

  const axe = addModel('axe', [0, -100, 0], 0.72, 0);
  axe.visible = false;

  for (const spawn of RESOURCE_SPAWNS) {
    const object = addModel(spawn.type === 'wood' ? 'wood' : 'stone', spawn.position, spawn.type === 'wood' ? 1.55 : 1.25, spawn.rotation);
    object.userData.interactable = true;
    object.userData.kind = spawn.type;
    object.userData.id = spawn.id;
    object.userData.label = spawn.label;
    object.userData.radius = 2.5;
    interactables.push(object);
  }

  const springTarget = new THREE.Object3D();
  springTarget.position.copy(LEVEL.freshwater);
  springTarget.userData = { interactable: true, kind: 'freshwater', label: '清澈的山泉', radius: 3.4 };
  scene.add(springTarget);
  interactables.push(springTarget);

  const campTarget = new THREE.Object3D();
  campTarget.position.copy(LEVEL.camp);
  campTarget.userData = { interactable: true, kind: 'camp', label: '临时营地点', radius: 3.6 };
  scene.add(campTarget);
  interactables.push(campTarget);

  const fishingTarget = new THREE.Object3D();
  fishingTarget.position.copy(LEVEL.fishing);
  fishingTarget.userData = { interactable: true, kind: 'fishing', label: '礁鱼活动的浅水', radius: 4.2 };
  scene.add(fishingTarget);
  interactables.push(fishingTarget);

  const shelterTarget = new THREE.Object3D();
  shelterTarget.position.copy(LEVEL.shelter);
  shelterTarget.userData = { interactable: true, kind: 'shelter', label: '干燥的避雨棚', radius: 4.6 };
  scene.add(shelterTarget);
  interactables.push(shelterTarget);

  const forestPassTarget = new THREE.Object3D();
  forestPassTarget.position.copy(LEVEL.forestPass);
  forestPassTarget.userData = { interactable: true, kind: 'forest-pass', label: '林道中的旧风折木标', radius: 4.5 };
  scene.add(forestPassTarget);
  interactables.push(forestPassTarget);

  const lookoutTarget = new THREE.Object3D();
  lookoutTarget.position.copy(LEVEL.lookout);
  lookoutTarget.userData = { interactable: true, kind: 'lookout', label: '可以观察北侧海面的山脊缺口', radius: 5.4 };
  scene.add(lookoutTarget);
  interactables.push(lookoutTarget);

  const signalSmoke = new THREE.Group();
  const smokeMaterial = new THREE.MeshBasicMaterial({ color: 0x59605d, transparent: true, opacity: 0.58, depthWrite: false, fog: false });
  for (let i = 0; i < 8; i += 1) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(1.4 + i * 0.25, 10, 8), smokeMaterial.clone());
    puff.position.set(Math.sin(i * 1.8) * 1.3, i * 3.1, Math.cos(i * 1.3) * 0.8);
    puff.scale.set(1.25 + i * 0.06, 0.82, 1);
    puff.userData.phase = i * 0.83;
    signalSmoke.add(puff);
  }
  signalSmoke.position.copy(LEVEL.signal);
  signalSmoke.visible = false;
  scene.add(signalSmoke);

  const objectiveBeacon = new THREE.Group();
  const beaconRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.055, 6, 32),
    new THREE.MeshBasicMaterial({ color: 0xf5d89a, transparent: true, opacity: 0.82, depthWrite: false }),
  );
  beaconRing.rotation.x = Math.PI / 2;
  objectiveBeacon.add(beaconRing);
  const beaconArrow = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.5, 5),
    new THREE.MeshBasicMaterial({ color: 0xf5d89a, transparent: true, opacity: 0.86, depthWrite: false }),
  );
  beaconArrow.position.y = 1.05;
  beaconArrow.rotation.z = Math.PI;
  objectiveBeacon.add(beaconArrow);
  objectiveBeacon.visible = false;
  scene.add(objectiveBeacon);

  const fishingRipple = new THREE.Mesh(
    new THREE.RingGeometry(0.65, 0.78, 40),
    new THREE.MeshBasicMaterial({ color: 0xd8ffff, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
  );
  fishingRipple.rotation.x = -Math.PI / 2;
  fishingRipple.position.copy(LEVEL.fishing).add(new THREE.Vector3(0, 0.08, -1.4));
  scene.add(fishingRipple);

  for (let i = 0; i < (isMobile ? 5 : 8); i += 1) {
    const object = addModel(i % 4 === 0 ? 'fishLarge' : 'fish', [28, -0.15, 8], 0.55 + random() * 0.35, 0);
    object.userData.phase = random() * Math.PI * 2;
    object.userData.radius = 3.5 + random() * 7;
    object.userData.speed = 0.35 + random() * 0.22;
    object.traverse((node) => { if (node.isMesh) node.castShadow = false; });
    fish.push(object);
  }

  for (let i = 0; i < 5; i += 1) {
    const angle = i * 1.4;
    const crab = makeCrab(new THREE.Vector3(Math.cos(angle) * 25, 0.3, 38 + Math.sin(angle) * 7), i * 1.7);
    scene.add(crab);
    crabs.push(crab);
  }

  for (let i = 0; i < 5; i += 1) {
    const bird = makeBird(i);
    scene.add(bird);
    birds.push(bird);
  }

  for (let i = 0; i < 9; i += 1) {
    const cloud = makeCloud(random, i);
    scene.add(cloud);
    clouds.push(cloud);
  }

  const rain = createRain(isMobile);
  scene.add(rain);

  let weatherTarget = 0;
  let weatherMix = 0;
  let nightTarget = 0;
  let nightMix = 0;
  let rippleStartedAt = -1;

  return {
    interactables,
    campfire,
    shelter,
    fallenTree,
    signalSmoke,
    objectiveBeacon,
    weather: '晴朗',
    weatherMix: 0,
    nightMix: 0,
    setWeather(mode) {
      weatherTarget = mode === 'storm' ? 0.62 : mode === 'rain' ? 1 : 0;
      this.weather = mode === 'storm' ? '风暴前沿' : weatherTarget ? '热带阵雨' : '晴朗信风';
    },
    setNight(mode) {
      nightTarget = mode === 'night' ? 1 : 0;
    },
    showShelter() {
      shelter.visible = true;
      campfire.visible = true;
    },
    clearFallenTree() {
      fallenTree.position.x -= 4.6;
      fallenTree.position.z += 1.1;
      fallenTree.rotation.y += 0.86;
      fallenTree.userData.interactable = false;
      this.fallenTreeCleared = true;
    },
    revealSignal() {
      signalSmoke.visible = true;
      this.signalRevealed = true;
    },
    equipAxe(characterRoot) {
      const hand = characterRoot.getObjectByName('handslot.r') || characterRoot.getObjectByName('hand.r') || characterRoot;
      hand.add(axe);
      axe.position.set(0.04, 0.02, -0.02);
      axe.rotation.set(Math.PI * 0.15, 0, Math.PI * 0.52);
      axe.scale.setScalar(0.55);
      axe.visible = true;
    },
    triggerFishingRipple(time) {
      rippleStartedAt = time;
      fishingRipple.visible = true;
    },
    update(time, delta, playerPosition) {
      weatherMix = THREE.MathUtils.damp(weatherMix, weatherTarget, 1.8, delta);
      nightMix = THREE.MathUtils.damp(nightMix, nightTarget, 0.72, delta);
      this.weatherMix = weatherMix;
      this.nightMix = nightMix;
      ocean.update(time, weatherMix, nightMix);
      sky.material.uniforms.weatherMix.value = weatherMix;
      sky.material.uniforms.nightMix.value = nightMix;
      stars.visible = nightMix > 0.02;
      stars.material.opacity = nightMix * (0.72 + Math.sin(time * 0.9) * 0.08);
      creekMaterial.uniforms.time.value = time;
      rain.material.opacity = weatherMix * 0.72;
      rain.visible = weatherMix > 0.02;
      rain.position.x = playerPosition.x;
      rain.position.z = playerPosition.z;
      if (rain.visible) {
        const positions = rain.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= delta * (24 + weatherMix * 18);
          positions[i] += delta * 3.5 * weatherMix;
          if (positions[i + 1] < 0) positions[i + 1] += 36;
        }
        rain.geometry.attributes.position.needsUpdate = true;
      }

      windGroups.forEach((palm) => {
        palm.rotation.z = palm.userData.baseRotationZ + Math.sin(time * (0.72 + weatherMix) + palm.userData.windPhase) * (0.012 + weatherMix * 0.025);
      });
      clouds.forEach((cloud) => {
        cloud.position.x += delta * cloud.userData.speed * (1 + weatherMix * 2);
        cloud.children.forEach((child) => { child.material.opacity = 0.68 + weatherMix * 0.15; child.material.color.lerp(new THREE.Color(0x9ca7a6), weatherMix * 0.04); });
        if (cloud.position.x > 180) cloud.position.x = -180;
      });
      birds.forEach((bird) => {
        const a = time * bird.userData.speed + bird.userData.index * 1.7;
        bird.position.set(Math.cos(a) * bird.userData.radius, 24 + Math.sin(a * 1.7) * 4, Math.sin(a) * bird.userData.radius - 12);
        bird.rotation.y = -a + Math.PI * 0.5;
        bird.rotation.z = Math.sin(time * 4.5 + bird.userData.index) * 0.18;
      });
      fish.forEach((object) => {
        const a = time * object.userData.speed + object.userData.phase;
        object.position.set(29 + Math.cos(a) * object.userData.radius, -0.05 + Math.sin(a * 2) * 0.08, 7 + Math.sin(a) * object.userData.radius * 0.52);
        object.rotation.y = -a;
      });
      crabs.forEach((crab) => {
        const a = time * 0.42 + crab.userData.phase;
        crab.position.x = crab.userData.origin.x + Math.sin(a) * 1.8;
        crab.position.z = crab.userData.origin.z + Math.cos(a * 0.7) * 0.7;
        crab.rotation.y = -a * 0.35;
      });
      if (signalSmoke.visible) {
        signalSmoke.children.forEach((puff, index) => {
          puff.position.x = Math.sin(time * 0.38 + puff.userData.phase) * (1.1 + index * 0.11);
          puff.material.opacity = 0.38 + Math.sin(time * 0.7 + index) * 0.08;
        });
      }
      objectiveBeacon.rotation.y += delta * 0.8;
      objectiveBeacon.position.y += Math.sin(time * 2.4) * 0.0018;
      if (rippleStartedAt >= 0) {
        const age = time - rippleStartedAt;
        const pulse = Math.max(0, Math.min(1, age / 1.35));
        fishingRipple.scale.setScalar(1 + pulse * 4.5);
        fishingRipple.material.opacity = Math.sin(pulse * Math.PI) * 0.86;
        if (age > 1.35) {
          fishingRipple.visible = false;
          fishingRipple.material.opacity = 0;
          fishingRipple.scale.setScalar(1);
          rippleStartedAt = -1;
        }
      }
    },
  };
}
