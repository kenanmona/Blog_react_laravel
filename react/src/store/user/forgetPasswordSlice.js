import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";

export const forgetPasswordUser = createAsyncThunk(
  "forgetPassword/forgetPasswordUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/password/email",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: { loader: false, success: false },
  extraReducers: {
    [forgetPasswordUser.pending]: (state, action) => {
      state.loader = true;
    },
    [forgetPasswordUser.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
    },
    [forgetPasswordUser.rejected]: (state, action) => {
      state.loader = false;
    },
  },
});
export default forgetPasswordSlice.reducer;
