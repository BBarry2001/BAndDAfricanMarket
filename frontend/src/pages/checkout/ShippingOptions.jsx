import React, { useState } from 'react';
import { Select, Form, Typography, Checkbox, Tooltip, Switch, Button, Card,  } from 'antd';
import{ InfoCircleOutlined, CheckOutlined, CloseOutlined,  GiftOutlined}  from '@ant-design/icons';

import Style from "./ShippingOptions.module.css"

const { Title, Text } = Typography;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ShippingMethodCard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [deliveryWindow, setDeliveryWindow] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const shippingOptions = [
    { value: 'standard', label: 'Standard Shipping', time: '3-5 days' },
    { value: 'express', label: 'Express Shipping', time: '1-2 days' },
    { value: 'sameday', label: 'Same Day Shipping', time: 'Today' },
  ];

  const deliveryOptions = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
  ];

  const handleShippingChange = (option) => {
    setSelectedOption(option.value);
    setEstimatedTime(option.time);
  };

  return (
    <Card bordered={false}>
      <Form.Item label="Select Shipping Method">
        <Select 
          options={shippingOptions}
          onChange={handleShippingChange} 
        />
        {selectedOption && (
          <>
            <Text type="secondary">You chose {selectedOption}.</Text><br />
            <Text type="secondary">Estimated delivery: {estimatedTime}</Text>
          </>
        )}
      </Form.Item>
      <Form.Item label="Delivery Window">
        <Select 
          options={deliveryOptions} 
          onChange={(option) => setDeliveryWindow(option.value)} 
        />
        {deliveryWindow && <Text type="secondary">You prefer delivery in the {deliveryWindow}.</Text>}
      </Form.Item>
    </Card>
  );
};


const EstimatedDeliveryCard = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltip = () => setShowTooltip(true);
  
  const removeTooltip = () => setShowTooltip(false);

  return (
    <Card bordered={false} className={Style.card}>
      <div className={Style.dynamicDelivery}>
        <Title level={4} className={Style.subtitle}>Estimated Delivery Time</Title>
        <div className={Style.flipClock}>
          <span className={Style.flipUnit}>2-3</span>
          <span className={Style.flipLabel}>business days</span>
          <span 
            className={Style.tooltipIcon} 
            onMouseOver={handleTooltip} 
            onMouseOut={removeTooltip}
            onClick={handleTooltip}
          >
            <span role="img" aria-label="info">❓</span>
            {showTooltip && (
              <span className={Style.tooltipText}>
                Want it faster? Choose Express Shipping!
              </span>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
};


const SubscribeAndSaveCard = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [products, setProducts] = useState([]);

  const handleSubscription = (checked) => {
    setIsSubscribed(checked);
  };

  return (
    <Card bordered={false}>
      <div>
        <Title level={3}><GiftOutlined /> Subscribe and Save! </Title>
        <Tooltip title="By subscribing, you save up to 20% on every order and get exclusive deals!">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
      <Text>If this is a recurring order, consider our subscription service and save up to 20% on every order.</Text>
      <Form.Item className={Style.formItem}>
        <Switch 
          checkedChildren={<CheckOutlined />} 
          unCheckedChildren={<CloseOutlined />} 
          onChange={handleSubscription} 
          className={Style.toggleSwitch}
        />
        <Text type="secondary" className={Style.switchLabel}>Make this a recurring order</Text>
      </Form.Item>
      { isSubscribed && (
        <>
          <Form.Item className={Style.formItem}>
            <Select 
              placeholder="Select Frequency"
              options={[
                { label: "Every Month - Save 10%", value: "monthly" },
                { label: "Bi-Weekly - Save 15%", value: "bi-weekly" },
                { label: "Weekly - Save 20%", value: "weekly" }
              ]}
              onChange={(option) => setFrequency(option.value)}
            />
          </Form.Item>
          <Form.Item className={Style.formItem}>
            <Checkbox.Group 
              options={[
                { label: "All of my product", value: "All" },
                { label: "Product 1", value: "product_1" },
                { label: "Product 2", value: "product_2" },
                { label: "Product 3", value: "product_3" }
              ]}
              onChange={(checkedList) => setProducts(checkedList)}
            />
          </Form.Item>
        </>
      )}
    </Card>
  );
};

const SpecialInstructions = () => {
  const [specialInstructions, setSpecialInstructions] = useState("");

  return (
    <Card bordered={false} className={Style.card}>
      <Form.Item label="Special Instructions">
        <textarea 
          rows="4" 
          placeholder="Leave at back door, etc." 
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)} 
          style={{ width: '100%' }}>
        </textarea>
      </Form.Item>
    </Card>
  );
};

const ShippingOptionsPage = () => {
  const handleClick = () => {
  };

  return (
    <div className={Style.container}>
      <Card className={Style.sideCard}>
        <SideCart />
      </Card>

      <Card className={Style.mainCard}>
        <Title level={2} className={Style.title}>Select Your Shipping Options</Title>
        
        <Form layout="vertical" className={Style.form}>
          <ShippingMethodCard />
          <EstimatedDeliveryCard />
          <SubscribeAndSaveCard />
          <SpecialInstructions />
          
          <Button type="primary" htmlType="submit" className={Style.submitButton}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};


const SideCart = () => {
  const [cart, setCart] = useState([
    { name: "Iphone 11 pro", price: 900, quantity: 2 },
  ]);
  const [promoCode, setPromoCode] = useState("");

  const removeItem = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalCost = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className={Style.cartContent}>

      <Card 
        style={{ 
          backgroundColor: '#1890ff', 
          color: '#fff', 
          borderRadius: '12px' 
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Text strong className="mb-1" style={{ display: 'block' }}>
              Shopping cart
            </Text>
            <Text className="mb-0">You have 4 items in your cart</Text>
          </div>
          <div>
            <Text className="text-muted">
              Sort by:
            </Text>
            <a href="#!" style={{ color: '#fff' }}>
              price
            </a>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div>
                <img 
                  src="your-image-url" 
                  className="rounded-3" 
                  style={{ width: '65px' }} 
                  alt="Shopping item" 
                />
              </div>
              <div className="ms-3">
                <Title level={5} style={{ margin: 0 }}>Iphone 11 pro</Title>
                <Text className="small mb-0">256GB, Navy Blue</Text>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div style={{ width: '50px' }}>
                <Title level={5} style={{ margin: 0 }}>2</Title>
              </div>
              <div style={{ width: '80px' }}>
                <Title level={5} style={{ margin: 0 }}>$900</Title>
              </div>
              <a href="#!" style={{ color: '#cecece' }}>
              </a>
            </div>
          </div>
        </div>
      </Card>
      </div>

    );
  };

export default ShippingOptionsPage;
