import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const volumes = [
  {
    number: "01", title: "Finance Header", shortTitle: "Wallet", subtitle: "用滚动控制视觉时间轴",
    kind: "已完成研究", discipline: "Interface Motion",
    summary: "把一段预渲染视频、滚动进度和 HTML 界面叠层组合成沉浸式金融入口。",
    question: "如何用可控成本还原电影感 Header？", value: "理解滚动叙事、视觉节奏与交互降级。",
    status: "已完成 · 可运行", form: "视频时间轴", color: "#213a31", accent: "#d7b768", ink: "#183127",
    background: "#101716", cover: "./assets/covers/finance-header.webp",
    width: 1.46, height: 2.95, depth: .42, tilt: -.045, href: "../../wallet-finance-header/"
  },
  {
    number: "02", title: "Prompt Master", shortTitle: "Prompt", subtitle: "把模糊意图变成执行契约",
    kind: "研究样例", discipline: "Agent Direction",
    summary: "对比原始需求与规范化 Codex Prompt，展示范围、约束、验收标准和停止条件如何提升执行质量。",
    question: "怎样让 Agent 准确理解并完成任务？", value: "形成可复用、可验证的任务表达结构。",
    status: "研究样例 · 可运行", form: "前后对照", color: "#a6533d", accent: "#f1d5a4", ink: "#fff0cf",
    background: "#1d1413", cover: "./assets/covers/prompt-master.webp",
    width: 1.35, height: 2.68, depth: .38, tilt: .035, href: "../../prompt-master/"
  },
  {
    number: "03", title: "Complete Shelf", shortTitle: "Shelf", subtitle: "把精选项目变成空间目录",
    kind: "当前研究", discipline: "Spatial Catalog",
    summary: "研究书架隐喻、材质感和状态化动画如何提升少量精选产品的展示记忆点。",
    question: "怎样让研究目录不再只是卡片列表？", value: "获得可用于产品、作品和能力展示的空间入口。",
    status: "Research 03 · 当前项目", form: "交互式 3D 书架", color: "#9eb436", accent: "#dcea65", ink: "#181a16",
    background: "#171a12", cover: "./assets/covers/complete-shelf.webp",
    width: 1.56, height: 3.1, depth: .44, tilt: -.008, href: "../"
  },
  {
    number: "04", title: "Signal Radar", shortTitle: "Radar", subtitle: "从信息噪声提取可信变化",
    kind: "概念方向", discipline: "Information Intelligence",
    summary: "围绕来源治理、变化检测、多源验证与证据驱动摘要，探索可长期运行的 AI 信息探测产品。",
    question: "什么变化真正值得用户现在关注？", value: "把大量内容压缩成少量可信、可解释信号。",
    status: "概念研究 · 尚未实现", form: "信号与证据链", color: "#245260", accent: "#a9d8d5", ink: "#173b44",
    background: "#10191c", cover: "./assets/covers/signal-radar.webp",
    width: 1.43, height: 2.82, depth: .4, tilt: .042, href: null
  },
  {
    number: "05", title: "Infinite Mentor", shortTitle: "Mentor", subtitle: "用模拟与反馈训练真实能力",
    kind: "概念方向", discipline: "Personal Learning",
    summary: "通过真实错误模拟、关键概念追问、个性化路线和长期进步反馈，让 AI 从回答者变成训练系统。",
    question: "AI 如何帮助用户真正成长，而非只给答案？", value: "建立练习、反馈、验证和长期记忆闭环。",
    status: "概念研究 · 尚未实现", form: "能力训练系统", color: "#5a3f64", accent: "#d9b9dd", ink: "#f6ead9",
    background: "#1a141c", cover: "./assets/covers/infinite-mentor.webp",
    width: 1.52, height: 3, depth: .43, tilt: -.035, href: null
  },
  {
    number: "06", title: "Evidence Loop", shortTitle: "Proof", subtitle: "让每次实现都有浏览器证据",
    kind: "研究方法", discipline: "Verification Craft",
    summary: "把真实运行、浏览器观察、最小修正和相邻回归检查固定成研究项目的完成标准。",
    question: "怎样证明一个视觉实现真的可用？", value: "减少只看源码或只看构建成功造成的误判。",
    status: "持续采用 · 方法论", form: "证据闭环", color: "#a66d2f", accent: "#e8bd68", ink: "#40301c",
    background: "#1b1711", cover: "./assets/covers/evidence-loop.webp",
    width: 1.38, height: 2.72, depth: .39, tilt: .025, href: null
  }
];

const experience = document.querySelector("#experience");
const canvas = document.querySelector("#scene");
const selectionNumber = document.querySelector("#selectionNumber");
const selectionKind = document.querySelector("#selectionKind");
const selectionTitle = document.querySelector("#selectionTitle");
const selectionSubtitle = document.querySelector("#selectionSubtitle");
const detailPanel = document.querySelector("#detailPanel");
const detailIndex = document.querySelector("#detailIndex");
const detailTitle = document.querySelector("#detailTitle");
const detailSummary = document.querySelector("#detailSummary");
const detailQuestion = document.querySelector("#detailQuestion");
const detailValue = document.querySelector("#detailValue");
const detailStatus = document.querySelector("#detailStatus");
const detailForm = document.querySelector("#detailForm");
const projectLink = document.querySelector("#projectLink");
const openDetailButton = document.querySelector("#openDetail");
const closeDetailButton = document.querySelector("#closeDetail");
const openBookButton = document.querySelector("#openBook");
const previousButton = document.querySelector("#previousBook");
const nextButton = document.querySelector("#nextBook");
const markersElement = document.querySelector("#markers");
const liveRegion = document.querySelector("#liveRegion");
const query = new URLSearchParams(window.location.search);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || query.has("reduced-motion");
const forcedFallback = query.has("fallback");
document.documentElement.dataset.reducedMotion = reducedMotion ? "true" : "false";

let renderer;
let scene;
let camera;
let bookStage;
let accentLight;
let books = [];
let selectedIndex = 2;
let hoveredIndex = -1;
let mode = "shelf";
let readingOpen = false;
let lastWheelTime = 0;
let inspectYaw = -.12;
let inspectPitch = .035;
let pointerDown = null;
let themeTarget = new THREE.Color("#17181a");

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(3, 3);
const clock = new THREE.Clock();
const tempPosition = new THREE.Vector3();
const neutralScene = new THREE.Color("#17181a");
const activeTint = new THREE.Color();
const mutedTint = new THREE.Color("#a9a6a0");

function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
  });
}

function fitCoverImage(context, image, width, height) {
  if (!image) return;
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  if (sourceRatio > targetRatio) {
    const sourceWidth = image.height * targetRatio;
    context.drawImage(image, (image.width - sourceWidth) / 2, 0, sourceWidth, image.height, 0, 0, width, height);
  } else {
    const sourceHeight = image.width / targetRatio;
    context.drawImage(image, 0, (image.height - sourceHeight) / 2, image.width, sourceHeight, 0, 0, width, height);
  }
}

function drawWrappedTitle(context, title, x, y, maxWidth, lineHeight) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  lines.slice(0, 2).forEach((item, index) => context.fillText(item, x, y + index * lineHeight));
}

function makeCoverTexture(volume, image, spine = false) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = spine ? 240 : 768;
  textureCanvas.height = 1152;
  const context = textureCanvas.getContext("2d");
  const width = textureCanvas.width;
  const height = textureCanvas.height;

  context.fillStyle = volume.color;
  context.fillRect(0, 0, width, height);

  if (spine) {
    const spineShade = context.createLinearGradient(0, 0, width, 0);
    spineShade.addColorStop(0, "rgba(0,0,0,.24)");
    spineShade.addColorStop(.45, "rgba(255,255,255,.08)");
    spineShade.addColorStop(1, "rgba(0,0,0,.16)");
    context.fillStyle = spineShade;
    context.fillRect(0, 0, width, height);
    context.fillStyle = volume.accent;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(Math.PI / 2);
    context.font = '650 47px "Segoe UI", "Microsoft YaHei", sans-serif';
    context.letterSpacing = "5px";
    context.fillText(volume.title.toUpperCase(), 0, 0);
    context.restore();
    context.font = '750 31px "Segoe UI", sans-serif';
    context.fillText(volume.number, width / 2, height - 62);
  } else {
    fitCoverImage(context, image, width, height);
    const topShade = context.createLinearGradient(0, 0, 0, 250);
    topShade.addColorStop(0, "rgba(10,10,10,.34)");
    topShade.addColorStop(1, "rgba(10,10,10,0)");
    context.fillStyle = topShade;
    context.fillRect(0, 0, width, 250);

    const bottomShade = context.createLinearGradient(0, height * .58, 0, height);
    bottomShade.addColorStop(0, "rgba(12,12,12,0)");
    bottomShade.addColorStop(1, volume.number === "03" || volume.number === "06" ? "rgba(245,239,211,.82)" : "rgba(10,10,10,.58)");
    context.fillStyle = bottomShade;
    context.fillRect(0, height * .58, width, height * .42);

    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    context.fillStyle = volume.number === "03" || volume.number === "06" ? volume.ink : "#f5ead7";
    context.font = '750 24px "Segoe UI", "Microsoft YaHei", sans-serif';
    context.letterSpacing = "5px";
    context.fillText(`0801  /  VOLUME ${volume.number}`, 62, 76);

    context.font = '400 68px "Times New Roman", "Noto Serif SC", serif';
    drawWrappedTitle(context, volume.title, 62, height - 176, width - 124, 72);
    context.font = '700 22px "Segoe UI", "Microsoft YaHei", sans-serif';
    context.letterSpacing = "3px";
    context.fillText(volume.discipline.toUpperCase(), 62, height - 56);
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
}

function makePageTexture(volume) {
  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = 640;
  pageCanvas.height = 960;
  const context = pageCanvas.getContext("2d");
  context.fillStyle = "#e9dfca";
  context.fillRect(0, 0, 640, 960);
  context.strokeStyle = "rgba(70,58,42,.16)";
  context.lineWidth = 2;
  context.strokeRect(42, 42, 556, 876);
  context.fillStyle = "#6e604d";
  context.font = '700 18px "Segoe UI", sans-serif';
  context.letterSpacing = "4px";
  context.fillText(`VOLUME ${volume.number}  /  RESEARCH NOTE`, 74, 96);
  context.fillStyle = "#312b24";
  context.font = '400 54px "Times New Roman", serif';
  drawWrappedTitle(context, volume.title, 74, 190, 490, 58);
  context.fillStyle = "#776b59";
  context.font = '400 25px "Microsoft YaHei", serif';
  const lines = [volume.question, volume.value, volume.status];
  lines.forEach((line, index) => context.fillText(line, 74, 390 + index * 98, 490));
  for (let y = 720; y < 860; y += 28) {
    context.fillStyle = "rgba(70,58,42,.18)";
    context.fillRect(74, y, indexLineWidth(y), 2);
  }
  const texture = new THREE.CanvasTexture(pageCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
}

function indexLineWidth(y) {
  return 420 - ((y / 28) % 3) * 54;
}

function createBook(volume, image, index, x) {
  const root = new THREE.Group();
  const shelfTop = -1.3;
  root.position.set(x, shelfTop + volume.height / 2, 0);
  root.rotation.z = volume.tilt;

  const motion = new THREE.Group();
  root.add(motion);

  const coverMaterial = new THREE.MeshStandardMaterial({
    map: makeCoverTexture(volume, image), roughness: .72, metalness: .03, color: 0xffffff
  });
  const backMaterial = new THREE.MeshStandardMaterial({ color: volume.color, roughness: .82, metalness: .02 });
  const pageMaterial = new THREE.MeshStandardMaterial({ color: 0xe6dcc8, roughness: .95 });
  const spineMaterial = new THREE.MeshStandardMaterial({
    map: makeCoverTexture(volume, image, true), roughness: .62, metalness: .05, color: 0xffffff
  });

  const pageBlock = new THREE.Mesh(
    new RoundedBoxGeometry(volume.width - .1, volume.height - .13, volume.depth - .075, 5, .025), pageMaterial
  );
  pageBlock.castShadow = true;
  pageBlock.receiveShadow = true;
  motion.add(pageBlock);

  const backCover = new THREE.Mesh(
    new RoundedBoxGeometry(volume.width, volume.height, .065, 5, .025), backMaterial
  );
  backCover.position.z = -volume.depth / 2;
  backCover.castShadow = true;
  motion.add(backCover);

  const frontPivot = new THREE.Group();
  frontPivot.position.set(-volume.width / 2, 0, volume.depth / 2);
  motion.add(frontPivot);

  const frontCover = new THREE.Mesh(
    new RoundedBoxGeometry(volume.width, volume.height, .072, 6, .026), coverMaterial
  );
  frontCover.position.x = volume.width / 2;
  frontCover.castShadow = true;
  frontPivot.add(frontCover);

  const insideCover = new THREE.Mesh(
    new THREE.PlaneGeometry(volume.width - .1, volume.height - .11),
    new THREE.MeshStandardMaterial({ map: makePageTexture(volume), roughness: .94, side: THREE.DoubleSide })
  );
  insideCover.position.set(volume.width / 2, 0, -.039);
  insideCover.rotation.y = Math.PI;
  frontPivot.add(insideCover);

  const firstPage = new THREE.Mesh(
    new THREE.PlaneGeometry(volume.width - .13, volume.height - .17),
    new THREE.MeshStandardMaterial({ map: makePageTexture(volume), roughness: .95 })
  );
  firstPage.position.z = volume.depth / 2 + .001;
  motion.add(firstPage);

  const spine = new THREE.Mesh(
    new RoundedBoxGeometry(.12, volume.height, volume.depth + .035, 5, .025), spineMaterial
  );
  spine.position.x = -volume.width / 2 + .025;
  spine.castShadow = true;
  motion.add(spine);

  const headbandGeometry = new THREE.CylinderGeometry(.026, .026, volume.width - .14, 14);
  const headbandMaterial = new THREE.MeshStandardMaterial({ color: volume.accent, roughness: .5, metalness: .08 });
  for (const y of [-volume.height / 2 + .075, volume.height / 2 - .075]) {
    const headband = new THREE.Mesh(headbandGeometry, headbandMaterial);
    headband.rotation.z = Math.PI / 2;
    headband.position.set(.02, y, volume.depth / 2 - .05);
    motion.add(headband);
  }

  const bookmark = new THREE.Mesh(
    new THREE.PlaneGeometry(.075, .58),
    new THREE.MeshStandardMaterial({ color: volume.accent, roughness: .58, side: THREE.DoubleSide })
  );
  bookmark.position.set(.24, -volume.height / 2 - .22, .03);
  bookmark.rotation.x = -.05;
  motion.add(bookmark);

  root.traverse((object) => {
    if (object.isMesh) object.userData.bookIndex = index;
  });

  return {
    root, motion, frontPivot, coverMaterial, spineMaterial, backMaterial,
    backActive: new THREE.Color(volume.color),
    backMuted: new THREE.Color(volume.color).multiplyScalar(.72),
    baseX: x, baseY: root.position.y, volume, scale: 1
  };
}

function addRoom() {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(20, 9, .16),
    new THREE.MeshStandardMaterial({ color: 0x29292b, roughness: .98 })
  );
  wall.position.set(0, .45, -2.25);
  wall.receiveShadow = true;
  scene.add(wall);

  const shelf = new THREE.Mesh(
    new RoundedBoxGeometry(15, .3, 1.45, 4, .055),
    new THREE.MeshStandardMaterial({ color: 0x2f211a, roughness: .7, metalness: .02 })
  );
  shelf.position.set(0, -1.46, -.04);
  shelf.castShadow = true;
  shelf.receiveShadow = true;
  scene.add(shelf);

  const inlay = new THREE.Mesh(
    new THREE.BoxGeometry(15.05, .026, .035),
    new THREE.MeshStandardMaterial({ color: 0x9d7440, roughness: .48, metalness: .38 })
  );
  inlay.position.set(0, -1.3, .68);
  scene.add(inlay);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 13),
    new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 1 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.62;
  floor.receiveShadow = true;
  scene.add(floor);

  scene.add(new THREE.HemisphereLight(0xe7e2d7, 0x0c0d10, 1.25));

  const key = new THREE.DirectionalLight(0xffe7c1, 3.6);
  key.position.set(-4.6, 6.4, 5.7);
  key.castShadow = true;
  key.shadow.mapSize.set(1536, 1536);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -4;
  key.shadow.bias = -.0005;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xacc7d6, .7);
  fill.position.set(5, 1.5, 3);
  scene.add(fill);

  accentLight = new THREE.PointLight(volumes[selectedIndex].accent, 9, 7, 2);
  accentLight.position.set(.2, 1.4, 2.3);
  scene.add(accentLight);
}

function buildShelf(images) {
  bookStage = new THREE.Group();
  scene.add(bookStage);
  const gap = .32;
  const totalWidth = volumes.reduce((sum, volume) => sum + volume.width, 0) + gap * (volumes.length - 1);
  let cursor = -totalWidth / 2;
  volumes.forEach((volume, index) => {
    const x = cursor + volume.width / 2;
    const book = createBook(volume, images[index], index, x);
    books.push(book);
    bookStage.add(book.root);
    cursor += volume.width + gap;
  });
}

function createMarkers() {
  volumes.forEach((volume, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `选择第 ${index + 1} 册：${volume.title}`);
    button.addEventListener("click", () => selectVolume(index));
    markersElement.append(button);
  });
}

function updateInterface(announce = true) {
  const volume = volumes[selectedIndex];
  document.documentElement.style.setProperty("--accent", volume.accent);
  document.documentElement.style.setProperty("--accent-ink", volume.number === "02" ? "#3a2118" : "#171913");
  selectionNumber.textContent = volume.number;
  selectionKind.textContent = volume.kind;
  selectionTitle.textContent = volume.title;
  selectionSubtitle.textContent = volume.subtitle;
  detailIndex.textContent = `Volume ${volume.number} · ${volume.discipline}`;
  detailTitle.textContent = volume.title;
  detailSummary.textContent = volume.summary;
  detailQuestion.textContent = volume.question;
  detailValue.textContent = volume.value;
  detailStatus.textContent = volume.status;
  detailForm.textContent = volume.form;
  themeTarget.copy(neutralScene).lerp(new THREE.Color(volume.background), .22);
  if (accentLight) accentLight.color.set(volume.accent);

  [...markersElement.children].forEach((marker, index) => {
    marker.setAttribute("aria-current", index === selectedIndex ? "true" : "false");
  });

  if (volume.href) {
    projectLink.href = volume.href;
    projectLink.textContent = "打开项目";
    projectLink.removeAttribute("aria-disabled");
    projectLink.removeAttribute("tabindex");
  } else {
    projectLink.href = "#";
    projectLink.textContent = "概念方向";
    projectLink.setAttribute("aria-disabled", "true");
    projectLink.setAttribute("tabindex", "-1");
  }

  if (announce) liveRegion.textContent = `已选择第 ${selectedIndex + 1} 册，${volume.title}，${volume.kind}`;
}

function selectVolume(index) {
  selectedIndex = (index + volumes.length) % volumes.length;
  hoveredIndex = -1;
  readingOpen = false;
  inspectYaw = -.12;
  inspectPitch = .035;
  updateInterface();
}

function openDetail() {
  if (mode === "detail") return;
  mode = "detail";
  experience.classList.add("mode-detail");
  detailPanel.setAttribute("aria-hidden", "false");
  liveRegion.textContent = `已打开 ${volumes[selectedIndex].title} 详情`;
  window.setTimeout(() => closeDetailButton.focus({ preventScroll: true }), reducedMotion ? 0 : 420);
}

function closeDetail() {
  if (mode === "shelf") return;
  mode = "shelf";
  readingOpen = false;
  experience.classList.remove("mode-detail");
  detailPanel.setAttribute("aria-hidden", "true");
  openBookButton.textContent = "展开封面";
  liveRegion.textContent = `已返回书架，当前为 ${volumes[selectedIndex].title}`;
  openDetailButton.focus({ preventScroll: true });
}

function toggleBook() {
  readingOpen = !readingOpen;
  openBookButton.textContent = readingOpen ? "合上封面" : "展开封面";
  liveRegion.textContent = readingOpen ? "卷册封面已展开" : "卷册封面已合上";
}

function updatePointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function raycastBook(event) {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(bookStage.children, true)[0];
  return hit ? hit.object.userData.bookIndex : -1;
}

function onPointerMove(event) {
  if (pointerDown && mode === "detail") {
    const dx = event.clientX - pointerDown.x;
    const dy = event.clientY - pointerDown.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) pointerDown.moved = true;
    inspectYaw = THREE.MathUtils.clamp(pointerDown.yaw + dx * .006, -.72, .42);
    inspectPitch = THREE.MathUtils.clamp(pointerDown.pitch + dy * .004, -.2, .2);
    return;
  }
  if (pointerDown && Math.abs(event.clientX - pointerDown.x) + Math.abs(event.clientY - pointerDown.y) > 5) pointerDown.moved = true;
  if (mode === "shelf") {
    hoveredIndex = raycastBook(event);
    canvas.style.cursor = hoveredIndex >= 0 ? "pointer" : "default";
  }
}

function onPointerDown(event) {
  if (mode === "detail") {
    pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw: inspectYaw, pitch: inspectPitch, moved: false };
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
  } else {
    pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, book: raycastBook(event) };
  }
}

function onPointerUp(event) {
  if (!pointerDown || pointerDown.id !== event.pointerId) return;
  if (mode === "shelf" && !pointerDown.moved && pointerDown.book >= 0) {
    if (pointerDown.book === selectedIndex) openDetail();
    else selectVolume(pointerDown.book);
  }
  pointerDown = null;
  canvas.style.cursor = mode === "detail" ? "grab" : "default";
}

function onWheel(event) {
  event.preventDefault();
  if (mode !== "shelf") return;
  const now = performance.now();
  if (now - lastWheelTime < 380 || Math.abs(event.deltaY) < 4) return;
  lastWheelTime = now;
  selectVolume(selectedIndex + (event.deltaY > 0 ? 1 : -1));
}

function onKeyDown(event) {
  if (event.key === "Escape" && mode === "detail") {
    event.preventDefault();
    closeDetail();
    return;
  }
  if (mode !== "shelf") return;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    selectVolume(selectedIndex + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    selectVolume(selectedIndex - 1);
  }
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width <= 760;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.35 : 1.65));
  camera.aspect = width / height;
  camera.fov = isMobile ? 49 : 40;
  camera.position.set(0, isMobile ? .7 : .9, isMobile ? 8.8 : 8.6);
  camera.updateProjectionMatrix();
}

function easeValue(current, target, speed, delta) {
  if (reducedMotion) return target;
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta));
}

function animate() {
  const delta = Math.min(clock.getDelta(), .05);
  const active = books[selectedIndex];
  const isMobile = window.innerWidth <= 760;
  const detailOffset = mode === "detail" && !isMobile ? -1.75 : 0;
  const stageTarget = -active.baseX + detailOffset;
  bookStage.position.x = easeValue(bookStage.position.x, stageTarget, 5.2, delta);

  scene.background.lerp(themeTarget, reducedMotion ? 1 : 1 - Math.exp(-1.8 * delta));
  scene.fog.color.copy(scene.background);
  if (accentLight) accentLight.intensity = easeValue(accentLight.intensity, mode === "detail" ? 12 : 8.5, 4, delta);

  books.forEach((book, index) => {
    const selected = index === selectedIndex;
    const hovered = index === hoveredIndex && mode === "shelf";
    const distance = Math.abs(index - selectedIndex);
    const detailY = isMobile ? 1.02 : .28;
    const detailZ = isMobile ? .48 : 1.05;
    const targetScale = selected
      ? (mode === "detail" ? (isMobile ? 1.03 : 1.26) : 1.07)
      : (hovered ? .99 : distance === 1 ? .96 : .92);

    tempPosition.set(
      book.baseX,
      book.baseY + (selected ? (mode === "detail" ? detailY : .16) : hovered ? .06 : 0),
      selected && mode === "detail" ? detailZ : selected ? .24 : hovered ? .08 : -distance * .035
    );

    book.root.position.lerp(tempPosition, reducedMotion ? 1 : 1 - Math.exp(-5.8 * delta));
    book.scale = easeValue(book.scale, targetScale, 6.2, delta);
    book.root.scale.setScalar(book.scale);
    book.root.rotation.z = easeValue(book.root.rotation.z, selected && mode === "detail" ? 0 : book.volume.tilt, 5.5, delta);
    book.root.rotation.y = easeValue(book.root.rotation.y, selected && mode === "detail" ? -.1 : selected ? -.025 : 0, 5.5, delta);

    const targetCover = selected && mode === "detail" ? (readingOpen ? -1.84 : -.08) : 0;
    book.frontPivot.rotation.y = easeValue(book.frontPivot.rotation.y, targetCover, 6.8, delta);
    book.motion.rotation.y = easeValue(book.motion.rotation.y, selected && mode === "detail" ? inspectYaw : 0, 5.5, delta);
    book.motion.rotation.x = easeValue(book.motion.rotation.x, selected && mode === "detail" ? inspectPitch : 0, 5.5, delta);

    activeTint.set(selected || hovered ? 0xffffff : mutedTint);
    const colorEase = reducedMotion ? 1 : 1 - Math.exp(-5 * delta);
    book.coverMaterial.color.lerp(activeTint, colorEase);
    book.spineMaterial.color.lerp(activeTint, colorEase);
    book.backMaterial.color.lerp(selected ? book.backActive : book.backMuted, colorEase);
  });

  camera.lookAt(0, isMobile ? .7 : .9, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

async function init() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  scene = new THREE.Scene();
  scene.background = neutralScene.clone();
  scene.fog = new THREE.Fog(neutralScene, 8.5, 15.5);

  camera = new THREE.PerspectiveCamera(40, 1, .1, 40);
  camera.position.set(0, .9, 8.6);

  const images = await Promise.all(volumes.map((volume) => loadImage(volume.cover)));
  addRoom();
  buildShelf(images);
  createMarkers();
  updateInterface(false);
  resize();

  openDetailButton.addEventListener("click", openDetail);
  closeDetailButton.addEventListener("click", closeDetail);
  openBookButton.addEventListener("click", toggleBook);
  previousButton.addEventListener("click", () => selectVolume(selectedIndex - 1));
  nextButton.addEventListener("click", () => selectVolume(selectedIndex + 1));
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", () => { pointerDown = null; });
  canvas.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", resize);

  bookStage.position.x = -books[selectedIndex].baseX;
  renderer.render(scene, camera);
  document.body.classList.add("webgl-ready");
  canvas.style.cursor = "default";
  animate();
}

if (forcedFallback) {
  console.info("Research Volumes fallback requested.");
} else {
  init().catch((error) => {
    console.error("Unable to initialize the Research Volumes scene.", error);
    document.body.classList.remove("webgl-ready");
  });
}
