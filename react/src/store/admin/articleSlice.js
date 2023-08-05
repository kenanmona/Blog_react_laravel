import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ToastStyle from "../../components/toaststyle/ToastStyle";
import { request } from "../../services/utils/axios-utils";

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/article/create",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showArticle = createAsyncThunk(
  "article/showArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/article/show/paginate?page=${data.page}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticleById = createAsyncThunk(
  "article/getArticleById",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await request({
        url: `/article/show/${data.id}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/article/update/${data.id}`,
        method: "put",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/article/delete/${data.id}`,
        method: "delete",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createImagesArticle = createAsyncThunk(
  "article/createImagesArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/article/image/create`,
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showImagesArticle = createAsyncThunk(
  "article/showImagesArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/article/${data.id}/image/show`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteImageArticle = createAsyncThunk(
  "article/deleteImageArticle",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/article/image/${data.id}/delete`,
        method: "delete",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: {
    loader: false,
    success: false,
    articles: [],
    count: 0,
    article: null,
    images: [],
    id: null,
  },
  reducers: {
    addArticle(state, action) {
      state.article = action.payload;
    },
    resetImages(state, action) {
      state.images = [];
    },
  },
  extraReducers: {
    /* Start Create Article */
    [createArticle.pending]: (state, action) => {
      state.loader = true;
    },
    [createArticle.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [createArticle.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="try again..." />);
    },
    /* End Create Article */

    /* Start Show Article */
    [showArticle.fulfilled]: (state, action) => {
      state.articles = action.payload.data;
      state.count = Math.ceil(
        action.payload.meta.total / action.payload.meta.per_page
      );
    },

    /* End Show Article */

    /* Start Show Article By Id */
    [getArticleById.fulfilled]: (state, action) => {
      state.article = action.payload.data;
    },
    /* End Show Article By Id*/

    /* Start update Article  */
    [updateArticle.pending]: (state, action) => {
      state.loader = true;
    },
    [updateArticle.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [updateArticle.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="try again..." />);
    },
    /* Start update Article */

    /* Start delete Article  */
    [deleteArticle.pending]: (state, action) => {
      state.id = action.meta.arg.id;
      state.loader = true;
    },
    [deleteArticle.fulfilled]: (state, action) => {
      state.articles = state.articles.filter(
        (article) => action.meta.arg.id !== article.id
      );
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [deleteArticle.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="Try Again..." />);
    },
    /* Start delete Article */

    /* Start create Image Article  */
    [createImagesArticle.pending]: (state, action) => {
      state.loader = true;
    },
    [createImagesArticle.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [createImagesArticle.rejected]: (state, action) => {
      state.loader = false;
      toast(
        <ToastStyle icon={false} result={action.payload?.error?.message} />
      );
    },
    /* Start create Image Article  */

    /* Start show Image Article  */
    [showImagesArticle.fulfilled]: (state, action) => {
      state.images = action.payload.data.images;
    },
    /* Start show Image Article  */

    /* Start delete Image Article  */
    [deleteImageArticle.pending]: (state, action) => {
      state.id = action.meta.arg.id;
      state.loader = true;
    },
    [deleteImageArticle.fulfilled]: (state, action) => {
      state.images = state.images.filter(
        (image) => action.meta.arg.id !== image.id
      );
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [deleteImageArticle.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="Try Again..." />);
    },
    /* Start delete Image Article  */
  },
});
export const { addArticle, resetImages } = articleSlice.actions;

export default articleSlice.reducer;
