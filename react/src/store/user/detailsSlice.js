import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";
import { loading } from "./loaderSlice";

export const showArticleById = createAsyncThunk(
  "details/showArticleById",
  async (data, ThunkAPI) => {
    const { rejectWithValue, dispatch } = ThunkAPI;
    try {
      /* dispatch(loading("start")); */
      const res = await request({
        url: `/article/${data.id}/show`,
        method: "get",
      });
      /* dispatch(loading("end")); */
      return res.data;
    } catch (error) {
      dispatch(loading("end"));
      return rejectWithValue(error.response.data);
    }
  }
);

export const addLike = createAsyncThunk(
  "details/addLike",
  async (data, ThunkAPI) => {
    const { rejectWithValue, dispatch } = ThunkAPI;
    try {
      const res = await request({
        url: `/like`,
        method: "post",
        data,
      });
      dispatch(showArticleById({ id: data.article_id }));
      // dispatch(likeCheck({ article_id: data.article_id }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeCheck = createAsyncThunk(
  "details/likeCheck",
  async (data, ThunkAPI) => {
    const { rejectWithValue, dispatch } = ThunkAPI;
    try {
      dispatch(loading("start"));
      const res = await request({
        url: `/like/check`,
        method: "post",
        data,
      });
      dispatch(loading("end"));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "details/addComment",
  async (data, ThunkAPI) => {
    const { rejectWithValue, dispatch } = ThunkAPI;
    try {
      const res = await request({
        url: `/add/comment`,
        method: "post",
        data,
      });
      dispatch(showArticleById({ id: data.article_id }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "details/deleteComment",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await request({
        url: `/comment/delete/${data.id}`,
        method: "delete",
      });
      dispatch(showArticleById({ id: data.article_id }));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    loader: false,
    success: false,
    article: null,
    isLiked: false,
    likes: null,
    isClicked: false,
  },
  /*   reducers :{
    resetIsLiked:(state, action)=>{
      state.isLiked = 
    }
  }, */
  extraReducers: {
    /* Start Show Article Details */
    [showArticleById.fulfilled]: (state, action) => {
      state.article = action.payload.data;
      state.likes = action.payload.data.likes;
    },
    /* End Show Article Details */

    /* Start Check Like */
    [likeCheck.fulfilled]: (state, action) => {
      state.isLiked = action.payload.data.check;
    },
    /* End Check Like */

    /* Start Add Like */

    /* End Add Like */

    /* Start Add Comment */

    /* End Add Comment */
    /* Start Add Comment */
    [deleteComment.pending]: (state, action) => {
      state.isClicked = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isClicked = false;
    },
    /* End Add Comment */
  },
});

export default detailsSlice.reducer;
