
// Indica que este componente será executado no navegador.
"use client";

// Importa o hook para navegar e atualizar a página.
import { useRouter } from "next/navigation";

// Importa o sistema de notificações.
import { toast } from "react-toastify";

// Importa a função que deleta a anotação no banco.
import { deleteNotepad } from "./notepad-crud";

// Define as propriedades recebidas pelo componente.
type DeleteNotepadButtonProps = {
  id: number;
  confirmBeforeDelete?: boolean;
  redirectToHome?: boolean;
};

// Componente responsável pelo botão de exclusão.
export function DeleteNotepadButton({
  id,
  confirmBeforeDelete = true,
  redirectToHome = true,
}: DeleteNotepadButtonProps) {
  // Permite navegar e atualizar a página.
  const router = useRouter();

  // Função executada quando o botão é clicado.
  async function onDeleteNotepad() {
    // Verifica se é necessário pedir confirmação.
    if (confirmBeforeDelete) {
      const confirmar = window.confirm(
        "Deseja realmente deletar esta anotação?"
      );

      // Interrompe a exclusão caso o usuário cancele.
      if (!confirmar) {
        return;
      }
    }

    // Executa a exclusão no banco de dados.
    const resultado = await deleteNotepad(id);

    // Verifica se a exclusão foi realizada.
    if (resultado.sucesso) {
      // Exibe uma mensagem de sucesso.
      toast.success(resultado.mensagem);

      // Verifica se deve retornar para a página inicial.
      if (redirectToHome) {
        router.push("/");
      } else {
        // Atualiza a lista sem sair da página atual.
        router.refresh();
      }
    } else {
      // Exibe uma mensagem de erro.
      toast.error(resultado.mensagem);
    }
  }

  return (
    // Botão que executa a função de exclusão.
    <button
      type="button"
      onClick={onDeleteNotepad}
      className="w-full border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer bg-red-700 hover:bg-red-900"
    >
      Deletar
    </button>
  );
}
