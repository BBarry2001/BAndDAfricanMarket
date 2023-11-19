import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './NoteForm.module.css';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const NoteForm = ({ note = null, onSave, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={note}
      onFinish={onSave}
      className={styles.noteForm}
    >
      {note && note.userId && <h3>{note.userName}</h3>}
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the note title!' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please input the note content!' }]}
      >
        <Input.TextArea rows={5} placeholder="Write your note here..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Note
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NoteForm;
