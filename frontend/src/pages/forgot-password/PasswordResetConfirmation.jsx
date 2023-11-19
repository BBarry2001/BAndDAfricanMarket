import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './PasswordResetConfirmation.module.css';

const { Title, Text } = Typography;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function PasswordResetConfirmation() {
  return (
    <div className={styles.container}>
      <CheckCircleOutlined className={styles.successIcon} />
      <Title level={4} className={styles.title}>Success!</Title>
      <Text className={styles.info}>
        Your password has been reset successfully.
      </Text>
      <Text className={styles.nextSteps}>You can now sign in with your new password.</Text>
      <Button type="primary" className={styles.signInButton}>
        <Link to="/login">Sign In</Link>
      </Button>
    </div>
  );
}
