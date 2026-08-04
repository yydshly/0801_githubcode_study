import * as THREE from 'three';
import { QUAD_VERTEX_SHADER } from './upstream/procedural-vfx/polar-night-sky.js';

const STORM_BACKDROP_SHADER = /* glsl */ `
  uniform vec2 iResolution;
  uniform float iTime;
  uniform float uLightning;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);
    float a = hash21(cell);
    float b = hash21(cell + vec2(1.0, 0.0));
    float c = hash21(cell + vec2(0.0, 1.0));
    float d = hash21(cell + vec2(1.0, 1.0));
    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    float horizon = smoothstep(0.05, 0.78, uv.y);
    vec3 sky = mix(vec3(0.003, 0.008, 0.024), vec3(0.014, 0.055, 0.09), horizon);
    float cloud = noise(vec2(uv.x * 4.2 + iTime * 0.008, uv.y * 2.8));
    cloud += noise(vec2(uv.x * 11.0 - iTime * 0.013, uv.y * 7.0)) * 0.35;
    sky += vec3(0.015, 0.06, 0.085) * smoothstep(0.45, 0.9, cloud) * smoothstep(0.22, 0.9, uv.y);
    float cityGlow = exp(-pow((uv.y - 0.58) / 0.16, 2.0));
    sky += vec3(0.025, 0.1, 0.14) * cityGlow;
    sky += vec3(0.54, 0.78, 1.0) * uLightning * (0.55 + 0.45 * noise(uv * 25.0));
    gl_FragColor = vec4(sky, 1.0);
  }
`;

function seeded(value) {
  const x = Math.sin(value * 91.173 + 17.37) * 43758.5453;
  return x - Math.floor(x);
}

export function createStormCity({ compact = false } = {}) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x071322, compact ? 0.055 : 0.042);

  const backdropUniforms = {
    iResolution: { value: new THREE.Vector2(2, 2) },
    iTime: { value: 0 },
    uLightning: { value: 0 },
  };
  const backdropMaterial = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERTEX_SHADER,
    fragmentShader: STORM_BACKDROP_SHADER,
    uniforms: backdropUniforms,
    depthTest: false,
    depthWrite: false,
  });

  const world = new THREE.Group();
  world.rotation.y = -0.14;
  world.position.y = -0.05;
  scene.add(world);

  const hemisphereLight = new THREE.HemisphereLight(0x6c9fce, 0x050912, compact ? 0.66 : 0.86);
  const moonLight = new THREE.DirectionalLight(0x8db9e8, compact ? 2.3 : 3.05);
  moonLight.position.set(-6, 10, 5);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(compact ? 512 : 1024, compact ? 512 : 1024);
  moonLight.shadow.camera.near = 0.1;
  moonLight.shadow.camera.far = 28;
  moonLight.shadow.camera.left = -14;
  moonLight.shadow.camera.right = 14;
  moonLight.shadow.camera.top = 12;
  moonLight.shadow.camera.bottom = -12;
  moonLight.target.position.set(0, 0, 0);
  scene.add(hemisphereLight, moonLight, moonLight.target);

  const groundGroup = new THREE.Group();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 18),
    new THREE.MeshPhysicalMaterial({
      color: 0x122737,
      emissive: 0x06131f,
      emissiveIntensity: 0.65,
      roughness: 0.18,
      metalness: 0.52,
      clearcoat: 0.42,
      clearcoatRoughness: 0.12,
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.6;
  ground.receiveShadow = true;
  groundGroup.add(ground);

  const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x0b1b29, roughness: 0.26, metalness: 0.42, emissive: 0x06131f, emissiveIntensity: 0.5 });
  const roadA = new THREE.Mesh(new THREE.BoxGeometry(23, 0.035, 2.35), roadMaterial);
  roadA.position.set(0, -0.575, 0.35);
  roadA.receiveShadow = true;
  const roadB = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.04, 17), roadMaterial);
  roadB.position.set(-0.1, -0.57, 0);
  roadB.receiveShadow = true;
  groundGroup.add(roadA, roadB);

  const roadMarkMaterial = new THREE.MeshBasicMaterial({ color: 0x4c7694, transparent: true, opacity: 0.38 });
  for (let index = -5; index <= 5; index += 1) {
    const marking = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.012, 0.62), roadMarkMaterial);
    marking.position.set(index * 1.08, -0.55, 0.35);
    groundGroup.add(marking);
  }
  world.add(groundGroup);

  const cityGroup = new THREE.Group();
  const buildingSpecs = [];
  for (let gridX = -4; gridX <= 4; gridX += 1) {
    for (let gridZ = -3; gridZ <= 3; gridZ += 1) {
      if (Math.abs(gridX) <= 1 && Math.abs(gridZ) <= 1) continue;
      const height = 0.78 + seeded(gridX * 19 + gridZ * 43 + 8) * 2.75;
      buildingSpecs.push({
        x: gridX * 1.55 + (gridZ % 2) * 0.12,
        z: gridZ * 1.28,
        height,
        width: 0.88 + seeded(gridX * 31 + gridZ * 17 + 4) * 0.22,
        depth: 0.8 + seeded(gridX * 11 + gridZ * 29 + 5) * 0.2,
      });
    }
  }

  const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x0d3046,
    emissiveIntensity: 1.5,
    roughness: 0.64,
    metalness: 0.18,
    vertexColors: true,
  });
  const buildings = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, buildingSpecs.length);
  const buildingMatrix = new THREE.Object3D();
  buildingSpecs.forEach((building, index) => {
    buildingMatrix.position.set(building.x, -0.6 + building.height / 2, building.z);
    buildingMatrix.scale.set(building.width, building.height, building.depth);
    buildingMatrix.updateMatrix();
    buildings.setMatrixAt(index, buildingMatrix.matrix);
    buildings.setColorAt(index, new THREE.Color().setHSL(0.57 + seeded(index + 19) * 0.06, 0.28, 0.34 + seeded(index + 2) * 0.18));
  });
  buildings.instanceMatrix.needsUpdate = true;
  buildings.instanceColor.needsUpdate = true;
  buildings.castShadow = true;
  buildings.receiveShadow = true;
  cityGroup.add(buildings);

  const windowSpecs = [];
  buildingSpecs.forEach((building, index) => {
    const levels = Math.max(1, Math.floor(building.height / 0.38));
    for (let level = 0; level < levels; level += 1) {
      const y = -0.34 + level * 0.36;
      windowSpecs.push({ x: building.x - 0.22, y, z: building.z + building.depth * 0.52, side: 0 });
      windowSpecs.push({ x: building.x + 0.22, y, z: building.z + building.depth * 0.52, side: 0 });
      if (index % 2 === 0) {
        windowSpecs.push({ x: building.x + building.width * 0.52, y, z: building.z - 0.18, side: 1 });
      }
    }
  });
  const windowGeometry = new THREE.BoxGeometry(0.07, 0.1, 0.025);
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x73d9eb,
    emissive: 0x267f9f,
    emissiveIntensity: 1.65,
    roughness: 0.22,
    metalness: 0.1,
  });
  const windows = new THREE.InstancedMesh(windowGeometry, windowMaterial, windowSpecs.length);
  const windowMatrix = new THREE.Object3D();
  windowSpecs.forEach((window, index) => {
    windowMatrix.position.set(window.x, window.y, window.z);
    windowMatrix.rotation.set(0, window.side ? Math.PI / 2 : 0, 0);
    windowMatrix.updateMatrix();
    windows.setMatrixAt(index, windowMatrix.matrix);
  });
  windows.instanceMatrix.needsUpdate = true;
  cityGroup.add(windows);

  const rooftopGeometry = new THREE.BoxGeometry(1, 1, 1);
  const rooftopMaterial = new THREE.MeshStandardMaterial({ color: 0x34566e, roughness: 0.46, metalness: 0.34, emissive: 0x0b2433, emissiveIntensity: 0.85 });
  const rooftops = new THREE.InstancedMesh(rooftopGeometry, rooftopMaterial, buildingSpecs.length);
  buildingSpecs.forEach((building, index) => {
    buildingMatrix.position.set(building.x, -0.6 + building.height + 0.035, building.z);
    buildingMatrix.scale.set(building.width * 0.82, 0.07, building.depth * 0.82);
    buildingMatrix.updateMatrix();
    rooftops.setMatrixAt(index, buildingMatrix.matrix);
  });
  rooftops.instanceMatrix.needsUpdate = true;
  rooftops.castShadow = true;
  rooftops.receiveShadow = true;
  cityGroup.add(rooftops);

  const lampGroup = new THREE.Group();
  const lampMaterial = new THREE.MeshBasicMaterial({ color: 0x8cffff });
  const lampPoleMaterial = new THREE.MeshStandardMaterial({ color: 0x1a2a3d, roughness: 0.6, metalness: 0.45 });
  const lampPositions = [[-4.6, 2.9], [-2.6, 0.35], [2.2, 0.35], [4.8, -2.2], [-4.8, -2.2]];
  lampPositions.forEach(([x, z], index) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.035, 0.9, 8), lampPoleMaterial);
    pole.position.set(x, -0.12, z);
    pole.castShadow = true;
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), lampMaterial);
    lamp.position.set(x, 0.34, z);
    const light = new THREE.PointLight(index % 2 ? 0x62d9ff : 0xa5f6ff, 2.1, 3.3, 2);
    light.position.copy(lamp.position);
    lampGroup.add(pole, lamp, light);
  });
  cityGroup.add(lampGroup);
  world.add(cityGroup);

  const wetGroup = new THREE.Group();
  const wetSheenMaterial = new THREE.MeshBasicMaterial({
    color: 0x1d6b88,
    transparent: true,
    opacity: 0.38,
  });
  const wetSheenA = new THREE.Mesh(new THREE.BoxGeometry(19, 0.014, 1.95), wetSheenMaterial);
  wetSheenA.position.set(0, -0.532, 0.35);
  const wetSheenB = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.014, 14), wetSheenMaterial);
  wetSheenB.position.set(-0.1, -0.53, 0);
  wetSheenA.receiveShadow = true;
  wetSheenB.receiveShadow = true;
  wetGroup.add(wetSheenA, wetSheenB);
  lampPositions.forEach(([x, z], index) => {
    const reflection = new THREE.Mesh(
      new THREE.CircleGeometry(0.2 + (index % 2) * 0.08, 24),
      new THREE.MeshBasicMaterial({ color: index % 2 ? 0x4ce2f4 : 0x8df7ff, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
    );
    reflection.rotation.x = -Math.PI / 2;
    reflection.position.set(x, -0.515, z);
    wetGroup.add(reflection);
  });
  const puddles = [];
  for (let index = 0; index < (compact ? 5 : 9); index += 1) {
    const puddle = new THREE.Mesh(
      new THREE.CircleGeometry(0.32 + seeded(index + 4) * 0.48, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x2d7290,
        emissive: 0x092638,
        emissiveIntensity: 0.75,
        roughness: 0.08,
        metalness: 0.88,
        clearcoat: 0.7,
        transparent: true,
        opacity: 0.7,
      })
    );
    puddle.rotation.x = -Math.PI / 2;
    puddle.position.set((seeded(index + 11) - 0.5) * 10, -0.54, 0.24 + (seeded(index + 23) - 0.5) * 1.5);
    puddle.receiveShadow = true;
    wetGroup.add(puddle);
    const ripple = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.08, 28),
      new THREE.MeshBasicMaterial({ color: 0x94eaff, transparent: true, opacity: 0, side: THREE.DoubleSide })
    );
    ripple.rotation.x = -Math.PI / 2;
    ripple.position.copy(puddle.position);
    ripple.position.y += 0.012;
    wetGroup.add(ripple);
    puddles.push({ ripple, phase: seeded(index + 37) });
  }
  world.add(wetGroup);

  const rainCount = compact ? 220 : 420;
  const rainPositions = new Float32Array(rainCount * 6);
  const rainSeeds = [];
  for (let index = 0; index < rainCount; index += 1) {
    const x = (seeded(index + 53) - 0.5) * 22;
    const y = seeded(index + 71) * 9;
    const z = (seeded(index + 89) - 0.5) * 15;
    const speed = 4.4 + seeded(index + 107) * 3.4;
    rainSeeds.push({ x, y, z, speed });
    const offset = index * 6;
    rainPositions[offset] = x;
    rainPositions[offset + 1] = y;
    rainPositions[offset + 2] = z;
    rainPositions[offset + 3] = x - 0.045;
    rainPositions[offset + 4] = y - 0.28;
    rainPositions[offset + 5] = z - 0.02;
  }
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMaterial = new THREE.LineBasicMaterial({ color: 0x9ddfff, transparent: true, opacity: 0.34, depthWrite: false, blending: THREE.AdditiveBlending });
  const rainGroup = new THREE.LineSegments(rainGeometry, rainMaterial);
  rainGroup.frustumCulled = false;
  world.add(rainGroup);

  const nearRainCount = compact ? 42 : 86;
  const nearRainGeometry = new THREE.BoxGeometry(0.018, 0.56, 0.018);
  const nearRainMaterial = new THREE.MeshBasicMaterial({ color: 0xb7efff, transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending });
  const nearRain = new THREE.InstancedMesh(nearRainGeometry, nearRainMaterial, nearRainCount);
  const nearRainMatrix = new THREE.Object3D();
  const nearRainSeeds = [];
  for (let index = 0; index < nearRainCount; index += 1) {
    nearRainSeeds.push({
      x: (seeded(index + 601) - 0.5) * 16,
      y: seeded(index + 631) * 8,
      z: (seeded(index + 661) - 0.5) * 10,
      speed: 5.2 + seeded(index + 691) * 2.8,
      lean: -0.1 - seeded(index + 721) * 0.08,
    });
  }
  nearRainSeeds.forEach((drop, index) => {
    nearRainMatrix.position.set(drop.x, drop.y, drop.z);
    nearRainMatrix.rotation.z = drop.lean;
    nearRainMatrix.updateMatrix();
    nearRain.setMatrixAt(index, nearRainMatrix.matrix);
  });
  nearRain.instanceMatrix.needsUpdate = true;
  nearRain.frustumCulled = false;
  world.add(nearRain);

  const lightningGroup = new THREE.Group();
  const boltMaterial = new THREE.LineBasicMaterial({ color: 0xb9ffff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending });
  [-3.2, 2.4].forEach((offset, boltIndex) => {
    const points = [];
    for (let segment = 0; segment < 8; segment += 1) {
      points.push(new THREE.Vector3(
        offset + (seeded(segment + boltIndex * 23) - 0.5) * 1.4,
        4.9 - segment * 0.47,
        -3.8 + (seeded(segment + boltIndex * 41) - 0.5) * 0.35
      ));
    }
    lightningGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), boltMaterial));
  });
  const stormFlash = new THREE.PointLight(0x9edcff, 0, 18, 2);
  stormFlash.position.set(0, 3.5, 1);
  lightningGroup.add(stormFlash);
  world.add(lightningGroup);

  function setStage(stageIndex) {
    groundGroup.visible = stageIndex >= 1;
    cityGroup.visible = stageIndex >= 1;
    wetGroup.visible = stageIndex >= 2;
    rainGroup.visible = stageIndex >= 3;
    nearRain.visible = stageIndex >= 3;
    lightningGroup.visible = stageIndex >= 4;
  }

  function update(elapsed, stageIndex) {
    backdropUniforms.iTime.value = elapsed;
    const flash = stageIndex >= 4
      ? Math.max(Math.pow(Math.max(0, Math.sin(elapsed * 0.92 + 0.6)), 24), Math.pow(Math.max(0, Math.sin(elapsed * 1.83 + 2.1)), 32) * 0.7)
      : 0;
    backdropUniforms.uLightning.value = flash;
    rainGroup.visible = stageIndex >= 3;
    nearRain.visible = stageIndex >= 3;
    lightningGroup.visible = stageIndex >= 4;
    boltMaterial.opacity = 0.12 + flash * 0.88;
    stormFlash.intensity = flash * 13;

    rainSeeds.forEach((drop, index) => {
      const cycle = (drop.y - elapsed * drop.speed) % 9;
      const y = cycle < -0.8 ? cycle + 9 : cycle;
      const offset = index * 6;
      rainPositions[offset + 1] = y;
      rainPositions[offset + 4] = y - 0.28;
    });
    rainGeometry.attributes.position.needsUpdate = true;

    nearRainSeeds.forEach((drop, index) => {
      const cycle = (drop.y - elapsed * drop.speed) % 8;
      const y = cycle < -0.7 ? cycle + 8 : cycle;
      nearRainMatrix.position.set(drop.x + y * drop.lean, y, drop.z);
      nearRainMatrix.rotation.z = drop.lean;
      nearRainMatrix.updateMatrix();
      nearRain.setMatrixAt(index, nearRainMatrix.matrix);
    });
    nearRain.instanceMatrix.needsUpdate = true;

    puddles.forEach(({ ripple, phase }) => {
      const progress = (elapsed * 0.48 + phase) % 1;
      ripple.scale.setScalar(0.65 + progress * 2.8);
      ripple.material.opacity = stageIndex >= 2 ? (1 - progress) * 0.36 : 0;
    });
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
    },
  };
}
