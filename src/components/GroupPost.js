import React, { Component } from 'react'

export class GroupPost extends Component {
  postLike = (id, groupId) => {
    this.props.groupPostLike(id, groupId);
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
        <p>{this.props.item.likes}&#128077;</p>
      </>
    )
  }
}

export default GroupPost
