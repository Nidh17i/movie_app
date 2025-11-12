import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Favorite: [],
  WatchList: [],
};

const favSlice = createSlice({
  name: "favmovies",
  initialState,
  reducers: {

    loadUserFavData:(state,action)=>{
      const userKey=action.payload;
      const fav=JSON.parse(localStorage.getItem(`favMovie_${userKey}`))||[];
      const watch = JSON.parse(localStorage.getItem(`favWatchList_${userKey}`)) || [];
      state.Favorite = fav;
      state.WatchList = watch;
    },
    addFavorite: (state, action) => {
      const {movie,userKey}=action.payload;
      const updated=[...state.Favorite,movie];
      state.Favorite=updated;
      localStorage.setItem(`favMovie_${userKey}`, JSON.stringify(updated));
      
    },
    removeFavorite: (state, action) => {
        const {id,userKey}=action.payload;
      const updated = state.Favorite.filter((m) => m.id !== id);
      state.Favorite = updated;

      localStorage.setItem(`favMovie_${userKey}`, JSON.stringify(updated));
    },
    addtoWatchList: (state, action) => {
      const {movie,userKey}=action.payload;
       const updated = [...state.WatchList, movie];
       state.WatchList = updated;
       localStorage.setItem(`favWatchList_${userKey}`, JSON.stringify(updated));
    },
    removetoWatchList: (state, action) => {
      const { id, userKey } = action.payload;
      const updated = state.WatchList.filter((m) => m.id !== id);
      state.WatchList = updated;
      localStorage.setItem(`favWatchList_${userKey}`, JSON.stringify(updated));
    },
    clearFavState: (state) => {
      state.Favorite = [];
      state.WatchList = [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  addtoWatchList,
   loadUserFavData,
  removetoWatchList,
  clearFavState
} = favSlice.actions;

export default favSlice.reducer;
