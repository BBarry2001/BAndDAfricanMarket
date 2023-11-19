import React, {useState} from 'react';
import { Button, Tooltip, Drawer, Tag, Input, message, Popconfirm } from 'antd';
import styles from './PaymentCardsDrawer.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const CardDrawer = ({ drawerVisible, onCloseDrawer, setAsDefault, deleteCard, 
  cardData, showModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState('');

  const handleEditClick = (nickname) => {
    setIsEditing(true);
    setEditedNickname(nickname ?? '');
  };

  const handleNicknameChange = (index) => {
    const updatedCardData = [...cardData];
    updatedCardData[index].nickname = editedNickname;
    setIsEditing(false);
  };

  const handleSetAsDefault = (index) => {
    message.success('Card set as default!');
    setAsDefault(index);
  };

  const cardSupportLinks = {
    'Visa': 'https://www.visa.com/support',
    'Mastercard': 'https://www.mastercard.com/support',
  };

  const canApply = editedNickname.length <= 15;

  return (
    <Drawer
      title={<div className={styles.drawerTitle}>Manage Payment Methods</div>}
      placement="right"
      closable={true}
      onClose={onCloseDrawer}
      visible={drawerVisible}
      maskClosable={false}
      width={500}
    >
      {cardData.map((card, index) => (
        <div key={index} className={styles.cardContainer}>
          <div className={styles.editButtons}>
            {isEditing ? (
              <>
                <Tooltip title="Maximum 15 characters">
                  <Input
                    value={editedNickname}
                    maxLength={15}
                    onChange={(e) => setEditedNickname(e.target.value)}
                    onBlur={() => handleNicknameChange(index)}
                  />
                </Tooltip>
                <Button disabled={!canApply} onClick={() => handleNicknameChange(index)}>Apply</Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            ) : (
              <>
                <Tag color="gold">{card.nickname || card.name || "No Nickname"}</Tag>
                <Button size="small" onClick={() => handleEditClick(card.nickname)}>Edit</Button>
              </>
            )}
          </div>
          <div>
            <p>{card.name}</p>
            <p>**** **** **** {card.number.slice(-4)}</p>
            <p>Valid Thru: {card.expiry}</p>
            <p>CVC: {card.cvc}</p>
          </div>
          <div className={styles.buttonGroup}>
            <Button className={styles.actionButton} onClick={() => showModal(index)}>Edit Card Details</Button>
            <Button className={styles.actionButton} onClick={() => handleSetAsDefault(index)}>Set As Default</Button>
            <Tooltip title="Contact customer service for issues">
              <Button className={styles.actionButton} onClick={() => window.open(cardSupportLinks[card.name], '_blank')}>Help</Button>
            </Tooltip>
            <Popconfirm title="Are you sure you want to delete this card?" onConfirm={() => deleteCard(index)}>
              <Button className={styles.dangerButton}>Delete</Button>
            </Popconfirm>
          </div>
        </div>
      ))}
    </Drawer>
  );
};

export default CardDrawer;
