import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts';
import { Modal } from 'antd';
import styles from './CurrentlyOnline.module.css';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../../hub/slices/AdminSlice'; 

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const currentlyOnlineData = [
  { name: 'All users', value: 4000, registered: 3200, guests: 800 }, 
  { name: 'Online', value: 200, registered: 150, guests: 50 },
  { name: 'Offline', value: 3800, registered: 3050, guests: 750 },
];

const CurrentlyOnline = () => {
  const darkMode = useSelector(selectDarkMode);
  const bgColor = darkMode ? '#001F3F' : '#fff';
  const textColor = darkMode ? '#eee' : '#333';
  const gridColor = darkMode ? '#666' : '#ddd';
  const barColors = ['#82ca9d', '#0088FE', '#FF8042'];
  
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleBarClick = (data) => {
    setModalData(data);
    setVisible(true);
  };

  return (
    <div className={styles.PieContainer} style={{ backgroundColor: bgColor }}>

      <BarChart width={1050} height={400} data={currentlyOnlineData} style={{ backgroundColor: bgColor }}>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip />
        <Legend />
        {['value', 'registered', 'guests'].map((key, i) => (
          <Bar key={key} dataKey={key} fill={barColors[i]} onClick={handleBarClick} />
        ))}
      </BarChart>

      {modalData && (
        <Modal visible={visible} onCancel={() => setVisible(false)} title={modalData.name}>
          <p>Total Users: {modalData.value}</p>
          <p>Registered Users: {modalData.registered}</p>
          <p>Guest Users: {modalData.guests}</p>
          <p>Average Session Duration: {Math.floor(Math.random() * 30) + 5} mins</p> 
        </Modal>
      )}

    </div>
  );
};

export default CurrentlyOnline;
