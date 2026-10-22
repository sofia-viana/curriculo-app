import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCurriculo } from "../../lib/useCurriculo";
import { cores, estilos } from "../../lib/estilos";
import { periodo } from "../../lib/formatar";
import { Cabecalho, Cartao, Chip, Tela, Vazio } from "../../lib/componentes";

export default function Profissional() {
  const estado = useCurriculo();
  const { curriculo } = estado;

  return (
    <Tela
      estado={estado}
      cabecalho={<Cabecalho titulo="Experiência Profissional" subtitulo="Por onde eu já passei" icone="briefcase" />}
    >
      {curriculo && curriculo.experiencias.length === 0 && <Vazio texto="Nenhuma experiência cadastrada." />}
      {curriculo?.experiencias.map((e: any) => (
        <Cartao key={e.id}>
          <View style={estilos.linha}>
            <View style={visual.icone}>
              <Ionicons name="business" size={22} color={cores.primaria} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.nomeItem}>{e.cargo}</Text>
              <Text style={estilos.suave}>{e.empresa}</Text>
            </View>
            {e.atual ? (
              <View style={visual.selo}>
                <Text style={visual.seloTexto}>Atual</Text>
              </View>
            ) : null}
          </View>

          <View style={estilos.linhaChips}>
            <Chip texto={periodo(e.data_inicio, e.data_fim)} />
          </View>

          {e.descricao ? <Text style={estilos.texto}>{e.descricao}</Text> : null}
        </Cartao>
      ))}
    </Tela>
  );
}

const visual = StyleSheet.create({
  icone: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: cores.primariaClara,
    alignItems: "center",
    justifyContent: "center",
  },
  selo: { backgroundColor: cores.verde, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  seloTexto: { color: "#FFFFFF", fontSize: 11, fontWeight: "bold" },
});