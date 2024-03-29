import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../helpers/const';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    const response = await fetch(`${API_URL}api/productCategories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status == 401) {
        return thunkAPI.rejectWithValue({
          status: response.status,
          error: 'Не удалось получить каталог',
        });
      }

      throw new Error('Не удалось получить каталог');
    }

    return response.json();
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
