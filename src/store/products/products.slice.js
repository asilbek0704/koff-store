import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/const';

const initialState = {
  data: [],
  loading: false,
  error: null,
  pagination: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (param, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    const queryParams = new URLSearchParams();

    if (param) {
      for (const key in param) {
        if (Object.hasOwnProperty.call(param, key) && param[key]) {
          queryParams.append(key, param[key]);
        }
      }
    }



    const response = await fetch(`${API_URL}api/products?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status == 401) {
        return thunkAPI.rejectWithValue({
          status: response.status,
          error: 'Не удалось загрузить товары',
        });
      }

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
        state.pagination = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if(Array.isArray(action.payload)){
          state.data = action.payload;
        } else {
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
        
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.pagination = null;
      }),
});

export default productsSlice.reducer;
