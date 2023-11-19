import React, { useState } from 'react';
import { Input, DatePicker, Select, List, Badge, Button } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar
} from 'recharts';
import styles from './GeneralActivities.module.css';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

// THIS COMPONENT IS TO SHOW THE STATS AND INFO ON DIFFERNET TYPE OF WHAT AND HOW USERS INTERACTS WITH
// PARTS OF THE WEBSITE

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const allData = {
  "Slide Interactions": {
    description: "Tracks the time users spend on each slide. Highlights potential areas of interest or confusion.",
    data: [{ name: 'Slide1', time: 40 }, { name: 'Slide2', time: 50 }, /*...*/]
  },
  "Card Interactions": {
    description: "Monitors the frequency of card clicks. Helpful for debugging any redirection issues.",
    data: [{ name: 'Card1', clicks: 200 }, { name: 'Card2', clicks: 150 }, /*...*/]
  },
  "Social Media Interactions": {
    description: "Counts user clicks on social media icons. Useful for gauging engagement.",
    data: [{ name: 'Facebook', clicks: 250 }, { name: 'Twitter', clicks: 180 }, /*...*/]
  },
};

function UserActivityAnalytics() {
  const [searchedInteraction, setSearchedInteraction] = useState("Slide Interactions");
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [userSegment, setUserSegment] = useState('Registered Users');

  const handleChange = event => {
    setSearchedInteraction(event.target.value);
  };

  const currentData = allData[searchedInteraction] || {
    description: '',
    data: []
  };

  return (
    <div className={styles.container}>

      <div className={styles.actionBar}>
        <Search
          value={searchedInteraction}
          onChange={handleChange}
          placeholder="Search User Interaction..."
          style={{ width: '300px' }}
        />
        <RangePicker onChange={setSelectedDateRange} style={{ marginLeft: '10px' }}/>
        <Select value={userSegment} onChange={setUserSegment} style={{ marginLeft: '10px', width: 200 }}>
          <Option value="Registered Users">Registered Users</Option>
          <Option value="Guest Users">Guest Users</Option>
        </Select>
      </div>

      <div className={styles.activityCard}>
        <p>{currentData.description}</p>
        
        <List
          size="small"
          header={<div>Top Active Users</div>}
          dataSource={[
            'User123',
            'User456',
            'User789',
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
        />

        <Badge 
          count={`Engagement Score: ${calculateEngagementScore()}`} 
          style={{ backgroundColor: '#52c41a', marginTop: '20px' }}
        />

        <div className={styles.chartContainer}>
          {searchedInteraction === "Slide Interactions" && (
            <LineChart width={400} height={200} data={currentData.data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="time" stroke="#8884d8" />
            </LineChart>
          )}
          {(searchedInteraction === "Card Interactions" || searchedInteraction === "Social Media Interactions") && (
            <BarChart width={400} height={200} data={currentData.data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#82ca9d" />
            </BarChart>
          )}
        </div>
      </div>
    </div>
  );

  function calculateEngagementScore() {
    return 85;
  }
}

export default UserActivityAnalytics;