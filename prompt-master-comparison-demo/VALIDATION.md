# Browser validation

Validated locally at `http://127.0.0.1:4178/`.

## Results

- Desktop 1440 × 1000: side-by-side comparison renders as two columns; no horizontal page overflow.
- Tablet 768 × 900: comparison, clarification cards, and capability workbench collapse to one readable column; no horizontal page overflow.
- Mobile 390 × 844: title remains two natural lines, all primary sections use one column, the inventory table scrolls inside its own container, and there is no page-level horizontal overflow.
- View controls: side-by-side, original-only, and optimized-only states correctly hide and show their matching panels.
- Capability controls: selecting an applied capability updates the detail card and highlights only the matching optimized Prompt blocks. The final inventory exposes 21 selectable entries; 16 are applied in this sample.
- Agent warning: the optimized Prompt includes the mandatory pre-execution review notice for tools with real system access.
- Theme: light/dark state, label, and `aria-pressed` value stay synchronized.
- Copy: the original Prompt copy action reported a confirmed success state and visible feedback.
- Accessibility: semantic headings, regions, buttons, pressed states, skip link, live status, and visible focus outline are present.
- Motion: the stylesheet includes a `prefers-reduced-motion: reduce` fallback.
- Console: no warning or error logs were observed during the final interaction pass.

## Scope

This validates the comparison interface, not whether the optimized Prompt makes Codex complete the coding task more successfully. That requires a separate controlled execution experiment.
