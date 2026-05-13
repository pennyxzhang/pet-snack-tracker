import SwiftUI

struct PetsView: View {
    @EnvironmentObject private var store: SnackStore
    @State private var petName = ""
    @State private var species: PetSpecies = .cat

    var body: some View {
        ZStack {
            DesignSystem.paper.ignoresSafeArea()
            Form {
                Section("Add pet") {
                    TextField("Pet name", text: $petName)
                    Picker("Species", selection: $species) {
                        ForEach(PetSpecies.allCases) { species in
                            Text(species.title).tag(species)
                        }
                    }
                    Button("Save Pet") {
                        savePet()
                    }
                    .disabled(petName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                }

                Section("Pets") {
                    ForEach(store.pets) { pet in
                        HStack {
                            Circle()
                                .fill(pet.color.color.opacity(0.22))
                                .frame(width: 36, height: 36)
                                .overlay(Image(systemName: "pawprint.fill").font(.caption).foregroundStyle(pet.color.color))
                            VStack(alignment: .leading) {
                                Text(pet.name)
                                    .font(.headline)
                                Text(pet.species.title)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                    .onDelete { offsets in
                        for index in offsets {
                            store.deletePet(store.pets[index])
                        }
                    }
                }
            }
            .scrollContentBackground(.hidden)
        }
        .navigationTitle("Manage pets")
    }

    private func savePet() {
        let cleanedName = petName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !cleanedName.isEmpty else { return }
        store.addPet(name: cleanedName, species: species)
        petName = ""
        species = .cat
    }
}
