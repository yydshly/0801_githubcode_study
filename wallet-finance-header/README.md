# Finance Header - Wallet

这是研究项目的第一个子项目：一个沉浸式、滚动驱动的 Wallet 财务/加密资产 Header 原型。

## 本地运行

```powershell
cd wallet-finance-header
npm install
npm run dev
```

生产构建与单元测试：

```powershell
npm run build
npm test
```

## 已实现

- 以 `https://cdn.jiro.build/Wallet/Astro.mp4` 为主视觉素材，滚动位置驱动视频时间线。
- 首屏/终点状态：`Connect your wallet`、`Hold the Future in Your Hands.`、`Timeline / 00% → 100%`。
- Wallet 状态切换、Portal Directory 抽屉、Connect Keystore 模拟连接反馈。
- Contact Us 弹窗、表单提交成功态、自动关闭和焦点回收。
- 桌面、平板、移动端响应式布局，无横向滚动溢出。
- `prefers-reduced-motion` 下暂停视频 scrub 与界面动效，并提供静态画面回退。

视觉素材来自外部 CDN；离线或加载失败时，界面会保留可用的黑色静态背景、内容和交互。
