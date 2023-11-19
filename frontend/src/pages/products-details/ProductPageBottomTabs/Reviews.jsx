import React, { useState, useRef } from 'react';
import { Checkbox, List, Button, Modal, Form, Rate, Input, Tag, message, Pagination, Popconfirm } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import ReviewCard from './ReviewCard';
import styles from './Reviews.module.css';
import { useParams } from 'react-router-dom';

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ReviewsSection = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [reviewData, updateReviewData] = useState({ rating: 0, review: "" });
  const [attachedFile, updateAttachedFile] = useState(null);
  const [currentPageIndex, updateCurrentPageIndex] = useState(1);
  const inputFileRef = useRef(null);
  const { productName } = useParams();

  const initialReviews = [
  { 
    username: 'John', 
    review: 'Excellent product!', 
    rating: 5, 
    verified: true, 
    replies: [], 
    datePosted: '2022-09-20', 
    dateEdited: '2022-09-21'
  },
  { 
    username: 'Jane', 
    review: 'Good but could be better.', 
    rating: 3, 
    verified: false, 
    datePosted: '2022-09-19', 
    dateEdited: '2022-09-21',
    replies: [
      { 
        username: 'John', 
        review: 'I agree!', 
        rating: 4, 
        verified: true, 
        datePosted: '2022-09-22',
        replies: [] 
      }
    ]
  }
];

const [allReviews, updateAllReviews] = useState(initialReviews);



  const closeModal = () => {
    updateReviewData({ rating: 0, review: "" });
    inputFileRef.current.value = null;
    setModalVisibility(false);
  };

  const appendReply = (reviewIndex, newReply, repliedUser) => {
    const updatedReviewList = [...allReviews];
    updatedReviewList[reviewIndex].replies.push({ ...newReply, repliedUser });
    updateAllReviews(updatedReviewList);
  };

  const submitNewReview = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    
    const freshReview = {
      username: 'Static User',
      review: reviewData.review,
      rating: reviewData.rating,
      verified: true,
      media: attachedFile,
      replies: [],
      datePosted: formattedDate,
      dateEdited: null
    };
    
    updateAllReviews([...allReviews, freshReview]);
    message.success('Successfully added your review. Thank You for the feedback!');
    closeModal();
  };

  const editReview = (index, updatedReview) => {
    const updatedReviews = [...allReviews];
    updatedReview.dateEdited = new Date().toISOString().split('T')[0];  // Add the edited date
    updatedReviews[index] = updatedReview;
    updateAllReviews(updatedReviews);
  };

  const deleteReview = (index) => {
    let updatedReviews = [...allReviews];
    updatedReviews.splice(index, 1);
    updateAllReviews(updatedReviews);
  };

  const openEditModal = (review) => {
    updateReviewData(review);
    setModalVisibility(true);
  };


  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />
  };

  return (
    <div className={styles.reviewSection}>
      <div className={styles.header}>
        <h2 className={styles.reviewHeader}>{productName} Reviews</h2>
        <Button type="primary" onClick={() => setModalVisibility(true)}>Add Review</Button>
      </div>

      <Modal className={styles.modal} title={`Add a Review for ${productName}`} 
      visible={isModalVisible} onOk={submitNewReview} onCancel={closeModal} okText="Submit"
      footer={[
        <Popconfirm
          title="Are you sure you want to close?"
          onConfirm={closeModal}
          placement="bottom"
        >
          <Button key="cancel">Cancel</Button>
        </Popconfirm>,
        <Button key="submit" type="primary" onClick={submitNewReview}>
          Submit
        </Button>,
      ]}>

        <Form>
        <Popconfirm
          title="Are you sure you want to close?"
          onConfirm={closeModal}
          placement="bottom"
        >
        </Popconfirm>


        <Form.Item label="Name">
            <div style={{ display: 'flex', gap: '10px' }}>
              <Input placeholder="First Name" style={{ flex: 1 }} />
              <Input placeholder="Last Name" style={{ flex: 1 }} />
            </div>
          </Form.Item>

          <Form.Item label="Rating">
            <Rate value={reviewData.rating} character={({ index }) => customIcons[index + 1]} onChange={(value) => updateReviewData({...reviewData, rating: value})} />
          </Form.Item>

          <Form.Item label="Notification Opt-In">
            <Checkbox>Receive notifications</Checkbox>
          </Form.Item>

          <Form.Item label="Review">
            <Input.TextArea spellCheck="true" value={reviewData.review} rows={4} maxLength={500} onChange={(e) => updateReviewData({...reviewData, review: e.target.value})} />
            <div style={{ textAlign: 'right', marginTop: '5px' }}>
              {`${reviewData.review.length}/500`}
            </div>
          </Form.Item>

          <Form.Item label="Attach Media">
            <Input type="file" ref={inputFileRef} onChange={(e) => updateAttachedFile(e.target.files[0])} />
          </Form.Item>

          <Form.Item label="Status">
            <Tag color="green">Verified Purchase</Tag> 
            {/* Later replace 'Verified Purchase' with dynamic data */}
          </Form.Item>

        </Form>

      </Modal>

      <List
        itemLayout="vertical"
        dataSource={allReviews.slice((currentPageIndex - 1) * 5, currentPageIndex * 5)}
        renderItem={(item, index) => <ReviewCard item={item} level={0} addReply={(reply) => appendReply(index, reply)} editReview={(updatedReview) => editReview(index, updatedReview)} deleteReview={() => deleteReview(index)} />}
      />
      <Pagination total={allReviews.length} pageSize={5} defaultCurrent={1} onChange={(page) => updateCurrentPageIndex(page)} />
    </div>
  );
};


export default ReviewsSection;