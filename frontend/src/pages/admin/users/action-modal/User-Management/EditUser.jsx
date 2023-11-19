import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, notification, Row, Col} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './EditUser.module.css';
import {  useDispatch } from 'react-redux';
import { editUserDetails } from '../../../../../hub/slices/AdminSlice';
import { useLoading } from '../../../../../components/feedback-ui/contexts/loading-componenets/LoadingContext';

const { Option } = Select;

/**
 * EditUserForm Component
 * 
 * This component is responsible for editing the details of a specific user account. It is designed for administrative use,
 * allowing for updates to a user's first name, last name, email, phone number, and preferred language.
 * 
 * Key Features:
 * - It provides a form with pre-filled fields based on the selected user's current information.
 * - Administrators can modify these details and submit the form for changes to take effect.
 * - The component uses Redux Thunk actions to communicate these changes to the backend.
 * - Before submission, admin verification is required through an 'admin word', enhancing security.
 * - The form includes several checks and validations to ensure data integrity and user experience.
 * - On successful submission, the user details are updated in the state, and a success notification is displayed.
 * - In case of errors, appropriate error messages guide the admin for corrective actions.
 * 
 * Usage Considerations:
 * - This component emphasizes careful editing of user details due to the potential impact on user experience and security.
 * - Admins are advised to make changes after due consideration and preferably with user consent.
 * - Changes to sensitive fields like email and phone number should be communicated to the user directly.
 * 
 * Note: This component is part of the admin module and should be used with appropriate administrative privileges.
 */


export const EditUserForm = ({ record, setActiveView, updateCurrentRecord }) => {
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading(); 
  const [adminWord, setAdminWord] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [initialValues, setInitialValues] = useState({
    first_name: record.first_name,
    last_name: record.last_name,
    email: record.email,
    phone_number: record.phone_number,
    preferred_language: record.preferred_language, 
  });

  useEffect(() => {
    // Set the initialValues when the component is mounted or when the record changes
    setInitialValues({
      first_name: record.first_name,
      last_name: record.last_name,
      email: record.email,
      phone_number: record.phone_number,
      preferred_language: record.preferred_language, 
    });
  }, [record]);

  const handleEditUser = (newValues) => {
    const languageMap = { 'English': 'en', 'French': 'fr' };
    // Map preferred language to its code if changed
    if (newValues.preferred_language) {
      newValues.preferred_language = languageMap[newValues.preferred_language] || newValues.preferred_language;
    }
    // Reduce to only the values that have changed
    const changedValues = Object.keys(newValues).reduce((acc, key) => {
      if (newValues[key] !== initialValues[key]) {
        acc[key] = newValues[key];
      }
      return acc;
    }, {});

    // Check if there are changes other than the adminWord
  const hasUserDetailsChanged = Object.keys(changedValues).length > 0;

     // Proceed only if user details have changed
  if (hasUserDetailsChanged) {
    setIsSubmitting(true);
    showLoading();

    const payload = {
      userID: record.id,
      userDetails: { ...changedValues, adminWord }
    };
    dispatch(editUserDetails(payload))
      .unwrap()
      .then((updatedUser) => {
        console.log('the updated user is: ', updatedUser)
        notification.success({
          message: 'Success',
          description: `${updatedUser.first_name} ${updatedUser.last_name}'s information was successfully updated.`
        });
        updateCurrentRecord(updatedUser); 
        setInitialValues(updatedUser); 
        setActiveView('mainOptions');
      })
      .catch((error) => {
        let formattedFieldErrors = [];
        let adminWordError = '';
      
        let errorMessages = {
          first_name: "The first name should contain only alphabets and spaces (e.g., 'John').",
          last_name: "The last name should contain only alphabets and spaces (e.g., 'Doe').",
          email: "Please enter a valid email address (e.g., 'user@example.com').",
          phone_number: "The phone number must be 10 digits (e.g., '1234567890').",
          preferred_language: "The preferred language selection is invalid."
        };
      
        if (error?.error) {
          if (error.error.error === "Invalid admin word.") {
            adminWordError = "The admin word entered is incorrect.";
          }
      
          // Handle other field errors
          Object.entries(error.error).forEach(([field, fieldErrors]) => {
            if (field !== 'error' && fieldErrors.length > 0) { // Exclude the admin word error field
              const errorMessage = errorMessages[field] || `Error in field ${field}`;
              formattedFieldErrors.push(`<li>${errorMessage}</li>`);
            }
          });
        } else if (error?.message) {
          formattedFieldErrors.push(`<li>${error.message}</li>`);
        } else if (error?.httpErrorCode) {
          formattedFieldErrors.push(`<li>HTTP Error Code: ${error.httpErrorCode}</li>`);
        }
      
        if (adminWordError) {
          notification.error({
            message: 'Admin Word Error',
            description: adminWordError,
            duration: 6,
          });
        }
      
        const formattedErrorMessage = formattedFieldErrors.length > 0
          ? `<ul>${formattedFieldErrors.join('')}</ul>`
          : '<p>An unknown error occurred. Please try again.</p>';
      
        if (formattedFieldErrors.length > 0) {
          notification.error({
            message: 'Update Failed',
            description: (
              <div dangerouslySetInnerHTML={{ __html: formattedErrorMessage }} />
            ),
            duration: 6,
          });
        }
      })    
      .finally(() => {
        hideLoading();
        setIsSubmitting(false); 
      });
      
    } else {
      notification.info({
        message: 'No Changes Detected',
        description: "It looks like you didn't make any changes to the user's details. Please make any changes you need and try saving again.",
        duration: 6, 
      });
    }
    
  };

const handleAdminWordChange = (event) => {
  setAdminWord(event.target.value); 
};

  return (
    <Form
      layout="vertical"
      initialValues={{
        first_name: record.first_name,
        last_name: record.last_name,
        email: record.email,
        phone_number: record.phone_number,
        preferred_language: record.preferred_language === 'en' ? 'English' : 'fr' ? 'French' : 'No preferred Language - Default English',
      }}
      className={styles.formContainer}
      onFinish={handleEditUser}
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
      
      <div className={styles.formFields}>
      <Row gutter={24} className={styles.formRow}> 
        <Col span={12}>
          <Form.Item label="First Name" name="first_name">
            <Input placeholder="First Name" className={styles.inputField}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="last_name">
            <Input placeholder="Last Name" className={styles.inputField}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}> 
        <Col span={12}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" className={styles.inputField}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone Number" name="phone_number">
            <Input placeholder="Phone Number" className={styles.inputField}/>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Preferred Language" name="preferred_language">
        <Select className={styles.selectField}>
          <Option value="en">English</Option>
          <Option value="fr">French</Option>
        </Select>
      </Form.Item>
        <div className={styles.warningMessages}>
          <p className={styles.warningHeader}>Important Considerations Before Editing User Information:</p>
          <ul className={styles.warningList}>
            <li>Changing a user's <strong>name</strong> will affect how they are addressed across the platform and in communications.</li>
            <li>Modifying the <strong>email address</strong> can impact the user's ability to log in or receive important notifications and should only be done at the user's request or with their consent.</li>
            <li>Updates to the <strong>phone number</strong> should be verified to maintain the integrity of two-factor authentication and other security measures.</li>
            <li>Altering the <strong>preferred language</strong> may affect the user's experience and the language of the content they receive.</li>
            <li>Ensure that all changes respect the user's privacy and adhere to data protection laws.</li>
            <li>Communicate any changes made to the user's account to them directly to avoid confusion or security concerns.</li>
          </ul>
        </div>

        <Form.Item label="Admin Word Verification" name="adminWord">
  <Input
    placeholder="Enter Admin Word"
    className={styles.inputField}
    value={adminWord}
    onChange={handleAdminWordChange}
  />
</Form.Item>

       <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.saveButton}
        >
          Save Changes
        </Button>
      </Form.Item>
      </div>
    </Form>
  );
};
