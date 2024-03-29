import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import categoryReducer from "./categories/category.slice";
import productsReducer from "./products/products.slice";
import { apiTokenErrorMiddleware } from "./middleware";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiTokenErrorMiddleware),
})