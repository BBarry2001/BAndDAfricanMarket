import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Layout, Menu, Badge, Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { FaCartArrowDown } from 'react-icons/fa';

import { useAuthInfo } from '../../hub/hooks/hooks';
import { findKeyByPath } from '../../utils/Utils';
import { useWindowSize } from '../../hub/hooks/hooks';
import { CartDropdown, ProfileDropdown } from './NavbarDropdownsContents';
import styles from './Navbar.module.css';
import MobileHeader from './MobileHeader';

const Navbar = () => {
  // Destructuring authenticated user data
  const { displayName, rawName, isAuthenticated, isAdmin } = useAuthInfo();

  // Destructuring cart items data
  const { authItems = [], nonAuthItems = [] } = useSelector(
    (state) => state.cart,
    shallowEqual
  );

  // Calculating cart item count using memoization
  const cartCountFromRedux = useMemo(() => {
    return isAuthenticated
      ? authItems.reduce((total, item) => total + item.quantity, 0)
      : nonAuthItems.reduce((total, item) => total + item.quantity, 0);
  }, [authItems, nonAuthItems, isAuthenticated]);

  // State management for dropdowns
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [cartDropdownVisible, setCartDropdownVisible] = useState(false);

  // Custom hooks
  const windowSize = useWindowSize();
  const location = useLocation();
  const currentPath = location.pathname;

  // Static data
  const menuItems = [
    { key: '0', label: 'Home', to: '/' },
    { key: '1', label: 'Products', to: '/products' },
    { key: '2', label: 'Our Story', to: '/about-us' },
    { key: '3', label: 'Contact Us', to: '/contact-us' },
  ];

  // Event handlers
  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCartDropdownVisible(!cartDropdownVisible);
    if (profileDropdownVisible) {
      setProfileDropdownVisible(false);
    }
  };

  const handleProfileDropdownClick = (e) => {
    setProfileDropdownVisible(!profileDropdownVisible);
    if (cartDropdownVisible) {
      setCartDropdownVisible(false);
    }
  };

  // Effect to hide the profile dropdown if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setProfileDropdownVisible(false);
    }
  }, [isAuthenticated]);

  // Shared props for MobileHeader
  const sharedProps = {
    displayName,
    rawName,
    menuItems,
    cartCountFromRedux,
    isAuthenticated,
    isAdmin,
    handleDropdownClick,
  };

  return (
    <Layout.Header className={`${styles.header} globalHeader`}>
      {windowSize.width >= 736 ? (
        <>
          <div className={`${styles.logo} globalLogo`}>B&D African Market</div>
          <div className={`${styles.rightGroup} globalRightGroup`}>
            <Menu
              mode="horizontal"
              selectedKeys={[findKeyByPath(menuItems, currentPath)]}
              className={styles.menu}
            >
              {menuItems.map((item) => (
                <Menu.Item key={item.key} className={`${styles.menuItem} globalMenuItem`}>
                  <Link to={item.to}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
  
            <div className={styles.cartAndProfileGroup}>
              <div className={styles.menuItemCart}>
                <Dropdown
                  placement="bottom"
                  overlay={<CartDropdown />}
                  trigger={['click']}
                  visible={cartDropdownVisible}
                >
                  <a
                    aria-label="Open cart dropdown"
                    aria-haspopup="true"
                    className={styles.cartDropdownLink}
                    onClick={handleDropdownClick}
                  >
                    <FaCartArrowDown className={styles.icon} />
                    <span className={styles.cartText}>Cart</span>
                    <Badge color='gold' count={cartCountFromRedux} className={styles.badge} />
                  </a>
                </Dropdown>
              </div>
  
              {isAuthenticated ? (
                <div className={styles.menuItemProfile}>
                  <Dropdown 
                    overlay={<ProfileDropdown setProfileDropdownVisible={setProfileDropdownVisible} />} 
                    trigger={['click']} 
                    placement="bottomCenter"
                    visible={profileDropdownVisible}
                    onVisibleChange={handleProfileDropdownClick}
                  >
                    <a 
                      aria-label="Open profile dropdown"
                      aria-haspopup="true"
                      className={styles.cartDropdownLink}
                      onClick={handleProfileDropdownClick}
                    >
                      <Avatar icon={<UserOutlined />} className={styles.avatar} />
                      <span className={styles.userName}>{displayName}</span>
                      {profileDropdownVisible ? <UpOutlined style={{ marginLeft: '5px' }} /> : <DownOutlined style={{ marginLeft: '5px' }} />}
                    </a>
                  </Dropdown>
                </div>
              ) : (
                <div className={styles.loginRegisterContainer}>
                  <div className={styles.loginMenuItem}>
                    <Link to="/login" className={styles.loginLink}>Login</Link>
                  </div>
                  <div className={styles.registerMenuItem}>
                    <Link to="/register" className={styles.registerLink}>Register</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null
      }
      {(windowSize.width >= 320 && windowSize.width <= 735) && (
        <MobileHeader 
          {...sharedProps}
          cartDropdownVisible={cartDropdownVisible}
          setCartDropdownVisible={setCartDropdownVisible}
          currentPath={currentPath}
        />
      )}
    </Layout.Header>
  );
  
}

export default Navbar;
