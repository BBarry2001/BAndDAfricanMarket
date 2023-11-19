import React, { useState, useEffect } from 'react';
import { Tabs, Input, Button, Space, Modal, Select, Form, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AllNotesTab from './AllNotesTab';
import PersonalNotesTab from './PersonalNotesTab';
import UserNotesTab from './UserNotesTab';
import NewNoteModal from './NewNoteModal'; 

import styles from './index.module.css'

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function NotesComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [sortType, setSortType] = useState('Date');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const openNote = (note) => {
    setCurrentNote(note);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterType = (value) => {
    setFilterType(value);
  };

  const handleSortType = (value) => {
    setSortType(value);
  };

  const handleNewNote = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <Select defaultValue="All" onChange={handleFilterType}>
          <Option value="All">All Notes</Option>
          <Option value="Personal">Personal Notes</Option>
          <Option value="User">User Related Notes</Option>
          <Option value="Order">Order Notes</Option>
          <Option value="Deleted">Deleted Notes</Option>

        </Select>
        <Select defaultValue="Date" onChange={handleSortType}>
          <Option value="Date">Sort by Date</Option>
          <Option value="Urgency">Sort by Urgency</Option>
          <Option value="Alphabet">Sort Alphabetically</Option>
        </Select>
        <Search
          placeholder="Search notes..."
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
        />
        <Button type="primary" onClick={handleNewNote}>New Note</Button>
      </Space>
      <Tabs defaultActiveKey="1">
        <TabPane tab="All Notes" key="1">
          <AllNotesTab searchTerm={searchTerm} filterType={filterType} sortType={sortType} openNote={openNote} />
        </TabPane>
        <TabPane tab="Personal Notes" key="2">
          <PersonalNotesTab searchTerm={searchTerm} filterType={filterType} sortType={sortType} openNote={openNote} />
        </TabPane>
        <TabPane tab="User Related Notes" key="3">
          <UserNotesTab searchTerm={searchTerm} filterType={filterType} sortType={sortType} openNote={openNote} />
        </TabPane>
        <TabPane tab="Order Notes" key="4">
          {/* <OrderNotesTab searchTerm={searchTerm} filterType={filterType} sortType={sortType} openNote={openNote} /> */}
        </TabPane>
        <TabPane tab="Deleted Notes" key="5">
          {/* <OrderNotesTab searchTerm={searchTerm} filterType={filterType} sortType={sortType} openNote={openNote} /> */}
        </TabPane>
      </Tabs>
      <NewNoteModal isModalVisible={isModalVisible} closeModal={closeModal} /> {/* Add the new modal here */}

    </div>
  );
}
