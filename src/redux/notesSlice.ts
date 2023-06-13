import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../App";

type NoteState = Array<Note>;

const initialState: NoteState = [
  {
    id: '1',
    title: 'First note',
    text: 'This is the first note',
    tagIDs: ['2'],
  }
];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state: NoteState, noteData: PayloadAction<Note>) => {
      state.push(noteData.payload);
    },
    deleteNote: (state: NoteState, id: PayloadAction<string>) => {
      return state = state.filter(note => note.id !== id.payload);
    },
    updateNote: (state: NoteState, updatedNote: PayloadAction<Note>) => {
      const noteToUpdate = state.find(note => note.id === updatedNote.payload.id);
      if (noteToUpdate) {
        noteToUpdate.title = updatedNote.payload.title;
        noteToUpdate.text = updatedNote.payload.text;
      }
    },
  },
})

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;