import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

/**
 * Custom Hook: useAuthInfo
 * 
 * This hook provides convenient access to authentication-related information from the Redux state.
 * It returns an object containing the user's display name, raw name, authentication status, and admin status.
 * 
 * - displayName: A formatted string combining the user's first name and initial of the last name. If it exceeds 15 characters, it's truncated with an ellipsis. Mainly used for displaying the user's name in the Navigation bar
 * - rawName: A string concatenating the first name and the initial of the last name.
 * - isAuthenticated: Boolean value indicating if the user is authenticated.
 * - isAdmin: Boolean value indicating if the user is an admin.
 * 
 * The hook relies on the Redux state, specifically the 'auth' slice.
 */
export const useAuthInfo = () => {
    const firstName = useSelector((state) => state.auth.first_name) || "";
    const lastName = useSelector((state) => state.auth.last_name);
    const rawName = `${firstName} ${lastName ? lastName[0] + '.' : ''}`.trim();
    const displayName = rawName.length > 15 ? `${rawName.substring(0, 15)}...` : rawName;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.isAdmin);
  
    return { firstName, lastName, displayName, rawName, isAuthenticated, isAdmin };
  };


/**
 * Custom Hook: useWindowSize
 * 
 * This hook is designed to provide real-time information about the browser window's dimensions.
 * It listens for window resize events and updates the state accordingly.
 * 
 * Returns an object containing:
 * - width: The current width of the window.
 * - height: The current height of the window.
 * 
 * It's particularly useful for responsive design implementations where component rendering or behavior might depend on window size.
 */

  export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowSize;
  };
  