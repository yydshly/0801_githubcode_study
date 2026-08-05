(function () {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const overlay = document.getElementById("gameOverlay");
  const startButton = document.getElementById("startGame");
  const restartButton = document.getElementById("restartGame");
  const pauseButton = document.getElementById("togglePause");
  const carriedEl = document.getElementById("carried");
  const deliveredEl = document.getElementById("delivered");
  const stabilityEl = document.getElementById("stability");
  const keys = new Set();
  const core = window.GameCore;
  const TAU = Math.PI * 2;
  let state;
  let lastTime = 0;
  let running = false;
  let paused = false;
  let moveTarget = null;

  function createState() {
    return {
      time: 0,
      carried: 0,
      delivered: 0,
      stability: 100,
      dashCooldown: 0,
      hitCooldown: 0,
      player: { x: 480, y: 310, radius: 11, vx: 0, vy: 0 },
      sparks: [
        { x: 320, y: 150 }, { x: 610, y: 118 }, { x: 810, y: 315 },
        { x: 650, y: 500 }, { x: 310, y: 470 }, { x: 130, y: 310 },
        { x: 475, y: 205 }, { x: 535, y: 430 }, { x: 735, y: 210 },
      ].map((p, i) => ({ ...p, radius: 7, alive: true, phase: i * .8 })),
      beacons: [
        { x: 160, y: 120, radius: 27, charge: 0, target: 2 },
        { x: 800, y: 130, radius: 27, charge: 0, target: 2 },
        { x: 490, y: 505, radius: 27, charge: 0, target: 2 },
      ],
      mists: [
        { x: 220, y: 390, radius: 24, phase: .2 },
        { x: 720, y: 410, radius: 28, phase: 2.1 },
        { x: 490, y: 105, radius: 22, phase: 4.2 },
      ],
      ripples: [],
      message: "收集游光，点亮灯塔",
      finished: false,
    };
  }

  function resetGame() {
    state = createState();
    moveTarget = null;
    paused = false;
    running = true;
    pauseButton.textContent = "暂停";
    overlay.classList.add("hidden");
    updateHud();
  }

  function updateHud() {
    carriedEl.textContent = `${state.carried} / 3`;
    deliveredEl.textContent = `${state.delivered} / 6`;
    stabilityEl.textContent = `${Math.round(state.stability)}%`;
  }

  function showEnd(title, text) {
    running = false;
    overlay.innerHTML = `<div class="overlay-card"><span>检查点结果</span><h3>${title}</h3><p>${text}</p><button id="playAgain" class="button primary" type="button">再试一次</button></div>`;
    overlay.classList.remove("hidden");
    document.getElementById("playAgain").addEventListener("click", resetGame);
  }

  function update(dt) {
    if (!running || paused || state.finished) return;
    state.time += dt;
    state.dashCooldown = Math.max(0, state.dashCooldown - dt);
    state.hitCooldown = Math.max(0, state.hitCooldown - dt);

    let dx = 0;
    let dy = 0;
    if (keys.has("ArrowLeft") || keys.has("KeyA")) dx -= 1;
    if (keys.has("ArrowRight") || keys.has("KeyD")) dx += 1;
    if (keys.has("ArrowUp") || keys.has("KeyW")) dy -= 1;
    if (keys.has("ArrowDown") || keys.has("KeyS")) dy += 1;
    if (dx || dy) moveTarget = null;
    if (!dx && !dy && moveTarget) {
      const targetDistance = core.distance(state.player, moveTarget);
      if (targetDistance < 8) {
        moveTarget = null;
      } else {
        dx = moveTarget.x - state.player.x;
        dy = moveTarget.y - state.player.y;
      }
    }
    const length = Math.hypot(dx, dy) || 1;
    const dash = keys.has("Space") && state.dashCooldown <= 0;
    const speed = dash ? 410 : 190;
    if (dash && (dx || dy)) {
      state.dashCooldown = 1.15;
      state.ripples.push({ x: state.player.x, y: state.player.y, age: 0, color: "#d8f56c" });
    }
    state.player.vx += ((dx / length) * speed - state.player.vx) * Math.min(1, dt * 9);
    state.player.vy += ((dy / length) * speed - state.player.vy) * Math.min(1, dt * 9);
    state.player.x = core.clamp(state.player.x + state.player.vx * dt, 32, canvas.width - 32);
    state.player.y = core.clamp(state.player.y + state.player.vy * dt, 68, canvas.height - 28);

    state.sparks.forEach((spark) => {
      if (!spark.alive || state.carried >= 3) return;
      if (core.circlesTouch(state.player, spark)) {
        spark.alive = false;
        state.carried += 1;
        state.message = state.carried === 3 ? "已经满载，寻找灯塔" : "获得一颗游光";
        state.ripples.push({ x: spark.x, y: spark.y, age: 0, color: "#f1c75b" });
      }
    });

    state.beacons.forEach((beacon) => {
      if (!state.carried || beacon.charge >= beacon.target) return;
      if (core.distance(state.player, beacon) < beacon.radius + 17) {
        const result = core.deposit(state.carried, beacon.charge, beacon.target);
        state.carried = result.carried;
        beacon.charge = result.beaconCharge;
        state.delivered += result.deposited;
        state.stability = core.clamp(state.stability + result.deposited * 8, 0, 100);
        state.message = beacon.charge === beacon.target ? "一座灯塔已经点亮" : "灯塔正在苏醒";
        state.ripples.push({ x: beacon.x, y: beacon.y, age: 0, color: "#d8f56c" });
      }
    });

    state.mists.forEach((mist, index) => {
      const pursuit = 10 + state.carried * 10;
      const angle = Math.atan2(state.player.y - mist.y, state.player.x - mist.x);
      mist.x += (Math.cos(angle) * pursuit + Math.cos(state.time * .7 + mist.phase) * 10) * dt;
      mist.y += (Math.sin(angle) * pursuit + Math.sin(state.time * .55 + index) * 8) * dt;
      mist.x = core.clamp(mist.x, 25, canvas.width - 25);
      mist.y = core.clamp(mist.y, 72, canvas.height - 25);
      if (state.hitCooldown <= 0 && core.circlesTouch(state.player, mist)) {
        const hit = core.applyMistHit(state.stability, state.carried);
        state.stability = hit.stability;
        state.carried = hit.carried;
        state.hitCooldown = 2;
        state.message = "迷雾夺走了一颗游光";
        state.player.x = core.clamp(state.player.x + Math.cos(angle) * 45, 32, canvas.width - 32);
        state.player.y = core.clamp(state.player.y + Math.sin(angle) * 45, 68, canvas.height - 28);
        mist.x = core.clamp(mist.x - Math.cos(angle) * 55, 25, canvas.width - 25);
        mist.y = core.clamp(mist.y - Math.sin(angle) * 55, 72, canvas.height - 25);
      }
    });

    state.ripples.forEach((ripple) => { ripple.age += dt; });
    state.ripples = state.ripples.filter((ripple) => ripple.age < .8);
    updateHud();

    if (state.delivered >= 6) {
      state.finished = true;
      setTimeout(() => showEnd("雾区恢复了光明", `你用 ${Math.ceil(state.time)} 秒完成了核心循环。现在可以评价：移动、风险和点亮反馈哪里最需要改进？`), 650);
    } else if (state.stability <= 0) {
      state.finished = true;
      setTimeout(() => showEnd("光芒暂时熄灭", "这也是有效的试玩证据：也许压力过强，或风险提示还不够清楚。"), 500);
    }
  }

  function roundedRect(x, y, w, h, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
  }

  function draw() {
    const t = state ? state.time : 0;
    const gradient = ctx.createRadialGradient(480, 300, 60, 480, 300, 620);
    gradient.addColorStop(0, "#173f36");
    gradient.addColorStop(1, "#071a18");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(216,245,108,.045)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
    for (let y = 0; y < canvas.height; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

    if (!state) return;
    state.beacons.forEach((beacon) => {
      const complete = beacon.charge >= beacon.target;
      const glow = complete ? 34 + Math.sin(t * 3) * 5 : 10 + beacon.charge * 9;
      const g = ctx.createRadialGradient(beacon.x, beacon.y, 1, beacon.x, beacon.y, 85 + glow);
      g.addColorStop(0, complete ? "rgba(216,245,108,.62)" : "rgba(241,199,91,.28)");
      g.addColorStop(1, "rgba(216,245,108,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(beacon.x, beacon.y, 85 + glow, 0, TAU); ctx.fill();
      ctx.strokeStyle = complete ? "#d8f56c" : "rgba(255,255,255,.32)";
      ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(beacon.x, beacon.y, beacon.radius, 0, TAU); ctx.stroke();
      ctx.fillStyle = complete ? "#d8f56c" : "#173f36";
      roundedRect(beacon.x - 8, beacon.y - 18, 16, 36, 3); ctx.fill();
      for (let i = 0; i < beacon.target; i += 1) {
        ctx.fillStyle = i < beacon.charge ? "#f1c75b" : "rgba(255,255,255,.18)";
        ctx.beginPath(); ctx.arc(beacon.x - 6 + i * 12, beacon.y + 38, 4, 0, TAU); ctx.fill();
      }
    });

    state.sparks.forEach((spark) => {
      if (!spark.alive) return;
      const pulse = 1 + Math.sin(t * 4 + spark.phase) * .22;
      ctx.shadowColor = "#f1c75b"; ctx.shadowBlur = 18;
      ctx.fillStyle = "#ffe89a"; ctx.beginPath(); ctx.arc(spark.x, spark.y + Math.sin(t * 2 + spark.phase) * 4, spark.radius * pulse, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
    });

    state.mists.forEach((mist) => {
      const g = ctx.createRadialGradient(mist.x - 7, mist.y - 7, 2, mist.x, mist.y, mist.radius * 1.8);
      g.addColorStop(0, "rgba(118,104,151,.7)"); g.addColorStop(1, "rgba(50,38,71,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mist.x, mist.y, mist.radius * 1.8, 0, TAU); ctx.fill();
      ctx.strokeStyle = "rgba(186,169,222,.35)"; ctx.beginPath(); ctx.arc(mist.x, mist.y, mist.radius + Math.sin(t * 3 + mist.phase) * 3, 0, TAU); ctx.stroke();
    });

    state.ripples.forEach((ripple) => {
      ctx.globalAlpha = 1 - ripple.age / .8; ctx.strokeStyle = ripple.color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(ripple.x, ripple.y, 12 + ripple.age * 75, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    });

    const playerGlow = ctx.createRadialGradient(state.player.x, state.player.y, 2, state.player.x, state.player.y, 40 + state.carried * 8);
    playerGlow.addColorStop(0, "rgba(216,245,108,.8)"); playerGlow.addColorStop(1, "rgba(216,245,108,0)");
    ctx.fillStyle = playerGlow; ctx.beginPath(); ctx.arc(state.player.x, state.player.y, 45 + state.carried * 8, 0, TAU); ctx.fill();
    ctx.fillStyle = state.hitCooldown > 0 && Math.floor(t * 12) % 2 ? "#ffffff" : "#d8f56c";
    ctx.beginPath(); ctx.arc(state.player.x, state.player.y, state.player.radius, 0, TAU); ctx.fill();
    for (let i = 0; i < state.carried; i += 1) {
      const angle = t * 2 + i * TAU / state.carried;
      ctx.fillStyle = "#f1c75b"; ctx.beginPath(); ctx.arc(state.player.x + Math.cos(angle) * 22, state.player.y + Math.sin(angle) * 22, 4, 0, TAU); ctx.fill();
    }

    ctx.fillStyle = "rgba(5,19,17,.65)"; roundedRect(canvas.width / 2 - 135, canvas.height - 45, 270, 26, 13); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.72)"; ctx.font = "12px Microsoft YaHei, sans-serif"; ctx.textAlign = "center"; ctx.fillText(state.message, canvas.width / 2, canvas.height - 28);
  }

  function frame(time) {
    const dt = Math.min(.034, (time - lastTime) / 1000 || 0);
    lastTime = time;
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  function setKey(event, down) {
    const code = event.code || event.currentTarget.dataset.key;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "KeyW", "KeyA", "KeyS", "KeyD"].includes(code)) event.preventDefault();
    if (down) keys.add(code); else keys.delete(code);
  }

  function setMoveTarget(event) {
    if (!running || paused) return;
    const rect = canvas.getBoundingClientRect();
    moveTarget = {
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
  }

  window.addEventListener("keydown", (event) => setKey(event, true));
  window.addEventListener("keyup", (event) => setKey(event, false));
  window.addEventListener("blur", () => keys.clear());
  document.querySelectorAll("[data-key]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => setKey(event, true));
    button.addEventListener("pointerup", (event) => setKey(event, false));
    button.addEventListener("pointercancel", (event) => setKey(event, false));
  });
  canvas.addEventListener("pointerdown", setMoveTarget);
  startButton.addEventListener("click", resetGame);
  restartButton.addEventListener("click", resetGame);
  pauseButton.addEventListener("click", () => {
    if (!running) return;
    paused = !paused;
    pauseButton.textContent = paused ? "继续" : "暂停";
  });

  state = createState();
  updateHud();
  requestAnimationFrame(frame);
})();
