import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";

export const resendEmailUser = createAsyncThunk(
  "resendEmail/resendEmailUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/verification/resend",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const resendEmailSlice = createSlice({
  name: "resendEmail",
  initialState: { loader: false, success: false },

  extraReducers: {
    [resendEmailUser.pending]: (state, action) => {
      state.loader = true;
    },
    [resendEmailUser.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
    },
    [resendEmailUser.rejected]: (state, action) => {
      state.loader = false;
    },
  },
});

// export const { isLoader, isSuccess } = loginSlice.actions;
export default resendEmailSlice.reducer;
