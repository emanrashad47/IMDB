import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = (state.theme === 'dark') ? 'light' : 'dark';
      let mainItems = document.querySelectorAll('.bg-black');
    },
  },
});
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;