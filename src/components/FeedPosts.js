import React, { Component } from 'react';
import Post from './Post';
import CommentForm from './CommentForm';
import './feedPage.css';

export class Posts extends Component {
  render() {
    return (
      <div>
        {this.props.showPosts &&
          this.props.allPosts.map((element, index) => {
            return (
              <div className="postCont" key={index}>
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
          })}
      </div>
    );
  }
}

export default Posts;
