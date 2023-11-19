import React from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from 'recharts';

import styles from './DashboardOverview.module.css';

const engagementData = [
  { name: 'Slides', value: 400 },
  { name: 'Cards', value: 300 },
  { name: 'Other UI Elements', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const errorData = [
  { name: 'Image Load Failures', count: 100 },
  { name: 'External Link Errors', count: 80 },
  { name: 'Login Errors', count: 50 },
  { name: 'Checkout Errors', count: 40 },
  { name: 'Misc Errors', count: 30 },
];

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

function DashboardOverview() {
  return (
    <div className={styles.container}>
      <h2>Dashboard Overview</h2>
      
      <div className={styles.chartsContainer}>

        {/* Pie Chart for User Engagement */}
        <div className={styles.pieChartContainer}>
          <h3>Parts Of The Website With The Most Engagement</h3>
          <ResponsiveContainer width="50%" height={300}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {
                  engagementData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.barChartContainer}>
          <h3>Common Issues/Errors Experienced By Users</h3>
          <ResponsiveContainer width="50%" height={300}>
            <BarChart data={errorData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className={styles.additionalData}>
        <h3>Other Key Insights</h3>
        <p>Here, you can add any other significant data or insights you want to share. This could be text-based insights, links to other analytics, or any other type of info you think is essential for this dashboard overview.</p>
        <ul>
          <li>Most Active Time of Day: 2PM - 4PM</li>
          <li>Least Active Time of Day: 3AM - 5AM</li>
          <li>Most Popular Product Category: Groceries</li>
          <li>Most Viewed Product: African Yam</li>
          <li>Number of Active Promos: 3</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardOverview;
