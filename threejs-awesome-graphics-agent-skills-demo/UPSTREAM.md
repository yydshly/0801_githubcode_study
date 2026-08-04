# Upstream Installation Record

- Repository: <https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills>
- npm package: `threejs-awesome-graphics-agent-skills`
- Installed version: `0.6.0`
- Install target: `./.agents/skills`
- Install command:

```powershell
npx --no-install threejs-awesome-graphics-agent-skills install --agent custom --path .agents/skills --force
```

The package installs 24 skills, including `threejs-skill-router`, `threejs-camera-direction`, `threejs-procedural-materials`, `threejs-procedural-fields`, `threejs-procedural-vfx`, `threejs-spectral-ocean`, `threejs-water-optics`, `threejs-bloom`, `threejs-exposure-color-grading`, `threejs-image-pipeline` and `threejs-visual-validation`.

The visual demo is an application-level translation of selected skill contracts. The skill pack itself is instructional/runtime-agent content; it is not imported by the browser as a Three.js rendering dependency.

## README proof assets

For the local learning guide, the two upstream README proof images are copied to:

```text
./public/assets/upstream/example_gallery.jpeg
./public/assets/upstream/spectral_ocean.jpeg
```

They are used as attributed research evidence only. The actual interactive examples are served by the separately cloned upstream repository's `dev/example-gallery`; see [`UPSTREAM_GALLERY_EVIDENCE.md`](./UPSTREAM_GALLERY_EVIDENCE.md).
