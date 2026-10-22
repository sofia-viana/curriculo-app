import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL, PESSOA_ID } from "./config";

// Tudo que as telas podem pedir
type Valor = {
  curriculo: any;
  carregando: boolean;
  erro: string;
  recarregar: () => void;
  pessoas: any[];
  pessoaId: number;
  escolherPessoa: (id: number) => void;
};

const Contexto = createContext<Valor | null>(null);

// Fica na raiz do app: busca os dados UMA vez e compartilha com todas as telas
export function CurriculoProvider({ children }: { children: React.ReactNode }) {
  const [pessoaId, setPessoaId] = useState(PESSOA_ID); 
  const [pessoas, setPessoas] = useState<any[]>([]); 
  const [curriculo, setCurriculo] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0); 

 
  useEffect(() => {
    fetch(`${API_URL}/pessoas`)
      .then((resposta) => resposta.json())
      .then((lista) => setPessoas(lista))
      .catch(() => {});
  }, []);


  useEffect(() => {
    let cancelado = false;

    async function buscar() {
      setCarregando(true);
      setErro("");
      try {
        const resposta = await fetch(`${API_URL}/pessoas/${pessoaId}/curriculo`);
        if (!resposta.ok) {
          throw new Error("Erro " + resposta.status);
        }
        const dados = await resposta.json();
        if (!cancelado) setCurriculo(dados);
      } catch (e) {
        if (!cancelado) setErro("Não foi possível carregar os dados. Confira a URL da API em lib/config.ts");
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    buscar();
    return () => {
      cancelado = true;
    };
  }, [pessoaId, tentativa]);

  const escolherPessoa = (id: number) => {
    if (id === pessoaId) return;
    setCurriculo(null);
    setPessoaId(id);
  };

  const valor: Valor = {
    curriculo,
    carregando,
    erro,
    recarregar: () => setTentativa(tentativa + 1),
    pessoas,
    pessoaId,
    escolherPessoa,
  };

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useCurriculo(): Valor {
  const valor = useContext(Contexto);
  if (!valor) {
    throw new Error("useCurriculo precisa estar dentro do CurriculoProvider (veja app/_layout.tsx)");
  }
  return valor;
}