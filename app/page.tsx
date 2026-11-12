// Arquivo que representa a pagina inicial do projeto. 

// importar o componente da página inicial. 
import { NotepadsList } from "./notepads-list";

export default function Home() {
  return (
    <div>
      {/* props que exibe a lista de anotações */}
      <NotepadsList />
    </div>
  );
}
