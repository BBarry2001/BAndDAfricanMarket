import React, { useState } from 'react';
import { Button, Modal, notification, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { unlockUserAccount } from '../../../../../hub/slices/AdminSlice';
import styles from './UnlockUser.module.css';

/**
 * UnlockUserAccount Component
 *
 * This component is designed for administrators to unlock user accounts that have been previously locked. 
 * It's used in situations where a locked account needs to be reactivated, either due to a change in circumstances 
 * or after resolving the issues that led to the account being locked.
 *
 * Features:
 * - Displays a modal to confirm the unlocking of a user's account.
 * - Requires an 'admin word' as a security measure to verify the administrator's authority.
 * - Utilizes Redux actions to communicate with the backend for updating the user's lock status.
 * - Provides clear warnings about the implications of unlocking an account.
 * - Ensures that the account is currently locked before allowing the unlock process to proceed.
 * - On successful unlocking, updates the user's record in the admin panel and displays a success notification.
 * - Handles errors gracefully, showing relevant error messages in case of issues.
 *
 * Usage Considerations:
 * - This action should be taken with full understanding of its implications, as it will grant the user full access to their account and its functionalities.
 * - Administrators should ensure that unlocking the account is justified and aligns with organizational policies.
 * - Direct communication with the user about the status change of their account is advised, where applicable.
 * - This component should be used within the admin module under appropriate administrative privileges.
 *
 * Note: The 'admin word' is a crucial part of this process, ensuring that such significant actions are taken by authorized personnel only.
 */

export const UnlockUserAccount = ({ setActiveView, updateCurrentRecord, record }) => {
  const [adminWord, setAdminWord] = useState('');
  const dispatch = useDispatch();

  if (!record.is_locked) {
    notification.info({
      message: 'Account Already Unlocked',
      description: `The account of ${record.first_name} ${record.last_name} is already unlocked.`,
    });
    return null;
  }

  const handleUnlockUser = () => {
    dispatch(unlockUserAccount({ id: record.id, adminWord }))
      .unwrap()
      .then((updatedUser) => {
        notification.success({
          message: 'User Unlocked',
          description: `The account of ${updatedUser.first_name} ${updatedUser.last_name} has been unlocked.`,
        });
        updateCurrentRecord(updatedUser);
        setActiveView('mainOptions');
      })
      .catch((errorResponse) => {
        const errorMessage = errorResponse.error?.error || 'An unexpected error occurred.';
        notification.error({
          message: 'Unlocking Failed',
          description: errorMessage,
        });
      });
  };

  return (
    <Modal
      title={`Unlock ${record.first_name} ${record.last_name}'s Account`}
      visible={true}
      onCancel={() => setActiveView('mainOptions')}
      footer={null}
      className={styles.unlockModal}
    >
      <div className={styles.warningContainer}>
        <p className={styles.warningTitle}><strong>Caution:</strong></p>
        <p className={styles.warningText}>Unlocking an account will allow the user to regain access to their account and any associated services.</p>
        <p className={styles.finalWarning}>Ensure that unlocking the user's account is an appropriate action based on their activity and your organization's policies.</p>
      </div>
      <Form onFinish={handleUnlockUser} className={styles.unlockForm}>
        <Form.Item
          label="Admin Word"
          name="adminWord"
          rules={[{ required: true, message: 'Please input the admin word!' }]}
        >
          <Input.Password 
            placeholder="Admin Word" 
            value={adminWord}
            onChange={(e) => setAdminWord(e.target.value)}
            className={!adminWord ? styles.disabledInput : ''}
          />
        </Form.Item>
        <Button 
          type="primary"
          onClick={handleUnlockUser}
          className={`${styles.saveButton} ${!adminWord ? styles.disabledButton : ''}`}
          disabled={!adminWord}
        >
          Confirm Unlock
        </Button>
      </Form>
    </Modal>
  );
};
