import { useState } from 'react';
import { Button, DatePicker, Rate, Select, InputNumber, Slider, Row, Col } from 'antd';
import styles from './SearchSettings.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const SearchSettings = ({ activeTab }) => {
  const [sliderValue, setSliderValue] = useState([0, 300]);

  return (
    <div>
      <div className={styles.headerContainer}>
        <h3 className={styles.headerText}>{activeTab === '1' ? "Review Filters" : "Order Filters"}</h3>
        <Button className={styles.resetButton}>Reset All Filters</Button>
      </div>
      
      <Row gutter={[16, 40]}>
        
        <Col span={12}>
          <div className={styles.filterItem}>
            <label>Date Range:</label>
            <DatePicker.RangePicker placeholder={['Start Date', 'End Date']} />
            <Button className={styles.singleResetButton}>Reset</Button>
          </div>
        </Col>
        
        {activeTab === '1' && (
          <>
            <Col span={12}>
              <div className={styles.filterItem}>
                <label>Filter by Rating:</label>
                <Rate />
                <Button className={styles.singleResetButton}>Reset</Button>
              </div>
            </Col>

            <Col span={24}>
              <div className={styles.filterItem}>
                <label>Filter by Number of Thumbs Up/Down:</label>
                <Select defaultValue="Thumbs" style={{ width: 120 }}>
                  <Select.Option value="Thumbs Up">Thumbs Up</Select.Option>
                  <Select.Option value="Thumbs Down">Thumbs Down</Select.Option>
                </Select>
                <InputNumber min={0} max={100} defaultValue={0} />
                <Button className={styles.singleResetButton}>Reset</Button>
              </div>
            </Col>
          </>
        )}

        {activeTab === '2' && (
          <>
            <Col span={12}>
              <div className={styles.filterItem}>
                <label>Order Status:</label>
                <Select defaultValue="None" style={{ width: 120, marginLeft: 10 }}>
                  <Select.Option value="None">None</Select.Option>
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="Shipped">Shipped</Select.Option>
                  <Select.Option value="Delivered">Delivered</Select.Option>
                </Select>
              </div>
            </Col>
          
            <Col span={12}>
              <div className={styles.filterItem}>
                <label>Price Range:</label>
                <Slider
                  range
                  min={0}
                  max={300}
                  defaultValue={[0, 300]}
                  onChange={(value) => setSliderValue(value)}
                />
                <div className={styles.sliderLabels}>
                  <span>From: ${sliderValue[0]}</span> 
                  <span style={{ float: 'right' }}>To: ${sliderValue[1]}</span>
                </div>
              </div>
            </Col>
          </>
        )}
        
      </Row>
    </div>
  );
};

export default SearchSettings;
