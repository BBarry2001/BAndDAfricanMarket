import { Link } from 'react-router-dom';
import Slide2Image from '../../../images/Slide2Image.jpg';
import styles from './HeaderSlide2.module.css';

const ProductsSlide = () => {
  return (
    <div className={styles.carouselItem}>
      <img src={Slide2Image} alt="Workers in African fields" className={styles.background} />
      <div className={styles.textContainer}>
        <h2 className={styles.header}>Rooted in Tradition, Shared with the World</h2>
        <p className={styles.paragraph}>Experience the depth of Africa's culture with our curated products. Each item carries the spirit and tradition of its origin, connecting you to a world of authentic flavors and experiences.</p>
        <div className={styles.buttonContainer}>
          <Link to="/products" className={styles.button1}>Explore Our Products</Link>
          <a href="#product-origin" className={styles.button2}>Our Products' Journey</a>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlide;
