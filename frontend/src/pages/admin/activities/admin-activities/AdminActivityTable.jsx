import React, { useState } from 'react';
import { Table, Input, DatePicker, Button, Select } from 'antd';
import { SearchOutlined, ReloadOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './AdminActivityTable.module.css'; // Our new module CSS

const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const AdminActivityTable = ({ graphData }) => {
  
  const getActionIcon = (action) => {
    if (action === 'User Created') {
      return <span style={{ color: 'green' }}><UserAddOutlined /> {action}</span>;
    }
    if (action === 'Post Deleted') {
      return <span style={{ color: 'red' }}><DeleteOutlined /> {action}</span>;
    }
    return action;
  };

  const [data, setData] = useState([
    {
      key: '1',
      action: 'User Created',
      userEmail: 'user1@example.com',
      adminEmail: 'admin1@example.com',
      timestamp: '2022-05-21',
    },
    {
      key: '2',
      action: 'Post Deleted',
      userEmail: 'user2@example.com',
      adminEmail: 'admin2@example.com',
      timestamp: '2022-05-22',
    }
  ]);
  
  const [selectedRows, setSelectedRows] = useState([]);
  
  const refreshData = () => {
    setData([
      // Updated data goes here...
    ]);
  };

  const handleRowSelection = (selectedRowKeys) => {
    setSelectedRows(selectedRowKeys);
  };

  const handleBatchActions = () => {
    console.log('Selected rows for batch actions:', selectedRows);
  };

  const columns = [
    {
      title: '',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (action) => getActionIcon(action),

    },
    {
      title: 'User Email',
      dataIndex: 'userEmail',
    },
    {
      title: 'Admin Email',
      dataIndex: 'adminEmail',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      render: (text, record) => (
        <Button type="link" onClick={() => console.log('Showing details for', record)}>
          Details
        </Button>
      ),
    }
  ];


  const rowSelection = {
    onChange: handleRowSelection,
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchBar}>
        <Input placeholder="Global Search" prefix={<SearchOutlined />} />
        <RangePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ format: 'HH:mm:ss' }}
        />
        <Select className={styles.actionFilter} defaultValue="All Actions">
          <Option value="User Created">User Created</Option>
          <Option value="Post Deleted">Post Deleted</Option>
        </Select>
        <Button icon={<ReloadOutlined />} onClick={refreshData}>
          Refresh
        </Button>
        <Button onClick={handleBatchActions}>Batch Actions</Button>
      </div>
      <Table 
        rowSelection={rowSelection} 
        dataSource={data} 
        columns={columns} 
        className={styles.table}
      />
    </div>
  );
};

export default AdminActivityTable;
