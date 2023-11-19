import React from 'react';
import RevenueOverview from './RevenueOverview';
import styles from './index.module.css';
import PaymentMetrics from './PaymentMetrics';
import SeasonalTrends from './SeasonalTrends';
import CustomerMetrics from './CustomerMetrics';
import DiscountsAndPromotions from './DiscountsAndPromotions';
import ShippingCosts from './ShippingCosts';
import ReturnsAndRefunds from './ReturnsAndRefunds';

const RevenueStatistics = () => {
  return (
    <div className={styles.revenueStatistics}>
      <div className={styles.subComponent}><RevenueOverview /></div>
      <div className={styles.subComponent}><PaymentMetrics /></div>
      <div className={styles.subComponent}><CustomerMetrics /></div>
      <div className={styles.subComponent}><DiscountsAndPromotions /></div>
      <div className={styles.subComponent}><SeasonalTrends /></div>
      <div className={styles.subComponent}><ShippingCosts /></div>
      <div className={styles.subComponent}><ReturnsAndRefunds /></div>
    </div>
  );
};

export default RevenueStatistics;
