import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { FilmsApi } from "./api";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [FilmsApi.reducerPath]: FilmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FilmsApi.middleware),
});

export default store;
