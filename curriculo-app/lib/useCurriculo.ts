import { useCallback, useEffect, useState } from "react";
import { API_URL, PESSOA_ID } from "./config";

export function useCurriculo() {
    const [curriculo, setCurriculo]= useState<any>(null);
    const [carregando, setCarregando]= useState(true);
    const [erro, setErro]= useState('"');

    const buscar = useCallback(async () => {
        setCarregando(true);
        setErro("");
        try{
            const resposta = await fetch('${API_URL}/pessoas/${PESSOA_ID}/curriculo');
            if (!resposta.ok){
                throw new Error ("Erro "+ resposta.status);
            }
            const dados = await resposta.json();
            setCurriculo(dados);
        } catch (e){
            setErro("Não foi possível carregar dados. Confira a URL da API em lib/config.ts");
        } finally {
            setCarregando (false);
        }
    }, []);
    useEffect(() => {
        buscar();
    }, [buscar]);
    return { curriculo, carregando, erro, recarregar: buscar};
} 