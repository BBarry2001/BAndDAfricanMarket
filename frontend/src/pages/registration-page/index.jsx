import React from 'react';
import RegistrationPageForm from './RegistrationPageForm1';
import RegistrationTemplate from './RegistrationTemplate';
import RegistrationPage1Image from '../../images/RegistrationPage1Image.jpg';

function Registration() {
  return (
    <RegistrationTemplate 
        formComponent={<RegistrationPageForm />} 
        imageUrl={RegistrationPage1Image}
    />
  );
}

export default Registration;
