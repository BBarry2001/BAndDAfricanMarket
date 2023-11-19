import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, Typography, Select, Switch, Table } from 'antd';
import styles from './UserReviewsAnalytics.module.css';

const { Option } = Select;
const { Title, Text } = Typography;

const reviewData = [
  { date: '2023-10-09', totalAdded: 50, totalDeleted: 20, totalFailed: 10, positive: 40, negative: 10 },
  { date: '2023-10-08', totalAdded: 30, totalDeleted: 0, totalFailed: 20, positive: 25, negative: 5 },
];

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Total Reviews Added',
    dataIndex: 'totalAdded',
    key: 'totalAdded',
  },
  {
    title: 'Total Reviews Deleted',
    dataIndex: 'totalDeleted',
    key: 'totalDeleted',
  },
  {
    title: 'Total Failed Submissions',
    dataIndex: 'totalFailed',
    key: 'totalFailed',
  }
];

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

function UserReviewsAnalytics() {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [showPositiveNegative, setShowPositiveNegative] = useState(false);

  const handleChange = (value) => {
    setTimeFrame(value);
  };

  const toggleData = (checked) => {
    setShowPositiveNegative(checked);
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>User Reviews Analytics</Title>
      <Text strong>Total Reviews Added: {reviewData.reduce((acc, item) => acc + item.totalAdded, 0)}</Text>
      <Text strong>Total Reviews Deleted: {reviewData.reduce((acc, item) => acc + item.totalDeleted, 0)}</Text>
      <Text strong>Total Failed Submissions: {reviewData.reduce((acc, item) => acc + item.totalFailed, 0)}</Text>

      <Card className={styles.card}>
        <Select defaultValue={timeFrame} onChange={handleChange} className={styles.select}>
          <Option value="daily">Daily</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
        
        <Switch checked={showPositiveNegative} onChange={toggleData} className={styles.switch}>Show Positive/Negative</Switch>

        <BarChart width={600} height={300} data={reviewData} className={styles.barChart}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={showPositiveNegative ? 'positive' : 'totalAdded'} fill="#8884d8" />
          <Bar dataKey={showPositiveNegative ? 'negative' : 'totalDeleted'} fill="#82ca9d" />
          <Bar dataKey="totalFailed" fill="#ffc658" />
        </BarChart>
      </Card>
      
      <Table 
        dataSource={reviewData} 
        columns={columns} 
        rowKey="date"
        className={styles.table}
      />
    </div>
  );
}

export default UserReviewsAnalytics;
