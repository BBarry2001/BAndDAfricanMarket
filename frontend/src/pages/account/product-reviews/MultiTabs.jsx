import React from 'react';
import { Tabs } from 'antd';
import styles from './MultiTabs.module.css'

const { TabPane } = Tabs;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const MultiTabs = ({ setActiveTab, getIconForTab }) => {
  return (
    <Tabs centered className={styles.tabs} defaultActiveKey="1" onChange={key => setActiveTab(key)}>
      <TabPane tab={<span>{getIconForTab('1')} All Reviews</span>} key="1">
      </TabPane>
      <TabPane tab={<span>{getIconForTab('2')} Orders</span>} key="2">
      </TabPane>
      <TabPane tab={<span>{getIconForTab('3')} Products</span>} key="3">
      </TabPane>
      <TabPane tab={<span>{getIconForTab('4')} Notifications</span>} key="4">
      </TabPane>
      <TabPane tab={<span>{getIconForTab('5')} Customer Service</span>} key="5">
      </TabPane>
      <TabPane tab={<span>{getIconForTab('6')} Policies</span>} key="6">
      </TabPane>
    </Tabs>
  );
};

export default MultiTabs;
