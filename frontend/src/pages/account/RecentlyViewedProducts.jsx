import React, { useState } from 'react';
import { List, Avatar, Button, Card, message } from 'antd';
import styles from './RecentlyViewedProducts.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const RecentlyViewedProducts = () => {
  const [removedProduct, setRemovedProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: '1', name: 'Laptop', price: '$999', image: 'image_url_here', lastViewed: '10 mins ago' },
    { id: '2', name: 'Phone', price: '$799', image: 'image_url_here', lastViewed: '15 mins ago' },
    { id: '3', name: 'Headphones', price: '$199', image: 'image_url_here', lastViewed: '1 hour ago' },
    { id: '4', name: 'TV', price: '$1,099', image: 'image_url_here', lastViewed: '2 hours ago' },
    { id: '5', name: 'Speaker', price: '$399', image: 'image_url_here', lastViewed: '3 hours ago' },
  ]);
  
  const removeProduct = (id) => {
    const productToRemove = products.find(product => product.id === id);
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setRemovedProduct(productToRemove);
    message.success({ content: 'Product removed', duration: 5, onClose: () => setRemovedProduct(null) });
  };

  const undoRemove = () => {
    if (removedProduct) {
      setProducts(prevProducts => [...prevProducts, removedProduct]);
      setRemovedProduct(null);
    }
  };

  return (
    <Card className={styles.Card}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Recently Viewed Products</h2>
      </div>
      <List 
        itemLayout="horizontal"
        dataSource={products}
        renderItem={item => (
          <List.Item actions={[
            <Button type="primary" onClick={() => console.log('Added to Cart')}>Add to Cart</Button>,
            <Button type="link" href="/products">More Details</Button>,
            <Button type="link" danger onClick={() => removeProduct(item.id)}>Remove</Button>
          ]}>
          <List.Item.Meta
              avatar={<Avatar src={item.image} size={64} />}
              title={<div>{item.name} <span className={styles.lastViewedTime}>{item.lastViewed}</span></div>}
              description={`Price: ${item.price}`}
          />
          </List.Item>
        )}
      />
      {removedProduct && (
        <div className={styles.undoContainer}>
          <Button onClick={undoRemove}>Undo Remove</Button>
        </div>
      )}
    </Card>
  );
};

export default RecentlyViewedProducts;
