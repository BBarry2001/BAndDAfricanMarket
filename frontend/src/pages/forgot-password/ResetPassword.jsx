import React, { useState, useEffect } from 'react';
import { Input, Button, Alert, Typography } from 'antd';
import styles from './ResetPassword.module.css';

const { Title, Text } = Typography;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function ResetPassword( { onNext } ) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();

  };

  return (
    <div className={styles.container}>
      <div className={styles.guidelines}>
        <Text className={styles.criteriaTitle}>Password Requirements:</Text>
        <ul className={styles.criteriaList}>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>Between 8-20 characters</li>
        </ul>
        <Text className={styles.tip}>Tip: Use a phrase and mix it with numbers and symbols for a strong password.</Text>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="New Password"
        />
        <Input 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          placeholder="Confirm New Password"
        />
        {!passwordMatch && <Alert message="Passwords do not match" type="error" showIcon className={styles.alert} />}
        <Button type="primary" htmlType="submit" className={styles.button}>Reset Password</Button>
      </form>
    </div>
  );
}
