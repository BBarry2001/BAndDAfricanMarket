import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import {
  DashboardOutlined, UserOutlined, UserAddOutlined, HomeOutlined, BankOutlined,
  InfoCircleOutlined, BookOutlined, PictureOutlined, TagOutlined, ShoppingCartOutlined,
  SettingOutlined, LineChartOutlined, RocketOutlined, DollarOutlined
} from '@ant-design/icons';
import styles from './AdminSideBar.module.css';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../hub/slices/AdminSlice'; 

const { Sider } = Layout;

const AdminSider = ({ collapsed, toggle,  currentKey }) => {
  const darkMode = useSelector(selectDarkMode);

  const logoStyles = darkMode ? { color: 'white' } : { color: '#333' };

  const getOpenKey = (currentKey) => {
    if (currentKey.startsWith('/admin/manange-users') || currentKey.startsWith('/admin/manage-users-address') || currentKey.startsWith('/admin/manage-users-banking')) {
      return 'Users';
    }
    if (currentKey.startsWith('/admin/user-activities') || currentKey.startsWith('/admin/admin-activities')) {
      return 'Activities';
    }
    if (currentKey.startsWith('/admin/manage-products')) {
      return 'Products';
    }
    if (currentKey.startsWith('/admin/revenue-statistics') || currentKey.startsWith('/admin/top-selling-products')) {
      return 'Sales';
    }
    if (currentKey.startsWith('/admin/promo-codes') || currentKey.startsWith('/admin/flash-sales')) {
      return 'Promotions';
    }
    if (currentKey.startsWith('/admin/about-us-config') || currentKey.startsWith('/admin/footer-config') || currentKey.startsWith('/admin/product-layout')) {
      return 'Pages';
    }
    return '';
  };
  
  // Mapping between paths and menu item keys
  const pathToMenuItemKey = {
    '/admin/dashboard': 'Dashboard',
    '/admin/manage-users': 'manageUsers',
    '/admin/manage-users-address': 'manageUsersAddress',
    '/admin/manage-users-banking': 'manageUsersBankInfo',
    '/admin/user-activities': 'UsersActivities',
    '/admin/admin-activities': 'AdminActivities',
    '/admin/manage-products': 'manageProducts',
    '/admin/product-reviews': 'productReviews',
    '/admin/revenue-statistics': 'revenueStats',
    '/admin/top-selling-products': 'topSelling',
    '/admin/top-selling': 'topSelling',
    '/admin/promo-codes': 'promoCodes',
    '/admin/flash-sales': 'flashSales',
    '/admin/about-us-config': 'aboutUs',
    '/admin/footer-config': 'footerConfig',
    '/admin/product-layout': 'productLayout'
  };
  
  

  return (
    <Sider
      width={250}
      className={styles.siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={toggle}
      theme={darkMode ? 'dark' : 'light'}
    >
      <div className={styles.logo}>
        { !collapsed && <h2 style={logoStyles}>B&D African Market</h2> }
      </div>
      <Menu
      mode="inline"
      selectedKeys={[pathToMenuItemKey[currentKey]]} 
      defaultOpenKeys={[getOpenKey(currentKey)]}
      theme={darkMode ? 'dark' : 'light'}
    >
        <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>  {/* Overview of site statistics and quick insights */}
        </Menu.Item>
        
        <Menu.SubMenu key="Users" title="Users" icon={<UserOutlined />}>
          {/* CRUD operations for users */}
          <Menu.Item key="manageUsers" icon={<UserAddOutlined />}><Link to="/admin/manage-users">Manage Users</Link></Menu.Item>
          <Menu.Item key="manageUsersAddress" icon={<HomeOutlined />}><Link to="/admin/manage-users-address">Manage User's Address</Link></Menu.Item>
          <Menu.Item key="manageUsersBankInfo" icon={<BankOutlined />}><Link to="/admin/manage-users-banking">Manage Users Bank Information</Link></Menu.Item>
        </Menu.SubMenu>
  
        <Menu.SubMenu key="Activities" title="Activities" icon={<BookOutlined />}>
          {/* Tracking of user activity across the platform */}
          <Menu.Item key="UsersActivities" icon={<UserAddOutlined />}><Link to="/admin/user-activities">User Activities / Analytics</Link></Menu.Item>
          {/* Tracking of admin activity across the platform */}
          <Menu.Item key="AdminActivities" icon={<RocketOutlined />}><Link to="/admin/admin-activities">Admin Activities</Link></Menu.Item> 
        </Menu.SubMenu>
  
        <Menu.SubMenu key="Products" title="Products" icon={<ShoppingCartOutlined />}>
          {/* CRUD operations for products */}
          <Menu.Item key="manageProducts" icon={<TagOutlined />}><Link to="/admin/manage-products">Manage Products</Link></Menu.Item>
          {/* Managing and moderating product reviews */}
          <Menu.Item key="productReviews" icon={<InfoCircleOutlined />}><Link to="/admin/product-reviews">Manage Product Reviews</Link></Menu.Item>
        </Menu.SubMenu>
  
        <Menu.SubMenu key="Sales" title="Sales & Revenue" icon={<DollarOutlined />}>
          {/* Revenue insights */}
          <Menu.Item key="revenueStats" icon={<LineChartOutlined />}><Link to="/admin/revenue-statistics">Revenue Statistics</Link></Menu.Item>
          {/* Monitor top-selling products */}
          <Menu.Item key="topSelling" icon={<TagOutlined />}><Link to="/admin/top-selling-products">Top-Selling Products</Link></Menu.Item>
        </Menu.SubMenu>
  
        <Menu.SubMenu key="Promotions" title="Marketing & Promotions" icon={<RocketOutlined />}>
          {/* CRUD operations for promotional codes */}
          <Menu.Item key="promoCodes" icon={<TagOutlined />}><Link to="/admin/promo-codes">Promo Codes & Discounts</Link></Menu.Item>
          {/* Setting up flash sales */}
          <Menu.Item key="flashSales" icon={<TagOutlined />}><Link to="/admin/flash-sales">Flash Sales</Link></Menu.Item>
        </Menu.SubMenu>
  
        {/* // [Add other menus/submenus as needed, following the pattern above] */}
  
        <Menu.SubMenu key="Pages" title="Pages" icon={<PictureOutlined />}>
          {/* Editing site pages and their content */}
          <Menu.Item key="aboutUs" icon={<InfoCircleOutlined />}><Link to="/admin/about-us-config">About Us</Link></Menu.Item>
          <Menu.Item key="footerConfig" icon={<SettingOutlined />}><Link to="/admin/footer-config">Footer Configuration</Link></Menu.Item>
          <Menu.Item key="productLayout" icon={<TagOutlined />}><Link to="/admin/product-layout">Product Page Layout</Link></Menu.Item>
        </Menu.SubMenu>
  
      </Menu>
    </Sider>
  );
  
};

export default AdminSider;