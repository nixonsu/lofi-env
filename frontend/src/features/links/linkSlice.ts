import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ILink } from "../../types";
import linkService from "./linkService";

interface State {
  links: ILink[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState = {
  links: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as State;

// Get links
export const getlinks = createAsyncThunk(
  "links/getAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await linkService.getLinks(token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create link
export const createlink = createAsyncThunk(
  "links/create",
  async (linkData: object, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await linkService.createLink(linkData, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete link
export const deletelink = createAsyncThunk(
  "links/delete",
  async (linkData: ILink, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await linkService.deleteLink(linkData, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Toggle link
export const updatelink = createAsyncThunk(
  "links/update",
  async (linkData: ILink, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await linkService.updateLink(linkData, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create slice
export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createlink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createlink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links.push(action.payload);
      })
      .addCase(createlink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(getlinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getlinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(getlinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(deletelink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletelink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = state.links.filter(
          (link) => link._id !== action.payload._id
        );
      })
      .addCase(deletelink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(updatelink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatelink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatelink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      });
  },
});

export const { reset } = linkSlice.actions;
export default linkSlice.reducer;
