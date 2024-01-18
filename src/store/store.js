import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import categoryReducer from "./categories/category.slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer
  },
})