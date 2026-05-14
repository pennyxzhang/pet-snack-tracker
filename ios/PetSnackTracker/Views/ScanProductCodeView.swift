import SwiftUI
#if canImport(VisionKit)
import Vision
import VisionKit
#endif

struct ProductScanResult: Equatable {
    var barcode: String
    var barcodeFormat: String
    var brand: String?
    var productName: String?
    var lookupSource: String?
    var lookupStatus: SnackLookupStatus
    var scannedAt: Date
}

private struct ScannedCode: Equatable {
    enum Kind {
        case productBarcode
        case qrCode
    }

    var value: String
    var format: String
    var kind: Kind
}

private enum ScannerPhase: Equatable {
    case ready
    case lookingUp
    case found
    case notFound
    case qrCode
    case failed(String)
}

struct ScanProductCodeView: View {
    @Environment(\.dismiss) private var dismiss

    var onUseResult: (ProductScanResult) -> Void = { _ in }

    @State private var phase: ScannerPhase = .ready
    @State private var manualBarcode = ""
    @State private var scannedCode: ScannedCode?
    @State private var lookupResult: ProductScanResult?
    @State private var qrContent: String?

    var body: some View {
        NavigationStack {
            ZStack {
                DesignSystem.paper.ignoresSafeArea()
                ScrollView {
                    VStack(spacing: 18) {
                        scannerPanel
                        resultPanel
                        manualLookupPanel
                    }
                    .padding(20)
                }
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

    @ViewBuilder
    private var scannerPanel: some View {
        VStack(alignment: .leading, spacing: 14) {
            Label("Scan UPC or EAN", systemImage: "barcode.viewfinder")
                .font(.headline)
                .foregroundStyle(DesignSystem.piccolo)

            scannerContent
                .frame(height: 320)
                .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))

            Text("QR codes can be read, but MVP only uses UPC/EAN product barcodes for auto-fill.")
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
        .cardBackground()
    }

    @ViewBuilder
    private var scannerContent: some View {
        #if canImport(VisionKit)
        if #available(iOS 16.0, *), DataScannerViewController.isSupported, DataScannerViewController.isAvailable {
            LiveProductCodeScanner { code in
                handleScannedCode(code)
            }
            .overlay(alignment: .bottom) {
                Text(phase == .lookingUp ? "Looking up product..." : "Point camera at the barcode")
                    .font(.caption.weight(.semibold))
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(.ultraThinMaterial, in: Capsule())
                    .padding(.bottom, 16)
            }
        } else {
            scannerUnavailableView
        }
        #else
        scannerUnavailableView
        #endif
    }

    private var scannerUnavailableView: some View {
        VStack(spacing: 14) {
            Image(systemName: "camera.viewfinder")
                .font(.system(size: 46, weight: .semibold))
                .foregroundStyle(DesignSystem.piccolo)
            Text(scannerUnavailableMessage)
                .font(.subheadline)
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(DesignSystem.piccolo.opacity(0.08))
    }

    @ViewBuilder
    private var resultPanel: some View {
        switch phase {
        case .ready:
            EmptyView()
        case .lookingUp:
            ProgressView("Checking saved products and Open Pet Food Facts...")
                .frame(maxWidth: .infinity)
                .cardBackground()
        case .found:
            if let lookupResult {
                productResultView(result: lookupResult, isHit: true)
            }
        case .notFound:
            if let lookupResult {
                productResultView(result: lookupResult, isHit: false)
            }
        case .qrCode:
            qrResultView
        case .failed(let message):
            messageView(title: "Lookup failed", message: message, systemImage: "exclamationmark.triangle")
        }
    }

    private func productResultView(result: ProductScanResult, isHit: Bool) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            Label(isHit ? "Product found" : "Not in free database yet", systemImage: isHit ? "checkmark.circle.fill" : "questionmark.circle")
                .font(.headline)
                .foregroundStyle(isHit ? DesignSystem.hit : DesignSystem.krillin)

            VStack(alignment: .leading, spacing: 8) {
                if let brand = result.brand, !brand.isEmpty {
                    LabeledContent("Brand", value: brand)
                }
                if let productName = result.productName, !productName.isEmpty {
                    LabeledContent("Product", value: productName)
                }
                LabeledContent("Barcode", value: result.barcode)
                LabeledContent("Source", value: result.lookupSource ?? "Open Pet Food Facts")
            }
            .font(.subheadline)

            Text(isHit ? "Confirm before filling the add snack form." : "Keep the barcode, enter details manually, and this app will remember it next time.")
                .font(.footnote)
                .foregroundStyle(.secondary)

            Button(isHit ? "Use this product" : "Use barcode and enter manually") {
                onUseResult(result)
                dismiss()
            }
            .buttonStyle(.borderedProminent)
            .tint(DesignSystem.piccolo)
        }
        .cardBackground()
    }

    private var qrResultView: some View {
        VStack(alignment: .leading, spacing: 14) {
            Label("QR code read", systemImage: "qrcode.viewfinder")
                .font(.headline)
                .foregroundStyle(DesignSystem.piccolo)

            Text(qrContent ?? "No QR content available.")
                .font(.subheadline)
                .textSelection(.enabled)

            Text("QR content is shown for reference only. MVP auto-fill only supports UPC/EAN product barcodes.")
                .font(.footnote)
                .foregroundStyle(.secondary)

            Button("Back to manual entry") {
                dismiss()
            }
            .buttonStyle(.bordered)
        }
        .cardBackground()
    }

    private func messageView(title: String, message: String, systemImage: String) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Label(title, systemImage: systemImage)
                .font(.headline)
                .foregroundStyle(DesignSystem.clay)
            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Button("Try another barcode") {
                resetScan()
            }
            .buttonStyle(.bordered)
        }
        .cardBackground()
    }

    private var manualLookupPanel: some View {
        VStack(alignment: .leading, spacing: 14) {
            Label("Manual barcode lookup", systemImage: "keyboard")
                .font(.headline)
                .foregroundStyle(DesignSystem.ink)

            TextField("Enter UPC/EAN barcode", text: $manualBarcode)
                .keyboardType(.numberPad)
                .textInputAutocapitalization(.never)
                .padding(14)
                .background(.white.opacity(0.76), in: RoundedRectangle(cornerRadius: 16, style: .continuous))

            Button("Look up barcode") {
                let value = manualBarcode.trimmingCharacters(in: .whitespacesAndNewlines)
                lookupProduct(for: ScannedCode(value: value, format: "manual", kind: .productBarcode))
            }
            .buttonStyle(.borderedProminent)
            .tint(DesignSystem.piccolo)
            .disabled(manualBarcode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || phase == .lookingUp)
        }
        .cardBackground()
    }

    private var scannerUnavailableMessage: String {
        #if canImport(VisionKit)
        if #available(iOS 16.0, *) {
            if !DataScannerViewController.isSupported {
                return "This device does not support live barcode scanning. You can still enter a barcode manually."
            }
            if !DataScannerViewController.isAvailable {
                return "Live scanning is not available right now. Check camera permission, device restrictions, or use manual lookup."
            }
            return "Live scanning is available."
        } else {
            return "Live scanning requires iOS 16 or later. You can still enter a barcode manually."
        }
        #else
        return "VisionKit is unavailable in this build. You can still enter a barcode manually."
        #endif
    }

    private func handleScannedCode(_ code: ScannedCode) {
        guard phase != .lookingUp else { return }
        scannedCode = code
        if code.kind == .qrCode {
            qrContent = code.value
            phase = .qrCode
            return
        }
        lookupProduct(for: code)
    }

    private func lookupProduct(for code: ScannedCode) {
        phase = .lookingUp
        scannedCode = code
        lookupResult = nil

        Task {
            let result = await ProductBarcodeLookup.lookup(barcode: code.value, format: code.format)
            await MainActor.run {
                lookupResult = result
                phase = result.lookupStatus == .hit ? .found : .notFound
            }
        }
    }

    private func resetScan() {
        phase = .ready
        scannedCode = nil
        lookupResult = nil
        qrContent = nil
    }
}

private enum ProductBarcodeLookup {
    static func lookup(barcode: String, format: String) async -> ProductScanResult {
        if let cachedProduct = BarcodeProductCache.product(for: barcode) {
            return ProductScanResult(
                barcode: cachedProduct.barcode,
                barcodeFormat: format,
                brand: cachedProduct.brand,
                productName: cachedProduct.productName,
                lookupSource: "Saved products",
                lookupStatus: .hit,
                scannedAt: .now
            )
        }

        let fallback = ProductScanResult(
            barcode: barcode,
            barcodeFormat: format,
            brand: nil,
            productName: nil,
            lookupSource: "Open Pet Food Facts",
            lookupStatus: .miss,
            scannedAt: .now
        )

        guard let encodedBarcode = barcode.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed),
              let url = URL(string: "https://world.openpetfoodfacts.org/api/v2/product/\(encodedBarcode).json") else {
            return fallback
        }

        var request = URLRequest(url: url)
        request.setValue("PetSnackTracker/0.1 iOS MVP", forHTTPHeaderField: "User-Agent")

        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse, 200..<300 ~= httpResponse.statusCode else {
                return fallback
            }
            let decoded = try JSONDecoder().decode(OpenPetFoodFactsResponse.self, from: data)
            guard decoded.status == 1, let product = decoded.product else {
                return fallback
            }

            let brand = product.primaryBrand
            let productName = product.primaryName
            let isHit = !(brand?.isEmpty ?? true) || !(productName?.isEmpty ?? true)

            return ProductScanResult(
                barcode: barcode,
                barcodeFormat: format,
                brand: brand,
                productName: productName,
                lookupSource: "Open Pet Food Facts",
                lookupStatus: isHit ? .hit : .miss,
                scannedAt: .now
            )
        } catch {
            return fallback
        }
    }
}

private struct OpenPetFoodFactsResponse: Decodable {
    var status: Int?
    var product: OpenPetFoodFactsProduct?
}

private struct OpenPetFoodFactsProduct: Decodable {
    var brands: String?
    var productName: String?
    var productNameEn: String?
    var genericName: String?

    enum CodingKeys: String, CodingKey {
        case brands
        case productName = "product_name"
        case productNameEn = "product_name_en"
        case genericName = "generic_name"
    }

    var primaryBrand: String? {
        clean(brands?.components(separatedBy: ",").first)
    }

    var primaryName: String? {
        clean(productName) ?? clean(productNameEn) ?? clean(genericName)
    }

    private func clean(_ value: String?) -> String? {
        let trimmed = value?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return trimmed.isEmpty ? nil : trimmed
    }
}

#if canImport(VisionKit)
@available(iOS 16.0, *)
private struct LiveProductCodeScanner: UIViewControllerRepresentable {
    var onScan: (ScannedCode) -> Void

    func makeUIViewController(context: Context) -> DataScannerViewController {
        let controller = DataScannerViewController(
            recognizedDataTypes: [.barcode(symbologies: [.ean8, .ean13, .upce, .qr])],
            qualityLevel: .balanced,
            recognizesMultipleItems: false,
            isHighFrameRateTrackingEnabled: false,
            isHighlightingEnabled: true
        )
        controller.delegate = context.coordinator
        try? controller.startScanning()
        return controller
    }

    func updateUIViewController(_ uiViewController: DataScannerViewController, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(onScan: onScan)
    }

    final class Coordinator: NSObject, DataScannerViewControllerDelegate {
        var onScan: (ScannedCode) -> Void

        init(onScan: @escaping (ScannedCode) -> Void) {
            self.onScan = onScan
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didAdd addedItems: [RecognizedItem], allItems: [RecognizedItem]) {
            guard let code = addedItems.compactMap(Self.scannedCode(from:)).first else { return }
            dataScanner.stopScanning()
            onScan(code)
        }

        private static func scannedCode(from item: RecognizedItem) -> ScannedCode? {
            guard case .barcode(let barcode) = item,
                  let value = barcode.payloadStringValue?.trimmingCharacters(in: .whitespacesAndNewlines),
                  !value.isEmpty else {
                return nil
            }

            let symbology = barcode.observation.symbology
            let format = symbology.rawValue
            let kind: ScannedCode.Kind = symbology == .qr ? .qrCode : .productBarcode
            return ScannedCode(value: value, format: format, kind: kind)
        }
    }
}
#endif
