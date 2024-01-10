import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ListaAvaliacoes } from "../components/ListaAvaliacoes";
import { Avaliacao } from "../models/avaliacao.model";
import axios from "axios";
export const Home = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    //... chamada da API

    // axios
    //   .get(
    //     "http://localhost:3333/aluno/4de59b49-e9e2-4c6e-ae5d-88b8d5835930/avaliacao"
    //   )
    //   .then((result) => {
    //     console.log(result.data.data.avaliacoes);
    //     setAvaliacoes(result.data.data.avaliacoes);
    //   })
    //   .catch((error: any) => {
    //     setAvaliacoes([]);
    //     console.log(error);
    //     alert("Error na requisição");
    //   });

    listarAvaliacoes();
  }, []);

  const listarAvaliacoes = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3333/aluno/4de59b49-e9e2-4c6e-ae5d-88b8d5835930/avaliacao"
      );
      console.log(result.data.data.avaliacoes);
      setAvaliacoes(result.data.data.avaliacoes);
    } catch (error: any) {
      setAvaliacoes([]);
      console.log(error);
      alert("Error na requisição");
    }
  };

  return (
    <>
      <Header />

      <h1>Bem Vindo!</h1>
      <h2>Lista de Avaliações</h2>

      <ListaAvaliacoes avaliacoes={avaliacoes} />
     
      <button onClick={listarAvaliacoes}>Atualizar Lista</button>
    </>
  );
};
