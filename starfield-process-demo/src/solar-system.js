import * as THREE from 'three';

const PLANET_DATA = [
  { name: 'Mercury', distance: 1.16, radius: 0.18, color: 0x9d8d7d, speed: 1.55, phase: 0.4, inclination: 0.08, node: 0.08 },
  { name: 'Venus', distance: 1.56, radius: 0.24, color: 0xd3a36d, speed: 1.16, phase: 2.2, inclination: -0.04, node: -0.12 },
  { name: 'Earth', distance: 1.98, radius: 0.3, color: 0x3f83d1, emissive: 0x071b49, speed: 0.92, phase: 4.3, inclination: 0.1, node: 0.16 },
  { name: 'Mars', distance: 2.48, radius: 0.22, color: 0xb75b45, speed: 0.74, phase: 1.4, inclination: -0.12, node: 0.22 },
  { name: 'Jupiter', distance: 3.28, radius: 0.58, color: 0xc69b79, speed: 0.42, phase: 5.5, inclination: 0.06, node: -0.18 },
  { name: 'Saturn', distance: 4.12, radius: 0.5, color: 0xcbb17e, speed: 0.31, phase: 3.1, inclination: -0.16, node: 0.12, ring: true },
];

function seeded(value) {
  const x = Math.sin(value * 91.173 + 17.37) * 43758.5453;
  return x - Math.floor(x);
}

function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 220, 1)');
  gradient.addColorStop(0.12, 'rgba(255, 204, 103, .96)');
  gradient.addColorStop(0.38, 'rgba(255, 146, 49, .32)');
  gradient.addColorStop(1, 'rgba(255, 112, 20, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createOrbit(radius, material, inclination = 0, node = 0) {
  const points = [];
  const segments = 128;
  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const orbit = new THREE.LineLoop(geometry, material);
  orbit.rotation.x = inclination;
  orbit.rotation.z = node;
  return orbit;
}

export function createSolarSystem({ compact = false } = {}) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030612, compact ? 0.012 : 0.018);
  const root = new THREE.Group();
  root.rotation.x = -0.12;
  root.rotation.z = 0.04;
  root.position.y = -0.08;
  scene.add(root);

  const ambientLight = new THREE.AmbientLight(0x1f2b5e, compact ? 0.46 : 0.58);
  const hemisphereLight = new THREE.HemisphereLight(0x7894d7, 0x090a16, compact ? 0.22 : 0.3);
  const sunLight = new THREE.PointLight(0xffbd73, compact ? 135 : 190, 20, 1.7);
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(compact ? 512 : 1024, compact ? 512 : 1024);
  sunLight.shadow.camera.near = 0.2;
  sunLight.shadow.camera.far = 18;
  const cameraFill = new THREE.DirectionalLight(0x5a78c8, compact ? 0.85 : 1.15);
  cameraFill.position.set(6, 7, 9);
  cameraFill.target.position.set(0, 0, 0);
  scene.add(ambientLight, hemisphereLight, sunLight, cameraFill, cameraFill.target);

  const glowTexture = createGlowTexture();
  const sunGroup = new THREE.Group();
  const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffa347,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  }));
  sunGlow.scale.set(3.2, 3.2, 1);
  sunGroup.add(sunGlow);
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.82, compact ? 24 : 40, compact ? 16 : 28),
    new THREE.MeshStandardMaterial({
      color: 0xffad42,
      emissive: 0xff6f1e,
      emissiveIntensity: 1.8,
      roughness: 0.3,
      metalness: 0,
    })
  );
  sun.castShadow = true;
  sun.receiveShadow = true;
  sunGroup.add(sun);
  const sunHalo = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, compact ? 16 : 24, compact ? 12 : 18),
    new THREE.MeshBasicMaterial({
      color: 0xff9a38,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    })
  );
  sunGroup.add(sunHalo);
  root.add(sunGroup);

  const orbitGroup = new THREE.Group();
  const bodyGroup = new THREE.Group();
  const asteroidGroup = new THREE.Group();
  root.add(orbitGroup, bodyGroup, asteroidGroup);

  const orbitMaterial = new THREE.LineBasicMaterial({
    color: 0x8197d1,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });
  const planetPivots = [];
  const planetMeshes = [];
  const orbitLines = PLANET_DATA.map((planet) => createOrbit(planet.distance, orbitMaterial, planet.inclination, planet.node));
  orbitLines.forEach((orbit) => orbitGroup.add(orbit));

  PLANET_DATA.forEach((planet, index) => {
    const pivot = new THREE.Group();
    pivot.rotation.y = planet.phase;
    pivot.rotation.x = planet.inclination;
    pivot.rotation.z = planet.node;
    const material = new THREE.MeshStandardMaterial({
      color: planet.color,
      roughness: 0.78,
      metalness: 0.02,
      emissive: planet.emissive ?? planet.color,
      emissiveIntensity: planet.emissive ? 0.8 : 0.2,
    });
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(planet.radius, compact ? 16 : 24, compact ? 12 : 18),
      material
    );
    mesh.position.x = planet.distance;
    mesh.rotation.z = index * 0.18;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    pivot.add(mesh);

    if (planet.ring) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(planet.radius * 1.45, planet.radius * 2.18, 48),
        new THREE.MeshBasicMaterial({
          color: 0xd8bd8a,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
        })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.x = planet.distance;
      ring.castShadow = true;
      ring.receiveShadow = true;
      pivot.add(ring);
    }

    if (planet.name === 'Earth') {
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(planet.radius * 1.18, compact ? 14 : 22, compact ? 10 : 16),
        new THREE.MeshBasicMaterial({
          color: 0x55baff,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          depthWrite: false,
        })
      );
      atmosphere.position.x = planet.distance;
      pivot.add(atmosphere);
      const moonPivot = new THREE.Group();
      moonPivot.position.x = planet.distance;
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 12, 8),
        new THREE.MeshStandardMaterial({ color: 0xabb5c8, roughness: 0.9 })
      );
      moon.position.x = 0.36;
      moon.castShadow = true;
      moon.receiveShadow = true;
      moonPivot.add(moon);
      pivot.add(moonPivot);
      planetMeshes.push({ mesh: moon, spin: 1.9, moonPivot });
    }

    bodyGroup.add(pivot);
    planetPivots.push({ pivot, planet });
    planetMeshes.push({ mesh, spin: 0.8 + index * 0.18 });
  });

  const asteroidGeometry = new THREE.IcosahedronGeometry(0.018, 0);
  const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7e72, roughness: 1, metalness: 0 });
  const asteroidCount = compact ? 42 : 76;
  const asteroids = new THREE.InstancedMesh(asteroidGeometry, asteroidMaterial, asteroidCount);
  const asteroidMatrix = new THREE.Object3D();
  for (let index = 0; index < asteroidCount; index += 1) {
    const angle = seeded(index + 3) * Math.PI * 2;
    const radius = 3.08 + seeded(index + 9) * 0.43;
    asteroidMatrix.position.set(
      Math.cos(angle) * radius,
      (seeded(index + 14) - 0.5) * 0.28,
      Math.sin(angle) * radius
    );
    const scale = 0.55 + seeded(index + 20) * 1.6;
    asteroidMatrix.scale.setScalar(scale);
    asteroidMatrix.rotation.set(seeded(index + 28), seeded(index + 32), seeded(index + 39));
    asteroidMatrix.updateMatrix();
    asteroids.setMatrixAt(index, asteroidMatrix.matrix);
  }
  asteroids.instanceMatrix.needsUpdate = true;
  asteroids.castShadow = true;
  asteroidGroup.add(asteroids);

  function setStage(stageIndex) {
    sunGroup.visible = stageIndex >= 1;
    orbitGroup.visible = stageIndex >= 2;
    bodyGroup.visible = stageIndex >= 2;
    asteroidGroup.visible = stageIndex >= 3;
  }

  function update(elapsed, stageIndex) {
    const moving = stageIndex >= 3;
    planetPivots.forEach(({ pivot, planet }) => {
      pivot.rotation.y = moving ? planet.phase + elapsed * planet.speed * 0.16 : planet.phase;
    });
    planetMeshes.forEach(({ mesh, spin, moonPivot }) => {
      mesh.rotation.y = moving ? elapsed * spin : 0;
      if (moonPivot) moonPivot.rotation.y = moving ? elapsed * 1.5 : 0;
    });
    sun.rotation.y = moving ? elapsed * 0.12 : 0;
    asteroidGroup.rotation.y = moving ? elapsed * 0.08 : 0;
    sunGlow.scale.setScalar(3.2 + Math.sin(elapsed * 1.2) * 0.07);
  }

  setStage(4);

  return {
    scene,
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
      glowTexture.dispose();
    },
  };
}
