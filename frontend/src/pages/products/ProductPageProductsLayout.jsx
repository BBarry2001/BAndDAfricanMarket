import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Pagination } from 'antd';
import ProductCard from '../../components/ProductCard';
import { fetchProducts } from '../../hub/slices/ProductSlice'; 
import styles from './ProductPageProductsLayout.module.css';

const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ProductPageProductsLayout = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.products);
  const totalCount = useSelector((state) => state.products.totalCount);
  const currentFilters = useSelector(state => state.products.currentFilters);


  const [current, setCurrent] = useState(1);
  const [sort, setSort] = useState('none');

  useEffect(() => {
    dispatch(fetchProducts({ page: current, sort, filters: currentFilters }));
  }, [dispatch, current, sort, currentFilters]);
  
  
  const handleSortChange = (value) => {
    setSort(value);
  };

  const sortedProducts = useMemo(() => {
    if (!productsData) return [];
    return sort === 'asc'
      ? [...productsData].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      : sort === 'desc'
      ? [...productsData].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      : productsData;
  }, [productsData, sort]);

  return (
    <div className={styles.content}>
      <div className={styles.sortSection}>
        <div>Showing {(current - 1) * 9 + 1}-{current * 9} of {productsData.length} results</div>
        <Select
          className={styles.sortDropdown}
          value={sort}
          onChange={handleSortChange}
        >
          <Option value="none">Default Sorting</Option>
          <Option value="asc">Price: low to high</Option>
          <Option value="desc">Price: high to low</Option>
        </Select>
      </div>

      <div className={styles.gridContainer}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.product_identifier} {...product} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          current={current}
          onChange={(newPage) => {
            setCurrent(newPage);
            dispatch(fetchProducts({ page: newPage, sort: 'none' })); // Fetch new page without sorting
          }}
          total={totalCount}
          pageSize={9}
        />
      </div>
    </div>
  );
};

export default ProductPageProductsLayout;