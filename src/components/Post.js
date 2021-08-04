import React, { Component } from 'react';

export class Post extends Component {
  like = (id) => {
    this.props.like(id);
  };

  render() {
    return (
      <div>
        <div>
          <div className="post">
            <h4>
              {this.props.poster_name} At{' '}
              {new Date(this.props.post_time).toLocaleString()}{' '}
            </h4>
            {this.props.postContent}
          </div>
          <button className="like" onClick={() => this.like(this.props.postID)}>
            Like
          </button>
          <p>{this.props.post_likes}&#128077;</p>
        </div>
        <div className="comment">
          {this.props.comments.map((item, index) => {
            let value;
            if (this.props.postID === item.post_id) {
              value = (
                <>
                  <h5>
                    {item.commenter_name} AT {item.send_time}
                  </h5>
                  <div key={index}>{item.content}</div>
                </>
              );
            }
            return value;
          })}
        </div>
      </div>
    );
  }
}

export default Post;
