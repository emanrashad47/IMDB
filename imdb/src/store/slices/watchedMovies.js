import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchedMovies: JSON.parse(localStorage.getItem("watchListMovies"))|| [],
};

export const watchedMoviesSlice = createSlice({
  name: "watchedMovies",
  initialState,
  reducers: {
    addwatchedMovies: (state, action) => {
      if (!state.watchedMovies.includes(action.payload)) {
        state.watchedMovies.push(action.payload);
        localStorage.setItem(
          "watchListMovies",
          JSON.stringify(state.watchedMovies)
        );
      } else {
        console.log("Movie already added");
      }
    },
    removeMovie: (state, action) => {
      if (state.watchedMovies.length > 0) {
        state.watchedMovies.splice(
        state.watchedMovies.indexOf(`${action.payload}`),1);
        localStorage.setItem("watchListMovies", JSON.stringify(state.watchedMovies ))
      } else {
        console.log("No Movies to remove");
      }
    },
  },
});
export const { addwatchedMovies, removeMovie } = watchedMoviesSlice.actions;

export default watchedMoviesSlice.reducer;


