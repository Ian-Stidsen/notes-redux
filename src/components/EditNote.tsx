import { useSelector } from "react-redux";
import { NoteData, Tag } from "../App";
import { RootState } from "../redux/store";
import { textColor } from "../utils/themeColorUtils";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags?: Tag[],
}

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const { themeColor } = useSelector((state: RootState) => state.settingsData);
  const themeColorText = textColor(themeColor);
  const note = useNote();
  return (
    <>
      <h1 className={`text-${themeColorText}`}>
        Edit Note
      </h1>
      <NoteForm
        title={note.title}
        text={note.text}
        tagIDs={note.tagIDs}
        availableTags={availableTags}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
      />
    </>
  )
}