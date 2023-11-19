import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Rate, Button, InputNumber, Col } from 'antd';
import { ShoppingCartOutlined, FacebookOutlined, 
TwitterOutlined, GoogleOutlined, InstagramOutlined, LinkedinOutlined, 
GithubOutlined } from '@ant-design/icons';
import NavBar from '../../components/header/Navbar';
import Footer from '../../components/Footer';
import MyTabs from './ProductPageBottomTabs';
import ProductImage from '../../images/DefaultProductImage.webp';
import FallbackImage from '../../images/DefaultProductImage.webp';
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ProductDetails = () => {
const { productName } = useParams();
const dummyData = {
    productName,
    price: 199.99,
    imageURL: ProductImage,
    description: "This is a great product. It's awesome. You should totally buy it. Quality is top-notch. Unbeatable price. Can't find it anywhere else. Extraordinary craftsmanship. Lasts forever. This is a great product. It's awesome. You should totally buy it. Quality is top-notch. Unbeatable price. Can't find it anywhere else. Extraordinary craftsmanship. Lasts forever. This is a great product. It's awesome. You should totally buy it. Quality is top-notch. Unbeatable price. Can't find it anywhere else. Extraordinary craftsmanship. Lasts forever.",
    starRating: 4
};

const [quantity, setQuantity] = useState(1);
const [readMore, setReadMore] = useState(false);

const updatedPrice = () => (dummyData.price * quantity).toFixed(2);

return (
    <>
      <NavBar />
      <div className={styles.productDetails}>
        <div className={styles.left}>
            <Image
                loading="lazy"
                width={500}
                height={500}
                src={dummyData.imageURL}
                fallback={FallbackImage} // Fallback image
                preview={{
                src: dummyData.imageURL,
                mask: 'Get a better view' // Custom mask text
                }}
            />
        </div>
        <div className={styles.right}>
          <h1 className={styles.productName}>{dummyData.productName}</h1>
          <Rate className={styles.productRating} disabled defaultValue={dummyData.starRating} />
          <p className={styles.description}>
            {readMore ? dummyData.description : `${dummyData.description.substring(0, 550)}... `}
            <span className={styles.readMore} onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Read Less' : 'Read More'}
            </span>
          </p>

          <div className={styles.share}>
          <span className={styles.boldShareLabel}>Share {dummyData.productName} with your friends and family:</span>
          <Col span={24} className={styles.iconColInline}>
            <Button icon={<FacebookOutlined />} className={styles.iconButton} />
            <Button icon={<TwitterOutlined />} className={styles.iconButton} />
            <Button icon={<GoogleOutlined />} className={styles.iconButton} />
            <Button icon={<InstagramOutlined />} className={styles.iconButton} />
            <Button icon={<LinkedinOutlined />} className={styles.iconButton} />
            <Button icon={<GithubOutlined />} className={styles.iconButton} />
          </Col>
        </div>

        <hr className={styles.customHr} />

        <div className={styles.priceQuantity}>
            <span className={styles.anotherPriceLook}>${updatedPrice()}</span>
            <Col className={styles.quantityCol}>
                <Button className={styles.minusButton} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <InputNumber min={1} max={100} style={{ width: '50px', border:'1px solid #001F3F' }} value={quantity} onChange={(val) => setQuantity(val)} />
                <Button className={styles.plusButton} onClick={() => setQuantity(quantity + 1)}>+</Button>
            </Col>
        </div>

          <Button type="primary" icon={<ShoppingCartOutlined />} className={styles.fullWidthButton} onClick={() => {}}>
            Add to Cart
          </Button>        
        </div>
      </div>

      <MyTabs />

      <Footer />
    </>
  );
};

export default ProductDetails;
