import { Drawer, List, Avatar, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const SearchHistoryDrawer = ({ visible, closeDrawer, searchHistory }) => {
  return (
    <Drawer
      title="Search History"
      placement="right"
      closable={true}
      onClose={closeDrawer}
      visible={visible}
      width={400}
    >
      <List
        itemLayout="horizontal"
        dataSource={searchHistory}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<SearchOutlined />} />}
              title={<Typography.Text strong>{`Search #${index + 1}`}</Typography.Text>}
              description={item}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default SearchHistoryDrawer;
