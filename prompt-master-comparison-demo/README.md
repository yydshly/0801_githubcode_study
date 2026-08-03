# Prompt Master 能力对照样例

一个无依赖的静态网页，用于观察用户原始提示词经过 Prompt Master 规范化后的信息变化。

- [打开在线 Demo](https://yydshly.github.io/0801_githubcode_study/projects/prompt-master/)
- [返回研究项目总展厅](https://yydshly.github.io/0801_githubcode_study/)

## 本地运行

在本目录启动任意静态文件服务器，然后访问 `index.html`。例如：

```powershell
python -m http.server 4178
```

访问：`http://127.0.0.1:4178/`

## 页面内容

- 原始用户 Prompt；
- 三个必要澄清问题及用户回答；
- 面向 Codex 的规范化 Prompt；
- 可交互的能力映射；
- 21 项可选择能力，以及已触发、未触发与不提供能力的完整边界；
- 对比结论与风险提示。

这个样例评估的是 Prompt 的表达变化，不代表 Codex 最终执行效果。

浏览器验收记录见 `VALIDATION.md`，静态预览见 `preview.png`。

## 研究展厅发布

该项目已登记到仓库根目录的 `research-projects.json`，统一构建后位于：

```text
.pages/projects/prompt-master/
```

GitHub Pages 工作流启用并合并到默认分支后，公开地址为：

```text
https://yydshly.github.io/0801_githubcode_study/projects/prompt-master/
```
