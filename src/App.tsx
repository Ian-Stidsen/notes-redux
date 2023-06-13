import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap"
import { addNote, deleteNote, updateNote } from "./redux/notesSlice";
import { v4 as uuidv4 } from "uuid";
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateNote } from './components/CreateNote.tsx';
import { NoteList } from './components/NoteList.tsx';

export type Tag = {
  id: string,
  label: string
}

export type Note = {
  id: string,
  title: string,
  text: string | undefined,
  tagIDs?: string[]
}

export function App() {
  const notes = useSelector((state: RootState) => state.notesData);
  const tags = useSelector((state: RootState) => state.tagsData);

  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement | null>(null)
  const tagsRef = useRef<HTMLInputElement | null>(null)
  const textRef = useRef<HTMLInputElement | null>(null)


  function onCreateNote() {
    if (titleRef.current?.value === '') {
      alert("Please fill in the title")
      return;
    }
    const title: string = titleRef.current!.value;
    const text: string = textRef.current!.value;
    
    dispatch(addNote({
      id: uuidv4(),
      title: title,
      text: text
    }));
  }

  function test() {
    console.log(notes)
    //const test = tags.find(tag => tag.id === note.tags)
  }

  return (
    <>
      
      <Container>
        <Routes>
          <Route
            path='/'
            element={
            <NoteList
              notes={notes}
              tags={tags}
            />}
          />
          <Route
            path='/create'
            element={<CreateNote />}
          />
          <Route
            path='/:id'
            element={<CreateNote />}
          />
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </Container>
    </>
  )
}

export default App