import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../App";

type NoteState = Array<Note>;

const initialState: NoteState = [
  {
    id: '1',
    title: 'Example Note',
    text: 'This is an example note',
    tagIDs: ['1'],
  },
];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state: NoteState, noteData: PayloadAction<Note>) => {
      state.push(noteData.payload);
    },
    deleteNote: (state: NoteState, id: PayloadAction<string>) => {
      return state.filter(note => note.id !== id.payload);
    },
    updateNote: (state: NoteState, updatedNote: PayloadAction<Note>) => {
      const noteToUpdate = state.find(note => note.id === updatedNote.payload.id);
      if (noteToUpdate) {
        noteToUpdate.title = updatedNote.payload.title;
        noteToUpdate.text = updatedNote.payload.text;
        noteToUpdate.tagIDs = updatedNote.payload.tagIDs;
      }
    },
  },
})

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;