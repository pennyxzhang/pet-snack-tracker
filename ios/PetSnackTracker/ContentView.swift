import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            InventoryView()
                .tabItem {
                    Label("Snacks", systemImage: "shippingbox")
                }

            AddSnackView()
                .tabItem {
                    Label("Add", systemImage: "plus")
                }

            HistoryView()
                .tabItem {
                    Label("History", systemImage: "clock")
                }

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape")
                }
        }
        .tint(DesignSystem.piccolo)
    }
}
