# 扫码功能与手机 App 开发 Research Plan

## 目的

这份文档用于规划 Pet Snack Tracker 从 Web prototype 进入扫码能力和原生手机 app 开发前的技术验证。目标不是马上完整开发，而是先确认：哪些能力可靠、哪些能力只能作为辅助、哪些能力需要延后。

## 当前结论

- MVP 可以做扫码入口，但扫码必须是加速器，不是必经路径。
- 手动录入仍然是主流程。
- MVP 扫码目标应聚焦在自动填充 `Brand`、`Product name`、`Category`，不承诺自动识别过期日期。
- 商品条码通常不包含保质期。保质期自动识别需要 OCR，建议作为 V1 research，不进入 MVP 阻塞范围。
- 免费方案可先用 Open Food Facts 做 barcode lookup 覆盖率验证，但不能假设宠物食品命中率足够高。
- 如果先做 iPhone 版本，建议走 iOS-first 原生方案：SwiftUI + VisionKit + local notifications。
- 如果需要 iOS / Android 同时推进，再评估 React Native 或 Flutter。但这会牺牲交互原生感和部分平台能力的直接性。

## MVP 扫码范围

### 支持的码类型

优先支持：

- UPC-A
- UPC-E
- EAN-8
- EAN-13
- QR Code

可延后：

- Code 128
- Data Matrix
- PDF417
- Aztec

### 扫码后结果处理

| 扫描结果 | MVP 行为 |
| --- | --- |
| 扫到 UPC / EAN 条码，并且产品库命中 | 自动填充品牌、产品名、分类；过期日期仍手动选择 |
| 扫到 UPC / EAN 条码，但产品库未命中 | 保留条码值，提示用户手动填写 |
| 扫到 QR Code URL | 展示或保存链接；仅在能明确解析产品信息时自动填充 |
| 扫到普通文本 QR | 展示识别内容，不强行填充 |
| 扫描失败 | 回到手动录入，不阻塞添加零食 |

## 不进入 MVP 的范围

- 不承诺通过扫码自动识别保质期。
- 不接入付费商品数据库。
- 不建立自有云端产品库。
- 不做用户贡献商品信息的审核流程。
- 不做跨设备云同步。

## iOS 技术方案

### 推荐方案

SwiftUI + VisionKit `DataScannerViewController`

适合原因：

- Apple 原生能力，用户体验更贴近 iOS。
- 支持实时相机扫描。
- 可识别 machine-readable codes，并可扩展到文字识别 research。
- 未来做保质期 OCR research 时路线更顺。

### 关键限制

- 需要检查 `DataScannerViewController.isSupported`。
- Apple 文档说明该能力要求 A12 Bionic 或更新芯片。
- 需要检查 `isAvailable`，因为相机权限、家长控制或系统限制都可能导致不可用。
- 需要在 `Info.plist` 配置相机权限说明。

### iOS MVP 模块

- SwiftUI screens:
  - Inventory
  - Add Snack
  - Scan Product Code
  - Manage Pets
  - Settings
- Local storage:
  - 首版可用 SwiftData 或本地 JSON / UserDefaults 做验证。
  - 如果计划长期演进，建议 SwiftData。
- Notification:
  - 使用 `UNUserNotificationCenter` 做本地到期提醒。
  - 添加 / 编辑 / 删除零食时同步更新 pending notification。
- i18n:
  - 默认 English。
  - 支持 Simplified Chinese。
  - 用户输入内容不翻译。

## Android 技术方案

### 推荐方案

Kotlin + Jetpack Compose + ML Kit Barcode Scanning

适合原因：

- ML Kit Barcode Scanning 可离线识别常见一维和二维码。
- 支持 UPC-A、UPC-E、EAN-8、EAN-13、QR Code 等常用格式。
- 可以限制扫描格式来提升速度。

### Android MVP 模块

- Jetpack Compose screens:
  - Inventory
  - Add Snack
  - Scan Product Code
  - Manage Pets
  - Settings
- Local storage:
  - Room 或 DataStore。
- Notification:
  - Android local notifications / WorkManager 视提醒策略而定。

## 是否先做跨平台

| 路线 | 优点 | 风险 | 建议 |
| --- | --- | --- | --- |
| iOS-first native | 最快做出高质量 iPhone 体验；扫码和通知更直接 | Android 需要后续单独做 | 如果你们主要先用 iPhone，推荐 |
| Native iOS + Native Android | 双平台体验好 | 初期开发量最大 | 等 iOS MVP 验证后再决定 |
| React Native / Expo | 一套代码覆盖双平台，prototype 到 app 迁移快 | 原生扫码、通知、权限和长期维护需要额外处理 | 如果必须双平台同步，可评估 |
| Flutter | UI 一致性强，跨平台成熟 | 设计系统和原生平台细节需要适配 | 可作为备选，不作为当前默认 |

当前建议：**先做 iOS-first native spike**。原因是产品还在验证期，先把一个平台做顺，比一开始双平台拉满更稳。

## 产品查询方案

### 免费 MVP 方案

使用 Open Food Facts barcode lookup 做验证：

- 按 barcode 查询产品。
- 读取品牌、产品名、分类、图片等字段。
- 如果命中率低，不阻塞主流程。
- 不做 search-as-you-type 查询，避免触发速率限制。

### 需要验证的问题

- 宠物食品在 Open Food Facts 的覆盖率如何？
- 澳洲购买的猫零食命中率如何？
- 同一产品不同地区包装是否共用条码？
- 产品名和品牌字段质量是否足够可用？
- 是否有宠物食品专门数据库可免费使用？

## 真实样本测试计划

### 需要准备的测试材料

建议收集 10 个真实包装样本：

- 现有 5 条 UAT 零食数据对应包装。
- 额外 5 个家中常见或近期会购买的零食。

每个样本记录：

| 字段 | 说明 |
| --- | --- |
| Brand | 包装上的品牌 |
| Product name | 包装上的完整产品名 |
| Barcode value | UPC / EAN 条码数字 |
| QR content | 如果有二维码，记录扫出来的内容 |
| Expiry text | 包装上的保质期文字 |
| Product photo | 正面包装照片 |
| Expiry photo | 保质期区域照片 |
| Lookup result | Open Food Facts 是否命中 |

### 验收指标

| 指标 | MVP 目标 |
| --- | --- |
| 条码识别成功率 | 10 个样本中至少 9 个能扫出条码值 |
| 产品库命中率 | 先观察，不设硬性目标 |
| 自动填充可用率 | 命中产品中至少品牌和产品名可用 |
| 手动 fallback | 未命中时 100% 可继续手动添加 |
| 用户理解度 | 用户知道扫码不是必须操作 |

## 保质期 OCR Research

### 为什么不放进 MVP

- UPC / EAN 条码通常标识产品，不包含具体保质期。
- QR Code 内容不统一，可能是官网、营销页、防伪页或溯源码。
- 保质期通常是包装上独立印刷的文字，需要 OCR。
- OCR 结果存在误识别风险，必须让用户确认。

### V1 可探索方案

iOS：

- VisionKit / Vision text recognition
- 拍摄保质期区域
- 识别 `EXP`、`Best Before`、`Use By` 等日期文本
- 展示候选日期，让用户确认

Android：

- ML Kit Text Recognition
- 同样需要用户确认

### OCR 验证样本

需要至少 10 张保质期区域照片，覆盖：

- `EXP 2026/09/30`
- `Best Before 30 Sep 2026`
- `BB 10/06/2026`
- 点阵喷码
- 弯曲包装
- 低光照
- 中英文混合

## 数据模型影响

建议在现有 Snack 模型里增加：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `barcode` | string optional | 扫描出的 UPC / EAN |
| `barcodeFormat` | string optional | EAN-13、UPC-A、QR 等 |
| `lookupSource` | string optional | Open Food Facts / local / manual |
| `lookupStatus` | enum | hit / miss / skipped |
| `productImageUrl` | string optional | 免费产品库返回的图片 |
| `scannedAt` | date optional | 最近扫码时间 |

过期日期字段保持用户手动确认，不由扫码直接写入。

## 两周建议计划

| 日期 | 任务 | 产出 |
| --- | --- | --- |
| Day 1 | 收集真实包装 barcode 和照片 | 10 条扫码测试样本 |
| Day 2 | Open Food Facts 查询验证 | 命中率表格 |
| Day 3 | iOS scanner spike | 能扫出 barcode raw value 的 iOS demo |
| Day 4 | 产品 lookup spike | 扫码后尝试填充品牌和产品名 |
| Day 5 | 手动 fallback 设计 | 扫描失败 / 未命中流程 |
| Day 6 | 本地通知技术验证 | 添加一条测试到期提醒 |
| Day 7 | 技术复盘 | 确认原生 MVP 范围 |
| Week 2 | 原生 MVP 任务拆分 | iOS-first task list / backlog |

## 风险与应对

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| Open Food Facts 宠物食品覆盖率低 | 自动填充体验有限 | 本地常用产品库 + 手动录入 |
| iOS 设备不支持 VisionKit scanner | 某些旧设备无法使用 | 扫码入口隐藏或展示手动录入 |
| QR 内容不可解析 | 无法自动填充 | 仅保存链接或提示手动填写 |
| OCR 误识别保质期 | 可能导致错误提醒 | V1 才做，且必须用户确认 |
| 原生双平台开发量过大 | MVP 推进变慢 | iOS-first 验证后再扩展 |

## 推荐下一步

1. 先收集 10 个真实包装的 barcode、产品名、品牌和保质期照片。
2. 我们用这些样本做 Open Food Facts 覆盖率测试。
3. 同时确认第一版原生 app 是否 iOS-first。
4. 如果 iOS-first 成立，下一份文档拆 iOS MVP task list。
5. 之后再开始 SwiftUI scanner spike。

## 参考资料

- Apple VisionKit `DataScannerViewController.isSupported`: https://developer.apple.com/documentation/visionkit/datascannerviewcontroller/issupported
- Apple User Notifications `UNUserNotificationCenter`: https://developer.apple.com/documentation/usernotifications/unusernotificationcenter
- Google ML Kit Barcode Scanning: https://developers.google.com/ml-kit/vision/barcode-scanning
- Google ML Kit `Barcode` formats: https://developers.google.com/android/reference/com/google/mlkit/vision/barcode/common/Barcode
- Open Food Facts API introduction: https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/
- Open Food Facts product lookup by barcode: https://openfoodfacts.github.io/documentation/docs/Product-Opener/v3/products/get-api-v3-product-code/
