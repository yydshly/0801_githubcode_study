import * as THREE from 'three';
import { GRADE_GLSL, QUAD_VERTEX_SHADER } from './upstream/procedural-vfx/polar-night-sky.js';

export const DEEP_SPACE_SETTINGS = Object.freeze({
  exposure: 1.12,
  dithering: 0.018,
  filmGrain: 0,
  starColor: '#9fdcff',
  violetColor: '#8c75ff',
  cyanColor: '#59f4ff',
});

const DEEP_SPACE_GLSL = /* glsl */ `
  uniform vec2 iResolution;
  uniform float iTime;
  uniform float uSceneStage;
  uniform mat3 uCamBasis;
  uniform float uFov;
  uniform vec3 uStarColor;
  uniform vec3 uVioletColor;
  uniform vec3 uCyanColor;

  float hash1(float value) {
    vec3 point = fract(vec3(value) * 0.1031);
    point += dot(point, point.yzx + 33.33);
    return fract((point.x + point.y) * point.z);
  }

  float hash3(vec3 value) {
    value = fract(value * vec3(0.1031, 0.1030, 0.0973));
    value += dot(value, value.yxz + 33.33);
    return fract((value.xxy + value.yxx) * value.zyx).x;
  }

  float noise2(vec2 position) {
    vec2 cell = floor(position);
    vec2 local = fract(position);
    local = local * local * (3.0 - 2.0 * local);
    float a = hash3(vec3(cell, 0.0));
    float b = hash3(vec3(cell + vec2(1.0, 0.0), 0.0));
    float c = hash3(vec3(cell + vec2(0.0, 1.0), 0.0));
    float d = hash3(vec3(cell + vec2(1.0, 1.0), 0.0));
    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  float cloudNoise(vec2 position) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int octave = 0; octave < 4; octave++) {
      value += noise2(position) * amplitude;
      position = position * 2.03 + vec2(17.1, -9.4);
      amplitude *= 0.5;
    }
    return value;
  }

  vec3 paintDeepBackdrop(vec3 direction) {
    float horizonGlow = pow(max(0.0, 1.0 - abs(direction.y)), 5.0);
    float polarGlow = pow(max(0.0, direction.y * 0.5 + 0.5), 2.0);
    vec3 baseColor = mix(vec3(0.003, 0.006, 0.022), vec3(0.012, 0.018, 0.065), polarGlow);
    baseColor += vec3(0.02, 0.012, 0.055) * horizonGlow;
    return baseColor;
  }

  vec3 renderStarLayer(
    vec3 direction,
    float gridScale,
    float density,
    float size,
    float timeOffset,
    float twinkleAmount
  ) {
    vec3 scaledDirection = direction * gridScale + vec3(timeOffset, -timeOffset * 0.37, timeOffset * 0.61);
    vec3 cell = floor(scaledDirection);
    vec3 local = fract(scaledDirection) - 0.5;
    float cellHash = hash3(cell);
    float existence = step(1.0 - density, cellHash);
    float pixelRadius = clamp((gridScale / iResolution.y) * 1.6 * size, 0.035, 0.38);
    float glow = smoothstep(pixelRadius, 0.0, length(local));
    glow *= 0.105 / pixelRadius;

    float colorSeed = fract(cellHash * 17.13);
    float heroStar = step(0.985, cellHash);
    vec3 starTint = mix(uStarColor, uVioletColor, step(0.75, colorSeed));
    starTint = mix(starTint, uCyanColor, step(0.93, colorSeed));
    starTint *= mix(1.0, 2.2, heroStar);
    float pulse = 0.72 + 0.28 * sin(
      iTime * (0.55 + fract(cellHash * 9.0) * 2.8) + cellHash * 91.0
    );
    float twinkle = mix(1.0, pulse, twinkleAmount);
    return starTint * existence * glow * twinkle;
  }

  vec3 renderDeepStars(vec3 direction, float twinkleAmount) {
    vec3 stars = vec3(0.0);
    stars += renderStarLayer(direction, 170.0, 0.13, 0.72, 0.0, twinkleAmount * 0.35);
    stars += renderStarLayer(direction * 1.013 + vec3(0.11, -0.07, 0.05), 360.0, 0.105, 0.54, 1.7, twinkleAmount * 0.65);
    stars += renderStarLayer(direction * 0.991 + vec3(-0.19, 0.13, 0.08), 760.0, 0.062, 0.82, -2.4, twinkleAmount);
    return stars;
  }

  vec3 renderNebula(vec3 direction) {
    vec2 bandPosition = direction.xz / max(0.2, abs(direction.y) + 0.28);
    bandPosition += vec2(iTime * 0.003, -iTime * 0.001);
    float bandShape = exp(-pow(abs(direction.y + 0.08 * sin(direction.x * 5.0)) / 0.23, 2.0));
    float broadCloud = cloudNoise(bandPosition * 1.25);
    float dust = cloudNoise(bandPosition * 5.4 + vec2(4.0, -7.0));
    float core = exp(-length(vec2(direction.x * 1.4, direction.y + 0.02)) * 5.8);
    vec3 cloudColor = mix(uVioletColor, uCyanColor, smoothstep(0.28, 0.82, broadCloud));
    float density = bandShape * smoothstep(0.22, 0.88, broadCloud) * (0.35 + dust * 0.65);
    return cloudColor * density * 0.34 + vec3(0.8, 0.28, 1.0) * core * bandShape * 0.06;
  }
`;

const DEEP_SPACE_FRAGMENT_SHADER = DEEP_SPACE_GLSL + /* glsl */ `
  void main() {
    vec2 fragmentCoordinate = gl_FragCoord.xy;
    vec2 screenPosition = fragmentCoordinate - iResolution.xy * 0.5;
    float focalLength = (0.5 * iResolution.y) / tan(radians(uFov) * 0.5);
    vec3 sightVector = normalize(uCamBasis * vec3(screenPosition, -focalLength));
    float stage = uSceneStage;

    vec3 colorValue = paintDeepBackdrop(sightVector);
    if (stage >= 1.0) {
      float processBoost = stage < 3.0 ? 1.65 : 1.0;
      colorValue += renderDeepStars(sightVector, stage >= 2.0 ? 1.0 : 0.0) * processBoost;
    }
    if (stage >= 3.0) {
      colorValue += renderNebula(sightVector);
    }

    gl_FragColor = vec4(colorValue, 1.0);
  }
`;

const DEEP_SPACE_COMPOSITE_SHADER = /* glsl */ `
  uniform sampler2D uSpaceTex;
  uniform vec2 iResolution;
  uniform float iTime;
  ${GRADE_GLSL}

  void main() {
    vec3 spaceColor = texture2D(uSpaceTex, gl_FragCoord.xy / iResolution).rgb;
    gl_FragColor = vec4(grade(spaceColor, gl_FragCoord.xy, iTime), 1.0);
  }
`;

export function createDeepSpaceScene({ skyTexture, compact = false, options = {} } = {}) {
  const settings = { ...DEEP_SPACE_SETTINGS, ...options };
  const uniforms = {
    iResolution: { value: new THREE.Vector2(2, 2) },
    iTime: { value: 0 },
    uSceneStage: { value: 4 },
    uCamBasis: { value: new THREE.Matrix3() },
    uFov: { value: 60 },
    uStarColor: { value: new THREE.Color(settings.starColor) },
    uVioletColor: { value: new THREE.Color(settings.violetColor) },
    uCyanColor: { value: new THREE.Color(settings.cyanColor) },
  };
  const gradeUniforms = {
    uDithering: { value: compact ? settings.dithering * 0.7 : settings.dithering },
    uFilmGrain: { value: settings.filmGrain },
    uExposure: { value: settings.exposure },
  };

  const backdropMaterial = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERTEX_SHADER,
    fragmentShader: DEEP_SPACE_FRAGMENT_SHADER,
    uniforms: { ...uniforms },
    depthTest: false,
    depthWrite: false,
  });
  const rawMaterial = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERTEX_SHADER,
    fragmentShader: /* glsl */ `
      uniform sampler2D uSpaceTex;
      uniform vec2 iResolution;
      void main() {
        vec3 color = texture2D(uSpaceTex, gl_FragCoord.xy / iResolution).rgb;
        gl_FragColor = vec4(pow(max(color, vec3(0.0)), vec3(0.4545)), 1.0);
      }
    `,
    uniforms: {
      uSpaceTex: { value: skyTexture },
      iResolution: uniforms.iResolution,
    },
    depthTest: false,
    depthWrite: false,
  });
  const compositeMaterial = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERTEX_SHADER,
    fragmentShader: DEEP_SPACE_COMPOSITE_SHADER,
    uniforms: {
      uSpaceTex: { value: skyTexture },
      iResolution: uniforms.iResolution,
      iTime: uniforms.iTime,
      ...gradeUniforms,
    },
    depthTest: false,
    depthWrite: false,
  });

  return {
    settings,
    uniforms,
    backdropMaterial,
    rawMaterial,
    compositeMaterial,
    setSize(width, height) {
      uniforms.iResolution.value.set(width, height);
    },
    update(elapsed, camera) {
      uniforms.iTime.value = elapsed;
      camera.updateMatrixWorld(true);
      uniforms.uCamBasis.value.setFromMatrix4(camera.matrixWorld);
      uniforms.uFov.value = camera.fov;
    },
    dispose() {
      backdropMaterial.dispose();
      rawMaterial.dispose();
      compositeMaterial.dispose();
    },
  };
}
