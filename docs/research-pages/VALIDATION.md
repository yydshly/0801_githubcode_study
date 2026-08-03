# Research Pages Validation

Validated on 2026-08-03 using the generated `.pages` artifact.

## Build evidence

- Local gallery build: `node scripts/build-research-pages.mjs --base=/`
- Production-path build: `node scripts/build-research-pages.mjs --base=/0801_githubcode_study/`
- Enabled projects built: 2
- Wallet Header: Vite production build passed; 1,980 modules transformed.
- Wallet Header tests: 2 passed, 0 failed.
- Prompt Master and gallery build scripts: JavaScript syntax checks passed.
- Generated output contains only the portal, public project files, a public project manifest, and `.nojekyll`.

## Browser evidence

Canonical local validation URL: `http://127.0.0.1:4180/` using the `/` base build.

- Desktop 1440 × 1000: two project cards render in two columns; no horizontal overflow; no console warnings or errors.
- Mobile 390 × 844: cards and publishing principles collapse to one column; the heading stays on two natural lines; no horizontal overflow.
- Project 01 route: `/projects/wallet-finance-header/` loads the React root and base-prefixed Vite assets without console errors.
- Project 02 route: `/projects/prompt-master/` loads 21 capability controls and reports 16 applied capabilities without console errors.
- Portal navigation: both project cards navigate to their independent routes.
- Focus, semantic heading, region, link, and skip-link structures are present.

## Boundaries

- Dark styling is implemented through `prefers-color-scheme`, but the available browser viewport controller does not emulate operating-system color preference. Retest both system themes when native preference emulation is available.
- The live Pages URL becomes available only after this change is merged to `master` and the repository Pages source is configured as GitHub Actions.
- Publication uses a dedicated branch based on `master`; `.agents` and the separate World Monitor documentation branch are outside this delivery scope.
