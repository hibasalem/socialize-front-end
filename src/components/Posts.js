import React, { useContext } from 'react';
import Post from './Post';
import { DataContext } from '../context/data';

export default function Posts(props) {
  const context = useContext(DataContext);
  return (
    <div>
      {/* {console.log('hi', props.allPosts)} */}
      {context.state.posts.map((element, index) => {
        if (element.poster_id === context.state.user.userID) {
          return (
            <div className="postDiv" key={index}>
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
        }
      })}
    </div>
  );
}
