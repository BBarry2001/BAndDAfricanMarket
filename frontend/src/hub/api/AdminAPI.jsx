import { makeApiCall } from '../../utils/axios';  

/**
 * Performs a check to verify if the current user has admin privileges.
 * This API function is used to ensure that only authorized admin users can access certain pages.
 * It sends a POST request to the backend and expects a response indicating the user's admin status.
 *
 * Returns:
 * - Object containing data and status if the check is successful.
 * - Throws an error with the status code if the check fails or token validation fails.
 */

  export const adminOnlyPagesAuthCheckAPI = async () => {
    const result = await makeApiCall('post', process.env.REACT_APP_ADMIN_ONLY_PAGES_AUTH_CHECK_ENDPOINT, {}, {
      withCredentials: true,
    });
  
    if (result && result.responseStatus === 200) {
      return { data: result.responseData, status: result.responseStatus };
    } else {
      const err = new Error("Admin check failed or token validation failed");
      err.status = result?.httpErrorCode;
      throw err;
    }
  };

  /**
 * Facilitates various admin actions on user accounts.
 * This function makes API calls for different admin actions such as updating or deleting user accounts.
 * It builds the request URL dynamically based on the provided parameters and sends the appropriate request to the backend.
 *
 * Parameters:
 * - endpoint: The specific endpoint to hit. Default is an empty string.
 * - identifier: Unique identifier of the user. Default is an empty string.
 * - action: The specific action to be performed. Default is an empty string.
 * - method: The HTTP method to be used (GET, POST, PATCH, DELETE). Default is 'GET'.
 * - data: Payload for POST, PATCH, DELETE requests. Default is an empty object.
 * - params: Query parameters for the request. Default is an empty object.
 *
 * Returns:
 * - The response data from the API call if successful.
 * - Throws an error with the error details and HTTP error code if the request fails.
 */

  export const adminUserActionsAPI = async ({ endpoint = '', identifier = '', action = '', method = 'GET', data = {}, params = {} }) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const userBasePath = process.env.REACT_APP_ADMIN_USERS_BASE_PATH;
  
    let url = apiBaseUrl + userBasePath;
    if (method === 'DELETE' && identifier) {
      url += `${identifier}/`;
    } else if (identifier && action) {
      url += `${identifier}/${action}/`;
    } else {
      url += endpoint ? `${endpoint}/` : '';
    }
  
    const options = {
      method: method,
        params: params,
    };

    if (['POST', 'PATCH', 'DELETE'].includes(method)) {
      options.body = JSON.stringify(data);
    }

    const { responseData, responseStatus, errorData, httpErrorCode } = await makeApiCall(method, url, data, options);
    if (responseStatus >= 200 && responseStatus < 300) {
      return responseData;
    } else {
      console.error(`Error with the request to ${url}:`, errorData);
      throw { error: errorData, httpErrorCode }; 
    }
  };
