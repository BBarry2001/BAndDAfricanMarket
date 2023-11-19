import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Divider, Checkbox, Slider, Button } from 'antd';
import { fetchProducts, fetchCategories } from '../../hub/slices/ProductSlice'; 
import debounce from 'lodash.debounce'; 
import styles from './ProductPageSideBar.module.css';

const { Option } = Select;

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.categories);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedRatings, setSelectedRatings] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const debouncedUpdate = debounce(() => {
    const filters = {
      category: selectedCategory,
      tags: Array.from(selectedTags),
      priceRange,
      ratings: Array.from(selectedRatings),
      search: searchTerm
    };
    dispatch(fetchProducts({ page: 1, filters, sort: 'none' }));
  }, 500);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    debouncedUpdate();
  };

  const handleTagClick = (tag) => {
    const newTags = new Set(selectedTags);
    if (tag === 'All Products') {
      newTags.clear();
    } else {
      newTags.has(tag) ? newTags.delete(tag) : newTags.add(tag);
    }
    setSelectedTags(newTags);
    debouncedUpdate();
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    debouncedUpdate();
  };

  const handlePriceButton = (min, max) => {
    setPriceRange([min, max]);
    debouncedUpdate();
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    const newRatings = new Set(selectedRatings);
    newRatings.has(rating) ? newRatings.delete(rating) : newRatings.add(rating);
    setSelectedRatings(newRatings);
    debouncedUpdate();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedUpdate();
  };

  return (
    <div className="stickySidebar">
      <div className={styles.sidebar}>
        {/* Category and Search */}
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}><i className="fa fa-search"></i></div>
          <input 
            className={styles.searchInput} 
            placeholder="Search products"
            onChange={handleSearchChange}
          />
          <Select 
            className={styles.categorySelect} 
            value={selectedCategory} 
            onChange={handleCategoryChange}
          >
            <Option value="all">All Categories</Option>
            {categories.map(category => (
              <Option key={category.name} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </div>

        <Divider style={{ margin: '10px 0' }} />

        {/* Filter by Tags */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterHeader}>Filter by:</h3>
          <div className={styles.filterTags}>
            {categories.map(category => (
              <div 
                key={category.name}
                className={`${styles.filterTag} ${selectedTags.has(category.name) ? styles.selected : ''}`} 
                onClick={() => handleTagClick(category.name)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <Divider style={{ margin: '10px 0' }} />

        {/* Price Range */}
        <div className={styles.priceSection}>
          <h3 className={styles.priceHeader}>Price Range</h3>
          <Slider 
            range 
            min={0} 
            max={300} 
            step={20} 
            defaultValue={[0, 300]} 
            onAfterChange={handlePriceRangeChange} 
          />
          <div className={styles.priceButtons}>
            <Button onClick={() => handlePriceButton(0, 50)}>Under $50</Button>
            <Button onClick={() => handlePriceButton(50, 100)}>$50-$100</Button>
            <Button onClick={() => handlePriceButton(100, 200)}>$100-$200</Button>
            <Button onClick={() => handlePriceButton(200, 500)}>$200-$500</Button>
          </div>
        </div>

        <Divider style={{ margin: '10px 0' }} />

        {/* Customer Ratings */}
        <div className={styles.ratingSection}>
          <h3 className={styles.ratingHeader}>Customer Ratings</h3>
          <div className={styles.checkboxWrapper}>
            <Checkbox onChange={handleRatingChange} value="4">4 Stars & Up</Checkbox>
            <Checkbox onChange={handleRatingChange} value="3">3 Stars & Up</Checkbox>
            <Checkbox onChange={handleRatingChange} value="2">2 Stars & Up</Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;