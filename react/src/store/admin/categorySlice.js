import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ToastStyle from "../../components/toaststyle/ToastStyle";
import { request } from "../../services/utils/axios-utils";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/category/create",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const ShowCategory = createAsyncThunk(
  "category/ShowCategory",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/category/show",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const DeleteCategory = createAsyncThunk(
  "category/DeleteCategory",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/category/delete/${data.id}`,
        method: "delete",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/category/update/${data.id}`,
        method: "put",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: { loader: false, success: false, categories: [], id: null },
  extraReducers: {
    /* Start Create Category */
    [createCategory.pending]: (state, action) => {
      state.loader = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [createCategory.rejected]: (state, action) => {
      state.loader = false;
      toast(
        <ToastStyle
          icon={false}
          result={
            action.payload.error.message === "token Invalid"
              ? "Please Login Again"
              : "Try Again"
          }
        />
      );
    },
    /* End Create Category */

    /* Start Show Category */
    [ShowCategory.pending]: (state, action) => {
      state.loader = true;
    },
    [ShowCategory.fulfilled]: (state, action) => {
      state.categories = action.payload.data;
      state.loader = false;
      state.success = true;
    },
    [ShowCategory.rejected]: (state, action) => {
      state.loader = false;
    },
    /* End Show Category */

    /* Start Delete Category */
    [DeleteCategory.pending]: (state, action) => {
      state.id = action.meta.arg.id;
      state.loader = true;
    },
    [DeleteCategory.fulfilled]: (state, action) => {
      state.categories = state.categories.filter(
        (category) => action.meta.arg.id !== category.id
      );
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [DeleteCategory.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End Delete Category */

    /* Start Update Category */
    [updateCategory.pending]: (state, action) => {
      state.loader = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [updateCategory.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End Update Category */
  },
});

export default categorySlice.reducer;
