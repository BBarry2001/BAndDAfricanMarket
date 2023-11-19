import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminUserActionsAPI } from '../api/AdminAPI';
import { adminOnlyPagesAuthCheckAPI } from "../api/AdminAPI";

/**
 * 
 *  * Admin Slice
 * 
 * This slice manages the state related to administrative actions and data in the application.
 * It includes user management actions like fetching, locking/unlocking, deleting, and editing users.
 * The slice also handles pagination, search queries, and filter settings for the admin user interface.
 * 
 * This file also contains thunks for the Admin slice, responsible for various administrative actions.
 * Each thunk interacts with the backend API using adminUserActionsAPI and adminOnlyPagesAuthCheckAPI
 * and updates the Redux slice based on the API response.
 * 
 * State:
 * - darkMode: Boolean indicating if dark mode is enabled.
 * - users: Array of user objects fetched from the backend.
 * - filters: Object representing current filter settings.
 * - searchQuery: String representing the current search query.
 * - pagination: Object managing the current pagination settings.
 * 
 * Reducers:
 * - toggleDarkMode: Toggles the dark mode setting.
 * - setFilters: Updates the filter settings and resets pagination.
 * - setSearchQuery: Updates the search query and resets pagination.
 * - setCurrentPage: Updates the current page in pagination.
 * 
 * Extra Reducers:
 * - fetchUsers: Handles the state update after fetching users.
 * - lockUserAccount: Updates the state of a specific user to reflect account lock.
 * - unlockUserAccount: Updates the state of a specific user to reflect account unlock.
 * - deleteUser: Removes a user from the state upon successful deletion.
 * - editUserDetails: Updates a specific user's details in the state.
 * 
 * The thunks are structured to handle different admin actions like fetching users,
 * changing user passwords, locking/unlocking accounts, etc.
 * The sole responsibility of the API functions is to communicate with the backend and return the response.
 * The thunks then take this response and use it to update the Redux state or handle errors.
 * 
 * Thunks:
 * - adminOnlyPagesAuthCheckThunk: Checks if the user is an admin for accessing admin-only pages.
 * - fetchUsers: Fetches a list of users based on provided filters and pagination.
 * - fetchAllUsers: Fetches all users without pagination.
 * - changeUserPassword: Changes the password of a specified user.
 * - lockUserAccount: Locks a specified user's account.
 * - unlockUserAccount: Unlocks a specified user's account.
 * - deleteUser: Deletes a specified user.
 * - editUserDetails: Edits details of a specified user.
 * - performBulkActions: Performs bulk actions (like delete, lock, unlock) on multiple users.
 * 
 * Each thunk is responsible for dispatching async operations and handling the state updates
 * or error handling based on the operation's outcome.
 */

export const adminOnlyPagesAuthCheckThunk = createAsyncThunk(
    'auth/checkAuthentication',
    async (_, thunkAPI) => {
      try {
        const response = await adminOnlyPagesAuthCheckAPI();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async ({ page, filters }, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          endpoint: '',
          method: 'GET',
          params: { ...filters, page },
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (queryParams, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          endpoint: 'fetch_all_',
          method: 'GET',
          params: queryParams,
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const changeUserPassword = createAsyncThunk(
    'admin/changeUserPassword',
    async ({ userId, currentPassword, newPassword, adminWord }, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          identifier: userId,
          action: 'change_password',
          method: 'POST',
          data: { current_password: currentPassword, new_password: newPassword, admin_word: adminWord },
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const lockUserAccount = createAsyncThunk(
    'admin/lockUserAccount',
    async ({ id, adminWord }, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          identifier: id,
          action: 'lock_account',
          method: 'POST',
          data: { adminWord },
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const unlockUserAccount = createAsyncThunk(
    'admin/unlockUserAccount',
    async (userId, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          identifier: userId,
          action: 'unlock_account',
          method: 'POST',
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async ({ id, adminWord }, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          identifier: id,
          adminWord: adminWord,
          action: '',
          method: 'DELETE',
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const editUserDetails = createAsyncThunk(
    'admin/editUserDetails',
    async ({ userID, userDetails }, thunkAPI) => {
      try {
        const responseData = await adminUserActionsAPI({
          identifier: userID,
          action: 'edit_user',
          method: 'PATCH',
          data: userDetails,
        });
        return responseData;
      } catch (error) {
        return thunkAPI.rejectWithValue(error); // Reject with the error object
      }
    }
  );
  
  export const performBulkActions = createAsyncThunk(
    'admin/performBulkActions',
    async ({ userIds, actionType }, thunkAPI) => {
      try {
        const response = await adminUserActionsAPI({
          endpoint: 'bulk_actions',
          method: 'POST',
          data: { user_ids: userIds, action: actionType },
        });
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

const initialState = {
    darkMode: false,
    users: [],
    filters: {},
    searchQuery: '',
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
    },
  };
  
  const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      toggleDarkMode: (state) => {
        state.darkMode = !state.darkMode;
      },
      setFilters: (state, action) => {
        state.filters = action.payload;
        state.pagination.currentPage = 1; 
      },
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
        state.pagination.currentPage = 1; 
      },
      setCurrentPage: (state, action) => {
        state.pagination.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.results;
            state.pagination.totalItems = action.payload.count; 
          })

      .addCase(lockUserAccount.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      })
      .addCase(unlockUserAccount.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.meta.arg.id;
        state.users = state.users.filter(user => user.id !== userId);
        state.pagination.totalItems -= 1;
      })
      .addCase(editUserDetails.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      });
  },
});
  
export const { toggleDarkMode, setFilter, setFilters, setSearchQuery, setCurrentPage } = adminSlice.actions;

export const selectDarkMode = (state) => state.admin.darkMode;
export const selectUsers = (state) => state.admin.users;
export const selectFilter = (state) => state.admin.filters;
export const selectSearchQuery = (state) => state.admin.searchQuery;
export const selectPagination = (state) => state.admin.pagination;

export default adminSlice.reducer;
