import React from 'react';
import { Card, Button, Input, Checkbox, Select, Divider } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  TagOutlined
} from '@ant-design/icons';
import styles from './index.module.css';

const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ManageProducts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.manageButtons}>
        <Button type="primary" icon={<PlusOutlined />}>
          Add New Product
        </Button>
      </div>

      {[1, 2, 3].map((product) => (
        <Card key={product} className={styles.productCard}>
          <h2 className={styles.title}>Sample Product {product}</h2>
          <div className={styles.manageButtons}>
            <Button icon={<EditOutlined />}>Edit</Button>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </div>

          <Divider />

          {/* Product Info */}
          <div className={styles.group}>
            <h4>Product Info</h4>
            <Input placeholder="Product name" />
            <Input.TextArea placeholder="Product description" rows={4} />
          </div>

          {/* Pricing & Category */}
          <div className={styles.group}>
            <h4>Pricing & Category</h4>
            <Input addonBefore="Price" type="number" placeholder="$0.00" />
            <Select placeholder="Select Category">
              <Option value="food">Food</Option>
              <Option value="beverage">Beverage</Option>
            </Select>
          </div>

          {/* Additional Attributes */}
          <div className={styles.group}>
            <h4>Additional Attributes</h4>
            <Input addonBefore="Stock" type="number" placeholder="0" />
            <Checkbox>Featured Product</Checkbox>
            <Checkbox>Hide Product</Checkbox>
          </div>

          {/* SEO & Analytics */}
          <div className={styles.group}>
            <h4>SEO & Analytics</h4>
            <Input placeholder="Meta Title" />
            <Input.TextArea placeholder="Meta Description" rows={2} />
            <Button icon={<TagOutlined />}>Manage Reviews</Button>
            <div>Views: XX, Purchases: XX</div>
          </div>

          {/* Miscellaneous */}
          <div className={styles.group}>
            <h4>Miscellaneous</h4>
            <Select placeholder="Shipping Rules">
              <Option value="standard">Standard Shipping</Option>
              <Option value="express">Express Shipping</Option>
              <Option value="perishable">Perishable</Option>
            </Select>
            <Checkbox>Enable Christmas Theme</Checkbox>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ManageProducts;
