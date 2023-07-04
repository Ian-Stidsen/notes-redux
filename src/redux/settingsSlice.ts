import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  showTextMode: boolean,
  themeColor: string,
}

const initialState: SettingsState = {
    showTextMode: true,
    themeColor: 'light',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setShowTextMode(state, action: PayloadAction<boolean>) {
      state.showTextMode = action.payload;
    },
    setThemeColor(state, action: PayloadAction<string>) {
      state.themeColor = action.payload;
    },
  },
})

export const { setThemeColor, setShowTextMode } = settingsSlice.actions;
export default settingsSlice.reducer;