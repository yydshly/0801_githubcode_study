# Skill 控制实验设计契约

Entry mode: Revision-led implementation in the existing Three.js capability guide.

Request revision: Add a project-local installation and a runnable experiment that makes Skill control visible.

Target user and context: A non-technical product owner who wants to distinguish model capability, Skill guidance, generated code, and Three.js runtime behavior.

Desired first impression: “我能逐步看到 Skill 的规则怎样把普通球体变成可诊断的程序化行星。”

Visual ambition: Immersive.

Experience architecture: Spatial Stage.

Visual constraints:

- The Three.js planet remains the visual anchor through the whole journey.
- Dark observatory palette, restrained cyan/amber diagnostic accents, no decorative panels that compete with the planet.
- Intermediate field views must look intentionally different from the final material.

Information constraints:

- Always distinguish: user prompt, model action, Skill rule, generated/runtime code, GPU result.
- State truthfully that the Skill is an instruction package; the browser renders code.
- Show that this first experiment consumes the installed Skill's bundled reference implementation directly.

Operation constraints:

- Pointer drag rotates the camera; wheel zooms.
- A six-step process control changes both explanation and scene diagnostic mode.
- A direct diagnostic control can switch final, height, continents, climate, biomes, and normals.
- Keyboard focus and button states remain visible.

State constraints: baseline, field diagnostic, final material, render fallback, reduced motion.

Environment constraints: Vite at `http://127.0.0.1:4180/`; desktop and 390px mobile; project-local `.codex/skills`; no global installation.

Primary journey: Open the lab, compare the baseline, advance through every generation layer, orbit/zoom the body, and understand which Skill rule produced each visible change.

User-defined phases:

1. Install all repository Skills locally.
2. Invoke one representative Skill and expose its rules.
3. Generate and render the effect with visible intermediate states.
4. Verify the page and document the boundary between Skill, model, code, and renderer.

Required artifacts: local install manifest, `skill-lab.html`, runtime modules/styles, guide-page entry link, browser evidence, validation record.

Autonomy authorization: User explicitly requested local installation, testing, and continued implementation.

User-decision boundary: New product direction, global installation, backend services, or replacing the current gallery architecture.

Observable completion criteria:

- Exactly 24 project-local Skill directories match the upstream files.
- The experiment is reachable from `skills.html`.
- Baseline and six Skill-driven diagnostic/final states are visibly distinct.
- Orbit, zoom, process controls, diagnostic controls, and reset work.
- Desktop and 390px mobile preserve the primary journey without blocking the scene.
- Build succeeds and browser console has no application errors.

## Coverage record

| User phase | Requirement or artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Install 24 Skills locally | `.codex/skills` | Count, manifest, hash comparison | Stage 0 | pass | None |
| 2 | Show invocation and extracted rules | Lab foreground | DOM and screenshot | Stage 3 | pass | None |
| 3 | Show progressive generation | WebGL stage, seven states | Browser interactions and screenshots | Stage 5 | pass | None |
| 3 | Orbit, zoom, reset | Pointer, wheel, keyboard button | Browser interaction | Stage 5 | pass | None |
| 4 | Desktop layout | 1440x900 | Screenshot | Stage 7 | pass | None |
| 4 | Mobile layout | 390x844 | Screenshot | Stage 7 | pass | None |
| 4 | Reduced motion and fallback boundary | CSS/runtime | Browser or source observation | Stage 8 | pass | None |
| 4 | Engineering closure | Production build | Build output | Stage 9 | pass | None |
