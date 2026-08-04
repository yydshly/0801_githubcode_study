import * as THREE from 'three';
import { QUAD_VERTEX_SHADER } from './upstream/procedural-vfx/polar-night-sky.js';

const MARS_BACKDROP_SHADER = /* glsl */ `
  uniform vec2 iResolution;
  uniform float iTime;

  float hash21(vec2 point) {
    point = fract(point * vec2(127.1, 311.7));
    point += dot(point, point + 31.19);
    return fract(point.x * point.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    float horizon = smoothstep(0.18, 0.82, uv.y);
    vec3 sky = mix(vec3(0.004, 0.006, 0.018), vec3(0.055, 0.014, 0.01), horizon);
    float dustBand = exp(-pow((uv.y - 0.64) / 0.18, 2.0));
    sky += vec3(0.22, 0.06, 0.018) * dustBand;
    vec2 starGrid = uv * vec2(160.0, 88.0);
    vec2 starCell = floor(starGrid);
    vec2 starLocal = fract(starGrid) - 0.5;
    float starDot = 1.0 - smoothstep(0.0, 0.16, length(starLocal));
    float star = step(0.994, hash21(starCell)) * starDot;
    sky += vec3(0.62, 0.42, 0.27) * star * (0.35 + 0.25 * sin(iTime * 0.7 + hash21(starCell) * 30.0));
    gl_FragColor = vec4(sky, 1.0);
  }
`;

function seeded(value) {
  const x = Math.sin(value * 83.173 + 9.37) * 43758.5453;
  return x - Math.floor(x);
}

function createMarsTexture(size = 384) {
  const canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size;
  const context = canvas.getContext('2d');
  const base = context.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, '#d87947');
  base.addColorStop(0.42, '#a9442a');
  base.addColorStop(1, '#5b1d17');
  context.fillStyle = base;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.globalCompositeOperation = 'screen';
  for (let index = 0; index < 220; index += 1) {
    const x = seeded(index + 121) * canvas.width;
    const y = seeded(index + 161) * canvas.height;
    const radius = 1.5 + seeded(index + 201) * 13;
    const glow = context.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, `rgba(255, 168, 105, ${0.05 + seeded(index + 241) * 0.09})`);
    glow.addColorStop(1, 'rgba(255, 120, 72, 0)');
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalCompositeOperation = 'multiply';
  for (let index = 0; index < 72; index += 1) {
    const x = seeded(index + 281) * canvas.width;
    const y = seeded(index + 321) * canvas.height;
    const width = 8 + seeded(index + 361) * 42;
    context.strokeStyle = `rgba(75, 19, 15, ${0.08 + seeded(index + 401) * 0.13})`;
    context.lineWidth = 1 + seeded(index + 441) * 3;
    context.beginPath();
    context.moveTo(x, y);
    context.quadraticCurveTo(x + width * 0.5, y + (seeded(index + 481) - 0.5) * 14, x + width, y + (seeded(index + 521) - 0.5) * 20);
    context.stroke();
  }
  context.globalCompositeOperation = 'source-over';

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function terrainHeight(x, z) {
  const broad = Math.sin(x * 0.72 + z * 0.22) * 0.12;
  const ridge = Math.sin(x * 1.72 - z * 0.61) * 0.045;
  const crater = Math.exp(-((x + 1.6) ** 2 + (z - 0.6) ** 2) * 0.45) * -0.18;
  return broad + ridge + crater;
}

function createTerrainGeometry(width, depth, segmentsX, segmentsZ) {
  const positions = [];
  const colors = [];
  const indices = [];
  for (let zIndex = 0; zIndex <= segmentsZ; zIndex += 1) {
    const z = (zIndex / segmentsZ - 0.5) * depth;
    for (let xIndex = 0; xIndex <= segmentsX; xIndex += 1) {
      const x = (xIndex / segmentsX - 0.5) * width;
      const height = terrainHeight(x, z);
      positions.push(x, height, z);
      const terrainColor = new THREE.Color().setHSL(
        0.018 + seeded(x * 3.4 + z * 2.7) * 0.018,
        0.56,
        0.22 + (height + 0.2) * 0.18 + seeded(x * 1.4 - z * 4.1) * 0.04
      );
      colors.push(terrainColor.r, terrainColor.g, terrainColor.b);
    }
  }
  const row = segmentsX + 1;
  for (let zIndex = 0; zIndex < segmentsZ; zIndex += 1) {
    for (let xIndex = 0; xIndex < segmentsX; xIndex += 1) {
      const current = zIndex * row + xIndex;
      indices.push(current, current + row, current + 1, current + 1, current + row, current + row + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createMarsExploration({ compact = false } = {}) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x190b0a, compact ? 0.035 : 0.026);

  const backdropUniforms = {
    iResolution: { value: new THREE.Vector2(2, 2) },
    iTime: { value: 0 },
  };
  const backdropMaterial = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERTEX_SHADER,
    fragmentShader: MARS_BACKDROP_SHADER,
    uniforms: backdropUniforms,
    depthTest: false,
    depthWrite: false,
  });

  const world = new THREE.Group();
  world.rotation.y = 0.16;
  world.position.y = -0.12;
  scene.add(world);

  const hemisphereLight = new THREE.HemisphereLight(0xe3a47e, 0x120706, compact ? 0.64 : 0.82);
  const sunLight = new THREE.DirectionalLight(0xffb06b, compact ? 3.1 : 4.0);
  sunLight.position.set(-5, 8, 7);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(compact ? 512 : 1024, compact ? 512 : 1024);
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = 24;
  sunLight.shadow.camera.left = -10;
  sunLight.shadow.camera.right = 10;
  sunLight.shadow.camera.top = 10;
  sunLight.shadow.camera.bottom = -8;
  sunLight.target.position.set(0, 0, 0);
  const fillLight = new THREE.DirectionalLight(0xff7754, compact ? 0.58 : 0.9);
  fillLight.position.set(5, 4, 6);
  fillLight.target.position.set(0, -0.4, 0.5);
  const dustLight = new THREE.PointLight(0xd86c3b, 1.3, 9, 2);
  dustLight.position.set(0, 2.5, -2.2);
  scene.add(hemisphereLight, sunLight, sunLight.target, fillLight, fillLight.target, dustLight);

  const terrainGroup = new THREE.Group();
  const terrainGeometry = createTerrainGeometry(15.5, 12.5, compact ? 30 : 44, compact ? 22 : 32);
  const terrain = new THREE.Mesh(
    terrainGeometry,
    new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.94, metalness: 0.02 })
  );
  terrain.position.y = -1.08;
  terrain.receiveShadow = true;
  terrain.castShadow = true;
  terrainGroup.add(terrain);

  const rockGeometry = new THREE.IcosahedronGeometry(0.12, 0);
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x713025, roughness: 1, metalness: 0 });
  for (let index = 0; index < (compact ? 18 : 34); index += 1) {
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    const rockX = (seeded(index + 3) - 0.5) * 12.5;
    const rockZ = (seeded(index + 12) - 0.5) * 9.2;
    const rockScale = 0.35 + seeded(index + 19) * 1.6;
    rock.position.set(rockX, -1.05 + terrainHeight(rockX, rockZ) + rockScale * 0.08, rockZ);
    rock.scale.setScalar(rockScale);
    rock.rotation.set(seeded(index + 24), seeded(index + 30), seeded(index + 36));
    rock.castShadow = true;
    terrainGroup.add(rock);
  }
  const surfaceCraterGroup = new THREE.Group();
  for (let index = 0; index < (compact ? 4 : 7); index += 1) {
    const craterX = (seeded(index + 731) - 0.5) * 11.5;
    const craterZ = (seeded(index + 761) - 0.5) * 8.2;
    const craterSize = 0.24 + seeded(index + 791) * 0.52;
    const crater = new THREE.Mesh(
      new THREE.CircleGeometry(craterSize * 0.72, 28),
      new THREE.MeshBasicMaterial({ color: 0x4f1b17, transparent: true, opacity: 0.34, side: THREE.DoubleSide })
    );
    crater.rotation.x = -Math.PI / 2;
    crater.position.set(craterX, -1.045 + terrainHeight(craterX, craterZ), craterZ);
    const lip = new THREE.Mesh(
      new THREE.RingGeometry(craterSize * 0.68, craterSize, 28),
      new THREE.MeshBasicMaterial({ color: 0xe0834e, transparent: true, opacity: 0.34, side: THREE.DoubleSide })
    );
    lip.rotation.x = -Math.PI / 2;
    lip.position.copy(crater.position);
    lip.position.y += 0.012;
    surfaceCraterGroup.add(crater, lip);
  }
  terrainGroup.add(surfaceCraterGroup);
  world.add(terrainGroup);

  const planetRoot = new THREE.Group();
  planetRoot.position.set(0.28, 1.48, -2.45);
  const marsTexture = createMarsTexture(compact ? 256 : 384);
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.72, compact ? 28 : 42, compact ? 20 : 30),
    new THREE.MeshStandardMaterial({ map: marsTexture, color: 0xffffff, roughness: 0.92, metalness: 0.01, emissive: 0x230a04, emissiveIntensity: 0.12 })
  );
  planet.castShadow = true;
  planet.receiveShadow = true;
  planetRoot.add(planet);

  const craterDirections = [
    new THREE.Vector3(0.56, 0.25, 0.78),
    new THREE.Vector3(-0.42, 0.5, 0.76),
    new THREE.Vector3(0.15, -0.48, 0.86),
    new THREE.Vector3(-0.78, -0.12, 0.58),
    new THREE.Vector3(0.74, -0.24, 0.62),
  ];
  const craterGroup = new THREE.Group();
  craterDirections.forEach((direction, index) => {
    const normal = direction.normalize();
    const size = 0.12 + (index % 3) * 0.06;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(size * 0.62, size, 28),
      new THREE.MeshBasicMaterial({ color: 0x552116, transparent: true, opacity: 0.78, side: THREE.DoubleSide })
    );
    ring.position.copy(normal).multiplyScalar(1.735);
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    const center = new THREE.Mesh(
      new THREE.CircleGeometry(size * 0.62, 24),
      new THREE.MeshStandardMaterial({ color: 0x6d2b1f, roughness: 1, metalness: 0, side: THREE.DoubleSide })
    );
    center.position.copy(normal).multiplyScalar(1.738);
    center.quaternion.copy(ring.quaternion);
    craterGroup.add(ring, center);
  });
  planetRoot.add(craterGroup);
  world.add(planetRoot);

  const atmosphereGroup = new THREE.Group();
  atmosphereGroup.position.copy(planetRoot.position);
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.88, compact ? 22 : 32, compact ? 16 : 24),
    new THREE.MeshBasicMaterial({
      color: 0xf08a54,
      transparent: true,
      opacity: 0.23,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    })
  );
  atmosphereGroup.add(atmosphere);
  world.add(atmosphereGroup);

  const roverGroup = new THREE.Group();
  roverGroup.position.set(-0.22, -0.45, 1.12);
  roverGroup.rotation.y = -0.28;
  roverGroup.scale.setScalar(compact ? 1.12 : 1.28);
  const roverBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xc38a55, roughness: 0.72, metalness: 0.22, emissive: 0x3a1e0e, emissiveIntensity: 0.5 });
  const roverDarkMaterial = new THREE.MeshStandardMaterial({ color: 0x4b5358, roughness: 0.88, metalness: 0.42 });
  const roverGoldMaterial = new THREE.MeshStandardMaterial({ color: 0xf0b762, roughness: 0.4, metalness: 0.6, emissive: 0x3a1b08, emissiveIntensity: 0.25 });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.25, 0.7), roverBodyMaterial);
  chassis.castShadow = true;
  roverGroup.add(chassis);
  const wheelGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.13, 16);
  const wheels = [];
  [-0.42, 0.42].forEach((x) => {
    [-0.31, 0.31].forEach((z) => {
      const wheel = new THREE.Mesh(wheelGeometry, roverDarkMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, -0.22, z);
      wheel.castShadow = true;
      wheels.push(wheel);
      roverGroup.add(wheel);
    });
  });
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.66, 10), roverGoldMaterial);
  mast.position.set(0, 0.44, 0);
  mast.castShadow = true;
  roverGroup.add(mast);
  const cameraHead = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.18, 0.24), roverDarkMaterial);
  cameraHead.position.set(0, 0.78, 0);
  cameraHead.castShadow = true;
  roverGroup.add(cameraHead);
  const roverBeacon = new THREE.PointLight(0xffb46e, compact ? 0.55 : 0.8, 2.8, 2);
  roverBeacon.position.set(0.18, 0.74, 0.28);
  const beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffa45c }));
  beaconMesh.position.copy(roverBeacon.position);
  roverGroup.add(roverBeacon, beaconMesh);
  const panelGeometry = new THREE.BoxGeometry(0.48, 0.035, 0.62);
  [-0.64, 0.64].forEach((x) => {
    const panel = new THREE.Mesh(panelGeometry, new THREE.MeshStandardMaterial({ color: 0x3e7ca3, roughness: 0.32, metalness: 0.58, emissive: 0x1d4c75, emissiveIntensity: 0.8 }));
    panel.position.set(x, 0.18, 0);
    panel.rotation.z = x < 0 ? -0.14 : 0.14;
    panel.castShadow = true;
    roverGroup.add(panel);
  });
  world.add(roverGroup);

  const pathGroup = new THREE.Group();
  [-0.2, 0.2].forEach((trackOffset) => {
    const trackPoints = [];
    for (let index = 0; index < 16; index += 1) {
      const z = 0.72 - index * 0.28;
      const x = -0.22 + trackOffset + Math.sin(index * 0.65) * 0.08;
      trackPoints.push(new THREE.Vector3(x, -1.03 + terrainHeight(x, z), z));
    }
    const track = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(trackPoints),
      new THREE.LineBasicMaterial({ color: 0xffc171, transparent: true, opacity: 0.88 })
    );
    track.name = trackOffset < 0 ? 'left-track' : 'right-track';
    pathGroup.add(track);
  });
  world.add(pathGroup);

  const dustCount = compact ? 70 : 125;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustSeeds = [];
  for (let index = 0; index < dustCount; index += 1) {
    const x = (seeded(index + 45) - 0.5) * 2.8;
    const y = -0.45 + seeded(index + 61) * 0.7;
    const z = 0.6 + (seeded(index + 77) - 0.5) * 1.6;
    dustSeeds.push({ x, y, z, phase: seeded(index + 93) * Math.PI * 2 });
    const offset = index * 3;
    dustPositions[offset] = x;
    dustPositions[offset + 1] = y;
    dustPositions[offset + 2] = z;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xe7a163, size: compact ? 0.07 : 0.085, transparent: true, opacity: 0.55, depthWrite: false }));
  dust.frustumCulled = false;
  world.add(dust);

  const orbitGroup = new THREE.Group();
  orbitGroup.position.copy(planetRoot.position);
  orbitGroup.rotation.x = 0.62;
  const orbitPoints = [];
  for (let index = 0; index < 96; index += 1) {
    const angle = (index / 96) * Math.PI * 2;
    orbitPoints.push(new THREE.Vector3(Math.cos(angle) * 2.25, 0, Math.sin(angle) * 1.15));
  }
  orbitGroup.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(orbitPoints), new THREE.LineBasicMaterial({ color: 0xf0a267, transparent: true, opacity: 0.52, depthWrite: false })));
  world.add(orbitGroup);

  function setStage(stageIndex) {
    planetRoot.visible = stageIndex >= 1;
    terrainGroup.visible = stageIndex >= 2;
    roverGroup.visible = stageIndex >= 3;
    pathGroup.visible = stageIndex >= 3;
    dust.visible = stageIndex >= 3;
    atmosphereGroup.visible = stageIndex >= 4;
    orbitGroup.visible = stageIndex >= 4;
  }

  function update(elapsed, stageIndex) {
    backdropUniforms.iTime.value = elapsed;
    const moving = stageIndex >= 3;
    planetRoot.rotation.y = moving ? elapsed * 0.055 : 0;
    atmosphereGroup.rotation.y = moving ? elapsed * 0.04 : 0;
    orbitGroup.rotation.y = moving ? elapsed * 0.08 : 0;
    wheels.forEach((wheel) => { wheel.rotation.y = moving ? elapsed * 1.4 : 0; });
    atmosphere.scale.setScalar(1 + Math.sin(elapsed * 0.7) * 0.018);
    dustSeeds.forEach((particle, index) => {
      const offset = index * 3;
      const drift = moving ? elapsed * 0.18 : 0;
      dustPositions[offset] = particle.x + Math.sin(elapsed * 0.4 + particle.phase) * 0.18 + drift;
      dustPositions[offset + 1] = particle.y + Math.sin(elapsed * 0.8 + particle.phase) * 0.12;
      dustPositions[offset + 2] = particle.z + Math.cos(elapsed * 0.35 + particle.phase) * 0.1;
    });
    dustGeometry.attributes.position.needsUpdate = true;
  }

  setStage(4);

  return {
    scene,
    backdropMaterial,
    setSize(width, height) {
      backdropUniforms.iResolution.value.set(width, height);
    },
    setStage,
    update,
    dispose() {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      backdropMaterial.dispose();
      marsTexture.dispose();
    },
  };
}
