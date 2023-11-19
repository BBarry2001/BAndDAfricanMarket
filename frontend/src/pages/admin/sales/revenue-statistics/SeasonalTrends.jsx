import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Button } from 'antd';
import styles from './SeasonalTrends.module.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p>{`Revenue: $${payload[0].value}`}</p>
        <p>{`Best Seller: Some Product`}</p>
      </div>
    );
  }

  return null;
};

const SeasonalTrends = () => {
  const [zoom, setZoom] = useState(false);
  const [metric, setMetric] = useState('revenue');

  const data = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
    { month: 'Jul', revenue: 3490 },
    { month: 'Aug', revenue: 2000 },
    { month: 'Sep', revenue: 2780 },
    { month: 'Oct', revenue: 3908 },
    { month: 'Nov', revenue: 4800 },
    { month: 'Dec', revenue: 4300 },
  ];

  return (
    <div className={styles.seasonalTrends}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Seasonal Trends</h2>
        <div className={styles.buttonContainer}>
          <Button type="primary" onClick={() => setZoom(!zoom)} className={styles.controlButton}>Zoom</Button>
          <Button type="primary" onClick={() => setMetric(metric === 'revenue' ? 'profit' : 'revenue')} className={styles.controlButton}>
            Switch to {metric === 'revenue' ? 'Profit' : 'Revenue'}
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={zoom ? [2000, 5000] : [0, 5000]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={3000} label="Revenue Goal" stroke="red" />
          <Line type="monotone" dataKey={metric} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeasonalTrends;
