# Validation Record

## Automated checks

| Check | Result | Notes |
| --- | --- | --- |
| `npm run build` | Passed | Vite production bundle generated in `dist/client`; Sites worker artifacts generated. |
| `npm run test:sites` | Passed | 4/4 tests passed, including static assets, SPA fallback, API/write rejection, and packaging files. |
| Local route | Passed | `http://127.0.0.1:4174/` returned HTTP 200 and serves the Vite client entry. Port 4173 was already occupied by an older Python directory server. |
| Repository gallery build | Passed | The common builder produced 5 projects in `.pages`. |
| Published-path smoke test | Passed | Gallery, project route, and a scene asset each returned HTTP 200 under `/projects/glass-worlds-gallery/`. |
| Runtime dependencies | Passed | No external font, image CDN, model API, token, authentication, or backend is required. |

## Source and implementation review

- Eight semantic button-based worlds are present.
- Every world references three local raster images. Detail-panel scenes may advance on a 5.2-second timer, while each flying sphere keeps one image for its complete visible pass.
- A persistent Three.js canvas renders eight curvature-lit scene-textured inner spheres, environment-reflective physical glass shells, Fresnel rim shaders, and 1,790 GPU star particles split across two depth layers.
- Particles use a custom ShaderMaterial: circular `gl_PointCoord` masking and fixed screen-pixel size prevent near-camera squares and distance-based size growth.
- Particle positions are sampled uniformly across the camera frustum at every depth, preventing the far field from collapsing into a dense optical-axis cluster.
- Every world owns a stable angular sector, staggered normalized lifetime, bounded screen-space size curve, safe 3D depth, and forward speed. Scheduling and sector assignment replace late near-field collision impulses.
- Each sphere uses a curvature-lit image core, a transmissive outer shell, a BackSide inner optical shell, environment reflections, Fresnel edges, and two animated specular responses.
- No near-camera opacity fade is used. Each sphere reaches a bounded close-pass diameter, follows a monotonic outward path, fully clears its nearest frame edge, then recycles at a safe far depth; the camera never intersects the sphere.
- Pointer movement shifts the camera, wheel input temporarily accelerates travel, and raycasting restores hover/click selection.
- Opening a world pauses automatic frame changes and exposes three manual scene selectors.
- Previous/next navigation, close action, random-world action, Explore/Directing modes, and mock composer flow are implemented.
- Focus-visible styling, Escape handling, `prefers-reduced-motion`, and a no-`backdrop-filter` fallback are present.
- The canvas resizes through `ResizeObserver`, caps device pixel ratio at 1.75, and preserves DOM controls on mobile.
- Production build currently reports one expected large-chunk warning: Three.js raises the entry bundle to about 776 kB raw / 209 kB gzip. Lazy loading is a future hardening task.

## Browser evidence status

- Reference and local baselines were sampled once per second for eight seconds at 1280×720. The prior local version reproduced the delayed frame-filling sphere flash; the reference used stable outward paths, bounded enlargement, full edge exits, and early replacement.
- The reconstructed motion was sampled for eight seconds and then for a complete 24-second lifecycle. No camera intersection, full-screen flash, path reversal, or late collision impulse was observed.
- Final desktop evidence at 1280×720 shows eight depth-staggered glass worlds, sparse fixed-size particles, readable image cores, layered optical rims, deliberate perimeter crops, and no page overflow.
- Final portrait evidence at 390×844 shows no page overflow; an aspect-aware maximum diameter keeps lower near-field lanes separated while retaining edge crops and the persistent CTA.
- Browser interaction evidence passed for semantic world selection, detail display, composer open, Escape close, focus return to `Open composer`, and visible keyboard focus.
- A fresh runtime tab reported no application errors. The Windows WebGL driver emits non-fatal double-precision representation warnings while compiling Three.js physical materials; no visible rendering failure followed.

Reduced-motion runtime emulation remains deferred: the available browser exposes viewport and visibility controls but no media-preference override. Source inspection confirms both the React `matchMedia` path and the CSS `prefers-reduced-motion` fallback; retest when media emulation is available.

## Revision 7 browser evidence

- Captured the source and local page at the same live 809x898 side-panel viewport. The comparison identified excessive tiny-world dwell, an inactive side-panel radius cap, and right-heavy depth staging.
- Replayed the revised local motion in four frames over eight seconds. Worlds enlarge monotonically, preserve their angular lane, leave through the perimeter, and replenish from the far field without overlap or a delayed full-screen flash.
- The revised field keeps roughly four to six readable near/mid worlds in the live side-panel sequence; fixed-size circular stars remain sparse and do not form a central knot.
- An independent 1280x720 browser tab reports `scrollWidth=1280` and `scrollHeight=720`, no console warnings/errors, balanced four-quadrant occupancy, visible chrome, and controlled edge crops.
- Production build and all 4 Sites worker tests pass after the shader, scheduler, and particle-density changes.
- Cinematic world-texture generation was attempted through the built-in image service but failed at the network boundary. The application continues to use local abstract WebP covers and does not add a token, API key, external CDN, or runtime model dependency.

## Revision 8 evidence

- The 809x898 live baseline confirmed that particle count and distribution were sufficient; color and far-depth opacity were the readability defect.
- Particle geometry remains at 1,850 circular fixed-size points with uniform frustum sampling. Color changed from `#b9d5ff` to `#e7f1ff`; far-depth visibility changed from 0.34 to 0.58.
- A post-change browser capture shows a brighter sparse field without a central particle knot, enlarged point blocks, or runtime warnings/errors.
- Built-in cinematic texture generation was retried twice in this revision: once with the full spherical-texture specification and once with a short diagnostic prompt. Both failed at the same `chatgpt.com` image-generation network boundary. Earlier local PNGs were inspected and confirmed to be the existing six abstract cover sources, not new cinematic output.
- The API-key CLI fallback was not used: it requires explicit user opt-in and the current environment reports no configured `OPENAI_API_KEY`.

## Revision 9 evidence

- Eight dedicated square cinematic scenes were generated through the user's signed-in ChatGPT image page, downloaded once, compressed to local WebP files, and wired into all eight world definitions. Runtime playback still requires no API key, token, external CDN, or model call.
- The 809x898 pre-change baseline showed that broad physical-shell reflection could cover central subjects and that the single power size curve left a short medium-depth interval.
- Outer-shell opacity changed from 0.17 to 0.135, transmission from 0.90 to 0.94, thickness from 0.64 to 0.72, and environment intensity from 1.28 to 1.08. Image shading now adds restrained directional volume and a 16% nonlinear shadow lift while retaining Fresnel edges and localized moving highlights.
- The monotonic two-part size curve reaches readable medium scale earlier but converges to the same maximum radius. Recycling now jitters around each world's immutable base sector instead of accumulating angular drift over repeated lifecycles.
- Multiple 809x898 timed captures show three or more readable medium/large worlds, stable outward paths, deliberate edge exits and no overlap. Runtime logs contain no warnings or errors.
- The first 390x844 adjacent check found a lower-lane overlap. Reducing only the extreme-narrow viewport radius floor from 0.68 to 0.56 removed it in two later timed captures without changing side-panel or desktop scale.
- The 390x844 selected Virtual Try-On state remains fully readable and dismissible; the persistent scene, navigation, thumbnails and CTA remain available.
- Final production build passed, all 4 Sites worker tests passed, and the repository research-gallery builder completed with 5 projects.

## Revision 10 evidence

- The scope remained desktop-only: no mobile behavior or additional effects were changed.
- Eight generated scene URLs now have independent focal offset, exposure, saturation and refraction-strength profiles. The active and incoming values are interpolated with the existing image crossfade instead of changing abruptly.
- The 24 scene slots resolve through one URL-keyed cache. The live canvas reports `data-scene-texture-count="8"`, confirming eight unique Three.js texture objects rather than 24 duplicate loads.
- The image sphere, outer shell, inner shell and shade now reuse four shared geometries. The live canvas reports `data-shared-sphere-geometry-count="4"`.
- The 809x898 desktop default stage and selected Virtual Try-On detail state remain visible and operable after the resource change.
- The first browser reload exposed an out-of-range image-frame boundary and correctly produced a blank-canvas failure. Frame indexing was normalized with a safe current/next fallback; a fresh reload restored rendering.
- Three 20-second browser observations after the fix covered repeated flight recycling and image crossfades. No further blank frame or visible flash appeared, and the shared-resource counts remained 8 textures / 4 geometries at the end of the 60-second run.
- The final production build passed, all 4 Sites worker tests passed, and the repository research-gallery builder completed with 5 projects. The only build notice remains the previously documented Three.js bundle-size warning.

## Revision 11 evidence

- The v16 scope remained desktop-only and changed only scene allocation, flight composition data and existing glass/image shader calibration. No new asset, post-processing dependency, particle behavior, foreground journey or mobile rule was added.
- Baseline browser evidence showed a duplicated desert scene, a vertical string of three far worlds, an underoccupied center and broad central reflection on a close-pass sphere.
- A deterministic backtracking allocator now coordinates each world's three preferred local scenes. The live canvas repeatedly reports `data-active-unique-scene-count="8"` while `data-scene-texture-count="8"` remains unchanged.
- Four directed composition templates replace equal-status ring lanes. A first browser pass exposed a left-side overlap and a later sustained pass exposed four simultaneous far worlds; spacing two template slots and distributing normalized lifetimes across 0.06–0.90 corrected both observed defects.
- Later timed frames show two restrained far supports, multiple readable middle worlds, a hero/near world and deliberate close edge passes without visible overlap or a bead string.
- Image-core refraction now falls almost to zero at the center and grows toward the optical edge. Broad physical-shell and inner-shell reflection were reduced; browser close passes retain readable subjects, curved edge displacement, Fresnel light and visible glass thickness.
- The selected Virtual Try-On state remains readable and dismissible over the persistent scene; another sustained observation also retained a readable Motion Capture detail state.
- The first allocator reload produced a runtime index error when an abnormal hot-reload epoch reached the assignment order. Normalizing epoch and seed indexes fixed the blank canvas; subsequent timed epochs retained 8 unique scenes with no new failure.
- A fresh final browser tab reports 8 textures, 8 unique settled scenes, 4 composition templates and 4 shared geometries with no console warnings or errors. The production build passed, all 4 Sites worker tests passed, and the repository research-gallery builder completed with 5 projects. The known Three.js bundle-size notice remains unchanged.

## Revision 12 evidence

- The v17 scope remained desktop-only. It changed flight-time pacing, pass-level scene ownership, pointer parallax and hover guidance; it added no image, post-processing pass, runtime API, token or mobile rule.
- Eight worlds now start at equal travel-time offsets and map through a fast far segment, longer readable middle segment and prompt near-edge segment. Five timed samples held the far/mid/near population at `1–2 / 5–6 / 1–2`, eliminating the sampled four-world far cluster.
- A complete 18.5-second browser observation recorded 9 recycling events. `data-active-unique-scene-count` stayed at `8`, and the eight-item `data-scene-signature` was identical before and after the run. With all eight local images occupied, recycling keeps a sphere's current image rather than introducing a duplicate or changing a readable pass.
- The first hover pass exposed excessive pointer-camera parallax: approaching a sphere could move it away from the pointer. Reducing pointer-driven camera displacement retained a subtle spatial drift and made hover targeting stable.
- The final hover pass projected World Models into a pointer-transparent DOM card with its world number, category, title and Explore cue. The hovered sphere's motion multiplier reached `0.210`; the other seven remained `1.000–1.000`.
- Clicking the hovered sphere opened the matching World Models detail panel. Selection removed the hover card, the close control remained unique and operable, and empty pointer movement left no stale label.
- Browser runtime logs contained only Vite connection/update messages and the React development notice; no warning or error was reported during the final interaction pass.

## Revision 13 evidence

- The v18 scope remained desktop-only and added no new image, post-processing pass, API, token or runtime service. It changed only the existing sphere optics, two directed path roles, particle-layer configuration and hover-card edge placement.
- Image-center darkening, inner-shell reflection and rear shade were reduced while edge refraction, asymmetrical highlights, Fresnel light and visible shell thickness were retained. Dark scene exposure was lifted selectively rather than applying a global bloom.
- One strong central hero lane and one weaker supporting lane hold readable worlds near the central field through middle depth, then accelerate continuously toward a perimeter exit. Three timed frames show the hero entering, crossing and fully leaving the central field.
- An 18-second lifecycle recorded 9 safe recycling events. Six samples held 1–3 centrally readable worlds and far/mid/near populations within `1–2 / 5–6 / 1–2`; all 8 scene identities remained unique and the eight-item scene signature was unchanged.
- Stars are now two fixed-pixel-size shader layers: 1,450 dim slow background points and 340 brighter faster foreground points. Both retain uniform frustum sampling, circular masks and no optical-axis concentration.
- Hovering a top-edge sphere places its guidance card below the sphere, clear of navigation. An immediate hover-click opened the matching detail panel and cleared the card.
- Final browser logs contain no warnings or errors. Production build, all 4 Sites worker tests and the five-project repository gallery build pass; the only build notice remains the known Three.js bundle-size warning.

## Revision 14 evidence

- Browser baseline sampling confirmed the reported defect: the primary lane moved only from x=0.16 to x=0.21 while progress advanced from 0.50 to 0.76, then jumped to x=0.76 by progress 0.89. The role-specific center-hold curve and middle-peaking size multiplier were therefore observable causes, not subjective motion preferences.
- Every role now uses the same monotonic `progress^1.26` radial path. Priority worlds still start near the vanishing region and retain their predetermined lane angle, but no longer hold centrally or receive temporary middle-depth enlargement.
- Twenty one-second samples covered 9 safe recycling events. Both priority lanes had zero sampled radial-distance regressions and zero sampled screen-radius regressions within uninterrupted passes.
- The first priority lane ranged from 0.11 to 1.30 in normalized radial distance and 0.076 to 0.410 in screen radius; the second ranged from 0.10 to 1.66 and 0.046 to 0.458. Dominant scale therefore occurs near the selected perimeter exit rather than in the central field.
- The sustained run retained `1–2 / 5–6 / 1–2` far/mid/near depth roles, 8 unique active scenes and the unchanged eight-item scene signature. No runtime warning or error was reported.
- Hover and click regression passed on the moving Live Avatars world: the anchored card appeared, click opened the matching detail panel, and selection cleared the hover card while the canvas remained visible.
- Final production build passed, all 4 Sites worker tests passed, and the repository gallery rebuilt all 5 projects. The only build notice remains the known Three.js chunk-size warning.

## Revision 15 evidence

- The v20 scope changed only composition angles, near-role pacing, radial phase mapping and runtime diagnostics. Fixed-direction travel, sphere-size rules, glass materials, images, particles, foreground UI and desktop-only support remained unchanged.
- An 18-sample v19 baseline produced six observations with two simultaneous near-role worlds. The near interval occupied roughly 17% of the flight cycle, wider than the 12.5% spacing between eight equally staggered worlds.
- Raising only the near-role pace reduced its normalized interval below one eighth. Twenty-six post-change samples kept near-role occupancy at 0–1 and the complete depth distribution within `1–2 / 5–6 / 0–1`.
- Time-adjacent composition slots now remain in alternating assigned quadrants across every template. Runtime reports an exact `2/2/2/2` UR/UL/DR/DL allocation.
- Ten observed exits followed `DR/UL/DL/UR/DR/UL/DL/UR/DR/UL`: every quadrant appeared, and no adjacent dominant exit reused the same quadrant.
- Radial displacement now derives from normalized flight phase rather than piecewise role-mapped progress. Both sampled priority lanes retained monotonic radial distance and screen-radius growth with no role-boundary turn or regression.
- All 8 active scenes remained unique and the scene signature stayed unchanged. Runtime logs contained no warning or error.
- Hover and click regression passed on the moving Virtual Try-On world: its anchored card appeared, click opened the matching detail, and selection cleared the hover card while preserving the canvas.
- Final production build passed, all 4 Sites worker tests passed, and the repository gallery rebuilt all 5 projects. The only build notice remains the known Three.js chunk-size warning.

## Revision 16 evidence

- The particle-only revision preserved sphere trajectories, v20 quadrant scheduling, scene allocation, glass materials, local imagery and foreground controls.
- The two pooled GPU point systems retain their original 1,450/340 counts and uniform frustum reset. No per-frame particle object, geometry or material allocation was added.
- Both layers now use one shared 1.18 CSS-pixel point size. Circular shader masking remains in place; depth is expressed only through speed, brightness, opacity and perspective parallax.
- The vertex shader now applies a layer-calibrated far-in envelope and a shared near-out envelope using camera-space distance. Points therefore become visible gradually after far-field recycling and disappear before passing the camera.
- Background particles remain slower and softer; foreground particles remain faster and brighter. Visual browser frames show clearer sparse dust without square sprites, streaks or an optical-axis knot.
- Eighteen one-second lifecycle samples covered 9 sphere recycling events. Particle size stayed `1.18/1.18`, fade mode stayed `far-in-near-out`, active scenes stayed unique at 8 and the scene signature remained unchanged.
- Wheel input raised the shared particle/sphere motion multiplier from 1.000 to 1.240 and it settled back to 1.000, confirming synchronized travel response.
- Adjacent sphere scheduling remained at `2/2/2/2` quadrant allocation with 0–1 near worlds. Hover and click still opened the matching Live Avatars detail and cleared its hover card.
- Browser runtime logs contained no warning or error.
- Final production build passed, all 4 Sites worker tests passed, and the repository gallery rebuilt all 5 projects. The only build notice remains the known Three.js chunk-size warning.

## Revision 17 evidence

- The v22 implementation preserved the validated v20 scheduler and v21 particle size/lifecycle. It changed particle displacement/luminance, sphere optical shaders and one explicitly bounded pilot trajectory.
- Particle points still use shared `1.18/1.18` CSS-pixel sizes, pooled 1,450/340 geometries, circular masks, uniform frustum reset and far-in/near-out fades. No per-frame particle object or material allocation was added.
- Particle world-Z velocity now multiplies each stored base speed by a continuous bounded `0.55–1.55` camera-proximity function. The shader adds a restrained proximity luminance response; runtime mode reports `continuous-depth-wheel-synced`.
- Wheel input raised the common sphere/particle motion scale from 1.000 to 1.226 and it returned to 1.000. Timed frames retain sparse white-blue dust without point-size growth, streaks, squares or an optical-axis knot.
- Image-core sampling adds subtle view-direction parallax and edge-only red/blue channel separation. The center keeps its original sample, so subject clarity is not traded for broad chromatic distortion.
- Every sphere receives an independent highlight seed that varies the moving and secondary light directions. Refraction, rim and front/back shell opacity now increase gradually from far to near; runtime depth-optics samples stayed within `0.720–1.080`.
- Live Avatars is the sole world-space corridor pilot; the other seven paths remain the validated screen-directed controls. Its physical radius is fixed and its apparent radius comes from camera-space perspective.
- Across 26 samples, pilot distance decreased from 53.72 to 9.11 and screen radius increased from 0.051 to 0.299 with no sampled distance, size or radial reversal. At flight 0.995 it reached distance 7.63, x=1.217 and horizontal radius 0.201, placing its nearest edge beyond the right frame before recycling to distance 52.83.
- The pilot remained well outside its physical radius, retained the assigned DR direction, produced no camera-entry flash and was still raycast-hoverable. Clicking its Live Avatars card opened the matching detail and cleared hover feedback.
- Adjacent runtime state remained stable: 0–1 near worlds, `2/2/2/2` quadrant allocation, 8 unique active scenes and unchanged scene signature. Runtime logs contained no warning or error.
- The evidence supports the bounded single-corridor experiment. It does not yet justify replacing all seven control paths without a separate multi-corridor spacing and scheduling revision.
- Final production build passed, all 4 Sites worker tests passed, and the repository gallery rebuilt all 5 projects. The only build notice remains the known Three.js chunk-size warning.

## Revision 18 evidence

- The v23 comparison keeps the v22 particle and glass systems unchanged and expands physical perspective from one world to exactly four: Realtime Visuals/DL, World Models/UR, Live Avatars/DR and Motion Capture/UL. The other four worlds remain screen-directed controls.
- The first multi-corridor pass exposed real same-quadrant overlaps: the runtime minimum projected gap reached `-0.063` for Realtime Visuals/Evidence Systems and `-0.047` for Live Avatars/Virtual Try-On. This evidence led to wider paired angles and a new uniform eight-slot schedule in which same-quadrant partners are separated by one-quarter or three-eighths of a lifecycle.
- Two consecutive 14-second post-fix samples collected 112 observations across 14 total recycle events. Each physical corridor recycled 2–3 times with zero sampled distance reversal, radius regression or quadrant change.
- Corridor minimum camera distances ranged from `7.477` to `7.675`; maximum projected radii ranged from `0.337` to `0.371`. Maximum edge-clearance values ranged from `1.411` to `1.509`, so every world fully left its assigned side before recycling.
- The post-fix minimum readable projected gap remained positive at `0.071`. Near occupancy stayed at 0–1, depth roles stayed within `1–2 / 5–6 / 0–1`, quadrant allocation stayed `2/2/2/2`, and all 8 active scenes remained unique.
- Hovering the physical-corridor Live Avatars world produced the anchored label and a protected motion multiplier of `0.457`; clicking opened the matching detail and cleared hover. This avoids the previous 0.2 near-stop behavior that could disrupt multi-world spacing.
- Wheel input raised the common sphere/particle motion scale from `1.000` to `1.084`, then returned to `1.000`. Particle mode stayed `continuous-depth-wheel-synced` with 1,450/340 points at shared `1.18/1.18` sizes.
- Browser logs contained only Vite connection and React development notices, with no warning or error. The 1280x720 document remained exactly 1280x720 with no overflow.
- Final production build passed and all 4 Sites worker tests passed. The generated JavaScript is 790.90 kB raw / 214.11 kB gzip; the only build notice remains the known Three.js chunk-size warning.

## Archive closure evidence

- Archive closure is documentation-led and preserves the validated v23 particle, glass, trajectory and interaction runtime. The only runtime change is a desktop `Original reference` link to `https://www.happyoyster.com/home`.
- `ARCHIVE.md` records the current capability map, measured runtime evidence, two comparison conclusions, scenario routing, complete optional optimization backlog, non-goals and restart conditions.
- `DEMO_COMPARISON.md` links the original page, published demo, local route and archive, and defines one consistent 1280×720 observation procedure.
- Root `README.md` and `research-projects.json` now mark project 05 as `阶段归档`; the root project section and publishing matrix link both archive documents.
- Final project build passed with CSS `19.83 kB` raw / `5.18 kB` gzip and JavaScript `793.41 kB` raw / `214.70 kB` gzip; the expected Three.js chunk-size notice is the only build warning. All 4 Sites worker tests and the root research-gallery build passed.
- The final 1280×720 browser smoke check confirmed a visible `Original reference` link to `https://www.happyoyster.com/home` with `_blank`/`noreferrer`, 8 active scenes, 4 physical corridors plus 4 control paths, 1,450 background plus 340 foreground particles at fixed `1.18/1.18` point sizes, changing trajectory state over time, no document overflow, and no console warnings or errors.

## Revision 20 deployment repair evidence

- Production baseline at `https://yydshly.github.io/0801_githubcode_study/projects/glass-worlds-gallery/` loaded an empty React root with no canvas. Its HTML referenced `/assets/index-BJFsXVMt.js` and `/assets/index-rWEwENZP.css`; both returned 404, while the same files returned 200 below the repository project path.
- Root cause was npm argument placement: `npm run build -- --base=...` expanded the former combined script so `--base` reached `prepare-sites-build.mjs` instead of Vite. Splitting Sites preparation into `postbuild` makes Vite receive the gallery-provided base directly.
- The Pages workflow now watches all five enabled research project directories. The gallery builder now rejects Vite output whose root-relative script or stylesheet references escape the assigned project base.
- A production-base build generated `/0801_githubcode_study/projects/glass-worlds-gallery/assets/...` references, all 4 Sites tests passed, and the complete five-project gallery build passed with the new base-path guard.
- Local production preview at the exact repository base rendered one 1280×720 canvas with 8 scenes, 4 physical corridors, 4 control paths and 1,450/340 particles, with no overflow or browser warnings/errors. Production deployment verification remains pending for the exact repair commit.
