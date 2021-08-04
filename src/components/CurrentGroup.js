import React, { Component } from 'react';
import CommentForm from './CommentForm';
import GroupPost from './GroupPost';
import PostForm from './PostForm';

export class CurrentGroup extends Component {
  componentDidMount = async () => {
    this.props.getAllGroupPosts(this.props.currentGroupID);
    this.props.getGroupMembers(this.props.currentGroupID);
    this.props.getAllGroupComments();
  };

  render() {
    return (
      <>
        {this.props.showCurrentGroupContent && (
          <>
            <div>{this.props.currentGroupContent.group_name}</div>
          </>
        )}
        {/* getGetGroupMembers={this.getGetGroupMembers} */}
        {/* {this.props.showCurrentGroupPath && (
         something
        )} */}

        <h2>group Members</h2>
        {this.props.showGroupMembers &&
          this.props.groupMembers.map((item, idx) => {
            return (
              <p>
                {item.firstname} {item.lastname}
              </p>
            );
          })}

        <PostForm
          post={this.props.post}
          groupId={this.props.currentGroupContent.id}
        />
        {this.props.showGroupPosts &&
          this.props.groupPosts.map((item, idx) => {
            return (
              <>
              <GroupPost groupPostLike={this.props.groupPostLike} item={item} key={idx} groupPostsLikes={this.props.groupPostsLikes}/>
              <CommentForm comment={this.props.comment} id={item.id}/>
              {this.props.showGroupComments
               &&
              this.props.groupComments.map((comment, index) => {
                    let value;
                    if (item.id === comment.g_post_id) {
                        value = <p key={index}><b>{comment.g_commenter_name}</b> {comment.content} {new Date(comment.send_time).toLocaleString()}</p>
                    }
                    return value;

                })
                }
              </>
            );
          })}
      </>
    );
  }
}

export default CurrentGroup;
