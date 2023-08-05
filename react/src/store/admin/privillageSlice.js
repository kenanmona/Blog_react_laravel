import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";

export const checkAdmin = createAsyncThunk(
  "privillage/checkAdmin",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/check/admin",
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
    [checkAdmin.fulfilled]: (state, action) => {
      state.success = true;
    },
    [checkAdmin.rejected]: (state, action) => {
      state.success = false;
    },
  },
});

export default privillageSlice.reducer;
