import React, { Component } from 'react';
import PostForm from './PostForm';

export class CurrentGroup extends Component {
  componentDidMount = async () => {
    this.props.getAllGroupPosts(this.props.currentGroupID);
    this.props.getGroupMembers(this.props.currentGroupID);
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
                <p>
                  <b>{item.poster_name}</b>
                </p>
                <p>{item.content}</p>
                <p>{new Date(item.send_time).toLocaleString()}</p>
              </>
            );
          })}
      </>
    );
  }
}

export default CurrentGroup;
