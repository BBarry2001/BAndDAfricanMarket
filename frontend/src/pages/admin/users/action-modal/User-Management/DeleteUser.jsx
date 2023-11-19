import React, { useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../../../hub/slices/AdminSlice'; 
import styles from './DeleteUser.module.css';

/**
 * DeleteUser Component
 * 
 * This component is used for managing the deletion of user accounts by an administrator.
 * It features a multi-step confirmation process to ensure that the action of deleting a user is intentional and validated.
 * 
 * Functional Overview:
 * 1. The component initially shows a button that, when clicked, opens a confirmation modal.
 * 2. The first modal provides a stern warning about the irreversible nature of the action and prompts the admin to consider alternatives.
 * 3. If the admin decides to proceed, they are then taken to a second modal for final security verification.
 * 4. This modal requires the admin to input a special 'admin word' to confirm their identity and authority to perform this action.
 * 5. On successful validation, the component dispatches an action to delete the user, and appropriate notifications are shown based on the outcome.
 * 
 * This implementation emphasizes caution and security, ensuring that user deletion is handled with the necessary seriousness and safeguards.
 * 
 * Usage Note:
 * This component should be used with careful consideration due to the significant impact and irreversible nature of deleting a user account.
 */

export const DeleteUser = ({ setActiveView, record, closeModal, updateCurrentRecord }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAdminValidation, setShowAdminValidation] = useState(false);
  const [adminWord, setAdminWord] = useState('');
  const dispatch = useDispatch();

  const handleFinalDelete = async () => {
    if (!isFormValid()) {
      notification.error({
        message: 'Validation Failed',
        description: 'Please input all required fields.',
      });
      return;
    }
    try {
      await dispatch(deleteUser({ id: record.id, adminWord: adminWord })).unwrap();
      notification.success({
        message: 'User Deleted',
        description: `${record.first_name} ${record.last_name} has been permanently removed.`,
      });
      setShowDeleteConfirm(false);
      setShowAdminValidation(false);
      closeModal();
      updateCurrentRecord(null);
    } catch (error) {
      notification.error({
        message: 'Deletion Failed',
        description: 'Failed to delete the user. Please make sure you have the correct admin permissions.',
      });
    }
  };

  const isFormValid = () => {
    return adminWord.length > 0; 
  };

  return (
    <>
      <Button type="link" onClick={() => setShowDeleteConfirm(true)}>Delete User</Button>
      
      <Modal
          centered
          visible={showDeleteConfirm}
          title="Important Confirmation"
          onCancel={() => setShowDeleteConfirm(false)}
          onOk={() => {
              setShowDeleteConfirm(false);
              setShowAdminValidation(true);
          }}
          okText="Proceed"
          cancelText="Cancel"
          className={styles.confirmationModal}
      >
          <p className={`${styles.warningText} ${styles.strongWarning}`}><strong>Warning:</strong> This action is irreversible.</p>
          <p className={`${styles.warningText}`}>
            You're about to delete a user permanently. This user will lose their account and all associated information. 
            Before proceeding, consider if locking the account might be a better alternative.
            Deletion should only be done under certain circumstances where it's absolutely necessary, such as confirmed fraud or abuse of services.
          </p>
          <p className={styles.considerationText}>
            Take a moment to review the account details thoroughly. Assess the user's activity and consult with your team if necessary to ensure that this is the correct course of action.
            Deleting a user should be a last resort due to the significant impact it has on the individual and the irreversible nature of the process.
          </p>
      </Modal>

      <Modal
        centered
        visible={showAdminValidation}
        title="Final Security Verification"
        onCancel={() => setShowAdminValidation(false)}
        footer={null}
        className={styles.verificationModal}
      >
        <p>Please provide the necessary administrative credentials to finalize this action.</p>
        <Form onFinish={handleFinalDelete} className={styles.adminVerificationForm}>
          <Form.Item
            label="Admin Word"
            name="adminWord"
            rules={[{ required: true, message: 'Please input the admin word!' }]}
          >
            <Input.Password 
              placeholder="Admin Word" 
              value={adminWord}
              onChange={(e) => setAdminWord(e.target.value)} 
            />
          </Form.Item>
          <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className={`${styles.saveButton} ${!adminWord ? styles.disabledButton : ''}`}
                  disabled={!adminWord}
                >
                  Confirm Deletion
                </Button>
              </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
