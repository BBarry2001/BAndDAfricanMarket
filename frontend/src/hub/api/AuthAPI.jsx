import { makeApiCall } from '../../utils/axios'; 

/**
 * API function to handle user login.
 * Sends a POST request with user credentials to the backend and processes the response.
 *
 * Parameters:
 * - credentials: Object containing user login credentials.
 *
 * Returns:
 * - Object containing user data and status code if login is successful.
 * - Throws an error with status code if login fails.
 */

export const loginUserAPI = async (credentials) => {
  const result = await makeApiCall('post', process.env.REACT_APP_LOGIN_ENDPOINT, credentials, {
    withCredentials: true,
  });

  if (result && result.responseStatus === 200) {
    return { data: result.responseData, status: result.responseStatus };
  
  } else {
    const err = new Error("Login failed");
    err.status = result?.httpErrorCode;
    throw err;
  }
};

/**
 * API function to handle user logout.
 * Sends a POST request to the backend to terminate the user's session.
 *
 * Returns:
 * - Object containing status code of the logout operation.
 * - Throws an error with status code if logout fails.
 */

export const logoutUserAPI = async () => {
  const result = await makeApiCall('post', process.env.REACT_APP_LOGOUT_ENDPOINT, {}, {
    withCredentials: true,
  });
  
  if ( result && result.responseStatus === 204) {
    return { status: result.responseStatus };
  } else {
    const err = new Error("Logout failed");
    err.status = result?.httpErrorCode;
    throw err;
  }
};

/**
 * API function to handle new user registration.
 * Sends a POST request with the user's data to the backend and processes the response.
 *
 * Parameters:
 * - userData: Object containing new user's data for registration.
 *
 * Returns:
 * - Object containing registered user data and status code if registration is successful.
 * - Throws an error with status code and message if registration fails.
 */

export const registerUserAPI = async (userData) => {
  const response = await makeApiCall('post', process.env.REACT_APP_REGISTER_ENDPOINT, userData, {
    withCredentials: true,
  });

  // Check if the makeApiCall returned a successful response
  if (response && response.responseStatus === 201) {

    return { data: response.responseData, status: response.responseStatus };
  } else {
    // makeApiCall did not throw, but returned an error object
    const errorStatus = response?.httpErrorCode;
    const errorMessage = response?.errorData?.detail || "Registration failed";
    throw { message: errorMessage, status: errorStatus };
    }
};
