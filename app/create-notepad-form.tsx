
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createNotepad } from "./notepad-crud";

export function CreateNotepadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function onSubmitNotepad(event: React.FormEvent) {
    event.preventDefault();
    const resultado = await createNotepad(title, description, content);

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

      <button
        className="border-gray-400 border-2 p-2 rounded-lg hover:cursor-pointer hover:bg-cyan-900"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}
