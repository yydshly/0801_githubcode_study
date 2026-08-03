import { copyFile, cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, "..");
const outputRoot = resolve(workspaceRoot, ".pages");
const installDependencies = process.argv.includes("--install");
const baseArgument = process.argv.find((argument) => argument.startsWith("--base="));
const requestedBase = baseArgument ? baseArgument.slice("--base=".length) : "/";
if (!/^\/[A-Za-z0-9._~/-]*$/.test(requestedBase)) {
  throw new Error(`Invalid base path: ${requestedBase}`);
}
const basePath = `/${requestedBase.split("/").filter(Boolean).join("/")}${requestedBase === "/" ? "" : "/"}`;

function resolveInside(root, candidate) {
  if (isAbsolute(candidate)) throw new Error(`Absolute paths are not allowed: ${candidate}`);
  const resolved = resolve(root, candidate);
  const relation = relative(root, resolved);
  if (relation.startsWith("..") || relation.includes(`..${sep}`)) {
    throw new Error(`Path escapes its allowed root: ${candidate}`);
  }
  return resolved;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function run(command, args, cwd) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", rejectRun);
    child.on("exit", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function ensureExists(path, label) {
  try { await stat(path); }
  catch { throw new Error(`${label} does not exist: ${path}`); }
}

async function copyStaticProject(project, sourceRoot, destinationRoot) {
  if (!Array.isArray(project.publish) || project.publish.length === 0) {
    throw new Error(`Static project ${project.slug} must declare a non-empty publish list.`);
  }
  for (const item of project.publish) {
    const source = resolveInside(sourceRoot, item);
    const destination = resolveInside(destinationRoot, item);
    await ensureExists(source, `Publish item for ${project.slug}`);
    await mkdir(dirname(destination), { recursive: true });
    const sourceStat = await stat(source);
    if (sourceStat.isDirectory()) await cp(source, destination, { recursive: true });
    else await copyFile(source, destination);
  }
}

async function buildViteProject(project, sourceRoot, destinationRoot, projectBase) {
  const npmCommand = "npm";
  if (installDependencies) await run(npmCommand, ["ci"], sourceRoot);
  await run(npmCommand, ["run", "build", "--", `--base=${projectBase}`], sourceRoot);
  const buildOutput = resolveInside(sourceRoot, project.output || "dist");
  await ensureExists(buildOutput, `Build output for ${project.slug}`);
  await cp(buildOutput, destinationRoot, { recursive: true });
}

function renderCard(project, repositoryUrl) {
  const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const demoUrl = `${basePath}projects/${encodeURIComponent(project.slug)}/`;
  const docsUrl = `${repositoryUrl}/blob/master/${project.docs.split("/").map(encodeURIComponent).join("/")}`;
  return `<article class="project-card">
            <div class="project-meta"><span>Research ${escapeHtml(project.id)} · ${escapeHtml(project.type)}</span><span class="status">${escapeHtml(project.status)}</span></div>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.summary)}</p>
            <div class="tags" aria-label="技术标签">${tags}</div>
            <div class="card-actions"><a class="primary" href="${demoUrl}">打开 Demo →</a><a href="${docsUrl}">项目说明</a></div>
          </article>`;
}

const configPath = resolve(workspaceRoot, "research-projects.json");
const templatePath = resolve(workspaceRoot, "research-site", "index.template.html");
const stylePath = resolve(workspaceRoot, "research-site", "styles.css");
const config = JSON.parse(await readFile(configPath, "utf8"));
const projects = config.projects.filter((project) => project.enabled);

if (new Set(projects.map((project) => project.slug)).size !== projects.length) {
  throw new Error("Every enabled project must have a unique slug.");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(resolve(outputRoot, "projects"), { recursive: true });

for (const project of projects) {
  const sourceRoot = resolveInside(workspaceRoot, project.directory);
  const destinationRoot = resolveInside(outputRoot, join("projects", project.slug));
  const projectBase = `${basePath}projects/${project.slug}/`;
  await ensureExists(sourceRoot, `Project directory for ${project.slug}`);
  await mkdir(destinationRoot, { recursive: true });

  if (project.type === "static") await copyStaticProject(project, sourceRoot, destinationRoot);
  else if (project.type === "vite") await buildViteProject(project, sourceRoot, destinationRoot, projectBase);
  else throw new Error(`Unsupported project type: ${project.type}`);
}

const template = await readFile(templatePath, "utf8");
const portal = template
  .replaceAll("{{SITE_TITLE}}", escapeHtml(config.siteTitle))
  .replaceAll("{{SITE_DESCRIPTION}}", escapeHtml(config.siteDescription))
  .replaceAll("{{REPOSITORY_URL}}", escapeHtml(config.repositoryUrl))
  .replaceAll("{{BASE_PATH}}", escapeHtml(basePath))
  .replaceAll("{{PROJECT_COUNT}}", String(projects.length))
  .replaceAll("{{PROJECT_CARDS}}", projects.map((project) => renderCard(project, config.repositoryUrl)).join("\n"))
  .replaceAll("{{UPDATED_AT}}", new Date().toISOString().slice(0, 10));

await writeFile(resolve(outputRoot, "index.html"), portal, "utf8");
await copyFile(stylePath, resolve(outputRoot, "styles.css"));
await writeFile(resolve(outputRoot, ".nojekyll"), "", "utf8");
await writeFile(
  resolve(outputRoot, "projects.json"),
  `${JSON.stringify(projects.map(({ directory, output, publish, ...publicProject }) => publicProject), null, 2)}\n`,
  "utf8",
);

console.log(`Built ${projects.length} research projects in ${outputRoot}`);
console.log(`Base path: ${basePath}`);
