# Wallet Finance Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first isolated Wallet research subproject: a runnable, responsive, scroll-scrubbed crypto/finance hero with a cinematic space video, split headings, a portal drawer, and a contact modal.

**Architecture:** Use a Vite + React application inside `wallet-finance-header/`. A single `WalletFinanceHeader` experience owns the sticky scene, scroll progress, media lifecycle, responsive breakpoint, and foreground state; local render helpers keep the header, drawer, modal, and status copy readable without introducing speculative app-wide abstractions.

**Tech Stack:** React, Vite, Tailwind CSS 3, Framer Motion, lucide-react, CSS media queries, native HTML video.

## Global Constraints

- Create only the new `wallet-finance-header/` subproject and required verification documentation; do not alter unrelated workspace files.
- The outer scene must remain `250vh` with a `100vh` sticky viewport.
- Use the supplied CDN assets: `https://cdn.jiro.build/Wallet/Astro.mp4` and `https://cdn.jiro.build/Wallet/Ardor.png`.
- Use `Anybody` for headings/logo and a monospace face for small status labels; keep font/reset styles scoped to the Wallet section.
- Install only React, Tailwind CSS, Framer Motion, and lucide-react plus the minimum Vite/Tailwind build tooling.
- Preserve the exact supplied English UI copy: `Connect your wallet`, `Hold the Future in Your Hands.`, `SCROLL TO PLAY UNIVERSE`, `PORTAL DIRECTORY`, `Contact Wallet Agent`, and the listed drawer/form/status labels.
- Keep video and overlay layers non-interactive; header controls must remain reachable above them.
- Provide black/gradient fallback content when media cannot load or autoplay is blocked.
- Verify desktop, tablet, 390px mobile, drawer/modal states, keyboard dismissal, reduced motion behavior, and the production build before handoff.

---

### Task 1: Scaffold the isolated Vite project

**Files:**
- Create: `wallet-finance-header/package.json`
- Create: `wallet-finance-header/index.html`
- Create: `wallet-finance-header/vite.config.js`
- Create: `wallet-finance-header/postcss.config.js`
- Create: `wallet-finance-header/tailwind.config.js`
- Create: `wallet-finance-header/src/main.jsx`
- Create: `wallet-finance-header/src/App.jsx`
- Create: `wallet-finance-header/src/styles.css`

**Interfaces:**
- Produces: an npm project with `dev`, `build`, and `preview` scripts; `src/main.jsx` mounts `<App />`; `App.jsx` renders the future `WalletFinanceHeader` component.

- [ ] **Step 1: Write the package manifest and build configuration**

Use this dependency shape so the project is isolated and reproducible:

```json
{
  "name": "wallet-finance-header",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.7"
  }
}
```

Configure Vite with the React plugin, Tailwind to scan `index.html` and `src/**/*.{js,jsx}`, and PostCSS with Tailwind plus Autoprefixer.

- [ ] **Step 2: Add the minimal mount and title**

`index.html` must set the document title to `Finance Header - Wallet`, include the root element, and avoid inline global visual styling. `src/main.jsx` must import `./styles.css`, create the root with `createRoot`, and render `<App />`.

- [ ] **Step 3: Add the scoped Tailwind entry and placeholder app**

`src/styles.css` must contain the three Tailwind layers plus only scoped Wallet rules. `App.jsx` must temporarily render a `WalletFinanceHeader` import inside a `main` element; the component can be a minimal placeholder until Task 2.

- [ ] **Step 4: Install dependencies and verify the scaffold**

Run from `F:\0801_codex_project\wallet-finance-header`:

```powershell
npm install
npm run build
```

Expected: dependency installation succeeds and Vite produces `dist/` without syntax or configuration errors.

- [ ] **Step 5: Commit the scaffold**

```powershell
git -c safe.directory=F:/0801_codex_project add wallet-finance-header
git -c safe.directory=F:/0801_codex_project commit -m "feat: scaffold Wallet finance header app"
```

### Task 2: Implement the persistent scene and scroll timeline

**Files:**
- Create: `wallet-finance-header/src/components/WalletFinanceHeader.jsx`
- Modify: `wallet-finance-header/src/App.jsx`
- Modify: `wallet-finance-header/src/styles.css`

**Interfaces:**
- Produces: `WalletFinanceHeader()` with a `250vh` outer section, sticky stage, media ref, normalized `progress` state, and safe media fallback flags.

- [ ] **Step 1: Add the scene shell and media layers**

Render this layer order:

```jsx
<section className="wallet-section relative h-[250vh] w-full select-none bg-black text-white">
  <div className="sticky top-0 h-screen w-full overflow-hidden">
    <video ref={videoRef} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
    {/* header/content/foreground layers */}
  </div>
</section>
```

Use the Astro URL, `opacity: 0.9`, and a `videoError` state to apply a fallback class when the media emits `error` or cannot be used.

- [ ] **Step 2: Add normalized scroll progress with requestAnimationFrame**

Define the local helpers and state with these signatures:

```js
const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const getScrollProgress = () => {
  const runway = document.documentElement.scrollHeight - window.innerHeight;
  return runway > 0 ? clamp(window.scrollY / runway) : 0;
};
```

Register one passive scroll listener that schedules one RAF update, set `progress`, and cancel the pending RAF on unmount. Register a resize listener to maintain `isMobile = window.innerWidth < 768`.

- [ ] **Step 3: Implement the four-second scrub and tail loop**

On `loadedmetadata`, mark the media ready and call the progress synchronizer. While `progress < 0.95`, pause the video and set `currentTime = progress * 4` only when metadata is ready. At `progress >= 0.95`, set `loop = false`, ensure `currentTime >= 4`, and call `video.play().catch(() => setVideoBlocked(true))`. Register `timeupdate` and `ended` handlers that snap the tail back to 4 seconds when `duration > 4` and the current time reaches `duration - 0.2`.

When `prefers-reduced-motion` is enabled, keep the video paused at a stable first-frame/fallback state rather than forcing scroll-driven media movement.

- [ ] **Step 4: Render the initial headings and scroll cue**

Use Framer Motion for the left heading with `initial={{ opacity: 0, x: -40 }}` and `animate={{ opacity: 1, x: 0 }}` over one second with `cubic-bezier(0.16, 1, 0.3, 1)`. Drive the right heading using:

```js
const rightOpacity = clamp((progress - 0.1) / 0.8);
const rightOffset = (1 - rightOpacity) * (isMobile ? 30 : 120);
```

Render the scroll cue only while `progress < 0.92`, with a bouncing `ChevronDown` and the exact label `SCROLL TO PLAY UNIVERSE`.

- [ ] **Step 5: Build and inspect the scene**

Run `npm run build`, then start the dev server and confirm the page is not blank, the outer document is taller than one viewport, and the right heading responds to scroll.

- [ ] **Step 6: Commit the scene timeline**

```powershell
git -c safe.directory=F:/0801_codex_project add wallet-finance-header/src
git -c safe.directory=F:/0801_codex_project commit -m "feat: add Wallet scroll-scrubbed scene"
```

### Task 3: Add header composition, branding, and responsive typography

**Files:**
- Modify: `wallet-finance-header/src/components/WalletFinanceHeader.jsx`
- Modify: `wallet-finance-header/src/styles.css`

**Interfaces:**
- Consumes: `isMobile`, `progress`, `videoBlocked`, and the scene layer from Task 2.
- Produces: a responsive header and exact split heading composition with semantic buttons.

- [ ] **Step 1: Add the Wallet badge**

Render a `button` with `aria-pressed={isConnected}`, the Ardor image, and the `Wallet` label. Keep the glass treatment scoped to the section, use `referrerPolicy="no-referrer"`, and toggle the simulated connection state on click.

- [ ] **Step 2: Add the right-side actions**

Render a labelled icon-only menu button with `Menu` and a `Contact Us` button with `ArrowUpRight` only if the supplied button copy and icon layout need it; the label must remain readable at 14px mobile and 18px desktop. Both controls require visible `:focus-visible` styles and active/hover states.

- [ ] **Step 3: Add the two heading blocks**

Render `Connect your\nwallet` at the supplied left/top offsets and `Hold the Future\nin Your Hands.` at the supplied right/bottom offsets. Use `.anybody-heading` with exact responsive sizes: 34px below 768px, 52px from 768px through 1023px, and 70px from 1024px upward.

- [ ] **Step 4: Verify breakpoint layout**

At 1440px, 1024px, and 390px widths, confirm the header controls do not overlap the headings, the right heading stays inside the viewport, and no horizontal scrollbar is introduced.

- [ ] **Step 5: Commit header composition**

```powershell
git -c safe.directory=F:/0801_codex_project add wallet-finance-header/src
git -c safe.directory=F:/0801_codex_project commit -m "feat: add Wallet header composition"
```

### Task 4: Implement the Portal Directory drawer

**Files:**
- Modify: `wallet-finance-header/src/components/WalletFinanceHeader.jsx`
- Modify: `wallet-finance-header/src/styles.css`

**Interfaces:**
- Consumes: `isDrawerOpen`, `setIsDrawerOpen`, `setIsConnected`, and the menu button ref.
- Produces: an animated fixed drawer with semantic navigation, status footer, backdrop dismissal, Escape dismissal, scroll lock, and focus return.

- [ ] **Step 1: Add the drawer state and menu trigger**

Use `isDrawerOpen` and `drawerTriggerRef`. The menu button sets the state to `true`; opening the drawer stores the initiating element and focuses the close button after the panel mounts.

- [ ] **Step 2: Render the drawer panel**

Render a fixed full-screen `role="presentation"` backdrop and a right-aligned `aside` with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. Include the triangle SVG, `PORTAL DIRECTORY`, close button, and four supplied nav items. `Connect Keystore` sets `isConnected(true)` and closes the drawer.

- [ ] **Step 3: Add status footer and close behavior**

Render `NETWORK STATUS: ACTIVE MAINNET` and `LATENCY: 14ms (DECENTRALIZED)`. Close on the close button, backdrop click, and Escape. Restore focus to the menu trigger after close and set `document.body.style.overflow = "hidden"` only while the drawer is open, restoring the previous value on cleanup.

- [ ] **Step 4: Verify the drawer journey**

Open it with the menu button, activate `Connect Keystore`, close it with Escape, click outside it, and use Tab to confirm the close button and nav items remain reachable. Confirm the page beneath remains visible through the dim backdrop.

- [ ] **Step 5: Commit the drawer**

```powershell
git -c safe.directory=F:/0801_codex_project add wallet-finance-header/src
git -c safe.directory=F:/0801_codex_project commit -m "feat: add Wallet portal drawer"
```

### Task 5: Implement the Contact Wallet Agent modal

**Files:**
- Modify: `wallet-finance-header/src/components/WalletFinanceHeader.jsx`
- Modify: `wallet-finance-header/src/styles.css`

**Interfaces:**
- Consumes: `isContactOpen`, `contactTriggerRef`, and local controlled form state.
- Produces: an animated modal with labelled fields, submit feedback, auto-dismiss timer, Escape/backdrop dismissal, and focus return.

- [ ] **Step 1: Add controlled form state**

Use one state object `{ name: "", email: "", message: "" }`, one `isSubmitted` flag, and one timer ref. The form uses labels `Your Name`, `Secure Email Address`, and `Transmission Message` with the supplied placeholders.

- [ ] **Step 2: Render the modal and form**

Render a fixed `role="dialog"` panel labelled `Contact Wallet Agent`. Use `input`/`textarea` elements with `name`, `id`, `value`, `onChange`, and `required` for all three fields. The submit button includes `Send` and `Transmit Secure Message`.

- [ ] **Step 3: Add success state and dismissal**

On submit, prevent default, set `isSubmitted(true)`, and schedule a 2500ms timer that resets the success state, closes the modal, and clears the form. Render the emerald check circle, `Transmission Confirmed`, and the supplied confirmation copy. Clear the timer on unmount or close.

- [ ] **Step 4: Verify modal behavior**

Open from Contact Us, enter values, submit, observe the success state, dismiss with Escape and backdrop click, and confirm focus returns to Contact Us. Confirm body scroll lock does not leak after close.

- [ ] **Step 5: Commit the modal**

```powershell
git -c safe.directory=F:/0801_codex_project add wallet-finance-header/src
git -c safe.directory=F:/0801_codex_project commit -m "feat: add Wallet contact modal"
```

### Task 6: Finish visual polish, fallback, and project documentation

**Files:**
- Modify: `wallet-finance-header/src/components/WalletFinanceHeader.jsx`
- Modify: `wallet-finance-header/src/styles.css`
- Create: `wallet-finance-header/README.md`
- Create: `docs/superpowers/coverage/2026-08-02-wallet-finance-header-verification.md`

**Interfaces:**
- Consumes: all scene and foreground states from Tasks 2–5.
- Produces: a self-contained, documented, reduced-motion-aware surface ready for browser validation.

- [ ] **Step 1: Add the final scoped visual system**

Add the Google Fonts import for Anybody, the `.wallet-section` font-family scope, `.anybody-heading` media-query sizes, monospace status tokens, glass control tokens, focus-visible outline, and `@media (prefers-reduced-motion: reduce)` rules. Do not add `body`, `html`, or universal selector resets.

- [ ] **Step 2: Add media fallback copy and loading behavior**

If `videoBlocked` or `videoError` is true, retain the overlay and headings and render a small non-blocking `UNIVERSE FEED: VISUAL FALLBACK` status near the lower edge. The fallback must not cover controls or prevent the primary journey.

- [ ] **Step 3: Add the README**

Document:

```text
cd wallet-finance-header
npm install
npm run dev
```

Include the production build command, the CDN media assumption, the simulated-only nature of wallet/contact actions, and the supported desktop/tablet/mobile behavior.

- [ ] **Step 4: Create the verification record**

Copy the design contract's coverage rows into `docs/superpowers/coverage/2026-08-02-wallet-finance-header-verification.md`, replacing each `continue` with the observed evidence path, command, browser state, or a valid capability boundary. Include the final dev URL, viewport sizes, and any remaining non-blocking media limitation.

- [ ] **Step 5: Run the production build**

Run:

```powershell
Set-Location F:\0801_codex_project\wallet-finance-header
npm run build
```

Expected: Vite completes with no errors and the generated `dist/` is present.

- [ ] **Step 6: Commit the finished implementation before browser refinement**

```powershell
git -c safe.directory=F:/0801_codex_project add wallet-finance-header docs/superpowers/coverage/2026-08-02-wallet-finance-header-verification.md
git -c safe.directory=F:/0801_codex_project commit -m "feat: complete Wallet finance header experience"
```

### Task 7: Run browser evidence and close the delivery audit

**Files:**
- Modify: `docs/superpowers/coverage/2026-08-02-wallet-finance-header-verification.md`
- Modify: `wallet-finance-header/README.md` only if the verified run command or boundary differs

**Interfaces:**
- Consumes: the runnable app and all required coverage rows.
- Produces: real browser evidence for the primary journey, responsive surfaces, interaction states, and the final handoff.

- [ ] **Step 1: Start the canonical dev server**

Run from `wallet-finance-header`:

```powershell
npm run dev -- --host 127.0.0.1 --port 4173
```

Use `http://127.0.0.1:4173/` as the canonical URL in the verification record.

- [ ] **Step 2: Capture desktop default and scroll evidence**

At 1440x900, inspect the initial scene, scroll through the 250vh runway, confirm the right heading and cue transition, and inspect the end state. Record whether the media loaded; if the browser blocks the CDN media, record the fallback observation rather than treating it as a code failure.

- [ ] **Step 3: Capture foreground interaction evidence**

At the desktop viewport, verify Wallet toggle, drawer open/close/Escape/backdrop, Connect Keystore, Contact modal open/close, required form controls, success confirmation, and timer dismissal. Confirm focus returns to the initiating control.

- [ ] **Step 4: Capture tablet and 390px mobile evidence**

At 1024px and 390px widths, verify title wrapping, header control reachability, drawer width/scroll behavior, modal padding, no horizontal overflow, and the primary scroll interaction.

- [ ] **Step 5: Run keyboard and reduced-motion checks**

Use keyboard navigation to reach every header action, activate drawer/modal, dismiss with Escape, and observe focus-visible styles. Enable reduced motion in the browser/OS route available in the environment and confirm nonessential motion is removed while content and state changes remain available.

- [ ] **Step 6: Run the final engineering audit**

Run `npm run build`, inspect the browser console for errors, check `git status`, and ensure every coverage row is `pass` or has an explicitly documented non-blocking boundary with a retest trigger. No executable `continue` row may remain in the final record.

- [ ] **Step 7: Commit the evidence record**

```powershell
git -c safe.directory=F:/0801_codex_project add docs/superpowers/coverage/2026-08-02-wallet-finance-header-verification.md wallet-finance-header/README.md
git -c safe.directory=F:/0801_codex_project commit -m "docs: record Wallet header verification"
```

## Plan self-review

- Spec coverage: the plan covers the 250vh stage, sticky viewport, CDN media, four-second scrub, tail loop, heading motion, scroll cue, header controls, drawer, modal, success timer, responsive breakpoints, reduced motion, fallback, scoped styling, documentation, and browser evidence.
- Placeholder scan: no prohibited placeholder marker or vague implementation-only step is required; every code task names exact files, behavior, commands, and expected evidence.
- Type/contract consistency: `progress`, `isMobile`, `isDrawerOpen`, `isContactOpen`, `isConnected`, `videoBlocked`, and the three-field contact object are introduced once and consumed consistently by later tasks.
