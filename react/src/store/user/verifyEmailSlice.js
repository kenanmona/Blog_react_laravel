import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";

export const verifyEmail = createAsyncThunk(
  "verify/verifyEmail",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/verification/verify/${data.id}?expires=${data.expires}&signature=${data.signature}`,
        method: "post",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initial = { show: false, icon: false, result: "" };
const verifyEmailSlice = createSlice({
  name: "verify",
  initialState: initial,
  reducers: {},
  extraReducers: {
    [verifyEmail.pending]: (state, action) => {
      state.show = false;
    },
    [verifyEmail.fulfilled]: (state, action) => {
      state.show = true;
      state.icon = true;
      state.result = action.payload.data;
    },
    [verifyEmail.rejected]: (state, action) => {
      state.show = true;
      state.result = action.payload.error;
    },
  },
});
export default verifyEmailSlice.reducer;
