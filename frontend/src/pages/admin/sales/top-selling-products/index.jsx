import React, { useState } from 'react';
import { Table, Button, Badge, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ComposedChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const TopSellingProducts = () => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchText, setSearchText] = useState('');

  const data = [
    {
      key: '1',
      name: 'Rice',
      quantity: 100,
      revenue: 500,
      margin: 20,
      uniqueCustomers: 75,
      repeatCustomers: 40,
      salesTrend: [120, 100, 140, 170],
    },
    {
      key: '2',
      name: 'Beans',
      quantity: 80,
      revenue: 300,
      margin: 15,
      uniqueCustomers: 50,
      repeatCustomers: 30,
      salesTrend: [90, 120, 110, 130],
    },
  ];

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  });

  const columns = [
    { title: 'Product', dataIndex: 'name', key: 'name', ...getColumnSearchProps('name') },
    { title: 'Quantity Sold', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Margin (%)', dataIndex: 'margin', key: 'margin' },
    { title: 'Unique Customers', dataIndex: 'uniqueCustomers', key: 'uniqueCustomers' },
    { title: 'Repeat Customers (%)', dataIndex: 'repeatCustomers', key: 'repeatCustomers' },
    { 
      title: 'Status',
      key: 'status',
      render: () => <Badge status="success" text="In Stock" />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" >
          View Details
        </Button>
      ),
    },
  ];

  const chartData = data[0].salesTrend.map((val, idx) => {
    const obj = { day: `Day ${idx + 1}` };
    data.forEach((product) => {
      obj[product.name] = product.salesTrend[idx];
    });
    return obj;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Top-Selling Products</h2>
      <div className={styles.table}>
        <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
      </div>
      
      <div className={styles.chartContainer}>
        <h3 className={styles.chartHeader}>Sales Trend for Products</h3>
        <ComposedChart width={800} height={400} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            data.map((product, idx) => (
              <Line type="monotone" dataKey={product.name} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} key={idx} />
            ))
          }
        </ComposedChart>
      </div>
    </div>
  );
};

export default TopSellingProducts;
