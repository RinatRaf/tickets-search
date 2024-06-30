import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { FilmsApi } from "./api";
import { ratingApi } from "./apiRating";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [FilmsApi.reducerPath]: FilmsApi.reducer,
    // [ratingApi.reducerPath]: ratingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FilmsApi.middleware),
  // .concat(ratingApi.middleware),
});

export default store;
