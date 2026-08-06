import * as THREE from './vendor/three.module.min.js';

const lab = window.__CAPABILITY_LAB__;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  return renderer;
}

function fitRenderer(renderer, camera, canvas, orthographicSize = null) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return false;
  const width = Math.round(rect.width), height = Math.round(rect.height);
  if (canvas.width !== Math.round(width * renderer.getPixelRatio()) || canvas.height !== Math.round(height * renderer.getPixelRatio())) {
    renderer.setSize(width, height, false);
    if (orthographicSize) {
      const aspect = width / height;
      camera.left = -orthographicSize * aspect;
      camera.right = orthographicSize * aspect;
      camera.top = orthographicSize;
      camera.bottom = -orthographicSize;
    } else camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  return true;
}

// Backroom capability proof: modular space + first person + atmosphere stack.
const backCanvas = document.querySelector('#backroom-canvas');
const backShell = backCanvas.closest('.backroom-shell');
const backRenderer = createRenderer(backCanvas);
const backScene = new THREE.Scene();
backScene.background = new THREE.Color(0x050807);
backScene.fog = new THREE.FogExp2(0x07100d, 0.055);
const backCamera = new THREE.PerspectiveCamera(66, 1, 0.05, 90);
backCamera.position.set(0, 1.62, 8);
backCamera.rotation.order = 'YXZ';
const backState = { yaw: 0, pitch: 0, ambience: true, structure: false, dragging: false, lastX: 0, lastY: 0 };
const backKeys = new Set();

const floorMat = new THREE.MeshStandardMaterial({ color: 0x27342f, roughness: .92, metalness: .08 });
const wallMat = new THREE.MeshStandardMaterial({ color: 0x46524b, roughness: .86, metalness: .06 });
const rackMat = new THREE.MeshStandardMaterial({ color: 0x34443f, roughness: .5, metalness: .72, emissive: 0x163229, emissiveIntensity: .72 });
const railMat = new THREE.MeshStandardMaterial({ color: 0x89978d, roughness: .36, metalness: .8 });
const emergencyMat = new THREE.MeshStandardMaterial({ color: 0x52241d, emissive: 0xe15d3f, emissiveIntensity: 2.5 });
const fixtureMat = new THREE.MeshStandardMaterial({ color: 0x9bbeb2, emissive: 0x8de8c6, emissiveIntensity: 2.2 });
const archMat = new THREE.MeshStandardMaterial({ color: 0x4b5c55, roughness: .46, metalness: .72 });
const signalMat = new THREE.MeshStandardMaterial({ color: 0x56d7bb, emissive: 0x46d9bd, emissiveIntensity: 3.4 });

const floor = new THREE.Mesh(new THREE.BoxGeometry(8, .16, 64), floorMat); floor.position.set(0, -.08, -22); backScene.add(floor);
const ceiling = new THREE.Mesh(new THREE.BoxGeometry(8, .12, 64), wallMat); ceiling.position.set(0, 3.5, -22); backScene.add(ceiling);
[-4, 4].forEach((x) => { const wall = new THREE.Mesh(new THREE.BoxGeometry(.12, 3.6, 64), wallMat); wall.position.set(x, 1.72, -22); backScene.add(wall); });

const rackGeo = new THREE.BoxGeometry(1.45, 2.45, .88);
const rackMesh = new THREE.InstancedMesh(rackGeo, rackMat, 32);
const dummy = new THREE.Object3D();
let rackIndex = 0;
for (let row = 0; row < 16; row += 1) {
  for (const side of [-1, 1]) {
    dummy.position.set(side * 2.65, 1.23, 3 - row * 3.35);
    dummy.rotation.set(0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0);
    dummy.scale.set(1, .92 + (row % 3) * .035, 1);
    dummy.updateMatrix(); rackMesh.setMatrixAt(rackIndex, dummy.matrix); rackIndex += 1;
  }
}
rackMesh.instanceMatrix.needsUpdate = true; backScene.add(rackMesh);

const railGeo = new THREE.BoxGeometry(.06, .06, 58);
for (const x of [-2.9, 2.9]) { const rail = new THREE.Mesh(railGeo, railMat); rail.position.set(x, 3.18, -22); backScene.add(rail); }
const cableGeo = new THREE.CylinderGeometry(.025, .025, 58, 6);
for (let i = 0; i < 5; i += 1) { const cable = new THREE.Mesh(cableGeo, new THREE.MeshBasicMaterial({ color: i % 2 ? 0x5b2720 : 0x172726 })); cable.rotation.x = Math.PI / 2; cable.position.set(-3.15 + i * .18, 3.02 + (i % 2) * .08, -22); backScene.add(cable); }

const archMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), archMat, 30);
for (let i = 0; i < 10; i += 1) {
  const z = 5 - i * 6;
  for (let side = 0; side < 2; side += 1) {
    dummy.position.set(side ? 3.72 : -3.72, 1.72, z); dummy.scale.set(.22, 3.42, .34); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); archMesh.setMatrixAt(i * 3 + side, dummy.matrix);
  }
  dummy.position.set(0, 3.34, z); dummy.scale.set(7.65, .18, .34); dummy.updateMatrix(); archMesh.setMatrixAt(i * 3 + 2, dummy.matrix);
}
archMesh.instanceMatrix.needsUpdate = true; backScene.add(archMesh);

const indicatorMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(.1, .055, .055), signalMat, 96);
let indicatorIndex = 0;
for (let row = 0; row < 16; row += 1) for (const side of [-1, 1]) for (let light = 0; light < 3; light += 1) {
  dummy.position.set(side * 2.18, .72 + light * .52, 3 - row * 3.35); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); indicatorMesh.setMatrixAt(indicatorIndex++, dummy.matrix);
}
indicatorMesh.instanceMatrix.needsUpdate = true; backScene.add(indicatorMesh);
for (const x of [-1.08, 1.08]) { const track = new THREE.Mesh(new THREE.BoxGeometry(.07, .025, 58), signalMat); track.position.set(x, .02, -22); backScene.add(track); }

const backAmbient = new THREE.HemisphereLight(0x9dbeb2, 0x101813, 1.85); backScene.add(backAmbient);
const backLights = [];
for (let i = 0; i < 9; i += 1) {
  const light = new THREE.PointLight(i % 4 === 3 ? 0xff654f : 0x9dd8c2, i % 4 === 3 ? 7 : 5, 18, 1.7);
  light.position.set((i % 2 ? -1 : 1) * 1.2, 2.9, 4 - i * 6.5); light.userData.phase = i * 1.71; backLights.push(light); backScene.add(light);
  const fixture = new THREE.Mesh(new THREE.BoxGeometry(.8, .05, .16), i % 4 === 3 ? emergencyMat : fixtureMat); fixture.position.copy(light.position); backScene.add(fixture);
}

function applyBackroomMode() {
  backShell.classList.toggle('is-structure', backState.structure);
  rackMat.wireframe = backState.structure; wallMat.wireframe = backState.structure; floorMat.wireframe = backState.structure; archMat.wireframe = backState.structure;
  backScene.fog.density = backState.structure ? .008 : backState.ambience ? .038 : .02;
  backScene.background.set(backState.structure ? 0x14202a : backState.ambience ? 0x0b100e : 0x1b2722);
  backAmbient.intensity = backState.structure ? 3.1 : backState.ambience ? 1.85 : 2.4;
  backRenderer.toneMappingExposure = backState.structure ? 1.35 : backState.ambience ? 1.08 : 1.18;
  document.querySelector('#backroom-feedback').textContent = backState.structure
    ? '结构层：实例化机柜与模块化走廊清晰可见，氛围暂时退后。'
    : backState.ambience ? '氛围层开启：低曝光、密雾、闪烁光源和扫描线共同作用。' : '基础照明：保留空间，关闭最强氛围处理。';
}

function resetBackroom() {
  backCamera.position.set(0, 1.62, 8); backState.yaw = 0; backState.pitch = 0; backKeys.clear();
  document.querySelector('#backroom-feedback').textContent = '已回到入口。拖动舞台改变视角，使用WASD移动。';
}
document.querySelector('[data-backroom-action="ambience"]').addEventListener('click', () => { backState.ambience = !backState.ambience; backState.structure = false; applyBackroomMode(); });
document.querySelector('[data-backroom-action="structure"]').addEventListener('click', () => { backState.structure = !backState.structure; applyBackroomMode(); });
document.querySelector('[data-backroom-action="reset"]').addEventListener('click', resetBackroom);

backCanvas.addEventListener('pointerdown', (event) => { backState.dragging = true; backState.lastX = event.clientX; backState.lastY = event.clientY; backCanvas.setPointerCapture?.(event.pointerId); });
backCanvas.addEventListener('pointermove', (event) => {
  if (!backState.dragging) return;
  backState.yaw -= (event.clientX - backState.lastX) * .0042; backState.pitch -= (event.clientY - backState.lastY) * .003;
  backState.pitch = clamp(backState.pitch, -.48, .48); backState.lastX = event.clientX; backState.lastY = event.clientY;
});
['pointerup','pointercancel','lostpointercapture'].forEach((name) => backCanvas.addEventListener(name, () => { backState.dragging = false; }));

function nudgeBackroom(code) {
  const forward = code === 'KeyW' ? 1 : code === 'KeyS' ? -1 : 0;
  const strafe = code === 'KeyD' ? 1 : code === 'KeyA' ? -1 : 0;
  const sin = Math.sin(backState.yaw), cos = Math.cos(backState.yaw);
  backCamera.position.x = clamp(backCamera.position.x + (strafe * cos - forward * sin) * .42, -1.65, 1.65);
  backCamera.position.z = clamp(backCamera.position.z + (strafe * sin - forward * cos) * .42, -48, 8.5);
}
document.querySelectorAll('[data-back-key]').forEach((button) => {
  button.addEventListener('pointerdown', (event) => { button.setPointerCapture?.(event.pointerId); nudgeBackroom(button.dataset.backKey); backKeys.add(button.dataset.backKey); });
  ['pointerup','pointercancel','lostpointercapture'].forEach((name) => button.addEventListener(name, () => backKeys.delete(button.dataset.backKey)));
});
window.addEventListener('keydown', (event) => { if (lab.activeCase === 'backroom' && ['KeyW','KeyA','KeyS','KeyD'].includes(event.code)) { event.preventDefault(); backKeys.add(event.code); } });
window.addEventListener('keyup', (event) => backKeys.delete(event.code));

// MiniTown capability proof: orthographic world + instanced state + day/night.
const townCanvas = document.querySelector('#minitown-canvas');
const townRenderer = createRenderer(townCanvas);
townRenderer.shadowMap.enabled = true; townRenderer.shadowMap.type = THREE.PCFShadowMap;
const townScene = new THREE.Scene(); townScene.background = new THREE.Color(0xabc7ca);
const townCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, .1, 80); townCamera.position.set(12, 13, 12); townCamera.lookAt(0, 0, 0);
const townAmbient = new THREE.HemisphereLight(0xd6edf0, 0x40513d, 2.5); townScene.add(townAmbient);
const townSun = new THREE.DirectionalLight(0xffe4ad, 4.2); townSun.position.set(7, 11, 4); townSun.castShadow = true; townSun.shadow.mapSize.set(1024, 1024); townScene.add(townSun);
const water = new THREE.Mesh(new THREE.PlaneGeometry(38, 38), new THREE.MeshStandardMaterial({ color: 0x527f89, roughness: .34, metalness: .12, transparent: true, opacity: .94 })); water.rotation.x = -Math.PI / 2; water.position.y = -.72; townScene.add(water);
const sandRim = new THREE.Mesh(new THREE.BoxGeometry(13.3, .35, 13.3), new THREE.MeshStandardMaterial({ color: 0xc1a96f, roughness: .95 })); sandRim.position.y = -.55; sandRim.receiveShadow = true; townScene.add(sandRim);
const island = new THREE.Mesh(new THREE.BoxGeometry(12.5, .65, 12.5), new THREE.MeshStandardMaterial({ color: 0x7d9855, roughness: .9 })); island.position.y = -.28; island.receiveShadow = true; townScene.add(island);
const grid = new THREE.GridHelper(12, 12, 0x546c47, 0x6f875a); grid.position.y = .015; townScene.add(grid);

const roadMat = new THREE.MeshStandardMaterial({ color: 0x9d8a62, roughness: .95 });
const roadTiles = new THREE.InstancedMesh(new THREE.BoxGeometry(.84, .035, .84), roadMat, 32);
for (let i = 0; i < 32; i += 1) {
  const edge = Math.floor(i / 8), step = (i % 8) - 3.5;
  const x = edge < 2 ? step * 1.05 : edge === 2 ? -4.7 : 4.7;
  const z = edge < 2 ? (edge ? 4.7 : -4.7) : step * 1.05;
  dummy.position.set(x, .035, z); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); roadTiles.setMatrixAt(i, dummy.matrix);
}
roadTiles.receiveShadow = true; townScene.add(roadTiles);

const treeTrunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.09, .13, .8, 5), new THREE.MeshStandardMaterial({ color: 0x4b3725 }), 44);
const treeCrowns = new THREE.InstancedMesh(new THREE.ConeGeometry(.42, 1.15, 6), new THREE.MeshStandardMaterial({ color: 0x2f603d, roughness: .92 }), 44);
const treeDummy = new THREE.Object3D();
for (let i = 0; i < 44; i += 1) {
  const angle = i / 44 * Math.PI * 2; const radius = 5.15 + (i % 4) * .16;
  const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius;
  treeDummy.position.set(x, .4, z); treeDummy.rotation.y = i * 1.27; treeDummy.scale.setScalar(.75 + (i % 5) * .07); treeDummy.updateMatrix(); treeTrunks.setMatrixAt(i, treeDummy.matrix);
  treeDummy.position.y = 1.15; treeDummy.updateMatrix(); treeCrowns.setMatrixAt(i, treeDummy.matrix);
}
treeTrunks.castShadow = treeCrowns.castShadow = true; townScene.add(treeTrunks, treeCrowns);

const rockMesh = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(.22, 0), new THREE.MeshStandardMaterial({ color: 0x68736b, roughness: .9 }), 26);
for (let i = 0; i < 26; i += 1) {
  const angle = i / 26 * Math.PI * 2 + .15; const radius = 5.7 + (i % 3) * .13;
  dummy.position.set(Math.cos(angle) * radius, .1, Math.sin(angle) * radius); dummy.rotation.set(i * .31, i * .7, 0); dummy.scale.set(.7 + i % 4 * .13, .65 + i % 3 * .11, .8); dummy.updateMatrix(); rockMesh.setMatrixAt(i, dummy.matrix);
}
rockMesh.castShadow = true; townScene.add(rockMesh);

const lampMat = new THREE.MeshStandardMaterial({ color: 0xffd47c, emissive: 0xffb34b, emissiveIntensity: .2 });
const lampPosts = new THREE.Group();
for (let i = -3; i <= 3; i += 2) for (const z of [-4.7, 4.7]) {
  const post = new THREE.Mesh(new THREE.CylinderGeometry(.035, .045, .72, 6), new THREE.MeshStandardMaterial({ color: 0x3f4b45, roughness: .7 })); post.position.set(i, .36, z); post.castShadow = true;
  const glow = new THREE.Mesh(new THREE.BoxGeometry(.18, .18, .18), lampMat); glow.position.set(i, .76, z); lampPosts.add(post, glow);
}
townScene.add(lampPosts);

const buildingSpecs = {
  home: { color: 0xd5b574, emissive: 0xffb75d, population: 4, height: 1.05 },
  workshop: { color: 0x708d97, emissive: 0xff9d3b, population: 2, height: 1.4 },
  park: { color: 0x4f8a50, emissive: 0x204d25, population: 0, height: .38 },
};
const townMeshes = {};
const townRoofMeshes = {};
const townWindowMeshes = {};
Object.entries(buildingSpecs).forEach(([key, spec]) => {
  const geometry = key === 'park' ? new THREE.CylinderGeometry(.42, .55, spec.height, 7) : new THREE.BoxGeometry(.82, spec.height, .82);
  const material = new THREE.MeshStandardMaterial({ color: spec.color, roughness: .8, emissive: spec.emissive, emissiveIntensity: 0 });
  const mesh = new THREE.InstancedMesh(geometry, material, 36); mesh.count = 0; mesh.castShadow = true; mesh.receiveShadow = true; townMeshes[key] = mesh; townScene.add(mesh);
  const roofGeometry = key === 'home' ? new THREE.ConeGeometry(.67, .5, 4) : key === 'workshop' ? new THREE.BoxGeometry(1.02, .16, 1.02) : new THREE.ConeGeometry(.6, .72, 7);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: key === 'home' ? 0x8c5d45 : key === 'workshop' ? 0x52636c : 0x356d42, roughness: .86 });
  const roof = new THREE.InstancedMesh(roofGeometry, roofMaterial, 36); roof.count = 0; roof.castShadow = true; townRoofMeshes[key] = roof; townScene.add(roof);
  const window = new THREE.InstancedMesh(new THREE.BoxGeometry(.28, .24, .04), new THREE.MeshStandardMaterial({ color: 0xffd58a, emissive: 0xffb75d, emissiveIntensity: 0 }), 36); window.count = 0; townWindowMeshes[key] = window; townScene.add(window);
});
const townState = { tool: 'home', time: 9, buildings: [], occupied: new Set() };
const selector = new THREE.Mesh(new THREE.BoxGeometry(.92, .04, .92), new THREE.MeshBasicMaterial({ color: 0xf1cb69, transparent: true, opacity: .65 })); selector.position.y = .045; selector.visible = false; townScene.add(selector);
const townRay = new THREE.Raycaster(); const townPointer = new THREE.Vector2(); const townPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); const townHit = new THREE.Vector3();

function rebuildTownInstances() {
  Object.entries(townMeshes).forEach(([key, mesh]) => {
    const entries = townState.buildings.filter((building) => building.type === key); mesh.count = entries.length;
    entries.forEach((building, index) => {
      const spec = buildingSpecs[key]; dummy.position.set(building.x, spec.height / 2, building.z); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    const roof = townRoofMeshes[key]; roof.count = entries.length;
    entries.forEach((building, index) => {
      const spec = buildingSpecs[key]; const roofY = key === 'park' ? spec.height + .34 : spec.height + (key === 'home' ? .24 : .08);
      dummy.position.set(building.x, roofY, building.z); dummy.rotation.set(0, key === 'home' ? Math.PI / 4 : 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); roof.setMatrixAt(index, dummy.matrix);
    });
    roof.instanceMatrix.needsUpdate = true;
    const windows = townWindowMeshes[key]; windows.count = key === 'park' ? 0 : entries.length;
    if (key !== 'park') entries.forEach((building, index) => {
      const spec = buildingSpecs[key]; dummy.position.set(building.x, spec.height * .52, building.z + .43); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); windows.setMatrixAt(index, dummy.matrix);
    });
    windows.instanceMatrix.needsUpdate = true;
  });
  document.querySelector('#town-buildings').textContent = String(townState.buildings.length);
  document.querySelector('#town-population').textContent = String(townState.buildings.reduce((sum, building) => sum + buildingSpecs[building.type].population, 0));
}

function applyTownTime() {
  const hour = townState.time % 24; const daylight = clamp(Math.sin((hour - 6) / 12 * Math.PI), 0, 1); const night = 1 - daylight;
  townScene.background.set(new THREE.Color(0x263052).lerp(new THREE.Color(0xabc7ca), daylight));
  townAmbient.intensity = .55 + daylight * 2.2; townSun.intensity = .2 + daylight * 4.1; townSun.color.set(hour > 16 || hour < 8 ? 0xffb26f : 0xffe4ad);
  Object.entries(townMeshes).forEach(([key, mesh]) => { mesh.material.emissiveIntensity = key === 'park' ? .05 : night * 1.8; });
  Object.entries(townWindowMeshes).forEach(([key, mesh]) => { mesh.material.emissiveIntensity = key === 'park' ? 0 : .2 + night * 3.8; });
  lampMat.emissiveIntensity = .2 + night * 4.2;
  water.material.color.set(new THREE.Color(0x203b54).lerp(new THREE.Color(0x527f89), daylight));
  townRenderer.toneMappingExposure = .72 + daylight * .38;
  document.querySelector('#town-time').textContent = `${String(Math.floor(hour)).padStart(2,'0')}:00`;
}

function placeTownBuilding(event) {
  if (lab.activeCase !== 'minitown') return;
  const rect = townCanvas.getBoundingClientRect();
  townPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; townPointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  townRay.setFromCamera(townPointer, townCamera); if (!townRay.ray.intersectPlane(townPlane, townHit)) return;
  const x = Math.round(townHit.x), z = Math.round(townHit.z); const key = `${x}:${z}`;
  if (Math.abs(x) > 4 || Math.abs(z) > 4) { document.querySelector('#town-feedback').textContent = '建造失败：请选择岛屿中央网格。'; return; }
  if (townState.occupied.has(key)) { document.querySelector('#town-feedback').textContent = '这个网格已经有建筑。'; return; }
  townState.occupied.add(key); townState.buildings.push({ x, z, type: townState.tool }); rebuildTownInstances();
  document.querySelector('#town-feedback').textContent = `${townState.tool === 'home' ? '住宅' : townState.tool === 'workshop' ? '工坊' : '绿地'}已建成：世界与统计同步变化。`;
}
townCanvas.addEventListener('pointermove', (event) => {
  const rect = townCanvas.getBoundingClientRect(); townPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; townPointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  townRay.setFromCamera(townPointer, townCamera); if (townRay.ray.intersectPlane(townPlane, townHit)) { const x = Math.round(townHit.x), z = Math.round(townHit.z); selector.visible = Math.abs(x) <= 4 && Math.abs(z) <= 4; selector.position.set(x, .045, z); }
});
townCanvas.addEventListener('pointerleave', () => { selector.visible = false; }); townCanvas.addEventListener('click', placeTownBuilding);
document.querySelectorAll('[data-town-tool]').forEach((button) => button.addEventListener('click', () => {
  townState.tool = button.dataset.townTool; document.querySelectorAll('[data-town-tool]').forEach((entry) => entry.classList.toggle('is-selected', entry === button));
  document.querySelector('#town-feedback').textContent = `已选择${button.textContent}，点击空白网格建造。`;
}));
document.querySelector('[data-town-action="time"]').addEventListener('click', () => { townState.time = (townState.time + 6) % 24; applyTownTime(); document.querySelector('#town-feedback').textContent = '时间已推进：天空、主光源和建筑发光同时更新。'; });
document.querySelector('[data-town-action="reset"]').addEventListener('click', () => { townState.buildings = []; townState.occupied.clear(); townState.time = 9; rebuildTownInstances(); applyTownTime(); document.querySelector('#town-feedback').textContent = '小镇已清空，世界状态恢复初始值。'; });

applyBackroomMode(); rebuildTownInstances(); applyTownTime();

let lastTime = performance.now();
function render3D(now) {
  const dt = Math.min(.04, (now - lastTime) / 1000 || 0); lastTime = now;
  if (lab.activeCase === 'backroom' && fitRenderer(backRenderer, backCamera, backCanvas)) {
    const forward = Number(backKeys.has('KeyW')) - Number(backKeys.has('KeyS'));
    const strafe = Number(backKeys.has('KeyD')) - Number(backKeys.has('KeyA'));
    const speed = 3.2 * dt; const sin = Math.sin(backState.yaw), cos = Math.cos(backState.yaw);
    backCamera.position.x += (strafe * cos - forward * sin) * speed; backCamera.position.z += (strafe * sin - forward * cos) * speed;
    backCamera.position.x = clamp(backCamera.position.x, -1.65, 1.65); backCamera.position.z = clamp(backCamera.position.z, -48, 8.5);
    backCamera.rotation.set(backState.pitch, backState.yaw, 0);
    backLights.forEach((light, index) => { light.intensity = backState.structure ? 1.2 : (index % 4 === 3 ? 6.2 : 4.5) * (1 + Math.sin(now * .007 + light.userData.phase) * .15); });
    signalMat.emissiveIntensity = backState.structure ? .4 : 3.1 + Math.sin(now * .003) * .45;
    backRenderer.render(backScene, backCamera);
    document.querySelector('#backroom-position').textContent = `SECTOR A-${String(Math.max(1, Math.floor((8 - backCamera.position.z) / 6) + 1)).padStart(2,'0')}`;
    document.querySelector('#backroom-fps').textContent = `${backRenderer.info.render.calls} CALLS`;
  }
  if (lab.activeCase === 'minitown' && fitRenderer(townRenderer, townCamera, townCanvas, 7.4)) {
    water.position.y = -.72 + Math.sin(now * .0007) * .018;
    townRenderer.render(townScene, townCamera);
  }
  requestAnimationFrame(render3D);
}

window.addEventListener('capabilitylab:casechange', () => requestAnimationFrame(() => { fitRenderer(backRenderer, backCamera, backCanvas); fitRenderer(townRenderer, townCamera, townCanvas, 7.4); }));
window.addEventListener('resize', () => { fitRenderer(backRenderer, backCamera, backCanvas); fitRenderer(townRenderer, townCamera, townCanvas, 7.4); });
window.addEventListener('blur', () => backKeys.clear());

window.__CAPABILITY_LAB_3D__ = {
  getBackroomSnapshot: () => ({ position: backCamera.position.toArray(), ambience: backState.ambience, structure: backState.structure, calls: backRenderer.info.render.calls, instances: rackMesh.count }),
  getTownSnapshot: () => ({ time: townState.time, buildings: townState.buildings.length, population: townState.buildings.reduce((sum, building) => sum + buildingSpecs[building.type].population, 0), treeInstances: treeCrowns.count }),
};
document.documentElement.dataset.threeStatus = 'ready';
requestAnimationFrame(render3D);
