import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom'; 
import { Layout } from 'antd';
import AdminNavBar from './static-frame/AdminNavBar';
import AdminSider from './static-frame/AdminSideBar';
import FloatingButton from './static-frame/float-button';
import useInactivityLogout from '../../hub/hooks/AdminPageInacivitySensor'; 
import styles from './index.module.css';

const { Content } = Layout;

/**
 * AdminPage Component
 *
 * The AdminPage component is the primary layout component for the administrative interface part of the application.
 * It integrates various sub-components to create a cohesive and functional admin dashboard.
 *
 * Features:
 * - A collapsible sidebar (AdminSider) for navigation between different admin sections.
 * - A top navigation bar (AdminNavBar) displaying the current page and providing toggle functionality for the sidebar.
 * - A content area that renders the specific admin views based on routing (using Outlet from 'react-router-dom').
 * - A floating button (FloatingButton) to toggle dark mode, enhancing the user experience with a customizable interface theme.
 *
 * Implementation:
 * - Utilizes the Layout component from Ant Design for the overall structure.
 * - State management for sidebar collapse status and dark mode preference.
 * - The useLocation hook from 'react-router-dom' to determine the current path for active link styling in the sidebar.
 * - Custom hook useInactivityLogout to handle automatic logout after a period of inactivity.
 *
 * Usage:
 * - As a layout wrapper for all admin-related routes in the application.
 * - Enhances navigation, usability, and aesthetics of the admin interface.
 * - Provides a consistent structure and appearance across different admin pages.
 *
 * 
 * Note: This component plays a vital role in the admin interface, and any modifications should 
 * consider its impact on the overall user experience and navigation flow. Ensure that all child 
 * components and hooks are thoroughly tested when making changes to this component.
 */


const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); 

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useInactivityLogout(); 

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNavBar collapsed={collapsed} toggle={toggle} darkMode={darkMode} currentPath={location.pathname} />
      <Layout>
      <AdminSider 
        collapsed={collapsed} 
        toggle={toggle} 
        currentKey={location.pathname}
      />        
      <Layout className={styles.layoutPadding}>         
        <Content className={styles.contentStyle}>
          <Outlet /> 
          </Content>
          <FloatingButton setDarkMode={setDarkMode} darkMode={darkMode} />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
