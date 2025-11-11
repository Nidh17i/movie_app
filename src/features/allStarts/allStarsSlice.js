import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "vote_average.desc",
  rating: 0,
  genre: "",
};

const allStarsSlice = createSlice({
  name: "allStars",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    resetAllStarsFilters: () => initialState,
  },
});

export const { setSort, setRating, setGenre, resetAllStarsFilters } =
  allStarsSlice.actions;
export default allStarsSlice.reducer;
