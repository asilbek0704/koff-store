import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/const';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    const response = await fetch(`${API_URL}api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Не удалось загрузить товары');
    }

    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
});

export default productsSlice.reducer;
