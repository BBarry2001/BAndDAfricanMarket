import React from 'react';
import { Button, List, Tooltip } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import styles from './ProductAlerts.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ProductAlerts = () => {
  const alerts = [
    "Product XYZ running low on stock",
    "Product ABC received 3 negative reviews",
    "Product LMN has outdated details"
  ];

  return (
    <Tooltip title={
      <List
        size="small"
        bordered
        dataSource={alerts}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    }>
      <Button 
        shape="circle"
        icon={<AlertOutlined />}
        className={styles.button}
      />
    </Tooltip>
  );
};

export default ProductAlerts;
