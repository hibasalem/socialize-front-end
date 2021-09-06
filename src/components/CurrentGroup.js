import React, { Component } from 'react';
import CommentForm from './CommentForm';
import GroupPost from './GroupPost';
import PostForm from './PostForm';
import Image from 'react-bootstrap/Image';

export class CurrentGroup extends Component {
  componentDidMount = async () => {
    this.props.getAllGroupPosts(this.props.currentGroupID);
    this.props.getGroupMembers(this.props.currentGroupID);
    this.props.getAllGroupComments();
  };

  render() {
    return (
      <div className="mainDiv">
        <div className="groupMembers">
          <h2>Group members</h2>
          {this.props.showGroupMembers &&
            this.props.groupMembers.map((item, idx) => {
              return (
                <p>
                  <Image
                    src={item.image_url}
                    roundedCircle
                    height="30px"
                    width="30px"
                  />
                  &nbsp;
                  {item.firstname} {item.lastname}
                </p>
              );
            })}
        </div>

        <PostForm
          className="form3"
          post={this.props.post}
          groupId={this.props.currentGroupContent.id}
        />
        {this.props.showCurrentGroupContent && (
          <>
            <div>
              <h2 className="profileName2">
                {this.props.currentGroupContent.group_name}
              </h2>
            </div>
          </>
        )}
        {/* {console.log(this.props.GroupPost)} */}
        {this.props.showGroupPosts &&
          this.props.groupPosts.map((item, idx) => {
            return (
              <>
                <div className="postDiv">
                  <GroupPost
                    groupPostLike={this.props.groupPostLike}
                    item={item}
                    key={idx}
                    groupPostsLikes={this.props.groupPostsLikes}
                  />
                  <CommentForm comment={this.props.comment} id={item.id} />
                  {/* {console.log('hii', this.props.groupComments)} */}
                  {this.props.showGroupComments &&
                    this.props.groupComments.map((comment, index) => {
                      let value;
                      if (item.id === comment.g_post_id) {
                        value = (
                          <div className="comment">
                            <h5 className="poster">
                              <Image
                                src={comment.commenter_image_url}
                                roundedCircle
                                height="30px"
                                width="30px"
                              />
                              &nbsp;
                              {comment.g_commenter_name}
                            </h5>

                            <p className="commeentDate">
                              at {new Date(comment.send_time).toLocaleString()}
                            </p>

                            <div key={index}>{comment.content}</div>
                          </div>
                        );
                      }
                      return value;
                    })}
                </div>
              </>
            );
          })}
      </div>
    );
  }
}

export default CurrentGroup;
