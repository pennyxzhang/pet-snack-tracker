import SwiftUI
#if canImport(VisionKit)
import VisionKit
#endif

struct ScanProductCodeView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ZStack {
                DesignSystem.paper.ignoresSafeArea()
                VStack(spacing: 20) {
                    Image(systemName: "barcode.viewfinder")
                        .font(.system(size: 56, weight: .semibold))
                        .foregroundStyle(DesignSystem.piccolo)
                        .frame(width: 112, height: 112)
                        .background(DesignSystem.piccolo.opacity(0.12), in: RoundedRectangle(cornerRadius: 32, style: .continuous))

                    VStack(spacing: 8) {
                        Text("Scan product code")
                            .font(.title2.weight(.bold))
                        Text(scannerMessage)
                            .multilineTextAlignment(.center)
                            .foregroundStyle(.secondary)
                    }

                    VStack(alignment: .leading, spacing: 12) {
                        Label("UPC / EAN / QR first", systemImage: "checkmark.circle")
                        Label("Auto-fill brand and product name later", systemImage: "shippingbox")
                        Label("Expiry date remains manual", systemImage: "calendar")
                    }
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(DesignSystem.ink)
                    .cardBackground()

                    Button("Manual entry for now") {
                        dismiss()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(DesignSystem.piccolo)
                }
                .padding(24)
            }
            .navigationTitle("Scanner")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }

    private var scannerMessage: String {
        #if canImport(VisionKit)
        if #available(iOS 16.0, *) {
            if !DataScannerViewController.isSupported {
                return "This device does not support VisionKit scanning. Manual entry will stay available."
            }
            if !DataScannerViewController.isAvailable {
                return "Scanner is supported, but not available right now. Check camera permission or device restrictions."
            }
            return "VisionKit scanner is available. The next spike will connect live scanning and product lookup."
        } else {
            return "Scanner requires iOS 16 or later. Manual entry will stay available."
        }
        #else
        return "VisionKit is unavailable in this build. Manual entry will stay available."
        #endif
    }
}
