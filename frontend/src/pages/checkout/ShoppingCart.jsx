import React, { useState } from 'react';
import { Card, Col, Row, Button, Image, InputNumber } from 'antd';
import styles from './ShoppingCart.module.css';
import { DeleteOutlined } from '@ant-design/icons';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

function ShoppingCart({ nextStepShipping }) {
  const [cartItems, setCartItems] = useState([
    {
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp",
      name: "iPad Air",
      color: "#fdd8d2",
      quantity: 1,
      price: 799,
      tax: 0,
    },
    {
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/2.webp",
      name: "iPhone",
      color: "#000000",
      quantity: 1,
      price: 999,
      tax: 0,
    },
    {
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp",
      name: "Macbook Air",
      color: "#ffffff",
      quantity: 1,
      price: 1099,
      tax: 0,
    },
  ]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity >= 1) {
      const newItems = [...cartItems];
      newItems[index].quantity = newQuantity;
      setCartItems(newItems);
    }
  };

  const deleteItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const totalCost = cartItems.reduce((acc, item) => acc + (item.price * item.quantity) + item.tax, 0);


  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <Col span={24}>
          <Row className={styles.headerRow}>
            <h2 className={styles.cartLabel}>Your Shopping Cart</h2>
            <h4 className={styles.itemLabel}>Thank you for shopping with B&D African Market</h4>
          </Row>

          {cartItems.length === 0 ? (
            <Row justify="center">
              <Card className={styles.emptyCartCard}>
                <h3>Whoops! Your cart is looking a bit empty.</h3>
                <p>Click the button below to find something you'll love.</p>
                <Button href="/" className={styles.ContinueShoppingButton}>Start Shopping</Button>
              </Card>
            </Row>
          ) : (
            cartItems.map((item, index) => (
                <Card key={index} className={styles.cartCard}>
              <Row align="middle">
                <Col span={4}>
                  <Image width={200} src={item.image} />
                </Col>
                <Col span={4}>
                  <p className={styles.textMuted}>Product</p>
                  <h3 className={styles.title}>{item.name}</h3>
                </Col>
                <Col span={4}>
                  <p className={`${styles.textMuted} ${styles.adjusted}`}>Quantity</p>
                  <Button onClick={() => updateQuantity(index, item.quantity - 1)}>-</Button>
                  <InputNumber min={1} max={100} style={{ width: '50px' }} value={item.quantity} onChange={(val) => updateQuantity(index, val)} />
                  <Button onClick={() => updateQuantity(index, item.quantity + 1)}>+</Button>
                </Col>
                <Col span={4}>
                    <p className={styles.textMuted}>Price</p>
                    <h3 className={styles.title}>${item.price * item.quantity}</h3>
                </Col>
                <Col span={3}>
                  <p className={styles.textMuted}>Tax</p>
                  <h3 className={styles.title}>${item.tax}</h3>
                </Col>
                <Col span={3}>
                  <p className={styles.textMuted}>Total</p>
                  <h3 className={styles.title}>${(item.price * item.quantity) + item.tax}</h3>
                </Col>
                <Col span={2}>
                    <Button onClick={() => deleteItem(index)} icon={<DeleteOutlined />} style={{color: 'red'}} />
                </Col>
              </Row>
            </Card>
          ))
          )}
          <Row align="middle" justify="end" className={styles.totalRow}>
            <h2 className={styles.BottomTotal}>Total: ${totalCost}</h2>
          </Row>
          <Row justify="end" className={styles.buttonRow}>
            <Button className={styles.ContinueShoppingButton} href="/">Continue Shopping</Button>
            <Button className={styles.CheckoutButton} onClick={nextStepShipping}>Checkout</Button>
          </Row>
        </Col>
      </div>
    </section>
  );
}

export default ShoppingCart;