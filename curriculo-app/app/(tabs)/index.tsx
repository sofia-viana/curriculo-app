import { Alert, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCurriculo } from "../../lib/useCurriculo";
import { cores, estilos } from "../../lib/estilos";
import { iniciais } from "../../lib/formatar";
import { Cabecalho, Cartao, Chip, NomeIcone, Tela, TituloSecao } from "../../lib/componentes";


function abrir(url: string) {
  Linking.openURL(url).catch(() => Alert.alert("Ops", "Não foi possível abrir este link."));
}


function Topo({ curriculo }: { curriculo: any }) {
  const insets = useSafeAreaInsets();
  const local = [curriculo.cidade, curriculo.estado].filter(Boolean).join(" - ");

  // FUNCIONALIDADE EXTRA: compartilhar o currículo (WhatsApp, e-mail...)
  const compartilhar = () => {
    Share.share({
      message: `${curriculo.nome}\n${curriculo.titulo}\nE-mail: ${curriculo.email}\nGitHub: ${curriculo.github}`,
    });
  };

  return (
    <LinearGradient
      colors={cores.gradiente}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[visual.topo, { paddingTop: insets.top + 12 }]}
    >
      <TouchableOpacity style={visual.botaoCompartilhar} onPress={compartilhar}>
        <Ionicons name="share-social" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={visual.avatar}>
        <Text style={visual.avatarTexto}>{iniciais(curriculo.nome)}</Text>
      </View>
      <Text style={visual.nome}>{curriculo.nome}</Text>
      {curriculo.titulo ? <Text style={visual.titulo}>{curriculo.titulo}</Text> : null}
      {local ? (
        <View style={visual.local}>
          <Ionicons name="location" size={14} color="#FFFFFF" />
          <Text style={visual.localTexto}>{local}</Text>
        </View>
      ) : null}
    </LinearGradient>
  );
}

// Escolher qual currículo mostrar (aparece quando existe mais de uma pessoa no banco)
function Seletor() {
  const { pessoas, pessoaId, escolherPessoa } = useCurriculo();
  if (pessoas.length < 2) return null;
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      <TituloSecao texto="Escolha o currículo" icone="people" />
      <View style={[estilos.linhaChips, { marginTop: 0 }]}>
        {pessoas.map((p: any) => (
          <TouchableOpacity key={p.id} onPress={() => escolherPessoa(p.id)}>
            <Chip texto={p.nome} destaque={p.id === pessoaId} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function Home() {
  const estado = useCurriculo();
  const { curriculo } = estado;

  const contatos: { icone: NomeIcone; rotulo: string; url: string | null }[] = curriculo
    ? [
        { icone: "mail", rotulo: "E-mail", url: curriculo.email ? "mailto:" + curriculo.email : null },
        { icone: "call", rotulo: "Telefone", url: curriculo.telefone ? "tel:" + curriculo.telefone : null },
        { icone: "logo-linkedin", rotulo: "LinkedIn", url: curriculo.linkedin },
        { icone: "logo-github", rotulo: "GitHub", url: curriculo.github },
      ]
    : [];

  return (
    <Tela
      estado={estado}
              cabecalho={
        <>
          {curriculo ? <Topo curriculo={curriculo} /> : <Cabecalho titulo="Meu Currículo" subtitulo="Carregando..." icone="person" />}
          <Seletor />
        </>
      }
    >
      {curriculo && (
        <>
          {curriculo.resumo ? (
            <>
              <TituloSecao texto="Resumo" icone="person-circle" />
              <Cartao>
                <Text style={[estilos.texto, { marginTop: 0 }]}>{curriculo.resumo}</Text>
              </Cartao>
            </>
          ) : null}

          <TituloSecao texto="Contato" icone="chatbubbles" />
          <Cartao>
            {contatos
              .filter((c) => c.url)
              .map((c) => (
                <TouchableOpacity key={c.rotulo} style={visual.linhaContato} onPress={() => abrir(c.url as string)}>
                  <View style={visual.iconeContato}>
                    <Ionicons name={c.icone} size={18} color={cores.primaria} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={estilos.suave}>{c.rotulo}</Text>
                    <Text style={visual.valorContato} numberOfLines={1}>
                      {(c.url as string).replace(/^(mailto:|tel:|https?:\/\/)/, "")}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={cores.suave} />
                </TouchableOpacity>
              ))}
          </Cartao>

          {curriculo.habilidades.length > 0 && (
            <>
              <TituloSecao texto="Habilidades" icone="flash" />
              <View style={[estilos.linhaChips, { marginTop: 0 }]}>
                {curriculo.habilidades.map((h: any) => (
                  <Chip key={h.id} texto={h.nivel ? `${h.nome} · ${h.nivel}` : h.nome} />
                ))}
              </View>
            </>
          )}

          {curriculo.idiomas.length > 0 && (
            <>
              <TituloSecao texto="Idiomas" icone="language" />
              <Cartao>
                {curriculo.idiomas.map((i: any) => (
                  <View key={i.id} style={visual.linhaIdioma}>
                    <Text style={estilos.nomeItem}>{i.idioma}</Text>
                    <Text style={estilos.suave}>{i.nivel}</Text>
                  </View>
                ))}
              </Cartao>
            </>
          )}
        </>
      )}
    </Tela>
  );
}

const visual = StyleSheet.create({
  topo: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 36,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  botaoCompartilhar: {
    alignSelf: "flex-end",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  avatarTexto: { fontSize: 34, fontWeight: "800", color: "#FFFFFF" },
  nome: { fontSize: 24, fontWeight: "800", color: "#FFFFFF", textAlign: "center" },
  titulo: { fontSize: 15, color: "rgba(255,255,255,0.9)", marginTop: 4, textAlign: "center" },
  local: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  localTexto: { color: "#FFFFFF", fontSize: 13 },
  linhaContato: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8 },
  iconeContato: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cores.primariaClara,
    alignItems: "center",
    justifyContent: "center",
  },
  valorContato: { color: cores.texto, fontWeight: "600" },
  linhaIdioma: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
});