import React, { useState } from 'react';
import { List, Avatar, Rate, Card, Tooltip, Space, Input, Button, Tag, message, Modal } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined, LikeOutlined, DislikeOutlined,
 ArrowRightOutlined } from '@ant-design/icons';
import styles from './ReviewCard.module.css';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const ReviewCard = ({ item, level, addReply, editReview, deleteReview }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [latestReplyIndex, setLatestReplyIndex] = useState(null);
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [firstName, setFirstName] = useState("John");  
  const [lastName, setLastName] = useState("Doe");  

  const handleEdit = () => {
    const editedReview = {
      ...item,
      username: `${firstName} ${lastName}`,  
      review: prompt("Update your review:", item.review),
      rating: parseInt(prompt("Update your rating (1-5):", item.rating))
    };
    editReview(editedReview);
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
  };

  const handleDislike = () => {
    setLiked(false);
    setDisliked(true);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    setLatestReplyIndex(null);  
  };

  const toggleReplyForm = () => {
    setReplyVisible(!replyVisible);
  };

  const sendReply = () => {
    if (replyText) {
      const newReply = {
        username: "Static Name",
        review: replyText,  
        verified: true,
        replies: [],
        repliedTo: item.username
      };
      addReply(newReply, item.username);
      setReplyText("");
      setReplyVisible(false);

      message.success('Reply sent successfully!');

  
      if (showReplies) { 
        setLatestReplyIndex(null);
      } else {
        setLatestReplyIndex(0);
      }
    }
  };

  const openMediaModal = (media) => {
    setCurrentMedia(media);
    setIsMediaModalVisible(true);
  };
  
  const closeMediaModal = () => {
    setIsMediaModalVisible(false);
    setCurrentMedia(null);
  };
  
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
  
      <Card className={styles.reviewCard}>
        {item.verified && <Tag color="green" className={styles.verifiedTag}>Verified Purchase</Tag>}
        
        <List.Item>
        <div className={styles.flexContainer}>
            <div className={styles.avatarContainer}>
                <Avatar size={64} icon={<SmileOutlined />} className={styles.avatar} style={{height:'100px', width:'100px'}}/>
            </div>
              <div className={styles.cardContent}>
              <Rate character={({ index }) => customIcons[index + 1]} defaultValue={item.rating} disabled />
              
              <div className={styles.userReview}>

                <strong>
                {`${firstName} ${lastName}`} {item.repliedTo ? `replied to ${item.repliedTo} with:` : 'says:'}  {/* Updated to show first and last name */}
                  {item.media?.type.includes('image') && <Tag style={{ marginLeft: '10px' }} color="magenta" onClick={() => openMediaModal(item.media)}>Image </Tag>}
                  {item.media?.type.includes('video') && <Tag style={{ marginLeft: '10px' }} color="blue" onClick={() => openMediaModal(item.media)}>Video</Tag>}
                </strong>
                <br /> 
                <div className={styles.userReview}>
                    {item.review} 
                </div>                
                <div style={{ marginTop: '10px' }}>
                    <span>{item.datePosted}</span>
                    {item.dateEdited && <span style={{ marginLeft: '10px', color: '#228B22' }}>Edited {item.dateEdited}</span>}
                </div>
              </div>


              <Space className={styles.reactionSpace}>
              <Tooltip title="Like">
                <span>
                  <LikeOutlined className={liked ? styles.liked : styles.icon} onClick={handleLike} />
                  <span className={styles.likeDislikeNumber}>3</span>
                </span>
              </Tooltip>
              <Tooltip title="Dislike">
                <span>
                  <DislikeOutlined className={disliked ? styles.disliked : styles.icon} onClick={handleDislike} />
                  <span className={styles.likeDislikeNumber}>1</span>
                </span>
              </Tooltip>
                <span className={styles.replyLabel} onClick={toggleReplyForm}>Reply <ArrowRightOutlined /></span>
                <span className={styles.seeRepliesLabel} onClick={toggleReplies}>
                  {showReplies ? "Hide" : "See"} Replies
                </span>

                <Button  onClick={handleEdit}>Edit</Button>
                <Button  danger  onClick={deleteReview}>Delete</Button>

              </Space>
              
              {replyVisible && (
                <div className={styles.replySection}>
                  <Input.TextArea placeholder="Write a reply..." className={styles.replyInput} value={replyText} onChange={e => setReplyText(e.target.value)}/>
                  <div className={styles.buttonContainer}>
                    <Button type="default" className={styles.cancelReplyButton} onClick={toggleReplyForm}>Cancel</Button>
                    <Button type="primary" className={styles.sendReplyButton} onClick={sendReply}>Send Reply</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </List.Item>
      </Card>
  
      {item.replies && item.replies.length > 0 && (
        <div className={styles.replyList}>
        {latestReplyIndex !== null && (
            <ReviewCard item={item.replies[latestReplyIndex]} level={level + 1} key={latestReplyIndex} addReply={addReply} />
          )}
          {showReplies && item.replies.map((reply, index) => (
            <ReviewCard item={reply} level={level + 1} key={index} addReply={addReply} />
          ))}
        </div>
      )}

        <Modal
        title="Media"
        visible={isMediaModalVisible}
        onCancel={closeMediaModal}
        footer={null}
      >
        {currentMedia?.type.includes('image') ?
          <img src={currentMedia?.url} alt="Uploaded Media" style={{ width: '100%' }} />
          :
          <video controls style={{ width: '100%' }}>
            <source src={currentMedia?.url} type={currentMedia?.type} />
          </video>
        }
      </Modal>
  
    </div>
  );
  
};

export default ReviewCard;
