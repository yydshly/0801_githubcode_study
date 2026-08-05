# 概念图生成记录

## 方法

使用 OpenAI 内置图像生成工具生成一张2×2四阶段概念板。它是 `reference-only` 视觉资料，不是运行截图或可直接转换的三维模型。

## 最终提示词

```text
Use case: stylized-concept
Asset type: 2x2 game environment gameplay concept board, visual reference for a browser-based 3D survival game
Primary request: four equal-sized panels showing the same realistic tropical volcanic island and the same lone adult castaway progressing from helpless arrival to independent survival
Scene/backdrop: one consistent island geography in every panel — a crescent wreck beach in the foreground, dark rocky headland on the left, shallow turquoise tide pools and reef on the right, coconut and coastal scrub belt behind the beach, a freshwater creek entering from dense inland forest, and a misty volcanic mountain with a narrow waterfall in the far background
Subject: the same adult survivor in every panel, short dark hair, faded off-white long-sleeve shirt with rolled sleeves, dark weathered trousers, bare feet at first, later a rope satchel and practical handmade tools; full body visible at realistic scale
Panel 1: storm aftermath at early morning, the survivor newly washed ashore beside broken boat debris, wet sand, rough ocean, circling seabirds, no tools or shelter
Panel 2: midday exploration beside the freshwater creek, survivor examining animal tracks and useful plants, fish visible in clear shallows, crabs at tide pools, birds moving above the canopy
Panel 3: violent tropical rain at night, the survivor protecting a small fire beneath a believable lean-to shelter, wind bending palms, dark high waves with shoreline foam, wet clothing and tense survival mood
Panel 4: calm golden morning several weeks later, a modest hand-built camp integrated into the same bay with a small timber-and-palm hut, rainwater collector, fish drying rack, storage baskets, tiny garden, canoe and short dock; island remains wild rather than urbanized
Style/medium: polished stylized realism, high-end real-time 3D game screenshot, physically believable materials and ecology, original visual identity
Composition/framing: each panel uses the same elevated third-person gameplay camera, approximately 35-degree downward angle behind and above the character; readable terrain routes, landmarks and interactable resources; no cinematic close-ups
Lighting/mood: believable tropical natural light and weather progression; atmospheric depth without hiding gameplay
Materials/textures: layered ocean water with shallow depth color, reef visibility, directional waves, shoreline foam and wet sand; detailed but performance-feasible vegetation, rock, fabric, wood and rain
Constraints: technically achievable using imported rigged GLB characters and animals plus procedural Three.js ocean, weather and lighting; make every panel look like an actual playable screen; consistent character identity, camera, island silhouette, scale and art direction across all four panels; realistic island ecology and construction; no text, no labels, no UI, no logos, no watermark
Avoid: flat blue water, primitive geometric placeholder objects, floating lights, random species mixtures, fantasy creatures, zombies, giant monuments, modern manufactured buildings, oversized character, promotional key art, impossible construction, photobashed collage
```
