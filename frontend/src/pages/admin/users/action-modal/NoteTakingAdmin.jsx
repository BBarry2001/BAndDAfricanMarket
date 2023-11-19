import  { useState } from 'react';
import { Modal, Button, Tabs, Pagination, Input,  List, Tag, Tooltip} from 'antd';

const { TabPane } = Tabs;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const NoteTakingAdmin = ({ isUserNote, username }) => {
  const [activeTab, setActiveTab] = useState('allNotes');
  const [notes, setNotes] = useState([]); // This should be fetched from your state management or API
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const filteredNotes = notes.filter(note => 
    note.title.includes(searchTerm) || note.content.includes(searchTerm)
  );

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
  };

  const handleNoteChange = (key) => {
    setActiveTab(key);
    setSearchTerm('');
  };

  return (
    <Modal
      title="Admin Notes"
      width="80%"
      footer={null}
    >
      <Input.Search 
        placeholder="Search Notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!selectedNote ? (
        <Tabs activeKey={activeTab} onChange={handleNoteChange}>
          <TabPane tab="All Notes" key="allNotes">
            <List 
              itemLayout="horizontal"
              dataSource={filteredNotes}
              renderItem={note => (
                <List.Item
                  actions={[
                    <Tooltip title="Edit"><Button icon="edit"  /></Tooltip>,
                    <Tooltip title="Delete"><Button icon="delete"  /></Tooltip>
                  ]}
                >
                  <List.Item.Meta
                    title={note.title}
                    description={`${note.date} - ${note.content.slice(0, 40)}...`}
                    avatar={note.isUserNote ? <Tag color="blue">User</Tag> : <Tag color="green">Personal</Tag>}
                  />
                </List.Item>
              )}
            />
            <Pagination />
          </TabPane>

          <TabPane tab="Personal Notes" key="personalNotes">
          </TabPane>

          <TabPane tab="User Notes" key="userNotes">
          </TabPane>
        </Tabs>
      ) : (
        <div>
          <Button onClick={handleCloseNote}>Back</Button>
          <h3>{selectedNote.title}</h3>
          <p>{selectedNote.content}</p>
        </div>
      )}

      <Button 
        type="primary" 
        shape="circle" 
        icon="plus" 
        size="large"
        style={{ position: 'absolute', right: 10, bottom: 10 }}
     
      />
    </Modal>
  );
};

export default NoteTakingAdmin;
