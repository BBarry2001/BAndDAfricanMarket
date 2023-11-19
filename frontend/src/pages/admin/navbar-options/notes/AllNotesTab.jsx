import React, { useState } from 'react';
import { List, Button, Pagination, Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './AllNotesTab.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export default function AllNotesTab({ searchTerm, filterType }) {
  const [notes, setNotes] = useState([
  ].concat(
    Array.from({ length: 10 }, (_, i) => ({
      title: `Note ${i + 1}`,
      date: '2023-10-14',
      content: `Sample content ${i + 1}`,
      type: 'All',
      tags: ['General'],
      dueDate: '2023-10-31',
    }))
  ));

  const filteredNotes = notes.filter((note) =>
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.date.includes(searchTerm) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filterType === 'All' ? true : note.type === filterType)
  );

  const sortBy = (type) => {
    if (type === 'Date') {
      return filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return filteredNotes;
  };

  const sortedNotes = sortBy('Date');

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

  const [selectedNote, setSelectedNote] = useState(null);

  const openNote = (note) => {
    setSelectedNote(note);
  };

  const closeNote = () => {
    setSelectedNote(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (selectedNote) {
    return (
      <div>
        <Button onClick={closeNote}>Back</Button>
        <h2>{selectedNote.title}</h2>
        <p>{selectedNote.content}</p>
        <p>Due Date: {selectedNote.dueDate}</p>
        {selectedNote.tags && <span>Tags: {selectedNote.tags.join(", ")}</span>}
      </div>
    );
  }

  return (
    <div>
      <List
        className={styles.clickableNote}
        dataSource={currentNotes}
        renderItem={note => (
          <Card hoverable className={styles.noteCard}>
            <List.Item
              onClick={() => openNote(note)}
              actions={[
                <Button icon={<EditOutlined />} onClick={(e) => {e.stopPropagation(); openNote(note);}} />,
                <Button icon={<DeleteOutlined />} />
              ]}
            >
              <List.Item.Meta
                title={note.title}
                description={`${note.date} - ${note.content.substring(0, 20)}...`}
              />
              <div>
                <span>Tags: </span>
                {note.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
                <span className={styles.dueDate}>Due Date: {note.dueDate}</span>
              </div>
            </List.Item>
          </Card>
        )}
      />
      <Pagination
        current={currentPage}
        total={sortedNotes.length}
        pageSize={notesPerPage}
        onChange={paginate}
      />
    </div>
  );
}