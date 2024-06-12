import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import categoryReducer from "./categories/category.slice";
import productsReducer from "./products/products.slice";
import productReducer from "./product/product.slice";
import favoriteReducer from "./favorite/favorite.slice";
import cartReducer from "./cart/cart.slice";
import formCartReducer from "./formCart/formCart.slice";
import orderReducer from "./order/order.slice";
import { apiTokenErrorMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productsReducer,
    product: productReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    formCart: formCartReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiTokenErrorMiddleware),
})