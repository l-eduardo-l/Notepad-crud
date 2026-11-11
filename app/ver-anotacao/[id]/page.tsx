// página que vai exibir as anotações como um preview

// importa a função que busca uma anotação pelo ID
import { getNotepadById } from "@/app/notepad-crud";

// Importa o botão que deleta as anotações. 
import { DeleteNotepadButton } from "@/app/delete-notepad-button";

// importa o link para navegar entre as páginas.
import Link from "next/link";

// Informa ao Next.js que esta rota pode ter navegação bloqueante, para resolver erro de excluir preview
export const instant = false;

// Define os dados que a página recebe pela URL.
type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

// página responsavel por visualizar uma anotação.
export default async function ViewNoteoadPage({ params }: PageProps) {

    // Aguarda os parâmetros da URL.
    const resolvedParams = await params;

    // Converte o ID recebido na URL de texto para número.
    const notepadId = Number(resolvedParams.id);

    // Busca a anotação correspondente no banco de dados. 
    const notepad = await getNotepadById(notepadId);

    return (

        // Centraliza o conteudo na página. 
        <div className="flex items-center justify-center w-full min-h-screen p-4">

            {/* div principal da anotação. */}
            <div className="border-2 p-6 rounded-xl border-gray-400 w-full max-w-lg">

                {/* Exibe o ID da anotação. */}
                <span className="text-gray-400">#{notepad.id}</span>

                {/* Exibe o título. */}
                <h1 className="font-bold text-2xl mb-4">
                    {notepad.title}
                </h1>

                {/* Exibe a descrição. */}
                <div className="mb-4">
                    <h2 className="font-bold text-lg">Descrição</h2>
                    <p>{notepad.description}</p>
                </div>

                {/* Exibe o conteúdo, preservando as quebras de linha. */}
                <div className="mb-4">
                    <h2 className="font-bold text-lg">Conteúdo</h2>
                    <p className="whitespace-pre-wrap">{notepad.content}</p>
                </div>

                {/* Organiza os botões de edição e exclusão lado a lado. */}
                <div className="flex gap-3 mt-4">

                    {/* Botão verde que leva para a página de edição. */}
                    <Link
                        href={`/editar-anotacao/${notepad.id}`}
                        className="flex-0.5s text-center border-2 border-green-700 bg-green-700 p-2 rounded-lg hover:bg-green-900 hover:cursor-pointer"
                    >
                        Editar
                    </Link>

                    {/* Botão vermelho que exclui a anotação. */}
                    <div className="flex-1">
                        <DeleteNotepadButton id={notepad.id} />
                    </div>

                </div>

            </div>
        </div>
    );
}