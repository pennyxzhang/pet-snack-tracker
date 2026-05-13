# iOS-first Scanner Spike Task List

## 目标

用最小 iOS 原生 demo 验证：手机能否稳定扫描宠物零食包装上的 UPC / EAN / QR，并将识别结果用于产品信息查询和添加零食流程。

这不是完整 app 开发清单，而是进入原生 MVP 前的技术 spike。

## Spike 成功标准

- 可以在真实 iPhone 上打开相机扫描界面。
- 可以识别至少 UPC-A、UPC-E、EAN-8、EAN-13、QR Code。
- 可以返回 barcode raw value 和 symbology。
- 可以处理不支持设备、相机权限拒绝、扫描失败、产品库未命中。
- 可以调用免费产品 lookup API，并把命中结果映射到 `Brand` 和 `Product name`。
- 未命中时可以回到手动录入，不阻塞用户添加零食。

## 推荐技术路线

- UI: SwiftUI
- Scanner: VisionKit `DataScannerViewController`
- Barcode types: `DataScannerViewController.RecognizedDataType.barcode(symbologies:)`
- Permissions: `NSCameraUsageDescription`
- Product lookup: Open Food Facts barcode endpoint
- MVP reminder research: `UNUserNotificationCenter`

## 前置问题

| 问题 | 默认建议 |
| --- | --- |
| 第一版是否 iOS-first？ | 是 |
| iOS app 是否放在当前 repo？ | 可以先放 `/ios`，避免开太多仓库 |
| 是否现在做 Android？ | 暂缓，等 iOS spike 结果 |
| 是否接入付费 API？ | 不接入 |
| 是否做保质期 OCR？ | 不进入此 spike，只记录样本 |

## Phase 1: Xcode 项目脚手架

### Task 1.1 创建 iOS app shell

- 新建 SwiftUI app。
- App 名称暂定：`PetSnackTracker`。
- Bundle identifier 暂定：`com.petSnackTracker.prototype` 或后续再定。
- Deployment target 建议先设为 iOS 17+，如需扩大设备覆盖再评估。
- 将项目放在当前 repo 的 `/ios` 目录。

验收：

- Xcode 可打开项目。
- iPhone 模拟器可运行空壳 app。
- README 或文档记录最低 iOS 版本。

### Task 1.2 配置相机权限说明

- 在 `Info.plist` 中加入 `NSCameraUsageDescription`。
- 建议文案：
  - English: `Scan product codes to help fill in snack details.`
  - 中文：`扫描产品码以帮助填写零食信息。`

验收：

- 真机首次打开扫码页时显示相机权限请求。
- 拒绝权限后 app 不崩溃，并显示手动录入 fallback。

## Phase 2: Scanner 原型

### Task 2.1 创建扫描页面

- 新建 `ScanProductCodeView`。
- 使用 SwiftUI 包装 `DataScannerViewController`。
- 开启：
  - guidance
  - highlighting
  - pinch to zoom
- 先只允许单个结果，避免一次扫到多个码导致混乱。

验收：

- 扫描页能打开相机。
- 可退出扫描页回到 Add Snack。

### Task 2.2 支持指定 barcode symbologies

优先支持：

- `.ean13`
- `.ean8`
- `.upce`
- `.qr`

需要确认：

- UPC-A 在 iOS Vision / VisionKit 中是否以 EAN-13 形式返回。
- 是否需要额外支持 `.code128` 作为 fallback。

验收：

- 扫描结果包含：
  - raw value
  - symbology
  - timestamp

### Task 2.3 处理 scanner availability

需要检查：

- `DataScannerViewController.isSupported`
- `DataScannerViewController.isAvailable`
- 相机权限状态

状态处理：

| 状态 | UI 行为 |
| --- | --- |
| 支持且可用 | 显示扫描器 |
| 不支持 | 隐藏扫码入口或展示“设备不支持扫码” |
| 权限未授权 | 请求权限 |
| 权限拒绝 | 展示设置引导和手动录入 |
| 受系统限制 | 展示不可用说明和手动录入 |

验收：

- 不支持或不可用时不会 crash。
- 用户始终可以回到手动录入。

## Phase 3: Product Lookup

### Task 3.1 建立 barcode lookup service

- 输入：barcode value。
- 输出：
  - status: `hit` / `miss` / `error`
  - product name
  - brand
  - category
  - image URL optional
  - source

验收：

- 给定 barcode 后可以请求 Open Food Facts。
- 网络失败时返回 error，不阻塞手动输入。

### Task 3.2 字段映射

Open Food Facts 命中后映射：

| App 字段 | Product API 字段 |
| --- | --- |
| `Brand` | `brands` |
| `Product name` | `product_name` |
| `Category` | `categories` / local mapping |
| `Product image` | `image_url` |
| `lookupSource` | `open_food_facts` |
| `lookupStatus` | `hit` |

验收：

- 命中产品时 Add Snack 表单自动填充品牌和产品名。
- 分类如果不确定，不强行覆盖用户选择。

### Task 3.3 未命中 fallback

- 显示 barcode value。
- 提示未找到产品。
- 保留手动填写入口。
- 保存时可把 barcode 存到 snack record。

验收：

- lookup miss 后，用户仍可在 30 秒内完成手动添加。

## Phase 4: Sample Validation

### Task 4.1 收集真实样本

使用 [BARCODE_SAMPLE_TESTING_TEMPLATE.csv](./BARCODE_SAMPLE_TESTING_TEMPLATE.csv) 记录 10 个包装样本。

优先样本：

- 现有 5 条 UAT 数据对应包装。
- 额外 5 个真实家中零食或猫粮包装。

验收：

- 每个样本至少有品牌、产品名、barcode、barcode format、保质期文字。

### Task 4.2 手动 API 覆盖率验证

对 10 个 barcode 调 Open Food Facts。

记录：

- hit / miss
- API 返回的 product name 是否可用
- API 返回的 brand 是否可用
- 是否返回图片
- 数据是否适合自动填充

验收：

- 得到一张命中率表。
- 决定 MVP 是否依赖 Open Food Facts 作为自动填充来源。

## Phase 5: Reminder 技术验证

### Task 5.1 本地通知 spike

- 使用 `UNUserNotificationCenter`。
- 创建一条测试提醒。
- 验证 app 前后台状态下的提醒行为。

验收：

- 真机可以收到本地测试通知。
- 权限拒绝时 app 不崩溃，仍可保存零食。

## 不做事项

- 不做 App Store 发布配置。
- 不做用户登录。
- 不做云同步。
- 不做保质期 OCR。
- 不做完整 UI 还原。
- 不做 Android。

## 输出物

完成 spike 后应输出：

- iOS scanner demo。
- 10 个真实样本的扫码测试结果。
- Open Food Facts 命中率表。
- 产品 lookup 字段映射结论。
- iOS native MVP task list。
- 是否继续 iOS-first 的建议。

## 参考资料

- Apple `DataScannerViewController`: https://developer.apple.com/documentation/visionkit/datascannerviewcontroller
- Apple `DataScannerViewController.isSupported`: https://developer.apple.com/documentation/visionkit/datascannerviewcontroller/issupported
- Apple `DataScannerViewController.RecognizedDataType`: https://developer.apple.com/documentation/visionkit/datascannerviewcontroller/recognizeddatatype
- Apple `NSCameraUsageDescription`: https://developer.apple.com/documentation/bundleresources/information-property-list/nscamerausagedescription
- Apple `UNUserNotificationCenter`: https://developer.apple.com/documentation/usernotifications/unusernotificationcenter
- Open Food Facts product lookup by barcode: https://openfoodfacts.github.io/documentation/docs/Product-Opener/v3/products/get-api-v3-product-code/
