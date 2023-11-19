import React, { useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { lockUserAccount } from '../../../../../hub/slices/AdminSlice'; 
import styles from './LockUserAccount.module.css'; 

/**
 * LockUserAccount Component
 *
 * This component provides the functionality to lock a user's account as part of administrative actions. 
 * It's used in situations where an account needs to be suspended due to reasons like security concerns, 
 * policy violations, or upon user request.
 *
 * Features:
 * - Displays a modal for admin confirmation before locking the user's account.
 * - Requires an 'admin word' for an additional security check.
 * - Upon confirmation, it dispatches a Redux action to update the user's status in the backend.
 * - Provides detailed warnings about the consequences of locking an account.
 * - Ensures that the account is not already locked before proceeding with the operation.
 * - On successful account locking, updates the user's record in the admin panel and displays a success notification.
 * - In case of errors or validation failures, displays appropriate error messages.
 *
 * Usage Considerations:
 * - This action should be performed with caution as it restricts the user's access to their account and associated functionalities.
 * - Admins are advised to verify the necessity of this action and consider potential impacts on the user.
 * - Direct communication with the user regarding the account lock is recommended, if applicable.
 * - This component should be used within the admin module with appropriate administrative privileges.
 *
 * Note: The 'admin word' is a security measure to ensure that only authorized personnel can perform critical actions like locking an account.
 */

export const LockUserAccount = ({ record, closeModal, updateCurrentRecord }) => {
  const [adminWord, setAdminWord] = useState('');
  const dispatch = useDispatch();

  if (record.is_locked) {
    notification.info({
      message: 'Account Already Locked',
      description: `The account of ${record.first_name} ${record.last_name} is already locked.`,
    });
    closeModal(); 
    return null; 
  }

  const handleLockUser = async () => {
    if (!adminWord) {
      notification.error({
        message: 'Validation Failed',
        description: 'Please input the admin word!',
      });
      return;
    }
  
    dispatch(lockUserAccount({ id: record.id, adminWord }))
    .unwrap()
    .then((updatedUser) => {
      notification.success({
        message: 'User Locked',
        description: `The account of ${updatedUser.first_name} ${updatedUser.last_name} has been locked.`,
      });
      updateCurrentRecord(updatedUser);
      closeModal();
    })
    .catch((errorResponse) => {
      console.log("the error is: ", errorResponse);
      const errorMessage = errorResponse.error?.error || 'An unexpected error occurred.';
      notification.error({
        message: 'Locking Failed',
        description: errorMessage,
      });
    });
    
};
  
    return (
      <>
       <Modal
      title={`Lock ${record.first_name} ${record.last_name}'s Account`}
      visible={true} 
      onCancel={closeModal} 
      footer={null} 
      className={styles.lockModal}
    >
        <div className={styles.warningContainer}>
          <p className={styles.warningTitle}><strong>Warning:</strong></p>
          <p className={styles.warningText}>Locking an account is a significant action with the following consequences:</p>
          <ul className={styles.warningList}>
            <li>The user will be unable to log in or access their account.</li>
            <li>Any active sessions will be terminated immediately.</li>
            <li>Open orders may be cancelled, and the user's cart will be cleared.</li>
            <li>Recurring subscriptions or services will be suspended.</li>
            <li>Consider reaching out to the user to communicate this action directly.</li>
            <li>Review the user's activity for potential fraud or misuse before locking.</li>
            <li>Explore alternative actions, such as temporary suspension or issuing a warning.</li>
          </ul>
          <p className={styles.finalWarning}>Only proceed if you have verified that this action is necessary and appropriate.</p>
        </div>
        <Form onFinish={handleLockUser} className={styles.lockForm}>
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
          <Form.Item>
        <Button 
          type="primary"
          onClick={handleLockUser} 
          className={`${styles.saveButton} ${!adminWord ? styles.disabledButton : ''}`}
          disabled={!adminWord}
        >
          Confirm Lock
        </Button>
      </Form.Item>
        </Form>
      </Modal>
    </>
  );
};