# Capability Lab Design Contract

```text
Entry mode: brief-led / research prototype
Experience architecture: Immersive Spatial Stage
Scene base: persistent Three.js WebGL canvas with local raster textures, glass shells, Fresnel rims, additive particles and a bounded image pipeline
Scene persistence: full viewport remains visible while the foreground switches between capability tour, product fit and mapping panel
Foreground control model: top mode switch, capability tabs, right control rail, selected-world card and product mapping panel
State-to-scene mapping: capability selection changes the authored stage; product mode changes focal hierarchy; world selection changes scale, halo and status; debug/reduced-motion alter the scene feedback
Mobile transformation: capability tabs and controls become compact bottom controls; product mapping becomes a scrollable overlay
Fallback: semantic DOM copy, buttons and product mapping remain readable when WebGL enhancement is unavailable
Primary journey: inspect a capability -> switch to product fit -> select a Glass World -> open the capability map -> return to the scene
Support boundary: desktop 1280x720 and narrow 390x844; local-only runtime; no backend, auth, token or external model call
```

## Observable acceptance

- The page identifies the installed skill pack and its version.
- Five representative skills have visible, stateful demonstrations.
- Glass Worlds mode uses local product assets and exposes a selected-world state.
- Product mapping remains readable above the WebGL scene.
- The primary controls work with mouse/pointer and semantic buttons.
- Reduced motion and debug state are explicit and do not hide product content.
- Desktop and 390px narrow layouts do not horizontally overflow.
- The no-post baseline is still legible because product meaning lives in DOM and authored scene structure, not only in Bloom.

## Revision 1: learning layer

- Three explanation entry points are exposed in the UI: `看懂这套库`, `这个效果怎么做？`, and `这套库对产品的意义`.
- The explanation drawer has three panels: library identity, effect mechanism, and product meaning.
- The product meaning panel must offer both a return to the live product scene and a route to the detailed skill/product mapping.
- The drawer is a foreground learning layer: the WebGL stage remains visible behind it, while the copy remains semantic, scrollable, keyboard-dismissable, and usable at 390px width.

## Revision 2: deep library understanding

- The library panel must enumerate all 24 installed skills in five meaningful groups, pairing each skill name with its visual consequence.
- The panel must distinguish cross-cutting systems from skills with an independent upstream gallery adapter.
- README proof images may be shown as static evidence, but the page must also expose the live upstream example gallery as the route for concrete runtime effects.
- The local lab and upstream gallery remain separate surfaces: the lab explains and maps; the upstream gallery proves individual effects.
