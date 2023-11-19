import React, { useState } from 'react';
import { Descriptions, Modal, Form, Button, Drawer, Card, Tag, Popconfirm, 
message, Select } from 'antd';
import styles from './AddressInfo.module.css';
import RegistrationPage2Form from '../../testing-extras/RegistrationPageForm2';

const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */


const AddressContactInfo = ({ showAddressDrawer, closeAddressDrawer, addressDrawerVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressFormValues, setAddressFormValues] = useState({});
  const [defaultType, setDefaultType] = useState('none');

  const [addresses, setAddresses] = useState([
    { id: 1, street: "456 Another St", street2: "Apt 203", city: "Denver", state: "CO", zip: "80203", type: "shipping" },
    { id: 2, street: "789 Sample St", street2: "2nd flor", city: "Austin", state: "TX", zip: "73301", type: "billing" }
  ]);

  const handleModalVisibility = (visible) => {
    setIsModalVisible(visible);
  };

  const addAddress = (address, defaultType) => {
    if (defaultType) {
      addresses.forEach(existingAddress => {
        if (existingAddress.type === defaultType) {
          existingAddress.type = 'none';
        }
      });
    }
    setAddresses([...addresses, { ...address, id: addresses.length + 1, type: defaultType || 'none' }]);
    message.success("Address successfully added!");
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
    message.success("Address successfully removed!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleAddressType = (id, newType) => {
    const updatedAddresses = addresses.map(address => {
      if (address.id === id) {
        return {...address, type: newType};
      }
      return address;
    });
    setAddresses(updatedAddresses);
  };

  const handleToggleConfirm = (id, newType) => {
    const updatedAddresses = addresses.map(address => {
      if (address.id === id) {
        return {...address, type: newType};
      } else if (address.type === newType) {
        return {...address, type: 'none'};
      }
      return address;
    });
    setAddresses(updatedAddresses);
    message.success(`Address type changed to ${newType}`);
  };

  const getToggleText = (currentType) => {
    if (currentType === 'billing') return 'Switch to Shipping';
    if (currentType === 'shipping') return 'Switch to Billing';
    return 'Set Type';
  };
  
  const getTypeTag = (type) => {
    if (type === 'both') return "Shipping and Billing";
    return type;
  };

  const renderDescriptionAddresses = () => {
    const shippingAddress = addresses.find(address => address.type === 'shipping');
    const billingAddress = addresses.find(address => address.type === 'billing');
  
    const renderAddress = (address, type) => (
      <Descriptions bordered={true} layout="horizontal" style={{marginTop:'40px'}} className={styles.description} key={address?.id || type} title={type}>
        <Descriptions.Item span={2} className={styles.labelStyle} label="Street">{address?.street || 'N/A'}</Descriptions.Item>
        <Descriptions.Item span={2} className={styles.labelStyle} label="Street 2">{address?.street2 || 'N/A'}</Descriptions.Item>
        <Descriptions.Item span={2} className={styles.labelStyle} label="City">{address?.city || 'N/A'}</Descriptions.Item>
        <Descriptions.Item span={2} className={styles.labelStyle} label="State">{address?.state || 'N/A'}</Descriptions.Item>
        <Descriptions.Item span={2} className={styles.labelStyle} label="ZIP">{address?.zip || 'N/A'}</Descriptions.Item>
      </Descriptions>
    );
  
    return (
      <>
        {renderAddress(shippingAddress, 'shipping')}
        {renderAddress(billingAddress, 'billing')}
      </>
    );
  };
  

  return (
    <>
      <Card className={styles.Card}>
        <div className={styles.headerContainer}>
          <h2 className={styles.header}>Addresses</h2>
          <div className={styles.buttonGroup}>
            <Button type="primary" className={styles.button} onClick={() => handleModalVisibility(true)}>Add an Address</Button>
            <Button type="primary" onClick={showAddressDrawer} className={styles.button}>Manage Addresses</Button>
          </div>
        </div>
        
        {renderDescriptionAddresses()}
      </Card>

  <Drawer
    title={<div className={styles.drawerTitle}>Manage Addresses</div>}
    placement="right"
    closable={true}
    onClose={closeAddressDrawer}
    visible={addressDrawerVisible}
    maskClosable={false}
    width={500}
  >

    {addresses.map((address, index) => (
      <div key={index} className={styles.cardContainer}>
        <div className={styles.editButtons}>
          <h4>{address.street}</h4>
          <Tag color={address.type === 'billing' ? "blue" : "green"}>{getTypeTag(address.type)}</Tag>
      </div>
      <div>
        <p>Street 2: {address.street2}</p>
        <p>City: {address.city}</p>
        <p>State: {address.state}</p>
        <p>ZIP: {address.zip}</p>
      </div>
      <div className={styles.buttonGroup}>
      <Popconfirm title={`Are you sure you want to ${getToggleText(address.type)}?`}
              onConfirm={() => handleToggleConfirm(address.id, address.type === 'billing' ? 'shipping' : 'billing')}>
        <Button className={styles.actionButton} type="link">{getToggleText(address.type)}</Button>
      </Popconfirm>   

      <Button className={styles.actionButton} type="link">Set as Current</Button>
      <Button className={styles.actionButton} type="link">Edit</Button>
        
      <Popconfirm title="Are you sure you want to delete this address?" onConfirm={() => removeAddress(address.id)}>
        <Button className={styles.dangerButton} type="link">Delete</Button>
      </Popconfirm>

      </div>
    </div>
    ))}
  </Drawer>

  <Modal
    visible={isModalVisible}
    onCancel={handleCancel}
    footer={null}
    width={800}
  >
  <RegistrationPage2Form 
    headerText="Add a new address" 
    showContinueButton={false}
    showGoBack={false}
    showSkipButton={false}
    showToggle={false}
  />
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom:'20px' }}>
      
      <Form.Item 
          label="Set address as Current:"
          name="addressType"
        >
        <Select defaultValue="none">
          <Option value="none">None</Option>
          <Option value="billing">Billing</Option>
          <Option value="shipping">Shipping</Option>
          <Option value="both">Both</Option>
        </Select>
      </Form.Item>

        <Popconfirm title="Sure to cancel?" onConfirm={handleCancel} okText="Yes" cancelText="No">
          <Button type="danger" danger style={{ marginRight: '10px' }}>Cancel</Button>
        </Popconfirm>

        <Button type="primary" style={{ marginRight: '25px' }} onClick={() => {addAddress(addressFormValues, defaultType); handleCancel(); }}>Add Address</Button>

    </div>
  </Modal>
    </>
  );
};

export default AddressContactInfo;