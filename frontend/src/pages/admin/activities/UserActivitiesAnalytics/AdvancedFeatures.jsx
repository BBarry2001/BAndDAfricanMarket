import React, { useState } from 'react';
import { Table, Card, Typography, Tooltip, Input, Select } from 'antd';
import { PieChart, Pie } from 'recharts';
import styles from './AdvancedFeatures.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const middlewareLogs = [
  { timestamp: '2023-10-09', type: 'Validation', details: 'ZIP code mismatch' },
  { timestamp: '2023-10-08', type: 'Caching', details: 'Cache updated' },
];

const userErrorLogs = [
  { timestamp: '2023-10-09', action: 'Add to Cart', details: 'Failed: Item not available' },
  { timestamp: '2023-10-08', action: 'Login', details: 'Failed: Incorrect password' },
];

const middlewareColumns = [
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Details', dataIndex: 'details', key: 'details' },
];

const userErrorColumns = [
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  { title: 'Action', dataIndex: 'action', key: 'action' },
  { title: 'Details', dataIndex: 'details', key: 'details' },
];


const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

function AdvancedErrorLogs() {
  const [middlewareData, setMiddlewareData] = useState(middlewareLogs);
  const [userErrorData, setUserErrorData] = useState(userErrorLogs);
  const [selectedType, setSelectedType] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filteredMiddlewareData = middlewareData.filter(log => 
    (selectedType ? log.type === selectedType : true) && 
    (searchText ? log.details.includes(searchText) : true)
  );

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>Advanced Error Logs</Title>
      <div className={styles.controls}>
        <Search 
          className={styles.searchBar} 
          placeholder="Search Logs" 
          onSearch={value => setSearchText(value)}
        />
        <Select 
          className={styles.typeSelect} 
          onChange={value => setSelectedType(value)}
          placeholder="Select Type"
        >
          <Option value="Validation">Validation</Option>
          <Option value="Caching">Caching</Option>
        </Select>
      </div>
      <Card title="Middleware Logs" className={styles.card}>
        <Table 
          dataSource={filteredMiddlewareData} 
          columns={middlewareColumns} 
          rowKey="timestamp" 
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Card title="User Error Logs" className={styles.card}>
        <Table 
          dataSource={userErrorData} 
          columns={userErrorColumns} 
          rowKey="timestamp" 
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <PieChart width={400} height={300}>
        <Pie data={middlewareData} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={100} label>
          <Tooltip />
        </Pie>
      </PieChart>
    </div>
  );
}

export default AdvancedErrorLogs;