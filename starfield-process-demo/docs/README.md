# Three.js Graphics Agent Skills 研究文档

本目录是子项目的证据与结论层。运行页面负责体验，文档负责说明来源、边界和可复验结论。

1. [原仓库审计](./01-UPSTREAM_LIBRARY.md)：原仓库是什么、版本、目录、示例库与许可边界。
2. [24 Skill 能力档案](./02-SKILL_CAPABILITY_MAP.md)：五类能力、每个 Skill 的职责和使用时机。
3. [演示追踪矩阵](./03-DEMO_TRACEABILITY.md)：12 个本地场景与 Skill、产品代码之间的真实关系。
4. [产品影响分析](./04-PRODUCT_IMPACT.md)：它对我们的价值、不能替代的能力和采用策略。
5. [维护与复验](./05-MAINTENANCE.md)：项目级安装、上游更新、审计、构建和浏览器验证。

## 一句话结论

这个库的核心不是直接运行 3D，而是通过 Skill 把高级图形知识、代码参考、失败边界和验收标准交给大模型；大模型据此生成 Three.js / GLSL / TSL，最后由 Three.js 和 GPU 产生实时画面。

