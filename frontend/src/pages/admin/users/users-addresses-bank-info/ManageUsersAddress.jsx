import React, { useState, useEffect } from 'react';
import { Input, Button, Table } from 'antd';
import style from './ManageUsersAddress.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ManageUsersAddress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock Data
  const mockUsers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      shipping: '123 Main St, New York, NY',
      billing: '321 Wall St, New York, NY',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      shipping: '789 Side St, Los Angeles, CA',
      billing: '987 Back St, Los Angeles, CA',
    },
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleSearch = () => {
    if (!searchTerm) {
      setUsers(mockUsers);
      return;
    }

    const filteredUsers = mockUsers.filter(user => 
      user.email.includes(searchTerm) ||
      user.firstName.includes(searchTerm) ||
      user.lastName.includes(searchTerm)
    );
    setUsers(filteredUsers);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping',
    },
    {
      title: 'Billing Address',
      dataIndex: 'billing',
    },
    {
      title: 'Actions',
      render: (record) => (
        <Button onClick={() => setSelectedUser(record)}>Edit Address</Button>
      ),
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.searchSection}>
        <Input.Search
          className={style.searchInput}
          placeholder="Search by email, first or last name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
  
      <div className={style.tableSection}>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          className={style.usersTable}
        />
      </div>
  
      {selectedUser && (
        <div className={style.userDetail}>
          <h3 className={style.userDetailTitle}>Selected User: {selectedUser.email}</h3>
        </div>
      )}
    </div>
  );
  
};

export default ManageUsersAddress;
