# Pet Snack Tracker Lightweight Design System

> 中文 / English

## 1. 设计目标 / Design Goal

**中文**

Pet Snack Tracker 的视觉目标是：温暖、清新、轻松可信。它服务于日常家庭场景，用户打开时应该感觉像是在整理家里的小储物柜，而不是在使用一套沉重的库存系统。

**English**

Pet Snack Tracker should feel warm, fresh, calm, and trustworthy. It is designed for everyday household use, so opening the app should feel like organizing a small pantry at home, not operating a heavy inventory system.

## 2. 设计原则 / Design Principles

| 中文 | English |
| --- | --- |
| **先清楚，再可爱。** 到期状态、数量和宠物归属必须一眼可见。 | **Clarity before cuteness.** Expiry status, quantity, and pet assignment must be easy to scan. |
| **温暖但不甜腻。** 使用柔和自然色，不用红色作为主色。 | **Warm, not sugary.** Use soft natural colors and avoid red as the primary color. |
| **轻手绘感。** 装饰可以有一点手作感，但核心控件必须规整、可读、好点按。 | **Light hand-drawn feeling.** Decorative details may feel handmade, while core controls stay clean, readable, and easy to tap. |
| **移动端优先。** 所有组件优先服务单手操作和手机屏幕。 | **Mobile first.** All components prioritize phone screens and comfortable thumb use. |
| **主流程可靠。** 扫码和自动补全是加速器，手动录入始终可用。 | **Reliable main flow.** Scanning and autocomplete are accelerators; manual entry must always work. |

## 3. 品牌气质 / Brand Personality

**中文**

- 像一个细心的家庭助手。
- 语气温柔直接，不制造焦虑。
- 宠物感来自小巧细节，不依赖大面积插画。
- 到期提醒要明确，但避免恐吓式视觉。

**English**

- Feels like a thoughtful household helper.
- Uses gentle, direct language without creating anxiety.
- Pet personality comes from small details, not oversized illustration.
- Expiry reminders should be clear without feeling alarming.

## 4. 色彩系统 / Color System

| Token | 用途 / Usage | Value |
| --- | --- | --- |
| `--ink` | 主文字 / Primary text | `#26322f` |
| `--ink-soft` | 次级文字 / Secondary text | `#71817a` |
| `--paper` | 页面底色 / Page background | `#f7f4e9` |
| `--surface` | 卡片和输入区域 / Cards and fields | `#fffdf5` |
| `--surface-soft` | 柔和分区底色 / Soft section background | `#f4eedf` |
| `--line` | 边框 / Borders | `#e2d9c4` |
| `--sage` | 主操作、选中态 / Primary actions and selected states | `#6fa890` |
| `--sage-dark` | 重点按钮、标题点缀 / Strong actions and accents | `#2f7463` |
| `--sky` | 信息提示 / Informational accents | `#8ab6c8` |
| `--honey` | 临期提醒 / Expiring soon | `#e3b86f` |
| `--lavender` | 辅助装饰 / Secondary decorative accent | `#b6a7d8` |
| `--mint-soft` | 成功、可用、选中背景 / Success and selected backgrounds | `#e3f3e9` |
| `--gold-soft` | 轻提醒背景 / Gentle warning background | `#fff0c4` |
| `--clay-soft` | 已过期弱背景 / Expired soft background | `#f4ddd1` |

**使用规则 / Usage Rules**

- **中文：** 主色使用 sage green，不使用红色作为主要按钮或品牌色。过期状态可以用 clay / muted coral 系列，但面积要小，文案要清楚。
- **English:** Use sage green as the primary color. Do not use red as the main action or brand color. Expired states may use clay or muted coral tones, but keep the area small and rely on clear copy.

## 5. 字体与排版 / Typography

| 用途 / Usage | 中文建议 / Chinese | English Recommendation |
| --- | --- | --- |
| App title | 28-32px, bold, tight line-height | 28-32px, bold, tight line-height |
| Screen title | 22-26px, bold | 22-26px, bold |
| Card title | 16-18px, semibold/bold | 16-18px, semibold/bold |
| Body text | 14-16px, regular | 14-16px, regular |
| Helper text | 12-13px, medium | 12-13px, medium |
| Badge text | 11-12px, bold | 11-12px, bold |

**字体方向 / Font Direction**

- **中文：** 原型阶段继续使用系统圆体优先：`ui-rounded`, `SF Pro Rounded`, `-apple-system`, `Segoe UI`, `sans-serif`。中文界面需要重点检查字重是否过黑。
- **English:** Continue with rounded system fonts in the prototype: `ui-rounded`, `SF Pro Rounded`, `-apple-system`, `Segoe UI`, `sans-serif`. For Chinese UI, check that bold text does not become visually too heavy.

## 6. 间距、圆角与触控 / Spacing, Radius, and Touch

| Token / Rule | 中文 | English |
| --- | --- | --- |
| Base spacing | 使用 4px / 8px 节奏 | Use a 4px / 8px rhythm |
| Screen padding | 手机内边距 18-22px | 18-22px screen padding on phone |
| Card radius | 18-26px，可略带不规则手感 | 18-26px, can feel softly organic |
| Input radius | 16-18px，保持稳定清晰 | 16-18px, stable and clear |
| Small button radius | 圆形或胶囊形 | Circular or pill-shaped |
| Minimum touch target | 不小于 44px | At least 44px |

**中文**

装饰元素可以有轻微旋转或不规则圆角，但表单、底部导航和日期输入不能因为装饰感牺牲可用性。

**English**

Decorative elements may use slight rotation or organic rounding, but forms, bottom navigation, and date inputs should never trade usability for decoration.

## 7. 核心组件 / Core Components

### 7.1 底部导航 / Bottom Navigation

**中文**

- 固定在屏幕底部。
- 包含 `Inventory`, `Add`, `History`, `Settings`。
- 当前 tab 使用浅绿色背景和深绿色图标/文字。
- 图标必须来自统一 icon 库，不使用临时手绘 SVG。

**English**

- Fixed at the bottom of the screen.
- Includes `Inventory`, `Add`, `History`, and `Settings`.
- Active tab uses a soft green background with deep green icon/text.
- Icons should come from one consistent icon library, not temporary hand-drawn SVGs.

### 7.2 零食卡片 / Snack Card

**中文**

卡片必须展示：产品名、品牌、过期日期、剩余天数或状态、数量、宠物归属。临期和过期状态优先通过 badge 表达，不改变整张卡片的可读性。

**English**

Each card must show snack name, brand, expiry date, remaining days or status, quantity, and assigned pets. Expiring and expired states should be expressed primarily through badges without hurting card readability.

### 7.3 添加零食表单 / Add Snack Form

**中文**

表单顺序建议：

1. 扫码入口
2. Brand
3. Snack name
4. Pet selection
5. Category / Quantity
6. Unit / Reminder
7. Expiry date
8. Save action

Brand 和 Snack name 需要支持自动补全，也必须允许自定义输入。

**English**

Recommended form order:

1. Scan entry
2. Brand
3. Snack name
4. Pet selection
5. Category / Quantity
6. Unit / Reminder
7. Expiry date
8. Save action

Brand and Snack name should support autocomplete while always allowing custom input.

### 7.4 宠物选择 Chip / Pet Selection Chip

**中文**

- 支持多选。
- 支持不选择任何宠物，表示共享零食。
- `Shared snack` 应作为一个明确选项，而不是空白状态。
- Feifei / Daniel 等用户输入名称不随语言切换翻译。

**English**

- Supports multi-select.
- Supports selecting no individual pet, meaning shared snack.
- `Shared snack` should be explicit instead of represented by an empty state.
- User-entered names such as Feifei / Daniel should not be translated when switching language.

### 7.5 状态 Badge / Status Badge

| 状态 / Status | 中文文案 | English Copy | Visual |
| --- | --- | --- | --- |
| Fresh | 新鲜 | Fresh | Mint / neutral |
| Expiring soon | 临期 | Expiring soon | Honey |
| Expired | 已过期 | Expired | Clay, small area |
| Finished | 已完成 | Finished | Neutral / muted |

**中文**

过期提醒要明确，但不要用大面积红色造成压力。

**English**

Expired reminders should be clear, but avoid large red areas that make the app feel stressful.

### 7.6 扫码入口 / Scan Entry

**中文**

- MVP 中可以先显示入口和说明，但手动录入是可靠主流程。
- 扫码按钮文案要避免承诺一定能识别保质期。
- 推荐文案：`Scan product code` / `扫描产品码`。

**English**

- In MVP, the scan entry can appear with clear expectation-setting, while manual entry remains the reliable main flow.
- Scan copy should not promise expiry-date detection.
- Recommended copy: `Scan product code` / `扫描产品码`.

## 8. 图标与装饰 / Icons and Decoration

**中文**

- 功能图标使用统一库，优先使用 lucide / better-icons 中的成熟图标。
- 宠物装饰可以使用 paw print、small bowl、tag、soft sparkle 等小元素。
- 装饰透明度要低，不能抢表单和卡片信息。
- 不建议继续手写复杂 icon，除非是明确的插画资产。

**English**

- Functional icons should come from one consistent library, preferably mature icons from lucide / better-icons.
- Pet decoration may use paw prints, small bowls, tags, or soft sparkle details.
- Decorative elements should be low-contrast and never compete with form or card information.
- Avoid hand-building complex icons unless they are intentional illustration assets.

## 9. 语言切换 / Language Switching

**中文**

- 默认界面语言：English。
- 支持 Simplified Chinese。
- 用户输入内容不翻译，包括宠物名、品牌名、产品名。
- 日期格式需要根据地区和语言进一步确认，目前原型先保持清晰可读。

**English**

- Default UI language: English.
- Supports Simplified Chinese.
- User-entered content should not be translated, including pet names, brand names, and product names.
- Date formatting should be refined by locale later; the prototype should prioritize readability for now.

## 10. Figma 文件建议结构 / Recommended Figma Structure

| Page | 中文说明 | English Description |
| --- | --- | --- |
| `00 Cover` | 项目说明和视觉方向 | Project intro and visual direction |
| `01 Tokens` | 颜色、字体、间距、圆角 | Colors, typography, spacing, radius |
| `02 Components` | 可复用组件 | Reusable components |
| `03 Screens` | 当前产品页面 | Current product screens |
| `04 Flows` | 添加零食、宠物管理等流程 | Add snack, pet management, and other flows |
| `05 Playground` | 视觉探索区 | Visual exploration area |

## 11. 当前视觉迭代 / Current Visual Iteration

**中文**

当前 prototype 已先试穿 Moon Design System 的视觉骨架。我们没有完整照搬 Moon 的品牌，而是先采用它适合移动端产品的部分：

- 更圆润的控件和卡片。
- 4px / 8px / 12px / 16px 的间距与圆角节奏。
- pill chip、清晰输入框、弱边框、浅底卡片。
- 使用 Moon 的 `piccolo` 紫色作为试穿阶段的主操作色。
- 使用 `hit` 青绿色承接 Pet Snack Tracker 原有的清新感。
- 功能图标统一改为 better-icons / lucide SVG。

这版视觉可以作为 Figma 迭代起点。颜色和字体仍然开放调整；如果 Moon 的紫色过冷，可以保留 Moon 的组件结构，把主色切回更温暖的 sage / honey 方向。

**English**

The current prototype is wearing a Moon Design System inspired visual baseline. We are not copying Moon as a brand system wholesale; instead, we are borrowing the parts that work well for a mobile product:

- Rounder controls and cards.
- 4px / 8px / 12px / 16px spacing and radius rhythm.
- Pill chips, clear input fields, soft borders, and light surfaces.
- Moon `piccolo` purple as the trial primary action color.
- Moon `hit` teal to preserve Pet Snack Tracker's fresh tone.
- Functional icons standardized with better-icons / lucide SVGs.

This version should be treated as a Figma iteration baseline. Colors and typography remain open for refinement; if Moon purple feels too cool, we can keep the component structure and move the primary color back toward warmer sage / honey tones.

## 12. 当前优先级 / Current Priority

**中文**

现阶段不需要完整企业级 design system。我们优先完成一套轻量 UI Kit，用于：

- 统一视觉方向。
- 支撑 UAT 后的界面精修。
- 让 Figma 调整和代码实现可以互相对齐。
- 为以后原生开发沉淀基础组件语言。

**English**

At this stage, we do not need a full enterprise-grade design system. The priority is a lightweight UI kit that helps us:

- Align the visual direction.
- Support UI refinement after UAT.
- Keep Figma edits and code implementation in sync.
- Prepare a basic component language for future native development.

## 13. 后续行动 / Next Actions

**中文**

1. 在 Figma 建立上述页面结构。
2. 把当前 prototype 的 4 个主要页面放进 `03 Screens`。
3. 从现有页面抽出核心组件到 `02 Components`。
4. 先确认颜色、字体、圆角和 icon 风格。
5. 再开始逐页做精细视觉调整。

**English**

1. Create the page structure above in Figma.
2. Move the 4 main prototype screens into `03 Screens`.
3. Extract core components from the current screens into `02 Components`.
4. Confirm color, typography, radius, and icon style first.
5. Then refine each screen in detail.
