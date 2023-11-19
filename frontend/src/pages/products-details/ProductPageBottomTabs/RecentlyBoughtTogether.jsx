import React from 'react';
import { Card, Col, Row, Button, Rate, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './RecentlyBoughtTogether.module.css';
import ProductImage from '../../../images/DefaultProductImage.webp';

const { Meta } = Card;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const RecentlyBoughtTogether = () => {
  const products = [
    { name: "Fresh Apples", price: "5.99", rating: 4, img: ProductImage },
    { name: "Organic Chicken", price: "12.99", rating: 5, img: ProductImage },
    { name: "Juicy Oranges", price: "3.99", rating: 3.5, img: ProductImage },
    { name: "Fresh Milk", price: "2.50", rating: 4.2, img: ProductImage },
    { name: "Ground Coffee", price: "10.99", rating: 5, img: ProductImage },
    { name: "Vegan Cheese", price: "7.99", rating: 4.5, img: ProductImage }, // Additional product
  ];

  return (
    <div className={styles.recentlyBought}>
      <Row gutter={[16, 16]} justify="space-between">
        {products.map((product, index) => (
          <Col key={index} span={4}>
            <Badge.Ribbon text="Hot Item" color="purple"> 
              <Card
                className={styles.productCard}
                hoverable
                cover={<img alt={product.name} src={product.img} />}
              >
                <Meta 
                  title={product.name} 
                  description={<span className={styles.price}>${product.price}</span>} 
                />
                <Rate className={styles.rating} disabled defaultValue={product.rating} />
                <Button className={styles.addToCart} type="primary" icon={<ShoppingCartOutlined />}>
                  Add to Cart
                </Button>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecentlyBoughtTogether;
