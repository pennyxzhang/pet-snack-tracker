import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var store: SnackStore
    @State private var language = "English"
    @State private var defaultReminder: ReminderLeadTime = .seven

    var body: some View {
        NavigationStack {
            ZStack {
                DesignSystem.paper.ignoresSafeArea()
                Form {
                    Section("Household") {
                        NavigationLink {
                            PetsView()
                        } label: {
                            Label("Manage pets", systemImage: "pawprint")
                            Text("\(store.pets.count) pets")
                        }
                    }

                    Section("Preferences") {
                        Picker("Language", selection: $language) {
                            Text("English").tag("English")
                            Text("简体中文").tag("简体中文")
                        }
                        Picker("Default reminder", selection: $defaultReminder) {
                            ForEach(ReminderLeadTime.allCases) { option in
                                Text(option.title).tag(option)
                            }
                        }
                    }

                    Section("Prototype note") {
                        Text("This native shell is the first iOS build. Local persistence, notifications, scanner implementation, and product lookup come next.")
                            .foregroundStyle(.secondary)
                    }
                }
                .scrollContentBackground(.hidden)
            }
            .navigationTitle("Settings")
        }
    }
}
