import SwiftUI

struct AddSnackView: View {
    @EnvironmentObject private var store: SnackStore

    @State private var brand = "Inaba"
    @State private var productName = "Churu Puree Chicken Recipe"
    @State private var category: SnackCategory = .treat
    @State private var quantity = 1
    @State private var unit: SnackUnit = .pack
    @State private var reminder: ReminderLeadTime = .seven
    @State private var expiryDate = Calendar.current.date(byAdding: .month, value: 3, to: .now) ?? .now
    @State private var selectedPetIDs: Set<UUID> = []
    @State private var isOpened = false
    @State private var notes = ""
    @State private var isShowingScanner = false
    @State private var scannedBarcode: String?
    @State private var scannedBarcodeFormat: String?
    @State private var lookupSource: String?
    @State private var lookupStatus: SnackLookupStatus = .skipped
    @State private var scannedAt: Date?

    private let brands = ["Inaba", "Applaws", "CAT FOREST", "Smitten", "Greenies", "Royal Canin"]
    private let products = ["Churu Puree Chicken Recipe", "Juicy Bites Fish And Clam Cat Treat", "Soft & Chewy Sticks Chicken Breast", "Wet Cat Food Mince Beef"]

    var body: some View {
        NavigationStack {
            ZStack {
                DesignSystem.paper.ignoresSafeArea()
                Form {
                    Section {
                        Button {
                            isShowingScanner = true
                        } label: {
                            Label("Scan product code", systemImage: "barcode.viewfinder")
                                .font(.headline)
                        }
                        .foregroundStyle(DesignSystem.piccolo)
                    } footer: {
                        Text("Scanner will try to fill brand and product name. Expiry date stays manual.")
                    }

                    if let scannedBarcode {
                        Section("Scanned product code") {
                            LabeledContent("Barcode", value: scannedBarcode)
                            if let scannedBarcodeFormat {
                                LabeledContent("Format", value: scannedBarcodeFormat)
                            }
                            if let lookupSource {
                                LabeledContent("Lookup source", value: lookupSource)
                            }
                            LabeledContent("Lookup status", value: lookupStatus.rawValue.capitalized)
                        }
                    }

                    Section("Snack details") {
                        Picker("Brand", selection: $brand) {
                            ForEach(brands, id: \.self) { brand in
                                Text(brand).tag(brand)
                            }
                        }
                        TextField("Custom brand", text: $brand)
                        Picker("Product name", selection: $productName) {
                            ForEach(products, id: \.self) { product in
                                Text(product).tag(product)
                            }
                        }
                        TextField("Custom product name", text: $productName)
                    }

                    Section {
                        if store.pets.isEmpty {
                            Text("No pets yet. Add pets in Settings.")
                                .foregroundStyle(.secondary)
                        } else {
                            ForEach(store.pets) { pet in
                                Button {
                                    togglePet(pet)
                                } label: {
                                    HStack {
                                        Circle()
                                            .fill(pet.color.color.opacity(0.22))
                                            .frame(width: 28, height: 28)
                                            .overlay(Image(systemName: "pawprint.fill").font(.caption).foregroundStyle(pet.color.color))
                                        Text(pet.name)
                                        Spacer()
                                        if selectedPetIDs.contains(pet.id) {
                                            Image(systemName: "checkmark.circle.fill")
                                                .foregroundStyle(DesignSystem.piccolo)
                                        }
                                    }
                                }
                                .foregroundStyle(DesignSystem.ink)
                            }
                        }
                    } header: {
                        Text("Pets")
                    } footer: {
                        Text("Leave empty for a shared snack.")
                    }

                    Section("Inventory") {
                        Picker("Category", selection: $category) {
                            ForEach(SnackCategory.allCases) { category in
                                Text(category.title).tag(category)
                            }
                        }
                        Stepper("Quantity: \(quantity)", value: $quantity, in: 1...99)
                        Picker("Unit", selection: $unit) {
                            ForEach(SnackUnit.allCases) { unit in
                                Text(unit.rawValue).tag(unit)
                            }
                        }
                        Picker("Reminder", selection: $reminder) {
                            ForEach(ReminderLeadTime.allCases) { option in
                                Text(option.title).tag(option)
                            }
                        }
                        DatePicker("Expiry date", selection: $expiryDate, displayedComponents: .date)
                        Toggle("Opened", isOn: $isOpened)
                        TextField("Notes", text: $notes, axis: .vertical)
                            .lineLimit(3, reservesSpace: true)
                    }

                    Button("Save Snack") {
                        saveSnack()
                    }
                    .frame(maxWidth: .infinity)
                    .font(.headline)
                }
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Add Snack")
            .sheet(isPresented: $isShowingScanner) {
                ScanProductCodeView { result in
                    applyScanResult(result)
                }
            }
        }
    }

    private func togglePet(_ pet: Pet) {
        if selectedPetIDs.contains(pet.id) {
            selectedPetIDs.remove(pet.id)
        } else {
            selectedPetIDs.insert(pet.id)
        }
    }

    private func saveSnack() {
        let normalizedBrand = brand.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalizedProductName = productName.trimmingCharacters(in: .whitespacesAndNewlines)

        let snack = Snack(
            brand: normalizedBrand,
            productName: normalizedProductName,
            category: category,
            quantity: quantity,
            unit: unit,
            expiryDate: expiryDate,
            reminderLeadTime: reminder,
            petIDs: Array(selectedPetIDs),
            isOpened: isOpened,
            notes: notes,
            isFinished: false,
            barcode: scannedBarcode,
            barcodeFormat: scannedBarcodeFormat,
            lookupSource: lookupSource,
            lookupStatus: lookupStatus,
            productImageURL: nil,
            scannedAt: scannedAt
        )
        store.addSnack(snack)
        BarcodeProductCache.save(barcode: scannedBarcode, brand: normalizedBrand, productName: normalizedProductName)
    }

    private func applyScanResult(_ result: ProductScanResult) {
        if let detectedBrand = result.brand, !detectedBrand.isEmpty {
            brand = detectedBrand
        }
        if let detectedProductName = result.productName, !detectedProductName.isEmpty {
            productName = detectedProductName
        }
        scannedBarcode = result.barcode
        scannedBarcodeFormat = result.barcodeFormat
        lookupSource = result.lookupSource
        lookupStatus = result.lookupStatus
        scannedAt = result.scannedAt
    }
}
