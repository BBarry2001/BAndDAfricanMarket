import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './EnterNames.module.css'; 

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function EnterNames({ onNext }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate names here if needed
    onNext({ firstName, lastName });
  };

  return (
 
      <form className={styles.cardBody} onSubmit={handleSubmit}>
        <p className={styles.instruction}>Please enter the first and last name associated with this account to continue.</p> {/* Instruction */}
        <div className={styles.field}>
          <label htmlFor="firstName" className={styles.label}>First Name</label>
          <Input 
            name="firstName"
            id="firstName"
            placeholder="Enter your first name"
            size="large"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="lastName" className={styles.label}>Last Name</label>
          <Input 
            name="lastName"
            id="lastName"
            placeholder="Enter your last name"
            size="large"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Button type="primary" htmlType="submit" className={styles.button}>Continue</Button>
      </form>
    
  );
}
