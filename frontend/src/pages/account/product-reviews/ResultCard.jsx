import {Card} from 'antd';
import styles from './ResultCard.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ResultCard = ({ activeTab, searchResults, searchQuery, getTabName, getIconForTab }) => {
    return (
      <Card
          bordered={true}
          title={
              <div className={styles.CardTitle}>
              {getIconForTab(activeTab)}
              <span>{searchQuery}</span>
              <span>{getTabName(activeTab)}</span>
              </div>
          }
          >
      </Card>
  );
};

export default ResultCard;
