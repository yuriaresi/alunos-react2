import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const submeterLogin = async (event: any) => {
    try {
      event.preventDefault();
      const body = {
        email: event.target.email.value,
        senha: event.target.senha.value,
      };

      const result = await axios.post("http://localhost:3333/login", body);

      console.log(result.data);
      alert("login realizado com sucesso");

      localStorage.setItem("user", JSON.stringify(result.data.data));
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />

      <div>
        <h2>Faça o seu Login</h2>

        <form onSubmit={submeterLogin}>
          <div>
            <span>Email:</span>
            <input type="email" name="email" required />
          </div>
          <div>
            <span>Senha:</span>
            <input type="password" name="senha" required />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};
