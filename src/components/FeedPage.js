import React from 'react';
import PostForm from './PostForm';
import FeedPosts from './FeedPosts';
import './feedPage.css';

export default function FeedPage(props) {
  return (
    <div className="mainDiv">
      <PostForm post={props.post} />
      <FeedPosts
        showPosts={props.showPosts}
        userID={props.userID}
        like={props.like}
        comments={props.comments}
        comment={props.comment}
        allPosts={props.allPosts}
      />
    </div>
  );
}
