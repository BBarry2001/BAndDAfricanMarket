import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleCartOperations } from '../api/CartAPI'; 
import { logoutUser } from './AuthSlice';

// Documentation for the Cart Slice
/**
 * Cart Slice
 * 
 * Manages the shopping cart state for both authenticated and non-authenticated users.
 * It utilizes thunks to interact with the backend API for various cart operations like
 * adding, removing, updating items, and synchronizing carts on user login.
 * 
 * Thunks:
 * - mergeAndSyncCarts: Synchronizes the carts when a non-auth user logs in.
 * - addCartItem: Adds an item to the cart.
 * - deleteItemThunk: Removes an item from the cart.
 * - clearCartThunk: Clears the entire cart.
 * - updateItemQuantityThunk: Updates the quantity of a specific item in the cart.
 * 
 * State:
 * - authItems: Array of items in the authenticated user's cart.
 * - nonAuthItems: Array of items in the non-authenticated user's cart.
 * - status: String representing the current status of cart operations.
 * - error: Any error that occurs during cart operations.
 * 
 * The slice follows a pattern where thunks handle the asynchronous operations with the backend,
 * and the slice updates the state based on the responses. This separation maintains a clean and efficient
 * state management for the cart functionality.
 */

export const mergeAndSyncCarts = createAsyncThunk('cart/mergeAndSyncCarts', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { nonAuthItems } = state.cart;

  const fetchResponse = await handleCartOperations('mergeAndSyncCarts');
  if (!fetchResponse.status === 200) {
    return thunkAPI.rejectWithValue('Failed to fetch auth cart items');
  }
  const authItems = fetchResponse.data;

  // Create a map to track items by their identifier
  const itemMap = new Map(authItems.map(item => [item.product_identifier, item]));

  // Iterate over non-auth items and add them to the auth user's cart if they don't exist
  for (const nonAuthItem of nonAuthItems) {
    if (!itemMap.has(nonAuthItem.product_identifier)) {
      // Add the non-auth item to the authenticated user's cart
      const apiResult = await handleCartOperations('addItemToCart', nonAuthItem);
      if (!apiResult.status === 200 ) {
        return thunkAPI.rejectWithValue('Failed to add non-auth item to auth cart');
      }
      itemMap.set(nonAuthItem.product_identifier, {
        ...nonAuthItem,
        ...apiResult.data 
      });
    }
  }
  const updatedAuthItems = Array.from(itemMap.values());
  return updatedAuthItems;
});

export const addCartItem = createAsyncThunk('cart/addCartItem', async (item, thunkAPI) => {
  const isAuth = thunkAPI.getState().auth.isAuthenticated;
  if (isAuth) {
    try {
      const apiResult = await handleCartOperations('addItemToCart', item);
      if (apiResult.status === 200) {
        return { item: apiResult.data, isAuth };
      } else {
        return thunkAPI.rejectWithValue(apiResult.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  } else {
    return { item, isAuth };
  }
});

export const deleteItemThunk = createAsyncThunk('cart/deleteItem', async ({ product_identifier, productName, productQuantity }, thunkAPI) => {
  const isAuth = thunkAPI.getState().auth.isAuthenticated;
  if (isAuth) {
    try {
      const apiResult = await handleCartOperations('removeItemFromCart', { product_identifier }, product_identifier);
      if (apiResult.status === 200) {
        return { item: { product_identifier, product_name_removed: productName, quantity_removed: productQuantity }, isAuth };
      } else {
        return thunkAPI.rejectWithValue(apiResult.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  } else {
    return { 
      item: {
        product_identifier,
        product_name_removed: productName,
        quantity_removed: productQuantity,
        message: 'Item removed'
      },
      isAuth 
    };
  }
});

export const clearCartThunk = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  const isAuth = thunkAPI.getState().auth.isAuthenticated;
  if (isAuth) {
    try {
      await handleCartOperations('clearEntireCart');
      return { isAuth: true };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message, isAuth: true });
    }
  } else {
    return { isAuth: false };
  }
});

export const updateItemQuantityThunk = createAsyncThunk('cart/updateItemQuantity', async ({ product_identifier, quantity }, thunkAPI) => {
  const isAuth = thunkAPI.getState().auth.isAuthenticated;
  if (isAuth) {
    try {
    const apiResult = await handleCartOperations('updateItemQuantity', { product_identifier, quantity }, product_identifier);
    if (apiResult.status === 200) {
      return { product_identifier, quantity };
    } else {
      return thunkAPI.rejectWithValue(apiResult.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
} else {
  return { product_identifier, quantity };
}
});
  
const initialState = {
  authItems: [],
  nonAuthItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(updateItemQuantityThunk.fulfilled, (state, action) => {
        const { product_identifier, quantity } = action.payload;
        const itemIndex = state.authItems.findIndex((item) => item.product_identifier === product_identifier);
        if (itemIndex !== -1) {
          state.authItems[itemIndex].quantity = quantity;
        } else {
          const nonAuthItemIndex = state.nonAuthItems.findIndex((item) => item.product_identifier === product_identifier);
          if (nonAuthItemIndex !== -1) {
            state.nonAuthItems[nonAuthItemIndex].quantity = quantity;
          }
        }
      })
      .addCase(mergeAndSyncCarts.fulfilled, (state, action) => {
        state.authItems = action.payload; 
        state.nonAuthItems = []; 
      })
      .addCase(addCartItem.fulfilled, (state, action) => {

        const { item, isAuth } = action.payload;
      
        if (!item || isAuth === undefined) {
          console.error('Payload missing item or isAuth');
          return;
        }
      
        const targetList = isAuth ? state.authItems : state.nonAuthItems;
      
        if (!Array.isArray(targetList)) {
          console.error('Target list is not an array');
          return;
        }
      
        const existingItemIndex = targetList.findIndex(i => i.product_identifier === item.product_identifier);
      
        if (existingItemIndex !== -1) {
          if (isAuth) {
            targetList[existingItemIndex].quantity = item.quantity;  // Update with the new quantity for authenticated users
          } else {
            targetList[existingItemIndex].quantity += item.quantity;  // Add new quantity to existing for offline users
          }
        } else {
          // Item doesn't exist; add new item
          targetList.push(item);
        }
      
      })      
      .addCase(deleteItemThunk.fulfilled, (state, action) => {
        const { product_identifier } = action.payload.item;
    
        // Assuming that we can determine if the product was auth or not auth from the identifier
        let index = state.authItems.findIndex(item => item.product_identifier === product_identifier);
        if (index !== -1) {
          state.authItems.splice(index, 1);
        } else {
          index = state.nonAuthItems.findIndex(item => item.product_identifier === product_identifier);
          if (index !== -1) {
            state.nonAuthItems.splice(index, 1);
          }
        }
      })
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        const { isAuth } = action.payload;
        if (isAuth) {
          state.authItems = []; 
        } else {
          state.nonAuthItems = []; 
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authItems = [];
        state.nonAuthItems = [];
      })       
    },
  });
  
  export const { updateQuantity, removeItem, clearCart, setDropdownVisible } = cartSlice.actions;
  
  export default cartSlice.reducer;
  