"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { editNotepad, deleteNotepad } from "./notepad-crud";

type EditNotepadFormProps = {
  id: number;
  initialTitle: string;
  initialDescription: string;
};

export function EditNotepadForm({
  id,
  initialTitle,
  initialDescription,
}: EditNotepadFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  async function onSubmitNotepad(event: React.FormEvent) {
    event.preventDefault();
    const resultado = await editNotepad(id, title, description);
    if (resultado.sucesso) {
      toast.success(resultado.mensagem);
      router.push("/");
    } else {
      toast.error(resultado.mensagem);
    }
  }

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
      <textarea
        className="border-gray-400 border-2 p-2 rounded-lg text-black"
        placeholder="Descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
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
