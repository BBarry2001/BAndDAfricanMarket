// React and State Management
import React, { useState, useEffect } from 'react';

// Ant Design Components
import { Drawer, Button, Avatar, Dropdown, Badge, Menu } from 'antd';
import { UserOutlined, MenuOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

// Third-party Libraries
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Custom Components and Hooks
import { CartDropdown, ProfileDropdown } from './NavbarDropdownsContents';
import { useWindowSize } from '../../hub/hooks/hooks';
import { findKeyByPath } from '../../utils/Utils';

// Styles
import styles from './MobileHeader.module.css';

const MobileHeader = ({ 
  menuItems,
  cartCountFromRedux,
  isAuthenticated,
  isAdmin,
  rawName,
  handleDropdownClick,
  cartDropdownVisible,
  setCartDropdownVisible,
  currentPath,
}) => {
  
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);
  const displayName = rawName.length > 20 ? `${rawName.substring(0, 20)}...` : rawName;
  const { width } = useWindowSize();
  const [cartStyle, setCartStyle] = useState('');

  // Drawer Handlers
  const handleDrawerClose = () => setDrawerVisible(false);
  const handleDrawerOpen = () => setDrawerVisible(true);

  // Dropdown Handlers
  const handleProfileDropdownClick = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle Profile Options
  const toggleProfileOptions = () => setIsProfileOptionsVisible(!isProfileOptionsVisible);

  // Reset Profile options state on logout
  useEffect(() => {
    if (!isAuthenticated) setIsProfileOptionsVisible(false);
  }, [isAuthenticated]);

  // Update the cart style based on authentication state
  useEffect(() => {
    setCartStyle(isAuthenticated ? styles.authenticatedCart : '');
  }, [isAuthenticated]);
  
  return (
    <>
      <div className={`${styles.mobileRightGroup} globalMobileRightGroup customMobileRightGroup`}>
        <div className={`${styles.flexParentWrapper}`}>

          <div className={styles.buttonGroup}>
            <Dropdown
              placement="bottom"
              overlay={<CartDropdown />}
              trigger={['click']}
              visible={cartDropdownVisible}
              className={cartStyle}
            >
              <a onClick={e => { handleDropdownClick(e); setCartDropdownVisible(!cartDropdownVisible); }} className={styles.cartDropdownLink}>
                <FaCartArrowDown className={styles.icon} />
                <span className={styles.cartText}>Cart</span>
                <Badge color='gold' count={cartCountFromRedux} className={styles.badge} />
              </a>
            </Dropdown>
            {!isAuthenticated && (
              <div className={`${styles.loginRegisterContainer} globalMobileHeaderLoginRegisterContainer`}>
                <div className={styles.loginMenuItem}><Link to="/login" className={`${styles.loginLink} globalLoginLink`}>Login</Link></div>
                <div className={styles.registerMenuItem}><Link to="/register" className={`${styles.registerLink} globalRegisterLink`}>Register</Link></div>
              </div>
            )}
          </div>
          
        </div>

      </div>
      <Button 
         className={`${styles.menuButton} globalMobileHeaderMenuButton ${isAuthenticated ? styles.tightenUp : ''}`} 
         onClick={handleDrawerOpen} 
         icon={<MenuOutlined />} 
      />

      <Drawer
        title={<div className={`${styles.customLogo} globalMobileHeaderLogo customLogo`}>B&D African Market</div>}
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={drawerVisible}
        width={width <= 786 ? '70%' : '25%'}
        className={`globalDrawer customDrawerTransition ${styles.customDrawer}`}
      >
        <div className={styles.centeredContent}>
          {isAuthenticated && (
            <div onClick={toggleProfileOptions} className={`${styles.customProfileCard} globalMobileHeaderProfileCard profileUnifiedLook`}>
              <Avatar icon={<UserOutlined />} className={styles.avatar} />
              <span className={styles.userName}>{displayName}</span>
              {isProfileOptionsVisible ? <UpOutlined /> : <DownOutlined />}
            </div>
          )}
          {isProfileOptionsVisible && <ProfileDropdown isAdmin={isAdmin} setProfileDropdownVisible={setProfileDropdownVisible}/>}
        </div>
        
        <div className={styles.marginBetween}>
          <Menu mode="vertical" selectedKeys={[findKeyByPath(menuItems, currentPath)]} className={`globalMobileHeaderDrawerMenu ${styles.customDrawerMenu}`}>
            {menuItems.map((item, index) => (
              <Menu.Item key={index} className={`globalMobileHeaderDrawerMenuItem`}>
                <Link to={item.to} onClick={handleDrawerClose}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Drawer>
    </>
  );
};

export default MobileHeader;
