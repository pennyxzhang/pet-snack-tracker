import Foundation
import SwiftUI

enum SnackCategory: String, CaseIterable, Identifiable, Codable {
    case treat
    case wetFood
    case dryFood
    case dental
    case supplement
    case other

    var id: String { rawValue }

    var title: String {
        switch self {
        case .treat: "Treat"
        case .wetFood: "Wet food"
        case .dryFood: "Dry food"
        case .dental: "Dental"
        case .supplement: "Supplement"
        case .other: "Other"
        }
    }
}

enum SnackUnit: String, CaseIterable, Identifiable, Codable {
    case pack
    case bag
    case can
    case box
    case stick

    var id: String { rawValue }
}

enum ReminderLeadTime: Int, CaseIterable, Identifiable, Codable {
    case one = 1
    case three = 3
    case seven = 7
    case fourteen = 14
    case thirty = 30

    var id: Int { rawValue }

    var title: String {
        "\(rawValue) \(rawValue == 1 ? "day" : "days") before"
    }
}

enum PetSpecies: String, CaseIterable, Identifiable, Codable {
    case cat
    case dog
    case other

    var id: String { rawValue }

    var title: String {
        switch self {
        case .cat: "Cat"
        case .dog: "Dog"
        case .other: "Other"
        }
    }
}

enum PetColor: String, CaseIterable, Identifiable, Codable {
    case sage
    case sky
    case honey
    case lavender

    var id: String { rawValue }

    var color: Color {
        switch self {
        case .sage: DesignSystem.hit
        case .sky: DesignSystem.sky
        case .honey: DesignSystem.krillin
        case .lavender: DesignSystem.lavender
        }
    }
}

enum SnackLookupStatus: String, Codable {
    case skipped
    case hit
    case miss
}

struct Pet: Identifiable, Codable, Equatable {
    var id = UUID()
    var name: String
    var species: PetSpecies
    var color: PetColor
}

struct Snack: Identifiable, Codable, Equatable {
    var id = UUID()
    var brand: String
    var productName: String
    var category: SnackCategory
    var quantity: Int
    var unit: SnackUnit
    var expiryDate: Date
    var reminderLeadTime: ReminderLeadTime
    var petIDs: [UUID]
    var isOpened: Bool
    var notes: String
    var isFinished: Bool
    var barcode: String?
    var barcodeFormat: String?
    var lookupSource: String?
    var lookupStatus: SnackLookupStatus
    var productImageURL: URL?
    var scannedAt: Date?

    var daysUntilExpiry: Int {
        Calendar.current.dateComponents([.day], from: Calendar.current.startOfDay(for: .now), to: Calendar.current.startOfDay(for: expiryDate)).day ?? 0
    }

    var status: SnackStatus {
        if isFinished {
            return .finished
        }
        if daysUntilExpiry < 0 {
            return .expired
        }
        if daysUntilExpiry <= reminderLeadTime.rawValue {
            return .expiringSoon
        }
        return .fresh
    }
}

struct CachedBarcodeProduct: Codable, Equatable {
    var barcode: String
    var brand: String
    var productName: String
    var updatedAt: Date
}

enum BarcodeProductCache {
    private static let storageKey = "petSnackTracker.barcodeProductCache.v1"

    static func product(for barcode: String) -> CachedBarcodeProduct? {
        products()[normalized(barcode)]
    }

    static func save(barcode: String?, brand: String, productName: String) {
        guard let barcode = barcode else { return }
        let normalizedBarcode = normalized(barcode)
        let normalizedBrand = brand.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalizedProductName = productName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !normalizedBarcode.isEmpty, !normalizedBrand.isEmpty || !normalizedProductName.isEmpty else { return }

        var cachedProducts = products()
        cachedProducts[normalizedBarcode] = CachedBarcodeProduct(
            barcode: normalizedBarcode,
            brand: normalizedBrand,
            productName: normalizedProductName,
            updatedAt: .now
        )
        save(cachedProducts)
    }

    private static func products() -> [String: CachedBarcodeProduct] {
        guard let data = UserDefaults.standard.data(forKey: storageKey),
              let decoded = try? JSONDecoder().decode([String: CachedBarcodeProduct].self, from: data) else {
            return [:]
        }
        return decoded
    }

    private static func save(_ products: [String: CachedBarcodeProduct]) {
        guard let encoded = try? JSONEncoder().encode(products) else { return }
        UserDefaults.standard.set(encoded, forKey: storageKey)
    }

    private static func normalized(_ barcode: String) -> String {
        barcode.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

enum SnackStatus: String {
    case fresh
    case expiringSoon
    case expired
    case finished

    var title: String {
        switch self {
        case .fresh: "Fresh"
        case .expiringSoon: "Soon"
        case .expired: "Expired"
        case .finished: "Finished"
        }
    }

    var color: Color {
        switch self {
        case .fresh: DesignSystem.hit
        case .expiringSoon: DesignSystem.krillin
        case .expired: DesignSystem.clay
        case .finished: DesignSystem.trunks
        }
    }

    var background: Color {
        color.opacity(0.14)
    }
}
