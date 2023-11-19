import React, { useState } from 'react';
import RecentlyBoughtTogether from './RecentlyBoughtTogether';
import Reviews from './Reviews';
import styles from './index.module.css'; 

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const MyTabs = () => {
  const [activeTab, setActiveTab] = useState('frequentlyBought');
  const [sortOption, setSortOption] = useState('Most Recent');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className={styles.myTabs}>
      <div className={styles.tabHeaders}>
        <div
          className={`${styles.tabHeader} ${activeTab === 'frequentlyBought' ? styles.active : ''}`}
          onClick={() => setActiveTab('frequentlyBought')}
        >
          Frequently Bought Together (5 items)
        </div>
        <div
          className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </div>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'frequentlyBought' && <RecentlyBoughtTogether sortOption={sortOption} />}
        {activeTab === 'reviews' && <Reviews />}
      </div>
    </div>
  );
};

export default MyTabs;