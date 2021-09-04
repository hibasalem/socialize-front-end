import React, { useContext } from 'react';
import Post from './Post';
import './feedPage.css';
import { DataContext } from '../context/data';

export default function Posts() {
  const context = useContext(DataContext);
  return (
    <div>
      {context.state.showPosts &&
        context.state.posts.map((element, index) => {
          return (
            <div className="postCont" key={index}>
              <Post
                post_likes={element.likes}
                post_time={element.send_time}
                poster_name={element.poster_name}
                postID={element.id}
                postContent={element.content}
                id={element.id}
                image_url={element.image_url}
                poster_image_url={element.poster_image_url}
              />
            </div>
          );
        })}
    </div>
  );
}
