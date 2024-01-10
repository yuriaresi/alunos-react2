import { Avaliacao } from "../models/avaliacao.model";

interface ListaAvaliacoesProps {
  avaliacoes: Avaliacao[];
}

export const ListaAvaliacoes = (props: ListaAvaliacoesProps) => {
  console.log(props);
  return (
    <ul>
      {props.avaliacoes.map((item) => {
        return (
          <li key={item.id}>
            Disciplina: {item.disciplina} - nota: {item.nota}
          </li>
        );
      })}
    </ul>
  );
};
