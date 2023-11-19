import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import styles from './EnterCode.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function EnterCode({ onNext }) {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(code);  
  };

  const timerColor = timeLeft < 300 ? 'red' : 'black';  

  return (
    <div className={styles.container}>
      <p className={styles.instruction}>Enter the verification code sent to you.</p>
      <p className={styles.timer} style={{ color: timerColor }}>Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input 
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.input}
          placeholder="Enter Code"
        />
        <Button type="primary" htmlType="submit" className={styles.button}>Submit</Button>
      </form>
    </div>
  );
}
