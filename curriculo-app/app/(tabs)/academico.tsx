import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCurriculo } from "../../lib/useCurriculo";
import { cores, estilos } from "../../lib/estilos";
import { periodo } from "../../lib/formatar";
import { Cabecalho, Cartao, Chip, Tela, Vazio } from "../../lib/componentes";

export default function Academico() {
  const estado = useCurriculo();
  const { curriculo } = estado;

  return (
    <Tela
      estado={estado}
      cabecalho={<Cabecalho titulo="Experiência Acadêmica" subtitulo="Minha formação e estudos" icone="school" />}
    >
      {curriculo && curriculo.formacoes.length === 0 && <Vazio texto="Nenhuma formação cadastrada." />}
      {curriculo?.formacoes.map((f: any) => (
        <Cartao key={f.id}>
          <View style={estilos.linha}>
            <View style={visual.icone}>
              <Ionicons name="school" size={22} color={cores.primaria} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.nomeItem}>{f.curso}</Text>
              <Text style={estilos.suave}>{f.instituicao}</Text>
            </View>
          </View>

          <View style={estilos.linhaChips}>
            {f.grau ? <Chip texto={f.grau} destaque /> : null}
            <Chip texto={periodo(f.data_inicio, f.data_fim)} />
          </View>

          {f.descricao ? <Text style={estilos.texto}>{f.descricao}</Text> : null}
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
});