const capabilities = [
  {
    id: "routing",
    name: "目标工具路由",
    state: "applied",
    status: "已触发",
    problem: "原文虽然提到 Codex，但没有根据 Agent 的执行特性组织任务。",
    addition: "显式锁定 Target，并采用范围、权限、停止和验证结构。",
    risk: "工具画像是静态规则，版本变化后可能过时。",
  },
  {
    id: "objective",
    name: "精确任务目标",
    state: "applied",
    status: "已触发",
    problem: "“修好”和“专业点”无法验证。",
    addition: "将任务收敛为一个具体空值异常和最小修复。",
    risk: "如果故障事实没有经过用户确认，精确描述也可能是精确的误解。",
  },
  {
    id: "context",
    name: "上下文显式化",
    state: "applied",
    status: "已触发",
    problem: "“上次说的”依赖模型记忆，无法独立执行。",
    addition: "重述技术栈、复现条件和兼容性要求。",
    risk: "只能携带当前上下文，不是跨会话持久化记忆。",
  },
  {
    id: "memory",
    name: "Memory Block",
    state: "applied",
    status: "已触发",
    problem: "关键决定容易在长对话中丢失。",
    addition: "将澄清后已经确定的事实前置到最终 Prompt。",
    risk: "它不会自行读取数据库；错误的会话事实也会被一起带入。",
  },
  {
    id: "scope",
    name: "范围锁定",
    state: "applied",
    status: "已触发",
    problem: "“顺便整理代码”可能扩展成整个认证模块重构。",
    addition: "限定允许读取和修改的文件与最小变更原则。",
    risk: "范围过窄可能遮蔽真正根因，因此保留停止询问机制。",
  },
  {
    id: "permissions",
    name: "允许 / 禁止操作",
    state: "applied",
    status: "已触发",
    problem: "“自己看着办”把决策权完全交给 Agent。",
    addition: "列出可执行动作和需要人工确认的高影响动作。",
    risk: "这些仍是文字约束，不等于操作系统级权限。",
  },
  {
    id: "constraints",
    name: "技术约束",
    state: "applied",
    status: "已触发",
    problem: "原文没有说明兼容性和依赖限制。",
    addition: "保持 API、数据库和环境配置不变，不引入新依赖。",
    risk: "约束必须来自用户或项目事实，不能由 Skill 擅自决定。",
  },
  {
    id: "workflow",
    name: "执行步骤",
    state: "applied",
    status: "已触发",
    problem: "没有规定先验证故障还是直接改代码。",
    addition: "要求先复现、再修复、补测试、最后验证。",
    risk: "步骤写得过细可能限制强模型选择更好的路径。",
  },
  {
    id: "success",
    name: "验收标准",
    state: "applied",
    status: "已触发",
    problem: "“完成后告诉我”没有定义完成。",
    addition: "把异常、兼容性和测试结果变成可勾选条件。",
    risk: "验收项遗漏时，模型可能满足清单却没有满足真实业务目标。",
  },
  {
    id: "stop",
    name: "停止条件",
    state: "applied",
    status: "已触发",
    problem: "Agent 遇到范围外问题时没有返回用户的触发点。",
    addition: "遇到依赖、API、架构或范围变化时暂停并询问。",
    risk: "停止条件过多会打断执行，应该只保留高影响选择。",
  },
  {
    id: "grounding",
    name: "Grounding 与不确定性",
    state: "applied",
    status: "已触发",
    problem: "模型可能假设不存在的文件、行为或测试。",
    addition: "要求根据仓库证据和真实命令输出得出结论。",
    risk: "这降低幻觉邀请，但不能保证模型绝不出错。",
  },
  {
    id: "safety",
    name: "凭据安全",
    state: "applied",
    status: "已触发",
    problem: "代码 Agent 可能接触环境文件和认证信息。",
    addition: "禁止读取或输出密钥、Token 和 .env 内容。",
    risk: "真正的保护仍应由沙箱和权限策略实施。",
  },
  {
    id: "output",
    name: "输出契约",
    state: "applied",
    status: "已触发",
    problem: "原文没有规定最终需要汇报什么。",
    addition: "要求报告根因、文件、改动、测试和未验证项。",
    risk: "格式越严，额外 Token 越多；简单任务不一定需要。",
  },
  {
    id: "checkpoints",
    name: "检查点与最终自检",
    state: "applied",
    status: "已触发",
    problem: "执行过程不可观察，最终结果也缺少复核。",
    addition: "把测试结果和未验证事项纳入最终报告。",
    risk: "Prompt 中的自检不能替代外部测试和人工评审。",
  },
  {
    id: "efficiency",
    name: "语言效率审计",
    state: "applied",
    status: "已触发",
    problem: "规范化容易退化为无意义扩写。",
    addition: "要求每一段承担目标、边界、验证或安全作用。",
    risk: "这是语言检查，不是真实 Token 统计或成本证明。",
  },
  {
    id: "agentwarning",
    name: "Agent 执行前警告",
    state: "applied",
    status: "已触发",
    problem: "原文没有提醒用户：Codex 具备真实文件和命令权限。",
    addition: "在 Prompt 末尾提醒粘贴前复核路径、权限、禁止项和停止条件。",
    risk: "提醒本身不能替代沙箱、审批机制或最小权限配置。",
  },
  {
    id: "role",
    name: "Role assignment",
    state: "available",
    status: "本例未触发",
    problem: "复杂专业任务有时需要明确专家身份和判断偏好。",
    addition: "仅在角色会实质改变输出时加入；本例中 Codex 的任务规格已经足够。",
    risk: "泛化的“你是专家”通常只会增加字数，不会增加有效约束。",
  },
  {
    id: "fewshot",
    name: "Few-shot / 格式锁",
    state: "available",
    status: "本例未触发",
    problem: "某些输出格式用文字规则仍然难以描述。",
    addition: "Skill 可增加 2–5 个例子锁定模式，但本例的代码修复不需要。",
    risk: "为了展示而强行加入会浪费 Token，并扭曲任务。",
  },
  {
    id: "reasoning",
    name: "推理模式适配",
    state: "available",
    status: "本例未触发",
    problem: "不同模型对 CoT、thinking 指令和提示长度的反应不同。",
    addition: "按模型移除或保留推理提示；本例只要求最终结果，不暴露内部推理。",
    risk: "这些规则依赖静态模型画像，模型升级后必须重新验证。",
  },
  {
    id: "decompiler",
    name: "Prompt 解构与迁移",
    state: "available",
    status: "本例未触发",
    problem: "用户有时需要分析旧 Prompt 或迁移到另一工具。",
    addition: "Skill 可拆解、简化、分割和适配旧 Prompt。",
    risk: "本例是从粗略想法生成，不属于旧 Prompt 解构任务。",
  },
  {
    id: "registry",
    name: "多工具路由与模板库",
    state: "available",
    status: "本例未触发",
    problem: "LLM、代码 Agent、浏览器、图像、3D、视频、语音和工作流工具需要不同结构。",
    addition: "Skill 内置工具分类和 RTF、CO-STAR、RISEN、CRISPE、File-Scope、ReAct 等模板。",
    risk: "它是文本规则表，不会自动探测目标工具版本；静态配置可能过时。",
  },
];

const capabilityList = document.querySelector("#capabilityList");
const capabilityDetail = document.querySelector("#capabilityDetail");
const promptBlocks = [...document.querySelectorAll(".prompt-block")];
const toast = document.querySelector("#toast");
let toastTimer;

function renderCapabilities() {
  capabilityList.innerHTML = capabilities
    .map(
      (item, index) => `
        <button class="capability-button" type="button" data-capability-id="${item.id}" aria-pressed="false">
          <span class="capability-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="capability-name">${item.name}</span>
          <span class="capability-state ${item.state}">${item.status}</span>
        </button>`,
    )
    .join("");
}

function selectCapability(id) {
  const item = capabilities.find((entry) => entry.id === id);
  if (!item) return;

  document.querySelectorAll(".capability-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.capabilityId === id));
  });

  const hasPromptMatch = promptBlocks.some((block) => block.dataset.capability.split(" ").includes(id));
  promptBlocks.forEach((block) => {
    const matches = block.dataset.capability.split(" ").includes(id);
    block.classList.toggle("is-highlighted", matches);
    block.classList.toggle("is-dimmed", hasPromptMatch && !matches);
  });

  capabilityDetail.innerHTML = `
    <span class="detail-status">${item.status}</span>
    <h3>${item.name}</h3>
    <div class="detail-grid">
      <div><b>原始缺口</b><span>${item.problem}</span></div>
      <div><b>规范化动作</b><span>${item.addition}</span></div>
      <div><b>边界与风险</b><span>${item.risk}</span></div>
    </div>`;

  if (hasPromptMatch && window.matchMedia("(max-width: 980px)").matches) {
    document.querySelector("#optimizedPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getOptimizedText() {
  return promptBlocks
    .map((section) => {
      const title = section.querySelector("h4")?.textContent?.trim() ?? "";
      const lines = [...section.querySelectorAll("p, li")].map((node) => node.textContent.trim());
      return `## ${title}\n${lines.join("\n")}`;
    })
    .join("\n\n");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1700);
}

async function copyText(targetId) {
  const text = targetId === "optimizedPrompt"
    ? getOptimizedText()
    : document.querySelector(`#${targetId}`)?.textContent?.trim();
  if (!text) return;

  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    copied = document.execCommand("copy");
    textArea.remove();
  }
  toast.dataset.state = copied ? "success" : "error";
  showToast(copied ? "已复制到剪贴板" : "复制失败，请手动选择文本");
}

function setView(view) {
  document.querySelector("#comparisonGrid").dataset.view = view;
  document.querySelectorAll("[data-view]").forEach((button) => {
    if (button.tagName === "BUTTON") {
      button.setAttribute("aria-pressed", String(button.dataset.view === view));
    }
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggle = document.querySelector("#themeToggle");
  const isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.querySelector(".theme-label").textContent = isDark ? "浅色" : "深色";
  try { localStorage.setItem("pm-demo-theme", theme); } catch { /* no-op */ }
}

renderCapabilities();

document.querySelector("#capabilityList").addEventListener("click", (event) => {
  const button = event.target.closest(".capability-button");
  if (button) selectCapability(button.dataset.capabilityId);
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copyTarget));
});

document.querySelector(".view-switcher").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-view]");
  if (button) setView(button.dataset.view);
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const originalText = document.querySelector("#originalPrompt").textContent.trim();
const optimizedText = getOptimizedText();
document.querySelector("#originalCount").textContent = originalText.length;
document.querySelector("#optimizedCount").textContent = optimizedText.length;
document.querySelector("#appliedCount").textContent = capabilities.filter((item) => item.state === "applied").length;

let storedTheme;
try { storedTheme = localStorage.getItem("pm-demo-theme"); } catch { storedTheme = null; }
setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

selectCapability("objective");
