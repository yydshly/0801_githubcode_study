# 02 · 24 Skill 能力档案

## 能力结构

24 个 Skill 被整理为五类。分类是为了回答“什么时候用”，不是改变上游内容。

| 类别 | 数量 | 作用 |
| --- | ---: | --- |
| 规划与验证 | 2 | 拆解目标、固定输入、诊断和验收 |
| 镜头与运动 | 2 | 镜头语言、运动时间线和空间姿态 |
| 场景与资产 | 7 | 场、材质、几何、植被、建筑、行星和浮雕 |
| 环境与特效 | 8 | 海洋、水、天气、大气、云、太空、VFX、时间表面 |
| 光照与画质 | 5 | 阴影、AO、Bloom、曝光调色和最终图像管线 |

## 规划与验证

| Skill | 能力 | 什么时候用 |
| --- | --- | --- |
| `threejs-skill-router` | 把视觉目标拆为最小专家系统组合，避免同时加载无关 Skill。 | 需求同时涉及海洋、天气、镜头、材质和后期，尚不清楚先后顺序时。 |
| `threejs-visual-validation` | 固定视角、种子/尺度扫描、诊断拼图、时间与 GPU 证据。 | 需要判断效果是否真的正确、稳定、可复现，而不只“看起来不错”时。 |

## 镜头与运动

| Skill | 能力 | 什么时候用 |
| --- | --- | --- |
| `threejs-camera-direction` | 设计镜头焦段、构图、追随/环绕/侧视 rig、镜头交接和大世界原点。 | 场景空间关系不清、镜头运动无目的或需要游戏/叙事镜头时。 |
| `threejs-procedural-animation` | 解析时间线、重力转向、四元数对齐、弹簧、旋转参考系和碎片运动。 | 物体需要可重播、可调试、物理上连贯的程序化运动时。 |

## 场景与资产

| Skill | 能力 | 什么时候用 |
| --- | --- | --- |
| `threejs-procedural-fields` | 构建共享标量/向量场、频段、域扭曲、因果遮罩和程序法线。 | 地形、材质、植被、天气等多个系统需要共享同一原因时。 |
| `threejs-procedural-materials` | 混合纹理 PBR 与程序场，处理土壤、苔藓、湿润、熔岩、行星和溶解材质。 | 表面需要宏观结构和近景细节一致，而不是简单噪声染色时。 |
| `threejs-parallax-occlusion-mapping` | TSL 高度步进、轮廓裁剪、曲面 relief、自阴影和阴影深度。 | 平面材质需要明显凹凸轮廓，但不希望增加大量真实几何时。 |
| `threejs-procedural-geometry` | 语义网格写入器、曲线/环截面、UV 密度、材质组与程序模型。 | 需要通过代码构建可解释的物体、框架、枝条或机械部件时。 |
| `threejs-procedural-vegetation` | 生长层级、贴面常春藤、草地、枝环几何、叶片法线和根部风动。 | 场景需要可扩展植被、风动和与地形接触的生长逻辑时。 |
| `threejs-procedural-architecture` | 建筑体量、立面语法、暴露边分析、模块和材质槽编译。 | 城市、园区、村落或大量建筑需要规则化生成和可重复布局时。 |
| `threejs-procedural-planets` | 球面地形、山脊、陨石坑、气候/群落、程序法线和高度过滤。 | 需要无贴图或混合式行星表面，并要求陆海、气候和材质共享原因时。 |

## 环境与特效

| Skill | 能力 | 什么时候用 |
| --- | --- | --- |
| `threejs-spectral-ocean` | FFT/Gerstner 海洋、频谱级联、白浪 Jacobian、水上/水下光学和焦散。 | 需要跨尺度真实海面、航海视角或完整水下环境时。 |
| `threejs-water-optics` | 共享解析波、水面法线、池水高度场、物体涟漪、折射、吸收和反射。 | 水池、浅水或局部水体需要物体交互和可信光学时。 |
| `threejs-precipitation-surfaces` | 雨雪粒子与积雪、湿地、积水、涟漪、飞溅和天气包络联动。 | 天气必须真正改变地表，而不是只叠加屏幕雨线时。 |
| `threejs-atmosphere-aerial-perspective` | Rayleigh/Mie 大气、天空、壳层/后期交接和深度散射。 | 行星、远景、地平线和大尺度空间需要空气层次时。 |
| `threejs-volumetric-clouds` | 天气场控制密度、有界射线步进、云光照、历史重建和云影。 | 云必须有体积、光照和地面阴影，而不是天空贴图时。 |
| `threejs-raymarched-space-effects` | 弯曲光线积分、黑洞、吸积盘、虫洞和有界质量档。 | 需要真正的相对论风格光路或体积太空事件时；普通星空不需要它。 |
| `threejs-procedural-vfx` | 极光、体积火焰烟雾、流体场、再入等离子、火花、碎片、全息和 HDR 层级。 | 科幻事件、魔法、火焰烟雾或需要生命周期管理的实时特效时。 |
| `threejs-temporal-surfaces` | 持久触摸历史、结霜、玻璃雨滴、背景折射和模糊。 | 车窗、玻璃或屏幕表面需要跨帧积累与擦除时。 |

## 光照与画质

| Skill | 能力 | 什么时候用 |
| --- | --- | --- |
| `threejs-shadow-systems` | 稳定级联阴影和缓存 clipmap，带更新预算与失效策略。 | 大地形、城市和移动镜头使单张阴影图不稳定时。 |
| `threejs-screen-space-ambient-occlusion` | GTAO 地平线采样、弯曲法线、双边和时间重建。 | 接触关系不清、角落过亮，且已有可靠深度/法线时。 |
| `threejs-bloom` | HDR 提取、多尺度过滤、选择性贡献和曝光耦合。 | 发光能量需要扩散，但主体在关闭 Bloom 后仍必须成立时。 |
| `threejs-exposure-color-grading` | 亮度测量、非对称适应、单次色调映射和 3D LUT。 | 昼夜、室内外或强发光场景需要稳定曝光和统一色彩时。 |
| `threejs-image-pipeline` | 统一深度、法线、AO、Bloom、曝光、色调映射和调色的信号顺序。 | 两个以上屏幕空间系统需要共享缓冲和明确所有权时。 |

## Skill 的共同行为

上游 README 规定每个图形系统应尽量暴露：

- 确定性或可复现输入；
- 有名称的控制字段和感知参数；
- 诊断输出；
- 尺度、距离和时间稳定规则；
- 有机制依据的质量档；
- 关闭后期处理后仍然可读的基线。

这正是它对大模型的核心约束：不是只追求最终截图，而是要求代码具备可解释、可调、可验收的中间状态。

## 典型组合

| 目标 | 最小主链 |
| --- | --- |
| 真实海洋 | Router → Camera → Spectral Ocean → Atmosphere → Exposure/Grade → Validation |
| 暴雨乡村 | Router → Architecture/Vegetation → Materials → Precipitation → Water → Camera → Validation |
| 火星任务 | Router → Fields → Planets → Atmosphere → Geometry/Animation → Camera → Validation |
| 科幻事件 | Router → Geometry/Animation → VFX → Bloom → Grade/Pipeline → Validation |
| 程序化城市 | Router → Architecture/Materials → Camera → Shadows/AO → Grade → Validation |
| 雨夜车窗 | Router → Temporal Surfaces → Grade/Pipeline → Validation |

完整的可检索交互版本位于 [`skills.html`](../skills.html)。

