import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, Tag } from "../App";

const initialState: Note = {
  id: 'initial-id',
  title: 'Todo Title',
  body: 'Todo body',
  tags: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    changeBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload
    },
  },
})

export const { changeTitle } = notesSlice.actions;
export default notesSlice.reducer;