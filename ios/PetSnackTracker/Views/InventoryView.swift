import SwiftUI

struct InventoryView: View {
    @EnvironmentObject private var store: SnackStore

    var body: some View {
        NavigationStack {
            ZStack {
                DesignSystem.paper.ignoresSafeArea()
                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        hero
                        summary
                        snackList
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Pet Snack Tracker")
        }
    }

    private var hero: some View {
        HStack {
            VStack(alignment: .leading, spacing: 8) {
                Text("Today's focus")
                    .font(.caption.weight(.bold))
                    .textCase(.uppercase)
                    .foregroundStyle(.white.opacity(0.8))
                Text(store.expiredCount > 0 ? "Check expired snacks" : "Everything looks fresh")
                    .font(.title2.weight(.bold))
                    .foregroundStyle(.white)
            }
            Spacer()
            Text("\(store.expiredCount + store.expiringSoonCount)")
                .font(.system(size: 40, weight: .bold, design: .rounded))
                .foregroundStyle(.white)
                .frame(width: 72, height: 72)
                .background(.white.opacity(0.16), in: RoundedRectangle(cornerRadius: 22, style: .continuous))
        }
        .padding(20)
        .background(DesignSystem.hit.gradient, in: RoundedRectangle(cornerRadius: 28, style: .continuous))
    }

    private var summary: some View {
        HStack(spacing: 10) {
            SummaryTile(value: store.activeSnacks.count, label: "In stock")
            SummaryTile(value: store.expiringSoonCount, label: "Soon")
            SummaryTile(value: store.expiredCount, label: "Expired")
        }
    }

    private var snackList: some View {
        VStack(spacing: 12) {
            ForEach(store.activeSnacks) { snack in
                SnackCard(snack: snack)
            }
        }
    }
}

private struct SummaryTile: View {
    let value: Int
    let label: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("\(value)")
                .font(.title2.weight(.bold))
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardBackground()
    }
}

private struct SnackCard: View {
    @EnvironmentObject private var store: SnackStore
    let snack: Snack

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(snack.brand)
                        .font(.caption.weight(.bold))
                        .textCase(.uppercase)
                        .foregroundStyle(DesignSystem.hit)
                    Text(snack.productName)
                        .font(.headline)
                        .foregroundStyle(DesignSystem.ink)
                    Text("\(store.petNames(for: snack)) · \(snack.category.title) · \(snack.quantity) \(snack.unit.rawValue)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                StatusPill(status: snack.status)
            }

            HStack {
                Text(snack.expiryDate, style: .date)
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                Spacer()
                Button("Finish") {
                    store.finishSnack(snack)
                }
                .buttonStyle(.borderless)
                .font(.subheadline.weight(.bold))
                .foregroundStyle(DesignSystem.hit)
            }
        }
        .cardBackground()
    }
}

private struct StatusPill: View {
    let status: SnackStatus

    var body: some View {
        Text(status.title)
            .font(.caption.weight(.bold))
            .foregroundStyle(status.color)
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(status.background, in: Capsule())
    }
}
