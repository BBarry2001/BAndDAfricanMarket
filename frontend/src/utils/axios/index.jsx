import axios from 'axios';
import { circuitBreaker, shouldAttemptRetry } from './circuitBreaker';
import { getCancelToken } from './cancelToken';

/**
 * A generic function to make API calls using axios, used application wide.
 * It implements a circuit breaker pattern to prevent repeated failed calls.
 * This function is used to send HTTP requests and handle responses or errors.
 *
 * Parameters:
 * - method: The HTTP method for the request (e.g., 'GET', 'POST').
 * - url: The endpoint URL for the request.
 * - data: Payload for the request. Default is an empty object.
 * - options: Additional axios configuration options. Default is an empty object.
 *
 * Returns:
 * - An object containing responseData and responseStatus if the request is successful.
 * - An object containing errorData and httpErrorCode if the request fails.
 */

export const makeApiCall = async (method, url, data = {}, options = {}) => {
  if (!shouldAttemptRetry()) {
    return { success: false, code: 'CIRCUIT_OPEN', message: 'Circuit is open. No calls are allowed.' };
  }
  
  const cancelTokenSource = getCancelToken();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials:true,
    ...options,
    cancelToken: cancelTokenSource.token
  });

  try {
    const response = await circuitBreaker(() => axiosInstance({
      method,
      url,
      data
    }));

    return { responseData: response.data, responseStatus: response.status };
  } catch (error) {
    return { errorData: error.response?.data, httpErrorCode: error.response?.status };
  }
};
