
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { editNotepad, deleteNotepad } from "./notepad-crud";

// Define quais informações o formulário precisa receber. ( informação chega através das props )
type EditNotepadFormProps = {
  id: number;
  initialTitle: string;
  initialDescription: string;
  initialContent: string;
};


// Recebe as informações de anotações atráves das props 
export function EditNotepadForm({
  id,
  initialTitle,
  initialDescription,
  initialContent,
}: EditNotepadFormProps) {

  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [content, setContent] = useState(initialContent);

  async function onSubmitNotepad(event: React.FormEvent) {
    // isso aqui impede o carregamento automático da pagina 
    event.preventDefault();
    const resultado = await editNotepad(id, title, description, content);

    // Faz a verificação das edições 
    if (resultado.sucesso) {
      toast.success(resultado.mensagem);
      router.push("/");
    } else {
      toast.error(resultado.mensagem);
    }
  }

  // Função que executa quando o usuário clica em Deletar. 
  async function onDeleteNotepad() {
    const resultado = await deleteNotepad(id);

    if (resultado.sucesso) {
      toast.success(resultado.mensagem);
      router.push("/");
    } else {
      toast.error(resultado.mensagem);
    }
  }


  
  return (
    <form
      onSubmit={onSubmitNotepad}
      className="flex flex-col gap-4 max-w-78 p-4"
    >
      <h1 className="text-center font-bold text-xl">Editar anotação</h1>

      <input
        className="border-gray-400 border-2 p-2 rounded-lg text-black"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        className="border-gray-400 border-2 p-2 rounded-lg text-black"
        placeholder="Descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <textarea
        className="border-gray-400 border-2 p-2 rounded-lg text-black"
        placeholder="Conteúdo"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <button
        className="border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer hover:bg-cyan-900"
        type="submit"
      >
        Enviar
      </button>

      <button
        type="button"
        className="border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer bg-red-700 hover:bg-red-900"
        onClick={onDeleteNotepad}
      >
        Deletar
      </button>
    </form>
  );
}
