import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await request({
        url: "/notifications/user",
        method: "get",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notifications: [], check: true },
  reducers: {
    addNotification(state, action) {
      state.notifications.unshift(action.payload);
      state.check = false;
    },
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.data;
    },
  },
});
export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
