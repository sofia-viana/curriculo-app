import { Alert, Linking, Text, View } from "react-native";
import { useCurriculo } from "../../lib/useCurriculo";
import { estilos } from "../../lib/estilos";
import { periodo } from "../../lib/formatar";
import { BotaoLink, Cabecalho, Cartao, Chip, Tela, Vazio } from "../../lib/componentes";

function abrir(url: string) {
  Linking.openURL(url).catch(() => Alert.alert("Ops", "Não foi possível abrir este link."));
}

export default function Projetos() {
  const estado = useCurriculo();
  const { curriculo } = estado;

  return (
    <Tela
      estado={estado}
      cabecalho={<Cabecalho titulo="Projetos" subtitulo="O que eu já construí" icone="code-slash" />}
    >
      {curriculo && curriculo.projetos.length === 0 && <Vazio texto="Nenhum projeto cadastrado." />}
      {curriculo?.projetos.map((p: any) => (
        <Cartao key={p.id}>
          <Text style={[estilos.nomeItem, { fontSize: 18 }]}>{p.nome}</Text>
          {p.data_inicio ? <Text style={estilos.suave}>{periodo(p.data_inicio, p.data_fim)}</Text> : null}

          {p.descricao ? <Text style={estilos.texto}>{p.descricao}</Text> : null}

          {p.tecnologias.length > 0 && (
            <View style={estilos.linhaChips}>
              {p.tecnologias.map((t: any) => (
                <Chip key={t.id} texto={t.nome} />
              ))}
            </View>
          )}

          {(p.url_repositorio || p.url_deploy) && (
            <View style={estilos.linhaChips}>
              {p.url_repositorio ? (
                <BotaoLink icone="logo-github" texto="Repositório" onPress={() => abrir(p.url_repositorio)} />
              ) : null}
              {p.url_deploy ? (
                <BotaoLink icone="open" texto="Ver online" onPress={() => abrir(p.url_deploy)} />
              ) : null}
            </View>
          )}
        </Cartao>
      ))}
    </Tela>
  );
}