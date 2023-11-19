import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import styles from './UserEngagement.module.css';

const { Search } = Input;

const engagementData = {
  "Slide1": [
    { version: 'A', interactions: 320, retention: 5.6 },
    { version: 'B', interactions: 290, retention: 6.1 }
  ],
  "Slide2": [
    { version: 'A', interactions: 410, retention: 6.4 },
    { version: 'B', interactions: 378, retention: 6.8 }
  ],
};

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

function UserEngagement() {
  const [selectedSlide, setSelectedSlide] = useState("Slide1");

  const handleChange = event => {
    setSelectedSlide(event.target.value);
  };

  const currentEngagementData = engagementData[selectedSlide] || [];

  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <Search
          value={selectedSlide}
          onChange={handleChange}
          placeholder="Search Slide..."
          style={{ width: '300px' }}
        />
      </div>

      <BarChart width={600} height={300} data={currentEngagementData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="version" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="interactions" fill="#8884d8" />
        <Bar dataKey="retention" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default UserEngagement;
