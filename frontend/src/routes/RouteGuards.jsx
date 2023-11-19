import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminOnlyPagesAuthCheckThunk } from '../hub/slices/AdminSlice';
import { useAuthInfo } from '../hub/hooks/hooks';
import NotFoundPage from '../components/feedback-ui/NotFound404'; 
import { useLoading } from '../components/feedback-ui/contexts/loading-componenets/LoadingContext'; 

/**
 * Route Guards for B&D African Market.
 * Implements guards for authentication and role-based access within the application.
 * 
 * AuthGuard:
 * - Purpose: To protect routes that should only be accessible to unauthenticated users.
 * - Logic: If the user is authenticated, redirect to the home page, otherwise render the intended route.
 * 
 * RoleGuard:
 * - Purpose: To protect admin routes, ensuring only authenticated and authorized admin users can access them.
 * - Logic: Verifies the user's admin status using the 'adminOnlyPagesAuthCheckThunk' from the admin slice.
 *          Redirects non-authenticated users to the login page, and displays a 404 error if the user is not an admin.
 * - Usage: Wrap around any admin component/route to restrict access.
 * 
 * Implementation:
 * - Utilizes hooks such as 'useAuthInfo' for authentication status and role checking.
 * - Employs 'useLoading' from the loading context to manage loading states during the admin check.
 * 
 * Usage:
 * - 'AuthGuard' can be used to protect routes meant for unauthenticated users, like login or registration pages.
 * - 'RoleGuard' should be used to protect admin routes or components.
 * 
 * Notes:
 * - Ensure that the authentication logic and admin check are up-to-date with the application's authentication flow.
 * - Regularly review and update guards to align with any changes in the application's routing and authentication strategy.
 */

export const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuthInfo();
  
  if (!isAuthenticated) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export const RoleGuard = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuthInfo();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();
  const [isAdminConfirmed, setIsAdminConfirmed] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (isAuthenticated && isAdmin) {
      showLoading();
      dispatch(adminOnlyPagesAuthCheckThunk())
        .unwrap()
        .then(() => {
          if (isActive) {
            setIsAdminConfirmed(true);
          }
        })
        .catch(() => {
          if (isActive) {
            setIsAdminConfirmed(false);
          }
        })
        .finally(() => {
          if (isActive) {
            hideLoading();
          }
        });
    }

    return () => {
      isActive = false;
    };
  }, [dispatch]);

  if (!isAuthenticated || !isAdmin) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Wait until the admin check is complete
  if (!isAdminConfirmed) {
    return null;
  }

  // If the admin check is complete and confirmed, render the children components
  return isAdminConfirmed ? children : <NotFoundPage />;
};
