# PetSnackTracker iOS

This folder contains the native iOS app shell for Pet Snack Tracker.

## Current Scope

- SwiftUI app shell.
- Inventory, Add, History, Settings, and Manage Pets screens.
- Seed data matching the web prototype.
- Scanner availability placeholder using VisionKit checks.
- Local in-memory state only.

## Next Native Tasks

- Add local persistence.
- Implement live VisionKit barcode scanning.
- Add Open Food Facts lookup spike.
- Add local notification scheduling.
- Refine UI against the Figma design direction.

## Build

Open `PetSnackTracker.xcodeproj` in Xcode, or run:

```bash
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer xcodebuild \
  -project ios/PetSnackTracker.xcodeproj \
  -scheme PetSnackTracker \
  -destination 'platform=iOS Simulator,name=iPhone 17' \
  build
```
