import React, { Component } from 'react';
import Profile from './Profile';
import PostForm from './PostForm';
import Posts from './Posts';
import FeedPosts from './FeedPosts';
class FeedPage extends Component {
  // componentDidMount = () => {

  //   socket.on('connect', () => {
  //     socket.emit('test');
  //   })
  // }



  render() {
    return (
      <div>
        Feed Page
        <PostForm post={this.props.post} />
        <FeedPosts
          showPosts={this.props.showPosts}
          userID={this.props.userID}
          like={this.props.like}
          comments={this.props.comments}
          comment={this.props.comment}
          allPosts={this.props.allPosts} />
      </div>
    )
  }
}

export default FeedPage;
