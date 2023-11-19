import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './NewNoteModal.module.css';

const { Option } = Select;
const { TextArea } = Input;

export default function NewNoteModal({ isModalVisible, closeModal }) {
  const [newNoteData, setNewNoteData] = useState({});
  
  const handleNewNoteDataChange = (e) => {
    const { name, value } = e.target;
    setNewNoteData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal title="New Note" visible={isModalVisible} onCancel={closeModal} className={styles.modal}>
      <Form className={styles.newNoteForm} >
        <Form.Item label="Title">
          <Input name="title" onChange={handleNewNoteDataChange} />
        </Form.Item>
        <Form.Item label="Content">
          <TextArea name="content" onChange={handleNewNoteDataChange} />
        </Form.Item>
        <Form.Item label="Type">
          <Radio.Group name="type" onChange={handleNewNoteDataChange}>
            <Radio value="Personal">Personal</Radio>
            <Radio value="User">User</Radio>
            <Radio value="Order">Order</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Urgency">
          <Select name="urgency" defaultValue="Low" onChange={(value) => setNewNoteData(prevState => ({ ...prevState, urgency: value }))}>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tags">
          <Input name="tags" placeholder="Enter tags separated by commas" onChange={handleNewNoteDataChange} />
        </Form.Item>
        <Form.Item label="Due Date">
          <DatePicker name="dueDate" onChange={(date, dateString) => setNewNoteData(prevState => ({ ...prevState, dueDate: dateString }))} />
        </Form.Item>
        <Form.Item label="Attachments">
          <Upload name="attachments">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Visibility">
          <Select name="visibility" defaultValue="Just you" onChange={(value) => setNewNoteData(prevState => ({ ...prevState, visibility: value }))}>
            <Option value="Just you">Just you</Option>
            <Option value="All Admins">All Admins</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Assign User">
          <Select name="assignUser" onChange={(value) => setNewNoteData(prevState => ({ ...prevState, assignUser: value }))}>
            {/* Options for users will go here */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
