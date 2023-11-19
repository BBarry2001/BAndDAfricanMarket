import styles from './EmptyContent.module.css';
import InitialImage from '../../../images/SearchComponentDefaultImage1.png';
import NoResultsImage from '../../../images/SearchComponentDefaultImage2.png';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */


const EmptyContent = ({ hasSearched, searchResults, searchQuery, activeTab, getTabName }) => {
  if (!hasSearched) {
    return (
      <div className={styles.container}>
        <img 
          src={InitialImage}
          alt="Search through your account" 
          className={styles.image}
        />
        <span className={styles.text}>
          Use this searching component to find anything on your account—orders, reviews, products, and more.
        </span>
      </div>
    );
  } else if (searchResults === null || searchResults.length === 0) {
    return (
      <div className={styles.container}>
        <img 
          src={NoResultsImage}
          alt="No results found" 
          className={styles.image}
        />
        <span className={styles.text}>
          No results found for <strong>{searchQuery}</strong> in <strong>{getTabName(activeTab)}</strong>. Try different keywords.
        </span>
      </div>
    );
  }
  return null;
};

export default EmptyContent;
