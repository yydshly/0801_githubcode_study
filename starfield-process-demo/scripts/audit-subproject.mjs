import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCENE_DEMOS, SKILL_RECIPES, THREEJS_SKILLS } from '../src/skills-catalog.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const upstreamRoot = resolve(root, '..', 'threejs-awesome-graphics-agent-skills-upstream');
const manifest = JSON.parse(readFileSync(join(root, 'PROJECT_MANIFEST.json'), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function skillIdsAt(directory) {
  assert(existsSync(directory), `Missing skill directory: ${directory}`);
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(directory, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .sort();
}

function findFiles(directory, targetName, output = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) findFiles(entryPath, targetName, output);
    else if (entry.name === targetName) output.push(entryPath);
  }
  return output;
}

function sameIds(left, right) {
  return left.length === right.length && left.every((id, index) => id === right[index]);
}

const upstreamPackage = JSON.parse(readFileSync(join(upstreamRoot, 'package.json'), 'utf8'));
const installManifest = JSON.parse(readFileSync(join(root, '.codex', 'skills', '.threejs-awesome-graphics-agent-skills.json'), 'utf8'));
const upstreamSkillIds = skillIdsAt(join(upstreamRoot, 'skills'));
const installedSkillIds = skillIdsAt(join(root, '.codex', 'skills'));
const catalogSkillIds = THREEJS_SKILLS.map((skill) => skill.id).sort();
const exampleFiles = findFiles(join(upstreamRoot, 'dev', 'example-gallery', 'examples'), 'example.json');
const exampleSkillIds = [...new Set(exampleFiles.map((file) => file.split(/[/\\]/).at(-3)))].sort();
const sceneIds = SCENE_DEMOS.map((scene) => scene.id);
const sceneHrefs = SCENE_DEMOS.map((scene) => scene.href);
const invalidSceneSkillRefs = SCENE_DEMOS.flatMap((scene) => scene.skills.map((item) => item.id)).filter((id) => !catalogSkillIds.includes(id));
const invalidRecipeSkillRefs = SKILL_RECIPES.flatMap((recipe) => recipe.skills).filter((id) => !catalogSkillIds.includes(id));
const demoGroups = Object.fromEntries(['direct', 'composed', 'product'].map((group) => [group, SCENE_DEMOS.filter((scene) => scene.group === group).length]));
const lineageSlugs = manifest.local.lineage.map((project) => project.slug);
const missingLineageDirectories = manifest.local.lineage
  .filter((project) => !existsSync(resolve(root, '..', project.directory)))
  .map((project) => project.directory);

assert(upstreamPackage.version === manifest.upstream.packageVersion, 'Upstream package version differs from PROJECT_MANIFEST.json');
assert(installManifest.version === manifest.local.installedVersion, 'Installed Skill version differs from PROJECT_MANIFEST.json');
assert(installManifest.completePack === true, 'Project-local Skill install is not marked complete');
assert(sameIds(upstreamSkillIds, installedSkillIds), 'Upstream and project-installed Skill IDs differ');
assert(sameIds(upstreamSkillIds, catalogSkillIds), 'Upstream and capability-catalog Skill IDs differ');
assert(upstreamSkillIds.length === manifest.upstream.skillCount, 'Upstream Skill count differs from manifest');
assert(installedSkillIds.length === manifest.local.installedSkillCount, 'Installed Skill count differs from manifest');
assert(exampleFiles.length === manifest.upstream.exampleCount, 'Upstream example count differs from manifest');
assert(exampleSkillIds.length === manifest.upstream.skillsWithExamples, 'Skills-with-examples count differs from manifest');
assert(SCENE_DEMOS.length === manifest.local.demos.total, 'Local demo count differs from manifest');
assert(demoGroups.direct === manifest.local.demos.direct && demoGroups.composed === manifest.local.demos.composed && demoGroups.product === manifest.local.demos.product, 'Demo truth-level counts differ from manifest');
assert(new Set(sceneIds).size === sceneIds.length, 'Duplicate local demo IDs found');
assert(new Set(sceneHrefs).size === sceneHrefs.length, 'Duplicate local demo links found');
assert(invalidSceneSkillRefs.length === 0, `Invalid Skill references in demos: ${invalidSceneSkillRefs.join(', ')}`);
assert(invalidRecipeSkillRefs.length === 0, `Invalid Skill references in recipes: ${invalidRecipeSkillRefs.join(', ')}`);
assert(manifest.local.pages.length === manifest.local.pageCount, 'Current page count differs from manifest');
assert(manifest.local.lineage.length === manifest.local.relatedProjectCount, 'Related project count differs from manifest');
assert(manifest.local.pageCount + manifest.local.relatedProjectCount === manifest.local.totalOwnedWebEntries, 'Owned web entry total differs from manifest');
assert(new Set(lineageSlugs).size === lineageSlugs.length, 'Duplicate research-lineage slugs found');
assert(missingLineageDirectories.length === 0, `Missing research-lineage directories: ${missingLineageDirectories.join(', ')}`);

const result = {
  status: 'pass',
  upstream: {
    version: upstreamPackage.version,
    skills: upstreamSkillIds.length,
    skillsWithExamples: exampleSkillIds.length,
    examples: exampleFiles.length,
  },
  local: {
    installedSkills: installedSkillIds.length,
    catalogSkills: catalogSkillIds.length,
    recipes: SKILL_RECIPES.length,
    demos: SCENE_DEMOS.length,
    demoGroups,
    pages: manifest.local.pageCount,
    relatedProjects: manifest.local.relatedProjectCount,
    totalOwnedWebEntries: manifest.local.totalOwnedWebEntries,
  },
  integrity: {
    upstreamEqualsInstalled: true,
    upstreamEqualsCatalog: true,
    invalidSceneSkillRefs: [],
    invalidRecipeSkillRefs: [],
    uniqueSceneIds: sceneIds.length,
    uniqueSceneHrefs: sceneHrefs.length,
  },
};

console.log(JSON.stringify(result, null, 2));
