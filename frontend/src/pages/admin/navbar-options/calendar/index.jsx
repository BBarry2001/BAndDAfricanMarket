import React, { useState } from 'react';
import { Badge, Calendar, Button } from 'antd';
import styles from './index.module.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { date: '2023-10-10', type: 'order', status: 'shipped' },
    { date: '2023-10-15', type: 'note', content: 'Meeting with suppliers' },
    { date: '2023-10-20', type: 'revenue', amount: 2000 },
  ]);

  /**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

  const dateCellRender = (value) => {
    const listData = events.filter(e => e.date === value.format('YYYY-MM-DD'));
    return (
      <ul className={styles.events}>
        {listData.map((item, index) => {
          if (item.type === 'order') {
            return <li key={index}><Badge status="processing" text={`Order ${item.status}`} /></li>;
          }
          if (item.type === 'note') {
            return <li key={index}><Badge status="warning" text={item.content} /></li>;
          }
          if (item.type === 'revenue') {
            return <li key={index}><Badge status="success" text={`Revenue: $${item.amount}`} /></li>;
          }
          return null;
        })}
      </ul>
    );
  };

  const handleDateClick = value => {
    setSelectedDate(value.format('YYYY-MM-DD'));
  };

  const handleQuickAdd = () => {
    setEvents([...events, { date: '2023-10-21', type: 'note', content: 'Quick Event' }]);
  };

  return (
    <div className={styles.calendarContainer}>
      <Button onClick={handleQuickAdd}>Quick Add Event</Button>
      <Calendar 
        dateCellRender={dateCellRender} 
        onSelect={handleDateClick} 
      />
      
      {selectedDate && (
        <div className={styles.eventDetail}>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
