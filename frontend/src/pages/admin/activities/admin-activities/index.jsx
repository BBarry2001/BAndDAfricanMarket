import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import AdminActivityTable from './AdminActivityTable'; 
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const AdminActivity = () => {
  const [graphData, setGraphData] = useState([
    { name: 'May', uv: 200 },
    { name: 'June', uv: 300 },
    { name: 'July', uv: 100 }
  ]);

  return (
    <div className={styles.container}>
      <LineChart width={1000} height={300} data={graphData}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={3} />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>

      <AdminActivityTable graphData={graphData} />
    </div>
  );
};

export default AdminActivity;
