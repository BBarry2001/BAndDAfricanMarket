import React, { useState } from 'react';
import { Button, Input, Form, Upload } from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import styles from './AboutUsConfig.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const AdminAboutUsEditor = () => {
    const [formData, setFormData] = useState({
        headerImage: null, 
        title: "Our Family, Our Market",
        section1: "Hello and welcome to B&D African Market...",
        section2: "I grew up in a simple, but hardworking family...",
        section3: "This is section 3...",
        section4: "This is section 4...",
        quoteTitle: "Your Thoughts, Captured",
        quote: "This is a sample quote.",
        quoteAuthor: "Aisha, Longtime Customer",
        quoteSubText: "Updated Weekly",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleUpload = file => {
        setFormData({
          ...formData,
          headerImage: file,
        });
      };
    
      const handleSubmit = () => {
        console.log("Updated Content:", formData);
      };

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Edit About Us Page</h2>
      <Form onFinish={handleSubmit} className={styles.form}>
      <Form.Item label="Upload Header Image">
          <Upload beforeUpload={() => false} customRequest={({ file }) => handleUpload(file)}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Title">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Section 1">
          <Input.TextArea
            name="section1"
            value={formData.section1}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Section 2">
          <Input.TextArea
            name="section2"
            value={formData.section2}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Section 3">
          <Input.TextArea
            name="section3"
            value={formData.section3}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Section 4">
          <Input.TextArea
            name="section4"
            value={formData.section4}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Quote Title">
          <Input
            name="quoteTitle"
            value={formData.quoteTitle}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Quote">
          <Input
            name="quote"
            value={formData.quote}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Quote Author">
          <Input
            name="quoteAuthor"
            value={formData.quoteAuthor}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Quote SubText">
          <Input
            name="quoteSubText"
            value={formData.quoteSubText}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.saveBtn}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAboutUsEditor;
