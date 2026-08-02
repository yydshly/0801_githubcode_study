# 0801 GitHub Code Study

这是我们的第一个演示 Demo 仓库，用来研究如何把一个视觉参考快速拆解成可运行的网页体验。

## 第一个项目：Finance Header - Wallet

项目位于 [`wallet-finance-header`](./wallet-finance-header/)，是一个沉浸式的 Wallet 财务/加密资产 Header 原型。

在线仓库：[yydshly/0801_githubcode_study](https://github.com/yydshly/0801_githubcode_study)

## Demo 演示

### 本地实时预览

启动开发服务器后，可以直接打开：[打开 Wallet Demo](http://127.0.0.1:5191/)

```powershell
cd wallet-finance-header
npm install
npm run dev
```

体验路径：

1. 首屏看到宇宙、月球和宇航员双手，以及 `Connect your wallet`。
2. 向下滚动，视频画面会跟随滚动位置变化，左下角时间线从 `00%` 走到 `100%`。
3. 接近页面底部后，视频自动播放尾段，并出现 `Hold the Future in Your Hands.`。
4. 点击右上角菜单可以打开 Portal Directory，点击 Contact Us 可以打开联系表单。

> 这里的链接指向本机开发服务器，只在本地启动项目后有效。若要让其他人直接访问，需要把子项目部署到静态托管服务，再将公开地址替换到这里。

### 运行项目

```powershell
cd wallet-finance-header
npm install
npm run dev
```

生产构建与测试：

```powershell
npm run build
npm test
```

## 实现原理

这个 Demo 的本质不是实时 3D，而是：

> 一段预渲染视频 + 一个由鼠标滚动控制的视频时间轴 + 叠加在视频上方的 HTML/CSS 界面。

工作流程如下：

1. 页面外层设置为大于一个屏幕的滚动空间，当前项目使用 `250vh`。
2. 内层场景使用 `position: sticky` 固定在视口中，因此滚动时场景保持在屏幕上。
3. 监听页面滚动位置，将滚动距离归一化为 `0～1` 的进度百分比。
4. 在视频前 95% 的时间线上，根据进度修改 `video.currentTime`：

   ```js
   video.currentTime = scrollProgress * 4;
   ```

5. 页面接近底部时，让视频从指定时间点继续自动播放尾段，并循环尾部画面。
6. 标题、按钮、滚动提示和 `Timeline / 00% → 100%` 都是叠加在视频上方的 HTML/CSS 元素。

因此，用户看到的“滚动驱动宇宙场景”，本质上就是把鼠标滚轮映射成了视频播放位置；它没有在浏览器中实时计算 3D 摄像机、模型、灯光或粒子。

```mermaid
flowchart LR
  A[鼠标滚动] --> B[计算页面滚动百分比]
  B --> C[更新 video.currentTime]
  B --> D[更新 Timeline 百分比]
  B --> E[控制标题和提示语]
  C --> F[视频画面变化]
  E --> G[HTML/CSS 交互层]
```

## 技术组成

- React：组件、状态和表单交互
- Vite：本地开发与生产构建
- Tailwind CSS：布局、响应式和视觉样式
- Framer Motion：标题、提示语、抽屉和弹窗过渡
- HTML5 Video：承载主视觉视频并响应滚动时间轴

Wallet 连接和 Contact Us 是原型级模拟交互，不会访问真实链上服务或发送真实网络消息。

## 项目文档

- [子项目说明](./wallet-finance-header/README.md)
- [验证记录](./wallet-finance-header/docs/verification-coverage.md)
- [设计契约](./docs/superpowers/specs/2026-08-02-wallet-finance-header-design.md)
- [实现计划](./docs/superpowers/plans/2026-08-02-wallet-finance-header.md)
