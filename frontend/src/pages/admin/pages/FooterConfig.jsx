import React, { useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import styles from './FooterConfig.module.css';

const { Title } = Typography;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const AdminFooterEditor = () => {
  const initialData = JSON.parse(localStorage.getItem('footerDraft')) || {
    footerMessage: "You're not just a customer, you're family...",
    phoneNumber: '+1 555-123-4567',
    email: 'bdbusiness61@gmail.com',
    facebookLink: '',
    twitterLink: '',
    googleLink: '',
    instagramLink: '',
    linkedinLink: '',
    githubLink: ''
  };

  const [formData, setFormData] = useState(initialData);

  const [history, setHistory] = useState([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    // Add new history entry
    const newHistory = [...history.slice(0, historyIndex + 1), newFormData];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setFormData(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setFormData(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleSubmit = () => {
    console.log("Updated Footer Content:", formData);

    localStorage.setItem("footerDraft", JSON.stringify(formData));
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>Edit Footer</Title>
      <Form onFinish={handleSubmit} className={styles.form}>
        <Form.Item label="Footer Message" className={styles.formItem}>
          <Input.TextArea
            name="footerMessage"
            value={formData.footerMessage}
            onChange={handleChange}
            className={styles.textArea}
          />
        </Form.Item>
        <Form.Item label="Phone Number" className={styles.formItem}>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="Email" className={styles.formItem}>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="Facebook Link" className={styles.formItem}>
          <Input
            name="facebookLink"
            value={formData.facebookLink}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="Twitter Link" className={styles.formItem}>
          <Input
            name="twitterLink"
            value={formData.twitterLink}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="Google Link" className={styles.formItem}>
          <Input
            name="googleLink"
            value={formData.googleLink}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="Instagram Link" className={styles.formItem}>
          <Input
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="LinkedIn Link" className={styles.formItem}>
          <Input
            name="linkedinLink"
            value={formData.linkedinLink}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item label="GitHub Link" className={styles.formItem}>
          <Input
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className={styles.input}
          />
        </Form.Item>
        <Form.Item className={styles.formItem}>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.preview}>
        <Title level={4}>Preview</Title>
        <div>{formData.footerMessage}</div>
        <div>{formData.phoneNumber}</div>
      </div>

      {/* Save Draft, Undo, and Redo Buttons */}
      <Button onClick={() => localStorage.setItem("footerDraft", JSON.stringify(formData))}>
        Save Draft
      </Button>
      <Button onClick={undo}>Undo</Button>
      <Button onClick={redo}>Redo</Button>
    </div>
  );
};

export default AdminFooterEditor;
