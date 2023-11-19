import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import LoginPageStyles from "./LoginPage.module.css";  
import { useDispatch } from 'react-redux';
import { loginUser } from '../hub/slices/AuthSlice';
import { mergeAndSyncCarts } from '../hub/slices/CartSlice';
import { useAuthInfo } from '../hub/hooks/hooks';
import { useLoading } from '../components/feedback-ui/contexts/loading-componenets/LoadingContext';
import { Link } from 'react-router-dom';

/**
 * The `LoginPageAndForm` component is a crucial element of the authentication process, enabling 
 * users to securely log into their accounts. This component merges user interface elements with 
 * form validation logic, providing a seamless and secure login experience.
 * 
 * Features:
 * 1. Email and Password Validation: Ensures that the user enters valid and properly formatted 
 *    credentials before submission.
 * 2. Interactive UI Elements: Includes text inputs, buttons, and social media login options for 
 *    a user-friendly experience.
 * 3. Form Submission Handling: Processes the login request and provides feedback based on the 
 *    response, such as navigating to the home page upon successful login or displaying error messages.
 * 4. Responsive Design: Adapts to different screen sizes for optimal usability across devices.
 * 
 * Notes:
 * - Ensure that all security and privacy best practices are followed, especially in handling user 
 *   credentials and displaying error messages.
 * - Regularly update the component to accommodate changes in authentication processes or security 
 *   requirements.
 * - Consider implementing additional features like two-factor authentication for enhanced security.
 */

function LoginPageAndForm() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthInfo();
  const { showLoading, hideLoading } = useLoading();

  const validateForm = (email, password) => {
    let emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    let passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+.{8,}$/.test(password); 

    setEmailError(!emailValid);
    setPasswordError(!passwordValid);

    return emailValid && passwordValid;
  };

  const handleInputChange = (e, type) => {
    if (type === "email" && emailError) {
      setEmailError(false);
    }
    if (type === "password" && passwordError) {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (!validateForm(email, password)) {
      return;
    }
  
    showLoading();
    setIsLoading(true);
  
    const action = await dispatch(loginUser({ email, password }));
  
    const errorPayload = action.payload ? action.payload : null;

    if (action.payload && action.payload.status === 200) {
      await dispatch(mergeAndSyncCarts());
      navigate('/');
    } else if (errorPayload) {
      const status = errorPayload ? errorPayload.status : null;
      if (status === 401 || status === 400) {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  
    setIsLoading(false);
    hideLoading();
  };

  return (
    <div className={LoginPageStyles.container}>
      <div className={LoginPageStyles.card}>
        <div className={LoginPageStyles.row}>
          <div className={LoginPageStyles.colImage}>
            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className={LoginPageStyles.image} />
          </div>
          <div className={LoginPageStyles.colForm}>
            <form className={LoginPageStyles.cardBody} onSubmit={handleSubmit}>
              <h5 className={LoginPageStyles.title}>Sign into your account</h5>
              <div className={LoginPageStyles.field}>
                <label htmlFor='email' className={LoginPageStyles.label}>Email address</label>
                <Input 
                  name="email"
                  id='email'
                  placeholder='Enter your email'
                  prefix={<MailOutlined />}
                  size="large"
                  onChange={(e) => handleInputChange(e, "email")} 
                  status={emailError ? "error" : null}
                />
                {emailError && <div style={{ color: 'red', marginTop:'5px' }}>Please enter a valid email address</div>}
                </div>
                <div className={LoginPageStyles.field}>
                  <label htmlFor='password' className={LoginPageStyles.label}>Password</label>
                  <Input.Password
                    name="password"
                    id='password'
                    placeholder='Enter your password'
                    prefix={<LockOutlined />}
                    size="large"
                    onChange={(e) => handleInputChange(e, "password")}
                  status={passwordError ? "error" : null}
                  />
                  {passwordError && <div style={{ color: 'red', marginTop:'5px' }}>Password must contain at least one uppercase letter, one lowercase letter, one number, and must be at least 8 characters long</div>}
                </div>
                <Button type="primary" htmlType="submit" className={LoginPageStyles.button} size="large" disabled={isLoading}>Login</Button>
              
                {/* New Divider and Social Media Buttons */}
                <Divider orientation="center" className={LoginPageStyles.dividerStyle}>or</Divider>
                <div className={LoginPageStyles.socialButtonContainer}>
                  <Button icon={<GoogleOutlined />} className={LoginPageStyles.googleButton}>Sign In with Google</Button>
                  <Button icon={<AppleOutlined />} className={LoginPageStyles.appleButton}>Sign In with Apple</Button>
                </div>

                <Link to='/forgot-password' className={LoginPageStyles.link}>Forgot password?</Link>
              <p className={LoginPageStyles.register}>Don't have an account? <Link to='/register' className={LoginPageStyles.link}>Create an account</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageAndForm;
