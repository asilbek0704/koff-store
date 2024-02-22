import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import categoryReducer from "./categories/category.slice";
import productsReducer from "./products/products.slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productsReducer
  },
})