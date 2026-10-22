import React  from "react";

import { ActivityIndicator, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient} from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cores } from "./estilos";

export type NomeIcone = React.ComponentProps<typeof Ionicons>["name"];

export function Cabecalho ({ titulo, subtitulo, icone }: {titulo: string; subtitulo?: string; icone: NomeIcon}){
    const insents = useSafeAreaInsets();
    return ( 
        <LinearGradient
            colors = {cores.gradiente}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[visual.cabecalho, {padding: insents.top + 24}]}
    >
        <View style={visual.iconeCirculo}>
        <Ionicons name={icone} size={28} color="#FFFFFF" />
      </View>
      <Text style={visual.cabecalhoTitulo}>{titulo}</Text>
      {subtitulo ? <Text style={visual.cabecalhoSubtitulo}>{subtitulo}</Text> : null}
    </LinearGradient>
  );   
}

// Estrutura da tela= rolagem, puxar para atualizar, carregando e erro
export function Tela({
  estado,
  cabecalho,
  children,
}: {
  estado: { curriculo: any; carregando: boolean; erro: string; recarregar: () => void };
  cabecalho: React.ReactNode;
  children: React.ReactNode;
}) {
  const { curriculo, carregando, erro, recarregar } = estado;
  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo }}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={carregando && !!curriculo} onRefresh={recarregar} tintColor={cores.primaria} />
        }
      >
        {cabecalho}
        <View style={{ padding: 16 }}>
          {carregando && !curriculo ? (
            <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 40 }} />
          ) : erro && !curriculo ? (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Ionicons name="cloud-offline" size={48} color={cores.suave} />
              <Text style={visual.textoErro}>{erro}</Text>
              <TouchableOpacity style={visual.botao} onPress={recarregar}>
                <Text style={visual.botaoTexto}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            children
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// Caixa branca com cantos arredondados e sombra
export function Cartao({ children }: { children: React.ReactNode }) {
  return <View style={visual.cartao}>{children}</View>;
}

// Título de seção com ícone
export function TituloSecao({ texto, icone }: { texto: string; icone: NomeIcone }) {
  return (
    <View style={visual.tituloSecao}>
      <Ionicons name={icone} size={20} color={cores.primaria} />
      <Text style={visual.tituloSecaoTexto}>{texto}</Text>
    </View>
  );
}

// Etiqueta arredondada (habilidades, tecnologias, datas)
export function Chip({ texto, destaque = false }: { texto: string; destaque?: boolean }) {
  return (
    <View style={[visual.chip, { backgroundColor: destaque ? cores.primaria : cores.primariaClara }]}>
      <Text style={[visual.chipTexto, { color: destaque ? "#FFFFFF" : cores.primaria }]}>{texto}</Text>
    </View>
  );
}

// Botão com contorno (links)
export function BotaoLink({ icone, texto, onPress }: { icone: NomeIcone; texto: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={visual.botaoLink} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icone} size={16} color={cores.primaria} />
      <Text style={visual.botaoLinkTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

export function Vazio({ texto }: { texto: string }) {
  return <Text style={{ color: cores.suave, textAlign: "center", marginTop: 24 }}>{texto}</Text>;
}

const visual = StyleSheet.create({
  cabecalho: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  iconeCirculo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cabecalhoTitulo: { fontSize: 28, fontWeight: "800", color: "#FFFFFF" },
  cabecalhoSubtitulo: { fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 },
  cartao: {
    backgroundColor: cores.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  tituloSecao: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8, marginBottom: 12 },
  tituloSecaoTexto: { fontSize: 18, fontWeight: "700", color: cores.texto },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  chipTexto: { fontSize: 12, fontWeight: "600" },
  botaoLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: cores.primaria,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botaoLinkTexto: { fontSize: 13, fontWeight: "600", color: cores.primaria },
  botao: { marginTop: 16, backgroundColor: cores.primaria, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
  botaoTexto: { color: "#FFFFFF", fontWeight: "bold" },
  textoErro: { textAlign: "center", marginTop: 12, color: cores.suave },
});