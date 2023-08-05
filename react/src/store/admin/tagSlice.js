import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ToastStyle from "../../components/toaststyle/ToastStyle";
import { request } from "../../services/utils/axios-utils";

export const showTag = createAsyncThunk("tag/showTag", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await request({
      url: "/tag/show",
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const createTag = createAsyncThunk(
  "tag/createTag",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: "/tag/create",
        method: "post",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

/* export const DeleteTag = createAsyncThunk(
  "tag/DeleteTag",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/tag/delete/${data.id}`,
        method: "delete",
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
); */

export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await request({
        url: `/tag/update/${data.id}`,
        method: "put",
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState: { loader: false, success: false, tags: [], id: null },
  extraReducers: {
    /* Start Create Category */
    [createTag.pending]: (state, action) => {
      state.loader = true;
    },
    [createTag.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [createTag.rejected]: (state, action) => {
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
    [showTag.pending]: (state, action) => {
      state.loader = true;
    },
    [showTag.fulfilled]: (state, action) => {
      state.tags = action.payload.data;
      state.loader = false;
      state.success = true;
    },
    [showTag.rejected]: (state, action) => {
      state.loader = false;
    },
    /* End Show Category */

    /* Start Delete Category */
    [updateTag.pending]: (state, action) => {
      state.loader = true;
    },
    [updateTag.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      toast(<ToastStyle icon={true} result="Done" />);
    },
    [updateTag.rejected]: (state, action) => {
      state.loader = false;
      toast(<ToastStyle icon={false} result="Try Again" />);
    },
    /* End Delete Category */

    /* Start Update Category */
    /* [updateCategory.pending]: (state, action) => {
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
    }, */
    /* End Update Category */
  },
});

export default tagSlice.reducer;
