import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { changeUserPassword } from '../../../../../hub/slices/AdminSlice'; 
import { useLoading } from '../../../../../components/feedback-ui/contexts/loading-componenets/LoadingContext';

import styles from './ChangePassword.module.css';

/**
 * Component for changing a user's password.
 * It allows an admin to update a user's password in the system.
 * 
 * Props:
 * - record: Object containing user details.
 * - setActiveView: Function to set the active view in the parent component.
 */

export const ChangePasswordForm = ({ record, setActiveView }) => {
  const [adminWord, setAdminWord] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading(); 

  const passwordRules = [
    { required: true, message: 'Please input the password!' },
    { min: 8, max: 20, message: 'Password must be between 8-20 characters.' },
    { pattern: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'), message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.' },
  ];

  const confirmPasswordRules = [
    { required: true, message: 'Please confirm the password!' },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('newPassword') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The two passwords that you entered do not match!'));
      },
    }),
  ];

  const handleSubmit = async (values) => {
    try {
      showLoading();
      await dispatch(changeUserPassword({ 
        userId: record.id,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        adminWord: adminWord 
      })).unwrap();
      notification.success({
        message: 'Password Changed',
        description: `The password for ${record.first_name} ${record.last_name} has been updated successfully.`,
      });
      hideLoading();
      setActiveView('mainOptions');
    } catch (error) {
      hideLoading();
      if (error?.error?.errors) {
        const errorEntries = Object.entries(error.error.errors);
        const formattedErrors = errorEntries
          .map(([key, value]) => `<li style="padding: 5px 0;">${value}</li>`)
          .join('');
        notification.error({
          message: 'Failed to Change Password',
          description: (
            <div 
              dangerouslySetInnerHTML={{ __html: formattedErrors }} 
              style={{ padding: '10px' }} 
            />
          ),
          duration: 6,
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'An unknown error occurred. Please try again.',
          duration: 6,
        });
      }
    }
  };

  return (
    <Form
      layout="vertical"
      className={styles.formContainer}
      onFinish={handleSubmit}
      form={form}
    >

      <div className={styles.header}>
        <Button 
          type="default" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => setActiveView('mainOptions')} 
          className={styles.backButton}
        >
          Back to Options
        </Button>
      </div>

      <h2>Change {record.first_name} {record.last_name}'s Password</h2>

      <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true, message: 'Please input the current password!' }]}>
        <Input.Password className={styles.inputField} placeholder="Current Password" />
      </Form.Item>

      <Form.Item label="New Password" name="newPassword" rules={passwordRules}>
        <Input.Password className={styles.inputField} placeholder="New Password" />
      </Form.Item>

      <Form.Item label="Confirm New Password" name="confirmPassword" rules={confirmPasswordRules}>
        <Input.Password className={styles.inputField} placeholder="Confirm New Password" />
      </Form.Item>

      <Form.Item label="Admin Word Verification" name="adminWord" rules={[{ required: true, message: 'Please input the admin word!' }]}>
        <Input.Password 
          className={styles.inputField} 
          placeholder="Admin Word" 
          value={adminWord}
          onChange={(e) => setAdminWord(e.target.value)}
        />
      </Form.Item>

      <p className={styles.warningMessage}>
        Warning: Changing a user's password will require them to log in with the new password. 
        Ensure that this action is at the user's request or with their consent. 
        Communicate the new password securely to the user to prevent unauthorized access.
      </p>

      <Form.Item shouldUpdate>
        {() => (
          <Button 
            type="primary" 
            htmlType="submit" 
            className={styles.saveButton}
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().some(({ errors }) => errors.length)
            }
          >
            Save
          </Button>
        )}
      </Form.Item>

    </Form>
  );
};
