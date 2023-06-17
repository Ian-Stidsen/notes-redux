import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "../App";


type TagState = Tag[];

const initialState: TagState = [
  {
    id: '1',
    label: 'Tag example',
  }
];

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state: TagState, tagData: PayloadAction<Tag>) => {
      state.push(tagData.payload);
    },
    deleteTag: (state: TagState, id: PayloadAction<string>) => {
      return state.filter(tag => tag.id!== id.payload);
    },
    updateTag: (state: TagState, tagData: PayloadAction<Tag>) => {
      const tagToUpdate = state.find(tag => tag.id === tagData.payload.id);
      if (tagToUpdate) {
        tagToUpdate.label = tagData.payload.label;
      }
    },
  },
})

export const { addTag, deleteTag, updateTag } = tagSlice.actions;
export default tagSlice.reducer;