import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { active: null },
  reducers: {
    open(state, action) {
      state.active = action.payload;
    },
    close(state) {
      state.active = null;
    },
  },
});

export const { open, close } = uiSlice.actions;

export default uiSlice;
