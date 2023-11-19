// Importing necessary Redux and Redux Persist libraries
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';

// Importing reducer slices
import authReducer from './slices/AuthSlice';
import adminReducer from './slices/AdminSlice';
import productReducer from './slices/ProductSlice';
import cartReducer from './slices/CartSlice';
import cartNotificationsReducer from './slices/notifications/CartNotificationsSlice';

// Documentation for the Redux Store
/**
 * Redux Store Configuration
 * 
 * The store combines various slices for state management:
 * - Auth: Manages authentication-related state.
 * - Admin: Handles state for administrative actions.
 * - Products: Manages product-related data.
 * - Cart: Handles the shopping cart state.
 * - CartNotifications: Manages notifications related to cart actions.
 * 
 * The store is configured with Redux Persist for state persistence across sessions,
 * using localForage as the storage mechanism.
 * 
 * The 'persistConfig' object defines which slices to persist (auth, cart, products) as of now
 * and specifies the storage mechanism.
 * 
 * Middleware configuration includes serializable checks to ignore specific actions
 * from Redux Persist.
 */

// Combining reducers from different slices
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  products: productReducer,
  cart: cartReducer,
  CartNotifications: cartNotificationsReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['auth', 'cart', 'products'], // Slices to persist
};

// Applying persist configuration to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

// Creating a persistor for the store
export const persistor = persistStore(store);
