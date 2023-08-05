import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../services/utils/axios-utils";
import { loading } from "./loaderSlice";

export const filterArticle = createAsyncThunk(
  "filter/filterArticle",
  async (data, ThunkAPI) => {
    const { rejectWithValue, dispatch } = ThunkAPI;
    try {
      if (data.category) {
        dispatch(loading("start"));
        const res = await request({
          url: `/category/${data.category}/article/show?page=${data.page}`,
          method: "get",
        });
        dispatch(loading("end"));
        return res.data;
      }
      if (data.tag) {
        dispatch(loading("start"));
        const res = await request({
          url: `/tag/${data.tag}/article/show?page=${data.page}`,
          method: "get",
        });
        dispatch(loading("end"));
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: { count: 0, articles: [], page: 1 },
  extraReducers: {
    [filterArticle.pending]: (state, action) => {
      state.page = action.meta.arg.page;
    },
    [filterArticle.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.count = Math.ceil(
        action.payload.meta.total / action.payload.meta.per_page
      );
    },
  },
});
export default filterSlice.reducer;
