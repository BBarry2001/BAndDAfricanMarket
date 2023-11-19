import React from 'react';
import { Table } from 'antd';
import { CreditCardOutlined, MoneyCollectTwoTone } from '@ant-design/icons';
import styles from './PaymentMetrics.module.css';


// this table should filter with the Revenue Overview component. so any filtering done by that
// component should reflect on this table too

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const PaymentMetrics = () => {

  const paymentsData = [
    { key: '1', method: 'Credit Card', revenue: 5000, transactions: 200, growth: 5, icon: <CreditCardOutlined /> },
    { key: '2', method: 'PayPal', revenue: 2000, transactions: 80, growth: -2, icon: <MoneyCollectTwoTone /> }
  ];

  const columns = [
    {
      title: 'Payment Method',
      dataIndex: 'method',
      key: 'method',
      render: (text, record) => (
        <div className={styles.paymentMethod}>
          {record.icon}
          <span className={styles.methodName}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (text) => (
        <span className={styles.revenueValue}>${text.toLocaleString()}</span>
      ),
    },
    {
      title: 'Transaction Count',
      dataIndex: 'transactions',
      key: 'transactions',
    },
    {
      title: 'MoM Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: (text) => (
        <span className={text >= 0 ? styles.growthPositive : styles.growthNegative}>
          {text >= 0 ? `+${text}%` : `${text}%`}
        </span>
      ),
    },
  ];

  return (
    <div className={styles.paymentMetrics}>
      <h2 className={styles.header}>Payment Metrics</h2>
      <Table dataSource={paymentsData} columns={columns} className={styles.table} />
    </div>
  );
};

export default PaymentMetrics;
