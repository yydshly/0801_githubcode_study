# Glass Worlds Gallery — Design Contract

```text
Entry mode: Reference-led
Request revision: 8
Target user and context: Visitors browsing the 0801 research gallery on desktop, tablet, or mobile.
Desired first impression: A cinematic field of living glass worlds suspended in a quiet night sky.
Visual ambition: Immersive
Experience architecture: Spatial Stage
Visual constraints: Match the observed Happy Oyster reference composition and motion: near-black star field, glass spheres continuously travelling toward the viewer, scene imagery inside every sphere, pointer/camera parallax, minimal top navigation, and one centered bottom action. Spheres must occupy irregular but balanced sectors around the full viewport, enlarge continuously with a bounded screen-space size curve, keep a stable outward trajectory, avoid near-field overlap through scheduling rather than late collision impulses, and leave completely through the frame perimeter before recycling. The camera must never enter a sphere.
Information constraints: Replace the source product's worlds with this repository's AI capability themes. Keep labels concise and reveal detail only after selection.
Operation constraints: Hover and keyboard focus expose a world label; click/Enter selects a world; Escape closes overlays; the primary CTA opens a local mock world composer; no backend or AI call.
State constraints: Default forward-flight galaxy stage, pointer and wheel travel, focused/hovered orb, selected world detail, composer open, composer success, reduced-motion fallback, image-loading fallback.
Environment constraints: Self-contained React/Vite project; no external runtime CDN; no authentication, persistence, backend, model token, or real generation API.
Primary journey: Browse the spatial field → select a sphere → inspect its rotating scene images and research note → close and continue → optionally open the mock world composer.
User-defined phases: Create a new research directory; generate the floating glass-world effect; use several images inside each sphere; verify implementation complexity through a runnable demo.
Required artifacts: Runnable project, generated scene assets, project README, browser validation record, design QA report, research-gallery registration.
Autonomy authorization: User explicitly asked to create the directory and generate the effect; reversible implementation decisions are authorized.
User-decision boundary: A real AI/world-model backend, deployment, authentication, or paid API requires separate authorization.
Observable completion criteria: The page renders at desktop and 390px mobile; eight spheres occupy distributed angular sectors and continuously approach/enlarge on monotonic, stable paths; near-field spheres remain separated by staggered lifetimes and sector assignment; foreground spheres reach a controlled maximum diameter, leave completely through the perimeter, and recycle without a full-screen flash or camera intersection; replacement spheres are visible before predecessors exit; sphere curvature, glass thickness, reflection, refraction and highlights remain visible at close range; pointer and wheel input move the camera field; each sphere cycles through three images; keyboard selection and Escape work; the composer completes a mock flow; reduced-motion preserves content; build and repository gallery build pass; no browser console errors.
```

## Revision 7: side-panel composition and sphere readability

The 809x898 same-size comparison reopened composition, material, depth, density, and motion. The reference keeps roughly three to five readable near/mid worlds on screen, while the prior local frame could collapse into one dominant edge crop plus a string of tiny beads. Acceptance for this revision is therefore:

- flatten the size curve so medium worlds become readable earlier and remain present longer;
- spread lanes outward earlier while preserving stable full-edge exits;
- cap foreground radius more strongly on portrait and side-panel viewports;
- stagger image-frame offsets to reduce simultaneous repetition;
- use front-hemisphere scene projection, mild refractive UV displacement, layered reflection, and inner shading to improve spherical depth;
- keep particles sparse and fixed-size, with only a measured density increase;
- replace abstract research-cover textures with cinematic world imagery when the built-in image service is available. The first generation attempt failed at the network boundary, so this content-quality item remains open without adding a token or external runtime dependency.

## Revision 8: cinematic texture replacement and particle luminance

The user explicitly requested another built-in image-generation attempt and reported that the sparse star particles are too dark. This revision preserves the validated scheduler, glass geometry, fixed particle size, uniform frustum distribution, world interactions, and local-only runtime. Reopened acceptance criteria:

- generate distinct square cinematic scenes through the built-in image path and copy accepted outputs into `public/assets/scenes/generated/`;
- use each generated scene as a local sphere texture with no token, API key, external CDN, or runtime model call;
- keep central subjects and scene depth legible after spherical cropping and refractive distortion;
- raise particle luminance and opacity enough to remain visible against the near-black field while keeping particles sparse, circular, fixed-size, and free of a central knot;
- validate the changed texture/material path and particle field in the live canonical route, then rerun build and Sites tests.

## Revision 9: generated-scene optical and motion calibration

The eight dedicated cinematic textures now exist locally and are wired into the runtime. The user authorized continued refinement after reviewing the generated imagery. This revision keeps the validated eight-sector scheduler, complete perimeter exit, fixed-size sparse particles, pointer/wheel input, local-only runtime, and foreground interactions. Reopened acceptance criteria:

- keep generated subjects readable through the glass at close range by reducing broad shell wash while preserving a bright Fresnel edge, moving specular highlights, visible thickness, and a shaded lower hemisphere;
- make the image itself contribute to spherical depth through restrained curvature shading and lens displacement without introducing fisheye distortion or hiding the central subject;
- increase middle-depth dwell so at least three readable medium/large worlds normally coexist at the 809x898 side-panel viewport;
- preserve stable angular lanes, non-overlap, monotonic enlargement, complete perimeter exit, and immediate far-field recycling;
- validate the default stage, selected detail state, narrow viewport, runtime errors, production build, and Sites tests.

## Revision 10: desktop scene calibration and GPU resource sharing

The user explicitly confirmed a narrower follow-up scope: desktop only, no new effects, no additional mobile work. This revision preserves the validated glass material, particle field, flight scheduler, UI composition and interaction states. Reopened acceptance criteria:

- calibrate all eight generated scenes independently for focal offset, exposure, saturation and refraction strength without modifying the source images;
- keep bright snow/desert scenes from washing out while lifting readable detail in forest, city, archive and atelier scenes;
- load each unique URL into one shared Three.js texture object even when several worlds reference it, reducing 24 texture slots to 8 GPU texture resources;
- reuse the inner image, outer shell, inner shell and shade sphere geometries across all worlds instead of allocating per-world duplicates;
- keep crossfades smooth by interpolating calibration values between the current and next scene;
- validate only the 809x898 desktop default stage, desktop selected detail state, a sustained desktop lifecycle, runtime logs, build and Sites tests.

## Revision 11: directed desktop composition and scene uniqueness

The user directly authorized the three-item desktop v16 refinement after reviewing the v15 live stage against Happy Oyster. This remains a revision-led Spatial Stage change: no mobile work, no new post-processing effect, no new asset-generation dependency, and no change to the semantic foreground journey. Reopened acceptance criteria:

- avoid showing the same generated scene as the settled primary image on multiple simultaneously visible worlds when another local scene is available;
- replace the evenly distributed ring/string impression with a directed near/mid/far composition that normally presents one hero world, two or three readable middle worlds, one or two close edge passes, and restrained far-field support;
- preserve stable continuous travel, monotonic enlargement, full perimeter exits, immediate safe recycling, and no late collision impulses;
- keep the image center clear by concentrating lens displacement and optical darkening near the sphere edge while preserving visible glass thickness, Fresnel light and close-range curvature;
- retain the eight-texture cache, four shared sphere geometries, particle count/size behavior, hover/raycast selection, selected details, CTA and desktop-only support boundary;
- validate the 809x898 desktop default stage across timed frames, the Virtual Try-On selected state, sustained recycling/crossfades, runtime logs, build, Sites tests and research-gallery build.

## Revision 12: temporal role pacing, pass-locked scenes and hover guidance

The user directly authorized the recommended desktop v17 slice after reviewing the completed v16 stage. This revision preserves the v16 initial scene allocator, directed templates, edge-weighted glass, local asset set, particles, semantic shortcuts and details journey. It remains desktop-only and adds no new post-processing or generated assets. Reopened acceptance criteria:

- reduce temporal small-world clustering by accelerating the far phase, dwelling through readable middle depth, and completing the near-edge phase promptly;
- keep each sphere's image and calibration stable from far entry through complete perimeter exit; any scene change must occur only during safe far-field recycling;
- retain as much visible scene uniqueness as the eight-image/eight-world pool permits, never interrupt a readable mid/near pass to resolve an allocation;
- when a pointer hovers a sphere, smoothly slow only that sphere, strengthen its existing focus treatment, and show a compact anchored DOM label with world number, title and an Explore cue;
- clear hover feedback on pointer leave, selection, detail opening or sphere exit, without blocking canvas clicks or foreground controls;
- preserve continuous motion, no overlap, no frame-filling flash, texture/geometry sharing, selected details, CTA and the desktop-only support boundary;
- validate timed desktop default frames, hover enter/move/leave/click, selected details, sustained recycling, clean runtime logs, build, Sites tests and research-gallery build.

## Revision 13: luminous interiors, central hero lane and layered stars

The user directly confirmed the recommended desktop v18 refinement after a live comparison between the completed v17 stage and Happy Oyster. The selected WebGL Spatial Stage pattern keeps the persistent canvas, pass-locked scenes, temporal role pacing, hover guidance, local assets and existing foreground journey. No mobile work, new image, post-processing pass, API or token is added. Reopened acceptance criteria:

- make scene imagery read as a clear world enclosed by glass rather than a dark tunnel: reduce center-darkening and broad internal reflection while preserving edge refraction, asymmetrical highlights, rim light and visible shell thickness;
- keep per-scene focal/exposure calibration and eight-scene uniqueness intact while improving dark-scene readability at middle and near depth;
- reserve one composition role as a central hero lane that stays within the central field through readable middle depth and then exits continuously through a perimeter edge;
- retain irregular multi-quadrant staging, the `1–2 / 5–6 / 1–2` far/mid/near population, full-edge recycling, pass-locked identity and no late collision impulse;
- split the star field into two fixed-pixel-size depth layers: a denser dim slow background and a sparser brighter faster foreground, with irregular brightness and no optical-axis knot;
- preserve foreground navigation, CTA, hover card, click selection, wheel acceleration, reduced-motion behavior and the desktop-only support boundary;
- validate timed 1280x720 desktop frames, one complete lifecycle, hover-to-selection, runtime logs, build, Sites tests and research-gallery build.

## Revision 14: fixed-direction side exits

The user rejected the v18 hero motion because the central path held a large sphere near the middle and then accelerated it sideways, which reads as a late trajectory change. This repair keeps the luminous glass, layered particles, pass-locked scenes, depth-role pacing and foreground interactions, but reopens the hero path itself. Acceptance for this revision is:

- every sphere, including the primary visual world, chooses one angular lane at far-field entry and follows that direction continuously until it has completely cleared the corresponding frame edge;
- position and apparent size progress together, so no sphere reaches its dominant scale in the central field and then moves laterally to disappear;
- the primary world may cross a readable inner-middle region, but its largest scale must occur only near its predetermined side exit;
- remove role-specific middle holding and temporary hero size amplification; retain only subtle decaying drift that cannot produce a visible turn;
- preserve the `1–2 / 5–6 / 1–2` far/mid/near schedule, eight unique scenes, safe recycling, layered fixed-size particles, glass readability, hover selection and desktop-only support boundary;
- validate a complete 1280x720 lifecycle with sampled direction stability, monotonic radial distance and monotonic base screen-radius growth before build and repository tests.

## Revision 15: quadrant-balanced close passes

The user authorized the recommended v20 motion-directing slice after accepting the fixed-direction v19 path. This revision preserves immutable lane direction, luminous glass, local scenes, layered particles, hover interaction and desktop-only scope. It changes only temporal and angular scheduling. Acceptance is:

- near-field exits alternate across all four quadrants instead of allowing several consecutive dominant passes on the same side;
- every composition template keeps each priority slot inside its assigned quadrant, with small angular variation that cannot change the side chosen at entry;
- normalized flight phase drives radial displacement continuously, avoiding visible velocity changes at far/middle/near role boundaries;
- the near segment occupies less than one eighth of a full lifecycle, so eight equally staggered worlds normally produce no more than one close-pass sphere at a time;
- preserve readable middle-depth occupancy, full-edge exits, monotonic enlargement, eight unique scenes, fixed-direction travel, two particle layers and foreground interactions;
- validate at least one complete 1280x720 lifecycle, sampling near-count, exit-quadrant sequence, radial/size continuity, depth roles, uniqueness, runtime logs and hover selection before build and repository tests.

## Revision 16: uniform fixed-size particle flight

The user explicitly reopened particle refinement after the v20 sphere scheduler passed. This is a particle-only revision using the existing pooled two-layer GPU point field. Sphere paths, scheduling, glass, imagery, controls and desktop-only support remain unchanged. Acceptance is:

- every particle layer uses the same fixed CSS-pixel diameter; depth must never be communicated through point-size growth;
- retain two reusable point systems and the existing 1,790-particle cap, with no per-frame object or material allocation;
- communicate depth through speed, brightness, opacity and parallax only: slow dim background dust plus faster brighter foreground dust;
- keep uniform frustum sampling and circular point masking, with no optical-axis concentration, square sprite or motion streak;
- fade particles in after far-field recycling and fade them out before reaching the camera, eliminating visible reset pops;
- keep particle speed coupled to the same motion multiplier and wheel boost as sphere travel;
- validate fixed layer sizes, distribution, luminance, lifecycle fading, wheel response, sphere scheduling, interaction, runtime logs and build output at 1280x720.

## Revision 17: continuous optical flow, layered glass and a pilot 3D corridor

The user explicitly confirmed a core-WebGL refinement focused on particles, glass material and sphere trajectory. This revision preserves the v20 scheduler, v21 shared particle size, local imagery, interactions and desktop-only support. The trajectory experiment is deliberately limited to one priority world; the other seven remain the validated screen-directed control group. Acceptance is:

- keep every particle at the shared 1.18 CSS-pixel size while making world-space velocity vary continuously with camera distance instead of remaining constant inside each layer;
- add a restrained proximity luminance response in the particle shader without introducing streaks, squares, twinkle noise or central concentration;
- add view-dependent image-core parallax, edge-only subpixel chromatic separation and progress-calibrated refraction while keeping central imagery clear;
- vary custom highlight direction/phase per sphere and strengthen front/back shell separation only at readable middle/near depth;
- route one priority world through a true bounded world-space line from far entry to a predetermined side exit, using physical perspective for apparent size and never approaching close enough for camera intersection;
- keep the pilot direction immutable through its pass, rebuild its corridor only after full exit, and expose runtime trajectory evidence for comparison with the seven validated lanes;
- preserve one close-pass world, 2/2/2/2 quadrant allocation, eight unique scenes, hover selection, wheel synchronization and no runtime allocation growth;
- validate at least one full 1280x720 lifecycle with pilot radial/size/direction samples, material readability, particle response, scheduler metrics, interaction, logs and builds before deciding whether to extend the corridor to all spheres.

## Revision 18: four-quadrant physical corridor comparison

The user confirmed the next trajectory study after the single v22 corridor passed. This remains a desktop-only, local-asset WebGL revision. Particle density, fixed point size, continuous depth response, glass shaders, foreground UI and the eight-scene allocator stay unchanged. The experiment expands physical perspective to exactly four worlds—one in each quadrant—while retaining four screen-directed worlds as a simultaneous control group. Acceptance is:

- assign one fixed world-space corridor to each of UR, UL, DR and DL, with no quadrant reassignment during a visible pass;
- keep the four physical corridors phase-staggered and pair each with one control path in the same quadrant at roughly one-quarter to three-eighths of a lifecycle separation;
- preserve fixed physical scale for corridor worlds so apparent growth comes from perspective, with a bounded near plane and complete edge clearance before recycling;
- prevent hover from effectively parking a late middle/near world and breaking the temporal spacing schedule;
- expose corridor count, control count, per-corridor trajectory snapshots and minimum projected sphere gap for sustained runtime validation;
- retain `2/2/2/2` quadrant allocation, `0–1` near worlds, two to three readable middle worlds, eight unique scenes, continuous fixed-size particles, adaptive glass optics and working hover/click selection;
- validate a full 1280x720 lifecycle with no late turn, camera entry, recycle flash or near overlap before deciding whether physical corridors should replace the remaining four control paths.

## Revision 19: scenario-driven research archive

The user ended open-ended visual refinement and explicitly requested a complete subproject archive. This documentation and handoff revision preserves the validated runtime and adds only a visible original-reference link. Acceptance is:

- describe the current rendering, assets, glass, particles, motion, interaction, validation evidence and model/token boundary in one archive entry;
- retain both key comparisons: screen-directed paths versus physical 3D corridors, and Happy Oyster's content-first worlds versus this prototype's effect-first composition;
- link the original Happy Oyster page, the published prototype, the local route, source repository and comparison procedure;
- record a comprehensive but scenario-gated optimization backlog, including content readability, perceptible 3D, glass, particles, scheduling, assets, interaction, performance and fallback;
- mark the project as `阶段归档` in the root gallery and research registry;
- keep unrelated `.agents/` content untouched, rerun project build, Sites tests, research-gallery build, browser smoke checks and diff validation, then commit and push the archive to `master`.

## Revision 20: GitHub Pages base-path repair

The archived runtime remains unchanged, but the published route rendered an empty React root because its HTML referenced `/assets/...` while the files were deployed below `/0801_githubcode_study/projects/glass-worlds-gallery/assets/...`. The user explicitly authorized repair. Acceptance is:

- pass the gallery-provided `--base` argument directly to Vite while preserving the Sites packaging post-build step;
- trigger the Pages workflow when any enabled research project changes, including `glass-worlds-gallery/**`;
- fail the gallery build when a Vite project's generated root-relative asset references escape its assigned project base;
- preserve the archived WebGL runtime, visual composition and interaction behavior without unrelated changes;
- verify the project build, Sites tests, full gallery build, GitHub Actions deployment and production route in a real 1280×720 browser with loaded assets, a rendered canvas and no console warnings or errors.

## Spatial-stage architecture

```text
Scene base: Persistent Three.js WebGL canvas with raster textures, physical glass shells, Fresnel rims, and GPU particles
Scene persistence: Full viewport throughout the primary journey
Foreground control model: Top navigation, bottom CTA, selected-world detail panel, composer dialog
State-to-scene mapping: Selection enlarges and sharpens one sphere; modal state dims the stage; success updates composer feedback
Mobile transformation: Horizontally scrollable spatial strip with compact overlays and reachable bottom action
Fallback: Semantic keyboard world list and DOM details remain available when motion is reduced; WebGL failure state remains a follow-up hardening item
```

## Reference-led gap and acceptance table

| Comparison layer | Reference evidence | Starting evidence | Target acceptance |
| --- | --- | --- | --- |
| Composition | At the 809x898 side-panel viewport, three to five readable near/mid spheres occupy the field and far spheres remain secondary | The previous local frame could become one oversized edge crop plus a vertical string of small beads | Eight angular sectors pair near, mid, and far lifetimes across all four quadrants with minimal near-field overlap |
| Focal hierarchy | Largest spheres dominate; controls stay quiet | Empty starter | Worlds lead attention before nav and CTA while CTA remains discoverable |
| Typography | Thin neutral sans-serif, small labels, sparse copy | Empty starter | Text remains restrained, legible, and secondary to imagery |
| Palette | Near-black navy field, white chrome, warm/cool scene imagery | Empty starter | Dark stage, restrained glass highlights, no bright UI panels in the default state |
| Material | Glossy transparent shells with edge light, curved reflection and visible thickness | Abstract covers and equirectangular UV stretching made some spheres feel like patterned beads | Front-hemisphere projection, refractive UV displacement, inner shade, physical shell thickness and animated highlights improve depth without hiding imagery |
| Depth | Several medium and large worlds coexist while small replacements remain visible | The previous steep size curve kept too many worlds tiny until one suddenly dominated | A flatter size curve, earlier outward spread and stronger side-panel cap preserve at least three depth bands |
| Motion | Timed browser frames show stable radial trajectories, gradual bounded enlargement, complete perimeter exits, and early far-field replenishment without camera intersection | Lifecycle was stable, but middle-depth dwell and quadrant occupancy were uneven | Bounded lifetimes retain stable exits while quadrant-aware staging keeps continuous readable worlds in flight |

## Coverage manifest

| User phase | Requirement or artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| New research directory | Self-contained runnable project | Project root | Files and successful dev route | Stage 1 | pass | Project bootstrapped; local route returns HTTP 200 |
| Floating effect | Continuous bounded approach, distributed sectors, full-edge exit, no camera-entry flash | Desktop default | Equal-interval 1280×720 source/local sequence plus final browser sequence | Stage 2 | pass | Eight-second and 24-second browser sequences show monotonic outward paths, complete edge exits, early replenishment, and no camera-entry flash |
| Glass depth | Convincing close-range 3D glass sphere without frame-filling distortion | Desktop default and near pass | Browser observation of reflection, refraction, curvature and inner depth | Stage 2 | pass | Final desktop capture confirms readable imagery, layered shell thickness, Fresnel rim, and controlled close-pass diameter |
| Generated-scene optics | Dedicated cinematic textures remain readable inside convincing glass | 809x898 default and close pass | Before/after browser capture with visible subject, edge thickness, curved shade and controlled highlight wash | Stage 2 | pass | Browser captures show lifted scene shadows, reduced broad shell wash, localized highlights, curved shade and visible rim thickness |
| Middle-depth dwell | Three or more readable medium/large worlds normally coexist without overlap | 809x898 timed sequence | Equal-interval browser observations with stable lanes and full-edge exits | Stage 2 | pass | Timed side-panel frames retain three or more readable worlds; 390x844 follow-up confirms the narrower radius cap removes the observed lower-lane overlap |
| Per-scene calibration | Eight generated scenes retain balanced subject framing and brightness | 809x898 desktop default and selected detail | Timed browser frames covering bright and dark scene families | Stage 2 | pass | Eight URL-keyed focal/exposure/saturation/refraction profiles remain readable and interpolate through crossfades |
| GPU resource sharing | Reused images and sphere meshes do not allocate duplicate texture or geometry resources | Desktop runtime and source structure | Unique URL/resource counts plus nonblank browser rendering | Stage 8 | pass | Live canvas reports 8 shared textures for 24 slots and 4 shared sphere geometries |
| Desktop sustained lifecycle | Shared resources and per-frame uniforms remain stable through repeated crossfades and flight recycling | 809x898 desktop | Sustained browser observation, screenshots and runtime logs | Stage 8 | pass | Default and selected states passed; a 60-second post-fix run stayed rendered through crossfades and recycling |
| Active scene uniqueness | Simultaneously visible worlds avoid duplicate settled scene images | 809x898 desktop default | Timed frames plus live active-scene count | Stage 2 | pass | Global backtracking allocation keeps all 8 settled scene URLs unique across multiple scene epochs while retaining the 8-texture cache |
| Directed composition | Near/mid/far worlds form an irregular cinematic hierarchy instead of a ring or bead string | 809x898 desktop default | Timed browser frames showing hero, middle, close-edge and far support roles | Stage 2 | pass | Four directed templates and uniformly staggered lifetimes retain two far supports, readable middle worlds, a hero and close edge passes without overlap |
| Edge-weighted glass | Image centers remain readable while glass depth stays visible at the perimeter | Desktop default and selected detail | Close-pass and selected-state browser evidence | Stage 2 | pass | Central lens displacement and broad reflection were reduced while edge refraction, Fresnel light and glass thickness remain visible |
| Temporal depth roles | Readable middle worlds remain dominant while far and close-pass worlds stay restrained over time | 1280x720 desktop default | Timed frames across at least one lifecycle | Stage 2 | pass | Equal travel-time offsets and the v20 short near window hold far/mid/near counts at 1–2 / 5–6 / 0–1 across the sampled lifecycle |
| Pass-locked scene identity | A world image does not morph during a visible flight pass | Desktop default and recycling boundary | Timed image observations plus source/runtime state | Stage 6 | pass | Scene uniforms remain fixed through each pass; with all 8 local scenes occupied, recycling preserves the current scene instead of creating visible duplicates |
| Hover world guidance | Hovering a sphere slows it and exposes an anchored nonblocking title/Explore label | Desktop pointer input | Hover enter, moving sphere, leave and click evidence | Stage 5 | pass | Projected DOM label followed World Models; hovered speed reached 0.210 while all other worlds remained 1.000, click opened the matching detail, and close/empty pointer cleared the label |
| Luminous sphere interiors | Scene imagery remains clear and dimensional without a dark tunnel center | 1280x720 desktop default and close pass | Reference/local comparison plus timed browser frames | Stage 2 | pass | Timed frames show clearer image cores and lifted dark scenes while localized refraction, rim light and shell thickness remain visible |
| Fixed-direction hero exit | A readable primary sphere approaches along one predetermined lane, enlarges while moving outward, and reaches dominant scale only near its side exit | 1280x720 timed desktop sequence | Complete lifecycle with sampled angular/radial/size continuity | Stage 2 | pass | Twenty timed samples across 9 recycling events show monotonic radial distance and screen-radius growth on both priority lanes, with no middle hold or late lateral turn |
| Quadrant-balanced close passes | Dominant spheres leave one at a time through alternating quadrants with continuous apparent travel | 1280x720 timed desktop sequence | Complete lifecycle with near-count, quadrant and trajectory samples | Stage 2 | pass | Twenty-six samples kept the near count at 0–1; 10 exits covered all four quadrants with no adjacent repeat, and both priority lanes retained monotonic radial/size growth |
| Layered fixed-size stars | Particle field communicates depth without point-size growth or a central knot | Desktop default and wheel travel | Timed frames and source/runtime layer counts | Stage 2 | pass | Runtime reports 1,450 dim slow background points and 340 brighter faster foreground points; both use the same 1.18 CSS-pixel size and uniform frustum distribution |
| Uniform particle lifecycle | Both depth layers use one fixed point size and recycle without visible popping | 1280x720 desktop default and wheel travel | Runtime uniforms, timed frames and wheel-response samples | Stage 2 | pass | Eighteen lifecycle samples retained shared 1.18/1.18 sizes and far-in/near-out fading; wheel input raised the shared motion scale from 1.000 to 1.240 before it settled smoothly |
| Continuous particle depth field | Fixed-size dust accelerates and brightens smoothly with proximity while retaining sparse uniform distribution | 1280x720 desktop default and wheel travel | Shader/runtime mode plus timed visual evidence | Stage 2 | pass | Runtime reports continuous-depth-wheel-synced motion at shared 1.18/1.18 sizes; proximity luminance remains restrained and wheel response rises and settles with the sphere field |
| Adaptive glass optics | Sphere imagery reads inside a distinct glass volume with individual highlights and edge-only dispersion | 1280x720 middle and close passes | Timed browser frames plus source/runtime optical state | Stage 2 | pass | Browser frames retain clear image centers while runtime depth optics span 0.720–1.080; edge dispersion, view parallax and seeded highlight directions vary the glass without obscuring scenes |
| Pilot 3D corridor | One priority sphere follows a bounded world-space line and grows through perspective without a turn or camera entry | 1280x720 complete lifecycle | Pilot trajectory samples, full exit/recycle and control-lane comparison | Stage 2 | pass | The Live Avatars pilot decreased from 53.72 to 7.63 camera units while radius rose from 0.051 to 0.358 with no sampled reversal; it fully cleared the right edge before safe far-field recycling |
| Four-quadrant corridor comparison | Four phase-staggered worlds use fixed-scale physical corridors, one per quadrant, while four old paths remain as controls | 1280x720 sustained lifecycle | Per-corridor distance/radius/direction samples, minimum projected gap, exits, interactions and logs | Stage 2 | pass | Twenty-eight seconds and 112 samples covered 2–3 recycles per corridor with zero direction, distance or radius regression, a positive 0.071 minimum projected gap and at most one near world |
| Scenario-driven archive | Complete implementation record, two comparison narratives, demo/reference linkage and scenario-gated backlog | Repository docs, project chrome and gallery registry | Files, links, build/test output, browser link state and clean scoped diff | Stage 9 | pass | Archive and comparison documents are linked from the project/root READMEs; build, all 4 Sites tests, gallery build and 1280×720 browser smoke checks pass; the original-reference link is visible and runtime logs are clean |
| GitHub Pages base-path repair | Production HTML loads its JavaScript and CSS from the repository project path and renders the archived experience | Published project route at 1280×720 | Generated HTML, HTTP asset status, Actions deployment, DOM/canvas state and browser logs | Stage 9 | continue | Correct build argument forwarding and workflow triggers, add a gallery base-path guard, deploy the exact commit, then verify the production route |
| Multi-image spheres | Three images per world | Default and selected states | Timed transition plus selected-world observation | Stage 5 | pass | Eight worlds each reference three local raster scenes |
| Primary interaction | Browse, select, close, compose | Mouse and keyboard | Interaction observations and focus return | Stage 5 | pass | Browser verified world selection, detail state, composer open, Escape close, and focus return to the opener |
| Responsive behavior | Preserve spatial experience | Desktop and 390px mobile | Browser screenshots and interaction | Stage 7 | pass | 1280×720 and 390×844 captures show no document overflow; portrait size cap removes near-field overlap while preserving the stage |
| Motion/accessibility | Reduced motion and visible focus | Reduced-motion and keyboard | Browser/DOM evidence | Stage 7 | defer | Keyboard focus is verified; browser has no media-preference emulation capability, so retest reduced-motion when that capability is available |
| Performance/fallback | Images load progressively and base UI remains usable | Constrained/fallback path | Browser observation | Stage 8 | pass | Local WebP assets, self-contained runtime, blur and reduced-motion fallbacks |
| Research integration | Register project 05 | Root README and research-projects.json | Build output | Stage 9 | pass | Registry and repository README updated; gallery build passes |
| Handoff artifacts | README, validation, design QA | Project root | Required files | Stage 9 | pass | Project documentation present |
