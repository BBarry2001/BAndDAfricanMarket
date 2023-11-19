import React, { useState } from 'react';
import { Button, Modal, Input, Search } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './QuickOrderLookup.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const QuickOrderLookup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSearch = (value) => {
    console.log("Searching for Order:", value);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button 
        shape="circle"
        icon={<SearchOutlined />} 
        onClick={showModal}
        className={styles.button}
      />
      <Modal
        title="Quick Order Lookup"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default buttons
      >
        <Input.Search
          placeholder="Enter Order ID or Customer Name"
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </Modal>
    </>
  );
};

export default QuickOrderLookup;
