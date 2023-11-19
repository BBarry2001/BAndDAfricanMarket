import React from 'react';
import { Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

/**
 * UsersTableColumns Component
 *
 * The UsersTableColumns component is responsible for defining the columns of the users' table in the admin interface.
 * It provides functionalities like filtering, searching, and custom rendering for each column.
 *
 * Features:
 * - Columns for user ID, user type, names, email, phone number, preferred language, account status, and actions.
 * - Search and filter functionality for user names, email, and roles.
 * - Custom rendering for phone numbers, language, account status (active/inactive), and account lock status.
 * - Dynamic rendering of user roles and status with color-coded tags.
 * - Provides a button in each row for performing actions on the respective user record.
 *
 * Implementation:
 * - Utilizes Ant Design's `Table`, `Button`, `Input`, `Tag`, and `Select` components for building the table structure.
 * - Incorporates `react-highlight-words` for highlighting search results within the table.
 * - Defines a `getColumnSearchProps` function to apply search capabilities to specified columns.
 * - Formats phone numbers for better readability.
 * - Maps language codes and user roles to readable formats and assigns corresponding colors for visual distinction.
 * - Includes conditional rendering based on the user's status (active/inactive) and lock status.
 *
 * Usage:
 * - This component is used as a part of the `UsersTable` component in the admin interface.
 * - It enhances the user management experience by providing a clear and interactive display of user information.
 *
 * Note: The component's functionality is closely tied to the data structure of user records. Any changes in the user data model should be reflected in the component's logic.
 *
 * 
*/

export const UsersTableColumns = ({
  handleSearch,
  handleReset,
  searchedColumn,
  searchText,
  openModal
}) => {
    
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
        return `(${match[1]})-${match[2]}-${match[3]}`;
        }
        return null;
    };

    const roleColors = {
        admin: '#f50',
        staff: '#87d068',
        user: '#108ee9',
      };
    
      const languageMap = {
        en: 'English',
        fr: 'French',
      };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters, dataIndex)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) => {
    return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '';
  },
  render: text =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
      {
        title: 'User type',
        dataIndex: 'roles',
        key: 'roles',
        filters: [
          { text: 'Admin', value: 'admin' },
          { text: 'Staff', value: 'staff' },
          { text: 'User', value: 'user' },
        ],
        onFilter: (value, record) => record.roles.indexOf(value) === 0,
        render: (role) => {
          const color = roleColors[role] || 'grey';
          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        },
      },
      {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'firstName',
      ...getColumnSearchProps('first_name'),
    },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'lastName',
        ...getColumnSearchProps('last_name'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email'),
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phoneNumber',
        render: (text) => {
          const formattedPhoneNumber = formatPhoneNumber(text);
          return formattedPhoneNumber ? formattedPhoneNumber : 'N/A';
        },
      },
      {
        title: 'Preferred Language',
        dataIndex: 'preferred_language',
        key: 'preferredLanguage',
        filters: [
          { text: 'English', value: 'en' },
          { text: 'French', value: 'fr' },
        ],
        onFilter: (value, record) => record.preferred_language.startsWith(value),
        render: languageCode => languageMap[languageCode] || 'Not set',
      },
      {
        title: 'Status',
        dataIndex: 'is_active',
        key: 'status',
        render: isActive => <Tag color={isActive ? 'green' : 'volcano'}>{isActive ? 'Active' : 'Inactive'}</Tag>,
        filters: [
          { text: 'Active', value: true },
          { text: 'Inactive', value: false },
        ],
        onFilter: (value, record) => record.is_active === value,
      },
      {
        title: 'Account Locked',
        dataIndex: 'is_locked',
        key: 'locked',
        render: isLocked => <Tag color={isLocked ? 'volcano' : 'green'}>{isLocked ? 'Locked' : 'Unlocked'}</Tag>,
        filters: [
          { text: 'Locked', value: true },
          { text: 'Unlocked', value: false },
        ],
        onFilter: (value, record) => record.is_locked === value,
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Button type="primary" onClick={() => openModal(record)}>Actions</Button>
        ),
      },
  ];
};
