import React, { Component } from 'react';

export class GroupPost extends Component {
  postLike = (id, groupId) => {
    this.props.groupPostLike(id, groupId);
  };
  render() {
    return (
      <div>
        <div className="post">
          <p>
            <h4 className="poster">{this.props.item.poster_name}</h4>
          </p>
          <p>{this.props.item.content}</p>
          <p className="posterDate">
            at {new Date(this.props.item.post_time).toLocaleString()}
          </p>
        </div>

        <button
          className="like"
          onClick={() =>
            this.postLike(this.props.item.id, this.props.item.g_groups_id)
          }
        >
          Like
        </button>
        <p>{this.props.item.likes}&#128077;</p>
      </div>
    );
  }
}

export default GroupPost;
