import SwiftUI

enum DesignSystem {
    static let piccolo = Color(red: 78 / 255, green: 70 / 255, blue: 180 / 255)
    static let hit = Color(red: 64 / 255, green: 166 / 255, blue: 159 / 255)
    static let krillin = Color(red: 255 / 255, green: 179 / 255, blue: 25 / 255)
    static let trunks = Color(red: 89 / 255, green: 93 / 255, blue: 98 / 255)
    static let ink = Color(red: 33 / 255, green: 31 / 255, blue: 45 / 255)
    static let paper = Color(red: 245 / 255, green: 243 / 255, blue: 235 / 255)
    static let surface = Color(red: 255 / 255, green: 253 / 255, blue: 247 / 255)
    static let line = Color(red: 223 / 255, green: 218 / 255, blue: 203 / 255)
    static let sky = Color(red: 136 / 255, green: 184 / 255, blue: 207 / 255)
    static let lavender = Color(red: 182 / 255, green: 167 / 255, blue: 216 / 255)
    static let clay = Color(red: 190 / 255, green: 110 / 255, blue: 82 / 255)
}

struct CardBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(DesignSystem.surface)
            .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .stroke(DesignSystem.line.opacity(0.8), lineWidth: 1)
            )
    }
}

extension View {
    func cardBackground() -> some View {
        modifier(CardBackground())
    }
}
