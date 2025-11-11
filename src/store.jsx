import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './AuthSlice';
import discoverReducer from './features/discover/DiscoverSlice';
import allStarsReducer from './features/allStarts/allStarsSlice';
import upNextReducer from './features/upNext/upNextSlice';
import favmoviesReducer from './features/favMovie/favSlice'

export const store=configureStore({
    reducer:{
       MovieUser:movieReducer,
       discover: discoverReducer,
       allStars: allStarsReducer,
       upNext: upNextReducer,
      favmovies:favmoviesReducer
      
    }
})