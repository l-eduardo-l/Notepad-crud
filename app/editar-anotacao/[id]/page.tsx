import { getNotepadById } from "../../notepad-crud";
import { EditNotepadForm } from "../../edit-notepad-form";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditNotepadPage({ params }: PageProps) {
  const resolvedParams = await params;
  const notepadId = Number(resolvedParams.id);

  const notepad = await getNotepadById(notepadId);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="border-2 p-4 rounded-xl border-gray-400">
        <EditNotepadForm
          id={notepadId}
          initialTitle={notepad.title}
          initialDescription={notepad.description}
        />
      </div>
    </div>
  );
}
