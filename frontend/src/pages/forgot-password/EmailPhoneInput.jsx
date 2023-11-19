import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styles from './EmailPhoneInput.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function EmailInput({ onNext }) {
  const [inputError, setInputError] = useState(false);

  const validateInput = (input) => {
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
    const phoneValid = /^\d{10}$/.test(input);
    const isValid = emailValid || phoneValid;
    setInputError(!isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.emailOrPhone.value;
    if (validateInput(input)) {
      onNext(input);
    }
  };

  return (
    <form className={styles.cardBody} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="emailOrPhone" className={styles.label}>Email or Phone Number</label>
        <Input 
          name="emailOrPhone"
          id="emailOrPhone"
          placeholder="Enter your registered email or phone number"
          prefix={<MailOutlined />}
          size="large"
          onChange={() => setInputError(false)}
          className={inputError ? styles.error : null}
        />
        {inputError && <div className={styles.errorText}>Please enter a valid email address or phone number</div>}
      </div>
      <Button type="primary" htmlType="submit" className={styles.button}>Continue</Button>
      <div className={styles.infoText}>
        If you're having trouble retrieving your account, don't hesitate to {' '}
        <Link to="/contact-us" className={styles.link}>contact us</Link>. We are more than willing to assist you.
      </div>
    </form>
  );
}
