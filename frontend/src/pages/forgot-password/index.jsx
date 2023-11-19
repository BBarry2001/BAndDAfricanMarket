import React, { useState } from 'react';
import EmailPhoneInput from './EmailPhoneInput';
import VerificationScreen from './VerificationScreen';
import EnterCode from './EnterCode';
import EnterNames from './EnterNames'; 
import ResetPassword from './ResetPassword';
import PasswordResetConfirmation from './PasswordResetConfirmation';
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [names, setNames] = useState({ firstName: '', lastName: '' });

  // Function to set the title based on the current step
  const getTitle = () => {
    switch(step) {
      case 1: return 'Reset Your Password';
      case 2: return 'Send Verification Code';
      case 3: return 'Enter Code';
      case 4: return 'Verify Your Name';
      case 5: return 'Reset Your Password';
      case 6: return 'Password Reset Successful';

      default: return 'Unknown Step';
    }
  };

  const onNext = (data) => {
    if (typeof data === 'string') {
      setEmail(data);
    } else {
      setNames(data);
    }
    setStep(step + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <h5 className={styles.title}>{getTitle()}</h5>  {/* Dynamically set the title here */}
        {step === 1 && <EmailPhoneInput onNext={onNext} />}
        {step === 2 && <VerificationScreen contact={email} version="email" onNext={() => setStep(step + 1)} />}
        {step === 3 && <EnterCode onNext={() => setStep(step + 1)} />}
        {step === 4 && <EnterNames onNext={onNext} />} 
        {step === 5 && <ResetPassword onNext={onNext}/>}
        {step === 6 && <PasswordResetConfirmation />}  {/* New component */}
      </div>
    </div>
  );
}
