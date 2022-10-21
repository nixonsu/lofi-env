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
  links: [
    {
      _id: "default",
      url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to relax/study to",
    },
  ],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as State;

// Get links
export const getLinks = createAsyncThunk(
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
export const createLink = createAsyncThunk(
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
export const deleteLink = createAsyncThunk(
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
export const updateLink = createAsyncThunk(
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
      .addCase(createLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links.push(action.payload);
      })
      .addCase(createLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(getLinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(deleteLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = state.links.filter(
          (link) => link._id !== action.payload.id
        );
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(updateLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      });
  },
});

export const { reset } = linkSlice.actions;
export default linkSlice.reducer;
