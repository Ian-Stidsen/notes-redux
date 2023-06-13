import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import tagsReducer from "./tagsSlice";

const store = configureStore({
  reducer: {
    notesData: notesReducer,
    tagsData: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;