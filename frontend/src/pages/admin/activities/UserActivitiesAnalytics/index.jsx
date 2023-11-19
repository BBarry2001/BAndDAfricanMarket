import React from 'react';
import { Tabs } from 'antd';
import DashboardOverview from './DashboardOverview';
import GeneralActivities from './GeneralActivities';
import ErrorsIssues from './ErrorsIssues';
import UserEngagement from './UserEngagement';
import Communication from './UserReviewsAnalytics';
import AdvancedFeatures from './AdvancedFeatures';
import styles from './index.module.css';

const { TabPane } = Tabs;

function UserActivitiesAnalytics() {
  return (
    <div className={styles.container}>
      <DashboardOverview />

      <Tabs defaultActiveKey="1">
        <TabPane tab="General Activities" key="1">
          <GeneralActivities />
        </TabPane>
        <TabPane tab="Errors & Issues" key="2">
          <ErrorsIssues />
        </TabPane>
        <TabPane tab="User Engagement" key="3">
          <UserEngagement />
        </TabPane>
        <TabPane tab="User Reviews Analytics" key="4">
          <Communication />
        </TabPane>
        <TabPane tab="Advanced Features" key="5">
          <AdvancedFeatures />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UserActivitiesAnalytics;
