import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: "",
  },
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { loading } = loaderSlice.actions;
export default loaderSlice.reducer;
