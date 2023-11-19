import React, { useState } from 'react';
import { Card, Statistic, Row, Col, Select, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import styles from './RevenueOverview.module.css';

const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const RevenueOverview = () => {
  const [totalRevenueTime, setTotalRevenueTime] = useState('All Time');
  const [monthlyRevenueTime, setMonthlyRevenueTime] = useState('Current Month');
  const [weeklyRevenueTime, setWeeklyRevenueTime] = useState('Current Week');
  const [dailyRevenueTime, setDailyRevenueTime] = useState('Today');

  const lineGraphData = [
    { date: '2021-01-01', value: 90000 },
    { date: '2021-02-01', value: 92000 },
  ];

  return (
    <div className={styles.revenueOverview}>
      <h2>Revenue Overview <Button type="primary">Reset</Button></h2>

      <Row gutter={16}>
        
        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Select defaultValue={totalRevenueTime} onChange={setTotalRevenueTime}>
              <Option value="All Time">All Time</Option>
            </Select>
            <Statistic
              title="Total Revenue"
              value={112893}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined className={styles.arrowIcon} />}
              suffix="$"
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Select defaultValue={monthlyRevenueTime} onChange={setMonthlyRevenueTime}>
              <Option value="Current Month">Current Month</Option>
            </Select>
            <Statistic
              title="Monthly Revenue"
              value={30890}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined className={styles.arrowIcon} />}
              suffix="$"
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Select defaultValue={weeklyRevenueTime} onChange={setWeeklyRevenueTime}>
              <Option value="Current Week">Current Week</Option>
            </Select>
            <Statistic
              title="Weekly Revenue"
              value={8720}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined className={styles.arrowIcon} />}
              suffix="$"
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.cardStyle}>
            <Select defaultValue={dailyRevenueTime} onChange={setDailyRevenueTime}>
              <Option value="Today">Today</Option>
            </Select>
            <Statistic
              title="Daily Revenue"
              value={1234}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined className={styles.arrowIcon} />}
              suffix="$"
            />
          </Card>
        </Col>
        
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card className={styles.cardStyle}>
            <Statistic
              title="MoM Growth"
              value={10}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined className={styles.arrowIcon} />}
              suffix="%"
            />
          </Card>
        </Col>
        
        <Col span={12}>
          <Card className={styles.cardStyle}>
            <Statistic
              title="YoY Growth"
              value={-2}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined className={styles.arrowIcon} />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>


    </div>
  );
};

export default RevenueOverview;
