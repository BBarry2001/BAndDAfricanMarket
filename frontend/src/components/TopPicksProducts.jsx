import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopPicksProducts.module.css';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStarEightProducts } from '../hub/slices/ProductSlice';

/**
 * TopPicksProducts Component
 * 
 * This component is responsible for displaying the top eight featured products in the home page.
 * It fetches and displays a list of products, the start 8 products that is in the product slice. 
 * The component uses ProductCard to individually render each product. See the ProductCard component
 * if you need more info on it.
 * 
 */

const TopPicksProducts = () => {
  const dispatch = useDispatch();
  const starEightProducts = useSelector(state => state.products.starEight);
  const products = starEightProducts || [];

  useEffect(() => {
    dispatch(fetchStarEightProducts());
  }, [dispatch]);

  const top8Products = products.slice(0, 8);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured African Delicacies</h2>
        <p className={styles.subtitle}>Check out our best products</p>
      </div>
      <div className={styles.cards}>
        {top8Products.map(product => (
          <ProductCard
            key={product.product_identifier}
            {...product}
          />
        ))}
      </div>
      <div className={styles.btnBox}>
        <Link to="/products" className={styles.browseBtn}>Browse More Products</Link>
      </div>
    </div>
  );
};

export default TopPicksProducts;
