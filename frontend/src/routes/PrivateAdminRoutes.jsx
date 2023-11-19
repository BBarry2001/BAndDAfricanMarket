import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/admin';
import Dashboard from '../pages/admin/dashboard';
import ManageUsers from '../pages/admin/users';
import UserActivitiesAnalytics from '../pages/admin/activities/UserActivitiesAnalytics';
import AdminActivities from '../pages/admin/activities/admin-activities';
import ManageProducts from '../pages/admin/products/manage-products';
import RevenueStatistics from '../pages/admin/sales/revenue-statistics';
import TopSellingProducts from '../pages/admin/sales/top-selling-products';
import AboutUsConfig from '../pages/admin/pages/AboutUsConfig';
import FooterConfig from '../pages/admin/pages/FooterConfig';
import ManageUsersAddress from '../pages/admin/users/users-addresses-bank-info/ManageUsersAddress';
import ManageUsersBanking from '../pages/admin/users/users-addresses-bank-info/ManageUsersBanking';
import { RoleGuard } from './RouteGuards';
import NoteTakingAdmin from '../pages/admin/navbar-options/notes';
import CalendarAdmin from '../pages/admin/navbar-options/calendar';

/**
 * Private Admin Routes File for B&D African Market.
 * Manages the routing for administrative functionalities accessible only to users with admin roles.
 * 
 * Features:
 * - RoleGuard: Ensures that only users with administrative privileges can access these routes.
 * - AdminPage: A layout component that wraps around all admin-specific routes.
 * - Nested Routing: Utilizes React Router's nested routing to render specific admin pages within the AdminPage layout.
 * 
 * Routes:
 * - "/": The main dashboard view of the admin section.
 * - "/manage-users": Page for managing user accounts.
 * - "/user-activities": Analytics on user activities.
 * - "/admin-activities": Records of admin activities.
 * - "/manage-products": Interface for managing product listings.
 * - "/revenue-statistics": Overview of sales and revenue statistics.
 * - "/top-selling-products": Insights on top-selling products.
 * - "/about-us-config": Configuration options for the 'About Us' page.
 * - "/footer-config": Tools for customizing the website footer.
 * - "/manage-users-address": Management of user addresses.
 * - "/manage-users-banking": Handling of user banking information.
 * - "/notes": Note-taking functionality for admins.
 * - "/calendar": Calendar tool for scheduling and events.
 * - "/*": Fallback for any undefined admin routes, displaying a 404 error message.
 * 
 * Notes:
 * - Ensure RoleGuard is properly configured to authenticate user roles.
 * - Regularly update the route configuration to reflect changes in the admin panel.
 */

export const PrivateAdminRoutes = () => {
  return (
    <Routes>
      {/* Wrap all admin routes within the AdminPage layout */}
      <Route path="/" element={<RoleGuard> <AdminPage /></RoleGuard>}>
        {/* The index route will render the main content of AdminPage */}
        <Route index element={<Dashboard />} />
        
        {/* All admin specific pages are nested routes, they will render in the <Outlet /> of AdminPage */}
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="user-activities" element={<UserActivitiesAnalytics />} />
        <Route path="admin-activities" element={<AdminActivities />} />
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="revenue-statistics" element={<RevenueStatistics />} />
        <Route path="top-selling-products" element={<TopSellingProducts />} />
        <Route path="about-us-config" element={<AboutUsConfig />} />
        <Route path="footer-config" element={<FooterConfig />} />
        <Route path="manage-users-address" element={<ManageUsersAddress />} />
        <Route path="manage-users-banking" element={<ManageUsersBanking />} />
        <Route path="notes" element={<NoteTakingAdmin />} />
        <Route path="calendar" element={<CalendarAdmin />} />
      </Route>
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
};
