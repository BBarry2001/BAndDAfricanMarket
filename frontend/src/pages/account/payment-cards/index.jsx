import  { useState } from 'react';
import { Button, Card, Modal, Switch, message, Tag, Popconfirm } from 'antd';
import CreditCard from 'react-credit-cards-2';
import RegistrationPage3Form from '../../../testing-extras/RegistrationPageForm2';
import CardDrawer from './PaymentCardsDrawer'; 

import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const PaymentCards = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [defaultCardIndex, setDefaultCardIndex] = useState(0);
  const [isOrderAgainModalVisible, setIsOrderAgainModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');
  const [showOrderButton, setShowOrderButton] = useState(null);

  const [cardData, setCardData] = useState([
    { number: '4111111111111111', name: 'John Doe', expiry: '10/23', cvc: '123', type: 'visa', lastOrder: '2 Burgers' },
  ]);

  const handleNicknameChange = (index, newNickname) => {
    const updatedCardData = [...cardData];
    updatedCardData[index].nickname = newNickname;
    setCardData(updatedCardData);  
  };

  const showOrderAgainModal = (card) => {
    setCurrentOrder(card.lastOrder);
    setIsOrderAgainModalVisible(true);
  };

  const handleOrderAgainOk = () => {
    message.success(`Successfully re-ordered: ${currentOrder}`);
    setIsOrderAgainModalVisible(false);
  };

  const handleOrderAgainCancel = () => {
    setIsOrderAgainModalVisible(false);
  };

  const showModal = () => {
    if (cardData.length < 3) {
      setIsModalVisible(true);
    } else {
      message.error('You can add up to 3 cards only.');
    }
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success("Card successfully added!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteCard = (index) => {
    const newCardData = [...cardData];
    newCardData.splice(index, 1);
    setCardData(newCardData);
  };

  const setAsDefault = (index) => {
    setDefaultCardIndex(index);
  };

  const orderAgain = (card) => {
    showOrderAgainModal(card);
  };
  
  return (
    <>
      <Card className={styles.Card}>
        <div className={styles.headerContainer}>
          <h2 className={styles.header}>Saved Payment Cards</h2>
          <div className={styles.buttonGroup}>
            <Button type="primary" className={styles.addNewCardButton} onClick={showModal}>
              Add New Card
            </Button>
            <Button type="primary" onClick={showDrawer}>
              Manage Payment Methods
            </Button>
          </div>
        </div>
        <div className={styles.cardList}>
        {cardData.map((item, index) => (
            <div className={styles.cardItem} key={index}>
              <div className={`${styles.cardHoverArea} ${styles.cardGreyOut}`}>
              <h3>{item.nickname || item.name}</h3>
                <CreditCard
                  number={item.number}
                  name={item.name}
                  expiry={item.expiry}
                  cvc={item.cvc}
                  preview={true}
                  issuer={item.type}
                />
              </div>
              <div className={styles.cardStatus}>
                <Tag color={defaultCardIndex === index ? 'green' : 'blue'}>
                  {defaultCardIndex === index ? 'Default' : 'Non-Default'}
                </Tag>
                <Tag color="red">Expires Soon!</Tag>
                <Button onClick={() => orderAgain(item)}>Order Again</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <CardDrawer 
        drawerVisible={drawerVisible} 
        onCloseDrawer={onCloseDrawer} 
        setAsDefault={setAsDefault}
        deleteCard={deleteCard}
        cardData={cardData}
        showModal={showModal}
        handleNicknameChange={handleNicknameChange} 
      />

      <Modal
      title="Confirm Order Again"
      visible={isOrderAgainModalVisible}
      onOk={handleOrderAgainOk}
      onCancel={handleOrderAgainCancel}
      >
      <p>Are you sure you want to re-order: {currentOrder}?</p>
      </Modal>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <span key="setDefaultLabel" style={{ float: 'left' }}>Set as Default</span>,
          <Switch key="setAsDefault" defaultChecked style={{ float: 'left', marginLeft: '10px' }} onChange={() => setAsDefault(cardData.length)} />,
          
          <Popconfirm key="popConfirm" title="Are you sure you want to cancel?" onConfirm={handleCancel} okText="Yes" cancelText="No">
            <Button type="default" danger style={{ marginLeft: 'auto' }}>
              Cancel
            </Button>
          </Popconfirm>,

          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <RegistrationPage3Form showHeader={true} showCard={true} showFields={true} showNavButton={false} showBottomButtons={false} />
      </Modal>
    </>
  );
};

export default PaymentCards;
