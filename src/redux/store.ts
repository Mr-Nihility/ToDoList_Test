import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todoState: todoReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;