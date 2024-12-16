import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/UserReducer";
import eventReducer from "./Reducer/EventReducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
    event: eventReducer,
  },
});
