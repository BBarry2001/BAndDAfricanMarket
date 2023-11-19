import React, { useState } from 'react';
import { Steps } from 'antd';
import { ShoppingCartOutlined, SolutionOutlined, CreditCardOutlined, CarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';
import Navbar from '../../components/header/Navbar';
import Footer from '../../components/Footer';

import ShoppingCart from './ShoppingCart';
import ShippingDetails from './ShippingDetails';
import ShippingOptions from './ShippingOptions';
import PaymentOptions from './PaymentOptions';

const { Step } = Steps;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

function CheckoutMultiStepForm() {
  const [step, setStep] = useState(1); 
  const navigate = useNavigate(); 

  const nextStepShipping = () => {

    setStep((prevStep) => prevStep + 1);
  };

  const prevStepShipping = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const finalStep = () => {
    console.log("Final step called");
    navigate('/confirmation');
  };

  const renderCheckoutForm = () => {
    switch (step) {
      case 1:
        return <ShoppingCart nextStepShipping={nextStepShipping} prevStepShipping={prevStepShipping} />;
      case 2:
          return <ShippingDetails nextStepShipping={nextStepShipping} prevStepShipping={prevStepShipping} />;
      case 3:
        return <ShippingOptions nextStepShipping={nextStepShipping} prevStepShipping={prevStepShipping} />;
      case 4:
        return <PaymentOptions nextStepShipping={finalStep} prevStepShipping={prevStepShipping} />;
      default:
        return <div>No form found</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>

        <div className={styles.stepsContainer}>
        <Steps current={step - 1}>
          <Step title="Cart" icon={<ShoppingCartOutlined />} />
          <Step title="Shipping Details" icon={<SolutionOutlined />} />
          <Step title="Shipping Options" icon={<CarOutlined />} />
          <Step title="Payment" icon={<CreditCardOutlined />} />
        </Steps>
        </div>

        {renderCheckoutForm()}
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutMultiStepForm;
