import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { Component } from 'react'
import { Note } from './components/Note.tsx'

export type Note = {
  id: string,
} & NoteData

export type NoteData = {
  title: string,
  body: string,
  tags: Tag[],
}

export type Tag = {
  id: string,
  label: string,
}

function App() {

  return (
    <Provider store={store}>
      <Note />
    </Provider>
  )
}

export default App
