import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import colorReducer from "../features/colors/colorSlice";

export const store = configureStore({
  reducer: { auth: authReducer, tasks: taskReducer, colors: colorReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
