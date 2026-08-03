"use strict";

const canvas = document.querySelector("#flowerCanvas");
const fallback = document.querySelector("#fallback");
const growButton = document.querySelector("#growButton");
const scatterButton = document.querySelector("#scatterButton");
const rotationButton = document.querySelector("#rotationButton");
const rotationSpeedRange = document.querySelector("#rotationSpeedRange");
const rotationSpeedValue = document.querySelector("#rotationSpeedValue");
const particleCountLabel = document.querySelector("#particleCount");
const statusCopy = document.querySelector("#statusCopy");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gl = canvas.getContext("webgl", {
  alpha: true,
  antialias: true,
  depth: true,
  premultipliedAlpha: false,
  powerPreference: "high-performance",
});

if (!gl) {
  fallback.hidden = false;
  throw new Error("WebGL is not available in this browser.");
}

const TAU = Math.PI * 2;
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
const mix = (a, b, amount) => a + (b - a) * amount;

let randomState = 0x52ad91f3;
function random() {
  randomState ^= randomState << 13;
  randomState ^= randomState >>> 17;
  randomState ^= randomState << 5;
  return (randomState >>> 0) / 4294967296;
}

function randomNormal() {
  return Math.sqrt(-2 * Math.log(Math.max(random(), 1e-6))) * Math.cos(TAU * random());
}

function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
function subtract(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function scale(a, amount) { return [a[0] * amount, a[1] * amount, a[2] * amount]; }
function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}
function lengthOf(a) { return Math.hypot(a[0], a[1], a[2]); }
function normalize(a) {
  const length = lengthOf(a) || 1;
  return [a[0] / length, a[1] / length, a[2] / length];
}
function lerpVector(a, b, amount) {
  return [mix(a[0], b[0], amount), mix(a[1], b[1], amount), mix(a[2], b[2], amount)];
}

function mat4Identity() {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function mat4Multiply(a, b) {
  const out = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let value = 0;
      for (let index = 0; index < 4; index += 1) {
        value += a[index * 4 + row] * b[column * 4 + index];
      }
      out[column * 4 + row] = value;
    }
  }
  return out;
}

function mat4Perspective(fieldOfView, aspect, near, far) {
  const f = 1 / Math.tan(fieldOfView / 2);
  const range = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * range, -1,
    0, 0, 2 * far * near * range, 0,
  ]);
}

function mat4LookAt(eye, target, up) {
  const zAxis = normalize(subtract(eye, target));
  const xAxis = normalize(cross(up, zAxis));
  const yAxis = cross(zAxis, xAxis);
  return new Float32Array([
    xAxis[0], yAxis[0], zAxis[0], 0,
    xAxis[1], yAxis[1], zAxis[1], 0,
    xAxis[2], yAxis[2], zAxis[2], 0,
    -dot(xAxis, eye), -dot(yAxis, eye), -dot(zAxis, eye), 1,
  ]);
}

function mat4RotationY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ]);
}

function mat4RotationX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ]);
}

function mat4Translation(x, y, z) {
  const out = mat4Identity();
  out[12] = x;
  out[13] = y;
  out[14] = z;
  return out;
}

function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(vertexSource, fragmentSource) {
  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  return program;
}

const meshVertexSource = `
  precision highp float;

  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec3 aColor;
  attribute float aReveal;
  attribute float aMaterial;
  attribute float aShard;

  uniform mat4 uModel;
  uniform mat4 uViewProjection;
  uniform float uReveal;
  uniform float uDisintegrate;
  uniform float uTime;

  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vAlpha;
  varying float vMaterial;

  float hash(vec3 value) {
    return fract(sin(dot(value, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }

  void main() {
    float appear = smoothstep(aReveal - 0.13, aReveal + 0.08, uReveal);
    appear = 1.0 - pow(1.0 - appear, 3.0);
    vec3 root = vec3(0.0, -3.72, 0.0);
    vec3 position = mix(root + vec3(aPosition.x * 0.025, 0.0, aPosition.z * 0.025), aPosition, appear);

    float noise = aShard;
    float breathing = sin(uTime * 0.92 + aPosition.y * 0.8) * 0.004;
    position += aNormal * breathing * appear * (1.0 - aMaterial);
    position += aNormal * uDisintegrate * (0.3 + noise * 1.15);
    position.x += cos(noise * 17.0) * uDisintegrate * (0.15 + noise * 1.15);
    position.y += (noise - 0.3) * uDisintegrate * 1.45;
    position.z += sin(noise * 23.0) * uDisintegrate * (0.15 + noise * 1.15);

    vec4 world = uModel * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    vNormal = normalize(mat3(uModel) * aNormal);
    vColor = aColor;
    vAlpha = appear * (1.0 - uDisintegrate * 0.72);
    vMaterial = aMaterial;
    gl_Position = uViewProjection * world;
  }
`;

const meshFragmentSource = `
  precision highp float;

  uniform vec3 uCamera;
  uniform float uDisintegrate;

  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vAlpha;
  varying float vMaterial;

  void main() {
    if (vAlpha < 0.012) discard;
    vec3 normal = normalize(vNormal);
    vec3 lightA = normalize(vec3(0.35, 0.82, 0.56));
    vec3 lightB = normalize(vec3(-0.72, 0.18, 0.46));
    vec3 viewDirection = normalize(uCamera - vWorldPosition);

    float diffuseA = max(dot(normal, lightA), 0.0);
    float diffuseB = max(dot(normal, lightB), 0.0);
    float backLight = max(dot(-normal, lightA), 0.0) * 0.22;
    float rim = pow(1.0 - max(abs(dot(normal, viewDirection)), 0.0), 2.2);
    vec3 halfVector = normalize(lightA + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), mix(14.0, 38.0, vMaterial));

    float lighting = 0.34 + diffuseA * 0.78 + diffuseB * 0.24 + backLight;
    float petalSurface = smoothstep(0.84, 0.92, vMaterial);
    float softPetalLighting = 0.78 + diffuseA * 0.36 + backLight * 0.30;
    lighting = mix(lighting, softPetalLighting, petalSurface * 0.62);
    vec3 color = vColor * lighting;
    color += vec3(0.42, 0.62, 0.52) * rim * (0.10 + vMaterial * 0.16);
    color += vec3(1.0, 0.92, 0.68) * specular * (0.06 + vMaterial * 0.26);
    color += vec3(0.55, 0.82, 0.68) * uDisintegrate * 0.08;
    color = pow(max(color, 0.0), vec3(0.82));
    gl_FragColor = vec4(color, vAlpha);
  }
`;

const particleVertexSource = `
  precision highp float;

  attribute vec3 aPosition;
  attribute vec3 aScatter;
  attribute vec4 aColor;
  attribute float aSize;
  attribute float aSeed;

  uniform mat4 uModel;
  uniform mat4 uViewProjection;
  uniform float uTime;
  uniform float uDisintegrate;
  uniform float uReveal;
  uniform float uPixelRatio;
  uniform float uPointScale;

  varying vec4 vColor;

  void main() {
    float flutter = sin(uTime * (0.7 + fract(aSeed * 5.7)) + aSeed * 41.0);
    vec3 position = aPosition;
    position += vec3(flutter, cos(uTime * 0.52 + aSeed * 29.0), sin(aSeed * 67.0 + uTime * 0.4)) * 0.018;
    float scatterAmount = smoothstep(0.0, 1.0, uDisintegrate);
    position += aScatter * scatterAmount * (1.0 + fract(aSeed * 31.0) * 2.8);

    vec4 world = uModel * vec4(position, 1.0);
    vec4 clip = uViewProjection * world;
    gl_Position = clip;
    gl_PointSize = clamp(aSize * uPointScale * uPixelRatio * (8.0 / max(2.0, clip.w)), 1.0, 38.0);
    float formed = smoothstep(0.18, 0.78, uReveal);
    vColor = vec4(aColor.rgb, aColor.a * formed * mix(0.92, 1.48, scatterAmount));
  }
`;

const particleFragmentSource = `
  precision highp float;

  uniform float uGlowPass;
  uniform float uAlpha;
  varying vec4 vColor;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    float shape = smoothstep(0.5, mix(0.04, 0.0, uGlowPass), distanceToCenter);
    float core = smoothstep(0.15, 0.0, distanceToCenter);
    vec3 color = vColor.rgb * mix(0.82 + core * 0.55, 0.72, uGlowPass);
    gl_FragColor = vec4(color, shape * vColor.a * uAlpha);
  }
`;

const meshProgram = createProgram(meshVertexSource, meshFragmentSource);
const particleProgram = createProgram(particleVertexSource, particleFragmentSource);

const meshLocations = {
  position: gl.getAttribLocation(meshProgram, "aPosition"),
  normal: gl.getAttribLocation(meshProgram, "aNormal"),
  color: gl.getAttribLocation(meshProgram, "aColor"),
  reveal: gl.getAttribLocation(meshProgram, "aReveal"),
  material: gl.getAttribLocation(meshProgram, "aMaterial"),
  shard: gl.getAttribLocation(meshProgram, "aShard"),
  model: gl.getUniformLocation(meshProgram, "uModel"),
  viewProjection: gl.getUniformLocation(meshProgram, "uViewProjection"),
  revealUniform: gl.getUniformLocation(meshProgram, "uReveal"),
  disintegrate: gl.getUniformLocation(meshProgram, "uDisintegrate"),
  time: gl.getUniformLocation(meshProgram, "uTime"),
  camera: gl.getUniformLocation(meshProgram, "uCamera"),
};

const particleLocations = {
  position: gl.getAttribLocation(particleProgram, "aPosition"),
  scatter: gl.getAttribLocation(particleProgram, "aScatter"),
  color: gl.getAttribLocation(particleProgram, "aColor"),
  size: gl.getAttribLocation(particleProgram, "aSize"),
  seed: gl.getAttribLocation(particleProgram, "aSeed"),
  model: gl.getUniformLocation(particleProgram, "uModel"),
  viewProjection: gl.getUniformLocation(particleProgram, "uViewProjection"),
  time: gl.getUniformLocation(particleProgram, "uTime"),
  disintegrate: gl.getUniformLocation(particleProgram, "uDisintegrate"),
  revealUniform: gl.getUniformLocation(particleProgram, "uReveal"),
  pixelRatio: gl.getUniformLocation(particleProgram, "uPixelRatio"),
  pointScale: gl.getUniformLocation(particleProgram, "uPointScale"),
  glowPass: gl.getUniformLocation(particleProgram, "uGlowPass"),
  alpha: gl.getUniformLocation(particleProgram, "uAlpha"),
};

const mesh = {
  positions: [],
  normals: [],
  colors: [],
  reveals: [],
  materials: [],
  shards: [],
};

const particles = {
  positions: [],
  scatters: [],
  colors: [],
  sizes: [],
  seeds: [],
};

function revealForY(y, bias = 0) {
  return clamp(0.05 + ((y + 3.7) / 6.8) * 0.72 + bias, 0.03, 0.9);
}

function pushTriangle(a, b, c, colors, reveal, material = 0.5) {
  const normal = normalize(cross(subtract(b, a), subtract(c, a)));
  const triangleColors = Array.isArray(colors[0]) ? colors : [colors, colors, colors];
  const shard = random();
  for (const [index, position] of [a, b, c].entries()) {
    mesh.positions.push(...position);
    mesh.normals.push(...normal);
    mesh.colors.push(...triangleColors[index]);
    mesh.reveals.push(reveal);
    mesh.materials.push(material);
    mesh.shards.push(shard);
  }
}

function pushQuad(a, b, c, d, colors, reveal, material = 0.5) {
  const quadColors = Array.isArray(colors[0]) ? colors : [colors, colors, colors, colors];
  pushTriangle(a, b, c, [quadColors[0], quadColors[1], quadColors[2]], reveal, material);
  pushTriangle(a, c, d, [quadColors[0], quadColors[2], quadColors[3]], reveal, material);
}

function quadraticBezier(a, control, b, t) {
  const oneMinusT = 1 - t;
  return [
    oneMinusT * oneMinusT * a[0] + 2 * oneMinusT * t * control[0] + t * t * b[0],
    oneMinusT * oneMinusT * a[1] + 2 * oneMinusT * t * control[1] + t * t * b[1],
    oneMinusT * oneMinusT * a[2] + 2 * oneMinusT * t * control[2] + t * t * b[2],
  ];
}

function addTube(path, radius, colorStart, colorEnd, rings = 22, sides = 10, revealBias = 0) {
  const ringPoints = [];
  for (let ring = 0; ring <= rings; ring += 1) {
    const t = ring / rings;
    const center = path(t);
    const before = path(clamp(t - 0.01, 0, 1));
    const after = path(clamp(t + 0.01, 0, 1));
    const tangent = normalize(subtract(after, before));
    let frameX = normalize(cross([0, 0, 1], tangent));
    if (lengthOf(frameX) < 0.1) frameX = [1, 0, 0];
    const frameZ = normalize(cross(tangent, frameX));
    const currentRadius = radius * mix(1.08, 0.72, t);
    const points = [];
    for (let side = 0; side < sides; side += 1) {
      const angle = (side / sides) * TAU;
      const radial = add(scale(frameX, Math.cos(angle) * currentRadius), scale(frameZ, Math.sin(angle) * currentRadius));
      points.push(add(center, radial));
    }
    ringPoints.push(points);
  }

  for (let ring = 0; ring < rings; ring += 1) {
    const amount = ring / rings;
    const color = [
      mix(colorStart[0], colorEnd[0], amount),
      mix(colorStart[1], colorEnd[1], amount),
      mix(colorStart[2], colorEnd[2], amount),
    ];
    const reveal = revealForY(path(amount)[1], revealBias);
    for (let side = 0; side < sides; side += 1) {
      const next = (side + 1) % sides;
      pushQuad(
        ringPoints[ring][side],
        ringPoints[ring + 1][side],
        ringPoints[ring + 1][next],
        ringPoints[ring][next],
        color,
        reveal,
        0.26,
      );
    }
  }
}

function addLeaf(base, tip, width, normalHint, color, revealBias = 0) {
  const direction = normalize(subtract(tip, base));
  const side = normalize(cross(normalHint, direction));
  const rows = [];
  const across = [-1, -0.34, 0.34, 1];
  const segments = 13;

  for (let segment = 0; segment <= segments; segment += 1) {
    const u = segment / segments;
    const center = lerpVector(base, tip, u);
    center[1] -= Math.sin(Math.PI * u) * 0.12;
    const leafWidth = Math.pow(Math.sin(Math.PI * u), 0.72) * width;
    const row = across.map((v) => {
      const camber = (1 - v * v) * Math.sin(Math.PI * u) * 0.08;
      return add(add(center, scale(side, v * leafWidth)), scale(normalHint, camber));
    });
    rows.push(row);
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const u = segment / segments;
    const light = 0.82 + u * 0.18;
    const shade = [color[0] * light, color[1] * light, color[2] * light];
    for (let column = 0; column < across.length - 1; column += 1) {
      pushQuad(
        rows[segment][column],
        rows[segment + 1][column],
        rows[segment + 1][column + 1],
        rows[segment][column + 1],
        shade,
        revealForY(base[1], revealBias) + u * 0.06,
        0.34,
      );
    }
  }
}

function flowerBasis(normalInput) {
  const normal = normalize(normalInput);
  let right = normalize(cross([0, 1, 0], normal));
  if (lengthOf(right) < 0.2) right = normalize(cross([1, 0, 0], normal));
  const up = normalize(cross(normal, right));
  return { normal, right, up };
}

function localToWorld(center, basis, x, y, z) {
  return add(center, add(scale(basis.right, x), add(scale(basis.up, y), scale(basis.normal, z))));
}

function addPetal(center, basis, angle, flowerScale, layer, petalIndex) {
  const direction = [Math.cos(angle), Math.sin(angle)];
  const perpendicular = [-direction[1], direction[0]];
  const length = flowerScale * mix(layer === 0 ? 0.72 : 0.58, layer === 0 ? 0.94 : 0.76, random());
  const maximumWidth = flowerScale * mix(0.20, 0.29, random()) * (layer === 0 ? 1 : 0.9);
  const arch = flowerScale * mix(0.08, 0.19, random());
  const tipCurl = flowerScale * mix(-0.07, 0.11, random());
  const longitudinalSegments = 9;
  const across = [-1, -0.34, 0.34, 1];
  const rows = [];

  for (let segment = 0; segment <= longitudinalSegments; segment += 1) {
    const u = segment / longitudinalSegments;
    const radial = flowerScale * 0.11 + u * length;
    const width = maximumWidth * (0.13 + Math.pow(Math.sin(Math.PI * u), 0.7) * 0.87) * (1 - u * 0.08);
    const row = across.map((v) => {
      const planarX = direction[0] * radial + perpendicular[0] * v * width;
      const planarY = direction[1] * radial + perpendicular[1] * v * width;
      const ruffle = Math.sin(u * Math.PI * 3 + petalIndex * 0.71) * v * flowerScale * 0.012;
      const depth = (layer === 0 ? 0 : -0.055 * flowerScale)
        + Math.sin(Math.PI * u) * arch
        + u * u * tipCurl
        + Math.abs(v) * flowerScale * 0.018
        + ruffle;
      return localToWorld(center, basis, planarX, planarY, depth);
    });
    rows.push(row);
  }

  const baseTint = mix(0.91, 1.0, random());
  for (let segment = 0; segment < longitudinalSegments; segment += 1) {
    const u = segment / longitudinalSegments;
    const rootShade = Math.pow(1 - u, 2) * 0.12;
    const coolShade = (petalIndex % 3) * 0.012;
    const colorA = [
      baseTint - rootShade,
      0.95 - rootShade * 0.35,
      0.91 + coolShade - rootShade * 0.1,
    ];
    const colorB = [
      Math.min(1, colorA[0] + 0.035),
      Math.min(1, colorA[1] + 0.025),
      Math.min(1, colorA[2] + 0.025),
    ];
    for (let column = 0; column < across.length - 1; column += 1) {
      pushQuad(
        rows[segment][column],
        rows[segment + 1][column],
        rows[segment + 1][column + 1],
        rows[segment][column + 1],
        [colorA, colorB, colorB, colorA],
        revealForY(center[1], layer * 0.025 + segment * 0.004),
        0.92,
      );
    }
  }
}

function addSphere(center, basis, radius, depthScale, color, reveal, material = 0.75) {
  const latitudeSegments = 9;
  const longitudeSegments = 18;
  const rows = [];

  for (let latitude = 0; latitude <= latitudeSegments; latitude += 1) {
    const v = latitude / latitudeSegments;
    const phi = v * Math.PI;
    const row = [];
    for (let longitude = 0; longitude <= longitudeSegments; longitude += 1) {
      const u = longitude / longitudeSegments;
      const theta = u * TAU;
      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius;
      const z = Math.cos(phi) * radius * depthScale;
      row.push(localToWorld(center, basis, x, y, z));
    }
    rows.push(row);
  }

  for (let latitude = 0; latitude < latitudeSegments; latitude += 1) {
    const shade = 0.78 + (latitude / latitudeSegments) * 0.22;
    const shadedColor = [color[0] * shade, color[1] * shade, color[2] * shade];
    for (let longitude = 0; longitude < longitudeSegments; longitude += 1) {
      pushQuad(
        rows[latitude][longitude],
        rows[latitude + 1][longitude],
        rows[latitude + 1][longitude + 1],
        rows[latitude][longitude + 1],
        shadedColor,
        reveal,
        material,
      );
    }
  }
}

function addSepals(center, basis, flowerScale, reveal) {
  for (let index = 0; index < 7; index += 1) {
    const angle = (index / 7) * TAU + 0.25;
    const direction = [Math.cos(angle), Math.sin(angle)];
    const base = localToWorld(center, basis, direction[0] * 0.08, direction[1] * 0.08, -0.1 * flowerScale);
    const left = localToWorld(center, basis, direction[0] * 0.12 - direction[1] * 0.055, direction[1] * 0.12 + direction[0] * 0.055, -0.13 * flowerScale);
    const right = localToWorld(center, basis, direction[0] * 0.12 + direction[1] * 0.055, direction[1] * 0.12 - direction[0] * 0.055, -0.13 * flowerScale);
    const tip = localToWorld(center, basis, direction[0] * 0.43 * flowerScale, direction[1] * 0.43 * flowerScale, -0.19 * flowerScale);
    pushTriangle(base, left, tip, [0.16, 0.42, 0.13], reveal, 0.22);
    pushTriangle(base, tip, right, [0.13, 0.34, 0.1], reveal, 0.22);
  }
}

function addFlower(definition) {
  const basis = flowerBasis(definition.normal);
  const petalCount = definition.petals;
  for (let layer = 1; layer >= 0; layer -= 1) {
    const offset = layer === 0 ? 0 : Math.PI / petalCount;
    for (let petal = 0; petal < petalCount; petal += 1) {
      const angle = definition.rotation + offset + (petal / petalCount) * TAU;
      addPetal(definition.position, basis, angle, definition.scale, layer, petal + layer * petalCount);
    }
  }

  const reveal = revealForY(definition.position[1], 0.055);
  addSepals(definition.position, basis, definition.scale, reveal);
  const centerPosition = add(definition.position, scale(basis.normal, definition.scale * 0.09));
  addSphere(centerPosition, basis, definition.scale * 0.245, 0.65, [0.96, 0.61, 0.08], reveal + 0.025, 0.76);

  const pollenCount = Math.round(430 * definition.scale);
  for (let index = 0; index < pollenCount; index += 1) {
    const angle = random() * TAU;
    const radius = definition.scale * mix(0.12, 1.12, Math.pow(random(), 0.72));
    const localX = Math.cos(angle) * radius;
    const localY = Math.sin(angle) * radius;
    const localZ = randomNormal() * definition.scale * 0.18 + definition.scale * 0.12;
    const position = localToWorld(definition.position, basis, localX, localY, localZ);
    const outward = normalize(subtract(position, definition.position));
    const scatter = normalize(add(outward, [randomNormal() * 0.35, random() * 0.55, randomNormal() * 0.35]));
    const gold = random() > 0.72;
    particles.positions.push(...position);
    particles.scatters.push(...scatter);
    particles.colors.push(...(gold
      ? [1.0, mix(0.58, 0.9, random()), 0.14, mix(0.35, 0.82, random())]
      : [mix(0.72, 1.0, random()), 0.96, 0.85, mix(0.16, 0.48, random())]));
    particles.sizes.push(mix(1.2, 4.2, random()));
    particles.seeds.push(random());
  }

  definition.basis = basis;
}

const flowerDefinitions = [
  { position: [-0.10, 2.50, 0.08], normal: [0.08, 0.14, 1], scale: 0.86, petals: 12, rotation: 0.13 },
  { position: [-0.84, 1.62, 0.12], normal: [-0.38, 0.08, 0.92], scale: 0.68, petals: 11, rotation: 0.34 },
  { position: [0.78, 1.54, -0.08], normal: [0.42, 0.04, 0.90], scale: 0.70, petals: 11, rotation: -0.16 },
  { position: [-0.08, 0.62, 0.38], normal: [-0.06, 0.08, 1], scale: 0.94, petals: 13, rotation: 0.22 },
  { position: [0.16, 1.06, -0.68], normal: [0.22, 0.06, -1], scale: 0.66, petals: 11, rotation: 0.04 },
  { position: [0.72, -0.18, 0.02], normal: [0.92, 0.12, 0.24], scale: 0.62, petals: 10, rotation: 0.43 },
  { position: [-0.62, -0.14, -0.28], normal: [-0.88, 0.10, -0.34], scale: 0.58, petals: 10, rotation: -0.22 },
];

const mainStemPath = (t) => {
  const y = mix(-3.72, 2.48, t);
  return [Math.sin((t + 0.15) * Math.PI * 1.15) * 0.10 - t * 0.06, y, Math.cos(t * Math.PI * 1.4) * 0.055];
};

addTube(mainStemPath, 0.075, [0.08, 0.25, 0.06], [0.23, 0.55, 0.15], 34, 12);

for (const flower of flowerDefinitions) {
  const branchStartY = clamp(flower.position[1] - mix(0.75, 1.35, random()), -2.9, 1.8);
  const branchT = (branchStartY + 3.72) / 6.2;
  const start = mainStemPath(clamp(branchT, 0, 1));
  const basis = flowerBasis(flower.normal);
  const end = subtract(flower.position, scale(basis.normal, flower.scale * 0.13));
  const control = [
    mix(start[0], end[0], 0.46) + flower.position[0] * 0.08,
    mix(start[1], end[1], 0.56) + 0.12,
    mix(start[2], end[2], 0.46),
  ];
  addTube(
    (t) => quadraticBezier(start, control, end, t),
    0.043 * mix(0.8, 1.15, flower.scale),
    [0.09, 0.29, 0.07],
    [0.27, 0.58, 0.16],
    16,
    9,
    0.015,
  );
}

addLeaf(mainStemPath(0.13), [-1.05, -2.35, 0.36], 0.33, [0.08, 0.18, 0.98], [0.12, 0.43, 0.10]);
addLeaf(mainStemPath(0.21), [1.10, -1.82, -0.26], 0.38, [-0.12, 0.16, 0.98], [0.16, 0.52, 0.12]);
addLeaf(mainStemPath(0.31), [-1.18, -1.12, -0.18], 0.35, [0.14, 0.2, 0.97], [0.10, 0.38, 0.08]);
addLeaf(mainStemPath(0.42), [1.02, -0.60, 0.42], 0.31, [-0.16, 0.12, 0.98], [0.19, 0.58, 0.13]);
addLeaf(mainStemPath(0.53), [-0.86, 0.10, 0.46], 0.27, [0.12, 0.16, 0.98], [0.14, 0.46, 0.10]);
addLeaf(mainStemPath(0.61), [0.76, 0.62, -0.35], 0.24, [-0.1, 0.18, 0.98], [0.18, 0.54, 0.12]);

flowerDefinitions.forEach(addFlower);

const ambientParticleCount = window.innerWidth < 700 ? 650 : 1050;
for (let index = 0; index < ambientParticleCount; index += 1) {
  const y = mix(-3.5, 3.15, random());
  const angle = random() * TAU;
  const radius = mix(0.3, 1.75, Math.pow(random(), 0.65));
  const position = [Math.cos(angle) * radius * 0.7, y, Math.sin(angle) * radius];
  const scatter = normalize([Math.cos(angle) * mix(0.3, 1, random()), mix(-0.2, 0.8, random()), Math.sin(angle) * mix(0.3, 1, random())]);
  particles.positions.push(...position);
  particles.scatters.push(...scatter);
  particles.colors.push(0.52, mix(0.68, 0.94, random()), 0.61, mix(0.05, 0.22, random()));
  particles.sizes.push(mix(0.8, 2.7, random()));
  particles.seeds.push(random());
}

function createBuffer(values) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
  return buffer;
}

const meshBuffers = {
  position: createBuffer(mesh.positions),
  normal: createBuffer(mesh.normals),
  color: createBuffer(mesh.colors),
  reveal: createBuffer(mesh.reveals),
  material: createBuffer(mesh.materials),
  shard: createBuffer(mesh.shards),
};

const particleBuffers = {
  position: createBuffer(particles.positions),
  scatter: createBuffer(particles.scatters),
  color: createBuffer(particles.colors),
  size: createBuffer(particles.sizes),
  seed: createBuffer(particles.seeds),
};

function bindAttribute(location, buffer, size) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
}

const meshVertexCount = mesh.positions.length / 3;
const triangleCount = Math.round(meshVertexCount / 3);
const particleCount = particles.positions.length / 3;
particleCountLabel.textContent = `${triangleCount.toLocaleString("zh-CN")} 面 · ${particleCount.toLocaleString("zh-CN")} 粒子`;

gl.clearColor(0, 0, 0, 0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.disable(gl.CULL_FACE);
gl.enable(gl.BLEND);

let pixelRatio = 1;
let aspect = 1;
function resize() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2);
  const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
  const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }
  aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
}

const state = {
  reveal: reducedMotion ? 1 : 0,
  revealTarget: 1,
  disintegrate: 0,
  disintegrateTarget: 0,
  autoRotate: !reducedMotion,
  rotationSpeed: Number(rotationSpeedRange.value) / 100,
  yaw: -0.28,
  pitch: -0.08,
  pitchTarget: -0.08,
  dragging: false,
  lastPointer: null,
};

function damp(current, target, smoothing, delta) {
  return mix(current, target, 1 - Math.exp(-smoothing * delta));
}

function replayBloom() {
  state.disintegrate = 0;
  state.disintegrateTarget = 0;
  state.reveal = reducedMotion ? 1 : 0;
  state.revealTarget = 1;
  scatterButton.textContent = "粒子解构";
  scatterButton.setAttribute("aria-pressed", "false");
  statusCopy.textContent = reducedMotion ? "三维花束已完整显示" : "三维花束正在重新绽放";
}

function toggleDisintegration() {
  state.reveal = 1;
  state.revealTarget = 1;
  state.disintegrateTarget = state.disintegrateTarget > 0.5 ? 0 : 1;
  const active = state.disintegrateTarget > 0.5;
  scatterButton.textContent = active ? "恢复花束" : "粒子解构";
  scatterButton.setAttribute("aria-pressed", String(active));
  statusCopy.textContent = active ? "网格正在分解为旋转粒子" : "实体花瓣正在恢复";
}

function toggleRotation() {
  state.autoRotate = !state.autoRotate;
  rotationButton.textContent = state.autoRotate ? "自动旋转" : "继续旋转";
  rotationButton.setAttribute("aria-pressed", String(state.autoRotate));
  statusCopy.textContent = state.autoRotate ? "360° 自动旋转已恢复" : "旋转已暂停，可拖动观察";
}

growButton.addEventListener("click", replayBloom);
scatterButton.addEventListener("click", toggleDisintegration);
rotationButton.addEventListener("click", toggleRotation);

rotationSpeedRange.addEventListener("input", () => {
  const value = Number(rotationSpeedRange.value);
  state.rotationSpeed = value / 100;
  rotationSpeedValue.value = `${value}%`;
  rotationSpeedRange.style.background = `linear-gradient(90deg, #a4d8b0 0 ${value}%, rgba(255, 255, 255, .13) ${value}% 100%)`;
});

canvas.addEventListener("pointerdown", (event) => {
  state.dragging = true;
  state.lastPointer = [event.clientX, event.clientY];
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  if (!state.dragging || !state.lastPointer) return;
  const deltaX = event.clientX - state.lastPointer[0];
  const deltaY = event.clientY - state.lastPointer[1];
  state.yaw += deltaX * 0.008;
  state.pitchTarget = clamp(state.pitchTarget + deltaY * 0.005, -0.45, 0.35);
  state.lastPointer = [event.clientX, event.clientY];
});

function releasePointer(event) {
  state.dragging = false;
  state.lastPointer = null;
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
}

canvas.addEventListener("pointerup", releasePointer);
canvas.addEventListener("pointercancel", releasePointer);
canvas.addEventListener("dblclick", () => {
  state.pitchTarget = -0.08;
  state.yaw = -0.28;
  statusCopy.textContent = "英雄镜头已恢复";
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    toggleRotation();
  }
  if (event.key.toLowerCase() === "r") replayBloom();
  if (event.key.toLowerCase() === "d") toggleDisintegration();
});

window.addEventListener("resize", resize, { passive: true });
resize();

const startTime = performance.now();
let previousTime = startTime;

function render(now) {
  const elapsed = (now - startTime) / 1000;
  const delta = Math.min(0.05, (now - previousTime) / 1000);
  previousTime = now;

  state.reveal = damp(state.reveal, state.revealTarget, 1.45, delta);
  state.disintegrate = damp(
    state.disintegrate,
    state.disintegrateTarget,
    state.disintegrateTarget > 0.5 ? 1.5 : 3.4,
    delta,
  );
  state.pitch = damp(state.pitch, state.pitchTarget, 4.2, delta);
  if (state.autoRotate && !state.dragging && state.reveal > 0.992) {
    state.yaw += delta * mix(0.10, 0.62, state.rotationSpeed);
  }

  if (state.reveal > 0.992 && state.disintegrateTarget < 0.05 && state.disintegrate < 0.05) {
    statusCopy.textContent = state.autoRotate ? "花束正在进行 360° 实体旋转" : "旋转已暂停，可拖动观察";
  }

  resize();
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const horizontalOffset = aspect > 1.1 ? 0.68 : 0;
  const modelRotation = mat4Multiply(mat4RotationY(state.yaw), mat4RotationX(state.pitch));
  const model = mat4Multiply(mat4Translation(horizontalOffset, -0.03, 0), modelRotation);
  const cameraDistance = aspect < 0.75 ? 11.6 : 9.65;
  const camera = [0, 0.12, cameraDistance + Math.sin(elapsed * 0.22) * 0.08];
  const projection = mat4Perspective(42 * Math.PI / 180, aspect, 0.1, 40);
  const view = mat4LookAt(camera, [horizontalOffset, -0.15, 0], [0, 1, 0]);
  const viewProjection = mat4Multiply(projection, view);

  gl.useProgram(meshProgram);
  bindAttribute(meshLocations.position, meshBuffers.position, 3);
  bindAttribute(meshLocations.normal, meshBuffers.normal, 3);
  bindAttribute(meshLocations.color, meshBuffers.color, 3);
  bindAttribute(meshLocations.reveal, meshBuffers.reveal, 1);
  bindAttribute(meshLocations.material, meshBuffers.material, 1);
  bindAttribute(meshLocations.shard, meshBuffers.shard, 1);
  gl.uniformMatrix4fv(meshLocations.model, false, model);
  gl.uniformMatrix4fv(meshLocations.viewProjection, false, viewProjection);
  gl.uniform1f(meshLocations.revealUniform, state.reveal);
  gl.uniform1f(meshLocations.disintegrate, state.disintegrate);
  gl.uniform1f(meshLocations.time, elapsed);
  gl.uniform3f(meshLocations.camera, camera[0], camera[1], camera[2]);
  gl.depthMask(true);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.TRIANGLES, 0, meshVertexCount);

  gl.useProgram(particleProgram);
  bindAttribute(particleLocations.position, particleBuffers.position, 3);
  bindAttribute(particleLocations.scatter, particleBuffers.scatter, 3);
  bindAttribute(particleLocations.color, particleBuffers.color, 4);
  bindAttribute(particleLocations.size, particleBuffers.size, 1);
  bindAttribute(particleLocations.seed, particleBuffers.seed, 1);
  gl.uniformMatrix4fv(particleLocations.model, false, model);
  gl.uniformMatrix4fv(particleLocations.viewProjection, false, viewProjection);
  gl.uniform1f(particleLocations.time, elapsed);
  gl.uniform1f(particleLocations.disintegrate, state.disintegrate);
  gl.uniform1f(particleLocations.revealUniform, state.reveal);
  gl.uniform1f(particleLocations.pixelRatio, pixelRatio);
  gl.depthMask(false);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  gl.uniform1f(particleLocations.glowPass, 1);
  gl.uniform1f(particleLocations.pointScale, 4.1);
  gl.uniform1f(particleLocations.alpha, 0.12);
  gl.drawArrays(gl.POINTS, 0, particleCount);

  gl.uniform1f(particleLocations.glowPass, 0);
  gl.uniform1f(particleLocations.pointScale, 1.42);
  gl.uniform1f(particleLocations.alpha, 1.08);
  gl.drawArrays(gl.POINTS, 0, particleCount);
  gl.depthMask(true);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
