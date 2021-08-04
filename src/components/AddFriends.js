import React, { Component } from 'react';
import Friend from './Friend';

export class AddFriends extends Component {
  render() {
    return (
      <div className="mainDiv">
        {this.props.allusers.map((item, idx) => {
          if (item.id !== this.props.userID) {
            return (
              <Friend
                targetProfile={this.props.targetProfile}
                key={idx}
                item={item}
                handleAddFriend={this.props.handleAddFriend}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default AddFriends;
