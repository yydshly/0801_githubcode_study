# 资产来源记录

| ID | 游戏内内容 | 来源 | 许可 | 运行时文件 |
| --- | --- | --- | --- | --- |
| concept-four-states-v1 | 四阶段镜头、天气和成长方向参考 | OpenAI 内置图像生成，2026-08-05 | 项目参考图 | `assets/concepts/four-stage-gameplay-direction-v1.png` |
| kaykit-adventurer-ranger | 完整服装人物、骨骼、待机、行走、奔跑与互动动作 | Kay Lousberg，KayKit Adventurers 2.0 | CC0 1.0 | `public/assets/runtime/character/` |
| kenney-nature-kit | 棕榈、灌木、岩石、独木舟 | Kenney，Nature Kit 2.1 | CC0 1.0 | `public/assets/runtime/nature/` |
| kenney-survival-kit | 木料、石块、火堆、鱼、倒木 | Kenney，Survival Kit 2.0 | CC0 1.0 | `public/assets/runtime/survival/` |

原始许可文件保存在 `public/assets/runtime/licenses/`，随生产构建一起分发。人物候选曾验证 Quaternius 基础人物与模块服装，但因为免费标准文件需要组合两个骨骼模型，容易出现缺少头部或穿模，最终没有进入运行时构建。

程序化内容包括海浪、岸边泡沫、天空、云、雨、溪流、山体轮廓、螃蟹和海鸟；它们由本项目代码生成，不伪装成下载模型。
