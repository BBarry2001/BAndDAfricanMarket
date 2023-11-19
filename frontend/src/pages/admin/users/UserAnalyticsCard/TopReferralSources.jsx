import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { Modal, Button, List } from 'antd';
import { UserAddOutlined, UserOutlined, ClockCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import styles from './TopReferralSources.module.css';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../../hub/slices/AdminSlice';

const referralData = [
  { name: 'Google', users: 1200, newVisitors: 800, returning: 400, averageDuration: "5 min", conversion: 320 },
  { name: 'Facebook', users: 900, newVisitors: 400, returning: 500, averageDuration: "4 min", conversion: 250 },
];

// MAKE SURE TO ADD A FILTERING BY DATE AND OTHER MEANS TO THIS COMPONENT
// TO FILTER THE GRAPH BY HOW MANY REFERALS FOR FEBRUARY FOR EXAMPLE

const COLORS_LIGHT = ['#8884d8', '#82ca9d'];
const COLORS_DARK = ['#242582', '#198754'];

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const TopReferralSources = () => {
  const darkMode = useSelector(selectDarkMode);
  const colors = darkMode ? COLORS_DARK : COLORS_LIGHT;

  const [modalData, setModalData] = useState(null);

  const onBarClick = data => {
    setModalData(data);
  };

  return (
    <div className={styles.BarChartContainer} style={{ background: darkMode ? '#001F3F' : '#fff' }}>

      <BarChart width={1100} height={400} data={referralData}>
        <CartesianGrid stroke={darkMode ? '#666' : '#ddd'} />
        <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#000'} />
        <YAxis stroke={darkMode ? '#fff' : '#000'} />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" onClick={onBarClick} cursor="pointer">
          {referralData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>

      {modalData && (
        <Modal title={`Details for ${modalData.name}`} visible={Boolean(modalData)} onCancel={() => setModalData(null)} footer={[
          <Button key="back" onClick={() => setModalData(null)} type="primary">
            Close
          </Button>
        ]}>
          <List>
            <List.Item><UserAddOutlined type="user-add" /> New Visitors: {modalData.newVisitors}</List.Item>
            <List.Item><UserOutlined type="user" /> Returning Visitors: {modalData.returning}</List.Item>
            <List.Item><ClockCircleOutlined type="clock-circle" /> Average Session Duration: {modalData.averageDuration}</List.Item>
            <List.Item><ShoppingOutlined type="shopping-cart" /> Conversions (e.g. Purchases): {modalData.conversion}</List.Item>
          </List>
        </Modal>
      )}

    </div>
  );
};

export default TopReferralSources;
