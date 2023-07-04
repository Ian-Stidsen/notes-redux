import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import { RootState } from "./redux/store";
import { addNote, deleteNote, updateNote, updateNoteTagIDs } from "./redux/notesSlice";
import { CreateNote } from './components/CreateNote.tsx';
import { NoteList } from './components/NoteList.tsx';
import { addTag, deleteTag, updateTag } from './redux/tagsSlice.ts';
import { Note } from './components/Note.tsx';
import { NoteLayout } from './components/NoteLayout.tsx';
import { EditNote } from './components/EditNote.tsx';
import 'bootstrap/dist/css/bootstrap.min.css'

export type Tag = {
  id: string,
  label: string
}

export type Note = {
  id: string,
} & NoteData

export type NoteData = {
  title: string,
  text: string | undefined,
  tagIDs?: string[]
}


export function App() {
  const notes = useSelector((state: RootState) => state.notesData);
  const tags = useSelector((state: RootState) => state.tagsData);
  const { themeColor } = useSelector((state: RootState) => state.settingsData);

  const dispatch = useDispatch();

  function onCreateNote({ title, text, tagIDs}: NoteData) {
    dispatch(addNote({
      id: uuidv4(),
      title: title,
      text: text,
      tagIDs: tagIDs
    }));
  }

  function onUpdateNote(id: string, { title, text, tagIDs}: NoteData) {
    dispatch(updateNote({
      id: id,
      title: title,
      text: text,
      tagIDs: tagIDs
    }));
  }

  function onDeleteNote(id: string) {
    dispatch(deleteNote(id));
  }

  function onAddTag({ id, label }: Tag) {
    dispatch(addTag({id: id, label: label}));
  }

  function onDeleteTag(id: string) {
    dispatch(updateNoteTagIDs(id))
    dispatch(deleteTag(id));
  }

  function onUpdateTag(id: string, label: string) {
    dispatch(updateTag({id: id, label: label}));
  }

  useEffect(() =>  {
    document.body.style.backgroundColor = themeColor === 'light'? '#f7f9fb' : '#212529';
  }, [themeColor]);

  return (
    <>
      
      <Container >
        <Routes>
          <Route
            path='/'
            element={
            <NoteList
              notes={notes}
              tags={tags}
              onAddTag={onAddTag}
              onDeleteTag={onDeleteTag}
              onUpdateTag={onUpdateTag}
            />}
          />
          <Route
            path='/create'
            element={
            <CreateNote
              onCreateNote={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />}
          />
          <Route
            path='/:id'
            element={<NoteLayout notes={notes} />}
          >
            <Route index element={<Note tags={tags} onDelete={onDeleteNote}/>} />
            <Route
              path='edit'
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={onAddTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </Container>
    </>
  )
}

export default App;