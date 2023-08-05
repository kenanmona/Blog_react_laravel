import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";
import { removeData } from "../../services/utils/local-storage-utils";

export const changePasswordUser = createAsyncThunk(
  "changePassword/changePasswordUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/password/reset",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: { loader: false, success: false },
  reducers: {},
  extraReducers: {
    [changePasswordUser.pending]: (state, action) => {
      state.loader = true;
    },
    [changePasswordUser.fulfilled]: (state, action) => {
      removeData("token");
      state.loader = false;
      state.success = true;
    },
    [changePasswordUser.rejected]: (state, action) => {
      state.loader = false;
    },
  },
});
export default changePasswordSlice.reducer;
