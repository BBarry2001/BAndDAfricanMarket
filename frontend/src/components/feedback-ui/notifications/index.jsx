import { useSelector } from 'react-redux';
import CartNotifications from './CartNotifications';

/**
 * AllNotifications Component
 *
 * Centralizes and manages the rendering of notification components across the application.
 * This component is essential for ensuring that notifications are properly displayed
 * in the application's UI. It acts as a single point of inclusion for all notification
 * components and is used at the root level in the application's route file.
 *
 * - The component selectively renders notification components based on the current state.
 * - It currently supports CartNotifications.
 * 
 * This setup was carefully designed to provide a consistent and efficient way to handle
 * notifications throughout the application. It resolves a significant challenge faced earlier
 * in the development process concerning the effective display of notifications. 
 * If a better implementation is discovered later, i will make the change
 */

const AllNotifications = () => {
  const { cartAction} = useSelector((state) => state.CartNotifications);

  return (
    <>
      {cartAction && <CartNotifications />}
    </>
  );
};

export default AllNotifications;
