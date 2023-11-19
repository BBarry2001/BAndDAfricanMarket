import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import { ProfileDropdown } from './NavbarDropdownsContents';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function ProfileCard({ isDropdownOpen, setIsDropdownOpen }) {
  const firstName = useSelector((state) => state.auth.first_name) || "";
  const lastName = useSelector((state) => state.auth.last_name);
  const rawName = `${firstName} ${lastName ? lastName[0] + '.' : ''}`.trim();
  const displayName = rawName.length > 15 ? `${rawName.substring(0, 15)}...` : rawName;
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleDropdownClick = (e) => {
    e.preventDefault();
  };

  return (
    <Dropdown 
      overlay={<ProfileDropdown isAdmin={isAdmin} />} 
      trigger={['click']} 
      placement="bottomCenter"
      onVisibleChange={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <a className={`${styles.cartDropdownLink}`} onClick={handleDropdownClick}>
        <Avatar icon={<UserOutlined />} className={styles.avatar} />
        <span className={styles.userName}>{displayName}</span>
        {isDropdownOpen ? <UpOutlined style={{ marginLeft: '5px' }} /> : <DownOutlined style={{ marginLeft: '5px' }} />}  
      </a>
    </Dropdown>
  );
}
