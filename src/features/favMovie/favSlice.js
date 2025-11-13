import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
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
     
      const exists = state.Favorite.find((m) => m.id === movie.id);
        if (!exists) {
      const updated=[...state.Favorite,movie];
      state.Favorite=updated;
      localStorage.setItem(`favMovie_${userKey}`, JSON.stringify(updated));
          toast.success("Added to Favorites!");
       }
       else{
         toast("Already in Favorites!");
       }
      
    },
    removeFavorite: (state, action) => {
      const {id,userKey}=action.payload;
      const updated = state.Favorite.filter((m) => m.id !== id);
      state.Favorite = updated;

      localStorage.setItem(`favMovie_${userKey}`, JSON.stringify(updated));
       toast.error("Removed from Favorites")
    },
    addtoWatchList: (state, action) => {
      const {movie,userKey}=action.payload;
      const exists = state.WatchList.find((m) => m.id === movie.id);
       if (!exists) {
       const updated = [...state.WatchList, movie];
       state.WatchList = updated;
       localStorage.setItem(`favWatchList_${userKey}`, JSON.stringify(updated));
       toast.success("Added to Watchlist!");
       
       }
          else{
            toast(" Already in Watchlist!");
          }
    },
    removetoWatchList: (state, action) => {
      const { id, userKey } = action.payload;
      const updated = state.WatchList.filter((m) => m.id !== id);
      state.WatchList = updated;
      localStorage.setItem(`favWatchList_${userKey}`, JSON.stringify(updated));
      toast.error("Removed from Watchlist");
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
  clearFavState,
} = favSlice.actions;

export default favSlice.reducer;
