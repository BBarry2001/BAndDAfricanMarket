import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PrivateAdminRoutes } from './PrivateAdminRoutes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../hub/Store';
import AllNotifications from '../components/feedback-ui/notifications'; 
import { LoadingProvider } from '../components/feedback-ui/contexts/loading-componenets/LoadingContext';
import './index.css';

/**
 * The Root Route file of B&D African Market, utilizing React Router for navigation management.
 * It defines the high-level routing structure, segregating public, private, and admin-specific routes.
 * 
 * Features:
 * 1. Provider Wrapper: Ensures Redux store is available throughout the application.
 * 2. PersistGate: Manages the persisted state, ensuring that the redux state is rehydrated upon app launch.
 * 3. LoadingProvider: Provides a context for managing loading states across the application.
 * 4. Router: Defines the application's routing logic, handling navigation and rendering appropriate components.
 * 5. Route Definitions: Declares routes for public, private, and admin areas, ensuring proper access control.
 * 6. AllNotifications: A global component for displaying notifications.
 * 
 * Routes:
 * - "/private/*": Protected routes accessible only to authenticated users.
 * - "/admin/*": Admin routes, restricted to users with administrative privileges.
 * - "/*": Public routes accessible to all users.
 * 
 * Notes:
 * - Keep the routing structure updated with any new pages or changes in access control policies.
 * - Ensure that the Private and Admin routes have appropriate guards to protect sensitive areas of the application.
 */

const BAndDAfricanMarket = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LoadingProvider>
          <Router >
            <AllNotifications />  
            <Routes>
              <Route path="/private/*" element={<PrivateRoutes />} />
              <Route path="/admin/*" element={<PrivateAdminRoutes />} />
              <Route path="/*" element={<PublicRoutes />} />
            </Routes>
          </Router>
      </LoadingProvider>
      </PersistGate>
  </Provider>
);
export default BAndDAfricanMarket;
