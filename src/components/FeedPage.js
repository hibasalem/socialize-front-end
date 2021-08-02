import React, { Component } from 'react'
// import io from 'socket.io-client';
// const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000/';
// const socket = io(SERVER_URL, { transports: ['websocket'] });
import PostForm from './PostForm';
import Posts from './Posts';
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
        <Posts 
        comments={this.props.comments}
        comment={this.props.comment}
        allPosts={this.props.allPosts}/>
      </div>
    )
  }
}

export default FeedPage
