
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  genre: "",
  rating: 0,
  sort: "popularity.desc",
};

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      console.log('action',action.payload)
      state.search = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setGenre, setRating, setSort, resetFilters } =
  discoverSlice.actions;

export default discoverSlice.reducer;
