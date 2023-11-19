import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { TeamOutlined, UserOutlined, ShareAltOutlined, DesktopOutlined } from '@ant-design/icons';
import styles from './UserOverviewCard.module.css';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../hub/slices/AdminSlice';

const { Title, Text } = Typography;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const UserOverviewCard = () => {
  const mostVisitedPage = "Homepage";
  const actionsTaken = { purchase: 250 };
  const deviceUsers = { desktop: 300, mobile: 200 };

  const darkMode = useSelector(selectDarkMode);
  const bgColor = darkMode ? '#001F3F' : '#fff';
  const cardShadow = darkMode ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)';

  return (
    <Card title="User Overview" bordered={false} className={styles.container} style={{ backgroundColor: bgColor, boxShadow: cardShadow }}>
      
      {/* Total Users Section */}
      <Row gutter={[16, 16]} className={styles.section}>
        <Col span={6} className={styles.column}>
          <TeamOutlined className={styles.icon} />
          <Title level={4}>Total Users</Title>
          <Text>Total:</Text> <Text strong className={styles.value}>500</Text><br />
          <Text>New this Month:</Text> <Text strong className={styles.value}>100</Text><br />
          <Text>New this Year:</Text> <Text strong className={styles.value}>350</Text>
        </Col>

        {/* Currently Online Section */}
        <Col span={6} className={styles.column}>
          <UserOutlined className={styles.icon} />
          <Title level={4}>Currently Online</Title>
          <Text>Total Online:</Text> <Text strong className={styles.value}>150</Text><br />
          <Text>Registered:</Text> <Text strong className={styles.value}>100</Text><br />
          <Text>Guests:</Text> <Text strong className={styles.value}>50</Text>
        </Col>

        {/* Referral Sources Section */}
        <Col span={6} className={styles.column}>
          <ShareAltOutlined className={styles.icon} />
          <Title level={4}>Top Referral Sources</Title>
          <Text>Direct Link:</Text> <Text strong className={styles.value}>250</Text><br />
          <Text>Facebook:</Text> <Text strong className={styles.value}>200</Text><br />
          <Text>Social Media:</Text> <Text strong className={styles.value}>50</Text>
        </Col>
        
        {/* User Insights Section */}
        <Col span={6} className={styles.column}>
          <Title level={4}>User Insights</Title>
          <Text>Most Visited Page:</Text> <Text strong className={styles.value}>{mostVisitedPage}</Text><br />
          <Text>Actions Taken:</Text> <Text strong className={styles.value}>Purchases: {actionsTaken.purchase}</Text><br />
          <Text>Most Used Device:</Text> <DesktopOutlined className={styles.icon} /> <Text strong className={styles.value}>{deviceUsers.desktop} users</Text>
        </Col>

      </Row>

    </Card>
  );
};

export default UserOverviewCard;
