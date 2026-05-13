import SwiftUI

@main
struct PetSnackTrackerApp: App {
    @StateObject private var store = SnackStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
        }
    }
}
