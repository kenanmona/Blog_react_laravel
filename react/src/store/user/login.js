import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";
import { setData } from "../../services/utils/local-storage-utils";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/login",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: { loader: false, success: false },

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loader = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      setData("token", action.payload.data.token);
      state.loader = false;
      state.success = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loader = false;
    },
  },
});

export default loginSlice.reducer;
