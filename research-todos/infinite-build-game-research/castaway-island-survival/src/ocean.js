import * as THREE from 'three';

export function createOcean(isMobile = false) {
  const geometry = new THREE.PlaneGeometry(850, 850, isMobile ? 90 : 150, isMobile ? 90 : 150);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.ShaderMaterial({
    transparent: false,
    depthWrite: true,
    uniforms: {
      time: { value: 0 },
      waveStrength: { value: 1 },
      sunDirection: { value: new THREE.Vector3(-0.45, 0.72, 0.35).normalize() },
      deepColor: { value: new THREE.Color('#063e55') },
      shallowColor: { value: new THREE.Color('#2b9b9c') },
      skyColor: { value: new THREE.Color('#8bc5d0') },
      foamColor: { value: new THREE.Color('#e5f1df') },
      fogColor: { value: new THREE.Color('#a5c8c7') },
    },
    vertexShader: `
      uniform float time;
      uniform float waveStrength;
      varying vec3 vWorld;
      varying float vHeight;
      varying vec3 vNormalW;

      float wave(vec2 p, vec2 dir, float freq, float speed, float amp) {
        return sin(dot(p, normalize(dir)) * freq + time * speed) * amp;
      }

      void main() {
        vec3 p = position;
        float h = 0.0;
        h += wave(p.xz, vec2(1.0, .28), .075, .78, .38);
        h += wave(p.xz, vec2(-.25, 1.0), .13, 1.05, .19);
        h += wave(p.xz, vec2(.6, .8), .24, 1.42, .075);
        float islandMetricLocal = pow(p.x / 78.0, 2.0) + pow(p.z / 60.0, 2.0);
        float coastWaveMask = smoothstep(.82, 1.04, islandMetricLocal);
        p.y += h * waveStrength * coastWaveMask;

        float eps = .28;
        float hx = wave(p.xz + vec2(eps, 0.0), vec2(1.0, .28), .075, .78, .38)
          + wave(p.xz + vec2(eps, 0.0), vec2(-.25, 1.0), .13, 1.05, .19);
        float hz = wave(p.xz + vec2(0.0, eps), vec2(1.0, .28), .075, .78, .38)
          + wave(p.xz + vec2(0.0, eps), vec2(-.25, 1.0), .13, 1.05, .19);
        vec3 localNormal = normalize(vec3(h - hx, eps, h - hz));
        vNormalW = normalize(mat3(modelMatrix) * localNormal);
        vec4 world = modelMatrix * vec4(p, 1.0);
        vWorld = world.xyz;
        vHeight = h;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 sunDirection;
      uniform vec3 deepColor;
      uniform vec3 shallowColor;
      uniform vec3 skyColor;
      uniform vec3 foamColor;
      uniform vec3 fogColor;
      varying vec3 vWorld;
      varying float vHeight;
      varying vec3 vNormalW;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec3 n = normalize(vNormalW);
        vec3 viewDir = normalize(cameraPosition - vWorld);
        float fresnel = .035 + .965 * pow(1.0 - max(dot(n, viewDir), 0.0), 5.0);
        float islandMetric = pow(vWorld.x / 78.0, 2.0) + pow(vWorld.z / 60.0, 2.0);
        float shore = 1.0 - smoothstep(.0, .075, abs(islandMetric - 1.0));
        float sun = pow(max(dot(reflect(-sunDirection, n), viewDir), 0.0), 90.0);
        float glint = pow(max(dot(n, sunDirection), 0.0), 5.0) * .2;
        float micro = hash(floor(vWorld.xz * 2.0 + time)) * .03;
        vec3 body = mix(deepColor, shallowColor, clamp(.26 + vHeight * .55 + shore * .55, 0.0, 1.0));
        vec3 color = mix(body, skyColor, fresnel * .62);
        color += vec3(1.0, .82, .58) * sun * 1.6 + glint + micro;
        float movingFoam = smoothstep(.28, .55, vHeight + sin(vWorld.x * .34 + time * 1.7) * .08);
        color = mix(color, foamColor, clamp(shore * (.5 + movingFoam * .5), 0.0, .8));
        float dist = length(cameraPosition - vWorld);
        float fog = 1.0 - exp(-.000045 * dist * dist);
        gl_FragColor = vec4(mix(color, fogColor, clamp(fog, 0.0, .86)), 1.0);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -0.38;
  mesh.receiveShadow = true;
  mesh.name = 'Dynamic trade-wind ocean';

  return {
    mesh,
    update(time, weatherMix, nightMix = 0) {
      material.uniforms.time.value = time;
      material.uniforms.waveStrength.value = THREE.MathUtils.lerp(0.9, 1.55, weatherMix);
      material.uniforms.skyColor.value.lerpColors(
        new THREE.Color('#8bc5d0').lerp(new THREE.Color('#122b43'), nightMix),
        new THREE.Color('#526d76').lerp(new THREE.Color('#172535'), nightMix),
        weatherMix,
      );
      material.uniforms.fogColor.value.lerpColors(
        new THREE.Color('#a5c8c7').lerp(new THREE.Color('#173143'), nightMix),
        new THREE.Color('#77878a').lerp(new THREE.Color('#202c38'), nightMix),
        weatherMix,
      );
    },
  };
}

export function createSky() {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      weatherMix: { value: 0 },
      nightMix: { value: 0 },
      sunDirection: { value: new THREE.Vector3(-0.45, 0.72, 0.35).normalize() },
    },
    vertexShader: `varying vec3 vWorld; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `
      uniform float weatherMix;
      uniform float nightMix;
      uniform vec3 sunDirection;
      varying vec3 vWorld;
      void main(){
        vec3 d=normalize(vWorld-cameraPosition);
        float h=smoothstep(-.08,.65,d.y);
        vec3 clear=mix(vec3(.73,.86,.86),vec3(.13,.40,.67),h);
        vec3 storm=mix(vec3(.48,.55,.56),vec3(.16,.23,.29),h);
        float sun=pow(max(dot(d,sunDirection),0.0),900.0);
        vec3 night=mix(vec3(.055,.10,.16),vec3(.008,.025,.075),h);
        vec3 c=mix(clear,storm,weatherMix*.88)+vec3(1.0,.76,.48)*sun*(1.0-weatherMix)*(1.0-nightMix);
        c=mix(c,night,nightMix);
        gl_FragColor=vec4(c,1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(430, 32, 18), material);
  return { mesh, material };
}
