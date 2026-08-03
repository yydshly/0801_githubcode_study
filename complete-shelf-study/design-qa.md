# Complete Shelf · Design QA

## Comparison target

- Source visual truth：`C:\Users\yun68\AppData\Local\Temp\codex-clipboard-ed550b27-88e5-4ed8-b59e-5a62a13e5af7.png`
- Rendered implementation：`F:\0801_codex_project\complete-shelf-study\.qa\qa-final-desktop-2048.png`
- Full-view comparison：`F:\0801_codex_project\complete-shelf-study\.qa\qa-comparison-full.png`
- Focused stage / controls comparison：`F:\0801_codex_project\complete-shelf-study\.qa\qa-comparison-stage-controls.png`
- Route：`http://127.0.0.1:4184/projects/complete-shelf-study/extended/`
- State：默认书架态，Volume 03 · Complete Shelf 选中。
- CSS viewport：2048 × 1024，device density 1×。
- Source pixels：2048 × 1024；来源截图包含约 20px 浏览器栏，对比前裁去该区域并重采样为 2048 × 1024。
- Implementation pixels：2048 × 1024；无浏览器外框。

## Findings

本轮最终对比没有仍需处理的 P0、P1 或 P2 问题。

- 字体与排版：原作的小型出版信息、衬线展示标题和低密度阅读节奏得到保留；扩展版底部标题不再越界，桌面和 390px 移动端均无断裂或不可读截断。
- 间距与布局：保留大面积上部负空间、连续书架和中心选择；书架与控制栏使用独立基线，核心控制均位于安全区。2048 × 1024、1440 × 900 和 390 × 844 无横向溢出。
- 颜色与视觉 token：原作冷灰背景被有意替换为 0801 的中性炭黑；主题色只作用于选中书、聚光、主按钮和进度，不再污染全部场景。
- 图像质量：六册均使用独立的 1024 × 1280 WebP 封面资产，没有占位图、CSS 图形、手绘 SVG 或重复线框；图像裁切与书体比例一致，桌面默认态保持清晰。
- 文案与内容：编号、研究类型、标题、摘要、研究问题、价值、状态和表达方式均与当前研究目录一致；概念方向没有被描述为已实现能力。
- 控件与图标：核心操作使用完整文字标签，不依赖难以辨认的自制图标；翻页、打开、关闭、项目入口和位置标记均可操作。
- 状态与交互：默认选择、切换、详情、封面展开、Escape 返回、焦点恢复、移动底部浮层、静态降级和减少动态路径均通过。
- 可访问性：语义按钮和区域标签可读；焦点样式可见；移动按钮尺寸可点击；封面图在静态目录中使用空 alt，项目信息由相邻文字提供。

可接受的有意差异：扩展版默认选择 Complete Shelf 而非原作 Codex；封面视觉、配色、产品信息和连续底部控制栏均为 0801 自有表达。参考图只定义空间质量，不作为逐像素复制目标。

## Comparison history

### Baseline → final

- Earlier P1：书籍接近占满视口，首册默认选择造成左侧空洞，亮色非选中卷册抢焦点。
- Fix：重算相机、书架尺度、卷册宽高、间距和默认选择；增加选中前移、抬升、缩放、材质亮度与主题聚光。
- Earlier P1：六册复用相同圆环线框，封面呈换色模板感。
- Fix：生成并接入六套独立封面图形；增加圆角书板、书脊、页块、堵头、书签、第一页和接触阴影。
- Earlier P2：左下标题接近裁切，打开按钮、翻页和进度分散且层级过弱。
- Fix：将信息、主操作和浏览控制合并为连续底部控制栏，并建立桌面 / 移动重排。
- Post-fix evidence：`qa-final-desktop-2048.png`、`qa-final-detail-desktop.png`、`qa-final-cover-open-desktop.png`、`qa-final-mobile-default.png`、`qa-final-mobile-detail.png`。

### Final polish

- P3：书架上方残留的装饰标题和交互提示仍略微竞争注意力。
- Fix：将装饰标题降至 3.5% 透明度并移除重复交互提示；最终截图已更新。

## Browser and engineering evidence

- 2048 × 1024 与 1440 × 900 默认态：Complete Shelf 居中，六册可辨，控制栏完整。
- 桌面详情：关闭按钮获得焦点；详情面板、项目入口和封面展开状态可用。
- 390 × 844：`scrollWidth === clientWidth === 390`；详情浮层宽 370px，可滚动且保留场景。
- 键盘：Escape 返回书架并把焦点交还 `openDetail`；右方向键从 03 切换到 04。
- `?fallback=1`：WebGL 不启动，六册静态目录与 3 个已有链接可用。
- `?reduced-motion=1`：`data-reduced-motion="true"`，WebGL 正常加载。
- 控制台：默认、详情、移动和 reduced-motion 路径无 error / warning。
- `node --check complete-shelf-study\extended\app.js`：通过。
- `node scripts\build-research-pages.mjs --base=/`：通过，统一发布目录包含 3 个研究项目。

Focused comparison was required because cover typography, cover imagery, shelf baseline, and bottom controls are too small to judge reliably from the full 4096px comparison alone; the normalized focused comparison checks those regions directly.

final result: passed
