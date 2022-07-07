import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ITask } from "../../types";
import taskService from "./taskService";

interface State {
  tasks: ITask[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as State;

// Get tasks
export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.getTasks(token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData: object, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskData: ITask, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.deleteTask(taskData, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Toggle task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (taskData: ITask, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user.token;
      return await taskService.updateTask(taskData, token);
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
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, isDone: !task.isDone }
            : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
