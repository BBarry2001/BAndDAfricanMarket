import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';

/**
 * CartNotifications Component
 * 
 * Displays notification messages based on cart actions and their status.
 * Utilizes Ant Design's `message` module for displaying feedback.
 *
 * Hooks:
 * - useEffect: Observes changes in cart actions and their status to display appropriate notifications.
 * - useSelector: Accesses Redux store state for cart notifications data.
 */
const CartNotifications = () => {
  // Retrieves cart notifications state from Redux store
  const { cartAction, cartActionStatus, cartProductName, cartProductQuantity } = useSelector((state) => state.CartNotifications);

  useEffect(() => {
    let displayMessage;

    // Determining the message to display based on cart action and its status
    switch (cartActionStatus) {
      case 'loading':
        message.loading('Loading...', 0);
        break;
      case 'success':
        message.destroy(); // Clear any existing messages
        if(cartAction === 'add') {
          displayMessage = `${cartProductQuantity} ${cartProductName} added to cart`;
        } else if(cartAction === 'remove') {
          displayMessage = `${cartProductQuantity} ${cartProductName} removed from cart`;
        } else if(cartAction === 'clear') {
          displayMessage = 'Cart cleared';
        }
        message.success(displayMessage, 2);
        break;
      case 'error':
        message.destroy(); // Clear any existing messages
        if(cartAction === 'add') {
          displayMessage = "Couldn't add the item to the cart. Please try again.";
        } else if(cartAction === 'remove') {
          displayMessage = "Couldn't remove the item from the cart. Please try again.";
        } else if(cartAction === 'clear') {
          displayMessage = "Couldn't clear the cart. Please try again.";
        }
        message.error(displayMessage, 3);
        break;
      default:
        break;
    }
  }, [cartAction, cartActionStatus, cartProductName, cartProductQuantity]);

  // Component renders null when no cart action is present
  if (!cartAction) {
    return null;
  }
};

export default CartNotifications;
