import { Layout, Col, Row, Button, Input, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, GoogleOutlined, InstagramOutlined, LinkedinOutlined, 
GithubOutlined, } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import FooterStyles from './Footer.module.css';

const { Footer } = Layout;
const { Title } = Typography;


/**
 * TheFooter Component
 *
 * This component renders the footer section of the website. It includes social media icons, a subscription form, 
 * footer links, and a copyright message. The information presented is currently static and not final.
 * This component is primarily designed for display and aesthetic purposes to enhance user engagement. 
 * None of these links or any information here is final. It will most likely be cut later.
 * 
 */

const TheFooter = () => (
  <Footer className={FooterStyles.antFooter}>

    <Row gutter={[20, 20]} justify="center" className={FooterStyles.centerRow}>
      <Col span={24} className={FooterStyles.iconCol}>
        <Button icon={<FacebookOutlined />} className={FooterStyles.iconButton} />
        <Button icon={<TwitterOutlined />} className={FooterStyles.iconButton} />
        <Button icon={<GoogleOutlined />} className={FooterStyles.iconButton} />
        <Button icon={<InstagramOutlined />} className={FooterStyles.iconButton} />
        <Button icon={<LinkedinOutlined />} className={FooterStyles.iconButton} />
        <Button icon={<GithubOutlined />} className={FooterStyles.iconButton} />
      </Col>

      <Col span={24} className={FooterStyles.subscribeContainer}>
        <Title level={3} className={FooterStyles.subscribeTitle} style={{color:'white'}}>Keep Up with The Business</Title>
        <Input placeholder="Email Address" className={FooterStyles.subscribeInput} />
        <Button className={FooterStyles.subscribeButton}>Subscribe</Button>
      </Col>

      <Col span={24} className={FooterStyles.footerMessage}>
        <div>
          You're not just a customer, you're family. And in our shared culture, family is everything.
          <br />
          Thank you for choosing B&D African Market. Your support means all the world to us. ❤️
        </div>
      </Col>

      <Col span={8} className={`${FooterStyles.links}`}>
        <Title level={4} className={FooterStyles.columnHeader} style={{color: "#DAA520"}}>Contact Us</Title>
        <div className={FooterStyles.linkItem}>
          +1 555-123-4567
        </div>
        <div className={FooterStyles.linkItem}>
          bdbusiness61@gmail.com
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/contact-us" className={FooterStyles.linkItem}> Send us a message</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/reviews-and-feedback" className={FooterStyles.linkItem}>Reviews And Feedback</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/faq-help" className={FooterStyles.linkItem}>FAQ/Help Page</RouterLink>
        </div>
      </Col>

      <Col span={8} className={`${FooterStyles.links}`}>
        <Title level={4} className={FooterStyles.columnHeader} style={{color: "#DAA520"}}>Legal</Title>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/testing" className={FooterStyles.linkItem}>Privacy Policy</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/terms-of-service" className={FooterStyles.linkItem}>Terms of Services</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/cookies-policy" className={FooterStyles.linkItem}>Cookies Policy</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/returns-policies" className={FooterStyles.linkItem}>Returns Policies</RouterLink>
        </div>
      </Col>

      <Col span={8} className={`${FooterStyles.links}`}>
        <Title level={4} className={FooterStyles.columnHeader} style={{color: "#DAA520"}}>Customer Support</Title>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="private/account" className={FooterStyles.linkItem}>My Account</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="private/checkout" className={FooterStyles.linkItem}>Track Your Order</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/returns-and-exchange" className={FooterStyles.linkItem}>Returns And Exchange</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/purchase-history" className={FooterStyles.linkItem}>Purchase History</RouterLink>
        </div>
        <div className={FooterStyles.linkItem}>
          <RouterLink to="/shipping-delivery" className={FooterStyles.linkItem}>Shipping & Delivery</RouterLink>
        </div>
      </Col>

      <Col span={24} className={FooterStyles.bottomCopyright}>
        <div>© 2023 B&D African Market</div>
      </Col>
    </Row>
  </Footer>
);

export default TheFooter;
