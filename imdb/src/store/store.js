import { configureStore } from "@reduxjs/toolkit";
import  themeSlice  from "./slices/themeSlice";
import  watchedMoviesSlice  from "./slices/watchedMovies";
import  watchedTvsSlice  from "./slices/watchedTvs";

export const store = configureStore({
  reducer: {
    theme : themeSlice,
    watchedMovies : watchedMoviesSlice, 
    watchedTvs : watchedTvsSlice ,

  },
})
