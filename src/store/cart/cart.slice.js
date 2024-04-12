import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/const';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessToken;

    try {
      const response = await fetch(`${API_URL}/api/cart`, {
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
      const response = await fetch(`${API_URL}/api/cart/products`, {
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
        state.error = null;

        state.loadingFetch = false;

        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingFetch = false;
      })
      .addCase(addProductToCart.pending, state => {
        state.error = null;
        state.loadingAdd = true;
      })
      .addCase(addProductToCart.fulfilled, (state) => {
        state.error = null;
        state.loadingAdd = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingAdd = false;
      })
});

export default cartSlice.reducer;
