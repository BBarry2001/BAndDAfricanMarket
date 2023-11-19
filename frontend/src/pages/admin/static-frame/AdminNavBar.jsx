import React from 'react';
import { Link } from 'react-router-dom'; 
import { Layout, Menu, Dropdown, Badge, Avatar, Tooltip } from 'antd';
import { HomeOutlined, BellOutlined, CalendarOutlined } from '@ant-design/icons';
import { FaRegStickyNote, FaFacebookF, FaMailBulk } from 'react-icons/fa';
import styles from './AdminNavBar.module.css';
import { selectDarkMode } from '../../../hub/slices/AdminSlice';
import { useSelector } from 'react-redux';

const { Header } = Layout;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const AdminNavBar = ({ collapsed, toggle, setSelectedKeys }) => {
  const darkMode = useSelector(selectDarkMode);

  const themeStyles = darkMode ? {
    backgroundColor: '#001529',
    color: 'white'
  } : {
    backgroundColor: '#f7f8fc',
    color: '#333'
  };

  const iconStyles = darkMode ? {
    fontSize: '24px'
  } : {
    fontSize: '24px',
    color: '#333'
  };

  const profileNameStyles = {
    color: darkMode ? 'white' : 'black'
  };

  const profileMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );
  

  const serverStatusColor = "green"; 

  return (
    <Header style={themeStyles} className={`${styles.headerStyle} ${styles.clickable}`}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.iconContainer}>
          <HomeOutlined style={iconStyles} />
        </Link>
      </div>
  
      <div className={styles.headerRight}>
        <Tooltip title="Notifications" className={`${styles.iconContainer} ${styles.clickable}`}>
          <Link to="/admin/dashboard">
            <Badge count={5}>
              <BellOutlined style={iconStyles} />
            </Badge>
          </Link>
        </Tooltip>
  
        <Tooltip title="Calendar" className={`${styles.iconContainer} ${styles.clickable}`}>
          <Link to="/admin/calendar">
            <CalendarOutlined style={iconStyles} />
          </Link>
        </Tooltip>
  
        <Tooltip title="Server Status" className={`${styles.iconContainer} ${styles.clickable}`}>
          <Link to="/admin/dashboard">
            <div style={{ backgroundColor: serverStatusColor, borderRadius: '50%', width: '14px', height: '14px' }}></div>
          </Link>
        </Tooltip>
  
        <Tooltip title="Notes" className={`${styles.iconContainer} ${styles.clickable}`} onClick={() => setSelectedKeys(['NotesComponent'])}>
          <Link to="/admin/notes">
            <FaRegStickyNote style={iconStyles} />
          </Link>
        </Tooltip>
  
        <Tooltip title="Social Media Feeds" className={`${styles.iconContainer} ${styles.clickable}`}>
          <Link to="/admin/dashboard">
            <FaFacebookF style={iconStyles} />
          </Link>
        </Tooltip>
  
        <Tooltip title="Mail" className={`${styles.iconContainer} ${styles.clickable}`}>
          <Link to="/admin/dashboard">
            <Badge count={2}>
              <FaMailBulk style={iconStyles} />
            </Badge>
          </Link>
        </Tooltip>
  
        <Dropdown overlay={profileMenu} trigger={['hover']}>
          <Link to="/admin/dashboard">
            <div className={styles.profileCard}>
              <Avatar src="path/to/your/avatar.jpg" className={styles.avatarWithBorder} />
              <span style={profileNameStyles} className={styles.adminName}>Admin Name</span>
            </div>
          </Link>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminNavBar;
