import React, { Component } from 'react';
import Friend from './Friend';

export class AddFriends extends Component {
  render() {
    return (
      <div className="mainDiv">
        <h2 className="profileName">All users</h2>
        <div className="peopleCont">
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
      </div>
    );
  }
}

export default AddFriends;
