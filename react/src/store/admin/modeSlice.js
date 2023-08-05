import { createSlice } from "@reduxjs/toolkit";
const initial = { mode: true };
const modeSlice = createSlice({
  name: "mode",
  initialState: initial,
  reducers: {
    change: (state, action) => {
      state.mode = !state.mode;
    },
  },
});
export const { change } = modeSlice.actions;

export default modeSlice.reducer;
