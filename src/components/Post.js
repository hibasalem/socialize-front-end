import React, { Component } from 'react';
import CommentForm from './CommentForm';
import Image from 'react-bootstrap/Image';

export class Post extends Component {
  like = (id) => {
    this.props.like(id);
  };

  render() {
    return (
      <div>
        <div>
          <div className="post">
            <h4 className="poster">
              <Image
                src={this.props.poster_image_url}
                roundedCircle
                height="30px"
              />
              &nbsp;
              {this.props.poster_name}
            </h4>
            <p className="posterDate">
              at {new Date(this.props.post_time).toLocaleString()}
            </p>
            {this.props.postContent}
            <br />
            {this.props.image_url && (
              <img src={this.props.image_url} width="100%" />
            )}
          </div>
          <button className="like" onClick={() => this.like(this.props.postID)}>
            Like
          </button>
          <p>{this.props.post_likes?this.props.post_likes.length:0}&#128077;</p>
        </div>

        <CommentForm comment={this.props.comment} id={this.props.postID} />

        <div>
          {/* {console.log(this.props.comments)} */}
          {this.props.comments.map((item, index) => {
            let value;
            if (this.props.postID === item.post_id) {
              value = (
                <div className="comment">
                  <h5 className="poster">
                    <Image
                      src={item.commenter_image_url}
                      roundedCircle
                      height="30px"
                    />
                    &nbsp;
                    {item.commenter_name}
                  </h5>
                  <p className="commeentDate">
                    at {new Date(item.send_time).toLocaleString()}
                  </p>
                  <div key={index}>{item.content}</div>
                </div>
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
