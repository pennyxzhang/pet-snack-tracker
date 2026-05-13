import Foundation

final class SnackStore: ObservableObject {
    @Published var snacks: [Snack]
    @Published var pets: [Pet]

    init() {
        let feifei = Pet(name: "Feifei", species: .cat, color: .sage)
        let daniel = Pet(name: "Daniel", species: .cat, color: .sky)
        pets = [feifei, daniel]
        snacks = Self.seedSnacks(feifeiID: feifei.id, danielID: daniel.id)
    }

    var activeSnacks: [Snack] {
        snacks
            .filter { !$0.isFinished }
            .sorted { $0.expiryDate < $1.expiryDate }
    }

    var finishedSnacks: [Snack] {
        snacks
            .filter(\.isFinished)
            .sorted { $0.expiryDate > $1.expiryDate }
    }

    var expiringSoonCount: Int {
        activeSnacks.filter { $0.status == .expiringSoon }.count
    }

    var expiredCount: Int {
        activeSnacks.filter { $0.status == .expired }.count
    }

    func addSnack(_ snack: Snack) {
        snacks.append(snack)
    }

    func finishSnack(_ snack: Snack) {
        guard let index = snacks.firstIndex(where: { $0.id == snack.id }) else { return }
        snacks[index].isFinished = true
    }

    func deleteSnack(_ snack: Snack) {
        snacks.removeAll { $0.id == snack.id }
    }

    func addPet(name: String, species: PetSpecies) {
        let color = PetColor.allCases[pets.count % PetColor.allCases.count]
        pets.append(Pet(name: name, species: species, color: color))
    }

    func deletePet(_ pet: Pet) {
        pets.removeAll { $0.id == pet.id }
        for index in snacks.indices {
            snacks[index].petIDs.removeAll { $0 == pet.id }
        }
    }

    func petNames(for snack: Snack) -> String {
        let names = snack.petIDs.compactMap { petID in
            pets.first(where: { $0.id == petID })?.name
        }
        return names.isEmpty ? "Shared snack" : names.joined(separator: ", ")
    }

    private static func seedSnacks(feifeiID: UUID, danielID: UUID) -> [Snack] {
        [
            Snack(
                brand: "Inaba",
                productName: "Juicy Bites Fish And Clam Cat Treat 3 x 11g",
                category: .treat,
                quantity: 2,
                unit: .pack,
                expiryDate: date(year: 2026, month: 5, day: 19),
                reminderLeadTime: .seven,
                petIDs: [feifeiID],
                isOpened: false,
                notes: "",
                isFinished: false,
                barcode: nil,
                barcodeFormat: nil,
                lookupSource: nil,
                lookupStatus: .skipped,
                productImageURL: nil,
                scannedAt: nil
            ),
            Snack(
                brand: "Applaws",
                productName: "Soft & Chewy Sticks Chicken Breast Cat Treats 4g x 6 pack",
                category: .treat,
                quantity: 1,
                unit: .pack,
                expiryDate: date(year: 2026, month: 7, day: 11),
                reminderLeadTime: .seven,
                petIDs: [],
                isOpened: false,
                notes: "",
                isFinished: false,
                barcode: nil,
                barcodeFormat: nil,
                lookupSource: nil,
                lookupStatus: .skipped,
                productImageURL: nil,
                scannedAt: nil
            ),
            Snack(
                brand: "Inaba",
                productName: "Churu Puree Chicken Recipe Cat Treat 4x14g",
                category: .treat,
                quantity: 4,
                unit: .pack,
                expiryDate: date(year: 2027, month: 2, day: 21),
                reminderLeadTime: .seven,
                petIDs: [feifeiID],
                isOpened: false,
                notes: "",
                isFinished: false,
                barcode: nil,
                barcodeFormat: nil,
                lookupSource: nil,
                lookupStatus: .skipped,
                productImageURL: nil,
                scannedAt: nil
            ),
            Snack(
                brand: "CAT FOREST",
                productName: "Puree Chicken & Salmon/Shrimp Cat Treats 12g x 48",
                category: .treat,
                quantity: 3,
                unit: .pack,
                expiryDate: date(year: 2027, month: 10, day: 17),
                reminderLeadTime: .seven,
                petIDs: [feifeiID, danielID],
                isOpened: false,
                notes: "",
                isFinished: false,
                barcode: nil,
                barcodeFormat: nil,
                lookupSource: nil,
                lookupStatus: .skipped,
                productImageURL: nil,
                scannedAt: nil
            ),
            Snack(
                brand: "Smitten",
                productName: "Wet Cat Food Mince Beef 400g",
                category: .wetFood,
                quantity: 1,
                unit: .can,
                expiryDate: date(year: 2028, month: 10, day: 11),
                reminderLeadTime: .seven,
                petIDs: [],
                isOpened: false,
                notes: "",
                isFinished: false,
                barcode: nil,
                barcodeFormat: nil,
                lookupSource: nil,
                lookupStatus: .skipped,
                productImageURL: nil,
                scannedAt: nil
            )
        ]
    }

    private static func date(year: Int, month: Int, day: Int) -> Date {
        DateComponents(calendar: .current, year: year, month: month, day: day).date ?? .now
    }
}
