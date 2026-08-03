# Design QA

## Source truth

- Reference: `C:\Users\yun68\AppData\Local\Temp\codex-clipboard-bce4737f-71eb-4a1e-98ed-6af9f7df524d.png`
- Runtime reference: `C:\Users\yun68\AppData\Local\Temp\codex-clipboard-95c9faae-a9c9-4f70-8921-fc325399d740.png` (2560×1392)
- Reference composition: near-black full-viewport stage, asymmetric floating glass spheres, varied scale and depth, minimal top navigation, centered bottom CTA.
- Implementation route: `http://127.0.0.1:4174/`
- Target desktop viewport: 1536×864
- Target mobile viewport: 390×844

## Review history

### Pass 1 — source and build review

- Preserved the source hierarchy: spheres remain the primary visual content; navigation and CTA stay quiet.
- Used 8 spheres, deliberate edge cropping, three depth bands, dark negative space, internal scene imagery, glass rim and reflection layers.
- Added a mobile horizontal spatial strip to avoid collapsing the concept into a generic card list.
- Removed the external Google Fonts import so the visual remains self-contained.
- Replaced the absolute public-image reference with a Vite base-aware asset URL so Pages subpaths remain valid.
- Confirmed production build and Sites packaging tests.

### Pass 2 — visual browser comparison

Deferred. The browser-control runtime failed before capture, and no unauthorized standalone automation fallback was used. When available, the reference and implementation screenshot must be combined into the same comparison input, visible gaps recorded, fixes applied, and the comparison repeated.

### Pass 3 — runtime screenshot correction

- Runtime reference confirmed that the sphere shell must remain transparent while the world image sits on an inner spherical surface.
- Confirmed a sparse particle field rather than an image-based galaxy background.
- Confirmed large planets may already be cropped by the frame edge; disappearance must happen through spatial clipping, not a front-facing opacity fade.
- Replaced CSS/DOM spheres with Three.js inner texture spheres, physical transparent shells, Fresnel rims, and GPU particles.
- Changed lifecycle to recycle only outside the projected frame or behind the camera.
- Follow-up runtime evidence briefly increased particles to 7,200, but side-by-side comparison showed square size attenuation, excessive concentration, and excessive speed.
- Final correction uses 1,400 constant-pixel circular particles, uniform frustum-space distribution without a central core, and 1.2× base motion. Curvature lighting, procedural environment reflections, higher glass transmission, and thicker refraction strengthen sphere depth.
- The next composition pass replaces Cartesian lanes with eight irregular angular sectors, projected-radius collision separation, and near-edge radial expansion. A second optical shell and animated dual highlights improve close-range glass volume.

## Acceptance status

| Layer | Current status | Remaining evidence |
| --- | --- | --- |
| Composition | Revised from runtime screenshot | Same-viewport implementation screenshot comparison |
| Focal hierarchy | Implemented | Desktop observation |
| Typography | Implemented | Rendered inspection on Windows |
| Palette and material | Revised to WebGL glass | Runtime material inspection |
| Depth and motion | Revised to camera-pass motion | Timed desktop observation |
| Responsive layout | Implemented | 390×844 screenshot and interaction |
| Keyboard and reduced motion | Implemented | Browser interaction evidence |

final result: deferred — automated visual browser evidence unavailable
