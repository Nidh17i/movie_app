import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],   
  loading: false, 
};

const allStarsSlice = createSlice({
  name: "allStars",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
},
});

export const { setMovies, setLoading, resetAllStars } = allStarsSlice.actions;
export default allStarsSlice.reducer;
