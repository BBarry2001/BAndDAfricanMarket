import {  useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/AuthSlice';

/**
 * AdminUserInactivityLogout Hook for B&D African Market.
 * Purpose: To manage automatic logout due to user inactivity within the Admin section of the application.
 *
 * Functionality:
 * - Monitors user activity and triggers a logout if the user is inactive for a specified duration.
 * - Displays a confirmation modal before logging out due to inactivity.
 * - Uses environment variables for inactivity and modal wait times.
 *
 * Logic:
 * - On detecting user inactivity for a defined period (specified in the environment variable), a modal is shown to confirm user presence.
 * - If the user confirms activity, the modal is dismissed, and the inactivity timer is reset.
 * - If the user does not respond within the modal's wait time, automatic logout is initiated.
 * - Logout redirects the user to the login page.
 *
 * Implementation:
 * - Utilizes `useEffect` to set up and clean up timers and event listeners for user activity detection.
 * - `Modal` from Ant Design library is used to prompt the user before logout.
 * - React Router's `useNavigate` and `useLocation` are used for navigation and location context.
 * - Uses React's `useRef` to manage references to modal and timers.
 * - Redux's `useDispatch` to dispatch the logout action.
 *
 * Environment Variables:
 * - REACT_APP_INACTIVITY_TIME_SECONDS: Time in seconds before showing the inactivity modal.
 * - REACT_APP_MODAL_WAIT_TIME_SECONDS: Time in seconds before auto-logout if the modal is not interacted with.
 *
 * Notes:
 * - Ensure that the environment variables are set correctly in various environments (development, staging, production).
 * - The functionality is dependent on user events like mouse movement, keypress, and clicks to reset the inactivity timer.
 */

const AdminUserInactivityLogout = () => {
  // Access environment variables with fallbacks for development
  const inactivityTime = process.env.REACT_APP_INACTIVITY_TIME_SECONDS ;
  const modalWaitTime = process.env.REACT_APP_MODAL_WAIT_TIME_SECONDS;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const confirmModalRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const modalTimerRef = useRef(null);

  useEffect(() => {
    const handleLogout = () => {
      // If the logout function is called, clear the modal
      if (confirmModalRef.current) {
        confirmModalRef.current.destroy();
        confirmModalRef.current = null;
      }
      dispatch(logoutUser());
      navigate('/login', { replace: true });
    };

    const showModal = () => {
      if (!confirmModalRef.current) {
        confirmModalRef.current = Modal.confirm({
          title: 'Are you still there?',
          content: 'You will be logged out after 2 minutes of inactivity.',
          okText: 'Yes, I’m here',
          cancelText: 'Logout',
          onOk() {
            // User confirms they are here, clear the modal and reset the timer
            confirmModalRef.current.destroy();
            confirmModalRef.current = null;
            clearTimeout(modalTimerRef.current);
            // Reschedule the inactivity timer
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = setTimeout(showModal, inactivityTime * 1000);
          },
          onCancel() {
            // User chooses to logout
            handleLogout();
          }
        });

        // Set a timer for the modal wait time
        modalTimerRef.current = setTimeout(() => {
          // Auto logout if modal is still active after modalWaitTime
          if (confirmModalRef.current) {
            confirmModalRef.current.destroy();
            confirmModalRef.current = null;
            handleLogout();
          }
        }, modalWaitTime * 1000);
      }
    };

    // Start the inactivity timer
    inactivityTimerRef.current = setTimeout(showModal, inactivityTime * 1000);

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(showModal, inactivityTime * 1000);
    };

    // Event listeners to detect user activity and reset the inactivity timer
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keypress', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);

    // Cleanup function
    return () => {
      // Destroy the modal explicitly if it exists
      if (confirmModalRef.current) {
        confirmModalRef.current.destroy();
        confirmModalRef.current = null;
      }
      // Clear all timers
      clearTimeout(inactivityTimerRef.current);
      clearTimeout(modalTimerRef.current);
      // Remove event listeners
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [dispatch, navigate, inactivityTime, modalWaitTime, location.pathname]);

  //   don't return anything as the hook doesn't provide output to the component
};

export default AdminUserInactivityLogout;
