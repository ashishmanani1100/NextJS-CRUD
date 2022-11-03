import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../App/Feature/CrudSlice";
import toastReducer from "../App/Toast/toastSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    toast: toastReducer,
  },
});
