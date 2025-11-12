import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],   
  loading: false, 
};

const upNextSlice = createSlice({
  name: "upNext",
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

export const { setMovies, setLoading } = upNextSlice.actions;
export default upNextSlice.reducer;
