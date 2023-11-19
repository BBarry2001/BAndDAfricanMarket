import { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { UsersTableColumns } from './UsersTableColumns';
import queryString from 'query-string';
import ActionModal from '../action-modal';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode, fetchUsers, setFilters, selectUsers, selectPagination, setCurrentPage } from '../../../../hub/slices/AdminSlice';
import styles from './index.module.css';

/**
 * UsersTable Component
 *
 * The UsersTable component presents a dynamic table displaying user data fetched from the backend. 
 * It's an essential tool for administrators to manage users on the website.
 *
 * Features:
 * - Displays a list of users with essential details fetched from the server.
 * - Provides functionality to search and filter users based on various criteria.
 * - Supports pagination to handle a large number of user records efficiently.
 * - Allows administrators to select multiple users for bulk actions.
 * - Integrates with custom `ActionModal` for performing specific actions on selected users.
 * - Implements dark mode toggling to enhance visual comfort for different environments.
 *
 * Interactivity:
 * - Pagination controls to navigate through user pages.
 * - Search and reset functionality for each column to filter users based on specific attributes.
 * - Selection checkboxes for performing bulk operations.
 * - Opens a modal for detailed actions (edit, lock, unlock, delete) on a particular user.
 * - Updates URL query parameters to reflect the current state of pagination and filters, enabling bookmarking and sharing of specific views.
 *
 * Implementation Notes:
 * - Utilizes Redux for state management, handling actions like fetching users, setting filters, and updating pagination.
 * - Leverages Ant Design's `Table` and `Form` components for the UI, ensuring a consistent and user-friendly experience.
 * - Employs custom hooks from React Router (`useLocation`, `useNavigate`) for URL manipulation and navigation.
 * - Uses `useSelector` and `useDispatch` from React Redux to access and modify the global state.
 * - Implements `useEffect` hooks for fetching data based on dependency changes and for synchronizing URL query parameters with the component state.
 *
 * Usage Considerations:
 * - This component is intended for use in the admin panel and is protected by appropriate authentication and authorization checks.
 * - Tthe backend API endpoints supports the necessary operations (fetching, searching, filtering) and adheres to security best practices.
 * - Regularly updates and maintains this component to reflect changes in user management requirements and data structures.
 *
 * Note: The implementation of this component assumes a specific data structure returned from the backend. Any changes to the backend data model should be reflected in the component's logic and UI.
 */

const UsersTable = () => {
  const users = useSelector(selectUsers);
  const pagination = useSelector(selectPagination);
  const currentPage = useSelector((state) => state.admin.pagination.currentPage);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read the current page from the URL when the component mounts
useEffect(() => {
  const queryParams = queryString.parse(location.search);
  const pageFromUrl = parseInt(queryParams.page, 10) || 1;
  
  // Only dispatch if pageFromUrl is different to avoid unnecessary updates
  if (pageFromUrl !== pagination.currentPage) {
    dispatch(setCurrentPage(pageFromUrl));
  }
}, [location.search, dispatch]); // Removed currentPage from the dependencies array

// Dispatch an action to fetch users when the component mounts or when currentPage changes
useEffect(() => {
  dispatch(fetchUsers({ page: currentPage, filters: pagination.filters }));
}, [dispatch, currentPage, pagination.filters]);

// Update the URL when the current page changes
useEffect(() => {
  const queryParams = queryString.parse(location.search);
  const newQueryParams = { ...queryParams, page: currentPage };
  const searchString = queryString.stringify(newQueryParams);

  if (location.search !== `?${searchString}`) {
    navigate({
      search: searchString,
    });
  }
}, [currentPage, navigate, location.search]); // Now it updates the URL without triggering a new fetch

  const handleTableChange = (newPagination) => {
    if (newPagination.current !== currentPage) {
      setSelectedRowKeys([]);
    }
      dispatch(setCurrentPage(newPagination.current));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const openModal = (record) => {
    setCurrentRecord(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const updateCurrentRecord = (updatedUser) => {
    setCurrentRecord(updatedUser);
  };
  

const handleSearch = (selectedKeys, dataIndex) => {
  // Only if selectedKeys has value and it's not a function (defensive programming)
  if (selectedKeys.length && typeof selectedKeys[0] !== 'function') {
    const filters = { ...pagination.filters, [dataIndex]: selectedKeys[0] };
    dispatch(setFilters(filters)); // Set the filters in the state
    dispatch(fetchUsers({ page: 1, filters: filters })); // Fetch new filtered data
  }
};

// Reset the specific column filter
const handleReset = (clearFilters, dataIndex) => {
  clearFilters(); // Clear filters for UI
  const filters = { ...pagination.filters };
  delete filters[dataIndex]; // Remove specific filter from the state
  dispatch(setFilters(filters)); // Update the filters in the state
  dispatch(fetchUsers({ page: 1, filters: filters })); // Fetch new data without the filter
};
    
  const columns = UsersTableColumns({
    handleSearch,
    handleReset,
    searchedColumn,
    searchText,
    openModal
  });
  
    const darkMode = useSelector(selectDarkMode); // Retrieving dark mode state   

return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}>
        <div className={styles.tableFrame}>
        <Table
        style={{marginTop:'20px'}}
        dataSource={users}
        rowKey="id"
        onChange={handleTableChange}
        title={() => (
        <Space>
            <span className={styles.tableTitle}>The Database Table Of All Users On The Website</span>
            {selectedRowKeys.length > 0 && (
              <>
                <Button onClick={() => openModal(null)}>Actions</Button>
                <Button onClick={() => setSelectedRowKeys([])}>Clear Selection</Button>
                <span>You have selected {selectedRowKeys.length} user(s)</span>
              </>
            )}
          </Space>
        )}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns} 
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: pagination.totalItems,
          showSizeChanger: true, 
          showQuickJumper: true, 
          simple: false, 
          
        }}
      />
      </div>
      <ActionModal 
      visible={modalVisible} 
      closeModal={closeModal}
      currentRecord={currentRecord}
      updateCurrentRecord={updateCurrentRecord} // Pass the update function down to ActionModal
    />

 </div>
  );
}
export default UsersTable;
