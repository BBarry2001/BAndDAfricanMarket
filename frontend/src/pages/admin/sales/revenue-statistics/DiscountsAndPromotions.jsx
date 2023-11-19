import React from 'react';
import { Card, Row, Col, Statistic, Select } from 'antd';
import styles from './DiscountsAndPromotions.module.css';

const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const DiscountsAndPromotions = () => {
  const revenueBefore = 10000; 
  const revenueAfter = 8500; 
  const discountImpact = ((revenueBefore - revenueAfter) / revenueBefore) * 100;
  const revenueLoss = revenueBefore - revenueAfter;

  return (
    <div className={styles.discountsAndPromotions}>
      <h2 className={styles.header}>Discounts & Promotions Impact</h2>
      <Row gutter={16}>
        <Col span={10}>
          <Card className={styles.cardStyle}>
            <div className={styles.cardHeader}>
              <Statistic title="Revenue Before Discounts" value={revenueBefore} suffix="$" />
              <Select defaultValue="Seasonal" className={styles.discountSelect}>
                <Option value="Seasonal">Seasonal</Option>
                <Option value="Coupon">Coupon</Option>
                <Option value="Bundle">Bundle</Option>
              </Select>
            </div>
          </Card>
        </Col>
        <Col span={10}>
          <Card className={styles.cardStyle}>
            <Statistic title="Revenue After Discounts" value={revenueAfter} suffix="$" />
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.cardStyle}>
            <Statistic title="Top Discounts" value="Seasonal" />
          </Card>
        </Col>
      </Row>
      <Row className={styles.impactRow}>
        <Col span={12}>
          <Card className={styles.cardStyle}>
            <Statistic title="Discount Impact" value={discountImpact.toFixed(2)} suffix="%" />
            <p className={styles.revenueLoss}>Revenue Loss: {revenueLoss}$</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card className={styles.cardStyle}>
            <Statistic title="Social Shares" value={320} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DiscountsAndPromotions;
