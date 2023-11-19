import { useState, useEffect } from 'react';
import { Card, Button, Pagination } from 'antd';
import { SearchOutlined, OrderedListOutlined, InfoCircleOutlined, 
ShoppingCartOutlined, BellOutlined, CustomerServiceOutlined, 
FileProtectOutlined} from '@ant-design/icons';
import SearchBar from './SearchBar';
import MultiTabs from './MultiTabs';
import styles from './index.module.css';
import SearchSettings from './SearchSettings';
import ResultCard from "./ResultCard";
import SearchHistoryDrawer from './SearchHistoryDrawer'; 
import EmptyContent from './EmptyContent';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const MultiSearch = () => {
  const [activeTab, setActiveTab] = useState('1'); 
  const [searchResults, setSearchResults] = useState(null); 
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [drawerVisible, setDrawerVisible] = useState(false); 
  const [hasSearched, setHasSearched] = useState(false); 

  const addSearchHistory = (searchQuery) => {
    setHasSearched(true);
    setSearchHistory(prevState => [...prevState, searchQuery]);
  };

  const resetAll = () => {
    setActiveTab('1');
    setSearchResults(null);
    setSearchHistory([]);
  };

  const resetSearchState = () => {
    setHasSearched(false);
    setSearchQuery('');
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.keyCode === 191) {
        const element = document.getElementById("searchInput");
        if (element !== null) {
          element.focus();
        } else {
          console.error("Element not found!");
        }
      }}

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const getTabName = (activeTab) => {
    const tabMapping = {
      '1': 'All Reviews',
      '2': 'Orders',
      '3': 'Products',
      '4': 'Notifications',
      '5': 'Customer Service',
      '6': 'Policies',
    };
    return tabMapping[activeTab] || 'Unknown Tab';
  };

  const getIconForTab = (activeTab) => {
    switch (activeTab) {
      case '1':
        return <SearchOutlined />;
      case '2':
        return <OrderedListOutlined />;
      case '3':
        return <ShoppingCartOutlined />;
      case '4':
        return <BellOutlined />;
      case '5':
        return <CustomerServiceOutlined />;
      case '6':
        return <FileProtectOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };
  
  return (
    <Card className={styles.Card}>

      <div className={styles.headerContainer}>
        <h2 className={styles.header}>B&D African Market Unified Search Hub</h2>
      </div>

      <SearchBar
        showDrawer={showDrawer}
        activeTab={activeTab}
        setSearchResults={setSearchResults}
        addSearchHistory={addSearchHistory}
        resetAll={resetAll}
        searchHistory={searchHistory}
        setSearchQuery={setSearchQuery}
        resetSearchState={resetSearchState}
        searchResults={searchResults} 
      />

      <SearchHistoryDrawer
        visible={drawerVisible}
        closeDrawer={closeDrawer}
        searchHistory={searchHistory}
      />

      <Card className={styles.SearchSettingsCard}>
        <SearchSettings activeTab={activeTab} />
      </Card>

      <MultiTabs setActiveTab={setActiveTab} getIconForTab={getIconForTab} />

      {searchResults && searchResults.length > 0 ? (
        <ResultCard activeTab={activeTab} searchResults={searchResults} getTabName={getTabName}
        getIconForTab={getIconForTab} />
      ) : (
        <EmptyContent hasSearched={hasSearched} searchResults={searchResults}
        searchQuery={searchQuery} activeTab={activeTab}  getTabName={getTabName} />
      )}

      <Pagination
        style={{marginTop:'20px'}}
        defaultCurrent={1}
        pageSize={20}
        total={searchResults ? searchResults.length : 0}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        prevIcon={<a>Prev</a>}
        nextIcon={<a>Next</a>}
        showQuickJumper={{ goButton: <Button style={{marginLeft:'5px'}}>Go</Button> }}
      />

    </Card>
  );
};

export default MultiSearch;
