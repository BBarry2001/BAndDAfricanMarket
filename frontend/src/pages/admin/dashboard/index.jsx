import React from 'react';
import { useSelector } from 'react-redux';
import UsersOverview from '../users/UserOverviewCard';
import RevenueOverview from '../sales/revenue-statistics/RevenueOverview'
import { selectDarkMode } from '../../../hub/slices/AdminSlice';

import styles from './index.module.css'; 

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const Dashboard = ({ totalUsers, newUsersToday, currentlyOnline, activeThisWeek, averageAge }) => {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={styles.Container}>
      <UsersOverview/>
      <RevenueOverview/>
    
    </div>
  );
};

export default Dashboard;
