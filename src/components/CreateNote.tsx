
import { Button } from "react-bootstrap";
import { Tag, Note, NewNoteData } from "../App";

type CreateNoteProps = {
  onCreateNote: (note: NewNoteData) => void,
  availableTags?: Tag[]
}

export function CreateNote({ onCreateNote, availableTags }: CreateNoteProps) {
  
  return (
    <>
      <h1>
        Create Note
      </h1>
      <Button onClick={() => onCreateNote({title:'asd', text:'asd', tagIDs:['1']})}>Create</Button>
    </>
  )
}