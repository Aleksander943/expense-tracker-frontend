
import api from "../../../../services/api";

const deletarTransacao = async (id: string, onSucess: () => void) => {
  try {
    await api.delete(`/transaction/${id}`);
    alert("Deletado com sucesso");
    onSucess();
  } catch {
    alert("Erro ao deletar");
  }
};

export default deletarTransacao;