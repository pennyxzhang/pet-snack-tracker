# Pet Snack Tracker

Pet Snack Tracker is a mobile-first tool for tracking pet snack inventory and expiry dates. The goal is to help pet owners quickly record snacks, see what is expiring soon, and avoid feeding expired treats.

## Current Status

This project is currently in the MVP prototype and UAT stage.

Completed so far:

- Initial PRD.
- Printable PRD export workflow.
- Mobile web prototype deployed to Vercel.
- English-first UI with Simplified Chinese language toggle.
- Snack inventory list, add/edit form, status filtering, search, finished history.
- UAT requirement updates for brand autocomplete, product name autocomplete, pet management, and scan entry planning.
- MVP decision log and 2-week execution calendar.
- Prototype update with real UAT sample data, Feifei and Daniel pet profiles, brand/product autocomplete, multi-pet selection, pet management, and scan-entry placeholder.
- Lightweight design system draft.
- Moon Design System inspired visual refresh.
- Unified functional icons with better-icons / lucide SVGs.
- Barcode scanning and native app research plan.

Live prototype:

[https://pet-snack-tracker.vercel.app](https://pet-snack-tracker.vercel.app)

## Key MVP Decisions

- Default UI language is English, with Simplified Chinese switching.
- MVP uses free or local options only. No paid product lookup API.
- Brand and product name should support autocomplete and custom input.
- Pet management is included in MVP.
- A snack may be linked to multiple pets, or no pet.
- Barcode / QR scan is an accelerator, not a required path. Manual entry remains the reliable main flow.
- Expiry date is manually selected in MVP. OCR expiry-date scanning can be explored later.

## Current Design Direction

- Current prototype uses a Moon Design System inspired visual baseline.
- The UI keeps a warm, fresh pet-care tone while borrowing Moon-style rounded controls, soft surfaces, pill chips, and clear mobile form structure.
- Functional icons are now sourced from better-icons / lucide instead of hand-drawn CSS icons.
- Colors and typography remain open for future Figma iteration.

## Important Documents

- [PRD.md](./PRD.md)
- [ADD_SNACK_UAT_REQUIREMENTS.md](./ADD_SNACK_UAT_REQUIREMENTS.md)
- [MVP_DECISION_LOG_AND_CALENDAR.md](./MVP_DECISION_LOG_AND_CALENDAR.md)
- [MVP_DECISION_LOG_AND_CALENDAR.pdf](./MVP_DECISION_LOG_AND_CALENDAR.pdf)
- [LIGHTWEIGHT_DESIGN_SYSTEM.md](./LIGHTWEIGHT_DESIGN_SYSTEM.md)
- [BARCODE_NATIVE_RESEARCH_PLAN.md](./BARCODE_NATIVE_RESEARCH_PLAN.md)

## Prototype Files

- [index.html](./index.html)
- [styles.css](./styles.css)
- [app.js](./app.js)

## Next Steps

- Test the updated prototype on phone with real household scenarios.
- Refine add-snack flow based on UAT feedback.
- Research free barcode/product lookup coverage with real packaging samples.
- Confirm iOS-first native app scope and run a scanner spike.
- Continue visual polish toward a warm, fresh, lightly hand-drawn mobile app style.
