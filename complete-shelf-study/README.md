# 研究项目 03：Complete Shelf

这个子项目研究 [mengto/complete-shelf](https://github.com/mengto/complete-shelf) 如何用 Three.js、精装书材质与明确的交互状态，把少量精选内容转化成具有记忆点的空间目录。

项目包含两个演示入口：

1. **上游原版 Demo**：入口页链接作者发布的[官方在线体验](https://mengto.github.io/complete-shelf/)。本地 `upstream/` 保存拉取的研究快照，但不会进入本仓库版本控制或统一 Pages 发布物。
2. **0801 Research Volumes**：独立实现的扩展版书架，用六册“研究卷”展示现有项目、未来产品方向与验证方法。扩展版只把原作当作构图、材质、灯光与交互层级的质量参考，封面与界面均为独立设计。

## 为什么值得研究

Complete Shelf 的价值不在数据源或后端能力，而在展示结构：

```text
静态项目目录
    → 空间化书架
    → 浏览与选择
    → 详情与价值说明
    → 已有 Demo / 研究文档
```

我们借鉴了三个关键点：

- 用位置、材质和装帧建立产品记忆点；
- 用“浏览 → 选中 → 打开 → 返回”的状态变化组织交互；
- 保留可读 HTML 与静态目录，使 WebGL 成为增强层而不是内容的唯一入口。

本轮 UI 优化进一步补齐了：以 Complete Shelf 为默认焦点的展台构图、六套独立封面视觉、书脊与页块细节、主题聚光、连续底部控制栏、桌面详情态和移动端底部浮层。封面图形使用独立生成并压缩的 WebP 资产，书名、编号和研究信息仍由界面与材质层管理。

扩展演示不接入后端、登录、实时 API 或外部业务数据。产品名称、简介、状态、颜色和详情链接已经足以驱动当前展示。

## 扩展演示的六册内容

| 编号 | 卷册 | 类型 | 说明 |
| --- | --- | --- | --- |
| 01 | Finance Header | 已完成研究 | 滚动驱动的视频时间轴与界面叠层 |
| 02 | Prompt Master | 研究样例 | 把模糊意图转化成可执行契约 |
| 03 | Complete Shelf | 当前研究 | 把精选项目变成空间目录 |
| 04 | Signal Radar | 概念方向 | 从信息噪声提取可信变化信号 |
| 05 | Infinite Mentor | 概念方向 | 用模拟与反馈训练真实能力 |
| 06 | Evidence Loop | 研究方法 | 用浏览器证据完成实现闭环 |

未来方向在界面中明确标记为“概念方向”，不会被误解为已经实现的产品能力。

## 本地运行

从仓库根目录启动静态服务：

```powershell
python -m http.server 4183 --directory F:\0801_codex_project
```

然后访问：

- 研究入口：<http://127.0.0.1:4183/complete-shelf-study/>
- 扩展演示：<http://127.0.0.1:4183/complete-shelf-study/extended/>
- 本地上游快照：<http://127.0.0.1:4183/complete-shelf-study/upstream/>
- 静态降级检查：<http://127.0.0.1:4183/complete-shelf-study/extended/?fallback=1>
- 减少动态效果检查：<http://127.0.0.1:4183/complete-shelf-study/extended/?reduced-motion=1>

扩展版通过 CDN 加载固定版本的 Three.js，需要网络连接。没有 Three.js 或 WebGL 时，页面会保留完整的静态研究目录。

## 重新拉取上游快照

如果本地没有 `upstream/`：

```powershell
git clone --depth 1 https://github.com/mengto/complete-shelf.git complete-shelf-study\upstream
```

当前研究基线为提交 `6ef16625e670b0285bb689bdebffc1d728c6deb1`，提交时间为 2026-08-01。

## 授权边界

上游仓库当前根目录没有显示明确的许可证文件，因此：

- 本仓库不重新发布上游代码与封面资产；
- 统一研究展厅使用作者的官方 Demo 地址展示原作；
- 扩展版使用独立编写的代码、文案、纹理和几何构造；
- 若未来需要直接复制或商用上游实现，应先向作者确认授权。

## 项目结构

```text
complete-shelf-study/
├─ index.html              # 原版与扩展版的研究入口
├─ styles.css
├─ app.js
├─ extended/               # 独立实现的 0801 Research Volumes
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  └─ assets/covers/       # 六册独立封面图形（WebP）
├─ upstream/               # 本地上游快照，已忽略，不发布
├─ DESIGN_CONTRACT.md
├─ VALIDATION.md
├─ design-qa.md
├─ UPSTREAM.md
└─ README.md
```

## 验证记录

完整的桌面、移动端、交互、键盘、降级与运行日志记录见 [VALIDATION.md](./VALIDATION.md)。
