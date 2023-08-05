import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ToastStyle from "../../components/toaststyle/ToastStyle";
import { request } from "../../services/utils/axios-utils";

export const showAllUsers = createAsyncThunk(
  "user/showAllUsers",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/users",
        method: "get",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeRoleUser = createAsyncThunk(
  "user/removeRoleUser",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await request({
        url: `/role/remove/${data.id}`,
        method: "get",
      });
      dispatch(showAllUsers());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateRoleUser = createAsyncThunk(
  "user/updateRoleUser",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await request({
        url: `/role/add/${data.id}`,
        method: "get",
      });
      dispatch(showAllUsers());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const blockUser = createAsyncThunk(
  "user/blockUser",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await request({
        url: `/block/${data.id}`,
        method: "delete",
      });
      dispatch(showAllUsers());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const unBlockUser = createAsyncThunk(
  "user/unBlockUser",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await request({
        url: `/unblock/${data.id}`,
        method: "get",
      });
      dispatch(showAllUsers());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkMe = createAsyncThunk(
  "user/checkMe",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/me`,
        method: "get",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loaderAdmin: false,
    loaderUser: false,
    loaderBlock: false,
    loaderUnBlock: false,
    successAdmin: false,
    users: null,
    id: null,
    isAdmin: false,
  },
  extraReducers: {
    /* Start Show All Users */
    [showAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload.data;
    },
    /* End Show All Users */

    /* Start Update Users */
    [updateRoleUser.pending]: (state, action) => {
      state.loaderAdmin = true;
      state.id = action.meta.arg.id;
    },
    [updateRoleUser.fulfilled]: (state, action) => {
      state.loaderAdmin = false;
      state.successAdmin = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [updateRoleUser.rejected]: (state, action) => {
      state.loaderAdmin = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End Update Users */

    /* Start Check Me */
    [checkMe.fulfilled]: (state, action) => {
      if (
        action.payload.data.email === "kenanmona90@gmail.com" ||
        action.payload.data.email === "abrahimalia7@gmail.com"
      ) {
        state.isAdmin = true;
      }
    },
    /* End Check Me */

    /* Start remove Users */
    [removeRoleUser.pending]: (state, action) => {
      state.loaderUser = true;
      state.id = action.meta.arg.id;
    },
    [removeRoleUser.fulfilled]: (state, action) => {
      state.loaderUser = false;
      state.successAdmin = false;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [removeRoleUser.rejected]: (state, action) => {
      state.loaderUser = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End remove Users */

    /* Start Block Users */
    [blockUser.pending]: (state, action) => {
      state.loaderBlock = true;
      state.id = action.meta.arg.id;
    },
    [blockUser.fulfilled]: (state, action) => {
      state.loaderBlock = false;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [blockUser.rejected]: (state, action) => {
      state.loaderBlock = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End Block Users */

    /* Start UnBlock Users */
    [unBlockUser.pending]: (state, action) => {
      state.loaderUnBlock = true;
      state.id = action.meta.arg.id;
    },
    [unBlockUser.fulfilled]: (state, action) => {
      state.loaderUnBlock = false;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [unBlockUser.rejected]: (state, action) => {
      state.loaderUnBlock = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End UnBlock Users */
  },
});

export default userSlice.reducer;
