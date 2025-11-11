// src/redux/slices/upNextSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  sort: "release_date.desc",
};

const upNextSlice = createSlice({
  name: "upNext",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setPage, setSort } = upNextSlice.actions;
export default upNextSlice.reducer;
