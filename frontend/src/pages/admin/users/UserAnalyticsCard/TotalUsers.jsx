import React, { useState } from 'react';
import { Select, Slider } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine, Dot
} from 'recharts';
import styles from './TotalUsers.module.css';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../../hub/slices/AdminSlice'; 

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const TotalUsers = () => {
  const darkMode = useSelector(selectDarkMode);
  const bgColor = darkMode ? '#001F3F' : '#fff';
  const gridColor = darkMode ? '#fff' : '#ddd';
  const textColor = darkMode ? '#eee' : '#333';
  const chartLineColor = darkMode ? "#A0AEC0" : "#333"; 
  const selectStyle = darkMode ? { color: '#eee', backgroundColor: '#444', borderColor: '#666' } : {};
  const sliderStyle = darkMode ? { color: '#eee', backgroundColor: '#444' } : {};
  const sliderMarkStyle = darkMode ? { color: '#fff' } : {};

  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedMonthRange, setSelectedMonthRange] = useState([1, 12]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const data = {
    2022: [
      { name: 'Jan', users: 400 },
      { name: 'Feb', users: 450 },
      { name: 'Mar', users: 500 },
      { name: 'Apr', users: 530 },
      { name: 'May', users: 560 },
      { name: 'Jun', users: 600 },
      { name: 'Jul', users: 620 },
      { name: 'Aug', users: 640 },
      { name: 'Sep', users: 660 },
      { name: 'Oct', users: 690 },
      { name: 'Nov', users: 700 },
      { name: 'Dec', users: 730 },
    ],
    2021: [
      { name: 'Jan', users: 300 },
      { name: 'Feb', users: 310 },
      { name: 'Mar', users: 320 },
      { name: 'Apr', users: 330 },
      { name: 'May', users: 340 },
      { name: 'Jun', users: 350 },
      { name: 'Jul', users: 360 },
      { name: 'Aug', users: 370 },
      { name: 'Sep', users: 380 },
      { name: 'Oct', users: 390 },
      { name: 'Nov', users: 400 },
      { name: 'Dec', users: 410 },
    ],
  };
  
 const handleSliderChange = value => {
    setSelectedMonthRange(value);
  };

  const handleYearChange = year => {
    setSelectedYear(year);
  };

  const handleMonthSelect = monthIndex => {
    setSelectedMonth(monthIndex);
  };

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const currentData = payload[0].payload;
      const previousMonthIndex = data[selectedYear].findIndex(item => item.name === currentData.name) - 1;
      const previousData = data[selectedYear][previousMonthIndex];
  
      const difference = previousData ? currentData.users - previousData.users : 0;
      const arrow = difference >= 0 ? "🔼" : "🔽";
      const color = difference >= 0 ? "green" : "red";
  
      return (
        <div className={styles.customTooltip}>
          <p>{`Current Users: ${currentData.users}`}</p>
          <p style={{ color }}>{`${arrow} ${Math.abs(difference)} users since ${previousData ? previousData.name : 'start'}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomDot = props => {
    const { cx, cy, value } = props;
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={5}
        fill={value > 500 ? 'red' : 'green'}
      />
    );
  };

  const getPeakMonths = data => {
    let sortedData = [...data].sort((a, b) => b.users - a.users);
    let top3 = sortedData.slice(0, 3).map(item => item.name);
    return top3;
  }

  let peakMonths = getPeakMonths(data[selectedYear]);

  return (
    <div className={styles.chartContainer} style={{ backgroundColor: bgColor }}>
      <div className={styles.controls}>
        <Select 
          defaultValue={2022} 
          style={{ ...selectStyle, width: 120 }} 
          dropdownStyle={darkMode ? { backgroundColor: '#444' } : {}}
          onChange={handleYearChange}>
          {Object.keys(data).map(year => (
            <Select.Option key={year} value={year}>{year}</Select.Option>
          ))}
        </Select>

        <Select 
          defaultValue="All" 
          style={{ ...selectStyle, width: 120, marginLeft: '10px' }} 
          dropdownStyle={darkMode ? { backgroundColor: '#444' } : {}}
          onChange={handleMonthSelect}>
          <Select.Option value="All">All Months</Select.Option>
          {data[selectedYear].map((monthData, index) => (
            <Select.Option key={monthData.name} value={index + 1}>{monthData.name}</Select.Option>
          ))}
        </Select>

        <Slider 
            range 
            defaultValue={[1, 12]} 
            min={1} 
            max={12} 
            marks={{ 1: <span style={sliderMarkStyle}>Jan</span>, 12: <span style={sliderMarkStyle}>Dec</span> }} 
            style={{ ...sliderStyle, marginTop: '20px', width: '100%' }}
            onChange={handleSliderChange} 
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
      <LineChart 
          data={data[selectedYear].slice(selectedMonthRange[0] - 1, selectedMonthRange[1])}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis tickFormatter={(tick) => `${tick} users`} stroke={textColor} />
          <Tooltip content={customTooltip} />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke={chartLineColor} 
            fillOpacity={1}
            dot={renderCustomDot}
            animationDuration={2000} 
          />
          {/* Adding reference lines for peak months */}
          {peakMonths.includes('Jan') && <ReferenceLine x="Jan" stroke="red" />}
          {peakMonths.includes('Feb') && <ReferenceLine x="Feb" stroke="green" />}
          {peakMonths.includes('Mar') && <ReferenceLine x="Mar" stroke="blue" />}
          {/* ... Add for other months as needed */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUsers;
