import React, { useState, useCallback } from 'react';
import { Input, Table, Tooltip, Modal } from 'antd';
import { BarChart, Bar, XAxis, YAxis } from 'recharts'; 
import styles from './ErrorsIssues.module.css';

const { Search } = Input;

const allErrors = {
  "Slide Errors": [
    { 
      id: 1, 
      slide: 'Slide1', 
      description: "Image didn't load.", 
      firstDetected: "2023-10-06 09:23", 
      lastDetected: "2023-10-09 17:00", 
      occurrences: 37, 
      details: "The CDN link was broken. Error 404." 
    },
    { 
      id: 2, 
      slide: 'Slide1', 
      description: "Font not rendering correctly.", 
      firstDetected: "2023-10-06 09:23", 
      lastDetected: "2023-10-09 14:23", 
      occurrences: 24, 
      details: "Font file failed to load." 
    },
    { 
      id: 3, 
      slide: 'Slide2', 
      description: "Image took too long to load.", 
      firstDetected: "2023-10-06 10:30", 
      lastDetected: "2023-10-09 15:30", 
      occurrences: 50, 
      details: "The image size was very large. Consider optimizing." 
    },
    { 
      id: 4, 
      slide: 'Slide2', 
      description: "Animation stutter on load.", 
      firstDetected: "2023-10-07 12:10", 
      lastDetected: "2023-10-09 11:45", 
      occurrences: 27, 
      details: "Slide animations are not optimized for mobile devices." 
    },
    { 
      id: 5, 
      slide: 'Slide3', 
      description: "Misalignment in the slide content.", 
      firstDetected: "2023-10-07 13:23", 
      lastDetected: "2023-10-09 12:30", 
      occurrences: 15, 
      details: "The content box exceeded slide width in mobile view." 
    }
  ],
  "Card Errors": [
    { 
      id: 6, 
      description: "Failed redirect from Card2", 
      firstDetected: "2023-10-06 14:20", 
      lastDetected: "2023-10-08 16:15", 
      occurrences: 13 
    }
  ],
  "Login Errors": [
    { 
      id: 7, 
      description: "User 'alhadji' - Wrong Password", 
      firstDetected: "2023-10-07 09:10", 
      lastDetected: "2023-10-09 11:37", 
      occurrences: 5 
    }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

function ErrorMonitoring() {
  const [searchedError, setSearchedError] = useState("Slide Errors");
  const [modalInfo, setModalInfo] = useState(null);
  
  const handleChange = event => {
    setSearchedError(event.target.value);
  };
  
  const currentErrors = allErrors[searchedError] || [];
  
  const handleOpenModal = useCallback((record) => {
    setModalInfo(record);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalInfo(null);
  }, []);

  const columns = [
    {
      title: 'Slide',
      dataIndex: 'slide',
      key: 'slide',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'First Detected',
      dataIndex: 'firstDetected',
      key: 'firstDetected',
    },
    {
      title: 'Last Detected',
      dataIndex: 'lastDetected',
      key: 'lastDetected',
    },
    {
      title: 'Occurrences',
      dataIndex: 'occurrences',
      key: 'occurrences',
    },
    {
      title: 'More Info',
      dataIndex: 'details',
      key: 'details',
      render: (text, record) => <button onClick={() => handleOpenModal(record)}>Details</button>,
    }
];

  return (
    <div className={styles.container}>
      <div className={styles.actionBar}>
        <Search
          value={searchedError}
          onChange={handleChange}
          placeholder="Search Error Type..."
          style={{ width: '300px' }}
        />
      </div>
      
      <BarChart width={400} height={300} layout="vertical" data={currentErrors}>
        <XAxis type="number"/>
        <YAxis dataKey="slide" type="category"/>
        <Tooltip />
        <Bar dataKey="id" fill="#8884d8" name="Slide Errors"/>
      </BarChart>

      <Table dataSource={currentErrors} columns={columns} rowKey="id" />

      {modalInfo && (
        <Modal
          title={`Details for ${modalInfo.slide}`}
          visible={true}
          onCancel={handleCloseModal}
        >
          <p><strong>Description:</strong> {modalInfo.description}</p>
          <p><strong>Details:</strong> {modalInfo.details}</p>
          <p><strong>Timestamp:</strong> {modalInfo.timestamp}</p>
        </Modal>
      )}
    </div>
  );
}

export default ErrorMonitoring;
