import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Form, Input, Button, Row, Col, Dropdown, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import { FaLanguage } from 'react-icons/fa';
import { mergeAndSyncCarts } from '../../hub/slices/CartSlice';
import { registerUser } from "../../hub/slices/AuthSlice";
import { useDispatch } from 'react-redux';
import { useLoading } from '../../components/feedback-ui/contexts/loading-componenets/LoadingContext';

import RegistrationPage1Styles from './RegistrationPageForm1.module.css';

/**
 * RegistrationPage1Form Component
 *
 * The RegistrationPage1Form is responsible for handling new user registrations in the application.
 * It provides a comprehensive form for users to enter their personal information and create an account.
 *
 * Features:
 * - Form fields for first name, last name, email, password, phone number, and preferred language.
 * - Custom validation for each input field to ensure data integrity and user-friendly feedback.
 * - Integration with Redux for state management and dispatching actions like registering a user and merging/syncing carts.
 * - Loading indicators and error handling for user feedback and improved UX.
 * - Support for external authentication methods like Google and Apple for enhanced user convenience.
 *
 * Implementation:
 * - Utilizes Ant Design components for the UI, including Form, Input, Button, Dropdown, and others.
 * - State management for form data, loading state, selected language, and form submission attempts.
 * - Redux hooks for dispatching actions and handling application state changes.
 * - Custom utility functions for validating input fields (e.g., validateEmail, validatePassword).
 * - Responsive design to cater to different screen sizes.
 *
 * Usage:
 * - As a standalone registration form for new users to create an account on the platform.
 * - Can be used in conjunction with other authentication methods for a versatile user experience.
 * - Suitable for applications requiring detailed user information during the registration process.
 * 
 * Note: This component plays a critical role in the user onboarding process. Ensure that all
 * validation rules and error handling mechanisms are thoroughly tested and cover all possible 
 * user input scenarios. It's also important to keep the form's UX in mind, making it as intuitive
 * and user-friendly as possible.
 */

const RegistrationPageForm = () => {
  const [form] = Form.useForm();  
  
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Preferred Language'); 

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async () => {
    setSubmitAttempted(true); 

    try {
      showLoading();
      setIsLoading(true);

        const formValues = await form.validateFields();

        const newUserData = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            email: formValues.email,
            password: formValues.password,
            phone_number: formValues.phone_number ? formValues.phone_number : null, 
            preferred_language: formValues.preferred_language || 'en',
        };
        console.log("new data is ", newUserData)

        const result = await dispatch(registerUser(newUserData));
        
        if (result && result.payload && result.payload.access) {
          await dispatch(mergeAndSyncCarts());
          navigate('/');  
        } else {

          const { message, status } = result.payload;
          if (status === 409) {
            const fieldErrors = {};
            if (message.email) {
              fieldErrors.email = 'This email is already associated with an account.';
            }
            if (message.phone_number) {
              fieldErrors.phone_number = 'This phone number is already associated with an account.';
            }
            form.setFields(Object.keys(fieldErrors).map(key => ({ name: key, errors: [fieldErrors[key]] })));
          } else {
            form.setFields([
              { name: 'email', errors: [message] },
              { name: 'phone_number', errors: [message] },
            ]);
          }
        }
        
      } catch (validationError) {
        console.log('Validation failed:', validationError);
      } finally {
        setIsLoading(false);
        hideLoading();
      }
    };

const handleInputChange = (type) => {
  if (submitAttempted) {
    setSubmitAttempted(false);
    form.validateFields([type]);
  }
};

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length >= 3 && value.length <= 6)
      value = `${value.slice(0,3)}-${value.slice(3)}`;
    else if (value.length > 6)
      value = `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6,10)}`;
    
    setPhoneNumber(value);
    form.setFieldsValue({phone_number: value});  
  };

  const validateName = (rule, value) => {
    if (!/^[A-Za-z ]+$/.test(value)) {
      return Promise.reject("No special characters or numbers allowed in the name");
    }
    return Promise.resolve();
  };

  const validateEmail = (rule, value, callback) => {
    if (submitAttempted && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      callback("Please enter a valid email address");
    } else {
      callback();
    }
  };

  const validatePassword = (rule, value, callback) => {
    if (submitAttempted && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{8,20}$/.test(value)) {
      callback("Password must have 1 uppercase, 1 lowercase, 1 digit, and be 8-20 characters long.");
    } else {
      callback();
    }
  };

  const validatePhoneNumber = (rule, value, callback) => {
    // If the field is empty, skip validation and accept it as valid
    if (!value) {
      return Promise.resolve();
    }
  
    // If there is a value, then validate the format
    if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
      return Promise.reject("Please enter a valid phone number");
    }
    return Promise.resolve();
  };

  const menu = (
    <Menu onClick={(e) => {
      form.setFieldsValue({ preferred_language: e.key });
      setSelectedLanguage(e.item.props.children); 
    }}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="fr">French</Menu.Item>
    </Menu>
  );
  
  return (
  <Form form={form} onFinish={handleSubmit} layout="vertical" className={RegistrationPage1Styles.formLayout}
  >
      
      <div className={RegistrationPage1Styles.headerWrapper}>
        <h5 className={RegistrationPage1Styles.header}>Create an account</h5>
      </div>

      <Row gutter={[16, 20]}>

        <Col span={12}>
          <Form.Item name="first_name"
          rules={[
            {
              validator: validateName,
            },
          ]} >
            <Input placeholder="First Name" className={RegistrationPage1Styles.inputStyle} prefix={<UserOutlined />} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="last_name"
          rules={[
            {
              validator: validateName,
            },
          ]} >
            <Input placeholder="Last Name" className={RegistrationPage1Styles.inputStyle} prefix={<UserOutlined />} />
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={[16, 20]}>
      <Col span={24}>
      <Form.Item
        name="email"
        rules={[{ validator: validateEmail }]}
      >
        <Input
          placeholder="Email Address"
          className={RegistrationPage1Styles.inputStyle}
          prefix={<MailOutlined />}
          onChange={() => handleInputChange("email")}
        />
      </Form.Item>
      </Col>

    
    </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="password" 
          rules={[
            {
              validator: validatePassword,
            },
          ]}>
            <Input.Password placeholder="Password" 
            className={RegistrationPage1Styles.inputStyle} 
            prefix={<LockOutlined />}
            onChange={() => handleInputChange("password")} 
            />
          </Form.Item>
        </Col>

        <Col span={12}>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" className={RegistrationPage1Styles.inputStyle} prefix={<LockOutlined />} />
        </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col span={12}>
      <Form.Item name="phone_number" 
        rules={[
          {
            validator: validatePhoneNumber,
          },
        ]}
      >
        <Input 
          placeholder="Phone Number" 
          className={RegistrationPage1Styles.inputStyle} 
          prefix={<PhoneOutlined />} 
          value={phoneNumber}
          onChange={handlePhoneChange}
          maxLength={12} // 3 digits - 3 digits - 4 digits = 12
        />
      </Form.Item>


      </Col>

      <Col span={12}>
        <Form.Item name="preferred_language">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className={RegistrationPage1Styles.dropdownLink}>
              {selectedLanguage} {/* Display the selected language */}
              <FaLanguage className={RegistrationPage1Styles.faLanguageIcon}/>
            </Button>
          </Dropdown>
        </Form.Item>
      </Col>

    </Row>

      <Form.Item>
        <div className={RegistrationPage1Styles.agreementLabel}>
          <span className={RegistrationPage1Styles.linkStyle}>By clicking <strong>'Create An Account'</strong>, you have agreed to the </span>
          <Link to="/tos" className={RegistrationPage1Styles.tosLink}>Terms Of Service</Link> 
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={RegistrationPage1Styles.buttonStyle} disabled={isLoading}>
          Create An Account
        </Button>
      </Form.Item>
      <Divider orientation="center" className={RegistrationPage1Styles.dividerStyle}>or</Divider>
      <div className={RegistrationPage1Styles.buttonContainer}>
        <Button icon={<GoogleOutlined />} className={RegistrationPage1Styles.googleButton}>Sign Up with Google</Button>
        <Button icon={<AppleOutlined />} className={RegistrationPage1Styles.appleButton}>Sign Up with Apple</Button>
      </div>
    </Form>
  );
}

export default RegistrationPageForm;