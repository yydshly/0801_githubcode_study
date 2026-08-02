# Wallet Finance Header — Design Contract

Status: approved in conversation; pending written-spec review before implementation.

## Scope

Create the first research subproject at `wallet-finance-header/` inside the empty workspace. It is a self-contained React + Tailwind experience for the Wallet brand: a full-screen, scroll-scrubbed crypto/finance hero with a cinematic astro video, split headings, and two foreground interactions.

The implementation is intentionally limited to this page and its local runtime. It does not add a backend, authentication, real wallet connection, external form delivery, or unrelated product sections.

## Design contract

```text
Entry mode: Brief-led greenfield build
Request revision: 1
Target user and context: Visitors exploring the Wallet finance/crypto brand
Desired first impression: Cinematic, dark, premium, and immediately understandable
Visual ambition: Immersive
Experience architecture: Spatial Stage
Visual constraints: Black space scene; white split typography; glass controls; one bright CTA
Information constraints: Keep the supplied Wallet copy and panel/status labels
Operation constraints: Scroll is the timeline; header actions remain reachable above overlays
State constraints: Default, scroll-scrub, tail autoplay, connected, drawer open, contact form, success, video fallback, reduced motion
Environment constraints: New isolated subproject; only named libraries; CDN assets; no global reset or global font mutation
Primary journey: Land -> scrub the first four seconds with scroll -> reach the tail loop -> open the portal or contact flow -> dismiss and return to the scene
User-defined phases: Create subproject; implement scene and motion; implement foreground states; adapt responsive/accessibility behavior; verify runtime
Required artifacts: Runnable subproject, README/setup note, design contract, coverage/verification record
Autonomy authorization: User confirmed the proposed implementation plan on 2026-08-02
User-decision boundary: None remaining for the declared scope
Observable completion criteria: The route runs, the primary journey works, overlay states are dismissible, mobile remains usable, and the documented checks have evidence
```

## Chosen approach

Use Vite + React as the smallest isolated runtime, with Tailwind CSS for local utility styling, Framer Motion for motion/state transitions, and lucide-react for icons. This keeps the new research project fast to start and independent from any future application shell.

Alternative approaches considered:

1. Next.js App Router: aligns with the source brief's `use client` wording, but introduces framework routing and server/client boundaries that are not needed for this standalone hero.
2. A static HTML/CSS implementation: lighter, but does not satisfy the requested React interaction model or provide a clean component boundary for later research.

## Experience architecture

The scene is a persistent spatial stage rather than a decorative image. The outer section is `250vh`; a sticky viewport remains fixed while the normalized document scroll progress drives the video, the right heading, and the scroll indicator.

### Scene base

- Background: `https://cdn.jiro.build/Wallet/Astro.mp4`
- Fallback: black surface with the supplied gradient overlays and readable headings when the video cannot load or play.
- Branding asset: `https://cdn.jiro.build/Wallet/Ardor.png`
- Layer order: video, non-interactive overlays, content, header controls, then drawer/modal layers.

### Foreground controls

- Wallet badge: toggles a simulated connected/disconnected state.
- Menu button: opens the right-side Portal Directory drawer.
- Contact Us: opens the Contact Wallet Agent modal.
- Drawer navigation: Connect Keystore triggers the simulated connection; the other items are presentational destinations for this first project.
- Contact form: controlled name, email, message fields; submit shows a confirmed state and auto-dismisses after 2.5 seconds.

### Motion model

- For progress below 0.95, pause the video and scrub `currentTime` across the first four seconds.
- At or above 0.95, disable native looping and play from four seconds; the tail segment loops through an explicit end handler.
- The left heading enters once from the left.
- The right heading maps opacity and horizontal offset to scroll progress.
- The scroll cue appears before 0.92 and disappears after it.
- Drawer and modal use Framer Motion transitions; Escape and backdrop click dismiss them.
- `prefers-reduced-motion` removes nonessential heading, cue, drawer, and modal motion while preserving content and state changes.

## Component boundaries

```text
wallet-finance-header/
  src/
    App.jsx
    components/WalletFinanceHeader.jsx
    main.jsx
    styles.css
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
  README.md
```

`WalletFinanceHeader` owns the scene, progress loop, media lifecycle, responsive breakpoint, and overlay state. Small local subcomponents inside that module own the header, drawer, modal, and status copy so the experience remains self-contained without speculative abstraction.

The progress controller uses `requestAnimationFrame` to coalesce scroll updates and a media ref to avoid touching `currentTime` before metadata is available. The video listener is removed on unmount; timers for success auto-dismiss are cleared on unmount or modal reset.

## Responsive and accessibility contract

- Mobile breakpoint: below 768px; heading sizes are 34px, 52px, and 70px across mobile, tablet, and desktop ranges.
- Desktop spacing follows the supplied 80px header/content offsets; mobile uses compact 16px/24px offsets.
- Drawer and modal are semantic dialog surfaces with labelled close buttons, visible focus styles, Escape support, backdrop dismissal, and focus return to the initiating control.
- Form controls have explicit labels and required-friendly input semantics.
- Decorative overlays and video do not capture pointer events.
- The page remains usable if autoplay is blocked, the CDN media is unavailable, or motion is reduced.

## Verification plan

| User phase | Requirement | Surface/state | Evidence | Owning stage | Status |
| --- | --- | --- | --- | --- | --- |
| Create subproject | Isolated project starts from the new directory | Desktop runtime | Start command and route | Stage 1 | continue |
| Scene and motion | Sticky 250vh scene, video scrub, tail loop, headings, cue | Desktop default and scroll end | Browser observations/screenshots | Stages 2–3 | continue |
| Foreground states | Wallet toggle, drawer, contact form, success, dismissal | Desktop interaction states | Browser interaction evidence | Stages 4–6 | continue |
| Responsive | Layout is legible and controls reachable | Tablet and 390px mobile | Browser screenshots/observations | Stage 7 | continue |
| Accessibility | Keyboard focus, Escape, semantic controls, reduced motion | Drawer/modal and reduced-motion boundary | Browser/DOM observation | Stages 5–7 | continue |
| Capability/performance | Video fallback and high-cost visual behavior are acceptable | Media failure/fallback and default load | Browser observation | Stage 8 | continue |
| Handoff | README and verification record explain how to run and what was checked | Repository | Files plus final audit | Stage 9 | continue |

## Out of scope

- Real wallet providers, signing, blockchain reads, or network switching.
- Server-side contact delivery or persistence.
- Additional pages, routing, dashboards, or research instrumentation.
- Replacing the supplied assets or changing the visual direction without a later scope revision.
