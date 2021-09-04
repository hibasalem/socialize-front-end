import React, { useContext } from 'react';
import PostForm from './PostForm';
import FeedPosts from './FeedPosts';
import './feedPage.css';

import { DataContext } from '../context/data';

export default function FeedPage() {
  const context = useContext(DataContext);

  return (
    <div className="mainDiv">
      <PostForm post={context.methods.post} />
      <FeedPosts />
    </div>
  );
}
