import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import AddressForm from '../../testing-extras/RegistrationPageForm2';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ShippingDetails = ({ nextStepShipping, prevStepShipping }) => {
    const [hasAddress, setHasAddress] = useState(false); 

  useEffect(() => {
    const fetchAddress = async () => {
      const address = "Some saved address";  
      if (address) {
        setHasAddress(true);
      }
    };
    fetchAddress();
  }, []);

  const handleNext = () => {
    nextStepShipping();
  };

  const handlePrev = () => {
    prevStepShipping();
  };

  return (
    <div>
      <div style={{ paddingLeft: '20%', paddingRight: '20%' }}>
        <AddressForm
          headerText="Shipping Address"
          showInputs={true}
          showToggle={true}
          showContinueButton = {true}
          showSkipButton = {false}
          showEmailAndNumberFields = {true}
          showClearButton={true} 
          nextStepShipping={nextStepShipping}
          prevStepShipping={prevStepShipping}
          currentPage = {'shipping Page'}
          showHrLine ={true}
        />
      </div>
    </div>
  );
};

export default ShippingDetails;
