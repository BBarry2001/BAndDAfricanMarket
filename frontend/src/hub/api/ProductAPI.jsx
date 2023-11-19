import { makeApiCall } from '../../utils/axios';  

/**
 * API function to handle various product-related operations.
 * Depending on the parameters, it can fetch, create, update, or delete products.
 *
 * Parameters:
 * - endpoint: String specifying the API endpoint (e.g., 'products', 'categories').
 * - action: String representing the desired operation ('create', 'update', 'delete', 'star_eight', etc.).
 * - pk: (Optional) The primary key of a specific product, if applicable.
 * - data: (Optional) Payload for POST, PUT, DELETE operations or query parameters for GET requests.
 *
 * Returns:
 * - Object containing status code and response data if the request is successful.
 * - Throws an error with status code and message if the request fails.
 *
 * Note:
 * - This function uses `makeApiCall` utility to send HTTP requests to the backend. You can see its
 * documention in its own file (an index file under the "axios" directory in the util directory).
 * - The function's behavior changes based on the provided 'action' and 'pk' parameters. Currently 
 * implementing.
 */

export const ProductsAPI = async ({ endpoint, action, pk, data }) => {
  let url = `${process.env.REACT_APP_PRODUCTS_ENDPOINT}/${endpoint}/`;
  let method = 'GET';

  if (method === 'GET' && data) {
    const queryParams = new URLSearchParams(data).toString();
    url += `?${queryParams}`;
  }

  if (pk) {
    url += `${pk}/`;
  }

  if (action === 'create') {
    method = 'POST';
  } else if (action === 'update') {
    method = 'PUT';
  } else if (action === 'delete') {
    method = 'DELETE';
  } else if (action === 'star_eight') {
    url += 'star_eight/';  
  }

  const result = await makeApiCall(method, url, data, {
    withCredentials: true,
  });
  

  if (result && result.responseStatus === 200) {
    console.log("the entire products are: ", result.responseData)
    return { status: result.responseStatus, data: result.responseData };
  } else if (result && result.httpErrorCode) {
    // This is an error case; throw an error to be handled by the calling code
    const errorMessage = result.error || 'Something went wrong';
    const errorStatus = result.httpErrorCode;
    throw { message: errorMessage, status: errorStatus };
  } else {
    // This is a case where makeApiCall returned a non-standard object, possibly due to the circuit breaker logic
    throw { message: 'An unknown error occurred', status: 500 };
  }
};
