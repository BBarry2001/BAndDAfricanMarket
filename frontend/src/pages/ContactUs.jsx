import React from 'react';
import { Form, Input, Button, Typography, notification, Space } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import styles from './ContactUs.module.css';
import image from '../images/MomImage.png';
import Header from '../components/header/Navbar'; 
import Footer from '../components/Footer'; 

const { Title } = Typography;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ContactUsPage = () => {
  const onFinish = (values) => {
    notification.open({
      message: 'Thank You!',
      description: 'Your message has been received. We will get back to you ASAP.',
    });
    console.log('Received values:', values);
  };

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <Title level={1}>Contact Us</Title>
          <Form onFinish={onFinish} className={styles.contactForm}>
            <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="phone">
              <Input prefix={<PhoneOutlined />} placeholder="Phone" />
            </Form.Item>
            <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
              <Input.TextArea placeholder="Your Message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <div className={styles.linkRow}>
            <a>Terms of Service</a> | <a>Privacy Policy</a> | <a>Returns Policy</a> | <a>Shipping and Delivery</a>
          </div>
          </Form>
          <Space className={styles.socialIcons}>
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
          </Space>
        </div>
        <div className={styles.rightSection}>
          <img src={image} alt="Sample" />
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default ContactUsPage;
