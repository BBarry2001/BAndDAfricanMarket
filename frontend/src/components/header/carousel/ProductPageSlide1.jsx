import React from 'react';
import { Typography } from 'antd';
import { useSpring, animated } from 'react-spring';
import styles from './ProductPageSlide1.module.css';
import SlideImage from '../../../images/palmImage.webp';

const { Title, Text } = Typography;

const ProductPageSlide1 = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 300,
  });

  return (
    <div className={styles.carouselItem}>
      <div className={styles.imageContainer}>
        <img className={styles.bannerImage} src={SlideImage} alt="African Olive Oil" />
      </div>
      <div className={styles.bannerOverlay}></div>
      <animated.div style={fadeIn} className={styles.bannerText}>
        <Title className={styles.bannerTitle}>Discover African <span className={styles.emphasizedWord}>Olive Oil</span></Title>
        <Text className={styles.bannerSubTitle}>A Journey for Your Senses</Text>
      </animated.div>
    </div>
  );
};

export default ProductPageSlide1;
