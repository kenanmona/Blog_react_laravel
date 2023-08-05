import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ToastStyle from "../../components/toaststyle/ToastStyle";
import { request } from "../../services/utils/axios-utils";

export const showComment = createAsyncThunk(
  "comment/showComment",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/comments/show/article/${data.id}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/comments/delete/${data.id}`,
        method: "delete",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [], id: null, loader: false },
  reducers: {
    resetComment(state, action) {
      state.comments = [];
    },
  },
  extraReducers: {
    /* Start Show comment */
    [showComment.fulfilled]: (state, action) => {
      state.comments = action.payload.data;
    },
    /* End Show comment */

    /* Start delete comment */
    [deleteComment.pending]: (state, action) => {
      state.id = action.meta.arg.id;
      state.loader = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => action.meta.arg.id !== comment.id
      );
      state.loader = false;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [deleteComment.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="Try Again..." />);
    },
    /* End delete comment */
  },
});
export const { resetComment } = commentSlice.actions;
export default commentSlice.reducer;
