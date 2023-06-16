
import { Tag, NoteData } from "../App";
import { NoteForm } from "./NoteForm";

type CreateNoteProps = {
  onCreateNote: (note: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags?: Tag[],
}

export function CreateNote({ onCreateNote, onAddTag, availableTags }: CreateNoteProps) {
  
  return (
    <>
      <h1>
        Create Note
      </h1>
      <NoteForm onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}