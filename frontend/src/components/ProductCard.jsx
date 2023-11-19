import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Dropdown, Menu, Rate, Modal } from 'antd';
import { DownOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { useAuthInfo } from '../hub/hooks/hooks';
import { addCartItem } from '../hub/slices/CartSlice'; 

/**
 * ProductCard Component
 * 
 * This component is used for displaying individual products fetched from the backend.
 * It includes details such as product name, image, price, and an add-to-cart button.
 * The component supports both authenticated and unauthenticated users for adding products to the cart.
 *
 * Props:
 * - product_identifier, name, image_url, price, description, stock, tags, weight_kg, weight_lbs,
 *   default_quantity, category, category_name: These props are used to display the product information.
 *
 * State:
 * - selectedNum: The selected quantity of the product.
 * - isModalVisible: Controls the visibility of the product detail modal.
 */

const ProductCard = ({
  product_identifier,
  name,
  image_url: image,
  price,
  description,
  stock,
  tags,
  weight_kg,
  weight_lbs,
  default_quantity,
  category,
  category_name,
}) => {

  const [selectedNum, setSelectedNum] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated } = useAuthInfo();
  const dispatch = useDispatch();

  const addToCart = () => {
    // Function to handle adding products to the cart
    const cartItem = isAuthenticated ? 
      { product_identifier, quantity: selectedNum } : 
      { product_identifier, name, image, price, quantity: Number(selectedNum) };

    dispatch(addCartItem({ ...cartItem }));
  };
  
  const menuItems = Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
    <Menu.Item key={num}>{num}</Menu.Item>
  ));

  const menu = <Menu onClick={(e) => setSelectedNum(e.key)} className={styles.dropdownMenu}>{menuItems}</Menu>;

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleAddToCartAndClose = () => {
    addToCart(); 
    setIsModalVisible(false);
  };

  return (
    <div className={styles.productCard}>
      <Card hoverable>
        <div className={styles.imgContainer}>
          {tags?.includes('HOT') && <span className={styles.hotTag}>HOT</span>}
          {tags?.includes('NEW') && <span className={styles.newTag}>NEW</span>}
          <Link to={`/products/${name}`}>
            <img alt={name} src={image} className={styles.productImage} />
          </Link>
        </div>
        <div>
          <Link to={`/products/${name}`}>
            <h2 className={styles.title}>{name}</h2>
          </Link>
          <div className={styles.price}>${price}</div>
          <div className={styles.reviewContainer}>
            <Rate className={styles.rate} defaultValue={4} disabled />
            <span>(45 reviews)</span>
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.addToCartContainer}>
              <Button className={styles.addToCartBtn} type="primary" onClick={addToCart}>
                Add to Cart
                <ShoppingCartOutlined className={styles.addToCartIcon} />
              </Button>
              <Dropdown overlay={menu} trigger={['click']}>
                <Button className={styles.dropdownBtn}>
                  {selectedNum} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <Button type="link" className={styles.quickViewBtn} onClick={showModal}>
              Quick View <EyeOutlined className={styles.quickViewIcon} />
            </Button>
          </div>
        </div>
      </Card>

      <Modal 
          title={`${name} - $${price}`} 
          visible={isModalVisible} 
          onCancel={handleCancel} 
          footer={[
            <Button key="back" className={styles.modalCancelBtn} danger onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" className={styles.modalAddToCartBtn} onClick={handleAddToCartAndClose}>
              Add to Cart
            </Button>,
          ]}
        >
          <p>{description}</p>
          <p><span className={styles.labelText}>Stock:</span> <span className={styles.valueText}>{stock}</span></p>
          <p><span className={styles.labelText}>Weight:</span> <span className={styles.valueText}>{weight_lbs} lbs ({weight_kg} kg)</span></p>
          <p>This is part of our <Link to={`/category/${category}`} className={styles.categoryLink}>{category_name} category</Link></p>
        </Modal>

    </div>
  );
};

export default ProductCard;
