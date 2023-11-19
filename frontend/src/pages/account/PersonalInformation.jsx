import React, { useState } from 'react';
import { Descriptions, Button, Switch, Drawer, Input, Radio, Popconfirm, message, 
Form, Card } from 'antd';
import styles from './PersonalInformation.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const PersonalInformation = ({ showDrawer, drawerVisible, onCloseDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(null);  

  const toggleEdit = (field) => {
    if (isEditing === field) {
      message.success(`${field} updated successfully!`);
    }
    setEditing(isEditing === field ? null : field); 
  };

  const fields = [
    { name: 'First Name', type: 'text', initialValue: 'Barry' },
    { name: 'Last Name', type: 'text', initialValue: 'Al Hadji' },
    { name: 'Email', type: 'email', initialValue: 'barry@email.com' },
    { name: 'Password', type: 'password', initialValue: '******' },
    { name: 'Phone Number', type: 'tel', initialValue: '123-456-7890' },
    { name: 'Preferred Language', type: 'select', initialValue: 'English', options: ['English', 'Spanish'] },
  ];

  return (
    <>
    <Card className={styles.Card}>

    <h2 className={styles.header}>Personal Information</h2> 
      <Descriptions bordered layout="horizontal" style={{ tableLayout: 'fixed' }}>
        {fields.map((field) => (
          <Descriptions.Item label={field.name} key={field.name} className={styles.labelStyle}>
            {field.name !== 'Date of Birth' && isEditing === field.name ? ( 
              <Form onFinish={() => setLoading(true)}>
                <Form.Item
                  name={field.name}
                  rules={[{ required: true, message: 'This field is required!' }]}
                >
                  <Input className={styles.inputField} defaultValue={field.initialValue} />
                </Form.Item>
                <div className={styles.buttonGroup}>
                  <Popconfirm title="Are you sure to save?" onConfirm={() => toggleEdit(field.name)}>
                  <Button className={styles.buttonSave} loading={loading} type="primary" htmlType="submit">
                    Save
                  </Button>
                  </Popconfirm>
                  <Button className={styles.buttonCancel} danger onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </Form>
            ) : (
              <>
                 {field.initialValue}
                {field.name !== 'Date of Birth' && (
                  <span className={`${styles.editSpan}`} onClick={() => toggleEdit(field.name)}>
                    Edit
                  </span>
                )}
              </>
            )}
          </Descriptions.Item>
        ))}
        <Descriptions.Item className={styles.labelStyle} label="Subscribe to Newsletters">
          <Radio.Group defaultValue="yes">
            <Radio.Button value="yes">Yes</Radio.Button>
            <Radio.Button value="no">No</Radio.Button>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item className={styles.labelStyle} label="Notifications">
          <span onClick={showDrawer} style={{cursor: 'pointer', textDecoration: 'underline'}}>
            Manage Notifications
          </span>
        </Descriptions.Item>
      </Descriptions>
      <Drawer
        title="Notification Settings"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerVisible}
      >
        <Switch defaultChecked onChange={() => {}}>Order Updates</Switch>
        <Switch onChange={() => {}}>Promotions</Switch>
      </Drawer>

      </Card>

    </>
  );
};

export default PersonalInformation;
