import React from 'react';
import { Button } from 'antd';
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const Communication = () => (
  <div>
    <h3 className={styles.sectionTitle}>Communication</h3>
    <div className={styles.buttonGroup}>
    <Button type="link" onClick={() => {/* Do something */}}>Send Email</Button>
    <Button type="link" onClick={() => {/* Do something */}}>Send Notification</Button>
    </div>
  </div>
);

export default Communication;
