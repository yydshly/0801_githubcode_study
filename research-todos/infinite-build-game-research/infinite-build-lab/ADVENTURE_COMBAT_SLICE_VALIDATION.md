# Research 08 · Adventure 准成品战斗切片验证记录

> 对应契约：`ADVENTURE_COMBAT_SLICE_CONTRACT.md`
> 当前状态：通过

## 基线

- 当前攻击在按下按钮时立即计算距离与伤害，没有可观察的前摇、命中窗口和后摇。
- 敌人接近后直接定时扣除玩家生命，没有可读的攻击预警。
- 角色使用单张静态媒体，移动与攻击主要依靠整体位移和弧线特效表达。
- 已有优势：原创森林、人物身份、基础 HUD、移动/攻击/重置闭环和媒体失败回退均已存在。

## 验证清单

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| 修改前桌面基线 | pass | 捕获 R4 舞台：静态角色已成立，但按键即扣血、敌人无预警 |
| 玩家攻击三阶段与单次命中 | pass | `adventure-combat-core` 测试确认 startup → active → recovery；接战场景首击只从 100 降至 82 |
| 三段输入缓存与击杀 | pass | 连续三次按钮输入后依次结算 18、24、58，敌人 HP 为 0、状态为 dead |
| 敌人预警和反击 | pass | `?combat=telegraph` 在玩家 100 HP 时先显示 telegraph 红环；停留后进入 active / recovery 并扣血 |
| 命中 / 落空 / 受击反馈差异 | pass | `contact` 首击敌人 82 HP；`miss` 首击仍为 100 HP；反馈文字不同 |
| 声音解锁、静音和视觉等价反馈 | pass | 实际按钮切换为“声音：关”、`aria-pressed=true`；战斗文字和画面仍可读 |
| 动作资产加载与程序化回退 | pass | 两张透明图集加载；`?visuals=off&combat=contact` 仍命中并结算 18 伤害 |
| 增强视觉 / 机制基线对照 | pass | 同页切换后保留静态角色与同一规则，关闭场景媒体、动作图集和分层表现 |
| Online 共享资产证明 | pass | 桌面与移动布局均显示“同一角色 · 16 帧动作图集”及复用说明 |
| 桌面与 390px 移动端 | pass | 390px iframe 的实际内容宽 375px；Adventure 与 Online 均 `horizontalOverflow=false`，攻击/对照控制可达 |
| reduced motion | pass | `?motion=reduce&combat=contact` 命中后敌人 82 HP、shake=0，文字反馈保留 |
| 键盘与焦点 | pass | 真实 Space 键完成首击；攻击按钮获得 2px 可见焦点轮廓；控制均为原生 button |
| 控制台与性能观察 | pass | 新鲜产品页运行日志为空；VFX 粒子上限 48、斩击上限 4、音频并发上限 8，操作无可感知卡顿 |
| 自动化测试与构建 | pass | `node --test` 全部通过；`node scripts/build-research-pages.mjs` 成功 |

## 最终判定

本轮范围通过。结果证明：视觉素材决定角色与世界是否“像一个游戏”，但成品感还依赖动作状态、伤害时序、敌人可读性、反馈层、声音与界面包装共同工作。当前结果是 L3 可演示战斗切片，不宣称为完整商业动作系统。

## 运行时固定场景

- `?combat=contact`：首击命中和三段连击。
- `?combat=telegraph`：敌人预警与反击。
- `?combat=miss`：攻击落空。
- `?motion=reduce`：减少动态效果等价路径。
- `?visuals=off`：媒体失败 / 程序化降级路径。
