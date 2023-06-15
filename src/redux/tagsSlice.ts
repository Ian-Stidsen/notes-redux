import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "../App";


type TagState = Tag[];

const initialState: TagState = [
  {
    id: '1',
    label: 'Example Tag 1',
  }
];

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state: TagState, tagData: PayloadAction<Tag>) => {
      state.push(tagData.payload);
    },
    deleteTag: (state: TagState, id: PayloadAction<Tag>) => {
      state = state.filter(tag => tag.id!== id.payload.id);
    },
  },
})

export const { addTag, deleteTag } = tagSlice.actions;
export default tagSlice.reducer;