import React, { useState, useEffect } from 'react';
import {Upload, Modal, notification } from 'antd';
import { SmileOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.css';

import Header from '../../components/header/Navbar';
import Footer from '../../components/Footer';
import PersonalInformation from './PersonalInformation';
import AddressContactInfo from './AddressInfo';
import RecentlyViewedProducts from './RecentlyViewedProducts';
import PaymentCards from './payment-cards';
import ProductReviews from './product-reviews';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const AccountPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isTwoFactorAuth, setTwoFactorAuth] = useState(false);
  const [addressDrawerVisible, setAddressDrawerVisible] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleTwoFactorAuth = () => setTwoFactorAuth(!isTwoFactorAuth);
  const toggleAddressDrawer = () => setAddressDrawerVisible(!addressDrawerVisible);


  useEffect(() => {
    notification.open({
      message: 'Welcome, Barry!',
      description: 'Please upload a profile picture and finish setting up your account.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }, []);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => {
        file.preview = reader.result;
      }
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleProfilePictureChange = async ({ fileList: newProfilePictureList }) => {
    // If there's a new file, upload it
    
    setFileList(newProfilePictureList);
  };
  
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
    <Header />
      <div className={styles.container}>

        <div className={styles.avatarContainer}>
        <Upload
          action="#"  // We handle action in handleProfilePictureChange, so "#" will be a placeholder
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleProfilePictureChange}  // Updated to our new function
          style={{width:'110px'}}
          className={styles.userProfileImage}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
          <span className={styles.userName}>Barry Boubacar</span>
        </div>

        <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        {/* <Progress  /> implement later */}

        <section className={styles.description}>
          <PersonalInformation
            showModal={toggleModal}
            showDrawer={toggleDrawer}
            drawerVisible={drawerVisible}
            onCloseDrawer={toggleDrawer}
          />
        </section>

        <section className={styles.description}>
          <AddressContactInfo
            showAddressDrawer={toggleAddressDrawer}
            closeAddressDrawer={toggleAddressDrawer}
            addressDrawerVisible={addressDrawerVisible}
          />
        </section>

        <section className={styles.description}>
          <PaymentCards showDrawer={toggleDrawer} />
        </section>

        <section className={styles.description}>
          <RecentlyViewedProducts />
        </section>

        <section className={styles.description}>
          <ProductReviews
            showDrawer={toggleDrawer}
            drawerVisible={drawerVisible}
            onCloseDrawer={toggleDrawer}
          />
        </section>

      </div>

      <Footer />
    </>
  );
};

export default AccountPage;
