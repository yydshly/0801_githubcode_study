# Wallet Header 验证记录

日期：2026-08-02

## 结果

| 范围 | 验证 | 结果 |
| --- | --- | --- |
| 工程 | `npm test`：2 个 scroll-progress 测试通过 | PASS |
| 工程 | `npm run build`：Vite production build 成功 | PASS |
| 桌面端 | 首屏 1280×720、视频可播放、无横向溢出 | PASS |
| 平板端 | 1024×768，首屏和滚动终点布局正常 | PASS |
| 移动端 | 390×844，菜单抽屉/联系弹窗正常且无横向溢出 | PASS |
| 滚动时间线 | 首屏 00%，终点 100%，提示语在接近终点时消失 | PASS |
| Portal Directory | 打开、关闭、Connect Keystore 状态反馈、焦点回收 | PASS |
| Contact Us | 打开、字段填写、成功态、自动关闭、焦点回收 | PASS |
| 媒体与日志 | 视频 `readyState` 可播放；浏览器 error/warn 日志为空 | PASS |
| Reduced motion | 代码路径已实现；当前浏览器未开启该系统偏好，未做强制模拟 | DEFER |

## 运行入口

开发服务器验证地址：`http://127.0.0.1:5191/`

交互为原型级模拟：Wallet 连接和联系表单不会访问真实链上服务或发送网络消息。
