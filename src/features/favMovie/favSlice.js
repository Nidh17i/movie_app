import { createSlice } from "@reduxjs/toolkit";

// Helper functions
const loadFromLocalStorage = (userId, key) => {
  try {
    const data = localStorage.getItem(`${userId}_${key}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (userId, key, data) => {
  localStorage.setItem(`${userId}_${key}`, JSON.stringify(data));
};

// Function to get current logged-in user ID
const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("movieUser"));
  return user ? user.name : "guest"; // fallback to guest
};

const initialState = {
  favorites: loadFromLocalStorage(getCurrentUserId(), "favorites"),
  watchlist: loadFromLocalStorage(getCurrentUserId(), "watchlist"),
};

const favSlice = createSlice({
  name: "favmovies",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const userId = getCurrentUserId();
      const movie = action.payload;
      if (!state.favorites.find((m) => m.id === movie.id)) {
        state.favorites.push(movie);
        saveToLocalStorage(userId, "favorites", state.favorites);
      }
    },
    removeFavorite: (state, action) => {
      const userId = getCurrentUserId();
      state.favorites = state.favorites.filter((m) => m.id !== action.payload);
      saveToLocalStorage(userId, "favorites", state.favorites);
    },
    addToWatchlist: (state, action) => {
      const userId = getCurrentUserId();
      const movie = action.payload;
      if (!state.watchlist.find((m) => m.id === movie.id)) {
        state.watchlist.push(movie);
        saveToLocalStorage(userId, "watchlist", state.watchlist);
      }
    },
    removeFromWatchlist: (state, action) => {
      const userId = getCurrentUserId();
      state.watchlist = state.watchlist.filter((m) => m.id !== action.payload);
      saveToLocalStorage(userId, "watchlist", state.watchlist);
    },
    // Optional: refresh state when user logs in/out
    setUser: (state) => {
      const userId = getCurrentUserId();
      state.favorites = loadFromLocalStorage(userId, "favorites");
      state.watchlist = loadFromLocalStorage(userId, "watchlist");
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
  setUser,
} = favSlice.actions;

export default favSlice.reducer;
