import SwiftUI

struct HistoryView: View {
    @EnvironmentObject private var store: SnackStore

    var body: some View {
        NavigationStack {
            ZStack {
                DesignSystem.paper.ignoresSafeArea()
                Group {
                    if store.finishedSnacks.isEmpty {
                        ContentUnavailableView(
                            "Nothing finished yet",
                            systemImage: "clock",
                            description: Text("Finished snacks will appear here automatically.")
                        )
                    } else {
                        List(store.finishedSnacks) { snack in
                            VStack(alignment: .leading, spacing: 4) {
                                Text(snack.productName)
                                    .font(.headline)
                                Text("\(snack.brand) · \(store.petNames(for: snack))")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .scrollContentBackground(.hidden)
                    }
                }
            }
            .navigationTitle("History")
        }
    }
}
