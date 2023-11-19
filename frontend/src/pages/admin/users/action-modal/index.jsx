import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './index.module.css';
import { EditUserForm } from './User-Management/EditUser';
import { ChangePasswordForm } from './User-Management/ChangePassword';
import { DeleteUser } from './User-Management/DeleteUser';
import { LockUserAccount } from './User-Management/LockUser';
import { UnlockUserAccount } from './User-Management/UnlockUser';


import UserAnalytics from './UserAnalytics';
import Communication from './Communication';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ActionModal = ({ visible,currentRecord, closeModal, updateCurrentRecord }) => {
  const [activeView, setActiveView] = useState('mainOptions');

  const handleCloseModal = () => {
    setActiveView('mainOptions');
    closeModal();
  };
  
  return (
    <Modal
      maskClosable={false}
      visible={visible}
      onCancel={handleCloseModal}
      footer={null}
      className={styles.modalContent}
      width="75%" 

    >
      {activeView === 'mainOptions' && (
        <> 
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>User Management</h3>
            <Button type="link" onClick={() => setActiveView('editUser')}>Edit User's General Information</Button>
            <Button type="link" onClick={() => setActiveView('changePassword')}>Change User Password</Button>
            <DeleteUser closeModal={closeModal} record={currentRecord} updateCurrentRecord={updateCurrentRecord} setActiveView={setActiveView} />
            <Button type="link" onClick={() => setActiveView('takeNoteOnUser')}>Add Notes On User</Button> 
            <Button type="link" onClick={() => {/* Do something */}}>View User Purchase History</Button>
            <Button type="link" onClick={() => {/* Do something */}}>View Addresses On File</Button>
            <Button type="link" onClick={() => {/* Do something */}}>Banking Related Information</Button>
            <Button type="link" onClick={() => setActiveView('lockUser')}>Lock Account</Button>
            <UnlockUserAccount updateCurrentRecord={updateCurrentRecord} record={currentRecord} setActiveView={setActiveView} />
          </div>
          
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>User Analytics</h3>
            <Button type="link" onClick={() => {/* Do something */}}>Login History</Button>
            <Button type="link" onClick={() => {/* Do something */}}>Activity Log</Button>
            <Button type="link" onClick={() => {/* Do something */}}>User Metrics</Button>
          </div>

          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Communication</h3>
            <Button type="link" onClick={() => {/* Do something */}}>Send Email</Button>
            <Button type="link" onClick={() => {/* Do something */}}>Send Notification</Button>
          </div>

          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Miscellaneous</h3>
            <Button type="link" onClick={() => {/* Do something */}}>Export to CSV</Button>
          </div>
        </>
      )}

      {activeView === 'editUser' && (
        <EditUserForm record={currentRecord} updateCurrentRecord={updateCurrentRecord} setActiveView={setActiveView} />
      )}
      {activeView === 'changePassword' && (
        <ChangePasswordForm record={currentRecord} setActiveView={setActiveView} />
      )}
      {activeView === 'lockUser' && (
      <LockUserAccount
        record={currentRecord}
        closeModal={() => setActiveView('mainOptions')}
        updateCurrentRecord={updateCurrentRecord}
      />
    )}


      {activeView === 'userAnalytics' && <UserAnalytics />}
      {activeView === 'communication' && <Communication />}
      {/* ... Other conditions for other views ... */}
    </Modal>
);
};


export default ActionModal;