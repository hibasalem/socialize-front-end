import React, { Component } from 'react'

export class GroupPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0
    }
  }
  postLike = (id, groupId) => {
    this.props.groupPostLike(id, groupId);
    // if(this.props.item.id == this.props.groupPostsLikes.g_post_id){

    this.setState({
      likes: this.props.groupPostsLikes.length
    })
    // }
    console.log(this.state.likes);
  }
  render() {
    return (
      <>
        <p>
          <b>{this.props.item.poster_name}</b>
        </p>
        <p>{this.props.item.content}</p>
        <p>{new Date(this.props.item.send_time).toLocaleString()}</p>
        <button onClick={() => this.postLike(this.props.item.id, this.props.item.g_groups_id)}>Like</button>
        {/* {this.props.showGroupPostsLikes && */}
        <p>{this.state.likes}&#128077;</p>
        {/* } */}
      </>
    )
  }
}

export default GroupPost
