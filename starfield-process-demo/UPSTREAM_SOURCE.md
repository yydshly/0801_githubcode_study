# Upstream Source Record

This case uses the upstream `threejs-procedural-vfx` raymarched aurora example from:

<https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills>

Copied source files:

- `skills/threejs-procedural-vfx/examples/raymarched-aurora-curtains/aurora-curtains.js`
- `dev/example-gallery/examples/threejs-procedural-vfx/raymarched-aurora-curtains/polar-night-sky.js`

The copied `polar-night-sky.js` has a small product-demo adaptation: a `uProcessStage` uniform and branches that expose the existing backdrop, starfield, twinkle, and aurora contributions one stage at a time. The underlying star hash, aurora volume field, raymarch schedule, and compositing code remain from the upstream implementation.

The product shell, process controls, metrics surface, responsive layout, and documentation are authored in this case.

The new `src/deep-space.js` scene is product-authored. It reuses the upstream shader utility exports for the fullscreen quad and final grade, then adds a separate procedural deep-space path with three directional star layers, time-based twinkle, and a low-frequency nebula band. It is not presented as an upstream example file.

The new `src/solar-system.js` scene is also product-authored. It uses normal Three.js scene primitives and controls—spheres, materials, lights, orbit lines, instancing, and camera orbit—to create a solar-system composition on top of the procedural deep-space background. The upstream skill is the atmospheric foundation here, not a prebuilt astronomy simulator.

The new `src/storm-city.js` scene is product-authored. It uses the upstream skill directions for precipitation surfaces and procedural architecture, then composes a storm backdrop, instanced building massing, wet physical materials, animated rain segments, ripples, and lightning. It is not a copied upstream scene.

The new `src/mars-exploration.js` scene is product-authored. It uses the upstream skill directions for procedural planets and atmosphere/aerial perspective, then composes a height-field terrain, crater marks, a hierarchical rover, dust particles, a rover path, and an orbit line. It is not a copied upstream scene.

Before commercial use, recheck the upstream license, source materials, and third-party notices. Do not treat this prototype as a substitute for that review.

Redistribution evidence bundled with this subproject:

- `LICENSES/UPSTREAM-MIT.txt`
- `LICENSES/GPL-3.0.txt`
- `LICENSES/THIRD_PARTY_NOTICES.md`
- `LICENSES/trace-manifest.json`

These files preserve the pinned upstream package notices next to the project-local Skill installation. They do not replace a file-by-file commercial legal review.
