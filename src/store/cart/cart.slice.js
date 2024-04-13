import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/const';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessToken;

    try {
      const response = await fetch(`${API_URL}api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Не удалось загрузить содержимое корзины');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (productData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessToken;

    try {
      const response = await fetch(`${API_URL}api/cart/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить товар в корзину');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductInCart = createAsyncThunk(
  'cart/updateProductInCart',
  async (productData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessToken;

    try {
      const response = await fetch(`${API_URL}api/cart/products`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить товар в корзине');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (productId, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessToken;

    try {
      const response = await fetch(`${API_URL}api/cart/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить товар из корзины');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  totalPrice: 0,
  totalCount: 0,
  loadingFetch: false,
  loadingAdd: false,
  loadingUpdate: false,
  loadingRemove: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchCart.pending, state => {
        state.error = null;
        state.loadingFetch = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loadingFetch = false;

        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingFetch = false;
      })
      .addCase(addProductToCart.pending, state => {
        state.error = null;
        state.loadingAdd = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.totalCount = action.payload.totalCount;
        state.products.push({ ...action.payload.product, quantity: action.payload.productCart.quantity });

        state.totalPrice = state.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingAdd = false;
      })
      .addCase(updateProductInCart.pending, state => {
        state.error = null;
        state.loadingUpdate = true;
      })
      .addCase(updateProductInCart.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.products = state.products.map(item => {
          if (item.id === action.payload.productCart.productId) {
            item.quantity = action.payload.productCart.quantity;
          }

          return item;
        });

        state.totalPrice = state.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
      })
      .addCase(updateProductInCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingUpdate = false;
      })
      .addCase(removeProductFromCart.pending, state => {
        state.error = null;
        state.loadingRemove = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loadingRemove = false;
        state.totalCount = action.payload.totalCount;
        state.products = state.products.filter(
          item => item.id !== action.payload.id
        );
        state.totalPrice = state.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingRemove = false;
      }),
});

export default cartSlice.reducer;
