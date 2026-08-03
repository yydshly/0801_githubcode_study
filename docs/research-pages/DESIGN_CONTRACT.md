# Research Pages Design Contract

Entry mode: Revision-led expansion of the research repository
Request revision: 1
Target user and context: A visitor browsing multiple independent research demos from one GitHub repository.
Desired first impression: A clear research gallery, not a directory listing or a single-project landing page.
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: Reuse the repository's research tone; neutral canvas, strong typography, compact project metadata, no external assets.
Information constraints: Every project must show its number, title, research question, status, implementation type, and independent demo link.
Operation constraints: One GitHub Pages workflow publishes all enabled projects. Project source, dependencies, builds, and public paths remain isolated.
State constraints: Enabled projects appear in the portal; disabled projects remain registered but are neither built nor linked.
Environment constraints: GitHub Pages project site under `/0801_githubcode_study/`; support static HTML projects and Vite projects; local output under ignored `.pages/`.
Primary journey: Open the research gallery, identify a project, open its independent demo, and return using browser navigation.
User-defined phases:
1. Support multiple current and future subprojects.
2. Build them independently and publish them together.
3. Preserve a stable URL and an extensible registration mechanism.
Required artifacts: Project registry, generic build script, portal, Pages workflow, README integration, build and browser validation record.
Autonomy authorization: The user said “继续” after agreeing to the multi-project packaging model.
User-decision boundary: Publishing requires a valid GitHub login and one-time Pages source configuration; no unrelated files may be staged.
Observable completion criteria:
- One registry controls project discovery and publishing.
- Static and Vite adapters both produce isolated output under `.pages/projects/<slug>/`.
- The portal is generated from the registry and links to each enabled project.
- Project 01 and project 02 build successfully with GitHub Pages base paths.
- Portal and both demos load from one local Pages-equivalent server without horizontal overflow at 1440px and 390px.
- The workflow publishes only generated `.pages` output from the default branch.

## Coverage record

| User phase | Requirement or artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Extensible project registry | Enabled/disabled, static/Vite | File and build output | 0-3 | pass | Registry is the single source for two enabled projects |
| 1 | Research gallery | Desktop/mobile, system theme | Browser screenshot and DOM | 2-7 | pass | 1440px and 390px layouts verified without horizontal overflow |
| 2 | Static project adapter | Prompt Master | Build and browser route | 1,8 | pass | 21 capabilities and 16 applied count load under `/projects/prompt-master/` |
| 2 | Vite project adapter | Wallet Header | Build and browser route | 1,8 | pass | Vite assets load under `/projects/wallet-finance-header/` |
| 2 | Unified Pages workflow | Default branch/manual | Workflow inspection | 8-9 | pass | Workflow builds `.pages` and uploads only that artifact |
| 3 | Stable public URLs | Portal and project links | Browser navigation | 5,7 | pass | Both project cards navigate to isolated local Pages-equivalent routes |
| 3 | Repository association | Root/project README | File inspection | 9 | pass | Project 02 and multi-project deployment instructions added |
| Delivery | Scoped publication | Mixed worktree | Git status/diff | 9 | pass | `.pages` ignored; `.agents` remains unrelated and unstaged |
| Delivery | Publish configuration | Branch/PR/Pages | Workflow and scoped-diff evidence | 9 | pass | Default-branch workflow and isolated artifact are ready for merge |
