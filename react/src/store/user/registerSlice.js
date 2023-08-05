import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";
import { setData } from "../../services/utils/local-storage-utils";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/register",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initial = { success: false, loader: false };
const registerSlice = createSlice({
  name: "register",
  initialState: initial,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loader = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      setData("token", action.payload.data.token);
      state.loader = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.loader = false;
    },
  },
});
export default registerSlice.reducer;
