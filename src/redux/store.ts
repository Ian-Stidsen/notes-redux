import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

const store = configureStore({
  reducer: {
    notesData: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;