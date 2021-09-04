import React from 'react';
import Post from './Post';

export default function Posts(props) {
  return (
    <div>
      {/* {console.log('hi', props.allPosts)} */}
      {props.allPosts.map((element, index) => {
        if (element.poster_id === props.userID) {
          return (
            <div className="postDiv" key={index}>
              <Post
                post_likes={element.likes}
                post_time={element.send_time}
                poster_name={element.poster_name}
                like={props.like}
                postID={element.id}
                comments={props.comments}
                postContent={element.content}
                comment={props.comment}
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
