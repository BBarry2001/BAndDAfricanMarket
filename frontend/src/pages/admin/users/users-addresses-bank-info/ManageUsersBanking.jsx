import React, { useState } from 'react';
import { Table, Input, Space, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ManageUsersBankInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    { key: 1, name: "John", bank: "Bank of America", account: "1234567890" },
    { key: 2, name: "Jane", bank: "Wells Fargo", account: "9876543210" },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Bank',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Account Number',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => console.log("View User ", record)}>View</a>
        </Space>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ margin: '20px' }}>
      <Card style={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Input
          placeholder="Search Users"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: '20px' }}
        />
        <Table columns={columns} dataSource={mockData.filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
      </Card>
    </div>
  );
};

export default ManageUsersBankInfo;
