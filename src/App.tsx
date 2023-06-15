import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap"
import { addNote, deleteNote, updateNote } from "./redux/notesSlice";
import { addTag, deleteTag } from './redux/tagsSlice.ts';
import { v4 as uuidv4 } from "uuid";
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateNote } from './components/CreateNote.tsx';
import { NoteList } from './components/NoteList.tsx';
import { NoteForm } from './components/NoteForm.tsx';

export type Tag = {
  id: string,
  label: string
}

export type Note = {
  id: string,
} & NewNoteData

export type NewNoteData = {
  title: string,
  text: string | undefined,
  tagIDs?: string[]

}

export function App() {
  const notes = useSelector((state: RootState) => state.notesData);
  const tags = useSelector((state: RootState) => state.tagsData);

  const dispatch = useDispatch();
  /* const titleRef = useRef<HTMLInputElement | null>(null)
  const tagsRef = useRef<HTMLInputElement | null>(null)
  const textRef = useRef<HTMLInputElement | null>(null) */


  function onCreateNote({ title, text, tagIDs}: NewNoteData) {
    if (title === '') {
      alert("Please fill in the title")
      return;
    }
    /* const title: string = titleRef.current!.value;
    const text: string = textRef.current!.value; */
    
    dispatch(addNote({
      id: uuidv4(),
      title: title,
      text: text,
      tagIDs: tagIDs
    }));
  }

  function test() {
    console.log(onCreateNote({title:'title', text:'text', tagIDs:['1']}))
    //const test = tags.find(tag => tag.id === note.tags)
  }

  

  return (
    <>
      
      <Container>
        <Button onClick={test}>test</Button>
        <Routes>
          <Route
            path='/:id'
            element={
            <NoteList
              notes={notes}
              tags={tags}
            />}
          />
          <Route
            path='/create'
            element={
            <CreateNote
              onCreateNote={onCreateNote}
              availableTags={tags}
            />}
          />
          <Route
            path='/'
            element={<NoteForm />}
          />
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </Container>
    </>
  )
}

export default App