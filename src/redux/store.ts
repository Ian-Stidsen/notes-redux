import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import tagsReducer from "./tagsSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    notesData: notesReducer,
    tagsData: tagsReducer,
    settingsData: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;