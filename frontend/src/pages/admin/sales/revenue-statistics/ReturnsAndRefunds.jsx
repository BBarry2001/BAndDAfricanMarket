import React from 'react';
import { Card, Table } from 'antd';
import styles from './ReturnsAndRefunds.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ReturnsAndRefunds = () => {
  const totalProductsReturned = 50;
  const totalRefundAmount = 1000;

  const products = [
    {
      key: '1',
      product: 'Rice',
      avgRefundValue: 20,
      returnReasons: 'Quality Issue',
      refundMethods: 'Store Credit',
      timeToProcess: 3,
      rateOfReturns: '5%'
    },
    {
      key: '2',
      product: 'Beans',
      avgRefundValue: 25,
      returnReasons: 'Wrong Item',
      refundMethods: 'Cash',
      timeToProcess: 2,
      rateOfReturns: '4%'
    },
    // Add more products here
  ];

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Average Refund Value',
      dataIndex: 'avgRefundValue',
      key: 'avgRefundValue'
    },
    {
      title: 'Return Reasons',
      dataIndex: 'returnReasons',
      key: 'returnReasons'
    },
    {
      title: 'Refund Methods',
      dataIndex: 'refundMethods',
      key: 'refundMethods'
    },
    {
      title: 'Time to Process Refund',
      dataIndex: 'timeToProcess',
      key: 'timeToProcess'
    },
    {
      title: 'Rate of Returns',
      dataIndex: 'rateOfReturns',
      key: 'rateOfReturns'
    },
  ];

  return (
    <div className={styles.returnsAndRefunds}>
      <h2 className={styles.header}>Returns and Refunds</h2>
      <Table 
        dataSource={products} 
        columns={columns}
        title={() => (
          <div>
            <strong>Total Products Returned: </strong>{totalProductsReturned} | 
            <strong> Total Refund Amount: </strong>${totalRefundAmount}
          </div>
        )}
      />
    </div>
  );
};

export default ReturnsAndRefunds;
