import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';

export class GroupPost extends Component {
  postLike = (id, groupId) => {
    this.props.groupPostLike(id, groupId);
  };
  render() {
    return (
      <div>
        {console.log(this.props.item)}
        <div className="post">
          <h4 className="poster">
            <Image
              src={this.props.item.poster_image_url}
              roundedCircle
              height="30px"
              width="30px"
            />
            &nbsp;
            {this.props.item.poster_name}
          </h4>

          <p className="posterDate">
            at {new Date(this.props.item.send_time).toLocaleString()}
          </p>
          <p>{this.props.item.content}</p>
          <br />
          {this.props.item.image_url && (
            <img src={this.props.item.image_url} width="100%" />
          )}
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
