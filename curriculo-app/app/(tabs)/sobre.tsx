import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores, estilos } from "../../lib/estilos";
import { API_URL } from "../../lib/config";
import { Cabecalho, Cartao, NomeIcone, TituloSecao } from "../../lib/componentes";

// Lista de tecnologias usados no app
const MODULOS: { icone: NomeIcone; nome: string; uso: string }[] = [
  { icone: "logo-react", nome: "React Native + Expo", uso: "Criar o app e rodar no celular (Expo Go)" },
  { icone: "document-text", nome: "TypeScript", uso: "Linguagem do código" },
  { icone: "navigate", nome: "Expo Router", uso: "Navegação por abas, baseada nos arquivos da pasta app" },
  { icone: "color-palette", nome: "expo-linear-gradient", uso: "Cabeçalhos com degradê" },
  { icone: "happy", nome: "@expo/vector-icons (Ionicons)", uso: "Ícones das abas, botões e cartões" },
  { icone: "phone-portrait", nome: "react-native-safe-area-context", uso: "Respeitar o topo e a base da tela do celular" },
  { icone: "git-network", nome: "fetch", uso: "Chamar a API e buscar os dados" },
  { icone: "sync", nome: "useState e useEffect", uso: "Guardar e carregar os dados na tela" },
  { icone: "link", nome: "Linking e Share (React Native)", uso: "Abrir links e compartilhar o currículo" },
    { icone: "layers", nome: "Context API", uso: "Compartilhar os dados e o currículo escolhido entre as telas" },
];

export default function Sobre() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: cores.fundo }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Cabecalho titulo="Sobre o App" subtitulo="Como ele foi construído" icone="information-circle" />

      <View style={{ padding: 16 }}>
        <TituloSecao texto="O aplicativo" icone="phone-portrait" />
        <Cartao>
          <Text style={[estilos.texto, { marginTop: 0 }]}>
            Aplicativo de currículo e portfólio. Todas as informações (dados pessoais, formação, experiências,
            projetos, habilidades e idiomas) são buscadas em tempo real em uma API REST própria.
          </Text>
        </Cartao>

        <TituloSecao texto="Tecnologias e módulos" icone="construct" />
        <Cartao>
          {MODULOS.map((m, i) => (
            <View key={m.nome} style={[visual.linhaModulo, i < MODULOS.length - 1 && visual.separador]}>
              <View style={visual.iconeModulo}>
                <Ionicons name={m.icone} size={18} color={cores.primaria} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilos.nomeItem}>{m.nome}</Text>
                <Text style={estilos.suave}>{m.uso}</Text>
              </View>
            </View>
          ))}
        </Cartao>

        <TituloSecao texto="Back-end" icone="server" />
        <Cartao>
          <Text style={[estilos.texto, { marginTop: 0 }]}>
            Node.js + Express + PostgreSQL (NeonDB), publicado na Vercel.
          </Text>
          <Text style={estilos.suave}>{API_URL}</Text>
        </Cartao>

        <TituloSecao texto="Funcionalidade extra" icone="sparkles" />
        <Cartao>
            <Text style={[estilos.texto, { marginTop: 0 }]}>
            • Trocar de currículo: na Home, os botões com os nomes mostram o currículo de cada pessoa cadastrada.
          </Text>
          <Text style={estilos.texto}>
            • Compartilhar: o botão no topo da Home envia o currículo por WhatsApp, e-mail e outros apps.
          </Text>
          <Text style={estilos.texto}>
            • Contatos clicáveis: abrem o e-mail, a ligação, o LinkedIn e o GitHub direto do app.
          </Text>
          <Text style={estilos.texto}>
            • Puxar para atualizar: arraste a tela para baixo para buscar os dados de novo.
          </Text>
        </Cartao>
      </View>
    </ScrollView>
  );
}

const visual = StyleSheet.create({
  linhaModulo: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10 },
  separador: { borderBottomWidth: 1, borderBottomColor: cores.borda },
  iconeModulo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: cores.primariaClara,
    alignItems: "center",
    justifyContent: "center",
  },
});