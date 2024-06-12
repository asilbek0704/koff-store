import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/const';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    const response = await fetch(`${API_URL}api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if(response.status == 401) {
        return thunkAPI.rejectWithValue({
          status: response.status,
          error: 'Не удалось загрузить товар'
        })
      }
      
      throw new Error('Не удалось загрузить товар');
    }

    return response.json();
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
});


export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
