import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types/todo.types";
import DATA from "./todoInitialState";

interface TodoState {
  todoList: Todo[];
}

const initialState: TodoState = {
  todoList: DATA,
};

export const toDoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList = [...state.todoList, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<Todo["id"]>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },

    patchTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, deleteTodo, patchTodo } = toDoSlice.actions;

export default toDoSlice.reducer;
