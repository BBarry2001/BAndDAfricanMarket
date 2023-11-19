import React from 'react';
import ReactDOM from 'react-dom/client';
import BAndDAfricanMarket from './routes/index';  
import './index.css';  

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <React.StrictMode>
    <BAndDAfricanMarket />
  </React.StrictMode>
);
