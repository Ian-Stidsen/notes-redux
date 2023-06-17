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
        Object.assign(noteToUpdate, updatedNote.payload);
      }
    },
    updateNoteTagIDs: (state: NoteState, tagId: PayloadAction<string>) => {
      state.forEach(note => {
        note.tagIDs = note.tagIDs?.filter(id => id !== tagId.payload);
      });
    },
  },
})

export const { addNote, deleteNote, updateNote, updateNoteTagIDs } = notesSlice.actions;
export default notesSlice.reducer;