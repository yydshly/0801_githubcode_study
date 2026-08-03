# Refinement Ledger

This ledger records browser-observed refinement decisions for the active design contract.

## Active environment

```text
Start command: npm run dev -- --host 0.0.0.0 --port 4174 --strictPort
Canonical URL: http://127.0.0.1:4174/
Primary desktop viewport: 1536 × 864
Primary mobile viewport: 390 × 844
Theme: Dark only; the reference is a dark spatial stage
```

## Entries

### 2026-08-04 — Core WebGL optical and corridor baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Confirmed particle, glass and trajectory refinement
Coverage item: Continuous particle depth flow, layered glass optics and one bounded 3D corridor
User goal: Improve the three visual systems that create the sensation of flying through glass worlds, without shifting attention to UI work.
Browser environment: Local 1280x720 v21 desktop stage, dark theme
Observed evidence: V21 particles have correct shared size and lifecycle fades, but each particle keeps a constant world-Z speed inside its layer. Sphere image cores use one edge-refraction pattern and the rim shader shares the same light-direction formula, so highlights can feel templated and the interior remains close to a textured front hemisphere. All eight sphere paths are stable screen-directed mappings rather than physical world-space travel.
Problem category: Optical flow, material depth and spatial trajectory
Root cause: Constant per-particle displacement, limited view-dependent sampling/highlight variation, and screen-space position/size reconstruction for every sphere.
Minimal intervention: Multiply pooled-particle speed continuously by camera proximity; add edge-only channel separation, view parallax, depth optics and per-sphere highlight seeds; introduce one fixed-scale world-space line with safe far/near bounds while retaining seven control paths.
Adjacent regression surfaces: Fixed particle size/fades, central distribution, image clarity, v20 near-count/quadrants, full-edge recycling, hover raycasting, eight-scene uniqueness, no-flash behavior, cleanup and bundle size.
Observed result: Particles retain shared 1.18/1.18 sizes and now report continuous-depth-wheel-synced motion; each pooled point receives a bounded 0.55–1.55 proximity multiplier and restrained shader luminance lift while lifecycle fades and uniform distribution remain intact. Wheel input raised the common motion scale from 1.000 to 1.226 and it settled to 1.000. Glass image sampling now adds view parallax and edge-only channel separation; per-sphere highlight seeds vary two light directions, while depth optics ranged from 0.720 to 1.080 and central images remained readable in timed frames. The Live Avatars pilot used one physical-scale world-space line. Across 26 samples its view distance decreased from 53.72 to 9.11 while radius increased from 0.051 to 0.299 with no distance, radius or radial regression. A later 0.995 sample reached distance 7.63, x=1.217 and horizontal radius 0.201, fully clearing the right edge before recycling to distance 52.83. The pilot never approached its physical radius, retained its DR direction, and remained hoverable/selectable. The seven control paths, 0–1 near count, 2/2/2/2 quadrants, 8 unique scenes and clean runtime logs all remained stable.
Decision: pass
Next executable action: Keep the result as a one-corridor validated experiment; extending physical corridors to all seven controls is a separate future revision, not required by this scope.
New authority required: No; the user explicitly confirmed this scope.
```

### 2026-08-04 — Uniform particle-lifecycle baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Particle-specific optimization after v20
Coverage item: Fixed particle size, depth cadence, lifecycle fading and travel synchronization
User goal: Make the star dust feel like stable camera-flight particles while preserving constant point size and avoiding central concentration.
Browser environment: Local 1280x720 desktop stage, dark theme
Observed evidence: The current two GPU point layers use different fixed sizes (0.86 and 1.36 CSS pixels), so depth is partly communicated through size despite the user's fixed-size requirement. Recycling moves a point from z>9.5 directly to a far random depth; the shader attenuates distance but does not explicitly fade the new lifecycle boundary to zero.
Problem category: Particle material, lifecycle continuity and motion depth
Root cause: Per-layer point-size configuration and one broad distance-opacity curve; no near/far lifecycle envelope.
Minimal intervention: Keep the 1,450/340 pooled geometries and uniform frustum reset, give both materials one shared CSS-pixel size, preserve layer-specific speed/brightness, and add shader uniforms for smooth far-in/near-out fades.
Adjacent regression surfaces: Particle count, circular mask, central distribution, wheel boost, sphere visibility, v20 near-count/quadrant scheduling, runtime allocation and reduced motion.
Observed result: Both point systems now report a shared 1.18/1.18 CSS-pixel size while retaining 1,450 background and 340 foreground points. Background dust remains slower and dimmer; foreground dust remains faster and brighter, but neither uses size to express depth. Shader-based far-in and near-out envelopes remove the hard visible lifecycle boundary. Four visual frames across three sphere recycles showed a clearer sparse field without square points or a central knot. An additional 18-second observation covered 9 sphere recycling events with a stable fade mode, 8 unique scenes, unchanged signature, 2/2/2/2 quadrant allocation and at most one near world. Wheel input raised the shared particle/sphere motion multiplier from 1.000 to 1.240 and it returned to 1.000. Runtime logs contained no warning or error. Hovering and selecting Live Avatars still passed.
Decision: pass
Next executable action: None inside the particle-specific scope.
New authority required: No; the user explicitly requested particle optimization.
```

### 2026-08-04 — Quadrant and close-pass scheduling baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Confirmed v20 spatial-scheduling refinement
Coverage item: Quadrant-balanced exits, continuous apparent travel and one close-pass world
User goal: Preserve the corrected straight trajectories while making the field feel evenly directed and avoiding simultaneous oversized edge crops.
Browser environment: Local 1280x720 desktop stage, dark theme
Observed evidence: The v19 fixed-direction path is stable, but its slot order maps three of eight close passes into the upper-right quadrant and can place two worlds in the near role because the near segment occupies about 17% of the normalized lifecycle. Radial displacement is still calculated from role-mapped progress, whose pace changes at far/middle/near boundaries.
Problem category: Composition scheduling, depth density and motion cadence
Root cause: Composition templates do not reserve a quadrant sequence for time-adjacent slots; `NEAR_PACE=1.16` makes the near interval wider than the 1/8 world stagger; radial path position inherits the piecewise role pace.
Minimal intervention: Assign time-adjacent slots to alternating quadrants across all templates, raise only the near-role pace until its normalized interval is below 1/8, and calculate outward path distance from linear normalized flight phase while leaving the established size, material and particle rules unchanged.
Adjacent regression surfaces: Fixed-direction exit, monotonic size, middle-depth readability, full-edge recycling, active-scene uniqueness, hover raycasting, navigation/CTA visibility and runtime performance.
Observed result: The 18-sample v19 baseline contained six frames with two near worlds. After the v20 scheduling change, 26 samples across 10 recycling events kept the near count at 0–1 and depth roles at 1–2 / 5–6 / 0–1. Every template reported an exact 2/2/2/2 quadrant allocation. The recorded exit sequence was DR/UL/DL/UR/DR/UL/DL/UR/DR/UL: all quadrants appeared and no adjacent exit repeated. Both priority lanes retained monotonic radial distance and screen-radius growth, all 8 scenes remained unique with an unchanged signature, and runtime logs contained no warning or error. Hovering the moving Virtual Try-On world showed its card; click opened the matching detail and cleared the card.
Decision: pass
Next executable action: None inside the confirmed v20 scheduling scope.
New authority required: No; the user explicitly said to continue with the recommended v20 scope.
```

### 2026-08-04 — Fixed-direction side-exit repair baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Correct the v18 primary-world trajectory
Coverage item: Fixed-direction approach, coupled enlargement and side exit
User goal: The primary world must travel directly toward its side exit instead of becoming largest in the center and then visibly changing course.
Browser environment: Local 1280x720 desktop stage, dark theme
Observed evidence: The v18 hero path maps most of the first 76% of visible progress into only 12% of its radial travel, then maps the final 24% into the remaining 88%. A separate sine-based hero scale lift peaks in the middle. Together these rules intentionally hold and enlarge the world centrally before a late sideways acceleration, reproducing the reported unnatural turn.
Problem category: Motion and spatial continuity
Root cause: Role-specific `centralPathCurve` and `heroLift` decouple radial displacement from apparent-size growth.
Minimal intervention: Use the same monotonic fixed-direction radial curve for every role, remove the temporary hero scale multiplier, and retain the existing immutable lane angle, safe edge intersection and lifecycle schedule.
Adjacent regression surfaces: Full-edge exit, near-field overlap, central readability, depth-role counts, scene uniqueness, hover raycasting, particle motion and no-flash recycling.
Observed result: The baseline sampled the primary lane at progress 0.50/0.59/0.68/0.76/0.89 with horizontal positions 0.16/0.19/0.21/0.21/0.76, directly exposing the late turn. After removing the center-hold curve and hero size lift, twenty one-second samples across 9 recycling events found no decreasing radial-distance or screen-radius step within either priority pass. The sampled radial ranges were 0.11–1.30 and 0.10–1.66; radius ranges were 0.076–0.410 and 0.046–0.458. Depth roles remained within 1–2 / 5–6 / 1–2, all 8 scenes stayed unique with an unchanged signature, and runtime logs had no warning or error. Hovering the moving Live Avatars sphere still showed its anchored card; clicking opened the matching detail and cleared the card.
Decision: pass
Next executable action: None inside this trajectory repair.
New authority required: No; the user directly requested the trajectory correction.
```

### 2026-08-04 — Luminous-world and central-hero baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Confirmed desktop v18 refinement
Coverage item: Luminous sphere interiors, central hero composition and layered fixed-size particles
User goal: Close the remaining material and directing gap to Happy Oyster without adding new assets, post-processing, mobile work or runtime services.
Browser environment: Local http://127.0.0.1:4174/?render=v18-review and https://www.happyoyster.com/home at 1280x720, dark theme
Observed evidence: Three local timed frames retain stable unique worlds but often leave the central field empty, placing readable worlds around a radial perimeter. Several dark interiors show a strong tunnel-like center and broad inner reflection, while the reference keeps scene imagery clearer inside a thinner edge-weighted glass shell and normally carries a readable hero world through the middle field. The local 1,850-point field uses one brightness, point size and speed family, so it reads more like an even dotted backdrop than layered travel depth.
Problem category: Composition, material, depth and motion
Root cause: All directed lanes share the same radial path function and begin outside a 0.14 center radius; image shading multiplies center/hemisphere values before two physical shells and a rear shade layer; one particle system encodes all stars with one point-size and color profile.
Minimal intervention: Give one composition role a center-held path exponent and smaller entry radius, lighten only the existing image/shell/shade balance, and divide the existing particle budget between two fixed-size speed/brightness layers.
Adjacent regression surfaces: V17 temporal role counts, complete edge exit, non-overlap, pass-locked scenes, hover raycasting/slowdown, selected details, CTA/navigation readability, reduced motion, resource cleanup and bundle size.
Observed result: Three timed 1280x720 frames show a bright readable hero world crossing the central field before leaving through the right perimeter. An 18-second lifecycle recorded 9 safe recycling events; every sample kept 1–3 centrally readable worlds, far/mid/near populations within 1–2 / 5–6 / 1–2, all 8 settled scenes unique, and the scene signature unchanged. The two particle layers remain fixed at 1,450 background and 340 foreground points with no center knot. A top-edge sphere places its hover card below the sphere without covering navigation, and an immediate hover-click opened the matching detail. Final runtime logs contain no warnings or errors.
Decision: pass
Next executable action: None inside the confirmed v18 scope; treat additional art direction as a separate revision.
New authority required: No; direct implementation was confirmed.
```

### 2026-08-04 — Temporal roles and hover-guidance baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Confirmed desktop v17 refinement
Coverage item: Temporal depth-role pacing, pass-locked scene identity, and anchored hover guidance
User goal: Keep the strong v16 composition readable over time, make every sphere feel like one persistent world for a complete pass, and expose useful context before selection.
Browser environment: http://127.0.0.1:4174/?render=directed-scene-unique-v16 at 809x898, dark theme
Observed evidence: A live v16 frame contains three small worlds grouped along the center-right while larger worlds sit mainly at the perimeter. Source advances every sphere at nearly constant normalized speed and changes all sphere scenes on a 7.2-second global epoch. Canvas hover changes scale/rim strength but exposes no readable world identity before click.
Problem category: Temporal composition, continuity, interaction feedback
Root cause: Equal-rate normalized flight does not reserve enough dwell time for readable middle depth; scene identity is coupled to a global timer instead of the sphere lifecycle; hover state remains internal to Three.js and is not mapped to the foreground DOM layer.
Minimal intervention: Apply depth-dependent phase pacing, bind scene replacement to safe recycling, project the hovered sphere center to a pointer-transparent DOM label, and slow only the hovered state.
Adjacent regression surfaces: V16 scene uniqueness, recycling, template changes, raycasting, click selection, detail panel stacking, pointer leave, CTA, particles, reduced motion and cleanup.
Observed result: Eight uniformly staggered travel phases now map through fast-far, long-middle and prompt-near segments. Five timed samples held the far/mid/near population at 1–2 / 5–6 / 1–2. An 18.5-second run completed 9 recycling events with all 8 scene URLs unique and an unchanged scene signature, proving that no global timed image morph remains. Hovering World Models produced an anchored label, slowed that sphere to 0.210 while the other seven remained 1.000, and clicking opened the matching detail; selection and empty-pointer movement cleared the label. Pointer parallax was reduced after the first live pass showed that stronger camera displacement could move a sphere away from its own hover target.
Decision: pass
Next executable action: None inside the confirmed desktop v17 scope.
New authority required: No; direct implementation was confirmed.
```

### 2026-08-04 — Directed composition and scene-uniqueness baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Confirmed desktop v16 refinement
Coverage item: Active-scene uniqueness, cinematic near/mid/far composition, and edge-weighted glass clarity
User goal: Make the existing local scene feel less programmatic and closer to the reference without adding mobile work, post-processing effects or runtime asset dependencies.
Browser environment: http://127.0.0.1:4174/?render=desktop-scene-calibration-v15 at 809x898, dark theme
Observed evidence: The live baseline shows the same warm desert scene simultaneously in a hero and lower world, three small worlds forming a near-vertical bead string, an underoccupied center, and a broad reflective wash on the right close-pass sphere. Source maps each world independently to one of three images and advances frames with only a small index time offset; eight fixed angular lanes distribute motion evenly rather than assigning cinematic depth roles.
Problem category: Composition, focal hierarchy, material, content density
Root cause: Scene-frame selection is local to each world, while composition is encoded as eight equal-status angular seeds. Refraction and image vignette apply across too much of the image core instead of being strongly edge weighted.
Minimal intervention: Add deterministic active-scene allocation across the eight cached images, replace seeds with directed near/mid/far slots, and reshape only the existing image shader's refraction and edge treatment.
Adjacent regression surfaces: Crossfade continuity, texture cache count, sphere recycling, full-edge exits, non-overlap, raycasting, selected details, particles, runtime cleanup and desktop foreground controls.
Observed result: The live canvas reports 8 unique settled scenes from the same 8 cached textures and 4 directed composition templates. The first timed pass exposed one left-side overlap and the sustained pass exposed four far worlds clustering near the center; template spacing and uniformly staggered lifetime phases corrected both. Later frames retain two restrained far worlds, several readable middle worlds, a hero/close pass, clear image centers and visible edge glass. Virtual Try-On and Motion Capture detail panels remain readable over the persistent scene. The initial allocator reload exposed an abnormal-epoch index boundary; normalized epoch/index handling restored the scene and no later frame failed.
Decision: pass
Next executable action: None inside the confirmed desktop v16 scope.
New authority required: No; direct implementation was confirmed.
```

### 2026-08-04 — Desktop scene calibration and sharing baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Confirmed desktop-only calibration and performance refinement
Coverage item: Per-scene focal/exposure control plus shared GPU textures and geometries
User goal: Make all eight generated scenes consistently readable inside the spheres and remove avoidable duplicate GPU resources without changing the established motion or adding effects.
Browser environment: http://127.0.0.1:4174/?render=cinematic-glass-flight-v14 at 809x898, DPR 1.5, dark theme
Observed evidence: The default stage is stable, but bright snow/desert textures and dark forest/city/archive textures share one shader exposure and saturation. Source inspection shows 24 TextureLoader calls for 8 unique URLs and per-world inner-shell and shade SphereGeometry allocations.
Problem category: Material consistency and performance
Root cause: Scene calibration is attached to the world seed rather than the image URL; texture and geometry creation follows each world slot instead of unique runtime resources.
Minimal intervention: Add an eight-entry URL-keyed calibration table, interpolate its uniforms during crossfade, cache TextureLoader results by URL, and share all four sphere geometries.
Adjacent regression surfaces: Image crossfade, detail thumbnails, raycasting, glass shell rendering, long flight recycling, cleanup/disposal and desktop selected state.
Observed result: Eight URL-keyed profiles now control focal offset, exposure, saturation and refraction strength and interpolate during crossfades. The live canvas reports 8 cached textures for 24 scene slots and 4 shared sphere geometries. Default and Virtual Try-On detail states render correctly. Browser validation exposed one out-of-range frame boundary during the first reload; normalized frame indexing fixed it, and a subsequent 60-second desktop run completed through repeated crossfades and recycling without another blank frame.
Decision: pass
Next executable action: None inside the confirmed desktop-only scope.
New authority required: No
```

### 2026-08-04 — Generated-scene calibration baseline

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Continue after generating and integrating eight cinematic world textures
Coverage item: Generated-scene optics and middle-depth flight dwell
User goal: Make the new scenes feel convincingly enclosed in 3D glass while a balanced field of worlds continuously approaches without overlap or flashing.
Browser environment: http://127.0.0.1:4174/?render=bright-particles-v13 at 809x898, DPR 1.5, dark theme
Observed evidence: The dedicated imagery is visible and the eight-sector lifecycle remains stable. Broad white shell highlights sometimes cover central subjects, while timed frames alternate between edge-dominant close spheres and several small center spheres because the medium-size interval is still brief.
Problem category: Material, depth, motion
Root cause: Physical-shell opacity and broad environment reflection are stronger than necessary for the new photographic textures; the single power size curve does not allocate a deliberate middle-depth hold.
Minimal intervention: Reduce broad shell opacity/environment wash, strengthen localized rim/hemisphere cues, and replace the size power with a monotonic two-part curve that reaches medium size earlier without increasing maximum radius or changing exit scheduling.
Adjacent regression surfaces: Texture legibility, raycasting, hover/selection, perimeter recycling, near-field overlap, narrow viewport, fixed-size particles, detail panel.
Observed result: Reduced outer-shell opacity and environment wash, increased transmission/thickness, added directional side volume and a restrained photographic shadow lift, and introduced a monotonic two-part size curve. Multiple 809x898 timed captures show readable generated scenes, three or more medium/large worlds, stable outward lanes and no overlap. The first 390x844 capture exposed one lower-lane overlap; lowering only the extreme-narrow viewport radius floor from 0.68 to 0.56 removed it in two subsequent timed captures. Desktop and narrow selected-world panels remain readable, and the runtime reports no warnings or errors.
Decision: pass
Next executable action: None; the scoped revision is closed after browser, production, Sites, and repository-gallery validation.
New authority required: No
```

### 2026-08-03 — Baseline implementation

- Built eight scene-filled spheres using DOM/CSS 2.5D rather than WebGL, keeping implementation readable and inexpensive.
- Added three-image crossfades per world, varied depth, edge cropping, glass rim/reflection layers, and subtle pointer parallax.
- Added selected-world details, manual thumbnails, previous/next navigation, random selection, and a local composer flow.

### 2026-08-03 — Runtime hardening

- Removed Google Fonts so the page has no runtime CDN dependency.
- Made the ambient image URL aware of the Vite deployment base path.
- Added reduced-motion and missing-backdrop-filter fallbacks.
- Added the repository-wide ignores needed for this Vite project's dependencies, build output, and temporary QA captures.

### Deferred visual pass

The local route is running and was opened in the Codex preview, but automated screenshot capture is deferred because the browser-control runtime could not create its working assets. Retest at 1536×864 and 390×844 when that runtime is available; record any composition, crop, spacing, and focus fixes here.

### 2026-08-03 — Preview port correction

- Diagnosed an empty/wrong preview as a port collision: an older Python directory server was bound to `127.0.0.1:4173` while Vite was also listening on the wildcard address.
- Moved the project preview to `127.0.0.1:4174` without terminating the unrelated process.
- Confirmed the new route and `/src/main.jsx` both return HTTP 200 and the page contains the Vite client marker.

### 2026-08-03 — Galaxy-motion correction

- User clarified that the source experience is defined by continuous galaxy travel, not a static sphere arrangement.
- Replaced fixed-position-only presentation with requestAnimationFrame-driven elliptical orbits, unique speed/phase per world, dynamic scale, brightness, and stacking order.
- Increased whole-field pointer parallax, added wheel-driven camera travel, and animated a second raster galaxy layer.
- Preserved reduced-motion fallback and mobile spatial-strip behavior.

### 2026-08-03 — Perspective direction correction

- User clarified from the live reference that the planets travel toward the viewer rather than orbiting across a flat screen plane.
- Replaced elliptical motion with a vanishing-point projection: planets begin small, dim, soft, and central; then expand outward, sharpen, brighten, and move forward in stacking order.
- Added near-plane fade and far-field recycling to create an endless approach loop.
- Kept the verified 2.8s/1.45s planet breathing and hover behavior as a separate surface-animation layer.

### 2026-08-03 — WebGL camera-pass correction

- New runtime screenshot showed transparent glass shells containing world imagery, a true particle field, and planets naturally leaving through frame boundaries.
- Replaced the CSS/DOM planet renderer with one persistent Three.js canvas.
- Split each planet into a scene-textured inner sphere, physical transparent shell, Fresnel rim, and subtle internal shade.
- Added an initial 2,200 GPU particles and independent 3D flight lanes.
- Removed progress-based opacity disappearance; planets are recycled only after their projected bounds leave the frame or they pass behind the camera.
- Restored selection through raycasting and retained DOM details plus keyboard shortcuts.

### 2026-08-03 — Particle-axis and speed correction

- Runtime comparison showed that a uniform particle rectangle reads as background noise rather than a camera-aligned star corridor.
- Increased the field from 2,200 to 7,200 particles.
- Concentrated 86% of particles around the optical axis with a power-weighted radial distribution while retaining a sparse 14% halo.
- Increased particle and planet base travel to 1.85×, preserving wheel-driven temporary acceleration.

### 2026-08-03 — Fixed-size particle correction

- Side-by-side runtime screenshots showed that `PointsMaterial` size attenuation turned near-camera stars into large square blocks.
- Replaced `PointsMaterial` with a custom point ShaderMaterial using constant pixel size and circular `gl_PointCoord` masking.
- Rebalanced the field to 5,200 particles: 62% moderate optical-axis concentration and 38% broad halo.
- Reduced base motion from 1.85× to 1.28× so planets remain readable while still moving continuously.

### 2026-08-03 — Sparse field and glass-depth correction

- User review found the corrected circular particles still too numerous and visibly concentrated at the center.
- Reduced the field from 5,200 to 1,400 particles and removed the core/halo weighting entirely.
- Sampled particles uniformly in camera-frustum space at their assigned depth, preventing perspective from collapsing distant stars onto the optical axis.
- Kept particle size fixed at 1.3 CSS pixels and settled the base travel rate at 1.2×.
- Added curvature-aware lighting to the inner world images plus procedural environment reflections, stronger transmission, physical thickness, attenuation, and a brighter neutral Fresnel rim on the glass shells.

### 2026-08-03 — Ring-lane composition revision

```text
Current stage: Stage 2 — Primary visual calibration
User phase: Floating effect and glass depth
Coverage item: Distributed ring composition, near-field avoidance, close-range glass volume
User goal: A field of spheres should fill the viewport, approach and enlarge like high-speed space travel, remain irregular but evenly distributed around a ring, and avoid overlap near the camera.
Browser environment: http://127.0.0.1:4174/?render=sparse-glass-depth-v9 at the user-observed desktop viewport
Observed evidence: User screenshot shows adjacent upper spheres overlapping while several angular sectors remain empty; close spheres still read more like textured bubbles than volumetric glass worlds.
Problem category: Composition, depth, motion
Root cause: Independent Cartesian flight lanes do not reserve angular sectors or react to projected sphere size; the shell has one primary reflection layer and insufficient internal optical separation at close range.
Minimal intervention: Replace random Cartesian lanes with stable irregular angular sectors, add near-camera radial expansion and projected-radius separation, then strengthen layered shell highlights and inner optical depth.
Adjacent regression surfaces: Raycasting, selection scaling, perimeter recycling, reduced motion, mobile canvas, particle field, image crossfade.
Observed result: Implemented eight stable angular sectors, irregular ring radii, near-edge expansion, three projected-radius separation passes, a BackSide optical shell, and animated dual highlights. Production build and 4/4 Sites tests pass; the cache-busted preview is open at `?render=ring-lanes-glass-v10`. Automated capture was attempted, but the in-app browser-control runtime failed before connection with `failed to write kernel assets: path not found`.
Decision: defer
Next executable action: When browser control is available, capture a close-pass desktop frame, compare sector occupancy and overlap against the supplied screenshot, then record pass or the next measured adjustment.
New authority required: No
```

### 2026-08-03 — Side-panel depth and material calibration

```text
Current stage: Stage 9 — Visual calibration and delivery closure
User phase: Continue optimizing against the live Happy Oyster reference
Coverage item: 809x898 composition, middle-depth dwell, four-quadrant occupancy, glass depth, simultaneous texture repetition
User goal: Keep a field of irregular glass worlds flying toward the viewer at a readable speed without overlap, tiny-bead clustering, or weak spherical depth.
Browser environment: Happy Oyster and local prototype at the same 809x898 side-panel viewport; independent 1280x720 local validation tab
Observed evidence: The same-size reference kept several readable photographic worlds in view. The previous local frame could show one dominant edge crop, a vertical chain of tiny worlds, and repeated pale abstract textures.
Problem category: Composition, material, depth, density, motion
Root cause: The 1.72 size exponent delayed visual growth; the 2.05 path exponent delayed radial separation; the side-panel size cap did not engage at aspect 0.9; near/mid lifetimes were concentrated in right-side sectors; texture frame offsets were too similar.
Minimal intervention: Flatten the size and path curves, cap foreground radius against aspect 1.1, slightly increase travel speed and fixed-size star density, redistribute near/mid/far phases across all four quadrants, stagger texture frames, add per-world hue offsets, and replace equirectangular sampling with refracted front-hemisphere projection.
Adjacent regression surfaces: Full-edge recycling, no-flash lifecycle, particle shape, raycasting, nav/CTA visibility, desktop overflow, portrait cap, build, Sites worker.
Observed result: Same-size and eight-second sequences show four to six readable worlds, stable outward travel, complete edge exits, no overlap, no central particle knot, and visibly stronger glass rims and internal curvature. The 1280x720 frame is distributed across left, center, right, top and lower lanes with no document overflow or runtime warnings.
Decision: pass for implementation and motion; cinematic source-texture replacement remains open because the built-in image-generation request failed at the network boundary.
Next executable action: When the built-in image service is available, generate eight distinct photographic/cinematic square world textures and replace the abstract research covers without changing the validated motion scheduler.
New authority required: No token is needed for the built-in path. A CLI/API fallback would require the user to opt in and configure an API key.
```

### 2026-08-03 — Reference-flight lifecycle reconstruction

```text
Current stage: Stage 9 — Engineering and delivery closure
User phase: Recreate and optimize against the original Happy Oyster motion
Coverage item: Continuous bounded approach, glass readability, perimeter exit, replenishment, desktop/mobile continuity
User goal: Match the reference page's stable outward sphere travel without the delayed full-screen flash in the local version.
Browser environment: Happy Oyster and local prototype at 1280×720; local portrait check at 390×844
Observed evidence: The reference sequence showed gradual bounded enlargement and complete edge exits. The previous local sequence showed a sphere growing without bound as its distance to the camera approached zero, then recycling only after camera intersection.
Problem category: Motion, depth, responsive composition, foreground interaction
Root cause: True-perspective radius diverged near the camera; the exit test expanded by the same divergent radius and therefore became harder to satisfy. Near-field pairwise repulsion also introduced late path changes.
Minimal intervention: Keep the true Three.js sphere/material stack, but drive each sphere with a normalized lifetime, bounded screen-space radius curve, stable angular lane, aspect-aware portrait cap, and full-perimeter endpoint. Map the resulting screen radius back into a safe 3D scale at a bounded camera distance. Remove near-field collision impulses and camera-crossing recycling. Reduce front glass opacity, increase image contrast, and make Escape close the composer explicitly.
Adjacent regression surfaces: Particle size/distribution, raycasting, detail selection, composer, focus return, desktop overflow, 390px layout, build, Sites worker, repository gallery build.
Observed result: Eight-second and 24-second timed browser sequences show continuous outward motion, complete perimeter exits, early far-field replacements, stable lane direction, and no frame-filling flash. Desktop and 390×844 captures have no document overflow; the portrait cap prevents the observed lower-lane overlap. World selection, detail state, composer open, Escape close, and focus return passed. Build, 4/4 worker tests, and the five-project gallery build passed.
Decision: pass, with reduced-motion runtime emulation deferred because the browser exposes viewport and visibility controls but no media-preference override.
Next executable action: None inside the authorized scope. Retest reduced motion when media emulation is available; consider photographic or short-loop world textures as a separate content-quality pass.
New authority required: No
```

### 2026-08-03 — Particle luminance and image-service retry

```text
Current stage: Stage 9 — Engineering and delivery closure
User phase: Retry cinematic image generation and brighten particles
Coverage item: Built-in image asset path; sparse particle readability
User goal: Replace abstract sphere textures with generated cinematic worlds and make the fixed-size star particles easier to see.
Browser environment: http://127.0.0.1:4174/?render=balanced-glass-worlds-v12 at 809x898
Observed evidence: The live baseline showed a sufficient particle count but low blue-gray luminance, especially in the far field. Three built-in image requests, including a short diagnostic prompt, failed at the same image-service network boundary before returning a usable new artifact.
Problem category: Asset pipeline, effects luminance
Root cause: Particle color and far-depth opacity compounded into low visibility. Image generation is blocked at the remote built-in service response path, not by prompt length, project paths, or a local token requirement.
Minimal intervention: Preserve 1,850 uniformly distributed fixed-size circular points; change particle color from muted blue to ice-white blue and raise far-depth opacity from 0.34 to 0.58. Do not modify sphere motion or reference existing images until a generated asset is validated.
Adjacent regression surfaces: Particle density, central concentration, fixed pixel size, additive blending, sphere readability, runtime logs, build and Sites worker.
Observed result: Browser capture shows clearly visible sparse stars without square points or a central knot; no console warnings/errors were introduced. No generated cinematic texture was integrated because the built-in service returned no new artifact.
Decision: pass for particle luminance; defer for cinematic texture generation.
Next executable action: Retest the built-in image path when the service is reachable. If the user explicitly chooses the CLI fallback, configure OPENAI_API_KEY locally and generate one asset per prompt before integration.
New authority required: Explicit user opt-in is required before using the API-key-based CLI fallback.
```
