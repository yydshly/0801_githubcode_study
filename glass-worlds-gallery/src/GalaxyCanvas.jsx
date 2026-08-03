import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const compositionTemplates = [
  [
    { angle: -2.78, entryRadius: 0.21 }, { angle: 0.45, entryRadius: 0.17 },
    { angle: -0.38, entryRadius: 0.23 }, { angle: 2.68, entryRadius: 0.19 },
    { angle: -1.08, entryRadius: 0.29 }, { angle: -2.16, entryRadius: 0.22 },
    { angle: 1.88, entryRadius: 0.18 }, { angle: 1.12, entryRadius: 0.15 },
  ],
  [
    { angle: -2.82, entryRadius: 0.22 }, { angle: 0.5, entryRadius: 0.18 },
    { angle: -0.3, entryRadius: 0.25 }, { angle: 2.72, entryRadius: 0.17 },
    { angle: -0.9, entryRadius: 0.3 }, { angle: -1.96, entryRadius: 0.21 },
    { angle: 2.08, entryRadius: 0.2 }, { angle: 1.34, entryRadius: 0.16 },
  ],
  [
    { angle: -2.92, entryRadius: 0.2 }, { angle: 0.38, entryRadius: 0.16 },
    { angle: -0.2, entryRadius: 0.24 }, { angle: 2.74, entryRadius: 0.2 },
    { angle: -1.28, entryRadius: 0.28 }, { angle: -2.32, entryRadius: 0.23 },
    { angle: 1.72, entryRadius: 0.18 }, { angle: 0.98, entryRadius: 0.15 },
  ],
  [
    { angle: -2.82, entryRadius: 0.21 }, { angle: 0.42, entryRadius: 0.17 },
    { angle: -0.35, entryRadius: 0.24 }, { angle: 2.72, entryRadius: 0.18 },
    { angle: -1.18, entryRadius: 0.3 }, { angle: -2.05, entryRadius: 0.22 },
    { angle: 1.98, entryRadius: 0.19 }, { angle: 1.22, entryRadius: 0.16 },
  ],
];

const flightSeeds = [
  { slot: 0, scheduleRank: 1, speed: 1.02, drift: 0.016, phase: 0.2, frameOffset: 0, hueShift: -0.025 },
  { slot: 1, scheduleRank: 0, speed: 0.98, drift: 0.014, phase: 1.4, frameOffset: 1, hueShift: 0.018 },
  { slot: 2, scheduleRank: 5, speed: 1.04, drift: 0.016, phase: 2.8, frameOffset: 2, hueShift: 0.03 },
  { slot: 3, scheduleRank: 3, speed: 0.95, drift: 0.014, phase: 4.1, frameOffset: 0, hueShift: -0.018 },
  { slot: 4, scheduleRank: 7, speed: 1, drift: 0.016, phase: 5.2, frameOffset: 1, hueShift: 0.024 },
  { slot: 5, scheduleRank: 4, speed: 0.93, drift: 0.013, phase: 6.4, frameOffset: 2, hueShift: -0.03 },
  { slot: 6, scheduleRank: 6, speed: 1.03, drift: 0.014, phase: 7.5, frameOffset: 0, hueShift: 0.014 },
  { slot: 7, scheduleRank: 2, speed: 0.97, drift: 0.015, phase: 8.7, frameOffset: 1, hueShift: -0.022 },
];

const BASE_FLIGHT_RATE = 1 / 17;
const FAR_PROGRESS_END = 0.26;
const MID_PROGRESS_END = 0.78;
const FAR_PACE = 1.32;
const MID_PACE = 0.72;
const NEAR_PACE = 1.9;
const FAR_TRAVEL = FAR_PROGRESS_END / FAR_PACE;
const MID_TRAVEL = (MID_PROGRESS_END - FAR_PROGRESS_END) / MID_PACE;
const NEAR_TRAVEL = (1 - MID_PROGRESS_END) / NEAR_PACE;
const TOTAL_TRAVEL = FAR_TRAVEL + MID_TRAVEL + NEAR_TRAVEL;
const MIN_SCREEN_RADIUS = 0.038;
const MAX_SCREEN_RADIUS = 0.44;
const FAR_DISTANCE = 54;
const NEAR_DISTANCE = 10.5;
const PILOT_NEAR_DISTANCE = 7.4;
const PILOT_PHYSICAL_RADIUS = 1.18;
const PHYSICAL_CORRIDOR_SLOTS = new Set([0, 1, 2, 3]);

const defaultSceneCalibration = {
  focal: [0, -0.012],
  exposure: 1,
  saturation: 1.08,
  refraction: 1,
};

const sceneCalibrations = {
  "alpine-village-v1.webp": { focal: [0, -0.026], exposure: 0.92, saturation: 1.02, refraction: 0.9 },
  "desert-expedition-v1.webp": { focal: [0.012, -0.024], exposure: 0.87, saturation: 0.98, refraction: 0.88 },
  "evidence-archive-v1.webp": { focal: [0, -0.018], exposure: 1.22, saturation: 1.07, refraction: 0.86 },
  "fashion-atelier-v1.webp": { focal: [0, -0.02], exposure: 1.12, saturation: 1.04, refraction: 0.82 },
  "forest-cottage-v1.webp": { focal: [0, -0.026], exposure: 1.18, saturation: 1.1, refraction: 0.88 },
  "neon-city-v1.webp": { focal: [0, -0.018], exposure: 1.22, saturation: 1.09, refraction: 0.88 },
  "robot-frontier-v1.webp": { focal: [0.034, -0.01], exposure: 1.1, saturation: 1.01, refraction: 0.82 },
  "underwater-city-v1.webp": { focal: [0, -0.026], exposure: 1.14, saturation: 1.07, refraction: 0.9 },
};

function getSceneCalibration(url) {
  const filename = url.split("/").pop()?.split("?")[0];
  return sceneCalibrations[filename] ?? defaultSceneCalibration;
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vLocalPosition;
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  void main() {
    vUv = uv;
    vLocalPosition = position;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDirection = normalize(-modelViewPosition.xyz);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const imageFragmentShader = `
  uniform sampler2D uTextureA;
  uniform sampler2D uTextureB;
  uniform float uMix;
  uniform float uHueShift;
  uniform vec2 uLensOffset;
  uniform float uExposure;
  uniform float uSaturation;
  uniform float uRefractionStrength;
  uniform float uDepthOptics;
  varying vec2 vUv;
  varying vec3 vLocalPosition;
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  vec3 hueRotate(vec3 color, float angle) {
    const mat3 rgbToYiq = mat3(
      0.299, 0.587, 0.114,
      0.596, -0.275, -0.321,
      0.212, -0.523, 0.311
    );
    const mat3 yiqToRgb = mat3(
      1.0, 0.956, 0.621,
      1.0, -0.272, -0.647,
      1.0, -1.107, 1.705
    );
    vec3 yiq = rgbToYiq * color;
    float hue = atan(yiq.z, yiq.y) + angle;
    float chroma = length(yiq.yz);
    return clamp(yiqToRgb * vec3(yiq.x, chroma * cos(hue), chroma * sin(hue)), 0.0, 1.0);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewDirection);
    float facing = max(dot(normal, viewDirection), 0.0);
    float curvature = pow(1.0 - facing, 2.15);
    vec2 projectedUv = vLocalPosition.xy * 0.43 + 0.5;
    float opticalEdge = smoothstep(0.015, 0.72, curvature);
    vec2 refraction = normal.xy * (0.0015 + opticalEdge * 0.038) * uRefractionStrength * uDepthOptics;
    vec2 viewParallax = viewDirection.xy * (0.0035 + opticalEdge * 0.0025) * uDepthOptics;
    vec2 lensUv = clamp((projectedUv - 0.5) * 0.94 + 0.5 + uLensOffset + refraction + viewParallax, 0.012, 0.988);
    vec4 colorA = texture2D(uTextureA, lensUv);
    vec4 colorB = texture2D(uTextureB, lensUv);
    vec2 chromaOffset = normal.xy * opticalEdge * 0.0024 * uDepthOptics;
    vec3 dispersedA = vec3(
      texture2D(uTextureA, clamp(lensUv + chromaOffset, 0.012, 0.988)).r,
      colorA.g,
      texture2D(uTextureA, clamp(lensUv - chromaOffset, 0.012, 0.988)).b
    );
    vec3 dispersedB = vec3(
      texture2D(uTextureB, clamp(lensUv + chromaOffset, 0.012, 0.988)).r,
      colorB.g,
      texture2D(uTextureB, clamp(lensUv - chromaOffset, 0.012, 0.988)).b
    );
    colorA.rgb = mix(colorA.rgb, dispersedA, opticalEdge * 0.42);
    colorB.rgb = mix(colorB.rgb, dispersedB, opticalEdge * 0.42);
    vec4 color = mix(colorA, colorB, smoothstep(0.0, 1.0, uMix));
    float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    color.rgb = hueRotate(mix(vec3(luminance), color.rgb, uSaturation), uHueShift);
    color.rgb = mix(color.rgb, sqrt(max(color.rgb, vec3(0.0))), 0.16);
    color.rgb *= uExposure;
    float imageEdge = smoothstep(0.27, 0.58, distance(projectedUv, vec2(0.5)));
    color.rgb *= mix(1.055, 0.92, imageEdge);
    float diffuse = max(dot(normal, normalize(vec3(-0.42, 0.68, 0.58))), 0.0);
    float lowerShade = smoothstep(-0.85, 0.4, normal.y);
    float sideVolume = smoothstep(-1.05, 0.78, normal.x * -0.7 + normal.y * 0.26);
    float innerGlow = pow(max(dot(reflect(normalize(vec3(0.48, -0.72, -0.36)), normal), viewDirection), 0.0), 14.0);
    color.rgb *= 0.88 + diffuse * 0.2;
    color.rgb *= mix(0.93, 1.04, lowerShade);
    color.rgb *= mix(0.96, 1.03, sideVolume);
    color.rgb *= 1.0 - curvature * 0.11;
    color.rgb += vec3(0.12, 0.17, 0.23) * innerGlow * 0.24;
    gl_FragColor = color;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const rimVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDirection = normalize(-modelViewPosition.xyz);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const rimFragmentShader = `
  uniform vec3 uColor;
  uniform float uStrength;
  uniform float uTime;
  uniform float uHighlightSeed;
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewDirection);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.1);
    float crown = pow(max(normal.y, 0.0), 5.0) * 0.18;
    vec3 movingLight = normalize(vec3(
      -0.48 + sin(uTime * 0.22 + uHighlightSeed * 1.7) * 0.18,
      0.68 + cos(uHighlightSeed * 2.1) * 0.08,
      0.5 + sin(uHighlightSeed) * 0.14
    ));
    float specular = pow(max(dot(reflect(-movingLight, normal), viewDirection), 0.0), 30.0);
    vec3 secondaryLight = normalize(vec3(
      0.68 + sin(uHighlightSeed * 0.9) * 0.16,
      0.16 + cos(uHighlightSeed * 1.3) * 0.08,
      -0.5
    ));
    float secondary = pow(max(dot(reflect(secondaryLight, normal), viewDirection), 0.0), 48.0);
    float alpha = min(1.0, fresnel * uStrength + crown + specular * 0.5 + secondary * 0.18);
    vec3 highlight = mix(uColor, vec3(1.0), min(1.0, specular + secondary));
    gl_FragColor = vec4(highlight, alpha);
  }
`;

const particleVertexShader = `
  attribute float aBrightness;
  uniform float uPointSize;
  uniform float uFarFadeStart;
  uniform float uFarFadeEnd;
  uniform float uNearFadeStart;
  uniform float uNearFadeEnd;
  varying float vDepthFade;
  varying float vBrightness;
  varying float vMotionLift;
  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = uPointSize;
    float distanceToCamera = -modelViewPosition.z;
    float nearFade = smoothstep(uNearFadeStart, uNearFadeEnd, distanceToCamera);
    float farFade = 1.0 - smoothstep(uFarFadeStart, uFarFadeEnd, distanceToCamera);
    float depthLuminance = mix(1.0, 0.72, smoothstep(10.0, uFarFadeStart, distanceToCamera));
    float proximity = 1.0 - smoothstep(8.0, uFarFadeStart, distanceToCamera);
    vDepthFade = nearFade * farFade * depthLuminance;
    vBrightness = aBrightness;
    vMotionLift = mix(0.94, 1.12, proximity);
  }
`;

const particleFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepthFade;
  varying float vBrightness;
  varying float vMotionLift;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float circle = 1.0 - smoothstep(0.28, 0.5, distanceToCenter);
    if (circle <= 0.01) discard;
    vec3 variedColor = uColor * mix(0.82, 1.08, vBrightness) * vMotionLift;
    gl_FragColor = vec4(variedColor, circle * vDepthFade * vBrightness * uOpacity * mix(0.96, 1.08, vMotionLift));
  }
`;

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function travelPhaseToProgress(phase) {
  const normalizedPhase = ((phase % 1) + 1) % 1;
  const travel = normalizedPhase * TOTAL_TRAVEL;
  if (travel < FAR_TRAVEL) return travel * FAR_PACE;
  if (travel < FAR_TRAVEL + MID_TRAVEL) {
    return FAR_PROGRESS_END + (travel - FAR_TRAVEL) * MID_PACE;
  }
  return MID_PROGRESS_END + (travel - FAR_TRAVEL - MID_TRAVEL) * NEAR_PACE;
}

function angleToQuadrant(angle) {
  const horizontal = Math.cos(angle) >= 0 ? "R" : "L";
  const vertical = Math.sin(angle) >= 0 ? "U" : "D";
  return `${vertical}${horizontal}`;
}

export function GalaxyCanvas({ worlds, selectedId, reducedMotion, onSelect, onHoverChange }) {
  const canvasRef = useRef(null);
  const selectedIdRef = useRef(selectedId);
  const reducedMotionRef = useRef(reducedMotion);
  const onSelectRef = useRef(onSelect);
  const onHoverChangeRef = useRef(onHoverChange);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    onHoverChangeRef.current = onHoverChange;
  }, [onHoverChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030812, 0.012);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = environmentTarget.texture;

    const camera = new THREE.PerspectiveCamera(44, 1, 0.12, 130);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, -24);

    scene.add(new THREE.HemisphereLight(0xbad8ff, 0x060910, 1.25));
    const keyLight = new THREE.DirectionalLight(0xe7f2ff, 2.6);
    keyLight.position.set(-6, 9, 10);
    scene.add(keyLight);
    const blueLight = new THREE.PointLight(0x6ca8ff, 28, 42, 1.8);
    blueLight.position.set(8, -2, 4);
    scene.add(blueLight);

    const textureLoader = new THREE.TextureLoader();
    const textureCache = new Map();
    const getTexture = (url) => {
      if (textureCache.has(url)) return textureCache.get(url);
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      textureCache.set(url, texture);
      return texture;
    };
    const textures = worlds.map((world) => world.images.map((url) => ({
      url,
      texture: getTexture(url),
      calibration: getSceneCalibration(url),
    })));
    canvas.dataset.sceneTextureCount = String(textureCache.size);
    canvas.dataset.compositionTemplateCount = String(compositionTemplates.length);

    const sceneAssignmentCache = new Map();
    const resolveSceneAssignments = (epoch) => {
      const normalizedEpoch = Math.max(0, Math.floor(Number.isFinite(epoch) ? epoch : 0));
      if (sceneAssignmentCache.has(normalizedEpoch)) return sceneAssignmentCache.get(normalizedEpoch);

      const assignments = new Array(worlds.length).fill(0);
      const usedUrls = new Set();
      const worldOrder = Array.from({ length: worlds.length }, (_, offset) => (offset + normalizedEpoch) % worlds.length);

      const assignWorld = (cursor) => {
        if (cursor >= worldOrder.length) return true;
        const worldIndex = worldOrder[cursor];
        const candidates = textures[worldIndex];
        const seed = flightSeeds[worldIndex % flightSeeds.length] ?? { frameOffset: 0 };
        const preferredIndex = ((normalizedEpoch + seed.frameOffset) % candidates.length + candidates.length) % candidates.length;

        for (let offset = 0; offset < candidates.length; offset += 1) {
          const candidateIndex = (preferredIndex + offset) % candidates.length;
          const candidate = candidates[candidateIndex];
          if (usedUrls.has(candidate.url)) continue;
          assignments[worldIndex] = candidateIndex;
          usedUrls.add(candidate.url);
          if (assignWorld(cursor + 1)) return true;
          usedUrls.delete(candidate.url);
        }
        return false;
      };

      if (!assignWorld(0)) {
        const usage = new Map();
        worldOrder.forEach((worldIndex) => {
          const candidates = textures[worldIndex];
          let bestIndex = 0;
          let bestUsage = Number.POSITIVE_INFINITY;
          candidates.forEach((candidate, candidateIndex) => {
            const count = usage.get(candidate.url) ?? 0;
            if (count < bestUsage) {
              bestUsage = count;
              bestIndex = candidateIndex;
            }
          });
          assignments[worldIndex] = bestIndex;
          const url = candidates[bestIndex].url;
          usage.set(url, (usage.get(url) ?? 0) + 1);
        });
      }

      sceneAssignmentCache.set(normalizedEpoch, assignments);
      if (sceneAssignmentCache.size > 8) sceneAssignmentCache.delete(normalizedEpoch - 8);
      return assignments;
    };

    const sphereGeometry = new THREE.SphereGeometry(1, 56, 56);
    const shellGeometry = new THREE.SphereGeometry(1.035, 64, 64);
    const innerShellGeometry = new THREE.SphereGeometry(1.018, 56, 56);
    const shadeGeometry = new THREE.SphereGeometry(1.012, 40, 40);
    canvas.dataset.sharedSphereGeometryCount = "4";
    const planetStates = [];
    const initialAssignments = resolveSceneAssignments(0);
    worlds.forEach((world, index) => {
      const seed = flightSeeds[index];
      const travelPhase = (seed.scheduleRank + 0.38) / worlds.length;
      const initialProgress = travelPhaseToProgress(travelPhase);
      const initialSlot = compositionTemplates[0][seed.slot];
      const firstScene = textures[index][initialAssignments[index]];
      const group = new THREE.Group();
      group.userData.worldId = world.id;

      const imageMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTextureA: { value: firstScene.texture },
          uTextureB: { value: firstScene.texture },
          uMix: { value: 0 },
          uHueShift: { value: seed.hueShift },
          uLensOffset: { value: new THREE.Vector2(...firstScene.calibration.focal) },
          uExposure: { value: firstScene.calibration.exposure },
          uSaturation: { value: firstScene.calibration.saturation },
          uRefractionStrength: { value: firstScene.calibration.refraction },
          uDepthOptics: { value: 0.78 },
        },
        vertexShader,
        fragmentShader: imageFragmentShader,
      });
      const imageSphere = new THREE.Mesh(sphereGeometry, imageMaterial);
      imageSphere.renderOrder = 1;
      group.add(imageSphere);

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xdceeff),
        transparent: true,
        opacity: 0.085,
        transmission: 0.96,
        thickness: 0.72,
        ior: 1.35,
        roughness: 0.035,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        reflectivity: 0.62,
        attenuationColor: new THREE.Color(0xbddcff),
        attenuationDistance: 4.6,
        envMapIntensity: 0.68,
        depthWrite: false,
        side: THREE.FrontSide,
      });
      const glassShell = new THREE.Mesh(shellGeometry, glassMaterial);
      glassShell.renderOrder = 3;
      group.add(glassShell);

      const innerGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xa8d3ff),
        transparent: true,
        opacity: 0.024,
        transmission: 0.72,
        thickness: 0.92,
        ior: 1.18,
        roughness: 0.12,
        metalness: 0,
        envMapIntensity: 0.24,
        depthWrite: false,
        side: THREE.BackSide,
      });
      const innerGlass = new THREE.Mesh(innerShellGeometry, innerGlassMaterial);
      innerGlass.renderOrder = 2;
      group.add(innerGlass);

      const rimMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0xd9ecff).lerp(new THREE.Color(world.accent), 0.18) },
          uStrength: { value: 0.86 },
          uTime: { value: 0 },
          uHighlightSeed: { value: (index + 1) * 0.731 + seed.phase * 0.17 },
        },
        vertexShader: rimVertexShader,
        fragmentShader: rimFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const rim = new THREE.Mesh(shellGeometry, rimMaterial);
      rim.renderOrder = 4;
      group.add(rim);

      const shadeMaterial = new THREE.MeshBasicMaterial({
        color: 0x02050a,
        transparent: true,
        opacity: 0.035,
        side: THREE.BackSide,
        depthWrite: false,
      });
      const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
      shade.position.set(0.08, -0.08, -0.12);
      group.add(shade);

      const sizeFactor = THREE.MathUtils.clamp(0.9 + (world.layout.size - 18) * 0.008, 0.84, 1.08);
      const heroStrength = seed.slot === 2 ? 1 : seed.slot === 4 ? 0.5 : 0;
      const heroLane = heroStrength > 0;
      const initialEntryRadius = heroLane
        ? Math.min(initialSlot.entryRadius, THREE.MathUtils.lerp(0.105, 0.07, heroStrength))
        : initialSlot.entryRadius;
      group.position.set(0, 0, camera.position.z - FAR_DISTANCE);
      group.scale.setScalar(1);
      scene.add(group);

      planetStates.push({
        group,
        imageMaterial,
        glassMaterial,
        innerGlassMaterial,
        rimMaterial,
        textures: textures[index],
        currentScene: firstScene,
        sizeFactor,
        speed: seed.speed,
        compositionSlot: seed.slot,
        heroLane,
        heroStrength,
        corridorPilot: PHYSICAL_CORRIDOR_SLOTS.has(seed.slot),
        corridorReady: false,
        corridorStart: new THREE.Vector3(),
        corridorEnd: new THREE.Vector3(),
        corridorPhysicalScale: 1,
        compositionCycle: 0,
        laneAngle: initialSlot.angle,
        exitQuadrant: angleToQuadrant(initialSlot.angle),
        entryRadius: initialEntryRadius,
        laneDrift: seed.drift,
        lanePhase: seed.phase,
        frameOffset: seed.frameOffset,
        progress: initialProgress,
        travelPhase,
        screenX: Math.cos(initialSlot.angle) * initialEntryRadius,
        screenY: Math.sin(initialSlot.angle) * initialEntryRadius,
        visualScale: 1,
        motionMultiplier: 1,
        hover: 0,
        index,
      });
    });
    canvas.dataset.pilotCorridorCount = String(planetStates.filter((state) => state.corridorPilot).length);
    canvas.dataset.controlPathCount = String(planetStates.filter((state) => !state.corridorPilot).length);
    canvas.dataset.corridorPathMode = "four-quadrant-physical-lines";
    canvas.dataset.corridorQuadrants = planetStates
      .filter((state) => state.corridorPilot)
      .map((state) => state.exitQuadrant)
      .sort()
      .join("/");
    canvas.dataset.glassOpticsMode = "parallax-dispersion-seeded-highlight";

    const particleLayerConfigs = [
      {
        id: "background", count: 1450, pointSize: 1.18, color: 0xe2edf9, opacity: 0.94,
        depthMin: -96, depthSpan: 106, farMin: -108, farSpan: 22,
        speedMin: 0.48, speedSpan: 0.72, brightnessMin: 0.68, brightnessSpan: 0.28,
        farFadeStart: 88, farFadeEnd: 116,
      },
      {
        id: "foreground", count: 340, pointSize: 1.18, color: 0xffffff, opacity: 1,
        depthMin: -62, depthSpan: 72, farMin: -78, farSpan: 18,
        speedMin: 2.05, speedSpan: 1.25, brightnessMin: 0.84, brightnessSpan: 0.16,
        farFadeStart: 62, farFadeEnd: 86,
      },
    ];
    const particleLayers = particleLayerConfigs.map((config) => {
      const positions = new Float32Array(config.count * 3);
      const speeds = new Float32Array(config.count);
      const brightness = new Float32Array(config.count);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(config.color) },
          uOpacity: { value: config.opacity },
          uPointSize: { value: config.pointSize * Math.min(window.devicePixelRatio || 1, 1.75) },
          uFarFadeStart: { value: config.farFadeStart },
          uFarFadeEnd: { value: config.farFadeEnd },
          uNearFadeStart: { value: 0.8 },
          uNearFadeEnd: { value: 4.8 },
        },
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      return { ...config, positions, speeds, brightness, geometry, material, points };
    });
    canvas.dataset.particleLayerCount = String(particleLayers.length);
    canvas.dataset.backgroundParticleCount = String(particleLayers[0].count);
    canvas.dataset.foregroundParticleCount = String(particleLayers[1].count);
    canvas.dataset.particlePointSizes = particleLayers.map((layer) => layer.pointSize.toFixed(2)).join("/");
    canvas.dataset.particleLifecycleFade = "far-in-near-out";
    canvas.dataset.particleSpeedMode = "continuous-depth-wheel-synced";

    const resetParticle = (layer, index, far = false) => {
      const i = index * 3;
      const depth = far
        ? layer.farMin - Math.random() * layer.farSpan
        : layer.depthMin + Math.random() * layer.depthSpan;
      const distanceToCamera = Math.max(1, camera.position.z - depth);
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distanceToCamera;
      const halfWidth = halfHeight * camera.aspect;
      layer.positions[i] = (Math.random() * 2 - 1) * halfWidth * 1.08;
      layer.positions[i + 1] = (Math.random() * 2 - 1) * halfHeight * 1.08;
      layer.positions[i + 2] = depth;
      layer.speeds[index] = layer.speedMin + Math.random() * layer.speedSpan;
      layer.brightness[index] = layer.brightnessMin + Math.random() * layer.brightnessSpan;
    };
    particleLayers.forEach((layer) => {
      for (let index = 0; index < layer.count; index += 1) resetParticle(layer, index);
      layer.geometry.attributes.position.needsUpdate = true;
      layer.geometry.attributes.aBrightness.needsUpdate = true;
    });

    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const projectedHoverPosition = new THREE.Vector3();
    const pilotProjectedPosition = new THREE.Vector3();
    const pilotViewPosition = new THREE.Vector3();
    let hoveredId = null;
    let pointerInside = false;
    let lastHoverPayload = null;
    let recyclePasses = 0;
    let recycleSceneChanges = 0;
    const recentExitQuadrants = [];
    let animationFrame;
    let previousTime = performance.now();
    let elapsed = 0;
    let speedBoost = 0;

    const findPlanet = (object) => {
      let current = object;
      while (current && !current.userData.worldId) current = current.parent;
      return current?.userData.worldId ?? null;
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerInside = true;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const clearHover = () => {
      hoveredId = null;
      lastHoverPayload = null;
      canvas.style.cursor = "grab";
      onHoverChangeRef.current?.(null);
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      pointer.set(0, 0);
      clearHover();
    };

    const handleClick = () => {
      if (!hoveredId) return;
      const selectedHoverId = hoveredId;
      clearHover();
      onSelectRef.current?.(selectedHoverId);
    };

    const handleWheel = (event) => {
      speedBoost = Math.min(4.5, speedBoost + Math.abs(event.deltaY) * 0.0025);
    };

    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("wheel", handleWheel, { passive: true });

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      particleLayers.forEach((layer) => {
        layer.material.uniforms.uPointSize.value = layer.pointSize * Math.min(window.devicePixelRatio || 1, 1.75);
        for (let index = 0; index < layer.count; index += 1) resetParticle(layer, index);
        layer.geometry.attributes.position.needsUpdate = true;
        layer.geometry.attributes.aBrightness.needsUpdate = true;
      });
      planetStates.forEach((state) => {
        if (state.corridorPilot) state.corridorReady = false;
      });
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const buildPhysicalCorridor = (state) => {
      const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      const cosAngle = Math.cos(state.laneAngle);
      const sinAngle = Math.sin(state.laneAngle);
      const physicalScale = PILOT_PHYSICAL_RADIUS * state.sizeFactor;
      const nearScreenRadius = physicalScale / (PILOT_NEAR_DISTANCE * tanHalfFov);
      const nearRadiusX = nearScreenRadius / camera.aspect;
      const exitX = Math.abs(cosAngle) > 0.001
        ? (1 + nearRadiusX + 0.08) / Math.abs(cosAngle)
        : Number.POSITIVE_INFINITY;
      const exitY = Math.abs(sinAngle) > 0.001
        ? (1 + nearScreenRadius + 0.08) / Math.abs(sinAngle)
        : Number.POSITIVE_INFINITY;
      const exitDistance = Math.min(exitX, exitY);
      const farHalfHeight = tanHalfFov * FAR_DISTANCE;
      const farHalfWidth = farHalfHeight * camera.aspect;
      const nearHalfHeight = tanHalfFov * PILOT_NEAR_DISTANCE;
      const nearHalfWidth = nearHalfHeight * camera.aspect;

      state.corridorStart.set(
        camera.position.x + cosAngle * state.entryRadius * farHalfWidth,
        camera.position.y + sinAngle * state.entryRadius * farHalfHeight,
        camera.position.z - FAR_DISTANCE,
      );
      state.corridorEnd.set(
        camera.position.x + cosAngle * exitDistance * nearHalfWidth,
        camera.position.y + sinAngle * exitDistance * nearHalfHeight,
        camera.position.z - PILOT_NEAR_DISTANCE,
      );
      state.corridorPhysicalScale = physicalScale;
      state.corridorReady = true;
    };

    const applySceneToState = (state, nextScene) => {
      if (!nextScene) return;
      state.currentScene = nextScene;
      state.imageMaterial.uniforms.uTextureA.value = nextScene.texture;
      state.imageMaterial.uniforms.uTextureB.value = nextScene.texture;
      state.imageMaterial.uniforms.uMix.value = 0;
      state.imageMaterial.uniforms.uLensOffset.value.set(...nextScene.calibration.focal);
      state.imageMaterial.uniforms.uExposure.value = nextScene.calibration.exposure;
      state.imageMaterial.uniforms.uSaturation.value = nextScene.calibration.saturation;
      state.imageMaterial.uniforms.uRefractionStrength.value = nextScene.calibration.refraction;
    };

    const chooseRecycleScene = (state) => {
      const candidateStart = (state.compositionCycle + state.frameOffset) % state.textures.length;
      let bestScene = state.currentScene;
      let bestScore = 1;

      state.textures.forEach((candidate, offset) => {
        if (candidate.url === state.currentScene.url) return;
        const owner = planetStates.find((otherState) => (
          otherState !== state && otherState.currentScene.url === candidate.url
        ));
        let score = owner ? 0 : 8;
        const candidateIndex = state.textures.indexOf(candidate);
        const rotationDistance = (candidateIndex - candidateStart + state.textures.length) % state.textures.length;
        score -= rotationDistance * 0.03 + offset * 0.001;
        if (score > bestScore) {
          bestScore = score;
          bestScene = candidate;
        }
      });

      return bestScene;
    };

    const recyclePlanet = (state) => {
      recyclePasses += 1;
      recentExitQuadrants.push(state.exitQuadrant);
      if (recentExitQuadrants.length > 16) recentExitQuadrants.shift();
      state.compositionCycle += 1;
      const template = compositionTemplates[state.compositionCycle % compositionTemplates.length];
      const slot = template[state.compositionSlot];
      state.laneAngle = slot.angle + (Math.random() - 0.5) * 0.024;
      state.exitQuadrant = angleToQuadrant(state.laneAngle);
      if (state.corridorPilot) state.corridorReady = false;
      state.entryRadius = state.heroLane
        ? THREE.MathUtils.clamp(
          slot.entryRadius * THREE.MathUtils.lerp(0.42, 0.28, state.heroStrength) + (Math.random() - 0.5) * 0.012,
          0.055,
          0.115,
        )
        : THREE.MathUtils.clamp(slot.entryRadius + (Math.random() - 0.5) * 0.018, 0.14, 0.31);
      state.screenX = Math.cos(state.laneAngle) * state.entryRadius;
      state.screenY = Math.sin(state.laneAngle) * state.entryRadius;
      const nextScene = chooseRecycleScene(state);
      if (nextScene.url !== state.currentScene.url) {
        applySceneToState(state, nextScene);
        recycleSceneChanges += 1;
      }
      if (hoveredId === state.group.userData.worldId) clearHover();
    };

    const render = (now) => {
      const delta = Math.min(0.05, (now - previousTime) / 1000);
      previousTime = now;
      if (!reducedMotionRef.current) elapsed += delta;
      speedBoost *= 0.94;
      const motionScale = reducedMotionRef.current ? 0 : 1 + speedBoost * 0.32;
      canvas.dataset.particleMotionScale = motionScale.toFixed(3);

      camera.position.x += ((pointer.x * 0.22 + Math.sin(elapsed * 0.08) * 0.16) - camera.position.x) * 0.025;
      camera.position.y += ((pointer.y * 0.12 + Math.cos(elapsed * 0.07) * 0.1) - camera.position.y) * 0.025;
      camera.lookAt(camera.position.x * 0.18, camera.position.y * 0.12, -24);
      camera.updateMatrixWorld();

      if (!reducedMotionRef.current) {
        particleLayers.forEach((layer) => {
          const positions = layer.geometry.attributes.position.array;
          for (let index = 0; index < layer.count; index += 1) {
            const zIndex = index * 3 + 2;
            const distanceToCamera = camera.position.z - positions[zIndex];
            const proximity = 1 - THREE.MathUtils.clamp(
              (distanceToCamera - 5) / Math.max(1, layer.farFadeStart - 5),
              0,
              1,
            );
            const continuousDepthSpeed = THREE.MathUtils.lerp(0.55, 1.55, Math.pow(proximity, 1.28));
            positions[zIndex] += layer.speeds[index] * continuousDepthSpeed * delta * motionScale;
            if (positions[zIndex] > 9.5) resetParticle(layer, index, true);
          }
          layer.geometry.attributes.position.needsUpdate = true;
        });
      }

      planetStates.forEach((state) => {
        if (!reducedMotionRef.current) {
          const hoverDepthProtection = smoothstep(0.5, 0.9, state.progress);
          const hoverTarget = hoveredId === state.group.userData.worldId
            ? THREE.MathUtils.lerp(0.38, 0.88, hoverDepthProtection)
            : 1;
          const motionEase = 1 - Math.exp(-delta * 5.5);
          state.motionMultiplier += (hoverTarget - state.motionMultiplier) * motionEase;
          state.travelPhase += BASE_FLIGHT_RATE * state.motionMultiplier * delta * motionScale;
          if (state.travelPhase >= 1) {
            state.travelPhase -= 1;
            recyclePlanet(state);
          }
          state.progress = travelPhaseToProgress(state.travelPhase);
          state.group.rotation.y += delta * 0.025;
          state.group.rotation.x = Math.sin(elapsed * 0.07 + state.lanePhase) * 0.018;
        }

        state.hover += ((hoveredId === state.group.userData.worldId ? 1 : 0) - state.hover) * 0.1;
        const selected = selectedIdRef.current === state.group.userData.worldId;
        const breath = 1 + Math.sin(elapsed * (selected || state.hover > 0.1 ? 4.33 : 2.24) + state.index) * 0.018;
        const interactionScale = 1 + state.hover * 0.052 + (selected ? 0.035 : 0);
        const opticalDepth = smoothstep(0.18, 0.92, state.progress);
        state.visualScale = breath * interactionScale;
        state.imageMaterial.uniforms.uDepthOptics.value = THREE.MathUtils.lerp(0.72, 1.08, opticalDepth);
        state.rimMaterial.uniforms.uStrength.value = 0.7 + opticalDepth * 0.18 + state.hover * 0.38 + (selected ? 0.28 : 0);
        state.rimMaterial.uniforms.uTime.value = elapsed + state.lanePhase;
        state.glassMaterial.opacity = 0.068 + opticalDepth * 0.022 + state.hover * 0.028 + (selected ? 0.02 : 0);
        state.innerGlassMaterial.opacity = 0.014 + opticalDepth * 0.014 + state.hover * 0.012 + (selected ? 0.01 : 0);
      });

      const activeUrls = new Set(planetStates.map((state) => state.currentScene.url));
      const visibleUrls = new Set(planetStates
        .filter((state) => state.progress >= 0.18 && state.progress <= 0.94)
        .map((state) => state.currentScene.url));
      const depthRoleCounts = planetStates.reduce((counts, state) => {
        if (state.progress < FAR_PROGRESS_END) counts.far += 1;
        else if (state.progress < MID_PROGRESS_END) counts.mid += 1;
        else counts.near += 1;
        return counts;
      }, { far: 0, mid: 0, near: 0 });
      canvas.dataset.activeUniqueSceneCount = String(activeUrls.size);
      canvas.dataset.visibleUniqueSceneCount = String(visibleUrls.size);
      canvas.dataset.recyclePassCount = String(recyclePasses);
      canvas.dataset.recycleSceneChangeCount = String(recycleSceneChanges);
      canvas.dataset.depthRoleCounts = `${depthRoleCounts.far}/${depthRoleCounts.mid}/${depthRoleCounts.near}`;
      const nearStates = planetStates.filter((state) => state.progress >= MID_PROGRESS_END);
      const quadrantCounts = planetStates.reduce((counts, state) => {
        counts[state.exitQuadrant] += 1;
        return counts;
      }, { UR: 0, UL: 0, DR: 0, DL: 0 });
      canvas.dataset.nearWorldCount = String(nearStates.length);
      canvas.dataset.nearWorldSnapshot = nearStates
        .map((state) => `${state.group.userData.worldId}:${state.exitQuadrant},${state.progress.toFixed(2)}`)
        .join("|");
      canvas.dataset.quadrantCounts = `${quadrantCounts.UR}/${quadrantCounts.UL}/${quadrantCounts.DR}/${quadrantCounts.DL}`;
      canvas.dataset.recentExitQuadrants = recentExitQuadrants.join("/");
      canvas.dataset.sceneSignature = planetStates
        .map((state) => state.currentScene.url.split("/").pop())
        .join("|");

      const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      planetStates.forEach((state) => {
        const progress = THREE.MathUtils.clamp(state.progress, 0, 1);
        const flightProgress = THREE.MathUtils.clamp(state.travelPhase, 0, 1);
        if (state.corridorPilot) {
          if (!state.corridorReady) buildPhysicalCorridor(state);
          const corridorT = Math.pow(flightProgress, 1.02);
          state.group.position.lerpVectors(state.corridorStart, state.corridorEnd, corridorT);
          state.group.scale.setScalar(state.corridorPhysicalScale * state.visualScale);
          pilotProjectedPosition.copy(state.group.position).project(camera);
          pilotViewPosition.copy(state.group.position).applyMatrix4(camera.matrixWorldInverse);
          const pilotDistanceToCamera = Math.max(0.5, -pilotViewPosition.z);
          state.screenX = pilotProjectedPosition.x;
          state.screenY = pilotProjectedPosition.y;
          state.screenRadius = (state.corridorPhysicalScale * state.visualScale) / (pilotDistanceToCamera * tanHalfFov);
        } else {
          const sizeCurve = progress < 0.72
            ? Math.pow(progress / 0.72, 0.9) * 0.68
            : 0.68 + smoothstep(0.72, 1, progress) * 0.32;
          const pathCurve = Math.pow(flightProgress, 1.08);
          const depthCurve = Math.pow(progress, 1.18);
          const viewportRadiusScale = THREE.MathUtils.clamp(camera.aspect / 1.08, 0.56, 1);
          const screenRadius = (MIN_SCREEN_RADIUS + (MAX_SCREEN_RADIUS * state.sizeFactor * viewportRadiusScale - MIN_SCREEN_RADIUS) * sizeCurve)
            * state.visualScale;
          state.screenRadius = screenRadius;
          const angle = state.laneAngle + Math.sin(elapsed * 0.12 + state.lanePhase) * state.laneDrift * (1 - progress * 0.72);
          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
          const radiusX = screenRadius / camera.aspect;
          const exitX = Math.abs(cosAngle) > 0.001
            ? (1 + radiusX + 0.08) / Math.abs(cosAngle)
            : Number.POSITIVE_INFINITY;
          const exitY = Math.abs(sinAngle) > 0.001
            ? (1 + screenRadius + 0.08) / Math.abs(sinAngle)
            : Number.POSITIVE_INFINITY;
          const exitDistance = Math.min(exitX, exitY);
          const radialDistance = THREE.MathUtils.lerp(state.entryRadius, exitDistance, pathCurve);
          const tangentDrift = Math.sin(elapsed * 0.09 + state.lanePhase * 1.7) * state.laneDrift * (1 - progress * 0.45);
          const targetX = cosAngle * radialDistance - sinAngle * tangentDrift;
          const targetY = sinAngle * radialDistance + cosAngle * tangentDrift;
          const positionEase = reducedMotionRef.current ? 1 : 1 - Math.exp(-delta * 8.5);
          state.screenX += (targetX - state.screenX) * positionEase;
          state.screenY += (targetY - state.screenY) * positionEase;

          const distanceToCamera = THREE.MathUtils.lerp(FAR_DISTANCE, NEAR_DISTANCE, depthCurve);
          const halfHeight = tanHalfFov * distanceToCamera;
          const halfWidth = halfHeight * camera.aspect;
          state.group.position.x = camera.position.x + state.screenX * halfWidth;
          state.group.position.y = camera.position.y + state.screenY * halfHeight;
          state.group.position.z = camera.position.z - distanceToCamera;
          state.group.scale.setScalar((screenRadius * distanceToCamera * tanHalfFov) / 1.035);
        }
      });
      canvas.dataset.centralReadableWorldCount = String(planetStates.filter((state) => (
        state.progress >= FAR_PROGRESS_END
        && state.progress <= 0.88
        && state.screenRadius >= 0.09
        && Math.hypot(state.screenX, state.screenY) <= 0.48
      )).length);
      canvas.dataset.heroLaneSnapshot = planetStates
        .filter((state) => state.heroLane)
        .map((state) => `${state.group.userData.worldId}:${state.progress.toFixed(2)},${state.screenX.toFixed(2)},${state.screenY.toFixed(2)},${state.screenRadius.toFixed(3)},${state.travelPhase.toFixed(3)}`)
        .join("|");
      const corridorSnapshots = planetStates
        .filter((state) => state.corridorPilot)
        .map((state) => {
          pilotViewPosition.copy(state.group.position).applyMatrix4(camera.matrixWorldInverse);
          return [
            state.group.userData.worldId,
            state.travelPhase.toFixed(3),
            state.screenX.toFixed(3),
            state.screenY.toFixed(3),
            state.screenRadius.toFixed(3),
            Math.max(0, -pilotViewPosition.z).toFixed(3),
            state.exitQuadrant,
          ].join(":");
        });
      canvas.dataset.physicalCorridorSnapshots = corridorSnapshots.join("|");
      canvas.dataset.pilotCorridorSnapshot = corridorSnapshots[0] ?? "";

      let minimumProjectedGap = Number.POSITIVE_INFINITY;
      let minimumProjectedGapPair = "";
      for (let firstIndex = 0; firstIndex < planetStates.length; firstIndex += 1) {
        const first = planetStates[firstIndex];
        if (first.screenRadius < 0.07) continue;
        for (let secondIndex = firstIndex + 1; secondIndex < planetStates.length; secondIndex += 1) {
          const second = planetStates[secondIndex];
          if (second.screenRadius < 0.07) continue;
          const centerDistance = Math.hypot(
            (first.screenX - second.screenX) * camera.aspect,
            first.screenY - second.screenY,
          );
          const projectedGap = centerDistance - first.screenRadius - second.screenRadius;
          if (projectedGap < minimumProjectedGap) {
            minimumProjectedGap = projectedGap;
            minimumProjectedGapPair = `${first.group.userData.worldId}/${second.group.userData.worldId}`;
          }
        }
      }
      canvas.dataset.minimumProjectedGap = Number.isFinite(minimumProjectedGap)
        ? minimumProjectedGap.toFixed(3)
        : "n/a";
      canvas.dataset.minimumProjectedGapPair = minimumProjectedGapPair;
      const depthOpticsValues = planetStates.map((state) => state.imageMaterial.uniforms.uDepthOptics.value);
      canvas.dataset.glassDepthOpticsRange = `${Math.min(...depthOpticsValues).toFixed(3)}-${Math.max(...depthOpticsValues).toFixed(3)}`;

      if (pointerInside && !selectedIdRef.current) {
        raycaster.setFromCamera(pointer, camera);
        const intersections = raycaster.intersectObjects(planetStates.map((state) => state.group), true);
        hoveredId = intersections.length ? findPlanet(intersections[0].object) : null;
        canvas.style.cursor = hoveredId ? "pointer" : "grab";
      } else if (hoveredId) {
        clearHover();
      }

      const hoveredState = hoveredId
        ? planetStates.find((state) => state.group.userData.worldId === hoveredId)
        : null;
      canvas.dataset.hoveredWorldId = hoveredState?.group.userData.worldId ?? "";
      canvas.dataset.hoveredMotionMultiplier = hoveredState?.motionMultiplier.toFixed(3) ?? "";
      const otherMotionMultipliers = hoveredState
        ? planetStates.filter((state) => state !== hoveredState).map((state) => state.motionMultiplier)
        : [];
      canvas.dataset.otherMotionMultiplierRange = otherMotionMultipliers.length
        ? `${Math.min(...otherMotionMultipliers).toFixed(3)}-${Math.max(...otherMotionMultipliers).toFixed(3)}`
        : "";
      if (hoveredState) {
        const rect = canvas.getBoundingClientRect();
        projectedHoverPosition.copy(hoveredState.group.position).project(camera);
        const payload = {
          id: hoveredId,
          x: THREE.MathUtils.clamp(rect.left + (projectedHoverPosition.x * 0.5 + 0.5) * rect.width, 112, window.innerWidth - 112),
          y: THREE.MathUtils.clamp(rect.top + (-projectedHoverPosition.y * 0.5 + 0.5) * rect.height, 112, window.innerHeight - 96),
        };
        if (
          !lastHoverPayload
          || lastHoverPayload.id !== payload.id
          || Math.abs(lastHoverPayload.x - payload.x) > 2
          || Math.abs(lastHoverPayload.y - payload.y) > 2
        ) {
          lastHoverPayload = payload;
          onHoverChangeRef.current?.(payload);
        }
      } else if (lastHoverPayload) {
        clearHover();
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("wheel", handleWheel);
      onHoverChangeRef.current?.(null);
      planetStates.forEach((state) => {
        state.imageMaterial.dispose();
        state.glassMaterial.dispose();
        state.innerGlassMaterial.dispose();
        state.rimMaterial.dispose();
        state.group.children.forEach((child) => child.material?.dispose?.());
      });
      textureCache.forEach((texture) => texture.dispose());
      sphereGeometry.dispose();
      shellGeometry.dispose();
      innerShellGeometry.dispose();
      shadeGeometry.dispose();
      particleLayers.forEach((layer) => {
        layer.geometry.dispose();
        layer.material.dispose();
      });
      environmentTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      delete canvas.dataset.sceneTextureCount;
      delete canvas.dataset.sharedSphereGeometryCount;
      delete canvas.dataset.compositionTemplateCount;
      delete canvas.dataset.activeUniqueSceneCount;
      delete canvas.dataset.visibleUniqueSceneCount;
      delete canvas.dataset.recyclePassCount;
      delete canvas.dataset.recycleSceneChangeCount;
      delete canvas.dataset.depthRoleCounts;
      delete canvas.dataset.nearWorldCount;
      delete canvas.dataset.nearWorldSnapshot;
      delete canvas.dataset.quadrantCounts;
      delete canvas.dataset.recentExitQuadrants;
      delete canvas.dataset.sceneSignature;
      delete canvas.dataset.hoveredWorldId;
      delete canvas.dataset.hoveredMotionMultiplier;
      delete canvas.dataset.otherMotionMultiplierRange;
      delete canvas.dataset.centralReadableWorldCount;
      delete canvas.dataset.heroLaneSnapshot;
      delete canvas.dataset.pilotCorridorCount;
      delete canvas.dataset.pilotCorridorSnapshot;
      delete canvas.dataset.controlPathCount;
      delete canvas.dataset.corridorPathMode;
      delete canvas.dataset.corridorQuadrants;
      delete canvas.dataset.physicalCorridorSnapshots;
      delete canvas.dataset.minimumProjectedGap;
      delete canvas.dataset.minimumProjectedGapPair;
      delete canvas.dataset.glassOpticsMode;
      delete canvas.dataset.glassDepthOpticsRange;
      delete canvas.dataset.particleLayerCount;
      delete canvas.dataset.backgroundParticleCount;
      delete canvas.dataset.foregroundParticleCount;
      delete canvas.dataset.particlePointSizes;
      delete canvas.dataset.particleLifecycleFade;
      delete canvas.dataset.particleSpeedMode;
      delete canvas.dataset.particleMotionScale;
    };
  }, [worlds]);

  return <canvas ref={canvasRef} className="galaxy-canvas" aria-label="Moving glass worlds in a particle galaxy" />;
}
