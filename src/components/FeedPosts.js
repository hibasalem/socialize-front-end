import React from 'react';
import Post from './Post';
import CommentForm from './CommentForm';
import './feedPage.css';

export default function Posts(props) {
  return (
    <div className="feedpage">
      {/* {console.log(props.allPosts)} */}
      {props.showPosts &&
        props.allPosts.map((element, index) => {
          return (
            <div className="postCont" key={index}>
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
        })}
    </div>
  );
}
