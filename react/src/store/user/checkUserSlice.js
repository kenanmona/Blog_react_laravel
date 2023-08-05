import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";
import { removeData } from "../../services/utils/local-storage-utils";

export const checkLogUser = createAsyncThunk(
  "checkUser/checkLogUser",
  async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await request({
        url: `/check/user`,
        method: "get",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const logOut = createAsyncThunk(
  "checkUser/logOut",
  async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await request({
        url: `/logout`,
        method: "post",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkUserSlice = createSlice({
  name: "checkUser",
  initialState: {
    isLoggedIn: null,
  },
  extraReducers: {
    [checkLogUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [checkLogUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },

    /* Log Out Action */

    [logOut.fulfilled]: (state, action) => {
      removeData("token");
    },
  },
});
export default checkUserSlice.reducer;
