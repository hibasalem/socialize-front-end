import React, { Component } from 'react';
import Post from './Post';
import CommentForm from './CommentForm';

export class Posts extends Component {
  render() {
    return (
      <div>
        {this.props.allPosts.map((element, index) => {
          if (element.poster_id === this.props.userID) {
            return (
              <div className="postDiv" key={index}>
                <Post
                  post_likes={element.likes}
                  post_time={element.send_time}
                  poster_name={element.poster_name}
                  like={this.props.like}
                  postID={element.id}
                  comments={this.props.comments}
                  postContent={element.content}
                  comment={this.props.comment}
                  id={element.id}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Posts;
