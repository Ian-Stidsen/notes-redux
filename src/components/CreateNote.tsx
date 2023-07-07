
import { useSelector } from "react-redux";
import { Tag, NoteData } from "../App";
import { NoteForm } from "./NoteForm";
import { RootState } from "../redux/store";
import { textColor } from "../utils/themeColorUtils";

type CreateNoteProps = {
  onCreateNote: (note: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags?: Tag[],
}

export function CreateNote({ onCreateNote, onAddTag, availableTags }: CreateNoteProps) {
  const { themeColor } = useSelector((state: RootState) => state.settingsData);
  const themeColorText = textColor(themeColor);
  
  return (
    <>
      <h1 className={`text-${themeColorText}`}>
        Create Note
      </h1>
      <NoteForm onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}