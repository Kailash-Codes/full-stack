import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../services/booksApi";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(booksApi.middleware),
});
