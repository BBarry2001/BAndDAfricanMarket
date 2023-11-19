import React from 'react';
import { Carousel } from 'antd';
import Navbar from '../../components/header/Navbar';
import Footer from '../../components/Footer';
import Sidebar from './ProductPageSideBar';
import ProductPageSlide1 from '../../components/header/carousel/ProductPageSlide1';
import ProductPageProductsLayout from './ProductPageProductsLayout';
import styles from './index.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ProductPage = () => {
    return (
      <>
        <Navbar />

        <div className={styles.carouselContainer}>
          <Carousel autoplay>
            <div>
              <ProductPageSlide1 />
            </div>
          </Carousel>
        </div>
  
        <div className={styles.productLayout}>
          <div className={styles.mainContent}>
            <Sidebar />
            <ProductPageProductsLayout
            />
          </div>
        </div>
        
        <Footer />
      </>
    );
  };
  
  export default ProductPage;
  