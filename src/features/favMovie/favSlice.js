import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Favorite: [],
  WatchList: [],
};

const favSlice = createSlice({
  name: "favmovies",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      localStorage.setItem("favMovie", JSON.stringify(action.payload));
      state.Favorite.push(action.payload);
    },
    removeFavorite: (state, action) => {
      //console.log(action.payload);

      state.Favorite = state.Favorite.filter((m) => m.id !== action.payload);
      console.log("fav", state.Favorite);
      localStorage.setItem("favMovie", JSON.stringify(state.Favorite));
    },
    addtoWatchList: (state, action) => {
      localStorage.setItem("favWatchList", JSON.stringify(action.payload));
      state.WatchList.push(action.payload);
    },
    removetoWatchList: (state, action) => {
      state.WatchList = state.WatchList.filter((m) => m.id != action.payload);
      localStorage.setItem("favWatchList", JSON.stringify(state.WatchList));
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  addtoWatchList,
  removetoWatchList,
} = favSlice.actions;

export default favSlice.reducer;
