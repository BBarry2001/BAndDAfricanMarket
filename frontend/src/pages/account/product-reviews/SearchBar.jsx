import {useState} from 'react';
import { Button, Tooltip, AutoComplete } from 'antd';
import {HourglassOutlined} from '@ant-design/icons';
import styles from './SearchBar.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const SearchBar = ({ activeTab, setSearchResults, addSearchHistory, resetAll, 
  searchHistory, setSearchQuery, showDrawer, resetSearchState, searchResults }) => {

  let searchTimer;
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (value) => {
    clearTimeout(searchTimer);
  
    if (value === '') {
      resetSearchState(); 
      setNoResults(false); 
      return;
    }
  
    searchTimer = setTimeout(() => {

      addSearchHistory(value);
      setSearchQuery(value);
  
      if (searchResults && searchResults.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }, 2000); 
  };

  const options = [
    {
      label: 'Products',
      options: [
        { value: 'Apple' },
        { value: 'Banana' },
      ],
    },
    {
      label: 'Policies',
      options: [
        { value: 'Return Policy' },
      ],
    },
  ];

  const tabInfo = {
    '1': { placeholder: 'Search your all time reviews', tooltip: 'Use keywords, or filter by date and or rating' },
    '2': { placeholder: 'Search orders', tooltip: 'Tip: Use order IDs, or filter by date' },
    '3': { placeholder: 'Search products', tooltip: 'Tip: Use product names or categories' },
    '4': { placeholder: 'Search common questions', tooltip: 'Type your question or keywords' },
    '5': { placeholder: 'Search messages', tooltip: 'Search for notifications or announcements' },
    '6': { placeholder: 'Search policies', tooltip: 'Search privacy policies, terms of service, etc.' },
  };
    const { placeholder, tooltip } = tabInfo[activeTab] || { placeholder: '', tooltip: '' };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>

    <Tooltip className={styles.toolTipClass} title={tooltip}>

    <AutoComplete
      status={noResults ? 'warning' : undefined}
      bordered={true}
      options={options}
      allowClear
      suffix={<HourglassOutlined />}
      className={styles.searchInput}
      placeholder={placeholder}
      onSearch={handleSearch}
    />
    </Tooltip>
    
      <Button onClick={resetAll} style={{ marginLeft: '16px' }}>Reset</Button> {/* Existing Reset Button */}
      <Button onClick={showDrawer} style={{ marginLeft: '16px', backgroundColor: '#007bff', color: '#fff' }}>Search History</Button> {/* New Button for History Drawer */}
    </div>

  );
};

export default SearchBar;
