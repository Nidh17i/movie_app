import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  sort: "release_date.desc",
};

const upNextSlice = createSlice({
  name: "upNext",
  initialState,
  reducers: {
    
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = upNextSlice.actions;
export default upNextSlice.reducer;
