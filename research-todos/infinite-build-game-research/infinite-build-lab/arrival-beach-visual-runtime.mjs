import * as THREE from "./vendor/three.module.min.js";

const query = new URLSearchParams(window.location.search);
const reduceMotion = query.get("motion") === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.dataset.reducedMotion = String(reduceMotion);
if (query.get("fallback") === "1") throw new Error("Arrival beach WebGL fallback review fixture");

const canvas = document.querySelector("#arrival-beach-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .92;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x71858a, .0115);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, .1, 260);
const cameraTarget = new THREE.Vector3(1.5, 2.1, 5.2);
const cameraLook = new THREE.Vector3();
let orbitYaw = -2.15;
let orbitPitch = .34;
let orbitDistance = 30;
let autoCamera = true;
let dragging = false;
let lastPointerX = 0;
let lastPointerY = 0;

const world = new THREE.Group();
scene.add(world);

const hemi = new THREE.HemisphereLight(0xb9d7d9, 0x29332d, 1.65);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffd6a0, 3.1);
sun.position.set(-26, 32, -24);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -32;
sun.shadow.camera.right = 32;
sun.shadow.camera.top = 34;
sun.shadow.camera.bottom = -18;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 90;
sun.shadow.bias = -.00035;
scene.add(sun);

const fill = new THREE.DirectionalLight(0x79a7b0, .65);
fill.position.set(18, 12, 4);
scene.add(fill);

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(min, max, value) {
  const x = clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

function shorelineAt(x) {
  return -1.45 + Math.sin(x * .13) * 1.6 + x * .035;
}

function terrainHeight(x, z) {
  const shore = shorelineAt(x);
  const inland = z - shore;
  if (inland < 0) return -1.12 + smoothstep(-2.2, 0, inland) + inland * .02;
  const fine = Math.sin(x * .42 + z * .23) * .075 + Math.cos(x * .19 - z * .31) * .055;
  const dune = smoothstep(4, 18, inland) * (.6 + Math.sin(x * .18 + z * .12) * .22);
  const rightHill = Math.exp(-(((x - 15) ** 2) / 145 + ((z - 21) ** 2) / 120)) * 7.2;
  const headland = Math.exp(-(((x + 22) ** 2) / 75 + ((z - 12) ** 2) / 170)) * 4.4;
  const pathCenter = 2.5 + z * .12;
  const pathCut = Math.exp(-((x - pathCenter) ** 2) / 7.5) * smoothstep(7, 24, z) * 1.05;
  return -.12 + inland * .026 + fine + dune + rightHill * (1 - pathCut * .68) + headland - pathCut;
}

function material(color, roughness = .8, metalness = 0, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...options });
}

const mats = {
  rock: material(0x20292b, .94),
  rockWet: material(0x172326, .55),
  wetSand: new THREE.MeshPhysicalMaterial({ color: 0x625d55, roughness: .68, metalness: 0, clearcoat: .08, clearcoatRoughness: .72, transparent: true, opacity: .78 }),
  trunk: material(0x4c382b, .93),
  trunkWet: material(0x392d27, .72),
  leaf: material(0x274a38, .78, 0, { side: THREE.DoubleSide }),
  leafLight: material(0x3f6850, .75, 0, { side: THREE.DoubleSide }),
  cloth: material(0x343d3d, .8),
  clothLight: material(0x59605c, .82),
  skin: material(0x956b55, .73),
  orange: material(0x9b4324, .62),
  orangeLight: material(0xc06435, .58),
  metal: material(0x556064, .52, .3),
  rubber: material(0x181d1e, .9),
  luggageBlue: material(0x263d4a, .75),
  luggageRed: material(0x5d3030, .76),
};

function makeTerrain() {
  const xSegments = 96;
  const zSegments = 74;
  const width = 62;
  const depth = 44;
  const positions = [];
  const colors = [];
  const indices = [];
  const sandDry = new THREE.Color(0x9b8667);
  const sandWet = new THREE.Color(0x665f55);
  const soil = new THREE.Color(0x4f523d);
  const green = new THREE.Color(0x304735);
  const scratch = new THREE.Color();

  for (let iz = 0; iz <= zSegments; iz += 1) {
    const z = -8 + iz / zSegments * depth;
    for (let ix = 0; ix <= xSegments; ix += 1) {
      const x = -width / 2 + ix / xSegments * width;
      const y = terrainHeight(x, z);
      positions.push(x, y, z);
      const inland = z - shorelineAt(x);
      if (inland < 3.7) scratch.copy(sandWet).lerp(sandDry, smoothstep(.3, 3.7, inland));
      else if (inland < 11) scratch.copy(sandDry).lerp(soil, smoothstep(6, 11, inland));
      else scratch.copy(soil).lerp(green, smoothstep(11, 23, inland));
      const variation = Math.sin(x * .74 + z * .41) * .025;
      colors.push(clamp(scratch.r + variation, 0, 1), clamp(scratch.g + variation, 0, 1), clamp(scratch.b + variation, 0, 1));
    }
  }

  for (let iz = 0; iz < zSegments; iz += 1) {
    for (let ix = 0; ix < xSegments; ix += 1) {
      const a = iz * (xSegments + 1) + ix;
      const b = a + 1;
      const c = a + xSegments + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const terrainMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .86, metalness: 0 });
  const mesh = new THREE.Mesh(geometry, terrainMaterial);
  mesh.receiveShadow = true;
  return mesh;
}

const terrain = makeTerrain();
world.add(terrain);

function makeWetSandRibbon() {
  const positions = [];
  const uvs = [];
  const indices = [];
  const segments = 90;
  for (let i = 0; i <= segments; i += 1) {
    const x = -30 + i / segments * 60;
    const shore = shorelineAt(x);
    [shore + .35, shore + 3.8].forEach((z, row) => {
      positions.push(x, terrainHeight(x, z) + .018, z);
      uvs.push(i / segments, row);
    });
  }
  for (let i = 0; i < segments; i += 1) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 2, a + 1, a + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const ribbon = new THREE.Mesh(geometry, mats.wetSand);
  ribbon.receiveShadow = true;
  return ribbon;
}

// Terrain vertex colors carry the wet-to-dry transition. Keeping this as one
// continuous surface avoids transparent-ribbon z-fighting along the surf line.

const oceanUniforms = {
  uTime: { value: 0 },
  uStorm: { value: 1 },
  uSunDirection: { value: new THREE.Vector3(-.55, .24, -.6) },
};

const oceanMaterial = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  transparent: false,
  side: THREE.DoubleSide,
  vertexShader: `
    uniform float uTime;
    uniform float uStorm;
    varying vec3 vWorld;
    varying float vWave;
    void main() {
      vec3 p = position;
      float a = sin(p.x * .19 + p.y * .34 + uTime * 1.35) * (.16 + uStorm * .12);
      float b = sin(p.x * -.31 + p.y * .16 + uTime * .92) * (.09 + uStorm * .08);
      float c = cos(p.x * .08 + p.y * .53 - uTime * 1.7) * .055;
      p.z += a + b + c;
      vWave = a + b + c;
      vec4 world = modelMatrix * vec4(p, 1.0);
      vWorld = world.xyz;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uStorm;
    varying vec3 vWorld;
    varying float vWave;
    void main() {
      float shore = -1.45 + sin(vWorld.x * .13) * 1.6 + vWorld.x * .035;
      float landDistance = vWorld.z - shore;
      if (landDistance > .78) discard;
      float shallow = smoothstep(-14.0, .5, landDistance);
      vec3 deepStorm = vec3(.018, .13, .18);
      vec3 shallowStorm = vec3(.08, .36, .39);
      vec3 deepClear = vec3(.025, .24, .31);
      vec3 shallowClear = vec3(.09, .52, .52);
      vec3 deep = mix(deepClear, deepStorm, uStorm);
      vec3 shallowColor = mix(shallowClear, shallowStorm, uStorm);
      vec3 color = mix(deep, shallowColor, shallow);
      float spec = pow(max(0.0, sin(vWorld.x * .055 + uTime * .23) * .5 + .5), 9.0) * (1.0 - uStorm * .42);
      color += vec3(1.0, .78, .48) * spec * .24;
      float foamWave = sin(vWorld.x * .58 + uTime * 2.1) * .22 + sin(vWorld.x * .17 - uTime * 1.35) * .16;
      float foamDistance = abs(landDistance + .28 + foamWave);
      float foam = 1.0 - smoothstep(.18, .72, foamDistance);
      foam *= smoothstep(-3.8, .3, landDistance);
      color = mix(color, vec3(.82, .9, .88), foam * (.72 + uStorm * .2));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

const ocean = new THREE.Mesh(new THREE.PlaneGeometry(130, 115, 180, 130), oceanMaterial);
ocean.rotation.x = -Math.PI / 2;
ocean.position.set(0, -.22, -48);
ocean.receiveShadow = true;
world.add(ocean);

const skyUniforms = { uStorm: { value: 1 }, uSun: { value: new THREE.Vector3(-.42, .08, -.9) } };
const skyMaterial = new THREE.ShaderMaterial({
  uniforms: skyUniforms,
  side: THREE.BackSide,
  depthWrite: false,
  vertexShader: `varying vec3 vWorld; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
  fragmentShader: `
    uniform float uStorm;
    uniform vec3 uSun;
    varying vec3 vWorld;
    void main(){
      vec3 dir=normalize(vWorld);
      float h=clamp(dir.y*.65+.35,0.0,1.0);
      vec3 clearLow=vec3(.40,.56,.57);
      vec3 clearHigh=vec3(.12,.27,.34);
      vec3 stormLow=vec3(.25,.34,.35);
      vec3 stormHigh=vec3(.035,.075,.095);
      vec3 color=mix(mix(clearLow,clearHigh,h),mix(stormLow,stormHigh,h),uStorm);
      float sunGlow=pow(max(dot(dir,normalize(uSun)),0.0),12.0);
      color+=vec3(1.0,.63,.32)*sunGlow*(.65-uStorm*.32);
      float cloudBand=sin(dir.x*18.0+dir.z*10.0)*sin(dir.z*23.0-dir.x*8.0);
      color-=max(0.0,cloudBand)*uStorm*.035*(1.0-h);
      gl_FragColor=vec4(color,1.0);
    }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(150, 42, 24), skyMaterial);
scene.add(sky);

function makeCloudTexture() {
  const source = document.createElement("canvas");
  source.width = 256;
  source.height = 128;
  const ctx = source.getContext("2d");
  ctx.clearRect(0, 0, 256, 128);
  const puffs = [[60,73,48],[104,55,58],[150,64,52],[195,76,39],[128,82,70]];
  puffs.forEach(([x, y, r]) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, "rgba(225,232,230,.88)");
    gradient.addColorStop(.54, "rgba(174,187,186,.55)");
    gradient.addColorStop(1, "rgba(117,132,135,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 128);
  });
  const texture = new THREE.CanvasTexture(source);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const cloudTexture = makeCloudTexture();
const clouds = [];
for (let i = 0; i < 13; i += 1) {
  const cloud = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTexture, color: i % 3 ? 0x69777b : 0x8c9696, transparent: true, opacity: .54, depthWrite: false }));
  const angle = -1.95 + i * .24;
  const radius = 88 + (i % 4) * 8;
  cloud.position.set(Math.sin(angle) * radius, 23 + (i % 3) * 5, Math.cos(angle) * radius - 18);
  cloud.scale.set(34 + (i % 3) * 10, 15 + (i % 2) * 5, 1);
  cloud.userData.phase = i * .57;
  clouds.push(cloud);
  scene.add(cloud);
}

function addRock(x, z, scale, wet = false, rotation = 0) {
  const geometry = new THREE.DodecahedronGeometry(1, 1);
  const rock = new THREE.Mesh(geometry, wet ? mats.rockWet : mats.rock);
  rock.position.set(x, terrainHeight(x, z) + scale * .37, z);
  rock.scale.set(scale * 1.2, scale * .62, scale);
  rock.rotation.set(.08, rotation, -.04);
  rock.castShadow = true;
  rock.receiveShadow = true;
  world.add(rock);
  return rock;
}

[
  [-19,-2.1,2.4,true,.2],[-16,-.6,1.35,true,1.1],[-12,-2.8,1.05,true,.7],[-22,2.7,2.1,false,.4],
  [19,3.8,1.8,true,.5],[22,6.2,2.8,false,1.2],[24,10.8,3.2,false,.3],[17,10.2,1.4,false,.9],
  [12,17,2.5,false,.2],[18,18.5,3.1,false,.7],[23,20,3.5,false,.35],[27,16,2.7,false,1.1],
  [-7,1.6,.48,true,.5],[-1,3.4,.32,false,.9],[5,2.6,.38,false,.4],[10,5.2,.55,false,.8],
].forEach((entry) => addRock(...entry));

function cylinderBetween(start, end, radius, mat, radialSegments = 8) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(radius * .82, radius, length, radialSegments);
  const value = new THREE.Mesh(geometry, mat);
  value.position.copy(start).add(end).multiplyScalar(.5);
  value.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  value.castShadow = true;
  return value;
}

const palms = [];
const palmLeafGeometry = (() => {
  const positions = [];
  const indices = [];
  const segments = 7;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const width = Math.sin(Math.PI * t) * .36;
    const x = t * 3.8;
    const y = -.18 * t - .68 * t * t;
    positions.push(x, y, -width, x, y, width);
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
})();

function createPalm(x, z, scale = 1, leanX = 0, leanZ = 0) {
  const group = new THREE.Group();
  group.position.set(x, terrainHeight(x, z), z);
  const segments = 5;
  let start = new THREE.Vector3(0, 0, 0);
  for (let i = 0; i < segments; i += 1) {
    const t = (i + 1) / segments;
    const end = new THREE.Vector3(leanX * t * t, 1.22 * scale * (i + 1), leanZ * t * t);
    group.add(cylinderBetween(start, end, .14 * scale * (1 - i * .08), i < 2 ? mats.trunkWet : mats.trunk, 9));
    start = end;
  }
  const crown = new THREE.Group();
  crown.position.copy(start);
  for (let i = 0; i < 9; i += 1) {
    const angle = i / 9 * Math.PI * 2;
    const leaf = new THREE.Mesh(palmLeafGeometry, i % 3 ? mats.leaf : mats.leafLight);
    leaf.rotation.y = -angle;
    leaf.rotation.z = -.05 + (i % 2) * .08;
    leaf.scale.setScalar(scale * (.86 + (i % 3) * .08));
    leaf.position.set(0, -.04 * scale, 0);
    leaf.castShadow = true;
    crown.add(leaf);
  }
  group.add(crown);
  group.userData.crown = crown;
  group.userData.phase = x * .17 + z * .11;
  group.rotation.z = leanX * .02;
  group.rotation.x = leanZ * .015;
  palms.push(group);
  world.add(group);
  return group;
}

[
  [15,14,1.05,-1.8,-.5],[20,13,.92,-1.2,.2],[12,19,1.15,-2.1,-.8],[18,22,1.12,-1.4,-.5],
  [7,20,.88,-.8,-.2],[2,24,.98,-1.1,.1],[-5,22,.92,-.5,-.2],[-12,19,.8,.3,-.3],
  [25,18,1.18,-2.3,-.4],[-19,15,.76,.5,-.1],
].forEach((entry) => createPalm(...entry));

const shrubGeometry = new THREE.DodecahedronGeometry(.72, 1);
const shrubMaterial = material(0x294938, .86);
const shrubs = new THREE.InstancedMesh(shrubGeometry, shrubMaterial, 92);
shrubs.castShadow = true;
shrubs.receiveShadow = true;
const dummy = new THREE.Object3D();
let shrubCount = 0;
for (let row = 0; row < 8; row += 1) {
  for (let column = 0; column < 15; column += 1) {
    if (shrubCount >= 92) break;
    const z = 11 + row * 2.5 + Math.sin(column * 1.7 + row) * .8;
    const x = -27 + column * 3.9 + Math.sin(row * 2.1 + column) * .9;
    const pathCenter = 2.5 + z * .12;
    if (Math.abs(x - pathCenter) < 2.25 && z < 27) continue;
    dummy.position.set(x, terrainHeight(x, z) + .24, z);
    const s = .55 + ((column * 13 + row * 7) % 8) * .07;
    dummy.scale.set(s * 1.62, s * .56, s * .82);
    dummy.rotation.y = column * .7 + row;
    dummy.updateMatrix();
    shrubs.setMatrixAt(shrubCount, dummy.matrix);
    shrubs.setColorAt(shrubCount, new THREE.Color((column + row) % 3 === 0 ? 0x3f6846 : 0x294938));
    shrubCount += 1;
  }
}
shrubs.count = shrubCount;
world.add(shrubs);

function createCastaway() {
  const group = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.24, .76, 5, 10), mats.clothLight);
  torso.position.y = 1.55;
  torso.scale.set(1.05, 1, .72);
  const head = new THREE.Mesh(new THREE.SphereGeometry(.21, 18, 14), mats.skin);
  head.position.y = 2.28;
  const hair = new THREE.Mesh(new THREE.SphereGeometry(.218, 18, 9, 0, Math.PI * 2, 0, Math.PI * .55), material(0x1d1b19, 1));
  hair.position.set(0, 2.35, -.01);
  const leftLeg = new THREE.Mesh(new THREE.CapsuleGeometry(.075, .72, 4, 8), mats.cloth);
  leftLeg.position.set(-.12, .64, 0);
  const rightLeg = leftLeg.clone(); rightLeg.position.x = .12;
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(.06, .61, 4, 8), mats.skin);
  leftArm.position.set(-.32, 1.48, 0); leftArm.rotation.z = -.08;
  const rightArm = leftArm.clone(); rightArm.position.x = .32; rightArm.rotation.z = .08;
  [torso, head, hair, leftLeg, rightLeg, leftArm, rightArm].forEach((part) => { part.castShadow = true; part.receiveShadow = true; group.add(part); });
  group.userData.parts = { torso, leftArm, rightArm };
  group.scale.setScalar(.92);
  group.rotation.y = -.25;
  return group;
}

const castaway = createCastaway();
castaway.position.set(-6.1, terrainHeight(-6.1, .15), .15);
world.add(castaway);

function createLifeboat() {
  const boat = new THREE.Group();
  const sideProfile = new THREE.Shape();
  sideProfile.moveTo(-2.65, .82);
  sideProfile.lineTo(-2.15, .12);
  sideProfile.lineTo(2.15, .12);
  sideProfile.lineTo(2.72, .78);
  sideProfile.lineTo(2.18, 1.02);
  sideProfile.lineTo(-2.16, 1.02);
  sideProfile.closePath();
  const hullGeometry = new THREE.ExtrudeGeometry(sideProfile, {
    depth: 1.64,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: .09,
    bevelThickness: .08,
    curveSegments: 3,
  });
  hullGeometry.translate(0, 0, -.82);
  const hull = new THREE.Mesh(hullGeometry, mats.orange);
  boat.add(hull);
  const interior = new THREE.Mesh(new THREE.BoxGeometry(4.25, .18, 1.25), mats.rubber);
  interior.position.set(-.03, .94, 0);
  boat.add(interior);
  const leftRail = new THREE.Mesh(new THREE.BoxGeometry(4.65, .12, .12), mats.orangeLight);
  leftRail.position.set(-.02, 1.08, -.81);
  const rightRail = leftRail.clone(); rightRail.position.z = .81;
  boat.add(leftRail, rightRail);
  for (let i = -1; i <= 1; i += 1) {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(.18, .12, 1.35), mats.metal);
    seat.position.set(i * 1.18, 1.1, 0);
    seat.rotation.z = i === 1 ? .08 : 0;
    boat.add(seat);
  }
  const broken = new THREE.Mesh(new THREE.BoxGeometry(1.45, .08, .18), mats.metal);
  broken.position.set(2.35, 1.22, .6);
  broken.rotation.set(.2, .1, .42);
  boat.add(broken);
  boat.rotation.set(.03, -.35, -.08);
  boat.scale.setScalar(.95);
  boat.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; } });
  return boat;
}

const lifeboat = createLifeboat();
lifeboat.position.set(10.5, terrainHeight(10.5, 6.4), 6.4);
world.add(lifeboat);

function addLuggage(x, z, colorMaterial, scale = 1, rotation = 0) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.05, .65, .76), colorMaterial);
  body.position.y = .38;
  body.rotation.z = -.03;
  const band = new THREE.Mesh(new THREE.BoxGeometry(.13, .69, .8), mats.rubber);
  band.position.y = .38;
  const handle = new THREE.Mesh(new THREE.TorusGeometry(.16, .025, 6, 12, Math.PI), mats.rubber);
  handle.position.set(0, .76, 0);
  handle.rotation.x = Math.PI / 2;
  group.add(body, band, handle);
  group.position.set(x, terrainHeight(x, z), z);
  group.rotation.y = rotation;
  group.scale.setScalar(scale);
  group.traverse((child) => { if (child.isMesh) child.castShadow = true; });
  world.add(group);
}

addLuggage(5.5, 4.4, mats.luggageBlue, .9, -.2);
addLuggage(7.1, 5.1, mats.luggageRed, .72, .45);

function addDriftwood(x, z, length, rotation) {
  const start = new THREE.Vector3(-length / 2, .12, 0);
  const end = new THREE.Vector3(length / 2, .12, 0);
  const log = cylinderBetween(start, end, .1, mats.trunkWet, 7);
  log.position.x += x;
  log.position.y += terrainHeight(x, z);
  log.position.z += z;
  log.rotation.y = rotation;
  world.add(log);
}

[[2.8,3.5,2.1,.3],[3.7,3.8,1.55,-.4],[8.1,7.1,2.3,.65],[-10,3.2,1.4,-.5]].forEach((entry) => addDriftwood(...entry));

const footprintMaterial = new THREE.MeshBasicMaterial({ color: 0x3f423d, transparent: true, opacity: .34, depthWrite: false });
for (let i = 0; i < 8; i += 1) {
  for (let side = 0; side < 2; side += 1) {
    const x = -5.4 + i * 1.12 + (side ? .18 : -.18);
    const z = 1.05 + i * 1.15 + side * .42;
    const footprint = new THREE.Mesh(new THREE.CircleGeometry(.12, 12), footprintMaterial);
    footprint.scale.set(.62, 1.4, 1);
    footprint.rotation.x = -Math.PI / 2;
    footprint.rotation.z = .08;
    footprint.position.set(x, terrainHeight(x, z) + .025, z);
    world.add(footprint);
  }
}

const rainCount = reduceMotion ? 180 : 1150;
const rainPositions = new Float32Array(rainCount * 3);
for (let i = 0; i < rainCount; i += 1) {
  rainPositions[i * 3] = (Math.random() - .5) * 58;
  rainPositions[i * 3 + 1] = Math.random() * 24;
  rainPositions[i * 3 + 2] = (Math.random() - .5) * 48 + 5;
}
const rainGeometry = new THREE.BufferGeometry();
rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
const rainMaterial = new THREE.PointsMaterial({ color: 0xb7d2d2, size: .055, transparent: true, opacity: .58, depthWrite: false });
const rain = new THREE.Points(rainGeometry, rainMaterial);
rain.rotation.z = -.13;
world.add(rain);

const birds = [];
for (let i = 0; i < 5; i += 1) {
  const bird = new THREE.Group();
  const birdMat = new THREE.MeshBasicMaterial({ color: 0xdbe2de, side: THREE.DoubleSide });
  const left = new THREE.Mesh(new THREE.ConeGeometry(.06, .48, 3), birdMat);
  left.rotation.z = -Math.PI / 2;
  left.position.x = -.18;
  const right = left.clone(); right.rotation.z = Math.PI / 2; right.position.x = .18;
  bird.add(left, right);
  bird.userData.phase = i * 1.23;
  birds.push(bird);
  scene.add(bird);
}

const weatherConfig = {
  storm: {
    name: "风暴余波",
    kicker: "POST-STORM · 06:20",
    copy: "退去的风暴仍压住海面。破损救生艇与散落行李说明这里不是度假海滩。",
    target: 1,
  },
  clearing: {
    name: "雨后天光",
    kicker: "CLEARING LIGHT · 07:05",
    copy: "雨正在离开海湾，暖光沿湿沙打开一条通向林缘的路线，但岛内仍然未知。",
    target: .18,
  },
};

let weatherKey = query.get("weather") === "clearing" ? "clearing" : "storm";
let stormAmount = weatherConfig[weatherKey].target;
let stormTarget = stormAmount;
let elapsed = 0;
let frameCount = 0;

const ui = {
  weatherName: document.querySelector("#weather-name"),
  sceneKicker: document.querySelector("#scene-kicker"),
  sceneCopy: document.querySelector("#scene-copy"),
  autoCamera: document.querySelector("#auto-camera-button"),
  resetCamera: document.querySelector("#reset-camera-button"),
  referenceButton: document.querySelector("#reference-button"),
  referenceDrawer: document.querySelector("#reference-drawer"),
  referenceClose: document.querySelector("#reference-close"),
  interactionNote: document.querySelector("#interaction-note"),
  renderState: document.querySelector("#render-state"),
  renderMetrics: document.querySelector("#render-metrics"),
};

function setWeather(nextKey) {
  weatherKey = nextKey;
  const config = weatherConfig[nextKey];
  stormTarget = config.target;
  document.documentElement.dataset.weather = nextKey;
  ui.weatherName.textContent = config.name;
  ui.sceneKicker.textContent = config.kicker;
  ui.sceneCopy.textContent = config.copy;
  document.querySelectorAll("[data-weather]").forEach((button) => {
    const active = button.dataset.weather === nextKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  ui.interactionNote.textContent = nextKey === "storm" ? "风暴状态：观察强浪、雨雾与受风植被" : "天光状态：观察湿沙反光和入林路径";
}

function resetCamera() {
  orbitYaw = -2.15;
  orbitPitch = .34;
  orbitDistance = 30;
  cameraTarget.set(1.5, 2.1, 5.2);
  ui.interactionNote.textContent = "镜头已回到视觉基准构图";
}

function setAutoCamera(value) {
  autoCamera = value;
  ui.autoCamera.classList.toggle("is-active", value);
  ui.autoCamera.setAttribute("aria-pressed", String(value));
  ui.interactionNote.textContent = value ? "自动镜头正在展示海岸纵深" : "手动观察：拖动旋转，滚轮缩放";
}

function setReferenceOpen(open) {
  ui.referenceDrawer.hidden = !open;
  ui.referenceButton.setAttribute("aria-expanded", String(open));
  if (open) {
    ui.referenceClose.focus();
    setAutoCamera(false);
  } else {
    ui.referenceButton.focus();
  }
}

document.querySelectorAll("[data-weather]").forEach((button) => button.addEventListener("click", () => setWeather(button.dataset.weather)));
ui.autoCamera.addEventListener("click", () => setAutoCamera(!autoCamera));
ui.resetCamera.addEventListener("click", () => { resetCamera(); setAutoCamera(false); });
ui.referenceButton.addEventListener("click", () => setReferenceOpen(ui.referenceDrawer.hidden));
ui.referenceClose.addEventListener("click", () => setReferenceOpen(false));

canvas.addEventListener("pointerdown", (event) => {
  dragging = true;
  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
  canvas.setPointerCapture?.(event.pointerId);
  setAutoCamera(false);
});
canvas.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const dx = event.clientX - lastPointerX;
  const dy = event.clientY - lastPointerY;
  lastPointerX = event.clientX;
  lastPointerY = event.clientY;
  orbitYaw -= dx * .0042;
  orbitPitch = clamp(orbitPitch + dy * .0032, .18, .68);
});
["pointerup", "pointercancel", "lostpointercapture"].forEach((name) => canvas.addEventListener(name, () => { dragging = false; }));
canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  orbitDistance = clamp(orbitDistance + event.deltaY * .018, 19, 42);
  setAutoCamera(false);
}, { passive: false });

window.addEventListener("keydown", (event) => {
  if (event.code === "Digit1") setWeather("storm");
  if (event.code === "Digit2") setWeather("clearing");
  if (event.code === "KeyR") { resetCamera(); setAutoCamera(false); }
  if (event.code === "Escape" && !ui.referenceDrawer.hidden) setReferenceOpen(false);
});

window.addEventListener("resize", () => {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function updateWeather(dt) {
  stormAmount += (stormTarget - stormAmount) * (1 - Math.pow(.002, dt));
  skyUniforms.uStorm.value = stormAmount;
  oceanUniforms.uStorm.value = stormAmount;
  rainMaterial.opacity = (.08 + stormAmount * .58) * (reduceMotion ? .28 : 1);
  rain.visible = rainMaterial.opacity > .05;
  scene.fog.color.set(0x71858a).lerp(new THREE.Color(0x506268), stormAmount * .62);
  scene.fog.density = .0065 + stormAmount * .006;
  hemi.intensity = 2.25 - stormAmount * .72;
  sun.intensity = 4.4 - stormAmount * 2.15;
  fill.intensity = .5 + stormAmount * .35;
  renderer.toneMappingExposure = 1.08 - stormAmount * .17;
  mats.wetSand.clearcoat = .06 + stormAmount * .05;
  clouds.forEach((cloud, index) => {
    cloud.material.opacity = .22 + stormAmount * (.36 + index % 3 * .035);
    cloud.material.color.set(stormAmount > .55 ? 0x677579 : 0xa8aeaa);
  });
}

function updateSceneMotion(dt) {
  const motionScale = reduceMotion ? .12 : 1;
  oceanUniforms.uTime.value += dt * motionScale;
  const positions = rainGeometry.attributes.position.array;
  for (let i = 0; i < rainCount; i += 1) {
    positions[i * 3 + 1] -= dt * (14 + stormAmount * 15) * motionScale;
    positions[i * 3] += dt * 2.1 * stormAmount * motionScale;
    if (positions[i * 3 + 1] < 0) {
      positions[i * 3 + 1] = 20 + Math.random() * 8;
      positions[i * 3] = (Math.random() - .5) * 58;
      positions[i * 3 + 2] = (Math.random() - .5) * 48 + 5;
    }
  }
  rainGeometry.attributes.position.needsUpdate = true;
  palms.forEach((palm) => {
    const sway = Math.sin(elapsed * (1.4 + stormAmount * 1.7) + palm.userData.phase) * (.018 + stormAmount * .035) * motionScale;
    palm.userData.crown.rotation.z = sway;
    palm.rotation.z += (sway * .18 - palm.rotation.z) * Math.min(1, dt * 3);
  });
  clouds.forEach((cloud, index) => {
    cloud.position.x += dt * (1.2 + stormAmount * 2.2) * motionScale;
    if (cloud.position.x > 110) cloud.position.x = -110;
    cloud.position.y += Math.sin(elapsed * .15 + cloud.userData.phase) * dt * .06 * motionScale;
  });
  const breath = reduceMotion ? 0 : Math.sin(elapsed * 1.45) * .012;
  castaway.userData.parts.torso.scale.y = 1 + breath;
  castaway.userData.parts.leftArm.rotation.x = -.08 + breath * 3;
  castaway.userData.parts.rightArm.rotation.x = .08 - breath * 3;
  birds.forEach((bird, index) => {
    const angle = elapsed * (.06 + index * .008) + bird.userData.phase;
    bird.position.set(Math.cos(angle) * (35 + index * 3), 13 + Math.sin(angle * 2) * 1.4, -14 + Math.sin(angle) * 18);
    bird.rotation.y = -angle;
    bird.children[0].rotation.y = -.18 + Math.sin(elapsed * 5 + index) * .16 * motionScale;
    bird.children[1].rotation.y = .18 - Math.sin(elapsed * 5 + index) * .16 * motionScale;
  });
}

function updateCamera() {
  const autoOffset = autoCamera && !reduceMotion ? Math.sin(elapsed * .075) * .055 : 0;
  const yaw = orbitYaw + autoOffset;
  const horizontal = Math.cos(orbitPitch) * orbitDistance;
  const desired = new THREE.Vector3(
    cameraTarget.x + Math.sin(yaw) * horizontal,
    cameraTarget.y + Math.sin(orbitPitch) * orbitDistance,
    cameraTarget.z + Math.cos(yaw) * horizontal,
  );
  camera.position.lerp(desired, .075);
  cameraLook.copy(cameraTarget);
  camera.lookAt(cameraLook);
}

let lastTime = performance.now();
function frame(time) {
  const dt = Math.min(.05, (time - lastTime) / 1000 || 0);
  lastTime = time;
  elapsed += dt;
  updateWeather(dt);
  updateSceneMotion(dt);
  updateCamera();
  renderer.render(scene, camera);
  frameCount += 1;
  if (frameCount % 18 === 0) {
    const calls = renderer.info.render.calls;
    const triangles = renderer.info.render.triangles;
    ui.renderState.textContent = "场景正在实时运行";
    ui.renderMetrics.textContent = `${calls} draw calls · ${triangles.toLocaleString("zh-CN")} triangles`;
    canvas.dataset.drawCalls = String(calls);
    canvas.dataset.triangles = String(triangles);
  }
  requestAnimationFrame(frame);
}

resetCamera();
setWeather(weatherKey);
document.documentElement.dataset.runtimeState = "ready";
ui.renderState.textContent = "场景正在实时运行";

window.__ARRIVAL_BEACH_VISUAL__ = {
  renderer,
  get weather() { return weatherKey; },
  setWeather,
  resetCamera,
  getSnapshot() {
    return {
      weather: weatherKey,
      stormAmount,
      reducedMotion: reduceMotion,
      camera: camera.position.toArray(),
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
    };
  },
};

requestAnimationFrame(frame);
