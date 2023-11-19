import { createSlice } from '@reduxjs/toolkit';
import { addCartItem, clearCartThunk, deleteItemThunk } from '../CartSlice';  

/**
 * CartNotificationsSlice - Redux Slice
 *
 * Manages the state for cart notifications, separate from the actual cart slice.
 * Used to trigger notification messages in the CartNotifications component.
 * This separation ensures that the cart slice is solely responsible for handling
 * cart state and operations, while the CartNotificationsSlice deals with the 
 * feedback and notifications related to these actions.
 *
 * - initialState: Defines the initial state of the slice.
 * - reducers: Defines reducers for setting cart actions and clearing notifications.
 * - extraReducers: Handles additional reducers for asynchronous thunks like adding or removing cart items.
 * 
 * This approach was adopted after careful consideration to keep concerns separated
 * and maintain clear, manageable state management. If a better implementation is
 * discovered in the future, it will be considered for adoption.
 */

export const CartNotificationsSlice = createSlice({
  name: 'CartNotificationsSlice',
  initialState: {
    cartAction: null,
    cartActionStatus: null,
    cartProductName: null,
    cartProductQuantity: null,
    isLoading: false,
  },  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.pending, (state) => {
        state.cartAction = 'add';
        state.cartActionStatus = 'loading';
        state.cartProductName = null;
        state.cartProductQuantity = null; 
        state.isLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cartAction = 'add';
        state.cartActionStatus = 'success';
        state.cartProductName = action.payload.item.name; 
        state.cartProductQuantity = action.payload.item.quantity; 
        state.isLoading = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.cartAction = 'add';
        state.cartActionStatus = 'error';
        state.cartProductName = null;
        state.cartProductQuantity = null; 
        state.isLoading = false;
      })
      .addCase(deleteItemThunk.pending, (state) => {
        state.cartAction = 'remove';
        state.cartActionStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteItemThunk.fulfilled, (state, action) => {
        const { product_name_removed, quantity_removed } = action.payload.item;
        state.cartAction = 'remove';
        state.cartActionStatus = 'success';
        state.cartProductName = product_name_removed;
        state.cartProductQuantity = quantity_removed;
        state.isLoading = false;
      })     
      .addCase(deleteItemThunk.rejected, (state) => {
        state.cartAction = 'remove';
        state.cartActionStatus = 'error';
        state.cartProductName = null; 
        state.cartProductQuantity = null; 
        state.isLoading = false;
      })
      .addCase(clearCartThunk.pending, (state) => {
        state.cartAction = 'clear';
        state.cartActionStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.cartAction = 'clear';
        state.cartActionStatus = 'success';
        state.cartProductName = null;
        state.cartProductQuantity = null; 
        state.isLoading = false;
      })
      .addCase(clearCartThunk.rejected, (state) => {
        state.cartAction = 'clear';
        state.cartActionStatus = 'error';
        state.cartProductName = null;
        state.cartProductQuantity = null; 
        state.isLoading = false;
      });
      ;
  },
});

export default CartNotificationsSlice.reducer;
