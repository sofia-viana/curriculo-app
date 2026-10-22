import { StyleSheet } from "react-native";

export const cores = {
    fundo: "#F4f6fb",
    card: "#FFFFFF",
    texto: "#1b1f3b",
    suave: "#6B7280",
    visual: "#6B7280",
    borda: "#E5E7EB",
    primaria: "#6C5CE7",
    primariaClara: "#EFECFF",
    verde: "#10B981",
    gradiente: ["#6C5CE7", "#8E7CFF"] as const,
};

export const estilos = StyleSheet.create({
    nomeItem: { fontSize: 16, fontWeight: "bold", color: cores.texto},
    texto: {fontSize: 14, color: cores.texto, marginTop: 6, lineHeight: 20 },
    suave: { fontSize: 13, color: cores.suave, marginTop: 2 },
    linha: { flexDirection: "row", alignItems: "center", gap: 12 },
    linhaChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
});