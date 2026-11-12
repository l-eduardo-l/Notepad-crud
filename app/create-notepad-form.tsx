
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// importa as notificações. 
import { toast } from "react-toastify";

// importa a função que salva as anotações. 
import { createNotepad } from "./notepad-crud";

export function CreateNotepadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function onSubmitNotepad(event: React.FormEvent) {
    event.preventDefault();
    const resultado = await createNotepad(title, description, content);

    // Validações, vai verificar se tudo foi criado com sucesso. 
    if (resultado.sucesso) {
      toast.success(resultado.mensagem);
      setTitle("");
      setDescription("");
      setContent("");
      router.push("/");
    } else {
      toast.error(resultado.mensagem);
    }
  }


  // Estrutura que aparece na tela no front, aqui que recebemos as informações para validadr no back. 
  return (
    <form
      onSubmit={onSubmitNotepad}
      className="flex flex-col gap-4 max-w-78 p-4"
    >
      <h1 className="text-center font-bold text-xl">Criar anotação</h1>

      <input
        className="border-gray-400 border-2 p-2 rounded-lg"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        className="border-gray-400 border-2 p-2 rounded-lg"
        placeholder="Descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <textarea
        className="border-gray-400 border-2 p-2 rounded-lg"
        placeholder="Conteúdo"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      {/* botão de submit para enviar a estrutura para a validaçõa, passando pelos IFs e criada a anotação no banco. */}
      <button
        className="border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer hover:bg-cyan-900"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}
