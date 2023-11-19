import React, { useState } from 'react';
import { Button, Badge } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import { FaMoon, FaSun, FaRegStickyNote } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, selectDarkMode } from '../../../../hub/slices/AdminSlice';
import NoteTakingAdmin from '../../navbar-options/notes/NewNoteModal';

import QuickOrderLookup from './QuickOrderLookup';
import ProductAlerts from './ProductAlerts';
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const FloatingButton = () => {
  const [hovered, setHovered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.floatingButtonGroup} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Badge count={1} style={{ backgroundColor: '#f5222d' }}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<ToolOutlined />}
          className={styles.floatingButton}
        />
      </Badge>
      {hovered && (
        <>
          <Button
            shape="circle"
            icon={darkMode ? <FaSun /> : <FaMoon />}
            onClick={handleThemeToggle}
            className={styles.floatingButton}
          />

          <Button
            shape="circle"
            icon={<FaRegStickyNote />}
            onClick={openModal} 
            className={styles.floatingButton}
          />

          <QuickOrderLookup />
          <ProductAlerts />

          <NoteTakingAdmin isModalVisible={isModalVisible} closeModal={closeModal} />
        </>
      )}
    </div>
  );
};

export default FloatingButton;
