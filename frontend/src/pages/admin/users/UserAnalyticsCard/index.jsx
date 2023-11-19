import React from 'react';
import { Card, Tabs } from 'antd';
import TotalUsers from './TotalUsers';
import CurrentlyOnline from './CurrentlyOnline';
import TopReferralSources from './TopReferralSources';
import GeographicalDistribution from './GeographicalOnlineUsers';  
import styles from './index.module.css';

const { TabPane } = Tabs;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const UserAnalyticsCard = () => {
  return (
    <Card title="User Analytics" className={styles.tabContent}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Total Users" key="1">
          <TotalUsers />
        </TabPane>
        
        <TabPane tab="Currently Online" key="2">
          <CurrentlyOnline />
        </TabPane>

        <TabPane tab="Currently Online (Geographical Distribution)" key="3"> 
          <GeographicalDistribution />
        </TabPane>
        
        <TabPane tab="Top Referral Sources" key="4">
          <TopReferralSources />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default UserAnalyticsCard;
