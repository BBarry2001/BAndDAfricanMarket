import { makeApiCall } from '../../utils/axios'; 

/**
 * API function to handle various cart operations like adding, removing items, etc.
 * Sends appropriate HTTP requests based on the operation type to the backend and processes the response.
 *
 * Parameters:
 * - operation: String representing the cart operation type (e.g., 'addItemToCart', 'removeItemFromCart').
 * - data: Payload for the request. Required for operations like adding an item.
 * - id: The unique identifier of the cart item. Required for operations like removing an item. It is 
 * used as a pk (Primary key) for the backend view.
 *
 * Returns:
 * - Object containing status code and response data if the operation is successful.
 * - Throws an error with status code and message if the operation fails.
 */

export const handleCartOperations = async (operation, data, id) => {
  let url;
  let method = 'get';
  
  switch (operation) {
    case 'addItemToCart':
      method = 'post';
      url = process.env.REACT_APP_CART_ADD_ITEM_ENDPOINT;
      break;
    case 'removeItemFromCart':
      method = 'delete';
      url = process.env.REACT_APP_CART_REMOVE_ITEM_ENDPOINT.replace(':id', id.toString());
      break;
    case 'clearEntireCart':
      method = 'delete';
      url = process.env.REACT_APP_CART_CLEAR_ENDPOINT;
      break;
    case 'mergeAndSyncCarts':
      method = 'get';
      url = process.env.REACT_APP_CART_MERGE_SYNC_ENDPOINT;
      break;
    case 'updateItemQuantity':
      method = 'patch';
      url = process.env.REACT_APP_CART_UPDATE_QUANTITY_ENDPOINT.replace(':id', id.toString());
      break;
    default:
      throw new Error(`Unsupported cart operation: ${operation}`);
  }

  const result = await makeApiCall(method, url, data, {
    withCredentials: true,
  });

  if (result && result.responseStatus === 200) {
    return { status: result.responseStatus, data: result.responseData };
  } else if (result && result.httpErrorCode) {
    const errorMessage = result.errorData?.error || 'Something went wrong';
    const errorStatus = result.httpErrorCode;
    throw { message: errorMessage, status: errorStatus };
  } else {
    throw { message: 'An unknown error occurred', status: 500 };
  }

};
