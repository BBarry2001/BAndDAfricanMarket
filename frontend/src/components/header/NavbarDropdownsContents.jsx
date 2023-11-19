// External libraries
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, InputNumber, Popconfirm, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import styles from './NavbarDropdownsContents.module.css';
import { useAuthInfo } from '../../hub/hooks/hooks';
import { logoutUser } from '../../hub/slices/AuthSlice';
import { updateItemQuantityThunk, deleteItemThunk, clearCartThunk } from '../../hub/slices/CartSlice';


export function CartDropdown() {
  const dispatch = useDispatch();
  
  // Redux state variables
  const authItems = useSelector(state => state.cart.authItems);
  const nonAuthItems = useSelector(state => state.cart.nonAuthItems);

  // Custom hooks
  const { isAuthenticated } = useAuthInfo();

  // Local variables
  const productsFromRedux = [...authItems, ...nonAuthItems];
  const total = productsFromRedux.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0).toFixed(2);
  
  // Handle changing quantity of an item
  const handleChangeQuantity = (quantity, product) => {
    dispatch(updateItemQuantityThunk({ product_identifier: product.product_identifier, quantity }));
  };
  
  // Handle clearing the entire cart
  const handleClearCart = async () => {
    dispatch(clearCartThunk());
  };
  
  // Handle deleting a specific item
  const handleDeleteItem = (event, product) => {
    event.stopPropagation();
    dispatch(deleteItemThunk({
      product_identifier: product.product_identifier,
      productName: product.name,
      productQuantity: product.quantity
    }));
  };
  
  
  // Handle checkout logic
  const handleCheckout = () => {
    if (productsFromRedux.length === 0) {
    }
  };

  return (
    <Menu className={styles.menu}>
      {productsFromRedux.length === 0 ? (
        <Empty description="Your cart is empty" />
      ) : (
        <>
          <Menu.Item key="0" className={styles.cartHeader} >
            <div className={styles.shoppingCartTotal}>
              <span className={styles.lighterText}>Total:</span>
              <span className={styles.mainColorText}>${total}</span>
              <Button type="danger" onClick={handleClearCart} className={styles.clearButton}>
                Clear All
              </Button>
            </div>
          </Menu.Item>
          {productsFromRedux.map((product, index) => (
            <Menu.Item key={index + 1} className={styles.cartItem}>
              <div className={styles.itemWrapper}>
                <img className={styles.cartImage} src={product.image} alt={product.name} />
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{product.name}</span>
                  <span className={styles.itemPrice}>
                    ${parseFloat(product.price).toFixed(2)} (Total: ${(parseFloat(product.price) * product.quantity).toFixed(2)})
                  </span>
                  <div className={styles.itemQuantity}>
                    <span>Quantity: </span>
                    <InputNumber
                      min={1}
                      value={product.quantity}  
                      onChange={(value) => handleChangeQuantity(value, product)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Popconfirm 
                      title="Are you sure?" 
                      onConfirm={(event) => handleDeleteItem(event, product)} 
                      onCancel={(e) => e.stopPropagation()}
                    >
                      <DeleteOutlined className={styles.deleteIcon} />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item key="4" className={styles.checkoutButtonContainer}>
            <Button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export function ProfileDropdown({ setProfileDropdownVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useAuthInfo();


  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser());
      
      if (result.payload === 200) {
        setProfileDropdownVisible(false);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu className={styles.profileMenu}>
      {isAdmin && (
        <Menu.Item key="admin" className={styles.profileItem}>
            <Link to="/admin/">
                <i className="fa fa-shield"></i> Admin Page
            </Link>
        </Menu.Item>
      )}
      <Menu.Item key="profile" className={styles.profileItem}>
        <Link to="/private/account">
            <i className="fa fa-user"></i> Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="orders" className={styles.profileItem}>
          <i className="fa fa-list"></i> Order History
      </Menu.Item>
      <Menu.Item key="settings" className={styles.profileItem}>
          <i className="fa fa-cog"></i> Settings
      </Menu.Item>
      <Menu.Item key="logout" className={styles.profileItem} onClick={handleLogout}>
          <i className="fa fa-sign-out"></i> Log Out
      </Menu.Item>
    </Menu>
  );
}


