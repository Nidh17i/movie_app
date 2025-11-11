import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("movieUser")) || null,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  error: ""
};

const AuthSlice = createSlice({
  name: "MovieUser",
  initialState,
  reducers: {
    signupUser: (state, action) => {
      const all = JSON.parse(localStorage.getItem("movieUsers")) || [];
      if (all.find(u => u.name === action.payload.name)) {
        state.error = "Username exists";
        return;
      }
      const newUser = { ...action.payload, favorites: [], watchlist: [] };
      all.push(newUser);
      localStorage.setItem("movieUsers", JSON.stringify(all));
      localStorage.setItem("movieUser", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", true);
      state.userData = newUser;
      state.isLoggedIn = true;
      state.error = "";
    },
    loginUser: (state, action) => {
      const all = JSON.parse(localStorage.getItem("movieUsers")) || [];
      const u = all.find(x => x.name === action.payload.name && x.password === action.payload.password);
      if (!u) { state.error = "Invalid username/password"; return; }
      localStorage.setItem("movieUser", JSON.stringify(u));
      localStorage.setItem("isLoggedIn", true);
      state.userData = u;
      state.isLoggedIn = true;
      state.error = "";
    },
    logoutUser: (state) => {
      state.userData = null; state.isLoggedIn = false; state.error = "";
      localStorage.removeItem("movieUser"); localStorage.removeItem("isLoggedIn");
    },
  }
});

export const { signupUser, loginUser, logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
