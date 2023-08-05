import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";

export const checkUser = createAsyncThunk(
  "privillage/checkUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/check/user",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const privillageSlice = createSlice({
  name: "privillage",
  initialState: { success: false },

  extraReducers: {
    [checkUser.pending]: (state, action) => {
      state.success = false;
    },
    [checkUser.fulfilled]: (state, action) => {
      state.success = false;
    },
    [checkUser.rejected]: (state, action) => {
      state.success = true;
    },
  },
});

export default privillageSlice.reducer;
