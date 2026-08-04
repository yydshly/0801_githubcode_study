# Browser Validation Record

Date: 2026-08-04
Canonical URL: `http://127.0.0.1:4178/`
Runtime: Vite dev server

## Coverage

| Surface / state | Evidence | Result |
| --- | --- | --- |
| Desktop 1280x720 / capability default | Real browser screenshot; readable title, capability card, five glass worlds and controls | pass |
| Desktop / capability tab | Clicked `Shared fields`; panel title and `PROCEDURAL FIELDS` signal changed; water/field stage appeared | pass |
| Desktop / product fit | Clicked `结合我们的产品`; product HUD, selected world and five local scene worlds rendered | pass |
| Desktop / world selection | Pointer click on visible world changed selection to `Rainy city` and status to `FOCUS / RAINY-CITY` | pass |
| Desktop / product map | Opened `查看详细映射`; overlay stayed sharp above the blurred scene; close action worked | pass |
| Desktop / Enter world | Clicked `Enter world`; selected card entered its explicit success/entered state | pass |
| Desktop / library guide | Opened `看懂这套库`; library panel explained the pack identity, 24 installed skills and the three-step route | pass |
| Desktop / full skill atlas | Library panel rendered all 24 skills in five groups, with gallery evidence vs cross-cutting system labels | pass |
| Desktop / README proof | Local copies of `example_gallery.jpeg` and `spectral_ocean.jpeg` loaded in the guide and remained readable | pass |
| Desktop / mechanism guide | Opened `这个效果怎么做？`; mechanism panel exposed the five-system flow and routed code areas | pass |
| Desktop / product meaning guide | Opened `这套库对产品的意义`; product panel exposed the Glass Worlds mapping and both next-step actions | pass |
| Guide / map recovery | Used `查看详细映射` from the product meaning panel; detailed mapping overlay reopened and remained readable | pass |
| Guide / Escape | Opened the guide and dismissed it with `Escape`; guide and product map states both cleared | pass |
| Narrow 390x844 / capability | Real browser screenshot; no horizontal overflow; controls and capability card remained reachable | pass |
| Narrow 390x844 / product | Product title stayed in intentional two-line layout; selected card separated from status; body width stayed 390px | pass |
| Narrow 390x844 / guide | Guide card stayed within the viewport, remained scrollable, and body width stayed 390px | pass |
| Narrow 390x844 / full skill atlas | All 24 skill rows remained reachable in the scrollable guide; no horizontal overflow | pass |
| Narrow / motion and debug | Clicked reduced-motion and debug controls; `reduced-motion` and `debug-mode` states became active | pass |
| Fresh runtime console | Opened a fresh page and checked warning/error logs | pass; `[]` |
| Upstream gallery / overview | `npm run dev:examples:no-open -- --port 4173`; gallery reported `31 EXAMPLES` and `RUNTIME READY` | pass |
| Upstream gallery / spectral ocean | Opened `threejs-spectral-ocean/spectral-cascade-ocean`; live ocean rendered with FPS/draw/FFT diagnostics | pass |
| Upstream gallery / console | Checked warning/error logs after the live spectral ocean route | pass; `[]` |
| Production build | `npm run build` | pass |

## Intentional boundary

This lab demonstrates a representative subset of the upstream pack. It does not claim to visually implement all 24 skills in one scene; the other installed skills remain available under `./.agents/skills` for later product-specific experiments.
# 2026-08-05 repository integration

- Production subpath build passed with `--base=/0801_githubcode_study/projects/threejs-capability-lab/`.
- Five local Glass Worlds textures now use `import.meta.env.BASE_URL`, preventing root-path asset failures on GitHub Pages.
- Local runtime remains available at `http://127.0.0.1:4178/` and links back to the complete project06 research page.
- Browser verification confirmed two top-level modes, a live canvas, no desktop horizontal overflow and the correct research-page link.
- The project-local `.agents/skills` directory is intentionally ignored; the canonical committed 24-Skill snapshot remains under `starfield-process-demo/.codex/skills`.
