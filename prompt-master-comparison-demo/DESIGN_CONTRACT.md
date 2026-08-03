# Design Contract

Entry mode: Brief-led greenfield sample
Request revision: 1
Target user and context: Researcher evaluating whether Prompt Master materially improves a user's task description before it reaches Codex.
Desired first impression: A precise research comparison, not a promotional landing page.
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: Warm neutral canvas, high-contrast ink surfaces, restrained coral and teal status accents, clear sans/monospace role separation, no external assets.
Information constraints: Always distinguish original user intent, clarified facts, Prompt Master additions, unverified assumptions, and capabilities not triggered by this example.
Operation constraints: Static local page; no backend, analytics, network calls, or dependencies. Copy, view-mode, capability-filter, and theme controls must work with keyboard input.
State constraints: Default side-by-side comparison, original-focus, optimized-focus, selected capability, copied feedback, light/dark theme, and reduced-motion behavior.
Environment constraints: Standalone HTML/CSS/JS under `prompt-master-comparison-demo`; responsive at 1440px, 768px, and 390px.
Primary journey: Read the original prompt, inspect the three clarification answers, compare the normalized Codex prompt, select capabilities to see exactly what changed, then read the final verdict.
User-defined phases:
1. Show the original prompt.
2. Show the Prompt Master optimized prompt.
3. Show a comparison summary covering the Skill's internal capabilities and limitations.
Required artifacts: Runnable page, source files, README, browser validation record.
Autonomy authorization: User requested direct implementation of a webpage sample; reversible layout and content decisions are delegated.
User-decision boundary: No backend, deployment, external publishing, or changes outside the isolated demo directory.
Observable completion criteria:
- Original and optimized prompts are visible and copyable.
- The clarification step is explicit, so the optimized prompt does not fabricate missing facts.
- Capability filtering identifies additions in the optimized prompt.
- The summary distinguishes applied, available-but-not-triggered, and unsupported capabilities.
- Desktop, tablet, and 390px layouts remain readable without horizontal page overflow.
- Theme toggle, view-mode controls, copy actions, keyboard focus, and reduced-motion fallback work.

## Coverage record

| User phase | Requirement or artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Original prompt | Desktop/mobile, both themes | Browser screenshot/DOM | 2-7 | done | Original panel, risk tags, view filter and copy feedback verified |
| 2 | Optimized prompt | Desktop/mobile, both themes | Browser screenshot/DOM | 2-7 | done | Annotated Codex task specification and Agent warning verified |
| 3 | Comparison summary | Capability selected/unselected | Browser interaction | 3-6 | done | 21 selectable capability entries and prompt highlighting verified |
| 3 | Truthful capability coverage | Applied/not-triggered/unsupported | Content inspection | 3 | done | Inventory separates 16 applied capabilities, optional strategies and unsupported runtime features |
| Delivery | Runnable static page | Local URL | Browser navigation | 1 | done | Served and inspected at `http://127.0.0.1:4178/` |
| Delivery | Keyboard and focus | Primary controls | Browser/DOM evidence | 7 | done | Native semantic buttons and visible focus outline verified |
| Delivery | Responsive layouts | 1440/768/390 | Browser screenshots | 7 | done | No page-level horizontal overflow at all three target widths |
| Delivery | Reduced motion | Preference fallback | Source/browser evidence | 8 | done | `prefers-reduced-motion` override present and removes smooth motion |
| Delivery | Handoff | README + validation record | File inspection | 9 | done | README, preview and validation record included |
