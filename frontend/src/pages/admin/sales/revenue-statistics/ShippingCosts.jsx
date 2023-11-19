import React from 'react';
import { Card, Statistic, Row, Col, Badge, Table } from 'antd';
import styles from './ShippingCosts.module.css';

const ShippingCosts = () => {
  const totalShippingCost = 1000;
  const totalShippingRevenue = 1200;

  const columns = [
    {
      title: 'Provider',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: cost => `$${cost}`,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: revenue => `$${revenue}`,
    },
    {
      title: 'Volume of Shipments',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Avg Cost per Shipment',
      dataIndex: 'avgCost',
      key: 'avgCost',
      render: (text, record) => `$${(record.cost / record.volume).toFixed(2)}`,
    },
    {
      title: 'Avg Revenue per Shipment',
      dataIndex: 'avgRevenue',
      key: 'avgRevenue',
      render: (text, record) => `$${(record.revenue / record.volume).toFixed(2)}`,
    },
    {
      title: 'Avg Shipping Duration',
      dataIndex: 'avgShippingTime',
      key: 'avgShippingTime',
      render: avgShippingTime => (
        <Badge color={avgShippingTime <= 3 ? "green" : avgShippingTime <= 7 ? "orange" : "red"} 
          text={avgShippingTime <= 3 ? "Fast" : avgShippingTime <= 7 ? "Average" : "Slow"} />
      ),
    }
  ];

  const providers = [
    { name: 'UPS', cost: 400, revenue: 500, volume: 40, avgShippingTime: 2 },
    { name: 'FedEx', cost: 300, revenue: 400, volume: 30, avgShippingTime: 5 },
    { name: 'DHL', cost: 300, revenue: 300, volume: 35, avgShippingTime: 8 },
  ];

  return (
    <div className={styles.shippingCosts}>
      <h2 className={styles.header}>Shipping Costs & Revenue</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic title="Total Shipping Costs" value={totalShippingCost} prefix="$" />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Total Shipping Revenue" value={totalShippingRevenue} prefix="$" />
          </Card>
        </Col>
      </Row>

      <h3 className={styles.subHeader}>Shipping Providers</h3>
      <Table dataSource={providers} columns={columns} rowKey="name" className={styles.providerTable} />
    </div>
  );
};

export default ShippingCosts;
