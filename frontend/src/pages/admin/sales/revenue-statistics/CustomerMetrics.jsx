import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from './CustomerMetrics.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const CustomerMetrics = () => {
  const AOV = 250;  
  const CLV = 2000;  
  const repeatPurchaseRatio = 0.6; 
  const cartAbandonRate = 0.25;

  const customerData = [
    { name: 'New', value: 4000 },
    { name: 'Returning', value: 2400 },
  ];

  const clvData = [
    { name: 'Under 1 year', value: 800 },
    { name: '1-2 years', value: 1200 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className={styles.customerMetrics}>
      <h2 className={styles.header}>Customer Metrics</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Statistic title="Average Order Value" value={AOV} suffix="$" />
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Statistic title="Customer Lifetime Value" value={CLV} suffix="$" />
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Statistic title="Repeat Purchase Ratio" value={`${repeatPurchaseRatio * 100}%`} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Statistic title="Cart Abandonment Rate" value={`${cartAbandonRate * 100}%`} />
          </Card>
        </Col>
      </Row>

      <Row className={styles.chartRow}>
        <Col span={12}>
          <PieChart width={300} height={300}>
            <Pie dataKey="value" isAnimationActive={false} data={customerData} cx={150} cy={150} outerRadius={80} label>
              {customerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
        <Col span={12}>
          <PieChart width={300} height={300}>
            <Pie dataKey="value" isAnimationActive={false} data={clvData} cx={150} cy={150} outerRadius={80} label>
              {clvData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerMetrics;
