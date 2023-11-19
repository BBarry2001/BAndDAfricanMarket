import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUserAPI, registerUserAPI, loginUserAPI } from "../api/AuthAPI";

/**
 * Auth Slice
 * 
 * This slice manages user authentication states within the application.
 * It utilizes thunks for asynchronous actions like logging in, logging out, and registering users.
 * The thunks interact with the backend via API calls and update the Redux state based on responses.
 * 
 * Thunks:
 * - loginUser: Handles user login. On success, updates the authentication state.
 * - logoutUser: Manages user logout. On success, resets the authentication state.
 * - registerUser: Handles new user registration. On success, updates the authentication state.
 * 
 * State:
 * - isAuthenticated: Boolean indicating if the user is currently authenticated.
 * - isAdmin: Boolean indicating if the authenticated user is an admin.
 * - first_name: String representing the authenticated user's first name.
 * - last_name: String representing the authenticated user's last name.
 * 
 * Reducers:
 * - This slice does not have custom reducers; it relies on thunks and extraReducers.
 * 
 * Extra Reducers:
 * - Fulfilled cases for loginUser, logoutUser, and registerUser to update the authentication state.
 * - Rejected cases for loginUser to handle failed login attempts.
 * 
 * The slice follows a standard pattern where thunks call API functions. These functions interact with the backend
 * and return data (or errors) to the thunks. Thunks then dispatch actions to update the Redux state based on the
 * responses. This separation of concerns ensures a clear, maintainable structure for handling user authentication.
 * 
 * Usage:
 * - Components can dispatch these thunks and subscribe to the authentication state to provide user-specific experiences.
 */

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginUserAPI({ email, password });
      if (response.status === 200) {
        return response;
      } 
    } catch (error) {
      const status = error.status || null; 
      return thunkAPI.rejectWithValue({ message: "Login failed", status });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const result = await logoutUserAPI();
      
      if (result.status === 204) {
        return result.status;
      } else {
        return thunkAPI.rejectWithValue(result.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await registerUserAPI(userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ 
        message: error.message, 
        status: error.status 
      });
    }
  }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isAdmin: false,
        first_name: '',
        last_name: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
          const { data } = action.payload; 
        
          const { is_admin, first_name, last_name } = data;
        
          state.isAuthenticated = true;  
          state.isAdmin = is_admin;
          state.first_name = first_name;
          state.last_name = last_name;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isAuthenticated = false;
          state.isAdmin = false;
          state.first_name = '';
          state.last_name = '';
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          const { first_name, last_name} = action.payload;
          state.isAuthenticated =true
          state.first_name = first_name;
          state.last_name = last_name;
        })
      },
    });

export default authSlice.reducer;
