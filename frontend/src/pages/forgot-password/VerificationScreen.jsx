import React from 'react';
import { Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'; 
import styles from './VerificationScreen.module.css';

export default function VerificationScreen({ contact, onNext, version }) {
  const isPhone = version === 'phone';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verification</h2>
      {isPhone ? <PhoneOutlined className={styles.icon} /> : <MailOutlined className={styles.icon} />} {/* Show the correct icon based on the version */}
      <p className={styles.text}>
        We've sent a verification code to <strong>{contact}</strong>. Please check your {isPhone ? 'phone' : 'email inbox, spam, or promotions folder'}.
      </p>
      <p className={styles.subText}>Didn't receive it? It might take a few minutes to arrive.</p>
      <Button type="primary" className={styles.button} onClick={onNext}>Send Code</Button>
    </div>
  );
}
