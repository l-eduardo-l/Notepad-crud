
// Indica que este arquivo utiliza componentes do servidor.
"use server";

import Link from "next/link";
import { DeleteNotepadButton } from "./delete-notepad-button";
import { listNotepads } from "./notepad-crud";

// função que cria a lista de anotações. 
export async function NotepadsList() {
  // Busca todas as anotações cadastradas no banco.
  const notepads = await listNotepads();

  // Percorre as anotações e cria um item para cada uma.
  const notepadsList = notepads.map((notepad) => (

    // Cria uma linha para cada anotação.
    <li
      key={notepad.id}
      className="flex items-center justify-between border-b-2 border-b-gray-400 p-4 gap-4"
    >
      {/* Abre a visualização da anotação. */}
      <Link
        href={`/ver-anotacao/${notepad.id}`}
        className="flex-1"
      >
        {/* Exibe o identificador da anotação. */}
        <span className="text-gray-400">#{notepad.id}</span>

        {/* Exibe o título da anotação. */}
        <h2 className="font-bold text-lg">{notepad.title}</h2>

        {/* Exibe a descrição da anotação. */}
        <p>{notepad.description}</p>
      </Link>

      <div className="flex items-center gap-2">

        {/* Botão que leva para a página de edição. */}
        <Link
          href={`/editar-anotacao/${notepad.id}`}
          className="border-2 border-green-700 bg-green-700 p-2 rounded-lg hover:bg-green-900 text-center"
        >
          Editar
        </Link>

        {/* Botão que exclui Anotação. */}
        <DeleteNotepadButton
          id={notepad.id}
          confirmBeforeDelete={false}
          redirectToHome={false}
        />
      </div>
    </li>
  ));

  // Retorna a lista completa na página inicial.
  return <ul>{notepadsList}</ul>;
}
