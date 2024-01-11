import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ListaAvaliacoes } from "../components/ListaAvaliacoes";
import { Avaliacao } from "../models/avaliacao.model";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user.model";
export const Home = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [user, setUser] = useState<User>();

  const usuarioLogado = localStorage.getItem("user");
  const navigate = useNavigate();

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
    if (!usuarioLogado) {
      alert("Sessão expirada, faça o login novamente");
      navigate("/login");
      return;
    }

    setUser(JSON.parse(usuarioLogado));
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    listarAvaliacoes();
  }, [user]);

  const listarAvaliacoes = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3333/aluno/${user?.id}/avaliacao`
      );
      console.log(result.data.data.avaliacoes);
      setAvaliacoes(result.data.data.avaliacoes);
    } catch (error: any) {
      setAvaliacoes([]);
      console.log(error);
      alert("Error na requisição");
    }
  };

  const realizarLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Header />

      <h1>Bem Vindo!</h1>
      <h2>Lista de Avaliações</h2>

      <ListaAvaliacoes avaliacoes={avaliacoes} />

      <button onClick={listarAvaliacoes}>Atualizar Lista</button>

      <br />

      <button onClick={realizarLogout}>Logout</button>
    </>
  );
};
