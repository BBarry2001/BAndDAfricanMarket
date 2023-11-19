import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsAPI } from '../api/ProductAPI';

// Documentation for the Products Slice
/**
 * Products Slice
 * 
 * Manages state related to products, categories, and special product selections.
 * Utilizes thunks to asynchronously fetch data from the backend API.
 * 
 * Thunks:
 * - fetchProducts: Fetches a list of products with optional filters, sorting, and pagination.
 * - fetchCategories: Retrieves all product categories.
 * - fetchStarEightProducts: Fetches a special selection of star-rated products.
 * 
 * State:
 * - products: Array of product objects.
 * - totalCount: Total number of products fetched.
 * - starEight: Array of star-rated products.
 * - categories: Array of product categories.
 * 
 * The slice follows a pattern where thunks handle the asynchronous fetching of data,
 * and the slice updates the state based on the responses from the API.
 */


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, filters, sort }) => {
    const response = await ProductsAPI({
      endpoint: 'products_viewsets',
      action: 'list',
      page,
      data: filters, 
      sort
    });
    console.log("fetchProducts response data:", response.data);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await ProductsAPI({ endpoint: 'categories' });
    return response.data;
  }
);

export const fetchStarEightProducts = createAsyncThunk(
  'products/fetchStarEightProducts',
  async () => {
    const response = await ProductsAPI({ endpoint: 'products_viewsets', action: 'star_eight' });
    return response.data;
  }
);

const initialState = {
  products: [],
  totalCount: 0,
  starEight: [],
  categories: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.results;
      state.totalCount = action.payload.count; 
    })
    .addCase(fetchStarEightProducts.fulfilled, (state, action) => {
      state.starEight = action.payload;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
  },
});

export default productSlice.reducer;
